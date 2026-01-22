# GenAI for Teacher Productivity — Slide Decks

RSA Animate-style presentation slides for the 6-video micro-credential.

## Quick Start

### Install Marp CLI

```bash
npm install -g @marp-team/marp-cli
# or use npx without installing
```

### Preview slides (live reload)

```bash
cd slides
marp --theme ./theme/sketch.css -w video-1-slides.md
```

### Export to PDF

```bash
marp --theme ./theme/sketch.css video-1-slides.md -o ../dist/video-1-slides.pdf
```

### Export to HTML

```bash
marp --theme ./theme/sketch.css video-1-slides.md -o ../dist/video-1-slides.html
```

### Export to PPTX (images)

```bash
marp --theme ./theme/sketch.css video-1-slides.md -o ../dist/video-1-slides.pptx
```

## File Structure

```
slides/
├── theme/
│   └── sketch.css           # RSA Animate-style theme
├── assets/
│   ├── diagrams/            # Excalidraw SVG exports
│   └── icons/               # Doodle-style icons
├── video-1-slides.md        # Why GenAI for Teacher Productivity
├── video-2-slides.md        # GenAI Foundations
├── video-3-slides.md        # Ethical & Responsible Use
├── video-4-slides.md        # Writing, Planning & Communication
├── video-5-slides.md        # Organizing Information
├── video-6-slides.md        # Reflection, Growth & Sustainable Use
├── .marprc.yaml             # Marp configuration
└── README.md                # This file
```

## Theme: sketch.css

The theme provides an RSA Animate aesthetic:

- **Fonts**: Patrick Hand (body), Architects Daughter (headers), Caveat (accents)
- **Colors**: Black ink on white paper with red/blue/green/yellow accents
- **Effects**: Wobbly sketch borders, wavy underlines, marker highlights

### Slide Classes

Use `<!-- _class: classname -->` to apply layouts:

| Class | Description |
|-------|-------------|
| `title` | Centered title slide |
| `columns` | Two-column layout |
| `columns-3` | Three-column layout |
| `image-left` | Image 40% left, text right |
| `image-right` | Text left, image 40% right |
| `quote` | Centered blockquote |
| `summary` | Takeaway slide (alt background) |
| `divider` | Section divider (dark background) |
| `center` | Centered content |

### Component Classes

Use in HTML elements within slides:

| Class | Description |
|-------|-------------|
| `sketch-box` | Wobbly border container |
| `sketch-box-alt` | Alt background wobbly box |
| `callout` | Red left border callout |
| `callout-blue` | Blue left border callout |
| `callout-green` | Green left border callout |
| `underline` | Wavy red underline |
| `highlight` | Yellow marker highlight |
| `big-number` | Large statistic display |
| `caption` | Small italic caption |

### Icon Classes

| Class | Size | Use |
|-------|------|-----|
| `icon-sm` | 24px | Inline with text |
| `icon-md` | 48px | List items |
| `icon-lg` | 72px | Featured icons |
| `icon-xl` | 96px | Hero icons |

## Creating Diagrams

1. Open [excalidraw.com](https://excalidraw.com/)
2. Follow the style guide in `excalidraw-style-guide.md`
3. Export as SVG with "Embed fonts" checked
4. Save to `assets/diagrams/`
5. Reference in slides: `![Description](./assets/diagrams/filename.svg)`

## Tips

- Keep slides minimal—max 3-5 bullet points
- One main idea per slide
- Use diagrams from Excalidraw for visual concepts
- Add presenter notes in HTML comments at the end
- Test in VS Code with Marp extension for live preview
