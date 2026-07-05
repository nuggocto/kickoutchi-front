import { z } from "zod";

/** Landing-page feature cards. Every claim here is backed by real tool
 *  behaviour (verified against the kickoutchi source), not marketing. */

const featureSchema = z.object({
  id: z.string(),
  icon: z.enum(["ports", "process", "modes", "safety", "platform", "docker", "filter", "script"]),
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
      "Open the guided terminal UI for a Donkey-style tour of open ports, or drive the script-friendly CLI when you already know the target.",
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
      "Narrow the table with port:, proto:, scope:, protected:, and parent: filters, then sort by port, pid, protocol, process, parent, or scope.",
  },
  {
    id: "scriptable",
    icon: "script",
    title: "Built for scripts",
    description:
      "Stable JSON, fixed exit codes, --yes gates that re-check fresh scope, and explicit CLI-only inspect/group commands make automation predictable.",
  },
]);
