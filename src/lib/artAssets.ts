// Auto-imports any image you drop in src/assets/sketches/ and src/assets/colors/.
// Use the EXACT filenames listed in src/assets/README.md.
// Missing files render as a clean "Drop image" placeholder card.

const sketchModules = import.meta.glob("/src/assets/sketches/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const colorModules = import.meta.glob("/src/assets/colors/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function pick(map: Record<string, string>, folder: string, basename: string): string | undefined {
  // match any extension
  const entry = Object.entries(map).find(([k]) =>
    k.toLowerCase().includes(`/${folder}/${basename.toLowerCase()}.`),
  );
  return entry?.[1];
}

export const sketchImg = (name: string) => pick(sketchModules, "sketches", name);
export const colorImg = (name: string) => pick(colorModules, "colors", name);
