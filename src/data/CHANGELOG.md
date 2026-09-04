# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.2] - 2026-09-05

### Fixed

- Linux now checks the kernel's initial PID namespace identity before claiming
  complete socket ownership. Nested PID namespaces with their own procfs retain
  partial ownership evidence, including sockets shared with invisible ancestor
  processes.
- Linux termination now handles process names truncated by the kernel midway
  through a Unicode character. Final validation uses the same bounded lossy
  decoding as collection and protection matching, while retaining process
  identity checks and name-size limits.
- Corrected the security policy to match the release workflow's existing
  pre-publication checks, updater smoke tests, Homebrew publication, and final
  manifest attestation coverage.
- Linux socket-helper cleanup tests now share the host observation lock, so
  their socket changes cannot race concurrent port-kill tests. Host port-kill
  tests also verify safe race refusals when namespace capabilities are required;
  those capabilities cannot prevent unrelated host sockets from changing.
  Linux CI now isolates test network traffic while retaining the runner's user
  and PID namespace for permission and ownership checks.
- Linux release archives are now executed on native runners before attestation
  and publication. Builds retain the Debian glibc compatibility floor, while
  termination tests no longer assume complete PID visibility inside a build
  container.

## [1.4.1] - 2026-08-13

### Changed

- Release artifacts and primary CI now use Rust 1.97.1, while Rust 1.95.0
  remains the minimum supported version and has a dedicated compatibility lane.
- Linux port-kill integration journeys now recognize a genuine pre-delivery
  observation race as a safe refusal on hosts without required capabilities.
  The capability-required CI gate still requires successful delivery.
- Clarified process identity and termination safety comments. Runtime behavior
  is unchanged.

## [1.4.0] - 2026-08-12

### Added

- Added global `--verbose`/`-v` diagnostics. Debug details are written only to
  stderr, leaving human, JSON, and NDJSON stdout contracts unchanged.
- Added a `docker_enrichment` configuration switch. Enabling it permits bounded,
  local-only Docker details in qualifying TUI views; disabling it guarantees
  that optional TUI process-context collection never resolves or executes the
  Docker CLI.

### Changed

- Reduced TUI rebuild work by caching the current snapshot's compact sorted
  source-index permutation across search edits and recording selection matches
  in a one-bit-per-row mask. Query matching now checks cheap exact predicates
  before metadata, specializes the common single-needle cache, skips impossible
  plain-text field formats, and avoids allocated scoped-endpoint strings and
  empty label-map lookups. Multi-needle results remain bounded and isolated;
  duplicate-row order, labels, Unicode matching, and selection behavior remain
  unchanged.
- Bundled each native socket with its owner PIDs and local completeness before
  canonicalization, making detached parallel-vector state unrepresentable and
  removing the indexed permutation and its temporary allocations.
- Replaced the immutable per-pass process-read `BTreeMap` with a validated,
  sorted contiguous table. Native adapters now return the exact requested PID
  batch, which is checked before binary-search lookup and deterministic
  metadata materialization.
- Pruned duplicated CLI and TUI orchestration tests for refusal paths already
  covered exhaustively by the collector, process-evidence, and process-tree
  layers. Representative interface mappings, delivery gates, and successful
  native journeys remain covered.
- Removed the dated v1.3.8 same-machine performance report and its duplicated
  README summary; the historical results remain available in Git history and
  the v1.3.9 changelog.
- Split the oversized observation, process, watch, scoped-kill, TUI app, and
  process-tree modules along existing responsibility boundaries. Limits, legacy
  projection, OS-specific termination, watch filtering and signal ownership,
  scoped outcome reporting, TUI helpers, tree actions, tree planning,
  freeze-first execution, and module-local tests now live in focused child
  modules without changing public behavior.
- Moved the remaining oversized inline test modules for the native platform
  adapters, Windows tree execution, Docker enrichment, collection, CLI kill and
  Why, UI rendering, diagnostics, and public output into child test files.
- Nested the Windows Job Object tree executor and its tests under the shared
  process-tree capability instead of exposing a separate crate-root module.
- Classified the library target as internal binary bootstrap plumbing and hid it
  from generated API documentation instead of presenting `run()` as a supported
  embedding contract with process-global arguments, I/O, and signal lifecycle.
- Kept termination warnings typed through their presentation boundary, removing
  prose suffix recognition and scope-specific rewrite helpers. Pruned the
  obsolete implementation-coupling test and two low-value private/trivial tests
  while preserving destructive-path and real-binary coverage.
- Simplified release maintenance by removing the duplicate quality matrix,
  pull-request packaging runs, post-publication revalidation, and the separate
  release-policy layer. Native archives and installers remain validated before
  attested Linux, macOS, Windows, and Homebrew publication.
- Reduced the release artifact validator from 2,252 to about 1,200 lines by
  relying on the archive libraries for XZ/ZIP framing, deleting elaborate
  corruption fixtures and the unreachable post-publication updater journey,
  and removing its unused test-only XZ encoder. Checksums, safe member paths,
  exact package layouts, executable/version journeys, the Linux glibc floor,
  updater smoke tests, and generated installer receipts remain enforced.
- Removed two repeated CI operations: Linux's full test suite is now the sole
  ordinary validator-test run, and the x86_64 Nix lane evaluates every declared
  system once while both x86_64 and aarch64 lanes still build and execute their
  native packages. Workflow contract helpers were shortened while retaining
  action pins, checkout isolation, least permissions, target coverage, and
  release publication ordering.
- Kept cargo-dist installed from its exact pinned source version in release
  jobs instead of switching to faster prebuilt binaries, preserving the
  existing supply-chain trust model for infrequent releases.
- Split the CLI contract suite by command and moved shared subprocess,
  socket/process, and workflow-parser fixtures under `tests/support/`. Contract
  names and safety behavior remain intact while individual files now have clear
  ownership.
- Added a documented, bounded mutation campaign for typed warnings and
  confirmation matching. Mutation evidence justified removing a redundant
  private decision table and exposed two warning branches plus a tree metadata
  wait diagnostic that now have focused behavioral coverage.
- Moved package-manager installation ahead of direct remote-installer commands
  in the README.
- Changed optional Docker enrichment from default-on to explicit opt-in.

### Fixed

- Updated the Ratatui dependency graph to require the panic-safe `lru` 0.18.2,
  removing the safe-Rust use-after-free reported as RUSTSEC-2026-0253.
- Kept local mutation campaigns from dirtying the checkout by ignoring
  cargo-mutants' root-level `mutants.out/` workspace.
- Moved scheduled and documented fuzz campaigns onto disposable working
  corpora. Checked-in seeds remain read-only, and only intentionally minimized
  regression fixtures are copied back.
- Strengthened the Windows private Job Object freeze preflight: a disposable
  helper now checks execution before freeze, suspension while frozen, and
  resumption after thaw before any selected target crosses the assignment
  boundary.
