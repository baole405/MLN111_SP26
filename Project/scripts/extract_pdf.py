#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import io
import pdfplumber
import json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

if len(sys.argv) < 2:
    print(json.dumps({"error": "usage: extract_pdf.py <pdf_path>"}))
    sys.exit(1)

pdf_path = sys.argv[1]
try:
    with pdfplumber.open(pdf_path) as pdf:
        text_parts = []
        for i, page in enumerate(pdf.pages):
            try:
                text = page.extract_text(layout=False)
                if text:
                    text_parts.append(text)
            except Exception as page_err:
                continue
        full_text = "\n\n".join(text_parts)
        if full_text:
            print(full_text)
        else:
            print("", file=sys.stderr)
except Exception as e:
    print(f"Error: {str(e)}", file=sys.stderr)
    sys.exit(1)
