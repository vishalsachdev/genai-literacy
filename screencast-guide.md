# GenAI for Teacher Productivity — Screencast Guide

**Home Recording Companion to Studio Videos**
6 screencasts | 2-4 minutes each | Practical demos using Google AI tools

---

## Production Notes

**Recording Setup:**
- Screen capture with voiceover (no face cam needed)
- Record at 1920x1080, export at 1080p
- Use a clean browser profile (no personal bookmarks visible)
- Sign into a Google Workspace for Education account

**Pacing:**
- Move deliberately—viewers are learning
- Pause briefly after each action
- Narrate what you're doing and why

**Meta-Approach: Using AI to Learn AI**
These screencasts demonstrate the tools while teaching how to use them. Occasionally make this explicit: "Notice that I'm learning how this tool works by experimenting with it. You can do the same."

---

## Tool Overview

### Primary Tools

| Tool | URL | Purpose |
|------|-----|---------|
| **Gemini** | gemini.google.com | General drafting, brainstorming, open-ended tasks |
| **NotebookLM** | notebooklm.google.com | Source-grounded Q&A, summarization, audio overviews |

### When to Use Which

| Task | Tool | Why |
|------|------|-----|
| Draft an email from scratch | Gemini | Open-ended, creative |
| Summarize a policy document | NotebookLM | Needs source accuracy and citations |
| Brainstorm ideas | Gemini | General knowledge is fine |
| Synthesize multiple research articles | NotebookLM | Citation tracking matters |
| Create a meeting agenda | Gemini | Template-based, creative |
| Understand complex regulations | NotebookLM | Must be accurate and traceable |

### Advanced Tool (Optional Mention)

**AI Studio** (aistudio.google.com) — For educators who want to create custom AI personas with system instructions. Mention briefly in Screencast 4 as "leveling up" option, but don't demo in depth. Most teachers won't need it.

---

## Screencast 1 — Getting Started with Google AI Tools
**Pairs with:** Video 1 (Why GenAI for Teacher Productivity)
**Duration:** ~3 minutes

### Demo Flow

**1. Access Gemini (1 min)**
- Navigate to gemini.google.com
- Show: "Make sure you're signed into your school Google account—look for your school email in the top right"
- Point out: The clean interface, the prompt box at bottom

**2. First Prompt (1 min)**
- Type and submit:
```
List the professional tasks in my week that take the most time and involve drafting, summarizing, or planning. Group them into categories.
```
- Wait for response
- Say: "Notice this is a reflection prompt—I'm using AI to help me think about my own work, not to do the work for me."

**3. Quick Tour of NotebookLM (1 min)**
- Navigate to notebooklm.google.com
- Show: "This is a different kind of tool—it works with your own documents"
- Point out: The "New Notebook" button, the source upload area
- Say: "We'll use this more in later videos when we work with specific documents."

### Key Points to Highlight
- Both tools are free with Google Workspace for Education
- Gemini is for open-ended tasks; NotebookLM is for working with your documents
- Always check you're using your school account

---

## Screencast 2 — Understanding AI Capabilities and Limits
**Pairs with:** Video 2 (GenAI Foundations for Practical Use)
**Duration:** ~4 minutes

### Demo Flow

**1. Show Prediction in Action (1 min)**
- In Gemini, type:
```
Complete this sentence in three different ways: "The teacher walked into the classroom and..."
```
- Show the variations
- Say: "Notice how AI generates plausible continuations—it's predicting likely next words, not reasoning about what actually happened."

**2. Test a Factual Limitation (1 min)**
- Type:
```
What is the current superintendent of [your actual school district]?
```
- Show whether it's correct, outdated, or wrong
- Say: "This is why we verify. AI doesn't know current local information reliably."

**3. Demonstrate Drafting Strength (1.5 min)**
- Type:
```
Draft a professional email announcing a staff meeting next Tuesday at 3pm in the library. Include that we'll discuss the new attendance policy.
```
- Show the output
- Say: "This is where AI shines—generating a usable first draft quickly."
- Then type:
```
Make it shorter and more casual.
```
- Show the revision
- Say: "I can iterate by giving feedback, just like I would with that junior assistant."

**4. Brief NotebookLM Comparison (30 sec)**
- Switch to NotebookLM
- Say: "Remember, NotebookLM only works with sources you upload. If I asked that superintendent question here without uploading a document, it couldn't answer. That constraint is actually a feature—it prevents hallucination."

### Key Points to Highlight
- AI predicts likely text; it doesn't verify truth
- Drafting and reformatting are strengths
- Factual questions about current/local info are weaknesses
- Iteration through follow-up prompts is normal

---

## Screencast 3 — Practicing Ethical Use
**Pairs with:** Video 3 (Ethical & Responsible Use)
**Duration:** ~3 minutes

### Demo Flow