- Corrected the direct-PID documentation: an unscoped PID must own a visible
  open port, while tree and group targeting may resolve a live portless root.

### Removed

- Retired the source-built `kickoutchi` AUR package and its in-repository
  packaging. Arch users now have one supported AUR path, `kickoutchi-bin`,
  backed by the checksummed Linux release archives.

## [1.3.10] - 2026-08-02

### Changed

- Simplified internal maintenance code without changing public behavior: documented four module
  boundaries, reduced configuration-reader preallocation, replaced three infallible sequence
  serializers with their direct iterator form, and aligned local dependency-policy checks with
  CI's main and fuzz workspace coverage.
- Centralized narrowly shared test fixtures so synthetic TCP and UDP rows carry matching
  listen/bound states and permission-denied ownership scenarios have one source of truth.
- Made watch polling timing easier to audit by centralizing wall-clock projection, monotonic
  deadline arithmetic, and cancellation/deadline decisions without changing scheduling or output
  behavior.

### Fixed

- Linux `kill --port` now refuses to signal a visible owner when incomplete process or descriptor
  visibility leaves an ownership gap without endpoint provenance, since an unobserved process
  could share the selected socket.
- Release publication now attests cargo-dist's host-generated `dist-manifest.json` before the
  public installer journey or package-manager publication. This closes the provenance-gate
  mismatch found while publishing 1.3.9, where the verifier correctly checked the manifest but the
  pre-publication attestation job could not yet include it.

## [1.3.9] - 2026-07-30

### Added

- Release assets now receive GitHub artifact attestations in a dedicated least-privileged job after
  native archive and installer validation. Release publication requires successful attestation,
  and the post-publication journey verifies every downloaded asset before executing the installer.
- Added a finite native API boundary audit covering all 119 platform-call blocks, their ownership
  and buffer invariants, process-identity protections, error handling, native validation, and
  explicit re-audit triggers.

### Changed

- CI now starts supply-chain, Linux, Windows, macOS, and both Nix lanes concurrently, runs
  formatting and doctests once on Linux, and reports one fail-closed `CI Complete` result after
  every lane finishes. Push CI is limited to the default `shrek` branch while pull-request and
  scheduled coverage remain enabled; the existing cancellation policy and cache-free builds are
  unchanged.
- Recorded a dated, same-machine Linux performance snapshot for cold/warm startup, `list`,
  `list --json`, CPU, peak RSS, binary/package size, and exit correctness. Three fixed-seed
  interleaved sessions provide 3,000 observations per build and workload, including a
  higher-confidence p99; the v1.3.8 comparison found no meaningful regression, and noisy latency
  measurements remain outside required pull-request CI.
- Distribution builds now strip symbol tables while retaining Rust's unwind strategy and cleanup
  behavior, reducing shipped and installed binary size without changing runtime code paths.
- Added three pure, bounded parser campaigns for configuration, synthetic Linux process data, and
  release-archive member paths. Small saved corpora replay in ordinary tests, while exact-toolchain
  60-second campaigns run only weekly or on manual request; the auxiliary dependency lock receives
  the same advisory, license, ban, and source checks as the main crate.
- Windows tree preparation, containment, and post-commit reporting now share the same refusal
  vocabulary and semantic exit classification used by Unix tree handling. CLI and TUI renderers
  share stable tree-refusal causes and direct termination descriptions while retaining their
  interface-specific recovery details.
- Docker output-drain and child-cleanup workers now use one bounded capacity primitive with atomic
  multi-slot reservations and independently owned permits. Scoped tree/group confirmation shares
  only its identical prompt execution; the safety-critical revalidation, freeze/commit, and
  termination ordering remains explicit.
- Host-sensitive CLI tests no longer reserve and release an ephemeral port before launching a
  competing process. Linux no-match diagnostics run in an isolated user/network namespace, and
  workflow security tests assert native platform coverage and unprivileged metadata generation
  without pinning incidental runner labels or setup commands.
- Documented that direct PID termination intentionally permits an ordinary parent process,
  including the invoking shell, while PID 0, PID 1, Windows System PID 4, Kickoutchi itself, and
  scoped kills containing Kickoutchi remain refused.

### Removed

- Removed the temporary local benchmark harness and its harness-only tests after recording the
  reproducible performance snapshot. The bounded parser fuzzing campaigns and saved regression
  corpora remain part of normal and scheduled verification.

## [1.3.8] - 2026-07-29

### Changed

- Consolidated small internal policies without changing public behavior: optional process-context
  limits now live in one platform-neutral location, snapshot and watch sorting use one
  owner-completeness comparator, and Unix signal and tree-stop deadline mappings each have one
  implementation.
- Integration-test configuration directories now use exclusive creation with a process-local
  monotonic counter, preventing parallel tests from sharing and deleting one another's live
  directories. The Windows PID-existence probe also reports wait failures instead of treating them
  as a live process, and bounded synthetic tree fixtures avoid colliding with the running test
  process.
- Simplified bounded platform adapters and watch output handling while retaining their existing
  fail-closed limits, error classifications, and public output.

### Removed

- Removed a byte-for-byte duplicate ownership-authority test and stale internal branches,
  annotations, derives, and assignments that carried no behavior.

### Fixed

- A Windows port-selected `--tree` kill whose root exits during final preparation now reports
  `already exited` with the no-match exit status instead of misreporting a changed process identity
  as a failure.
- Linux protected-process matching now reproduces the kernel's raw 15-byte `/proc/<pid>/comm`
  truncation when it splits a UTF-8 code point, so configured non-ASCII protected names cannot
  silently lose protection after lossy decoding.
- The TUI details panel now renders one protected-process warning in its reserved row and retains
  the selected process's permission status at the minimum supported terminal size.

## [1.3.7] - 2026-07-28

### Added

- A copy-ready root `config.example.toml` demonstrates settings and exact-before-wildcard endpoint
  labels, with parser coverage that keeps the example aligned with the accepted schema.
- Release qualification now executes native updaters and isolated installers on Linux, macOS, and
  Windows, repeats the Linux journey through final public URLs, verifies exact Arch metadata, and
  rebuilds Linux updater artifacts at the documented glibc 2.31 floor.

### Changed

- Human-readable endpoints retain IPv6 interface scope in list tables, the TUI, inspect, watch,
  Why, search, ambiguity diagnostics, and kill confirmations. Legacy list JSON remains unchanged.
- Internal policy and collection paths were consolidated without changing public behavior.

### Removed

- Dead internal paths, redundant tests, and the inactive in-repository Scoop mirror were removed.
  The live `nuggocto/scoop-bucket` remains the Scoop source of truth.

### Fixed

- Concurrent embedded watch sessions now fail immediately instead of sharing process-global Ctrl-C
  state. Signal-handler ownership remains fail-closed if restoration fails, and observed
  cancellation stays latched so a delayed callback cannot cancel a later watch owner.

