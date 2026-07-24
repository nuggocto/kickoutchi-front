import { z } from "zod";

/** Landing-page feature cards. Every claim here is backed by real tool
 *  behaviour (verified against the kickoutchi source), not marketing. */

const featureSchema = z.object({
  id: z.string(),
  icon: z.enum([
    "ports",
    "process",
    "modes",
    "safety",
    "platform",
    "docker",
    "filter",
    "script",
    "label",
    "watch",
    "why",
    "snapshot",
  ]),
  title: z.string(),
  description: z.string(),
});
export type Feature = z.infer<typeof featureSchema>;

export const FEATURES: Feature[] = z.array(featureSchema).parse([
  {
    id: "see-ports",
    icon: "ports",
    title: "See every open port",
    description:
      "Lists listening TCP sockets and bound UDP sockets using native collectors • no scraping ss, netstat, or lsof.",
  },
  {
    id: "know-process",
    icon: "process",
    title: "Know what owns it",
    description:
      "Shows PID, process name, parent, path, command line, bind scope, and permission status whenever the OS lets it through.",
  },
  {
    id: "name-ports",
    icon: "label",
    title: "Name your ports",
    description:
      "Label exact endpoints or protocol-and-port wildcards in config. Labels show up in the CLI, wide TUI tables, search, filters, JSON, watch events, and why output.",
  },
  {
    id: "ask-why",
    icon: "why",
    title: "Ask why a port won't bind",
    description:
      "kick why PORT combines one snapshot with a real bind probe to separate occupied, permission denied, unavailable, and unsupported — with the evidence behind each verdict.",
  },
  {
    id: "watch-changes",
    icon: "watch",
    title: "Watch ports change hands",
    description:
      "kick watch streams bind, release, replacement, and collection-gap events from bounded polling, as terminal output or one versioned NDJSON object per line.",
  },
  {
    id: "scoped-cleanup",
    icon: "safety",
    title: "Tree and group cleanup",
    description:
      "Opt in to --tree for descendants when a stale dev stack has more than one PID. POSIX process-group cleanup stays Linux/macOS-only.",
  },
  {
    id: "inspect-first",
    icon: "process",
    title: "Inspect before you kick",
    description:
      "Read-only inspect shows ancestors, descendants, siblings, command lines, ports, and scoped kill hints. Linux/macOS also show process groups.",
  },
  {
    id: "tui-or-cli",
    icon: "modes",
    title: "TUI or CLI",
    description:
      "Open the guided terminal UI for a tour of open ports, or drive the script-friendly CLI when you already know the target.",
  },
  {
    id: "safe-kills",
    icon: "safety",
    title: "Safe by default",
    description:
      "Every termination is confirmed. Unix scoped kills freeze and verify; Windows tree kill contains via Job Objects; ambiguous ports are never guessed.",
  },
  {
    id: "cross-platform",
    icon: "platform",
    title: "Linux, macOS, Windows",
    description:
      "Native collection per OS. Linux/macOS support tree and group scope; Windows supports inspect and CLI tree kill, with --group unavailable.",
  },
  {
    id: "full-snapshot",
    icon: "snapshot",
    title: "Export the full picture",
    description:
      "list --snapshot-json emits one bounded, scope-qualified observation: every native TCP state, owner identity, completeness, and the evidence gaps behind it.",
  },
  {
    id: "docker-aware",
    icon: "docker",
    title: "Docker-aware",
    description:
      "Explains Docker-owned or partial-metadata ports in details when the Docker CLI is available. Docker owners are protected by default; Docker itself is optional.",
  },
  {
    id: "filters",
    icon: "filter",
    title: "Filters & sorting",
    description:
      "Narrow the table with port:, proto:, scope:, protected:, parent:, label:, address:, scope_id:, and family: filters, then sort by port, pid, protocol, process, parent, or scope.",
  },
  {
    id: "scriptable",
    icon: "script",
    title: "Built for scripts",
    description:
      "Four versioned output contracts, fixed exit codes, --yes gates that re-check fresh scope, and explicit CLI-only inspect/group commands make automation predictable.",
  },
]);
