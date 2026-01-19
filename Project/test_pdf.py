import pdfplumber

pdf_path = r"D:\MLN_WEB\MLN111_SP26\docs\GIAO TRINH TRIET HOC MAC - LENIN (Quoc gia) (1).pdf"
try:
    with pdfplumber.open(pdf_path) as pdf:
        print(f"Total pages: {len(pdf.pages)}")
        for i in range(min(10, len(pdf.pages))):
            text = pdf.pages[i].extract_text()
            text_len = len(text or '')
            print(f"Page {i+1}: {text_len} chars")
            if text_len > 50:
                print(f"  Sample: {text[:100].replace(chr(10), ' ')[:100]}")
                break
except Exception as e:
    print(f"Error: {e}")