## [1.3.6] - 2026-07-26

### Added

- Versioned evidence gaps now include nullable `affected_pid_count`. Linux keeps target-relevant
  PID losses exact while aggregating unrelated bounded owner-scan losses; repeated consistency
  passes retain the maximum aggregate count rather than summing overlapping observations.

### Changed

- `list --process ""` is now an invalid-argument error (exit `2`) instead of accidentally matching
  every row with a readable process name.

### Removed

- Automatic weekly GitHub release checks, update caches, install-provenance notices, and the runtime
  TLS dependency stack were removed. The old boolean `check_for_updates` key remains accepted and
  ignored for config compatibility. The explicit `kickoutchi-update` helper is unchanged.

### Fixed

- Duplicate cross-pass evidence gaps no longer consume multiple retention slots or make otherwise
  usable observations look incomplete.
- Config diagnostics preserve TOML excerpts while keeping path and I/O text terminal-safe, and
  protected-process limit errors report raw, unique, built-in, and merged counts accurately.
- TUI worker panics return to owner control flow so the terminal is restored before the failure is
  reported, including a panic racing with quit.
- Release qualification separates successful Linux group-kill coverage from race refusal, pins
  Linux builders by digest, rechecks the release tag, and serializes package publication.

## [1.3.5] - 2026-07-26

### Fixed

- The foreground update check releases its cache lock before starting the
  detached worker, preserving bounded lock acquisition when several commands
  launch close together.
- Homebrew publication and formula installation now run through the canonical
  tap path and a pinned disposable Homebrew environment, avoiding hosted-runner
  path and temporary-volume failures.
- The Arch source package disables link-time optimization that is incompatible
  with the bundled TLS implementation on the current Rust toolchain.
- macOS release qualification accepts bounded visibility gaps without weakening
  the terminal fail-closed behavior required after repeated collection gaps.

## [1.3.1] - 2026-07-26

### Added

- A silent, timeout-bounded stable-release check runs at most once every seven
  days outside the foreground command. New-version notices recommend the right
  update path for Homebrew, Scoop, AUR, Linux Nix, Cargo, or standalone installs,
  never contaminate structured output, and can be disabled in configuration.

### Changed

- Nix flake outputs are explicitly Linux-only. Nix, Homebrew, Scoop, and AUR
  installs now carry provenance markers so update notices can give
  package-manager-specific guidance.
- Linux release archives are built in pinned Debian 11 containers with a glibc
  2.31 compatibility floor, and release validation rejects newer symbol
  requirements.

### Fixed

- Linux and macOS scoped termination now observes suspension under one shared
  deadline and handles pre-stopped processes without leaving targets frozen
  after refusal or successful termination delivery.
- Windows tree termination reconciles every live pinned descendant with its
  frozen Job Object immediately before termination and thaws on every refusal.
- TUI startup, undersized confirmation dialogs, terminal signal restoration,
  Docker named-pipe validation, macOS dual-stack decoding, protected-process
  matching, terminal sanitization, and broken-pipe handling are more robust.

## [1.3.0] - 2026-07-24

### Added

- `watch`, a bounded polling view that streams `baseline`, `bind`, `release`,
  `replacement`, and `collection_gap` events as terminal output or versioned
  `kickoutchi.watch_event/1` NDJSON. Intervals are `100ms..=60s`, optional
  durations are `100ms..=7d`, and Ctrl-C, duration expiry, and a closed consumer
  all exit cleanly.
- `why PORT`, which combines one native snapshot with immediate TCP/UDP bind
  probes to explain whether an exact endpoint is bindable right now. It reports
  bindable, occupied, permission denied, address unavailable, unsupported, and
  retained OS errors, each with ordered evidence and a certainty of `proven`,
  `estimated`, `heuristic`, or `unknown`.
- `list --snapshot-json`, one `kickoutchi.snapshot/1` document holding the
  complete in-scope native observation: every TCP state, owner identity,
  completeness, process metadata, evidence gaps, scope limitations, and labels.
  Snapshot mode bypasses list filters, sorting, and system-row hiding, and does
  not serialize full command lines.
- Endpoint labels configured with up to 256 `[[ports]]` selectors. Exact
  addresses beat `"*"` wildcards, IPv6 scopes are matched by numeric
  `scope_id`, and labels are validated safe Unicode of at most 128 bytes.
  Labels appear in the CLI, wide TUI tables, search, filters, legacy JSON,
  snapshots, watch events, and why output.
- Shared `label:`, `address:`, `scope_id:`, and `family:` filters across list,
  TUI search, and watch, plus the watch-only `state:` vocabulary covering every
  native TCP state.

### Changed

- List, TUI, inspect, and kill now read one bounded, consistency-checked native
  snapshot. Unprivileged `kill --port` keeps working when the endpoint has one
  verified owner; unrelated unreadable host processes no longer turn the
  flagship port-kill path into a root-only operation.
- Windows tree kill freezes the committed Job Object for its final validation
  sweep, closing the descendant-spawn window before whole-job termination. A
  live member that cannot join the job now withholds all termination instead of
  receiving racy individual fallback termination.
- `list --json` documents `child_pids` as what it always was: a frozen `1.x`
  compatibility field that is `[]` on every row and platform. The wire output is
  unchanged.
- Structured output states permanent platform limits rather than implying
  machine-wide visibility. Linux excludes other network namespaces, native
  Windows excludes the WSL network stack, macOS is process-first, watch polling
  can miss transient activity, and a why probe cannot reserve an endpoint.

### Fixed

- Tree and group cleanup no longer reports a member that exited under the freeze
  as a thaw failure; only a refused `SIGCONT` leaves a process that may still be
  stopped.
- macOS termination distinguishes a process that exits between `SIGTERM` and the
  guarded identity check from an unreadable or recycled PID, and resumes a
  detected PID-reuse replacement without signalling it.
- Inspect joins process, port, and command-line observations by PID and start
  identity, refusing a changed port owner instead of attributing sockets to a
  recycled PID.
- Confirmation input applies its 128-byte limit to the entered UTF-8 payload
  rather than counting the terminal line ending.
- Linux treats restricted or unverifiable procfs and PID-namespace visibility as
  partial ownership instead of a false complete empty result, and parses the
  bounded ASCII tail of `/proc/<pid>/stat` from bytes so a non-UTF-8 process name
  cannot abort collection.
- Windows converts IPv6 scope IDs from network byte order, normalizes
  IPv4-mapped endpoints, retains ownerless rows as partial evidence, and never
  treats PID `0` as a process.
- Docker enrichment stops retaining at the first byte past each cap, hands
  timed-out children to capped cleanup workers that own them through confirmed
  reap, and keeps IPv4 and IPv6 publications separate.

### Security

