# Architecture

## Package graph

```
core ──► layout ──► render-core ──► render-browser
  │                     │      └──► render-node
  │                     ▼
  ├──────────────────► qa ◄──── taste
  ├──► presets
  │
editor ──► render-browser, qa, taste, presets
agent-tools ──► render-node, qa, taste, core
```

- **core**: the scene schema and everything that is pure data: tokens, `{{field}}` placeholders, validation, document versions and migrations, host `extensions`.
- **layout**: decides where things go at a size: which layout a size uses, copy-length variants, small-size breakpoints, and auto-layout stacks (planned as pure functions over measured boxes).
- **render-core**: builds a scene into a Konva stage and reports what rendered (boxes, text fit, images, stacks). It defines the render environment: `AssetResolver`, `FontLoader`, `TextMeasurer`.
- **render-browser / render-node**: the two environments. Node uses skia-canvas and exports PNG/JPEG.
- **qa**: checks on a render (overflow, contrast from the rendered backdrop, safe area, image resolution, locked layers) and a registry for host checks.
- **taste**: a typed model of a brand's design language, rule derivation, conformance checks, and learning from accepted and rejected edits.
- **presets**: generic content: a size catalog, a demo brand, demo scenes.
- **editor**: the React editor. Everything host-specific comes in through props.
- **agent-tools**: what an LLM needs: the scene JSON Schema, validation with fixable errors, render and QA as tools, typed scene edits, and a repair loop with an injected model.

## Boundaries

The packages own generic scene types, layout, rendering, export, QA, taste, editor behaviour, generic presets, agent tools and docs. Hosts own auth, users, billing, databases and storage, navigation, collaboration, their own templates and brand data, and their prompts.

Nothing in this repo may depend on a host's database, routing, auth, environment variables or UI shell. Hosts connect through explicit interfaces:

| Interface                                                                                     | Where               | Purpose                                                                        |
| --------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| `assetResolver(src)`                                                                          | render environments | Turn an asset reference into a URL, path or bytes (e.g. a host's storage keys) |
| `fonts: FontLoader[]`                                                                         | render environments | Make font families available (Google Fonts is an opt-in loader)                |
| `textMeasurer`                                                                                | render environments | Text measuring for fitting and layout                                          |
| `checks: QACheckFn[]`                                                                         | `runQA`             | Host QA rules                                                                  |
| `extensions`                                                                                  | scene               | Host data on a scene, namespaced, ignored by the renderer                      |
| `value` / `onChange` / `schema`                                                               | editor              | Controlled scene editing with host validation                                  |
| `toolbarStart` / `toolbarEnd`, `sceneSettings`, `imageControls`, `renderPlatformIcon`, `copy` | editor              | Host UI slots and wording                                                      |

## Rule for changes

A change that improves the scene format, editor, layout, rendering, export, QA, taste or agent tooling, and could be useful outside one product, lands here first. Products then upgrade to the released version.
