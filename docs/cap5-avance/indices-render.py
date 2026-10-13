from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from lxml import etree as E
from copy import deepcopy
import hashlib,json,shutil,collections
import win32com.client, fitz
from PIL import Image,ImageDraw

ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
TMP=Path('C:/Users/Ignacia/AppData/Local/Temp/opencode')
SRC=ROOT/'tesis/tesis_parcial2_cap3_revisado.docx';DST=ROOT/'tesis/tesis_parcial2_cap3_cap5_avance.docx'
assert TMP.is_dir() and OUT.is_dir()
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'};W=NS['w']
def txt(x):return ''.join(x.xpath('.//w:t/text()',namespaces=NS))
def load(path):
    with ZipFile(path) as z:return z.infolist(),{n:z.read(n) for n in z.namelist()}
def save(path,infos,data):
    with ZipFile(path,'w',ZIP_DEFLATED) as z:
        for inf in infos:z.writestr(inf,data[inf.filename])
        for n,v in data.items():
            if n not in [i.filename for i in infos]:z.writestr(n,v)
infos,data=load(DST);before=E.fromstring(data['word/document.xml'])
tempdoc=TMP/'cap5-indices-word.docx';shutil.copyfile(DST,tempdoc)
app=win32com.client.DispatchEx('Word.Application');app.Visible=False;app.DisplayAlerts=0
try:
    d=app.Documents.Open(str(tempdoc),ReadOnly=False,AddToRecentFiles=False)
    counts={'TablesOfContents':d.TablesOfContents.Count,'TablesOfFigures':d.TablesOfFigures.Count}
    for iteration in range(3):
        for i in range(1,d.TablesOfContents.Count+1):d.TablesOfContents(i).Update()
        for i in range(1,d.TablesOfFigures.Count+1):d.TablesOfFigures(i).Update()
        d.Repaginate()
    for i in range(1,d.TablesOfContents.Count+1):d.TablesOfContents(i).UpdatePageNumbers()
    for i in range(1,d.TablesOfFigures.Count+1):d.TablesOfFigures(i).UpdatePageNumbers()
    d.Save();d.Close(False)
finally:app.Quit()
_,word=load(tempdoc);updated=E.fromstring(word['word/document.xml'])
body=before.find('w:body',NS);ub=updated.find('w:body',NS)
def find(b,title):return next(i for i,x in enumerate(b) if txt(x)==title)
# Replace index result blocks only; surrounding headings and front matter remain original.
indexranges=[]
for title,nexttitle in [('ÍNDICE GENERAL','ÍNDICE DE TABLAS'),('ÍNDICE DE TABLAS','ÍNDICE DE FIGURAS'),('ÍNDICE DE FIGURAS','DEDICATORIA')]:
    a=find(body,title)+1;b=find(body,nexttitle)
    ua=find(ub,title)+1;uz=find(ub,nexttitle)
    # Retain original trailing empty paragraphs outside field result.
    while b>a and not txt(body[b-1]) and not body[b-1].xpath('.//w:fldChar',namespaces=NS):b-=1
    while uz>ua and not txt(ub[uz-1]) and not ub[uz-1].xpath('.//w:fldChar',namespaces=NS):uz-=1
    old=list(body)[a:b]
    for x in old:body.remove(x)
    for i,x in enumerate(list(ub)[ua:uz]):body.insert(a+i,deepcopy(x))
    indexranges.append({'titulo':title,'bloques_anteriores':len(old),'bloques_actualizados':uz-ua})
# Carry the new _Toc bookmarks (not Word's modified paragraph text/styles) into matching paragraphs.
def outside(b):return list(b)
lookup=collections.defaultdict(list)
for x in outside(ub):
    for pp in ([x] if x.tag=='{'+W+'}p' else x.xpath('.//w:p',namespaces=NS)):
        if txt(pp):lookup[txt(pp)].append(pp)
seen=collections.Counter();bmadded=0;unmatched=[]
maxbm=max([int(v) for v in before.xpath('//w:bookmarkStart/@w:id',namespaces=NS)]+[0])
for x in outside(body):
    for pp in ([x] if x.tag=='{'+W+'}p' else x.xpath('.//w:p',namespaces=NS)):
        s=txt(pp)
        if not s:continue
        idx=seen[s];seen[s]+=1
        if idx>=len(lookup[s]):
            unmatched.append(s)
            ps=pp.xpath('./w:pPr/w:pStyle/@w:val',namespaces=NS)
            assert not any(v in ['Ttulo1','Ttulo2','Ttulo3','Descripcin'] for v in ps),f'Unmatched heading/caption: {s[:70]}'
            continue
        up=lookup[s][idx]
        starts=[n for n in up.findall('w:bookmarkStart',NS) if n.get('{'+W+'}name','').startswith('_Toc')]
        ids={n.get('{'+W+'}id') for n in starts}
        existing={n.get('{'+W+'}name') for n in pp.findall('w:bookmarkStart',NS)}
        copied={}
        for n in starts:
            if n.get('{'+W+'}name') not in existing:
                maxbm+=1;copy=deepcopy(n);copied[n.get('{'+W+'}id')]=str(maxbm);copy.set('{'+W+'}id',str(maxbm))
                pp.insert(1 if pp.find('w:pPr',NS) is not None else 0,copy);bmadded+=1
        for n in up.findall('w:bookmarkEnd',NS):
            if n.get('{'+W+'}id') in copied:
                copy=deepcopy(n);copy.set('{'+W+'}id',copied[n.get('{'+W+'}id')]);pp.append(copy)