- Docker enrichment is pinned to a bounded local Unix socket or Windows named
  pipe, with ambient host, context, and TLS selectors removed. A remote Docker
  context can no longer be presented as local container ownership.
- Release jobs install an exact locked cargo-dist version, Homebrew validation
  runs without tap credentials, and repository and tap tokens exist only on the
  specific steps that plan or publish.
- Added a private vulnerability-reporting policy and documented the sensitivity
  of command lines exposed by the legacy JSON compatibility interface.

## [1.2.0] - 2026-07-11

### Changed

- Windows tree-kill reports now retain normalized PID lists for Job Object
  delivery, verified fallback termination, already-exited members, and members
  not confirmed terminated.

### Fixed

- Release publication now waits for Linux, Windows, macOS, and supply-chain
  checks on the exact tag SHA before publishing artifacts.
- CLI confirmations reject and drain lines beyond the 128-byte cap instead of
  truncating them into a potentially valid destructive confirmation.
- Config files fail closed past a 64 KiB byte cap.
- Linux collection caches process metadata once per PID and enforces aggregate
  PID, file-descriptor traversal, and emitted-row limits.
- Windows parent links with equal creation timestamps remain explicitly
  unverified; tree completion uses one shared deadline and disjoint PID outcome
  reporting.
- Failed Windows Job Object termination retains the complete partial-action
  report and refreshes confirmed target ports before returning failure.
- TUI details collection is single-flight, with one bounded latest-request slot
  and stale result rejection.
- Docker enrichment drains stdout and stderr concurrently, bounds retained
  output and drain waits, and caps stuck drain workers globally.
- CLI table columns align by terminal display width for accented and CJK names.
- Human-facing command diagnostics sanitize bidi and zero-width controls.
- Tree confirmation budgeting accounts for terminal word wrapping and reserves
  enough vertical space for prompts, errors, and the cancel hint.
- Windows tree sweeps report unexpected process-open failures accurately instead
  of mislabeling them as permission denied.

### Security

- PATH-resolved Docker enrichment is disabled while Kickoutchi is elevated,
  including Unix root/set-ID/capability contexts and elevated Windows tokens.
- Release installer assets are downloaded and SHA-256 verified before execution,
  and workflow tag values are passed through environment variables rather than
  inline shell interpolation.
- Linux `/proc` stat and status reads fail closed past their byte caps instead of
  silently truncating identity metadata.

## [1.1.2] - 2026-07-07

### Added

- Homebrew tap publishing for releases. The generated formula lands in
  `nuggocto/homebrew-tap`, so Homebrew users can install with
  `brew install nuggocto/tap/kickoutchi`.
- Scoop bucket packaging for Windows. The live `nuggocto/scoop-bucket` manifest
  auto-updates from GitHub Release assets and their `.sha256` sidecars.

### Changed

- Install documentation now lists Homebrew and Scoop as available package-manager
  paths while keeping AUR marked as publication-paused.

## [1.1.1] - 2026-07-05

### Fixed

- Protected-process defaults now cover Linux and macOS Docker owners including
  `dockerd`, `docker-proxy`, and `com.docker.backend`, and Linux protected-name
  matching accounts for `/proc/<pid>/comm` truncation of long configured names.
- CLI list and inspect output now handle broken pipes explicitly, so piping to
  short readers exits cleanly inside the documented exit-code contract instead
  of panicking.
- Tree kill no longer aborts when only the frozen root is reparented by an
  unfrozen parent exiting mid-sweep, while the frozen-set protection gate fails
  closed if process metadata unexpectedly loses a name.
- The TUI no longer performs selected-process metadata scans on the input path
  before opening kill confirmations; it uses the existing background worker and
  refuses submission until identity metadata has landed.
- Human-facing sanitization now replaces bidi and zero-width display controls,
  closing terminal display-spoofing gaps in names, paths, and status text.
- Inspect tree output now renders branchy descendants in parent order instead
  of depth-only order, so indentation matches the actual tree.
- Docker enrichment bounds its post-timeout output drain, and Windows tree
  fallback exit probes use zero-timeout waits instead of blocking per member.
- Linux `/proc/net` address decoding uses native-endian words, fixing
  big-endian Linux without changing little-endian behavior.

### Changed

- CI supply-chain checks now run on a schedule, GitHub Actions are pinned to
  commit SHAs, release workflow permissions are narrowed, and warnings are
  enforced by CI rather than the published Cargo manifest.
- Contract tests add real-binary coverage for configured protected-process
  refusal and UDP/IPv6 listing, avoid PID substring assertions, and use longer
  helper deadlines for slower CI hosts.

## [1.1.0] - 2026-07-04

### Added

- Windows `kick inspect --pid <PID>` / `--port <PORT>` now prints the read-only
  family view: ancestors, descendants, siblings, ports, command lines, and the
  matching `kick kill --pid <root> --tree` hint. Windows omits the POSIX
  process-group section, reports parent links only after creation-time sanity
  checks, and states the native WSL2 limitation plainly.
- Windows CLI `kick kill --port <PORT> --tree` / `--pid <PID> --tree` now
  terminates descendant trees through Job Object containment. Normal `kick kill`
  remains single-PID precise, `--group` stays Unix-only, and the Windows TUI
  still does not bind or advertise `t`/`T` tree keys.
- Windows tree termination preflights before assigning the root to a Job Object,
  treats root assignment as the irreversible commit boundary, verifies the root
  handle against the confirmed creation marker, then hard-terminates contained
  members. Partial containment and not-terminated members are reported honestly.
- Windows parent links with missing creation-time metadata now fail closed when
  they could point into the confirmed tree, so `--tree` refuses as incomplete
  metadata instead of silently omitting a possible descendant.

## [1.0.1] - 2026-07-04

### Fixed

- macOS scoped kills now narrow process-table snapshots to the active tree or group during execution,
  so unrelated system `EPERM` rows do not hide real target-scope safety failures while unreadable
  in-scope members still fail closed.
- The TUI status line now sanitizes every value it renders — the active filter text and the
  filter-error, error, and kill-status fields — so a process name or error message carrying control
  or escape bytes cannot redraw the terminal or fake output through the status bar.
- The "no confirmed socket" port diagnostic now sanitizes the related process's name before printing
  it. This closes the one hint path where a process that named itself with terminal escape sequences
  could reach stderr unsanitized; the quoted command line in the same message was already escaped.

## [1.0.0] - 2026-07-03

### Added

- Linux and macOS `kick kill --port <PORT> --tree` / `--pid <PID> --tree` now
  terminates the whole descendant tree rooted at the confirmed target, not just
  one process. Normal `kick kill` is unchanged and still signals exactly one PID.
- Linux and macOS `kick kill --port <PORT> --group` / `--pid <PID> --group` now
  terminates every visible member of the target's POSIX process group. This is
  the explicit tool for reparented workers, double-forked helpers, and cases
  where tree scope would leave survivors behind.
