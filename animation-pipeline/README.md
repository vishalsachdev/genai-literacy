# Excalidraw Animation Pipeline

RSA Animate-style "drawing" animations from Excalidraw diagrams.

## Quick Start

```bash
./record.sh v2-autocomplete 15
```

This will:
1. Open excalidraw-animate in your browser
2. Wait for you to load your `.excalidraw` file and click "Animate!"
3. Record the screen for 15 seconds
4. Save to `output/v2-autocomplete.mov`

## Usage

```bash
./record.sh <output-name> [duration-seconds]

# Examples:
./record.sh v1-scope-diagram 12
./record.sh v2-autocomplete 15
./record.sh v3-privacy-boundary 10
```

## Workflow

```
1. Draw in Excalidraw (following style guide)
   └── Save to: slides/assets/diagrams/v{N}-{name}.excalidraw

2. Record animation:
   cd animation-pipeline
   ./record.sh v2-autocomplete 15

   [Browser opens → Load file → Click Animate → Press ENTER → Recording]

3. Convert to MP4 (optional):
   ffmpeg -i output/v2-autocomplete.mov -c:v libx264 -crf 20 output/v2-autocomplete.mp4

4. Import into video editor, sync with voiceover
```

## Dependencies

- macOS (uses built-in `screencapture` and `open` commands)
- ffmpeg (optional, for MP4 conversion): `brew install ffmpeg`

## Tips

- **Duration**: Match to your diagram complexity (simple: 8-10s, complex: 15-20s)
- **Screen area**: The recording captures your full screen. Maximize the browser window.
- **Trim in editor**: It's easier to record extra and trim than to re-record.

## Alternative: QuickTime

If you prefer more control:

1. Open https://dai-shi.github.io/excalidraw-animate/
2. Cmd+Shift+5 → Screen Recording → select area
3. Load file, click Animate, stop when done
