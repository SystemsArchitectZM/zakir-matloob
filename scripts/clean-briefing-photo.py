"""Remove red annotation marks from briefing photo."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    r"C:\Users\HP\.cursor\projects\d-Work-Zakir-zakir-portfolio\assets\image-cc555e75-9d5b-4ac3-b72b-80362924c2bb.jpg"
)
OUT = ROOT / "public" / "images" / "team-briefing.jpg"


def red_mask(rgb: np.ndarray) -> np.ndarray:
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    return (r.astype(np.int16) - g > 80) & (r.astype(np.int16) - b > 80) & (r > 140)


def inpaint(arr: np.ndarray, mask: np.ndarray, radius: int = 12) -> np.ndarray:
    out = arr.copy()
    h, w = mask.shape
    ys, xs = np.where(mask)
    for y, x in zip(ys, xs):
        y0, y1 = max(0, y - radius), min(h, y + radius + 1)
        x0, x1 = max(0, x - radius), min(w, x + radius + 1)
        patch = arr[y0:y1, x0:x1]
        patch_mask = mask[y0:y1, x0:x1]
        good = patch[~patch_mask]
        if len(good):
            out[y, x] = good.mean(axis=0).astype(np.uint8)
    return out


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    arr = np.array(img)
    mask = red_mask(arr)
    cleaned = inpaint(arr, mask, radius=14)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(cleaned).save(OUT, quality=92, optimize=True)
    print(f"Wrote {OUT} ({mask.sum()} red pixels cleaned)")


if __name__ == "__main__":
    main()