- Linux and macOS `kick inspect --port <PORT>` / `--pid <PID>` now prints a
  read-only family report: target command line, visible ports, ancestor chain,
  siblings, bounded descendant tree, process-group members, and the matching
  `--tree` or `--group` command when useful.
- The TUI now supports tree cleanup on Linux/macOS: `t` terminates the selected
  process tree and `T` force-kills it. The preview runs in the background, shows
  the bounded tree before confirmation, and execution always re-collects fresh.

### Safety

- Tree/group kill use a freeze-first Unix pipeline: stop the root first, sweep to
  a fixed point, verify every stopped member's identity, refuse uncertain scopes,
  and thaw everything on every abort path.
- Linux tree/group delivery opens pidfds before `SIGSTOP` and reuses them for
  thaw and final signal delivery, keeping every member pinned from freeze to
  finish.
- Normal group termination queues every `SIGTERM` before any stopped member is
  continued, so parent-like group members cannot wake up and spawn survivors
  while other members are still frozen.
- `--yes` is stricter for scoped kills: it can skip only all-clear prompts, never
  protected-root confirmation, and fresh execution-time scans can still refuse if
  the scope grew or warnings appeared after the original preview.

### Platform notes

- Windows keeps the existing safe single-process behavior in 1.0: native IP
  Helper listing and handle-based `TerminateProcess` delivery. `--tree`,
  `--group`, `inspect`, and TUI `t`/`T` are intentionally Linux/macOS-only until
  the Windows Job Object containment design receives implementation and manual
  Windows QA.
- Release metadata now targets `1.0.0`, including Cargo and Nix package version
  metadata.

## [0.1.2] - 2026-06-28

### Added

- Release installers now include the `kickoutchi-update` helper from
  `cargo-dist`, so installer-based Linux, macOS, and Windows users can update to
  newer releases by running `kickoutchi-update` after installing this version or
  newer.
- The README now documents how installer users get the updater helper and how
  existing `0.1.0`/`0.1.1` installs can opt in by rerunning the latest installer
  once.

## [0.1.1] - 2026-06-27

### Added

- Added a `cargo-deny` policy for dependency advisories, duplicate/wildcard
  dependency rules, allowed source registries, and dependency licenses.
- GitHub Actions CI and the local `mise run check` task now run
  `cargo deny check` alongside formatting, strict Clippy, and tests.

### Changed

- Cargo source packages now exclude local `mise.toml`, keeping local tool-trust
  config out of published crate sources.

### Fixed

- The source Arch `kickoutchi` PKGBUILD now invokes `/usr/bin/cargo`,
  `/usr/bin/rustc`, and `/usr/bin/rustdoc` directly during prepare/build/check,
  so user tool shims cannot break `makepkg` builds or doctests.

## [0.1.0] - 2026-06-27

### Changed

- Windows TUI/CLI termination now separates user intent from the underlying
  delivery mechanism: lowercase `x` / non-`--force` is a normal termination
  request with `y` confirmation, while uppercase `X` / `--force` keeps the
  stronger typed `force` confirmation. Windows still delivers both through
  `TerminateProcess` because Kickoutchi does not have a reliable graceful
  process-handle equivalent; the confirmation copy and project notes now state
  that plainly instead of making lowercase `x` look like an accidental force key.
- The Windows protected-process defaults now include core Windows process names
  such as `System`, `svchost.exe`, `services.exe`, `lsass.exe`, `wininit.exe`,
  and Docker/Postgres `.exe` variants. The system/service classifier also treats
  PID 4, known Windows OS process names, and children of `services.exe` as
  system/service rows for warning and optional hiding.
- CLI kill now performs a best-effort post-kill port refresh after a successful
  termination and reports whether the confirmed target ports are still visible,
  instead of only telling the user to refresh manually.

- Linux termination now opens a pidfd before the mandatory pre-signal
  revalidation and sends `SIGTERM`/`SIGKILL` through `pidfd_send_signal` instead
  of raw `kill(pid, signal)`. This keeps the signal tied to the prepared process
  handle after the PID/start-time/port checks pass. It raises the floor for
  termination to Linux 5.3+ (`pidfd_open`); older kernels fail closed with an
  actionable error that names the requirement, without sending a signal.
- TUI refresh now uses a single in-flight background worker instead of running
  the full Linux `/proc/<pid>/fd` owner scan on the render/input loop. The last
  good snapshot remains visible while refresh is running. The first snapshot is
  still collected synchronously so the TUI opens onto real rows instead of a
  blank table, and any in-flight background refresh is abandoned when a
  synchronous snapshot (such as the post-kill refresh) is applied, so a stale
  scan cannot overwrite newer rows.
- Safe termination now carries an internal Linux process-start identity from
  `/proc/<pid>/stat` through confirmation and pre-signal revalidation. The raw
  tick value is not rendered or serialized, but it lets Kickoutchi refuse a kill
  if PID reuse is detected before the signal boundary.
- Internal cleanup, no external behavior change: collapsed the
  duplicate `KillTarget` constructor into a single `from_entries`, switched the
  confirmation modal's force-mode check from a signal-label string comparison to
  `KillMode` equality, and narrowed `current_user_id` to private.
- Comment accuracy, no behavior change: `PortEntry.child_pids` is now documented
  as a reserved field that stays empty on real rows (the Linux collector never
  fills it; selected-row children live in `ProcessContext`, and it remains only
  for the `list --json` shape and the fake fixture); the already-exited TUI kill
  test no longer describes the removed "refreshed snapshot" status wording; and
  `parse_process_start_time_ticks` now explains why it right-splits on `") "` so
  an unescaped `)` inside `comm` cannot be mistaken for the field terminator.
- The `KillTarget` construction invariants are now release assertions instead of
  debug-only ones: the target must contain at least one row, and every row's PID
  must match the target PID. A future caller that builds a kill target from no
  rows, or from rows owned by another PID, now fails fast on the termination path
  instead of carrying a degenerate, port-less, or mis-targeted target forward.
- Linux collector owner resolution now only records owners for socket inodes
  found in the collected `/proc/net/*` rows. It keeps every PID that references a
  target socket inode, so forked or inherited listening sockets are represented
  as multiple candidate owners instead of being collapsed to whichever PID was
  scanned first.
- Linux collector now reads `/proc/<pid>/status` through a byte-bounded reader,
  matching the existing cap on `/proc/<pid>/cmdline`, so every `/proc` read in the
  collector is explicitly limited; `PPid` sits near the top of `status`, so the
  cap never truncates the parent PID.
- TUI/CLI query matching now normalizes text filter needles once per query and
  avoids formatting socket-address strings unless the search text is
  socket-shaped, reducing per-keypress allocations in search mode.
