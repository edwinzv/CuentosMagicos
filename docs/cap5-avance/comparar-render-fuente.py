from pathlib import Path
import hashlib,json
import win32com.client,fitz
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
TMP=Path('C:/Users/Ignacia/AppData/Local/Temp/opencode');assert TMP.is_dir()
src=ROOT/'tesis/tesis_parcial2_cap3_revisado.docx';base=TMP/'cap5-fuente-preservada.pdf'
before=hashlib.sha256(src.read_bytes()).hexdigest()
app=win32com.client.DispatchEx('Word.Application');app.Visible=False;app.DisplayAlerts=0
try:
 d=app.Documents.Open(str(src),ReadOnly=True,AddToRecentFiles=False)
 d.ExportAsFixedFormat(str(base),17);d.Close(False)
finally:app.Quit()
old=fitz.open(base);new=fitz.open(OUT/'tesis_parcial2_cap3_cap5_avance.pdf')
pairs=[(20,21,'figura1'),(58,59,'figura2'),(91,92,'figura3'),(100,101,'figura4'),(111,112,'ecuacion'),(117,118,'figura5')]
for a,b,label in pairs:
 imgs=[]
 for pdf,n in [(old,a),(new,b)]:
  pix=pdf[n-1].get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
  imgs.append(Image.frombytes('RGB',(pix.width,pix.height),pix.samples))
 sheet=Image.new('RGB',(sum(im.width for im in imgs),max(im.height for im in imgs)+30),'#EEEEEE');draw=ImageDraw.Draw(sheet)
 x=0
 for im,caption in zip(imgs,[f'Fuente PDF {a}',f'Copia PDF {b}']):
  draw.text((x+5,5),caption,fill='black');sheet.paste(im,(x,30));x+=im.width
 sheet.save(OUT/f'comparacion-{label}.png')
after=hashlib.sha256(src.read_bytes()).hexdigest();assert before==after
result={'fuente_sha256_antes':before,'fuente_sha256_despues':after,'paginas_fuente':len(old),'paginas_copia':len(new),'pdf_fuente_temporal':str(base),'fuente_pdf_sha256':hashlib.sha256(base.read_bytes()).hexdigest(),'pares_comparados':[{'fuente_pdf':a,'copia_pdf':b,'objeto':label} for a,b,label in pairs],'modo':'ReadOnly, ExportAsFixedFormat, Close(False); sin guardado de DOCX'}
(OUT/'comparacion-render.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=True,indent=2))
