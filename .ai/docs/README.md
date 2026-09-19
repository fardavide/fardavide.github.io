# Docs

Narrative for fardavide.dev: how it is built, why, and where it stands. Rules live in
`.ai/skills/`; this folder explains and records.

| Doc                                  | Holds                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------- |
| [architecture.md](architecture.md)   | How the page is organised and why it has a single layer                 |
| [decisions.md](decisions.md)         | Key choices, ADR-style, newest last                                     |
| [status.md](status.md)               | What has landed, what is next, what is still unconfigured               |
| [design-source.md](design-source.md) | Where the design and its screenshots come from, and how to refresh them |

## For agents

Read `architecture.md` and `decisions.md` before any non-trivial change. When a choice would be
expensive to reverse, append it to `decisions.md` in the same PR, naming the alternative it beat.
When a slice lands, update `status.md` in that PR. Register any new doc in the table above; an
unlisted doc is an unread doc.
