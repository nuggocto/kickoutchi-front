/**
 * Tag inline `code` in docs by what it is, so readers can tell at a glance
 * what they can run:
 *
 * - `code-cmd`  a command: `kick list --json`, `kickoutchi`, or a bare
 *               subcommand such as `watch` or `kill --port`
 * - `code-flag` a flag: `--tree`, `--port PORT`
 * - `code-key`  a key: `Enter`, `Esc`, `Ctrl+C`, and single letters on the
 *               TUI page, where they are always keybindings
 *
 * Everything else (values, JSON keys, paths) stays plain. Code inside `<pre>`
 * blocks is left alone.
 */

const COMMAND = /^(?:kick|kickoutchi(?:-update)?|list|kill|inspect|watch|why)(?:\s|$)/;
const FLAG = /^--?[A-Za-z]/;
const KEY_NAME = /^(?:Enter|Esc|Shift|Tab|Space|Ctrl\+[A-Z]|[↑↓←→])$/;
const SINGLE_KEY = /^[A-Za-z?/]$/;

function textOf(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

function kindOf(text, isTuiPage) {
  if (COMMAND.test(text)) return "cmd";
  if (FLAG.test(text)) return "flag";
  if (KEY_NAME.test(text) || (isTuiPage && SINGLE_KEY.test(text))) return "key";
  return null;
}

export default function rehypeCodeKinds() {
  return (tree, file) => {
    const isTuiPage = /[\\/]tui\.mdx?$/.test(file.path ?? "");

    function walk(node, parent) {
      if (node.type === "element" && node.tagName === "code") {
        if (parent?.tagName === "pre") return;
        const kind = kindOf(textOf(node).trim(), isTuiPage);
        if (kind) {
          const existing = node.properties.className ?? [];
          node.properties.className = [...existing, `code-${kind}`];
        }
        return;
      }
      for (const child of node.children ?? []) walk(child, node);
    }

    walk(tree, null);
  };
}
