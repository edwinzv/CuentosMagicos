from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
import json
import fitz
OUT=Path(__file__).parent;ROOT=OUT.resolve().parents[1]
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paths=[ROOT/'tesis/tesis_parcial2_cap3_cap5_avance.docx',Path('C:/Users/Ignacia/AppData/Local/Temp/opencode/cap5-indices-word.docx')]
result={}
for path in paths:
 with ZipFile(path) as z:d=E.fromstring(z.read('word/document.xml'))
 result[str(path)]=[{'texto':''.join(p.xpath('.//w:t/text()',namespaces=ns)),'campo':p.xpath('.//w:instrText/text()',namespaces=ns)} for p in d.xpath('//w:p[w:pPr/w:pStyle[@w:val="Descripcin"]]',namespaces=ns)]
 if path==paths[0]:
  with ZipFile(path) as z:
   st=E.fromstring(z.read('word/styles.xml'));se=E.fromstring(z.read('word/settings.xml'))
   defs=st.xpath('//w:style[@w:styleId="Descripcin" or @w:styleId="Normal"] | //w:docDefaults',namespaces=ns)
   (OUT/'diagnostico-estilos.txt').write_text('\n'.join(E.tostring(e).decode().split('>',1)[-1] for e in defs)+'\nSETTINGS\n'+E.tostring(se).decode().split('>',1)[-1],encoding='utf-8')
(OUT/'diagnostico-captions.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
pdf=OUT/'tesis_parcial2_cap3_cap5_avance.pdf'
if pdf.exists():
 d=fitz.open(pdf)
 (OUT/'diagnostico-pdf.txt').write_text('\n'.join(f'P{i+1}\n'+d[i].get_text() for i in list(range(12))+list(range(len(d)-12,len(d)))),encoding='utf-8')
 spans={str(i+1):[{k:s[k] for k in ['text','size','font','bbox']} for block in d[i].get_text('dict')['blocks'] if 'lines' in block for line in block['lines'] for s in line['spans']][:12] for i in [169,175,179,193]}
 (OUT/'diagnostico-spans.json').write_text(json.dumps(spans,ensure_ascii=False,indent=2),encoding='utf-8')
