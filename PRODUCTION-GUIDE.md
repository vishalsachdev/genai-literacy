# Production Guide: Scripts → Slides → Animations

Complete workflow for turning video scripts into RSA Animate-style slide decks with hand-drawn animations.

---

## Overview

```
video-scripts.md → Marp slides → Excalidraw diagrams → Animated videos
                       ↓                  ↓
                  sketch.css          record.sh
                  (RSA style)        (screen capture)
```

---

## Step 1: Write the Script

Scripts live in `video-scripts.md` — teleprompter-ready content for studio recording.

Each video section includes:
- Target runtime
- Full narration text
- Framework alignment (UNESCO, T-GAIC)

---

## Step 2: Convert Script to Slides

### Install Marp CLI

```bash
npm install -g @marp-team/marp-cli
# or use npx without installing
```

### Create Slides

1. Create a new file: `slides/video-{N}-slides.md`
2. Add frontmatter:

```markdown
---
marp: true
theme: sketch
paginate: true
header: 'GenAI for Teacher Productivity'
footer: 'Video {N} of 6'
---
```

3. Convert script sections into slides:
   - **One main idea per slide**
   - **Max 3-5 bullet points**
   - Use slide classes for layouts (see below)

### Available Slide Classes

```markdown
<!-- _class: title -->      # Centered title slide
<!-- _class: columns -->    # Two-column layout
<!-- _class: quote -->      # Centered blockquote
<!-- _class: divider -->    # Section break (dark background)
<!-- _class: summary -->    # Takeaway slide (alt background)
```

### Available Component Classes

```html
<div class="sketch-box">Wobbly border container</div>
<div class="callout">Red left border callout</div>
<span class="highlight">Yellow marker effect</span>
<span class="underline">Wavy red underline</span>
```

### Preview Slides

```bash
cd slides
marp --theme ./theme/sketch.css -w video-1-slides.md
# Opens live preview in browser
```

### Export Slides

```bash
# PDF
marp --theme ./theme/sketch.css video-1-slides.md -o video-1-slides.pdf

# HTML (for web embedding)
marp --theme ./theme/sketch.css video-1-slides.md -o video-1-slides.html

# PowerPoint (slides as images)
marp --theme ./theme/sketch.css video-1-slides.md -o video-1-slides.pptx
```

---

## Step 3: Create Diagrams in Excalidraw

### Open Excalidraw

Go to https://excalidraw.com/

### Follow the Style Guide

See `excalidraw-style-guide.md` for:
- Color palette (ink black + 4 accent colors)
- Stroke settings (width 1-3, roughness 1)
- Common elements (AI figure, teacher figure, icons)
- Diagram suggestions for each video

### Key Settings

| Setting | Value |
|---------|-------|
| Canvas | 1920 x 1080 (16:9) |
| Background | White |
| Stroke | 2px, roughness 1 |
| Fill | None or hachure |
| Colors | `#1e1e1e` (ink), `#4a90a4` (AI), `#d4a574` (human) |

### Save Diagrams

```
slides/assets/diagrams/v{N}-{diagram-name}.excalidraw
```

Examples:
- `v1-scope-diagram.excalidraw`
- `v2-autocomplete-metaphor.excalidraw`
- `v3-privacy-boundary.excalidraw`

### Export for Slides (Static)

1. Select all (Cmd+A)
2. Export → SVG
3. Check "Embed fonts"
4. Save to `slides/assets/diagrams/`

### Embed in Slides

```markdown
![Diagram description](./assets/diagrams/v2-autocomplete-metaphor.svg)
```

---

## Step 4: Create Animated Diagrams (RSA Animate Style)

For diagrams that should "draw themselves" on screen:

### Record Animation

```bash
cd animation-pipeline
./record.sh v2-autocomplete 15
```

This will:
1. Open https://dai-shi.github.io/excalidraw-animate/ in browser
2. Wait for you to:
   - Click "Load File"
   - Select your `.excalidraw` file
   - Click "Animate!"
3. Press ENTER in terminal
4. Record screen for specified duration
5. Save to `output/{name}.mov`

### Convert to MP4 (Optional)

```bash
ffmpeg -i output/v2-autocomplete.mov -c:v libx264 -crf 20 output/v2-autocomplete.mp4
```

### Tips for Good Animations

- **Draw in order**: Excalidraw animates elements in creation order
- **Duration guide**:
  - Simple (5-10 elements): 8-10 seconds
  - Medium (10-20 elements): 12-15 seconds
  - Complex (20+ elements): 15-20 seconds
- **Redraw if needed**: If animation order is wrong, redraw elements in correct sequence

---

## Step 5: Assemble for Video Production

### Option A: Slides as Video Background

1. Export slides to PDF or PNG sequence
2. Import into video editor (Final Cut, Premiere, DaVinci)
3. Sync with voiceover audio
4. Add animated diagrams where needed

### Option B: Present Live with Recording

1. Open slides in Marp preview
2. Screen record while presenting
3. Edit recording with voiceover

### Option C: Static Slides + Animated Inserts

1. Use static slides for most content
2. Cut to animated diagrams for key concepts
3. Sync transitions with narration

---

## File Structure

```
genai-literacy/
├── video-scripts.md              # Source scripts
├── excalidraw-style-guide.md     # Diagram consistency guide
├── PRODUCTION-GUIDE.md           # This file
│
├── slides/
│   ├── theme/
│   │   └── sketch.css            # RSA Animate Marp theme
│   ├── assets/
│   │   └── diagrams/             # .excalidraw and .svg files
│   ├── video-1-slides.md
│   ├── video-2-slides.md
│   └── ...
│
└── animation-pipeline/
    ├── record.sh                 # Animation recorder
    └── output/                   # Generated videos (gitignored)
```

---

## Quick Reference

### Commands

```bash
# Preview slides
cd slides && marp --theme ./theme/sketch.css -w video-1-slides.md

# Export to PDF
marp --theme ./theme/sketch.css video-1-slides.md -o video-1-slides.pdf

# Record animation
cd animation-pipeline && ./record.sh v2-autocomplete 15

# Convert video format
ffmpeg -i output/file.mov -c:v libx264 -crf 20 output/file.mp4
```

### Checklist Per Video

- [ ] Script finalized in `video-scripts.md`
- [ ] Slides created: `slides/video-{N}-slides.md`
- [ ] Diagrams drawn in Excalidraw (following style guide)
- [ ] Static SVGs exported for slides
- [ ] Animations recorded for key diagrams
- [ ] All assets synced with video editor

---

## Dependencies

| Tool | Install | Purpose |
|------|---------|---------|
| Marp CLI | `npm install -g @marp-team/marp-cli` | Slide generation |
| ffmpeg | `brew install ffmpeg` | Video conversion |
| Excalidraw | https://excalidraw.com | Diagram creation |
| excalidraw-animate | https://dai-shi.github.io/excalidraw-animate/ | Animation playback |

---

*Last updated: January 2025*
