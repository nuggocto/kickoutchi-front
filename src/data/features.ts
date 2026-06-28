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
    id: "tui-or-cli",
    icon: "modes",
    title: "TUI or CLI",
    description:
      "Open the guided terminal UI for a cozy walk through the swamp, or drive the script-friendly CLI when you already know the target.",
  },
  {
    id: "safe-kills",
    icon: "safety",
    title: "Safe by default",
    description:
      "Every termination is confirmed. Protected processes need typed confirmation, ambiguous ports are refused, and only the confirmed PID is signalled.",
  },
  {
    id: "cross-platform",
    icon: "platform",
    title: "Linux, macOS, Windows",
    description:
      "Native collection per OS: /proc on Linux, libproc/sysctl on macOS, IP Helper on Windows • with platform-correct termination.",
  },
  {
    id: "docker-aware",
    icon: "docker",
    title: "Docker-aware",
    description:
      "Explains Docker-owned or partial-metadata ports in details when the Docker CLI is available. Docker is optional, never required.",
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
      "Stable JSON output and a fixed exit-code contract (0–6) make Kickoutchi safe to wire into shell pipelines and CI.",
  },
]);
