# Drop real photographs here

Every visual on the site today is a hand-built SVG/CSS illustration, so nothing can break
and there are no external image dependencies.

To switch to photography later:

1. Save the image in this folder, e.g. `corrugated-boxes.jpg` (keep it under ~300 KB,
   ideally 1600×1200).
2. Open `apps/web/lib/image-config.ts` and set the `src` for the matching slot:

   ```ts
   corrugated: {
     src: "corrugated-boxes.jpg",   // <-- was null
     alt: "Corrugated boxes stacked in the dispatch area",
     width: 1600,
     height: 1200,
     artDirection: "…",
   },
   ```

3. Done. `MediaPanel` renders the photo with `next/image` (optimised, lazy, responsive,
   AVIF/WebP) instead of the illustration — no component changes required.

Slot keys in use: `heroPrimary`, `aboutFacility`, the five product categories
(`corrugated`, `epeFoam`, `bubble`, `polyFilm`, `accessories`), the six industries and
`customPackaging`. Add new keys to the same file if you need more.
