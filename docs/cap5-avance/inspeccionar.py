from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
import hashlib, fitz, json, re
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).parent
src = ROOT / 'tesis/tesis_parcial2_cap3_revisado.docx'
assert hashlib.sha256(src.read_bytes()).hexdigest() == '89d06373398c6afdd2f6c848383f8685ee59d1b18f45ab5a62d8ee06c6ecee80'
ns = {'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(src) as z:
    doc = E.fromstring(z.read('word/document.xml'))
    lines=[]
    for i,b in enumerate(doc.find('w:body',ns)):
        text=''.join(b.xpath('.//w:t/text()',namespaces=ns))
        style=b.xpath('./w:pPr/w:pStyle/@w:val',namespaces=ns)
        lines.append(f'B{i} [{style}] {text}')
    (OUT/'fuente-extraida.txt').write_text('\n'.join(lines),encoding='utf-8')
    (OUT/'estilos.xml').write_bytes(z.read('word/styles.xml'))
rub=fitz.open(ROOT/'docs/rubrica-segundo-examen.pdf')
(OUT/'rubrica-pp4-6.txt').write_text('\n'.join(f'PÁGINA {i+1}\n'+rub[i].get_text() for i in range(3,6)),encoding='utf-8')
print('Fuente hash confirmado; extracción de apoyo y rúbrica disponibles.')
summary={
 'sections':[E.tostring(x).decode() for x in doc.xpath('//w:sectPr',namespaces=ns)],
 'toc':[E.tostring(x).decode()[:1500] for x in doc.xpath('//w:sdt',namespaces=ns)],
 'heading':[E.tostring(doc.find('w:body',ns)[i]).decode() for i in [523,524,527,1031]],
 'caption':E.tostring(doc.find('w:body',ns)[1012]).decode(),
 'images':{p.name:Image.open(p).size for p in OUT.glob('*.png')},
 'test_files':len(list((ROOT/'test').glob('*.dart'))),
 'test':sum(len(re.findall(r'\btest\s*\(',p.read_text(encoding='utf-8'))) for p in (ROOT/'test').glob('*.dart')),
 'testWidgets':sum(len(re.findall(r'\btestWidgets\s*\(',p.read_text(encoding='utf-8'))) for p in (ROOT/'test').glob('*.dart')),
}
(OUT/'inspeccion-estructura.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print('Dimensiones y estructura registradas.')
def compact(x):
    return E.tostring(x).decode().split('>',1)[-1] if x is not None else ''
(OUT/'propiedades.txt').write_text('\n'.join(f'B{i}: '+compact(doc.find('w:body',ns)[i].find('w:pPr',ns))+' RUN '+compact(doc.find('w:body',ns)[i].find('w:r/w:rPr',ns)) for i in [523,525,527,776,1012,1031])+'\nSECCION '+compact(doc.find('w:body/w:sectPr',ns)),encoding='utf-8')
