import { getCollection, type CollectionEntry } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

/** Sidebar section order. Sections not listed here sort last. */
export const SECTION_ORDER = ["Guides", "Reference", "Safety", "Help"] as const;

/** All non-draft docs, sorted by section then by `order`. */
export async function getDocs(): Promise<DocEntry[]> {
  const docs = await getCollection("docs", ({ data }) => !data.draft);
  return docs.sort((a, b) => {
    const sectionA = SECTION_ORDER.indexOf(a.data.section as (typeof SECTION_ORDER)[number]);
    const sectionB = SECTION_ORDER.indexOf(b.data.section as (typeof SECTION_ORDER)[number]);
    if (sectionA !== sectionB) return sectionA - sectionB;
    return a.data.order - b.data.order;
  });
}

export interface DocGroup {
  section: string;
  items: DocEntry[];
}

/** Docs grouped into ordered sidebar sections. */
export async function getDocGroups(): Promise<DocGroup[]> {
  const docs = await getDocs();
  const groups: DocGroup[] = [];
  for (const section of SECTION_ORDER) {
    const items = docs.filter((doc) => doc.data.section === section);
    if (items.length > 0) groups.push({ section, items });
  }
  return groups;
}

export function docHref(entry: DocEntry): string {
  return `/docs/${entry.id}`;
}
