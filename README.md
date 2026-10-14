# laura-canvas

An open canvas platform for **editable graphic design that people and LLMs can both work on**.

A design is a typed JSON **scene**: layers, groups, auto layout, responsive size variants, brand tokens, data fields, assets and locking rules. The same scene renders identically in the browser and headlessly in Node, so an agent can generate a scene, render it, check it and repair it without ever opening the editor. People get a full editor for the same scenes.

> **Status: pre-release.** The workspace is set up and the code is being ported in from the production app it was built in. Nothing is published to npm yet.

## Packages

| Package                                                   | What it does                                                                        |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@laura-canvas/core`](packages/core)                     | Scene format: typed JSON schema, validation, tokens and fields, document migrations |
| [`@laura-canvas/layout`](packages/layout)                 | Layout per size, copy-length variants, small-size breakpoints, auto layout          |
| [`@laura-canvas/render-core`](packages/render-core)       | Shared rendering model and the interfaces for assets, fonts and text measuring      |
| [`@laura-canvas/render-browser`](packages/render-browser) | Browser render environment                                                          |
| [`@laura-canvas/render-node`](packages/render-node)       | Headless Node renderer and PNG/JPEG export                                          |
| [`@laura-canvas/qa`](packages/qa)                         | Overflow, contrast, safe-area, resolution and locked-layer checks, plus host checks |
| [`@laura-canvas/taste`](packages/taste)                   | Brand taste: a model of a brand's design language, checks, and learning from edits  |
| [`@laura-canvas/presets`](packages/presets)               | Size catalog, demo brand and demo scenes                                            |
| [`@laura-canvas/editor`](packages/editor)                 | React scene editor; hosts plug in storage and assets through props                  |
| [`@laura-canvas/agent-tools`](packages/agent-tools)       | LLM tools: JSON Schema, validation, render, QA, typed edits, repair loop            |

See [docs/architecture.md](docs/architecture.md) for how they fit together.

## Principles

- **The scene is the API.** Everything an editor or an agent can do is a change to the JSON scene, validated by one schema.
- **One render engine.** Browser and Node use the same layout and render code, so previews match exports pixel for pixel.
- **No host lock-in.** Storage, auth, fonts, assets and product rules plug in through explicit interfaces (`assetResolver`, `fontLoader`, `onChange` / `onSave`, QA check registry, and so on). The packages never reach a fixed service.
- **Agents are first-class.** Scenes describe themselves with a JSON Schema, validation errors say how to fix them, and every render returns a machine-readable report.

## Development

```bash
npm install
npm run check      # format, lint, types, clean-check, tests, build
```

Node 20 or later. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
