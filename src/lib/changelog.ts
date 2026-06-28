/** Parse the bundled Keep-a-Changelog file into structured releases. */

export interface ChangelogGroup {
  category: string;
  items: string[];
}

export interface ChangelogRelease {
  version: string;
  date?: string;
  unreleased: boolean;
  groups: ChangelogGroup[];
}

export function parseChangelog(raw: string): ChangelogRelease[] {
  const lines = raw.split(/\r?\n/);
  const releases: ChangelogRelease[] = [];
  let current: ChangelogRelease | null = null;
  let group: ChangelogGroup | null = null;

  for (const line of lines) {
    const version = line.match(/^##\s+\[([^\]]+)\](?:\s*-\s*(.+))?\s*$/);
    if (version) {
      current = {
        version: version[1],
        date: version[2]?.trim(),
        unreleased: /unreleased/i.test(version[1]),
        groups: [],
      };
      group = null;
      releases.push(current);
      continue;
    }
    if (!current) continue;

    const category = line.match(/^###\s+(.+?)\s*$/);
    if (category) {
      group = { category: category[1], items: [] };
      current.groups.push(group);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (!group) {
        group = { category: "Changes", items: [] };
        current.groups.push(group);
      }
      group.items.push(bullet[1].trim());
      continue;
    }

    // Indented, non-empty line continues the previous bullet (wrapped text).
    if (/^\s+\S/.test(line) && group && group.items.length > 0) {
      group.items[group.items.length - 1] += ` ${line.trim()}`;
    }
  }

  return releases;
}

/** Minimal, safe inline rendering: code spans and links only. */
export function inlineMarkdown(text: string): string {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}