# Long new captions need a visible leader and right-aligned page number.
# Change only new caption entries in the two illustration indexes, not the styles globally.
new_index_entries=0
for pp in body.xpath('.//w:p',namespaces=NS):
    style=pp.xpath('./w:pPr/w:pStyle/@w:val',namespaces=NS)
    if 'Tabladeilustraciones' not in style:continue
    match=__import__('re').match(r'^(Tabla|Figura)\s+(\d+)',txt(pp))
    if not match or int(match.group(2)) < (33 if match.group(1)=='Tabla' else 6):continue
    pr=pp.find('w:pPr',NS)
    for tag in ['ind','jc','tabs']:
        for node in pr.findall('w:'+tag,NS):pr.remove(node)
    E.SubElement(pr,'{'+W+'}ind',{'{'+W+'}left':'0','{'+W+'}right':'0','{'+W+'}firstLine':'0'})
    E.SubElement(pr,'{'+W+'}jc',{'{'+W+'}val':'left'})
    tabs=E.SubElement(pr,'{'+W+'}tabs')
    E.SubElement(tabs,'{'+W+'}tab',{'{'+W+'}val':'right','{'+W+'}leader':'dot','{'+W+'}pos':'8504'})
    for run in pp.xpath('.//w:r',namespaces=NS):
        rp=run.find('w:rPr',NS)
        if rp is None:rp=E.Element('{'+W+'}rPr');run.insert(0,rp)
        for tag in ['sz','szCs']:
            node=rp.find('w:'+tag,NS)
            if node is None:node=E.SubElement(rp,'{'+W+'}'+tag)
            node.set('{'+W+'}val','22')
    new_index_entries+=1
data['word/document.xml']=E.tostring(before,xml_declaration=True,encoding='UTF-8',standalone=True)
# Only add any index style absent from the source, never replace existing definitions.
styles=E.fromstring(data['word/styles.xml']);us=E.fromstring(word['word/styles.xml'])
existing={x.get('{'+W+'}styleId') for x in styles};styleadded=[]
needed=set(before.xpath('//w:pStyle/@w:val',namespaces=NS))
for x in us:
    sid=x.get('{'+W+'}styleId')
    if sid in needed and sid not in existing:styles.append(deepcopy(x));styleadded.append(sid)
if styleadded:data['word/styles.xml']=E.tostring(styles,xml_declaration=True,encoding='UTF-8',standalone=True)
save(DST,infos,data)
app=win32com.client.DispatchEx('Word.Application');app.Visible=False;app.DisplayAlerts=0
pdf=OUT/'tesis_parcial2_cap3_cap5_avance.pdf'
try:
    d=app.Documents.Open(str(DST),ReadOnly=True,AddToRecentFiles=False)
    d.Repaginate();d.ExportAsFixedFormat(str(pdf),17);d.Close(False)
finally:app.Quit()
pd=fitz.open(pdf);pages={}
for i,page in enumerate(pd):
    s=page.get_text()
    for key in ['CAPÍTULO V: IMPLEMENTACIÓN','5.1. Alcance','5.11. Balance','REFERENCIAS']:
        if key in s:pages.setdefault(key,[]).append(i+1)
    if any(key in s for key in ['CAPÍTULO V: IMPLEMENTACIÓN','5.1. Alcance','5.11. Balance']):pass
chapter=next(i+1 for i,p in enumerate(pd) if 'NOTA DE ENTREGA PARCIAL:' in p.get_text())
refs=next(i+1 for i,p in enumerate(pd) if any(line.strip()=='REFERENCIAS' for line in p.get_text().splitlines()))
selected=list(range(1,14))+list(range(chapter-1,refs+2))
for start in range(0,len(selected),8):
    group=selected[start:start+8];sheet=Image.new('RGB',(1200,4*480),'#D8D8D8');draw=ImageDraw.Draw(sheet)
    for j,n in enumerate(group):
        pix=pd[n-1].get_pixmap(matrix=fitz.Matrix(.6,.6),alpha=False)
        img=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);img.thumbnail((575,435))
        x=(j%2)*600;y=(j//2)*480;sheet.paste(img,(x,y+25));draw.text((x+5,y+5),f'PDF {n}',fill='black')
    sheet.save(OUT/f'contacto-{start//8+1:02}.png')
meta={'indices_word':counts,'indices':indexranges,'entradas_nuevas_formato_indice':new_index_entries,'bookmarks_agregados':bmadded,'estilos_agregados':styleadded,'parrafos_no_coincidentes_en_temporal_Word_no_importados':unmatched,'paginas_pdf':len(pd),'inicio_cap5_pdf':chapter,'referencias_pdf':refs,'hallazgos_paginas':pages,'fuente_sha256_despues':hashlib.sha256(SRC.read_bytes()).hexdigest(),'copia_sha256':hashlib.sha256(DST.read_bytes()).hexdigest(),'pdf_sha256':hashlib.sha256(pdf.read_bytes()).hexdigest()}
(OUT/'render-indices.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(meta,ensure_ascii=True,indent=2))
