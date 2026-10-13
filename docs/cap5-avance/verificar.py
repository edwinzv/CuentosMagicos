"""Comprobación automatizada del editor; NO revisión independiente."""
from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
from copy import deepcopy
import hashlib,json,re,collections
import fitz,win32com.client

ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
SRC=ROOT/'tesis/tesis_parcial2_cap3_revisado.docx';DST=ROOT/'tesis/tesis_parcial2_cap3_cap5_avance.docx'
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','wp':'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'};W=NS['w']
def load(path):
 with ZipFile(path) as z:return {n:z.read(n) for n in z.namelist()}
a=load(SRC);b=load(DST);x=E.fromstring(a['word/document.xml']);y=E.fromstring(b['word/document.xml'])
def txt(z):return ''.join(z.xpath('.//w:t/text()',namespaces=NS))
xb=x.find('w:body',NS);yb=y.find('w:body',NS)
def find(body,title):return next(i for i,z in enumerate(body) if txt(z)==title)
def without_indices(body):
 skip=set()
 for title,nexttitle in [('ÍNDICE GENERAL','ÍNDICE DE TABLAS'),('ÍNDICE DE TABLAS','ÍNDICE DE FIGURAS'),('ÍNDICE DE FIGURAS','DEDICATORIA')]:
  start=find(body,title)+1;end=find(body,nexttitle)
  while end>start and not txt(body[end-1]) and not body[end-1].xpath('.//w:fldChar',namespaces=NS):end-=1
  skip.update(range(start,end))
 return [(i,z) for i,z in enumerate(body) if i not in skip]
def neutral(z):
 z=deepcopy(z)
 ids={n.get('{'+W+'}id') for n in z.xpath('.//w:bookmarkStart',namespaces=NS) if n.get('{'+W+'}name','').startswith('_Toc')}
 for n in z.xpath('.//w:bookmarkStart|.//w:bookmarkEnd',namespaces=NS):
  if n.get('{'+W+'}id') in ids:n.getparent().remove(n)
 if z.tag=='{'+W+'}sectPr':
  for n in z.findall('w:pgNumType',NS):z.remove(n)
 return E.tostring(z,method='c14n')
cap=find(yb,'CAPÍTULO V: IMPLEMENTACIÓN — AVANCE DEL PROTOTIPO');ref=find(yb,'REFERENCIAS')
oa=without_indices(xb);ob=[(i,z) for i,z in without_indices(yb) if not cap<=i<ref]
assert len(oa)==len(ob),(len(oa),len(ob))
diff=[{'fuente':i,'copia':j,'texto':txt(p)[:120]} for (i,p),(j,q) in zip(oa,ob) if neutral(p)!=neutral(q)]
assert not diff,diff
changed=[n for n in a if a[n]!=b[n]]
assert set(changed)<= {'word/document.xml','word/_rels/document.xml.rels','[Content_Types].xml','word/styles.xml'},changed
relsns={'r':'http://schemas.openxmlformats.org/package/2006/relationships'}
ar=E.fromstring(a['word/_rels/document.xml.rels']);br=E.fromstring(b['word/_rels/document.xml.rels'])
assert all(E.tostring(p,method='c14n')==E.tostring(q,method='c14n') for p,q in zip(ar,list(br)[:len(ar)]))
assert all(E.tostring(p,method='c14n')==E.tostring(q,method='c14n') for p,q in zip(x.xpath('//w:tbl',namespaces=NS),y.xpath('//w:tbl',namespaces=NS)[:32]))
old_drawing=x.xpath('//w:drawing|//w:pict',namespaces=NS)
new_drawing=y.xpath('//w:drawing|//w:pict',namespaces=NS)[:len(old_drawing)]
assert all(E.tostring(p,method='c14n')==E.tostring(q,method='c14n') for p,q in zip(old_drawing,new_drawing))
names=y.xpath('//w:bookmarkStart/@w:name',namespaces=NS);ids=y.xpath('//w:bookmarkStart/@w:id',namespaces=NS)
assert len(names)==len(set(names)),'Duplicate bookmark name'
assert len(ids)==len(set(ids)),'Duplicate bookmark id'
anchors=y.xpath('//w:hyperlink/@w:anchor',namespaces=NS)
missing=sorted(set(anchors)-set(names));assert not missing,missing
pd=fitz.open(OUT/'tesis_parcial2_cap3_cap5_avance.pdf')
errors=[i+1 for i,p in enumerate(pd) if 'Marcador no definido' in p.get_text() or 'Error! Reference' in p.get_text()]
assert not errors,errors
# Check every cached PAGEREF index result against the real Word bookmark page, without saving.
app=win32com.client.DispatchEx('Word.Application');app.Visible=False;app.DisplayAlerts=0
pagerefs=[]
try:
 d=app.Documents.Open(str(DST),ReadOnly=True,AddToRecentFiles=False);d.Repaginate()
 for collection in [d.TablesOfContents,d.TablesOfFigures]:
  for i in range(1,collection.Count+1):
   for fld in collection(i).Range.Fields:
    code=fld.Code.Text
    match=re.search(r'PAGEREF\s+(\S+)',code)
    if match:
     anchor=match.group(1);cached=fld.Result.Text.strip();actual=d.Bookmarks(anchor).Range.Information(3)
     pagerefs.append({'anchor':anchor,'indice':cached,'pagina_word':actual,'coincide':cached==str(actual)})
 d.Close(False)
finally:app.Quit()
assert all(p['coincide'] for p in pagerefs),[p for p in pagerefs if not p['coincide']]
# Expanded visual pages, including prior five figures and equation, boundaries, tables and new diagrams.
render=json.loads((OUT/'render-indices.json').read_text(encoding='utf-8'))
selected=[6,8,9,21,59,92,101,112,118]+list(range(render['inicio_cap5_pdf']-1,render['referencias_pdf']+2))
for n in selected:
 pix=pd[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2),alpha=False);pix.save(OUT/f'detalle-p{n:03}.png')
result={'fuente_sha256':hashlib.sha256(SRC.read_bytes()).hexdigest(),'copia_sha256':hashlib.sha256(DST.read_bytes()).hexdigest(),'miembros_previos_modificados':changed,'miembros_nuevos':sorted(set(b)-set(a)),'bloques_previos_comparados':len(oa),'diferencias_fuera_alcance':diff,'excepciones':'Índices, bookmarks _Toc asociados y pgNumType de la sección final para continuidad; adición exclusiva del capítulo V y recursos nuevos.','tablas_previas_preservadas':32,'figuras_previas_preservadas':5,'tablas_totales':len(y.xpath('//w:tbl',namespaces=NS)),'pagerefs_verificados':len(pagerefs),'pagerefs':pagerefs,'errores_render_indices':errors,'paginas_detalle_generadas':selected,'revisor_independiente':'PENDIENTE; este script es verificación del editor'}
(OUT/'verificacion-integridad.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
assert result['fuente_sha256']=='89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80'
print(f'Preservados {len(oa)} bloques previos; {len(pagerefs)} PAGEREF comprobados. Detalles generados; revisión visual requerida.')
