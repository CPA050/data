from PIL import Image, ImageDraw
from docx import Document
from docx.shared import Pt

img_path = r"C:\Users\cpa\Documents\deepseek-harness\default-workspace\repo\screens\beam.png"
im = Image.new("RGB", (420, 160), "white")
d = ImageDraw.Draw(im)
d.rectangle([30, 40, 390, 130], outline="black", width=3)
d.text((150, 10), "q = 20 kN/m", fill="blue")
im.save(img_path)

doc = Document()
doc.add_paragraph("一建建筑 力学 练习题")
doc.add_paragraph("1. 如图所示简支梁，跨度 $L=6m$，均布荷载 $q=20 kN/m$，求跨中最大弯矩？")
doc.add_picture(img_path)
doc.add_paragraph("A. 45 kN·m")
doc.add_paragraph("B. 90 kN·m")
doc.add_paragraph("C. 120 kN·m")
doc.add_paragraph("D. 180 kN·m")
doc.add_paragraph("答案：B")
doc.add_paragraph("章节：力学")

doc.add_paragraph("2. 普通硅酸盐水泥的初凝时间不得早于？")
doc.add_paragraph("A. 45min")
doc.add_paragraph("B. 60min")
doc.add_paragraph("答案：A")
doc.add_paragraph("章节：建筑材料")

out = r"C:\Users\cpa\Documents\deepseek-harness\default-workspace\repo\screens\import-with-image.docx"
doc.save(out)
print("saved", out)
