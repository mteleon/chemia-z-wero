#!/usr/bin/env python3
"""
Generate preview PDFs with pages 1-2 readable and pages 3+ blurred.

Input/output: public/notes-preview/*_preview.pdf (in-place update).
"""

from __future__ import annotations

import io
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageFilter


PROJECT_ROOT = Path(__file__).resolve().parents[1]
PREVIEW_DIR = PROJECT_ROOT / "public" / "notes-preview"
BLUR_RADIUS = 6
READABLE_PAGES = 2
RENDER_SCALE = 2.0


def blur_page_to_png_stream(page: fitz.Page) -> io.BytesIO:
    matrix = fitz.Matrix(RENDER_SCALE, RENDER_SCALE)
    pix = page.get_pixmap(matrix=matrix, alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    blurred = image.filter(ImageFilter.GaussianBlur(radius=BLUR_RADIUS))
    output = io.BytesIO()
    blurred.save(output, format="PNG")
    output.seek(0)
    return output


def process_pdf(pdf_path: Path) -> None:
    src = fitz.open(pdf_path)
    out = fitz.open()
    try:
        for page_index in range(src.page_count):
            page = src[page_index]
            if page_index < READABLE_PAGES:
                out.insert_pdf(src, from_page=page_index, to_page=page_index)
                continue

            new_page = out.new_page(width=page.rect.width, height=page.rect.height)
            png_stream = blur_page_to_png_stream(page)
            new_page.insert_image(new_page.rect, stream=png_stream.getvalue(), keep_proportion=False)

        tmp_path = pdf_path.with_suffix(".tmp.pdf")
        out.save(tmp_path, deflate=True)
        out.close()
        src.close()
        tmp_path.replace(pdf_path)
        print(f"Updated preview: {pdf_path.name}")
    finally:
        if not src.is_closed:
            src.close()
        if not out.is_closed:
            out.close()


def main() -> None:
    files = sorted(PREVIEW_DIR.glob("*_preview.pdf"))
    if not files:
        print("No preview PDFs found in public/notes-preview.")
        return

    for pdf_path in files:
        process_pdf(pdf_path)

    print("Done.")


if __name__ == "__main__":
    main()
