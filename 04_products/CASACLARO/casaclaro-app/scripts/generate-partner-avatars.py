#!/usr/bin/env python3
"""
Generate branded partner avatar placeholders for CasaClaro.
Uses Pillow to create circular initials-on-color avatars.
Run with: .temp_venv\Scripts\python scripts\generate-partner-avatars.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ─── Config ───────────────────────────────────────────────────────────────────
OUTPUT_DIR = "public/partners"
SIZES = [200, 400]  # 1x and 2x for retina

# CasaClaro brand palette (background, foreground)
COLORS = [
    ("#1f3a4d", "#ffffff"),  # ocean on white
    ("#1f6f78", "#ffffff"),  # lagoon on white
    ("#e67e22", "#ffffff"),  # terracotta on white
    ("#4a2f1d", "#ffffff"),  # cacao on white
    ("#1f8f59", "#ffffff"),  # emerald on white
    ("#23313f", "#ffffff"),  # charcoal on white
]

PARTNERS = [
    ("cc-partner-001", "Valentina Torres", "VT"),
    ("cc-partner-002", "Carlos Mejía Vargas", "CM"),
    ("cc-partner-003", "María Fernanda Soto Ríos", "MF"),
    ("cc-partner-004", "Andrés Felipe Restrepo Gómez", "AF"),
    ("cc-partner-005", "Laura Ossa Martínez", "LO"),
    ("cc-partner-006", "Pablo Neira Cárdenas", "PN"),
    ("cc-partner-007", "Ricardo Cano Herrera", "RC"),
    ("cc-partner-008", "Juliana Vargas Ospina", "JV"),
    ("cc-partner-009", "Sofía Herrera Montoya", "SH"),
    ("cc-partner-010", "Daniel Ospina Ruiz", "DO"),
    ("cc-partner-011", "Alejandra Muñoz Pérez", "AM"),
    ("cc-partner-012", "Juan Camilo Díaz Torres", "JC"),
]

# Try to find a decent sans-serif font
FONT_CANDIDATES = [
    "C:/Windows/Fonts/segoeui.ttf",
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/calibri.ttf",
    "C:/Windows/Fonts/tahoma.ttf",
    "C:/Windows/Fonts/verdana.ttf",
]


def get_font(size: int):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def hex_to_rgb(hex_color: str) -> tuple:
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4))


def generate_avatar(seed: str, name: str, initials: str, size: int, color_idx: int):
    bg_hex, fg_hex = COLORS[color_idx % len(COLORS)]
    bg = hex_to_rgb(bg_hex)
    fg = hex_to_rgb(fg_hex)

    img = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(img)

    # Draw a subtle inner ring for polish
    padding = int(size * 0.04)
    draw.ellipse(
        [padding, padding, size - padding, size - padding],
        outline=tuple(min(255, c + 25) for c in bg),
        width=max(1, size // 100),
    )

    # Compute font size to fit nicely
    font_size = int(size * 0.38)
    font = get_font(font_size)

    # Measure text
    bbox = draw.textbbox((0, 0), initials, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]

    # Slight manual offset for vertical centering (PIL bbox quirks)
    x = (size - text_w) / 2
    y = (size - text_h) / 2 - (text_h * 0.08)

    draw.text((x, y), initials, fill=fg, font=font)

    # Save
    filename = f"{seed}-{size}.png"
    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath, "PNG")
    return filepath


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for idx, (seed, name, initials) in enumerate(PARTNERS):
        for size in SIZES:
            path = generate_avatar(seed, name, initials, size, idx)
            print(f"Generated: {path}")
    print("\nDone. Avatars saved to public/partners/")


if __name__ == "__main__":
    main()