- Removed the unused direct `anyhow` dependency from `Cargo.toml`; typed module
  errors remain the current error boundary.
- No-match port related-process diagnostics now use stricter rules that keep the
  main table limited to OS-confirmed sockets, preserve CLI exit codes, avoid
  polluting JSON output, and require port-shaped matchers instead of raw
  substring matching.
- `protected_processes` in the config file now extends the built-in defaults
  instead of replacing them, with exact-match de-duplication. Adding `redis`
  no longer silently removes protection from `systemd`, `postgres`, and the
  other defaults; this matches the documented "can be extended in config"
  behavior.
- Internal restructure: shared application code moved from `src/main.rs` to
  `src/lib.rs` (public surface: a single `kickoutchi::run()`), with thin
  binary wrappers in `src/bin/kickoutchi.rs` and `src/bin/kick.rs`. Behavior
  is unchanged; the shared code now compiles once for both binaries, unit
  tests no longer run twice, and the duplicate-target Cargo warning is gone.

### Fixed

- Docker details enrichment now runs through a selected-row background worker, so
  opening details on a slow Docker host no longer blocks TUI input. Docker
  enrichment also works for partial-metadata rows with no readable process name
  when Docker reports a matching published host port.

- Windows termination liveness check now uses `WaitForSingleObject(handle, 0)`
  instead of comparing `GetExitCodeProcess` against `STILL_ACTIVE`, removing
  the ambiguity where exit code 259 was indistinguishable from "still running".

- Protected-process confirmation now compares user input against the
  sanitized process name, so what the prompt displays is exactly what the
  user must type (PID fallback still works).

- Windows TUI Caps Lock behavior no longer turns an intended lowercase `x` into
  force-kill. The force-kill key now requires an explicit Shift-modified `X`, so
  a Caps Lock uppercase `X` stays on the normal termination path.
- Typed force confirmation now accepts `force` case-insensitively, so `FORCE`
  does not trap users who entered the confirmation prompt with Caps Lock enabled.
- Protected-process confirmation now matches process names case-insensitively on
  Windows, matching Windows protected-name policy.
- Windows termination now waits briefly for a successful `TerminateProcess` call
  to complete before reporting success, reducing stale post-kill refreshes where
  a port can still appear immediately after the kill request.
- No-match related-process diagnostics now skip Kickoutchi's current process and
  its ancestors, avoiding false hints for the parent PowerShell/cargo command
  that launched `kick list --port <PORT>`.

- CLI `kill --yes` now prints the target banner • identity, ports, equivalent
  command, and any safety warnings (system/service process, ownership by another
  uid, partial metadata, child processes) • to stderr before signalling, instead
  of showing them only on the interactive confirmation path. `--yes` opts out of
  the prompt, not the warnings; the protected-process and unsafe-PID gates are
  unchanged, and stdout and exit codes are untouched so scripts are unaffected.
- TUI kill status lines now report only the signal outcome instead of also
  claiming a refreshed snapshot before the post-kill re-collect has run. The freed
  port still drops from the table via the best-effort refresh, but a failed
  re-collect surfaces as the usual error line rather than a status that overstates
  a refresh that did not happen.
- TUI header now lists `x/X kill` so the force-kill key is discoverable from the
  main screen, matching the input handling and the help modal.
- TUI termination now re-collects the port snapshot when a target exits between
  confirmation and `pidfd_open`. The prepare-error already-exited path returned
  without re-collecting, leaving the freed port on the table for up to one refresh
  interval. Other prepare failures (permission denied, an old kernel) leave the
  process running, so the table is already current for them.
- Termination confirmations now warn when a target is classified as a
  system/service process, not only when it is on the protected-process list.
- Pre-signal revalidation now reports ownership unavailable if any confirmed
  target port becomes visible without a readable PID, including mixed cases where
  another confirmed port still has the original PID.
- No-match related-process diagnostics no longer treat colon-shaped incidental
  tokens such as `duration:3000ms` or `host:3000abc` as socket evidence.
- `kill --port` now refuses inherited/shared listening sockets instead of
  signaling one arbitrary owner and reporting success while another process keeps
  the port open. The Linux collector emits one row per PID referencing the same
  socket inode, which lets the existing ambiguous-target guard list every
  candidate and require `--pid`.
- `kill --port` on a visible port whose owning PID is unavailable now exits with
  the documented permission-denied code `4` instead of the no-match code `3`,
  including when ownership becomes unavailable during the mandatory pre-signal
  revalidation.
- `kill --pid` now matches `kill --port` and the TUI when a confirmed target port
  stays visible but its owning PID becomes unreadable during pre-signal
  revalidation: it exits with the permission-denied code `4` instead of the
  no-match code `3`, and still sends no signal. A shared ownership-unavailable
  check now backs all three paths so they cannot drift.
- TUI pre-signal revalidation now reports an owner whose PID became unreadable as
  ownership-unavailable, matching the CLI, instead of labelling it a changed
  target; both still refuse to send a signal.
- Removed the stale `#[allow(dead_code)]` from `ExitReason`; every variant is
  now constructed by the CLI exit path, so the lint suppression would have
  hidden genuinely unreachable variants in future refactors.
- TUI `Esc` no longer quits when a filter is still applied after search editing
  finished: with no modal open and a non-empty filter, `Esc` now clears the
  filter and only quits on a second press once nothing is left to clear. An open
  modal still takes precedence. Previously, pressing `Enter` to finish a search
  and then reflexively pressing `Esc` ended the session instead of dropping the
  filter.
- TUI auto-refresh now schedules the next refresh from collection completion
  time instead of collection start time, avoiding an immediate repeat refresh
  when a slow `/proc` scan takes longer than the configured interval.
- CLI `list` now prints `no open ports visible` when `hide_system_processes`
  suppresses every collected row, instead of implying the machine has no open
  ports at all.
- TUI help modal title now reads `Kickoutchi` instead of an outdated numbered
  title.
- TUI status bar, borders, titles, and muted text now use terminal-default or
  bold-reversed styles instead of fixed dark-gray/black combinations, so the
  interface remains readable in both light and dark terminal themes.
- Linux collection no longer fails the whole scan when optional IPv6 socket
  tables such as `/proc/net/tcp6` or `/proc/net/udp6` are absent; IPv4 socket
  tables remain required.
- IPv4-mapped IPv6 socket addresses such as `::ffff:127.0.0.1` are normalized
  or classified as IPv4 loopback/local addresses instead of being mislabeled as
  generic local IPv6 binds.
