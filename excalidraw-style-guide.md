# Excalidraw Style Guide: GenAI for Teacher Productivity

A visual consistency guide for creating RSA Animate-style diagrams across all 6 course videos.

---

## 1. Canvas Settings

### Dimensions
- **Canvas size:** 1920 x 1080 pixels (16:9 aspect ratio for slides)
- **Safe margin:** 100px from all edges for export padding
- **Working area:** 1720 x 880 pixels centered

### Background
- **Color:** White (`#ffffff`) or warm off-white (`#fffcf2`)
- **Grid:** Disabled for final exports; enable during creation if helpful for alignment

### Zoom
- Work at 100% zoom to ensure stroke consistency
- Export at 2x for high-resolution presentation use

---

## 2. Color Palette

Keep colors minimal. RSA Animate uses predominantly black/white with sparse color for emphasis.

| Color | Hex | Use Case |
|-------|-----|----------|
| **Primary ink** | `#1e1e1e` | All outlines, text, arrows, main drawings |
| **AI/Tech accent** | `#4a90a4` | AI-related elements, technology concepts |
| **Human/Teacher accent** | `#d4a574` | Human elements, educator representations, warmth |
| **Alert/Caution** | `#c75d5d` | Privacy warnings, bias alerts, limitations |
| **Success/Growth** | `#5a8a5a` | Checkmarks, positive outcomes, growth elements |

### Usage Rules
- Use **no more than 2 accent colors** per diagram
- Primary ink (`#1e1e1e`) should dominate (80%+ of strokes)
- Color draws attention—use it only for emphasis
- Avoid fills except for small accent areas (icons, highlights)

---

## 3. Stroke Settings

### Stroke Width by Element Type

| Element | Stroke Width | Notes |
|---------|--------------|-------|
| Main drawings (figures, icons) | 2 | Standard for most elements |
| Emphasis/foreground | 3 | Key concepts, focal points |
| Connecting lines | 1.5 | Arrows, flow lines |
| Background/supporting | 1 | Secondary elements, context |
| Annotations/labels | 1 | Pointer lines to labels |

### Roughness Settings

| Setting | Value | Use Case |
|---------|-------|----------|
| **Architect (0)** | Avoid | Too mechanical, loses hand-drawn feel |
| **Artist (1)** | Primary | Most diagrams—natural, sketchy look |
| **Cartoonist (2)** | Occasional | Extra emphasis, playful elements |

**Default:** Roughness 1 for all elements

### Fill Styles

| Style | Use Case |
|-------|----------|
| **Hachure** | Primary fill style—diagonal lines, hand-drawn feel |
| **Cross-hatch** | Emphasis fills, heavier visual weight |
| **Solid** | Small accent areas only (icons, dots) |
| **None** | Most shapes—outlined only |

**Default:** No fill (outlines only) for most shapes. Use hachure sparingly.

---

## 4. Typography in Diagrams

### Font Choice
- **Primary:** Excalidraw's hand-drawn font (default "Virgil")
- **Code/Tech:** Monospace font for technical terms or prompts

### Text Sizes

| Text Type | Size | Weight |
|-----------|------|--------|
| Diagram title | 48-64px | Bold |
| Section headers | 32-40px | Normal |
| Labels (main) | 24-28px | Normal |
| Annotations | 18-20px | Normal |
| Fine print/notes | 14-16px | Normal |

### Text Guidelines
- Left-align multi-line text
- Use sentence case (not ALL CAPS except rare emphasis)
- Keep labels to 3-4 words maximum
- Use icons instead of text when concept is universally understood
- Place labels near but not touching their associated elements

---

## 5. Common Elements Library

Draw these consistently across all videos.

### AI / Technology Representations

**AI Assistant (Junior Assistant metaphor)**
- Simple figure with rectangular head (screen-like)
- Basic body shape (no detailed features)
- Slightly smaller than human figure
- Use AI accent color (`#4a90a4`) for head/screen only
- Expression: neutral or eager (simple curved line)

**AI Brain / Processing**
- Cloud shape with subtle circuit pattern inside
- Dashed border suggests "in progress"
- Keep abstract—avoid realistic brain imagery

**Autocomplete / Prediction**
- Series of dots leading to text → → → "word"
- Ellipsis becoming words
- Partial sentence with fading continuation

### Human / Teacher Representations

**Educator Figure**
- Simple stick figure with slightly larger head
- Use human accent color (`#d4a574`) for subtle warmth
- Confident posture (standing straight)
- Optional: glasses, clipboard, or book in hand

