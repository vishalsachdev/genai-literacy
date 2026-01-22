# Excalidraw Animation Pipeline

RSA Animate-style "drawing" animations from Excalidraw diagrams.

## Recommended: Remotion Animator

Use the Remotion-based renderer for fully automated, high-quality output:

```bash
cd remotion-animator
node render.mjs ../../slides/assets/diagrams/v2-autocomplete-metaphor.excalidraw v2-autocomplete 10
```

Output: `output/v2-autocomplete.mp4`

See `remotion-animator/README.md` for details.

## Alternative: Manual Recording (record.sh)

For quick manual captures using excalidraw-animate web tool:

```bash
./record.sh v2-autocomplete 15
```

This opens excalidraw-animate in browser, you load the file, click Animate, then it screen-records.

## Diagrams

19 excalidraw diagrams in `../slides/assets/diagrams/`:

| Video | Diagrams |
|-------|----------|
| v1 | scope-diagram, time-allocation, two-tool-model |
| v2 | autocomplete-metaphor, junior-assistant, strengths-limitations |
| v3 | bias-filter, data-flow-security, privacy-boundary |
| v4 | draft-to-final, iteration-cycle, prompt-structure |
| v5 | information-overload, source-grounded-summarization, task-breakdown |
| v6 | growth-cycle, skills-preservation, sustainability-balance, when-to-use |

## Batch Render (TODO)

```bash
# Future: render all diagrams
node render.mjs --all
```
