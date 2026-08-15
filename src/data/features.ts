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
    title: "See who's listening",
    description:
      "Reads open TCP and UDP ports directly from each OS without shelling out to ss, netstat, or lsof.",
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
      "Assign labels to important endpoints, then use them in search, filters, JSON, watch events, and kick why.",
  },
  {
    id: "ask-why",
    icon: "why",
    title: "Ask why a port won't bind",
    description:
      "kick why PORT combines a process snapshot with a short-lived bind attempt, then reports the evidence behind its verdict.",
  },
  {
    id: "watch-changes",
    icon: "watch",
    title: "Watch ports change hands",
    description:
      "Emit bound, released, and replaced events in the terminal or as versioned NDJSON.",
  },
  {
    id: "scoped-cleanup",
    icon: "safety",
    title: "Tree and group cleanup",
    description:
      "Opt in to --tree for descendants when a stale dev stack has more than one PID, while POSIX process-group cleanup stays Linux/macOS-only.",
  },
  {
    id: "inspect-first",
    icon: "process",
    title: "Inspect before you kick",
    description:
      "Read-only inspect shows ancestors, descendants, siblings, command lines, ports, scoped kill hints, and process groups on Linux/macOS.",
  },
  {
    id: "tui-or-cli",
    icon: "modes",
    title: "One engine, two interfaces",
    description:
      "The TUI and CLI share native collection, config, labels, filters, and target checks, so a row means the same thing in either interface.",
  },
  {
    id: "fresh-target-checks",
    icon: "safety",
    title: "Re-check before signaling",
    description:
      "Resolve the target again after confirmation, refuse changed or uncertain scopes, then verify the selected ports disappear.",
  },
  {
    id: "cross-platform",
    icon: "platform",
    title: "Linux, macOS, Windows",
    description:
      "Each OS has native collection, with tree and group scope on Linux/macOS and inspect plus CLI tree kill on Windows.",
  },
  {
    id: "full-snapshot",
    icon: "snapshot",
    title: "Export the full picture",
    description:
      "Export one complete snapshot of TCP state, process ownership, collection scope, and any missing evidence.",
  },
  {
    id: "docker-aware",
    icon: "docker",
    title: "Docker-aware",
    description:
      "When the Docker CLI is available, Kickoutchi explains Docker-owned or partial-metadata ports and protects Docker owners by default while keeping Docker optional.",
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
      "Stable JSON, fixed exit codes, fresh safety checks, and explicit process scopes make automation predictable.",
  },
]);