**Human Brain / Judgment**
- Simple head outline with gear or lightbulb inside
- Represents professional judgment and decision-making

### Document / Communication Icons

**Email**
- Simple envelope outline
- Optional: lines inside for text

**Document / Report**
- Rectangle with corner fold
- Horizontal lines for text
- Stack for multiple documents

**Meeting / Conversation**
- Two simple speech bubbles
- Overlapping slightly

### Abstract Concepts

**Privacy / Security**
- Lock icon (simple padlock shape)
- Shield outline
- Dotted boundary line (privacy perimeter)

**Warning / Caution**
- Triangle with exclamation mark
- Use alert color (`#c75d5d`)

**Success / Checkmark**
- Simple checkmark
- Circle with checkmark for completion
- Use success color (`#5a8a5a`)

**Bias / Filter**
- Funnel shape
- Wavy lines passing through (some blocked)

### Arrows and Flow

**Standard Arrow**
- Thin stroke (1.5), open arrowhead
- Slight curve for natural feel

**Process Flow Arrow**
- Thicker stroke (2), filled arrowhead
- Use for step-by-step sequences

**Bidirectional Arrow**
- Double-headed
- Use for iteration, feedback loops

**Grouping Arrow (encompassing)**
- Large curved line connecting multiple elements

---

## 6. Diagram Types by Video

### Video 1: Why GenAI for Teacher Productivity

**Scope Diagram**
- Circle labeled "This Course" containing: planning, communication, reflection, organization
- Dotted circle outside labeled "Not Covered": students, grading, classroom AI
- Visual: clear boundary between in-scope and out-of-scope

**Time Allocation Comparison**
- Two pie charts or clock faces
- "Before AI": large slices for repetitive tasks
- "With AI": rebalanced toward high-value work
- Use subtle color to differentiate task types

**Two-Tool Model**
- Two distinct icons side by side
- General-purpose AI: open book with brain
- Source-grounded AI: closed book with magnifying glass
- Labels: "Open-book generalist" vs "Closed-book librarian"

### Video 2: GenAI Foundations

**Autocomplete Metaphor**
- Text message bubble with predictive suggestions
- Arrows showing: word → next word → next word
- Label: "Autocomplete on steroids"

**AI Strengths/Limitations Split**
- Two-column layout
- Left (strengths): drafting, reorganizing, brainstorming icons
- Right (limitations): hallucination cloud, bias symbol, oversimplification
- Dividing line down center

**Junior Assistant Visual**
- AI figure (smaller) next to teacher figure (larger)
- Arrow from teacher pointing to AI: "Instructions"
- Arrow from AI pointing back: "Draft"
- Arrow from teacher to final document: "Review & Approve"

### Video 3: Ethics & Responsible Use

**Privacy Boundary Diagram**
- Dotted line creating a perimeter
- Inside: anonymized descriptions, general scenarios
- Outside (blocked): names, grades, IEP data, photos
- Lock icon on the boundary

**Bias Filter Concept**
- AI output (cloud) passing through filter (funnel)
- Teacher figure examining output
- Some content passes through, some flagged
- Label: "Professional judgment as filter"

**Data Flow Security**
- School icon → school account → protected processing
- Personal account → public servers → question mark/warning
- Visual distinction between protected and unprotected paths

### Video 4: Writing, Planning & Communication

**5-Element Prompt Structure**
- Vertical stack or pentagon showing:
  1. Role (person icon)
  2. Task (checkbox)
  3. Audience (group)
  4. Tone (speech bubble style)
  5. Constraints (ruler/limit)
- Arrows connecting each to a unified prompt

**Iteration Cycle**
- Circular flow: Prompt → Output → Review → Refine → (back to Prompt)
- Teacher figure at "Review" position
- Arrow loop showing continuous improvement

**Draft-to-Final Pipeline**
- Linear flow: Blank page → AI draft → Human review → Final version
- Increasingly refined document icons
- Teacher figure actively editing in middle

### Video 5: Organizing Information & Managing Time

**Information Overload Visual**
- Teacher figure with multiple documents flying toward them
- Emails, reports, articles, notes
- Overwhelmed gesture or posture

**Source-Grounded Summarization**
- Stack of documents → AI tool → condensed summary with citations
- Dotted lines connecting summary points back to source pages
- Magnifying glass on citations

**Task Breakdown Flow**
- Large amorphous blob labeled "Complex Task"
- Arrow to structured list of smaller, numbered steps
- Calendar or timeline beside it
- Teacher figure adjusting/reordering steps

