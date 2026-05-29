// Tiny localStorage-backed view counter for gallery pieces.
// Each piece starts with a stable pseudo-random baseline so the wall
// never shows "0 views" on first visit.

const KEY = "as-views-v1";
const BASE_KEY = "as-views-base-v1";

type Store = Record<string, number>;

function read(key: string): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(key) || "{}") as Store;
  } catch {
    return {};
  }
}

function write(key: string, v: Store) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* quota exceeded — ignore */
  }
}

function hash(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function baselineFor(id: string): number {
  const bases = read(BASE_KEY);
  if (typeof bases[id] === "number") return bases[id];
  const b = 120 + (hash(id) % 880); // 120-999
  bases[id] = b;
  write(BASE_KEY, bases);
  return b;
}

export function getViewCount(id: string): number {
  const v = read(KEY);
  return baselineFor(id) + (v[id] ?? 0);
}

export function bumpView(id: string): number {
  const v = read(KEY);
  v[id] = (v[id] ?? 0) + 1;
  write(KEY, v);
  return baselineFor(id) + v[id];
}
