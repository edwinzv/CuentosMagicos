"""CAP5-AVANCE: creación localizada OOXML, sin reserializar el contenido previo con Word."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from copy import deepcopy
from lxml import etree as E
from PIL import Image
import hashlib, json, re, shutil
import win32com.client

ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).parent
TEMP=Path('C:/Users/Ignacia/AppData/Local/Temp/opencode')
SOURCE=ROOT/'tesis/tesis_parcial2_cap3_revisado.docx'
TARGET=ROOT/'tesis/tesis_parcial2_cap3_cap5_avance.docx'
EXPECTED='89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80'
assert OUT.is_dir() and TARGET.parent.is_dir() and TEMP.is_dir()
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==EXPECTED
W='http://schemas.openxmlformats.org/wordprocessingml/2006/main'
R='http://schemas.openxmlformats.org/officeDocument/2006/relationships'
WP='http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'
A='http://schemas.openxmlformats.org/drawingml/2006/main'
PIC='http://schemas.openxmlformats.org/drawingml/2006/picture'
REL='http://schemas.openxmlformats.org/package/2006/relationships'
NS={'w':W,'r':R,'wp':WP,'a':A,'pic':PIC}
def el(tag, **attrs):
    prefix,name=tag.split(':')
    x=E.Element('{'+NS[prefix]+'}'+name)
    for k,v in attrs.items():
        if ':' in k:
            pre,key=k.split(':'); k='{'+NS[pre]+'}'+key
        x.set(k,str(v))
    return x
def w(tag, **attrs): return el('w:'+tag,**{'w:'+k:v for k,v in attrs.items()})
def text(x): return ''.join(x.xpath('.//w:t/text()',namespaces=NS))
with ZipFile(SOURCE) as z:
    infos=z.infolist(); files={i.filename:z.read(i.filename) for i in infos}
doc=E.fromstring(files['word/document.xml']); body=doc.find('w:body',NS)
original=deepcopy(doc)
assert text(body[1031])=='REFERENCIAS'
rels=E.fromstring(files['word/_rels/document.xml.rels'])
maxrel=max(int(x.get('Id')[3:]) for x in rels if x.get('Id','').startswith('rId'))
maxdraw=max([int(x) for x in doc.xpath('//wp:docPr/@id',namespaces=NS)]+[0])
section=deepcopy(body[-1]); firstsection=True
blocks=[]; figmeta=[]; tablemeta=[]
def p(s='',style=None,size=None,bold=False,keep=False,page=False):
    x=w('p'); pr=w('pPr'); x.append(pr)
    if style: pr.append(w('pStyle',val=style))
    if keep: pr.append(w('keepNext'))
    if page: pr.append(w('pageBreakBefore'))
    if size:
        pr.append(w('spacing',after='100',line='260',lineRule='auto'))
        pr.append(w('ind',firstLine='0'))
    r=w('r'); x.append(r)
    if size or bold:
        rp=w('rPr'); r.append(rp)
        if size: rp.append(w('sz',val=int(size*2))); rp.append(w('szCs',val=int(size*2)))
        if bold: rp.append(w('b'))
    t=w('t'); t.set('{http://www.w3.org/XML/1998/namespace}space','preserve'); t.text=s; r.append(t)
    return x
def caption(label,n,title):
    x=p(label+' ',style='Descripcin',size=12,bold=True,keep=True)
    for kind,value in [('begin',None),('instr',f' SEQ {label} \\* ARABIC '),('separate',None),('value',str(n)),('end',None)]:
        r=w('r');rp=w('rPr');rp.append(w('sz',val='24'));rp.append(w('szCs',val='24'));rp.append(w('i',val='0'));r.append(rp); x.append(r)
        if kind=='instr':
            t=w('instrText'); t.set('{http://www.w3.org/XML/1998/namespace}space','preserve');t.text=value
        elif kind=='value': t=w('t');t.text=value
        else: t=w('fldChar',fldCharType=kind)
        r.append(t)
    r=w('r');rp=w('rPr');rp.append(w('sz',val='24'));rp.append(w('szCs',val='24'));rp.append(w('i',val='0'));r.append(rp);t=w('t');t.set('{http://www.w3.org/XML/1998/namespace}space','preserve');t.text=' '+title;r.append(t);x.append(r)
    x.find('w:r/w:rPr',NS).append(w('i',val='0'))
    return x
def sectbreak(size,topbottom=None):
    global firstsection
    sp=deepcopy(section)
    if not firstsection:
        for t in sp.findall('w:pgNumType',NS):sp.remove(t)
    firstsection=False
    pg=sp.find('w:pgSz',NS);pg.set('{'+W+'}w',str(size[0]));pg.set('{'+W+'}h',str(size[1]))
    pg.set('{'+W+'}orient','landscape' if size[0]>size[1] else 'portrait')
    if topbottom:
        margins=sp.find('w:pgMar',NS);margins.set('{'+W+'}top',str(topbottom));margins.set('{'+W+'}bottom',str(topbottom))
    typ=sp.find('w:type',NS)
    if typ is None: typ=w('type',val='nextPage');sp.insert(2,typ)
    else:typ.set('{'+W+'}val','nextPage')
    x=p('',size=1);x.find('w:pPr',NS).append(sp)
    return x
A4=(11906,16838); A3=(16838,23811)
def imagepara(name,cx,cy,rid):
    global maxdraw
    maxdraw+=1
    x=p('',size=1);pr=x.find('w:pPr',NS);pr.append(w('jc',val='center'))
    spacing=pr.find('w:spacing',NS)
    spacing.set('{'+W+'}after','0');spacing.set('{'+W+'}line','240');spacing.set('{'+W+'}lineRule','auto')
    run=w('r');x.append(run);dr=w('drawing');run.append(dr)
    inline=el('wp:inline',distT='0',distB='0',distL='0',distR='0');dr.append(inline)
    inline.append(el('wp:extent',cx=cx,cy=cy));inline.append(el('wp:docPr',id=maxdraw,name=name,descr='Diagrama técnico derivado del código; no evidencia de ejecución'))
    frame=el('wp:cNvGraphicFramePr');frame.append(el('a:graphicFrameLocks',noChangeAspect='1'));inline.append(frame)
    g=el('a:graphic');inline.append(g);gd=el('a:graphicData',uri=PIC);g.append(gd)
    pic=el('pic:pic');gd.append(pic)
    nv=el('pic:nvPicPr');nv.append(el('pic:cNvPr',id='0',name=name));nv.append(el('pic:cNvPicPr'));pic.append(nv)
    fill=el('pic:blipFill');fill.append(el('a:blip',**{'r:embed':rid}));st=el('a:stretch');st.append(el('a:fillRect'));fill.append(st);pic.append(fill)
    sp=el('pic:spPr');tr=el('a:xfrm');tr.append(el('a:off',x='0',y='0'));tr.append(el('a:ext',cx=cx,cy=cy));sp.append(tr)
    geom=el('a:prstGeom',prst='rect');geom.append(el('a:avLst'));sp.append(geom);pic.append(sp)
    return x
def figure(names,title,n):
    global maxrel
    # Technical plates choose A4 first; only new dense figures may use A3.
    for panel,name in enumerate(names):
        im=Image.open(OUT/name); iw,ih=im.size
        candidates=[A4,A4[::-1],A3[::-1]]
        results=[]
        nominal=17 if name.startswith('08-') else 18
        technical_margin=1000 if name.startswith('09b-') else None
        for sz in candidates:
            availw=(sz[0]-3402)/20
            availh=(sz[1]-(2000 if technical_margin else 2834))/20-(60 if n==6 else 70 if technical_margin else 100)
            scale=min(availw/iw,availh/ih)
            results.append((sz,scale,scale*nominal))
        choice=next((r for r in results if r[2]>=9),max(results,key=lambda r:r[2]))
        sz,scale,font=choice
        if not blocks or blocks[-1].find('w:pPr/w:sectPr',NS) is None:
            blocks.append(sectbreak(A4))
        if panel==0:blocks.append(caption('Figura',n,title))
        else:blocks.append(p(f'Figura {n} (continuación, panel {chr(97+panel)}). '+title,size=12,bold=True,keep=True))
        maxrel+=1; rid=f'rId{maxrel}'
        rel=E.SubElement(rels,'{'+REL+'}Relationship',Id=rid,Type=R+'/image',Target='media/cap5-'+name)
        files['word/media/cap5-'+name]=(OUT/name).read_bytes()
        blocks.append(imagepara(name,int(iw*scale*12700),int(ih*scale*12700),rid))
        blocks.append(p('Fuente: elaboración técnica a partir del código y las migraciones locales inspeccionados; no acredita ejecución ni despliegue.',size=10))
        blocks.append(sectbreak(sz,technical_margin))
        figmeta.append({'numero':n,'panel':panel+1,'archivo':name,'papel_twips':sz,'margen_vertical_twips':technical_margin or 1417,'font_nominal_final_pt':round(font,2)})
def table(rows,title,n):
    blocks.append(caption('Tabla',n,title))
    tbl=w('tbl');pr=w('tblPr');tbl.append(pr)
    pr.append(w('tblW',w='8504',type='dxa'))
    pr.append(w('tblLayout',type='fixed'))
    borders=w('tblBorders');pr.append(borders)
    for side in ['top','left','bottom','right','insideH','insideV']:borders.append(w(side,val='single',sz='4',color='B0B0B0'))
    margins=w('tblCellMar');pr.append(margins)
    for side in ['top','left','bottom','right']:margins.append(w(side,w='80',type='dxa'))
    count=len(rows[0]); widths=[1700,2700,4104] if count==3 else [8504//count]*count
    grid=w('tblGrid');tbl.append(grid)
    for width in widths:grid.append(w('gridCol',w=width))
    for i,row in enumerate(rows):
        tr=w('tr');tbl.append(tr);tp=w('trPr');tr.append(tp);tp.append(w('cantSplit'))
        if i==0:tp.append(w('tblHeader'))
        for val,width in zip(row,widths):
            tc=w('tc');tr.append(tc);tcp=w('tcPr');tc.append(tcp);tcp.append(w('tcW',w=width,type='dxa'))
            if i==0:tcp.append(w('shd',val='clear',fill='EEEEEE'))
            tc.append(p(val,size=10,bold=i==0))
    blocks.append(tbl);blocks.append(p('',size=3))
    tablemeta.append({'numero':n,'titulo':title,'filas':len(rows)})

lines=(OUT/'capitulo-v.md').read_text(encoding='utf-8').splitlines();i=0;nf=6;nt=33
while i<len(lines):
    line=lines[i].strip();i+=1
    if not line:continue
    if line.startswith('@tabla '):
        title=line[7:];rows=[]
        while i<len(lines) and lines[i].startswith('|'):
            row=[s.strip() for s in lines[i].strip().strip('|').split('|')];i+=1
            if all(re.fullmatch('[-: ]+',s) for s in row):continue
            rows.append(row)
        table(rows,title,nt);nt+=1
    elif line.startswith('@figura '):
        names,title=line[8:].split('|',1);figure([s.strip() for s in names.strip().split(',')],title.strip(),nf);nf+=1
    elif line.startswith('# '):blocks.append(p(line[2:],'Ttulo1',page=True))
    elif line.startswith('## '):blocks.append(p(line[3:],'Ttulo2',keep=True))
    else:blocks.append(p(line))
for i,b in enumerate(blocks):body.insert(1031+i,b)
# References retain their existing paragraphs and styles. Section numbering continues.
for x in body[-1].findall('w:pgNumType',NS):body[-1].remove(x)
files['word/document.xml']=E.tostring(doc,xml_declaration=True,encoding='UTF-8',standalone=True)
files['word/_rels/document.xml.rels']=E.tostring(rels,xml_declaration=True,encoding='UTF-8',standalone=True)
ct=E.fromstring(files['[Content_Types].xml'])
if not any(x.get('Extension')=='png' for x in ct):
    E.SubElement(ct,'{http://schemas.openxmlformats.org/package/2006/content-types}Default',Extension='png',ContentType='image/png')
    files['[Content_Types].xml']=E.tostring(ct,xml_declaration=True,encoding='UTF-8',standalone=True)
def writezip(path,data):
    with ZipFile(path,'w',ZIP_DEFLATED) as z:
        for inf in infos:z.writestr(inf,data[inf.filename])
        for name,value in data.items():
            if name not in [inf.filename for inf in infos]:z.writestr(name,value)
writezip(TARGET,files)
(OUT/'construccion.json').write_text(json.dumps({'fuente_sha256':EXPECTED,'bloques_insertados':len(blocks),'figuras':figmeta,'tablas':tablemeta},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Creado: {TARGET}; {len(blocks)} bloques, tablas 33–{nt-1}, figuras 6–{nf-1}.')