- Terminal-state leak on TUI startup errors: a failure between enabling raw
  mode and constructing the terminal (entering the alternate screen, or the
  terminal's initial size query) now restores the terminal before the error
  propagates, instead of leaving the shell stuck in raw mode. Clean exits,
  propagated errors after startup, and panics were already covered by the
  guard and panic hook; this closes the remaining error window during setup.

### Added

- Release/distribution setup: `cargo-dist` now generates a GitHub Release
  workflow for Linux, macOS, and Windows archives, with shell and PowerShell
  installers, per-artifact checksums, `sha256.sum`, and `dist-manifest.json`.
  The repository also includes a Nix flake for `nix run` / `nix profile install`
  and Arch `kickoutchi` / `kickoutchi-bin` PKGBUILD templates.

- Optional Docker port-ownership enrichment in TUI details: Docker-looking or
  metadata-hidden port owners can be matched to running containers by published
  host port, protocol, and host address through a bounded
  `docker container ls --filter publish=...` lookup. Details can show container
  name/ID, Compose project/service labels, and a safer `docker stop <container>`
  command when exactly one container matches; Docker failures remain non-fatal
  enrichment misses.

- Native macOS support: `kickoutchi`/`kick` now lists TCP listeners and bound UDP
  sockets through `libproc` / `sysctl`, enriches rows with process metadata when
  available, uses start-time-guarded single-PID `SIGTERM` / `SIGKILL`
  termination, and renders macOS equivalent commands as `kill <PID>` or
  `kill -9 <PID>`. The default macOS path has no `lsof` dependency.
- macOS validation coverage now includes Darwin socket/procargs unit tests,
  a macOS-only CLI listener/interactive-kill smoke test, a GitHub Actions macOS
  job, and `mise` tasks for Linux-hosted Darwin `cargo check` / strict Clippy
  runs on both `x86_64-apple-darwin` and `aarch64-apple-darwin`.

- Human-display sanitizer that strips control characters, newlines, and ANSI
  escape sequences from OS-provided process metadata before rendering it in
  CLI table output, TUI table/details/confirm modals, kill banners, and
  confirmation prompts. JSON output stays raw and structured.

- Short `kick` binary integration test verifying that `--help` reports
  `Usage: kick`, `--version` reports the canonical `kickoutchi` name, and
  `list --json` prints valid JSON.

- Windows CLI contract coverage now starts a real local TCP listener, verifies
  `list --port` sees it, confirms `kill --pid` interactively with `y`, waits for
  the helper to exit, and verifies the port disappears. This complements the
  existing Windows unit coverage for IP Helper row normalization and Windows
  termination error mapping.

- `mise.toml` now includes local task aliases for formatting, strict Clippy,
  tests, the combined CI-equivalent check, and common `run`/`list` commands.
- Linux `/proc/<pid>/stat` start-time parsing is now tested for a `comm` that
  contains `) `, pinning the right-split that keeps the parse robust against
  unescaped parentheses in the process name.
- Linux CLI contract coverage now includes a real `SIGTERM` path: a controlled
  helper process binds a TCP listener, `kickoutchi kill --pid --yes` terminates
  it, and a follow-up list confirms the port disappears.
- TUI confirmed-kill execution is now covered with injected collection/context/
  termination seams, including successful refresh and stale process-identity
  refusal without sending a signal.
- GitHub Actions CI now runs on Linux pushes and pull requests, using the pinned
  Rust toolchain to check formatting, strict Clippy, and the full test suite.
  Release/CD automation remains deferred to the dedicated `cargo-dist` workflow.
- CLI contract integration tests now exercise script-facing `list` behavior with
  the real binary: human no-match diagnostics go to stderr, `list --json` stays
  unpolluted, and explicit no-match filters exit `3`. The helper process uses
  `sh`, so the suite needs no Python (or any other interpreter) on PATH.

- Safe termination MVP: Linux `kill` now sends real `SIGTERM` or
  `SIGKILL` through a small `libc` boundary instead of shelling out, with typed
  outcomes for success, permission denied, already exited, cancelled, protected
  process, stale confirmed target, unsafe PID, and unknown failure. Real signal
  delivery is Linux-only until native non-Linux collectors exist.
- Shared kill command rendering in `command.rs` shows the equivalent user-facing
  command (`kill <PID>`, `kill -9 <PID>`, or future platform equivalents) in both
  CLI and TUI confirmation flows.
- CLI `kickoutchi kill --pid <PID>` and `kickoutchi kill --port <PORT>` now use
  the same safety rules as the TUI: PID `0`, PID `1`, and Kickoutchi's own PID
  are blocked; protected processes require typing the PID or process name;
  `--yes` cannot bypass protected-process confirmation; and `kill --port`
  refuses ambiguous targets instead of guessing. After confirmation, the target
  is re-collected and must still match the confirmed PID and port rows before a
  signal is sent.
- TUI termination flow: `x` opens normal termination confirmation, `X` opens
  force-kill confirmation, force kill requires typing `force`, protected
  processes require typing the PID or process name, child/owner/permission
  warnings are shown when available, and the table refreshes immediately after a
  kill attempt.
- Safe-termination tests cover PID guardrails, target ambiguity, confirmation decisions,
  command rendering, TUI confirmation state/rendering, and CLI exit-code mapping.
- TUI kill confirmation now lists every port owned by the target PID, gathered
  from the full snapshot so active filters cannot hide a port the signal will
  still free.

- Process context and protected-process policy: the selected TUI row
  now resolves direct child PIDs and child process names only when the user opens
  the details modal, shows owner UID when available, and keeps the child scan
  bounded so scrolling the table does not walk the process list.
- Protected-process matching now lives in `protection.rs`, with exact
  case-sensitive matching on Unix-like platforms and exact case-insensitive
  matching ready for Windows.
- No-match port diagnostics for human CLI output: when an explicit port query
  finds no confirmed listening TCP or bound UDP socket, Kickoutchi can print
  evidence-only related-process hints to stderr based on strict port-shaped
  command-line matches such as `:3000`, `--port 3000`, `--port=3000`, `-p 3000`,
  `PORT=3000`, and `python3 -m http.server 3000`.
- Diagnostic hints do not create fake table rows, do not claim ownership, do not
  change the `list --port` no-match exit code, and do not pollute `list --json`.

- Filtering, sorting, and refresh: the TUI now supports manual
  refresh with `r`, automatic refresh using the configured interval, search mode
  with `/`, and sort cycling with `s`.
- Shared query engine for CLI and TUI filtering: plain search matches visible
  row fields such as port, PID, protocol, address, process name, executable
  path, command line, bind scope, and parent process; structured filters support
  `pid:`, `port:`, `proto:`, `scope:`, `protected:`, and `parent:`.
- Additional sort modes for parent process and bind scope, with scope sorting
  surfacing public binds before local and loopback binds.
- Linux parent-process collection backing the parent filter and sort: `parent_pid`
  from `/proc/<pid>/status` and the parent name from `/proc/<ppid>/comm`, feeding
  the `parent:` filter, parent sorting, the details-panel parent line, and PID-1
  child hiding. Implemented alongside filtering and sorting so the parent filter
  and sort operate on real data instead of always-empty fields.
- TUI refresh state now keeps the last successful snapshot separate from the
  latest collector error, so a failed refresh reports the error without erasing
  the last good table.
- Selection preservation across refresh/filter/sort by PID, protocol, local
  address, and port, falling back to the nearest sensible row when the selected
  process disappears.
- `kickoutchi list --filter <TEXT>` and `kickoutchi list --sort <MODE>` for the
  same search/filter/sort behavior used by the TUI.
- Config support for `hide_system_processes`, implemented conservatively for
  PID 0/1, direct PID-1 children, and known OS process names without hiding
  protected app processes such as `postgres` by default.

- Linux native collector: on Linux, `kickoutchi`/`kick` now reads
  `/proc/net/tcp`, `/proc/net/tcp6`, `/proc/net/udp`, and `/proc/net/udp6`
  directly, keeps TCP `LISTEN` sockets and bound UDP sockets, decodes IPv4 and
  IPv6 local addresses, extracts socket inodes, and maps them to owning PIDs by
  walking `/proc/<pid>/fd` symlinks.
- Linux process metadata enrichment: readable owners now include process name,
  executable path, and command line from `/proc/<pid>/comm`, `/proc/<pid>/exe`,
  and `/proc/<pid>/cmdline`; restricted or raced metadata keeps the port row and
  marks it partial instead of dropping it.
- Deterministic Linux collector tests for `/proc/net` parsing, TCP state filtering, UDP
  bound rows, IPv4/IPv6 decoding, malformed rows, socket inode parsing,
  command-line decoding, and partial metadata behavior.

- Static TUI skeleton: the bare `kickoutchi`/`kick` command now opens
  a full fake-data TUI with a header, the open-ports table, a selected-row
  details panel, and a status bar showing row count, refresh age, sort mode,
  and filter state.
- TUI app state (`app.rs`) and key-to-action input mapping (`input.rs`):
  bounded `j`/`k`/Up/Down selection, `Enter` for a details modal, `?` for a
  help modal, `Esc` closing modals (or quitting when none is open), and rows
  marked protected and sorted through the same shared model code as the CLI.
- UI modules `table`, `details`, `help`, and `theme`: missing metadata renders
  as `-`, partial-permission and protected rows get distinct styling with the
  reason explained in the details panel, child PIDs distinguish "not loaded"
  from none, and `NO_COLOR` disables colors while keeping non-color emphasis.
- Terminal-size fallback message when the viewport is smaller than 80x20.
- Render tests over a ratatui `TestBackend` (default frame, help modal,
  details modal, too-small fallback) plus app-state transition tests for
  selection bounds, modal flow, and empty-row behavior.

- Short binary name `kick`: the crate now installs both `kickoutchi`
  (canonical) and `kick` (short alias for CLI use) from the same source, with
  `default-run` keeping `cargo run` on the canonical binary. The help usage
  line follows the invoked name; `--version` reports the canonical name.

- Shared domain model: `PortEntry` with the full
  protocol/address/port/state/process/parent/permission shape, plus the
  `Protocol`, `SocketState`, `Platform`, `PermissionStatus`, and `SortMode`
  vocabulary shared by the CLI, TUI, and future collectors.
- `Collector` trait with a deterministic `FakeCollector` covering full
  metadata, permission-restricted partial rows, IPv6, bound UDP, and a
  default-protected process name.
- Config file support: `~/.config/kickoutchi/config.toml` (XDG via `dirs`)
  with `refresh_interval_seconds`, `default_sort`, `confirm_force_kill`, and
  `protected_processes`; missing file means safe defaults, invalid file is a
  hard error naming the file and the bad value; bounded values and a capped
  protected list.
- Non-TUI CLI: `kickoutchi list` (`--port`, `--process`, `--json`) and the
  `kickoutchi kill` command shape (`--pid`/`--port`, `--force`, `--yes`) with
  confirmation prompts routed to a stub until real termination lands; CLI
  commands never open the TUI.
- Stable script-facing exit codes (0–6) defined and tested in one place;
  `--yes` never bypasses the protected-process path (exit 6).
- CLI-over-config precedence via global `--config <FILE>` and
  `--refresh-interval <SECONDS>` flags, with shared bounds enforced by clap at
  parse time.
- Table and JSON output layer; missing metadata renders as `-` in tables and
  `null` in JSON, and the JSON field/enum shape is pinned by tests.
- Cargo manifest metadata (`description`, `license`, `repository`, `authors`,
  `readme`) required for later `cargo publish`/`cargo-dist` release work.
- Project foundation: Rust 1.95.0 pinned via `mise.toml`, edition
  2024, and strict lints (`warnings = "deny"`, `clippy::pedantic`).
- Core dependency set: ratatui, crossterm, clap, serde, serde_json, toml,
  thiserror, anyhow, tracing, and tracing-subscriber.
- Module boundaries: `main`, `config`, `error`, and `ui`.
- Safe terminal lifecycle: an RAII `TerminalGuard` that enters raw mode and the
  alternate screen and restores both on drop (clean exit, propagated error, or
  panic), plus a panic hook that restores the terminal before the message prints.
- Minimal event loop with a bounded poll that quits on `q`, `Esc`, or `Ctrl+C`.
- `tracing` diagnostics routed to stderr only, never the TUI surface.
- Unit tests for the quit predicate, including the key-release edge case.

[Unreleased]: https://github.com/nuggocto/kickoutchi/compare/v1.4.2...HEAD
[1.4.2]: https://github.com/nuggocto/kickoutchi/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/nuggocto/kickoutchi/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/nuggocto/kickoutchi/compare/v1.3.10...v1.4.0
[1.3.10]: https://github.com/nuggocto/kickoutchi/compare/v1.3.9...v1.3.10
[1.3.9]: https://github.com/nuggocto/kickoutchi/compare/v1.3.8...v1.3.9
[1.3.8]: https://github.com/nuggocto/kickoutchi/compare/v1.3.7...v1.3.8
[1.3.7]: https://github.com/nuggocto/kickoutchi/compare/v1.3.6...v1.3.7
[1.3.6]: https://github.com/nuggocto/kickoutchi/compare/v1.3.5...v1.3.6
[1.3.5]: https://github.com/nuggocto/kickoutchi/compare/v1.3.1...v1.3.5
[1.3.1]: https://github.com/nuggocto/kickoutchi/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/nuggocto/kickoutchi/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/nuggocto/kickoutchi/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/nuggocto/kickoutchi/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/nuggocto/kickoutchi/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/nuggocto/kickoutchi/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/nuggocto/kickoutchi/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/nuggocto/kickoutchi/compare/v0.1.2...v1.0.0
[0.1.2]: https://github.com/nuggocto/kickoutchi/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/nuggocto/kickoutchi/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/nuggocto/kickoutchi/releases/tag/v0.1.0