### Video 6: Reflection, Growth & Sustainable Use

**Growth Cycle**
- Circular diagram: Practice → Reflect → Plan → Improve → (back to Practice)
- Teacher figure in center
- AI assists at "Reflect" and "Plan" stages (small AI icons)

**Sustainability Balance**
- Scale or balance beam
- One side: AI assistance (appropriate weight)
- Other side: Human skill maintenance (equal or greater weight)
- Balanced position = sustainable use

**When to Use / When Not to Use**
- Two-column visual
- Left: tasks suited for AI (drafting, organizing, summarizing)
- Right: tasks better without AI (quick emails, creative thinking)
- Clear visual distinction (checkmark vs. X)

**Skills Preservation**
- Brain icon with gears
- Arrows showing skills being exercised (not outsourced)
- Label: "Augment, don't replace"

---

## 7. Export Settings

### SVG Export
- **Format:** SVG with embedded fonts
- **Background:** Include background
- **Padding:** 40px on all sides
- **Scale:** 2x for high-resolution output

### PNG Export (backup)
- **Scale:** 2x or 3x
- **Background:** Include
- **Padding:** 40px

### File Naming Convention

```
v[video#]-[diagram-name].excalidraw
v[video#]-[diagram-name].svg
```

Examples:
- `v1-scope-diagram.excalidraw`
- `v2-autocomplete-metaphor.svg`
- `v3-privacy-boundary.excalidraw`
- `v4-prompt-structure.svg`
- `v5-information-flow.excalidraw`
- `v6-growth-cycle.svg`

### File Organization

```
/diagrams
  /source          # .excalidraw files
  /export          # .svg and .png exports
  /library         # reusable elements collection
```

---

## 8. Do's and Don'ts

### Do

- **Keep it simple.** One main concept per diagram. If it needs explanation, it is too complex.
- **Use whitespace generously.** RSA Animate style leaves room to breathe.
- **Draw humans simply.** Stick figures with minimal detail convey more universally.
- **Use consistent metaphors.** Once you represent AI as a figure with a screen-head, use it everywhere.
- **Let lines be imperfect.** The hand-drawn aesthetic means slight wobbles are good.
- **Group related elements.** Use proximity and subtle enclosures to show relationships.
- **Test at 50% zoom.** If the diagram is unclear at reduced size, simplify it.

### Don't

- **Don't use photos or realistic imagery.** Stick to hand-drawn abstractions.
- **Don't overcrowd.** Max 5-7 major elements per diagram.
- **Don't use rainbow colors.** Stick to the defined palette (1-2 accents max).
- **Don't add unnecessary detail.** A rectangle with a corner fold is a document. No need for lines of text.
- **Don't make AI look humanoid.** Keep AI representations clearly non-human (screen-head, geometric).
- **Don't rely on color alone.** Diagrams should work in grayscale for accessibility.
- **Don't mix metaphors.** If AI is a "junior assistant" in one diagram, don't make it a "robot" in another.
- **Don't use clip art or emojis.** Hand-draw everything or use Excalidraw's built-in library.

### Common Mistakes to Avoid

| Mistake | Problem | Fix |
|---------|---------|-----|
| Too much text | Diagrams become documents | Use icons, max 3-4 word labels |
| Inconsistent line weight | Visual hierarchy unclear | Follow stroke width guide |
| Every element has color | Nothing stands out | Reserve color for 1-2 key elements |
| Overlapping elements | Confusion, visual noise | Use clear spacing (min 20px) |
| Perfect geometric shapes | Loses hand-drawn feel | Use roughness=1, embrace imperfection |
| Complex backgrounds | Distraction | White or off-white only |
| Inconsistent AI representation | Viewer confusion | Same AI figure across all videos |

---

## Quick Reference Card

```
Canvas:      1920 x 1080, white background
Ink:         #1e1e1e (primary)
Accents:     #4a90a4 (AI), #d4a574 (human), #c75d5d (alert), #5a8a5a (success)
Stroke:      2 (main), 3 (emphasis), 1.5 (lines), 1 (annotations)
Roughness:   1 (artist)
Fill:        None or hachure
Font:        Virgil (hand-drawn default)
Text sizes:  48+ (title), 32 (header), 24 (label), 18 (annotation)
Export:      SVG, 2x scale, 40px padding, embedded fonts
```

---

*Last updated: January 2026*
*For: GenAI for Teacher Productivity micro-credential (6 videos)*
