// LocalStorage-backed gallery wall storage.
// In production, the live site uses a database. This is a zero-backend equivalent.

export type WallItem = {
  id: string;
  type: "ai" | "hand";
  sector?: "Monochrome" | "Vivid";
  prompt?: string;
  artistName: string;
  dataUrl?: string;
  createdAt: string;
};

const KEY = "as-gallery-wall-v1";

export function getWallItems(): WallItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WallItem[]) : [];
  } catch {
    return [];
  }
}

export function addWallItem(item: Omit<WallItem, "id" | "createdAt">): WallItem {
  const full: WallItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const items = [full, ...getWallItems()];
  localStorage.setItem(KEY, JSON.stringify(items));
  return full;
}

export function clearWallItems() {
  localStorage.removeItem(KEY);
}

export const DEMO_WALL: WallItem[] = [
  { id: "demo-1", type: "hand", artistName: "Anonymous", createdAt: new Date().toISOString() },
  { id: "demo-2", type: "ai", sector: "Monochrome", prompt: "salman khan", artistName: "Anonymous", createdAt: new Date().toISOString() },
  { id: "demo-3", type: "ai", sector: "Vivid", prompt: "Gojo satoru", artistName: "gege akutami", createdAt: new Date().toISOString() },
];
