import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Caveat";
import React from "react";

/**
 * REMOTION BEST PRACTICES APPLIED:
 * 1. Use @remotion/google-fonts for type-safe font loading
 * 2. All animations driven by useCurrentFrame() - NO CSS transitions
 * 3. Animations written in seconds * fps
 * 4. Spring config: {damping: 200} for smooth, no bounce
 * 5. Typewriter uses string slicing (not per-character opacity)
 * 6. Sequences use premountFor and layout="none"
 * 7. Proper cursor blinking with interpolate
 */

// Load font properly - blocks until ready
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Color scheme - purple/violet
const COLORS = {
  bg: "#f8fafc",
  text: "#333333",
  accent: "#764ba2",
  accentLight: "rgba(118, 75, 162, 0.15)",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

// Cursor component with proper blinking
const Cursor: React.FC<{ visible: boolean }> = ({ visible }) => {
  const frame = useCurrentFrame();
  const BLINK_FRAMES = 16;

  if (!visible) return null;

  const opacity = interpolate(
    frame % BLINK_FRAMES,
    [0, BLINK_FRAMES / 2, BLINK_FRAMES],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <span style={{ opacity }}>│</span>;
};

// Typewriter hook following best practices
const useTypewriter = (
  text: string,
  startFrame: number,
  charsPerSecond: number = 12
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const framesPerChar = fps / charsPerSecond;
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(text.length, Math.floor(elapsed / framesPerChar));
  const isComplete = charCount >= text.length;

  return {
    displayText: text.slice(0, charCount),
    isTyping: frame >= startFrame && !isComplete,
    isComplete,
  };
};

// Pop-in animation hook - smooth spring with damping: 200
const usePopIn = (delaySeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 }, // Smooth, no bounce per best practices
  });

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { scale, opacity, isVisible: frame >= delayFrames };
};

// Input Box Component
const InputBox: React.FC = () => {
  const { fps } = useVideoConfig();
  const typing = useTypewriter("Help me write an email to...", 0.5 * fps, 15);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        width: 400,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 16,
          color: "#888",
          marginBottom: 12,
        }}
      >
        You type:
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 32,
          color: COLORS.text,
          minHeight: 40,
        }}
      >
        {typing.displayText}
        <Cursor visible={typing.isTyping} />
      </div>
    </div>
  );
};

// Suggestion Item Component
const SuggestionItem: React.FC<{
  text: string;
  highlighted?: boolean;
  highlightDelay: number;
}> = ({ text, highlighted = false, highlightDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animate highlight with interpolate (NOT CSS transition!)
  const highlightProgress = interpolate(
    frame,
    [highlightDelay * fps, (highlightDelay + 0.3) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showHighlight = highlighted && highlightProgress > 0;

  // Interpolate colors based on highlight progress
  const bgColor = showHighlight
    ? `rgba(118, 75, 162, ${0.15 * highlightProgress})`
    : "white";

  const borderColor = showHighlight
    ? `rgba(118, 75, 162, ${highlightProgress})`
    : "#e0e0e0";

  return (
    <div
      style={{
        fontFamily,
        fontSize: 26,
        color: COLORS.text,
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 12,
        padding: "12px 20px",
        marginBottom: 8,
      }}
    >
      {text}
    </div>
  );
};

// AI Response Box Component
const AIResponseBox: React.FC = () => {
  const { fps } = useVideoConfig();
  const typing = useTypewriter(
    "Dear Client, I wanted to update you on our project progress...",
    0.5 * fps,
    18
  );

  return (
    <div
      style={{
        background: COLORS.gradient,
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 8px 30px rgba(118, 75, 162, 0.3)",
        width: 420,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 16,
          color: "rgba(255,255,255,0.9)",
          marginBottom: 12,
        }}
      >
        AI completes:
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 26,
          color: "white",
          minHeight: 80,
        }}
      >
        {typing.displayText}
        <Cursor visible={typing.isTyping} />
      </div>
    </div>
  );
};

// Main Component
export const AutocompleteMetaphor: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timeline in seconds (clearer than raw frames)
  const TIMELINE = {
    title: 0,
    inputBox: 1,
    suggestion1: 3.3,
    suggestion2: 3.8,
    suggestion3: 4.3,
    aiResponse: 5.3,
    insight: 8.7,
  };

  // Animations
  const title = usePopIn(TIMELINE.title);
  const inputBox = usePopIn(TIMELINE.inputBox);
  const suggestion1 = usePopIn(TIMELINE.suggestion1);
  const suggestion2 = usePopIn(TIMELINE.suggestion2);
  const suggestion3 = usePopIn(TIMELINE.suggestion3);
  const aiResponse = usePopIn(TIMELINE.aiResponse);
  const insight = usePopIn(TIMELINE.insight);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* TITLE */}
      {title.isVisible && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `scale(${title.scale})`,
            opacity: title.opacity,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 56,
              fontWeight: 700,
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Autocomplete Metaphor
          </span>
        </div>
      )}

      {/* INPUT BOX - uses Sequence with premountFor */}
      <Sequence
        from={Math.round(TIMELINE.inputBox * fps)}
        layout="none"
        premountFor={Math.round(0.5 * fps)}
      >
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 180,
            transform: `scale(${inputBox.scale})`,
            opacity: inputBox.opacity,
            transformOrigin: "top left",
          }}
        >
          <InputBox />
        </div>
      </Sequence>

      {/* SUGGESTIONS */}
      {suggestion1.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 340,
            transform: `scale(${suggestion1.scale})`,
            opacity: suggestion1.opacity,
            transformOrigin: "top left",
          }}
        >
          <SuggestionItem
            text="...my manager about vacation"
            highlightDelay={99}
          />
        </div>
      )}

      {suggestion2.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 400,
            transform: `scale(${suggestion2.scale})`,
            opacity: suggestion2.opacity,
            transformOrigin: "top left",
          }}
        >
          <SuggestionItem
            text="...a client about project updates"
            highlighted={true}
            highlightDelay={TIMELINE.suggestion2 + 1}
          />
        </div>
      )}

      {suggestion3.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 460,
            transform: `scale(${suggestion3.scale})`,
            opacity: suggestion3.opacity,
            transformOrigin: "top left",
          }}
        >
          <SuggestionItem
            text="...a colleague for feedback"
            highlightDelay={99}
          />
        </div>
      )}

      {/* AI RESPONSE - uses Sequence with premountFor */}
      <Sequence
        from={Math.round(TIMELINE.aiResponse * fps)}
        layout="none"
        premountFor={Math.round(0.5 * fps)}
      >
        <div
          style={{
            position: "absolute",
            left: 540,
            top: 180,
            transform: `scale(${aiResponse.scale})`,
            opacity: aiResponse.opacity,
            transformOrigin: "top left",
          }}
        >
          <AIResponseBox />
        </div>
      </Sequence>

      {/* INSIGHT */}
      {insight.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 580,
            textAlign: "center",
            transform: `scale(${insight.scale})`,
            opacity: insight.opacity,
          }}
        >
          <div style={{ fontFamily, fontSize: 30, color: "#666" }}>
            AI predicts and completes your intent
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.accent,
              marginTop: 8,
            }}
          >
            like autocomplete predicts your words
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
