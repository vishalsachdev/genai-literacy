# Remotion Excalidraw Animator

Renders Excalidraw diagrams as animated videos using Remotion.

## Quick Start

```bash
cd remotion-animator
node render.mjs <excalidraw-file> [output-name] [duration-seconds]

# Example:
node render.mjs ../../slides/assets/diagrams/v2-autocomplete-metaphor.excalidraw v2-autocomplete 10
```

Output goes to `../output/<name>.mp4`

## How It Works

1. **Pre-processing**: Transforms excalidraw coordinates to fit 1280x720 video frame
   - Calculates bounding box of all elements
   - Scales uniformly to fit with 60px padding
   - Centers content
   - Scales font sizes, stroke widths, and arrow points

2. **Rendering**: Remotion renders each element progressively
   - Elements appear in order (based on array position in excalidraw file)
   - Text uses `clipPath` for reveal animation
   - Arrows show tip at end of animation

## Supported Elements

| Element | Status | Notes |
|---------|--------|-------|
| rectangle | ✅ | Basic styling |
| ellipse | ✅ | Basic styling |
| text | ✅ | Caveat font (hand-drawn style), 1.3x size |
| line | ✅ | Simple line |
| arrow | ✅ | Line + triangle tip |

## Known Limitations

- No rough.js hand-drawn effect (uses CSS shapes)
- No fill patterns (hachure, cross-hatch)
- Text uses Caveat font, not exact Excalidraw Virgil font
- Complex paths not supported

## Files

- `render.mjs` - CLI render script with pre-processing
- `src/ExcalidrawAnimation.tsx` - Main animation component
- `src/Root.tsx` - Remotion composition setup
- `src/index.ts` - Entry point

## Dependencies

- remotion, @remotion/cli, @remotion/bundler, @remotion/renderer
- react, react-dom
- ffmpeg (for final encoding)

## Future Improvements

- [ ] Add rough.js for authentic hand-drawn look
- [ ] Support more element types (freedraw, diamond)
- [ ] Batch render all diagrams
- [ ] Configurable animation speed per element
- [ ] Load actual Virgil font from Excalidraw
