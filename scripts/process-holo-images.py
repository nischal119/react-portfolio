#!/usr/bin/env python3
"""Remove only edge-connected black background, preserving dark glass fill."""

from collections import deque
from pathlib import Path

from PIL import Image


def is_background(pixel, threshold=30):
    r, g, b = pixel[:3]
    return r <= threshold and g <= threshold and b <= threshold


def remove_background_flood(input_path, output_path, threshold=30):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    visited = set()
    queue = deque()

    for x in range(width):
        for y in (0, height - 1):
            if is_background(pixels[x, y], threshold):
                queue.append((x, y))
    for y in range(height):
        for x in (0, width - 1):
            if is_background(pixels[x, y], threshold):
                queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in visited:
            continue
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
        if not is_background(pixels[x, y], threshold):
            continue

        visited.add((x, y))
        pixels[x, y] = (0, 0, 0, 0)
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    img.save(output_path, "PNG")
    print(f"Saved {output_path}")


def main():
    root = Path(__file__).resolve().parents[1]
    assets = Path(
        "/Users/nischal/.cursor/projects/"
        "Users-nischal-Desktop-Nischal-Work-Portfolio-React-Portofolio-V5/assets"
    )
    public = root / "public"

    mappings = {
        "holo-star.png": assets
        / "OLDYsHB9RMavvQrkVRNy08ZXYE.png_width_2550_height_2550-84ecbe71-904b-499e-a3c5-cf16ec1a9c21.png",
        "holo-lightning.png": assets
        / "lIIjRX5gxRdY7UWw5wqIXicPOA.png_width_2550_height_2550-c51fc3f5-ba82-4ba2-8312-30a0c8d36fe2.png",
    }

    for name, source in mappings.items():
        if not source.exists():
            raise FileNotFoundError(source)
        remove_background_flood(source, public / name)


if __name__ == "__main__":
    main()
