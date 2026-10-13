"""CAP5-AVANCE, ciclo 2: respaldo y comparación limitada a los tres hallazgos."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from lxml import etree as E
from copy import deepcopy
import hashlib, json, sys

ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
TMP=Path('C:/Users/Ignacia/AppData/Local/Temp/opencode')
BACKUP=TMP/'cap5-ciclo2-base.zip'
DOC=ROOT/'tesis/tesis_parcial2_cap3_cap5_avance.docx'
PDF=OUT/'tesis_parcial2_cap3_cap5_avance.pdf'
SRC=ROOT/'tesis/tesis_parcial2_cap3_revisado.docx'
EXPECTED={'fuente':'89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80','docx':'f828f5cc56fa2a653cdd308abb79cfe7c57729e3e750c4ea2b57e0ff920d33cb','pdf':'bbd6764bec2182654f8c339974ab2aca2e3e39e4a3fb9d991292fa5b0dd252e4'}
assert OUT.is_dir() and TMP.is_dir()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def parts(blob):
 import io
 with ZipFile(io.BytesIO(blob)) as z:return {n:z.read(n) for n in z.namelist()}
if sys.argv[1]=='antes':
 assert not BACKUP.exists(),'Respaldo ya existente: no sobrescribir el estado anterior.'
 assert sha(SRC)==EXPECTED['fuente'] and sha(DOC)==EXPECTED['docx'] and sha(PDF)==EXPECTED['pdf']
 paths=[DOC,PDF,ROOT/'MEMORY.md',OUT/'capitulo-v.md',OUT/'13-estados-quiz-imagen.puml',OUT/'13-estados-quiz-imagen.png',OUT/'construccion.json',OUT/'render-indices.json',OUT/'verificacion-integridad.json',OUT/'validacion.md',OUT/'revision-independiente-pendiente.md',ROOT/'lib/views/quiz_view.dart',ROOT/'supabase/migrations/20261008100000_quiz_comprension.sql']
 with ZipFile(BACKUP,'w',ZIP_DEFLATED) as z:
  for p in paths:z.writestr(p.relative_to(ROOT).as_posix(),p.read_bytes())
 (OUT/'ciclo2-antes.json').write_text(json.dumps({'respaldo':str(BACKUP),'respaldo_sha256':sha(BACKUP),'hashes_antes':EXPECTED,'archivos_respaldados':[p.relative_to(ROOT).as_posix() for p in paths]},ensure_ascii=False,indent=2),encoding='utf-8')
 print('Hashes de entrada confirmados y respaldo del ciclo anterior creado.')
else:
 with ZipFile(BACKUP) as z:old=z.read(DOC.relative_to(ROOT).as_posix());oldmd=z.read('docs/cap5-avance/capitulo-v.md').decode('utf-8')
 a=parts(old);b=parts(DOC.read_bytes())
 NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'};W=NS['w']
 def text(x):return ''.join(x.xpath('.//w:t/text()',namespaces=NS))
 def outside_indices(tree):
  body=tree.find('w:body',NS);skip=set()
  def find(title):return next(i for i,p in enumerate(body) if text(p)==title)
  for title,nexttitle in [('ÍNDICE GENERAL','ÍNDICE DE TABLAS'),('ÍNDICE DE TABLAS','ÍNDICE DE FIGURAS'),('ÍNDICE DE FIGURAS','DEDICATORIA')]:
   i=find(title)+1;j=find(nexttitle)
   while j>i and not text(body[j-1]) and not body[j-1].xpath('.//w:fldChar',namespaces=NS):j-=1
   skip.update(range(i,j))
  return [(i,p) for i,p in enumerate(body) if i not in skip]
 def neutral(p):
  p=deepcopy(p)
  ids={x.get('{'+W+'}id') for x in p.xpath('.//w:bookmarkStart',namespaces=NS) if x.get('{'+W+'}name','').startswith('_Toc')}
  for x in p.xpath('.//w:bookmarkStart|.//w:bookmarkEnd',namespaces=NS):
   if x.get('{'+W+'}id') in ids:x.getparent().remove(x)
  return E.tostring(p,method='c14n')
 x=E.fromstring(a['word/document.xml']);y=E.fromstring(b['word/document.xml'])
 oa=outside_indices(x);ob=outside_indices(y);assert len(oa)==len(ob)
 differences=[]
 for (i,p),(j,q) in zip(oa,ob):
  if neutral(p)!=neutral(q):
   differences.append({'bloque_antes':i,'bloque_despues':j,'tipo':E.QName(p).localname,'texto_antes':text(p),'texto_despues':text(q)})
   if p.tag=='{'+W+'}tbl':
    assert text(p).replace('FK cuento, estudiante y aula nullable','FK cuento y estudiante NOT NULL; FK aula nullable')==text(q)
    pp=deepcopy(p);qq=deepcopy(q)
    for node in pp.xpath('.//w:t',namespaces=NS):node.text=(node.text or '').replace('FK cuento, estudiante y aula nullable','FK cuento y estudiante NOT NULL; FK aula nullable')
    assert neutral(pp)==neutral(qq),'Tabla 38: diferencias adicionales de formato/contenido.'
   else:
    assert p.xpath('.//w:drawing',namespaces=NS),'Cambio fuera de tabla/imagen afectada.'
    assert '13-estados-quiz-imagen.png' in E.tostring(p).decode(),'Otro panel cambiado.'
    # Solo las dimensiones geométricas del panel pueden variar en el párrafo de imagen.
    pp=deepcopy(p);qq=deepcopy(q)
    for node in [*pp.iter(),*qq.iter()]:
     if E.QName(node).localname in ['extent','ext']:
      for key in ['cx','cy']:
       if key in node.attrib:node.set(key,'0')
    assert neutral(pp)==neutral(qq),'Cambio adicional en el párrafo de imagen.'
 assert len([d for d in differences if d['tipo']=='tbl'])==1
 assert set(a)==set(b),'Cambió el inventario de recursos.'
 changed=[n for n in a if a[n]!=b[n]]
 assert set(changed)=={'word/document.xml','word/media/cap5-13-estados-quiz-imagen.png'},changed
 md=(OUT/'capitulo-v.md').read_text(encoding='utf-8')
 assert oldmd.replace('FK cuento, estudiante y aula nullable','FK cuento y estudiante NOT NULL; FK aula nullable')==md
 with ZipFile(BACKUP) as z:
  for path in ['lib/views/quiz_view.dart','supabase/migrations/20261008100000_quiz_comprension.sql']:
   assert z.read(path)==(ROOT/path).read_bytes()
 assert sha(SRC)==EXPECTED['fuente']
 result={'unidad':'CAP5-AVANCE','ciclo':2,'dictamen_recibido':'CAMBIOS NECESARIOS, comunicado por el usuario; tres hallazgos autorizados','segunda_revision_independiente':'PENDIENTE','respaldo':str(BACKUP),'fuente_sha256_despues':sha(SRC),'docx_sha256_antes':EXPECTED['docx'],'docx_sha256_despues':sha(DOC),'pdf_sha256_antes':EXPECTED['pdf'],'pdf_sha256_despues':sha(PDF),'miembros_docx_modificados_frente_entrega_anterior':changed,'bloques_comparados_incluido_cap5_fuera_indices':len(oa),'bloques_modificados':differences,'otros_18_paneles':'Recursos binariamente idénticos','relaciones_estilos_numbering_otros_miembros':'Binariamente idénticos a la entrega anterior','markdown_cap5':'Solo cambia la frase autorizada de tabla 38','codigo_quiz_y_migracion':'Intactos'}
 (OUT/'ciclo2-delta.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
 # Comparaciones visuales del render anterior y actual, sin reexportar el DOCX anterior.
 import fitz
 from PIL import Image,ImageDraw
 with ZipFile(BACKUP) as z:previous_pdf=fitz.open(stream=z.read(PDF.relative_to(ROOT).as_posix()),filetype='pdf')
 current_pdf=fitz.open(PDF)
 for page,label in [(188,'figura13a'),(194,'tabla38')]:
  pictures=[]
  for pdf in [previous_pdf,current_pdf]:
   pix=pdf[page-1].get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
   pictures.append(Image.frombytes('RGB',(pix.width,pix.height),pix.samples))
  sheet=Image.new('RGB',(sum(p.width for p in pictures),max(p.height for p in pictures)+30),'#EEEEEE');draw=ImageDraw.Draw(sheet);offset=0
  for picture,caption in zip(pictures,[f'Ciclo 1 - PDF {page}',f'Ciclo 2 - PDF {page}']):
   draw.text((offset+5,5),caption,fill='black');sheet.paste(picture,(offset,30));offset+=picture.width
  sheet.save(OUT/f'ciclo2-comparacion-{label}.png')
 print(json.dumps({k:v for k,v in result.items() if k!='bloques_modificados'},ensure_ascii=True,indent=2))