**1. Demonstrate Anonymization (1.5 min)**
- In Gemini, first show what NOT to do (but don't actually submit):
```
[Type but don't send]: "Summarize the behavior issues for Marcus Johnson who keeps disrupting my 3rd period class"
```
- Say: "I would never submit this—it contains a student name and identifying details."
- Clear and type the correct version:
```
Help me think through how to address a middle school student who frequently calls out without raising their hand and distracts nearby peers. What strategies might work?
```
- Show the response
- Say: "Same underlying question, but anonymized and generalized."

**2. Use NotebookLM for Sensitive Documents (1 min)**
- Create a new notebook in NotebookLM
- Say: "When I need to work with actual documents—like a policy or procedure—NotebookLM is safer because it only uses what I upload. But I still need to think about what I'm uploading."
- Upload a sample public document (e.g., a state education policy PDF)
- Show how to ask a question and see the citation

**3. Quick Ethics Check (30 sec)**
- Return to Gemini
- Type:
```
Review this message for any ethical or professional concerns: [paste a sample AI-generated email]
```
- Say: "You can even use AI to help review AI output—but your judgment is still final."

### Prompt Templates Shown
```
# Anonymization Pattern
"Help me think through [situation described in general terms without names, dates, or identifying details]"

# Ethics Check
"Review this AI-generated text for ethical, privacy, or professional concerns: [paste text]"

# Policy Discovery
"Help me draft 3 questions to ask my school administration about our AI use policy for professional tasks."
```

### Key Points to Highlight
- Never input identifiable student or staff data
- Anonymize by generalizing the situation
- NotebookLM's source-grounding adds a layer of safety
- When in doubt, leave it out

---

## Screencast 4 — Drafting with the 5-Element Prompt Structure
**Pairs with:** Video 4 (Writing, Planning & Communication)
**Duration:** ~4 minutes

### Demo Flow

**1. Show a Weak vs Strong Prompt (1.5 min)**
- In Gemini, type a weak prompt:
```
Write an email about the science fair.
```
- Show the generic result
- Say: "This is usable, but vague. Watch what happens when I add structure."
- Clear and type:
```
Role: Act as a professional elementary school teacher.
Task: Draft an email to parents about our upcoming science fair.
Audience: Parents of 4th graders, some of whom are new to the school.
Tone: Warm, encouraging, informative.
Constraints: Under 200 words. Include the date (March 15), time (6-8pm), location (gymnasium), and what students should bring (their project and a smile).
```
- Show the improved result
- Say: "Much more specific. I'll still edit it, but I'm starting further along."

**2. Iterate and Refine (1 min)**
- Type a follow-up:
```
Add a sentence encouraging parents who can't attend to ask their child to present at home.
```
- Show the updated version
- Say: "Iteration is normal. Think of it as a conversation."

**3. Create a Reusable Template (1 min)**
- Type:
```
Create a reusable template for weekly parent newsletters. Include placeholders for: upcoming events, classroom highlights, reminders, and a positive note. Format with clear headers.
```
- Show the template
- Say: "Now I can copy this to a Google Doc and reuse it every week, just filling in the specifics."

**4. Mention Saving Prompts (30 sec)**
- Say: "You can save prompts that work well in a Google Doc or note. Some teachers create a prompt library they can copy from each week. If you want more control, Google AI Studio lets you save prompts with custom settings—but that's an advanced option most teachers don't need to start."

### Prompt Templates Shown
```
# 5-Element Professional Email
Role: Act as a professional K-12 educator.
Task: Draft a [type of communication] about [topic].
Audience: [Who will read this].
Tone: [Desired style—respectful, encouraging, formal, etc.].
Constraints: [Length, format, specific details to include].

# Template Creation
"Create a reusable template for [meeting agenda / newsletter / reflection form] that I can customize each [week/month]. Include placeholders for [specific elements]."

# Prompt Refinement
"This prompt produced weak results: [paste original]. Suggest 2-3 ways to make it more specific."
```

### Key Points to Highlight
- The 5 elements: Role, Task, Audience, Tone, Constraints
- More specificity = less editing needed
- Iteration through follow-up prompts is expected
- Save prompts that work well for reuse

---

## Screencast 5 — Summarizing Documents and Planning Tasks
**Pairs with:** Video 5 (Organizing Information & Managing Time)
**Duration:** ~4 minutes

### Demo Flow

**1. Upload and Query in NotebookLM (2 min)**
- Open NotebookLM and create a new notebook
- Upload a sample document (use a public education policy PDF, PD article, or meeting notes you can share)
- Say: "I've uploaded a [describe document]. Now I can ask questions."
- Type in the chat:
```
What are the key action items in this document?
```
- Show the response with citations
- Click a citation to show the source
- Say: "Notice the footnotes. I can verify every claim against the original document. This is source grounding in action."

**2. Generate an Audio Overview (1 min)**
- Click on "Audio Overview" in the Studio panel
- Say: "This creates a podcast-style discussion of my document. I can listen while commuting or doing other work."
- Generate and play 30 seconds
- Say: "You can customize this—tell it to focus on specific aspects or explain for a particular audience."

**3. Task Breakdown in Gemini (1 min)**
- Switch to Gemini
- Type:
```
I need to prepare for a curriculum review meeting next month. Help me break this into manageable steps with a suggested sequence.
```
- Show the task list
- Say: "This gives me a starting structure. Now I adjust it based on my actual calendar and what I know about my school's process."

### Prompt Templates Shown
```
# NotebookLM Document Queries
"What are the key action items in this document?"
"Summarize the main requirements relevant to [my grade level / my subject area]."
"What questions does this document leave unanswered?"

# Audio Overview Customization
Before generating: "Focus on implications for elementary teachers" or "Explain for someone new to this topic"

# Task Planning (Gemini)
"Help me break [complex task] into manageable steps with a suggested sequence."
"I have [timeframe] to complete [project]. What should I prioritize first?"
```

### Key Points to Highlight
- NotebookLM citations let you verify accuracy
- Audio Overview is useful for dense documents
- AI task breakdowns need your adaptation to real constraints
- Use NotebookLM for accuracy; Gemini for brainstorming

---

## Screencast 6 — Reflection and Sustainable Practice
**Pairs with:** Video 6 (Reflection, Growth & Sustainable Use)
**Duration:** ~3 minutes

### Demo Flow

**1. Generate Reflective Prompts (1 min)**
- In Gemini, type:
```
Generate 5 reflective questions to help me think about my professional growth this semester. Focus on areas like communication, collaboration, and instructional practice.
```
- Show the questions
- Say: "These give me a starting point for reflection. The actual reflection—the honest assessment—is mine to do."

**2. Synthesize Reflections in NotebookLM (1 min)**
- Open NotebookLM with a notebook containing multiple reflection entries (or simulate with sample text)
- Type:
```
What themes or patterns appear across these reflections? What challenges keep coming up?
```
- Show the synthesis
- Say: "Over time, you can upload multiple journal entries and ask NotebookLM to find patterns. This supports goal-setting."

**3. Sustainability Check (1 min)**
- In Gemini, type:
```
I want to audit my AI use. What questions should I ask myself to determine if AI is actually saving me time and improving my work?
```
- Show the questions
- Say: "Not every task benefits from AI. Sustainable use means being honest about what works and what doesn't."
- Pause and say: "That's the meta-approach of this whole course—we've used AI to learn about AI, and you can keep using it to develop your practice."

### Prompt Templates Shown
```
# Reflection Prompts
"Generate [3-5] reflective questions to help me think about [professional growth area] this [month/semester]."

# PD Planning
"Based on these goals: [list goals], suggest a realistic professional learning plan I can complete in one semester."

# Sustainability Audit
"What questions should I ask myself to determine if AI is saving me time and improving my work quality?"

# Pattern Synthesis (NotebookLM)
"What themes or patterns appear across these reflections?"
"What challenges or successes keep coming up?"
```

### Key Points to Highlight
- AI can prompt reflection but can't do the reflecting
- NotebookLM can synthesize patterns across documents
- Sustainable use means knowing when NOT to use AI
- Protect your own skills—AI augments, doesn't replace

---

## Appendix: Full Prompt Library

### Video 1 — Getting Started
```
List the professional tasks in my week that take the most time and involve drafting, summarizing, or planning. Group them into categories.

Help me identify 3 teacher productivity goals where AI could save time without compromising professional judgment or ethics.
```

### Video 2 — Foundations
```
Complete this sentence in three different ways: "The teacher walked into the classroom and..."

Draft a professional email announcing a staff meeting. Then provide a bullet-point summary of key points.

Explain potential errors or risks if this draft email were sent without human review.
```

### Video 3 — Ethics
```
Help me think through [situation described without identifying details].

Review this AI-generated text for ethical, privacy, or professional concerns: [paste text]

Rewrite this scenario using anonymized and generalized information: [paste scenario]

Help me draft 3 questions to ask my school administration about our AI use policy.
```

### Video 4 — Writing & Communication
```
Role: Act as a professional K-12 educator.
Task: Draft a [type] about [topic].
Audience: [Who will read this].
Tone: [Style].
Constraints: [Length/format/details].

Create a reusable template for [document type] that I can customize each [timeframe].

This prompt produced weak results: [paste]. Suggest 2-3 ways to improve it.
```

### Video 5 — Organizing Information
```
# NotebookLM
What are the key action items in this document?
Summarize the main requirements relevant to [context].
What questions does this document leave unanswered?

# Gemini
Help me break [task] into manageable steps with a suggested sequence.
I have [timeframe] to complete [project]. What should I prioritize?
```

### Video 6 — Reflection
```
Generate [number] reflective questions to help me think about [topic] this [timeframe].

Based on my goals, suggest a professional learning plan I can complete in one semester.

What questions should I ask myself to audit whether AI is helping my productivity?
```

---

## Technical Notes

### Browser Setup
- Use Chrome for best compatibility
- Clean profile with no personal bookmarks or extensions visible
- Sign into Google Workspace for Education account
- Zoom to 100% (Cmd/Ctrl + 0 to reset)

### Recording Tips
- Record audio separately if possible for better quality
- Pause after each action—editing silence is easier than editing rushed narration
- If you make a mistake, pause, then restart that section cleanly

### Files Needed
For demos, prepare:
- A sample public policy document (PDF) for NotebookLM
- A sample PD article or meeting notes (anonymized)
- Sample reflection entries (can be fictional/illustrative)

---

**End of Screencast Guide**
