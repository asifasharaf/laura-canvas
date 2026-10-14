import { describe, expect, it } from 'vitest';
import * as agentTools from '@laura-canvas/agent-tools';
import * as core from '@laura-canvas/core';
import * as editor from '@laura-canvas/editor';
import * as layout from '@laura-canvas/layout';
import * as presets from '@laura-canvas/presets';
import * as qa from '@laura-canvas/qa';
import * as renderBrowser from '@laura-canvas/render-browser';
import * as renderCore from '@laura-canvas/render-core';
import * as renderNode from '@laura-canvas/render-node';
import * as taste from '@laura-canvas/taste';

describe('workspace', () => {
  it('resolves every package by name', () => {
    const all = { core, layout, renderCore, renderBrowser, renderNode, qa, taste, presets, editor, agentTools };
    for (const [key, mod] of Object.entries(all)) expect(mod.PACKAGE, key).toMatch(/^@laura-canvas\//);
  });
});
