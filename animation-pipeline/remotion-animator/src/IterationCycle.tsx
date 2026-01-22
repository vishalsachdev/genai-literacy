import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Caveat";
import React from "react";

/**
 * REMOTION BEST PRACTICES APPLIED:
 * 1. Use @remotion/google-fonts for type-safe font loading
 * 2. All animations driven by useCurrentFrame() - NO CSS transitions
 * 3. Animations written in seconds * fps
 * 4. Spring config: {damping: 200} for smooth, no bounce
 * 5. Proper arrow path animations with interpolate
 */

// Load font properly - blocks until ready
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Color scheme - purple/pink gradient
const COLORS = {
  bg: "#f8fafc",
  text: "#333333",
  primary: "#8360c3",
  secondary: "#2ebf91",
  gradient: "linear-gradient(135deg, #8360c3 0%, #2ebf91 100%)",
  promptBg: "#8360c3",
  reviewBg: "#6a5acd",
  refineBg: "#2ebf91",
};

// Pop-in animation hook - smooth spring with damping: 200
const usePopIn = (delaySeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { scale, opacity, isVisible: frame >= delayFrames };
};

// Arrow draw animation hook
const useArrowDraw = (startSeconds: number, durationSeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const startFrame = startSeconds * fps;
  const durationFrames = durationSeconds * fps;

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { progress, isStarted: frame >= startFrame };
};

// Cycle Step Box Component
const CycleStepBox: React.FC<{
  title: string;
  description: string;
  bgColor: string;
  scale: number;
  opacity: number;
  descOpacity: number;
}> = ({ title, description, bgColor, scale, opacity, descOpacity }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: 20,
          padding: "20px 40px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          minWidth: 180,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 36,
            fontWeight: 700,
            color: "white",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 22,
          color: COLORS.text,
          marginTop: 12,
          textAlign: "center",
          maxWidth: 200,
          opacity: descOpacity,
        }}
      >
        {description}
      </div>
    </div>
  );
};

// Curved Arrow SVG Component
const CurvedArrow: React.FC<{
  pathD: string;
  progress: number;
  color: string;
  totalLength: number;
}> = ({ pathD, progress, color, totalLength }) => {
  const dashOffset = totalLength * (1 - progress);

  return (
    <svg
      width="400"
      height="300"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "visible",
      }}
    >
      <defs>
        <marker
          id={`arrowhead-${color.replace("#", "")}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={color}
            opacity={progress > 0.9 ? 1 : 0}
          />
        </marker>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={totalLength}
        strokeDashoffset={dashOffset}
        markerEnd={`url(#arrowhead-${color.replace("#", "")})`}
      />
    </svg>
  );
};

// Main Component
export const IterationCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline in seconds
  const TIMELINE = {
    title: 0,
    promptBox: 1.0,
    promptDesc: 1.5,
    arrow1: 2.0,
    reviewBox: 2.5,
    reviewDesc: 3.0,
    arrow2: 3.5,
    refineBox: 4.0,
    refineDesc: 4.5,
    arrow3: 5.0,
    cycleGlow: 6.0,
    insight: 7.0,
  };

  // Animations
  const title = usePopIn(TIMELINE.title);
  const promptBox = usePopIn(TIMELINE.promptBox);
  const reviewBox = usePopIn(TIMELINE.reviewBox);
  const refineBox = usePopIn(TIMELINE.refineBox);
  const insight = usePopIn(TIMELINE.insight);

  // Description fade-ins
  const promptDescOpacity = interpolate(
    frame,
    [TIMELINE.promptDesc * fps, (TIMELINE.promptDesc + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const reviewDescOpacity = interpolate(
    frame,
    [TIMELINE.reviewDesc * fps, (TIMELINE.reviewDesc + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const refineDescOpacity = interpolate(
    frame,
    [TIMELINE.refineDesc * fps, (TIMELINE.refineDesc + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Arrow animations
  const arrow1 = useArrowDraw(TIMELINE.arrow1, 0.5);
  const arrow2 = useArrowDraw(TIMELINE.arrow2, 0.5);
  const arrow3 = useArrowDraw(TIMELINE.arrow3, 0.8);

  // Cycle glow animation
  const cycleGlowOpacity = interpolate(
    frame,
    [TIMELINE.cycleGlow * fps, (TIMELINE.cycleGlow + 0.5) * fps],
    [0, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Positions for the triangle layout
  const centerX = 640;
  const centerY = 340;
  const radius = 180;

  // Triangle vertices (PROMPT at top, REVIEW bottom-right, REFINE bottom-left)
  const promptPos = { x: centerX, y: centerY - radius - 20 };
  const reviewPos = { x: centerX + radius + 40, y: centerY + radius - 40 };
  const refinePos = { x: centerX - radius - 40, y: centerY + radius - 40 };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* TITLE */}
      {title.isVisible && (
        <div
          style={{
            position: "absolute",
            top: 40,
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
            The Iteration Cycle
          </span>
        </div>
      )}

      {/* Cycle glow background */}
      <div
        style={{
          position: "absolute",
          left: centerX - 250,
          top: centerY - 180,
          width: 500,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`,
          opacity: cycleGlowOpacity,
        }}
      />

      {/* ARROWS - rendered behind boxes */}
      {/* Arrow 1: PROMPT to REVIEW (curved right) */}
      {arrow1.isStarted && (
        <div
          style={{
            position: "absolute",
            left: promptPos.x + 60,
            top: promptPos.y + 40,
          }}
        >
          <CurvedArrow
            pathD="M 0 0 Q 120 60, 100 180"
            progress={arrow1.progress}
            color={COLORS.primary}
            totalLength={250}
          />
        </div>
      )}

      {/* Arrow 2: REVIEW to REFINE (curved bottom) */}
      {arrow2.isStarted && (
        <div
          style={{
            position: "absolute",
            left: reviewPos.x - 180,
            top: reviewPos.y + 20,
          }}
        >
          <CurvedArrow
            pathD="M 160 0 Q 80 60, 0 0"
            progress={arrow2.progress}
            color={COLORS.secondary}
            totalLength={200}
          />
        </div>
      )}

      {/* Arrow 3: REFINE to PROMPT (curved left, looping back) */}
      {arrow3.isStarted && (
        <div
          style={{
            position: "absolute",
            left: refinePos.x - 60,
            top: promptPos.y + 60,
          }}
        >
          <CurvedArrow
            pathD="M 0 220 Q -80 110, 60 0"
            progress={arrow3.progress}
            color="#7b68b8"
            totalLength={300}
          />
        </div>
      )}

      {/* PROMPT BOX - top center */}
      {promptBox.isVisible && (
        <div
          style={{
            position: "absolute",
            left: promptPos.x - 130,
            top: promptPos.y - 30,
          }}
        >
          <CycleStepBox
            title="Prompt"
            description="Give initial instructions"
            bgColor={COLORS.promptBg}
            scale={promptBox.scale}
            opacity={promptBox.opacity}
            descOpacity={promptDescOpacity}
          />
        </div>
      )}

      {/* REVIEW BOX - bottom right */}
      {reviewBox.isVisible && (
        <div
          style={{
            position: "absolute",
            left: reviewPos.x - 100,
            top: reviewPos.y - 30,
          }}
        >
          <CycleStepBox
            title="Review"
            description="See what AI returns"
            bgColor={COLORS.reviewBg}
            scale={reviewBox.scale}
            opacity={reviewBox.opacity}
            descOpacity={reviewDescOpacity}
          />
        </div>
      )}

      {/* REFINE BOX - bottom left */}
      {refineBox.isVisible && (
        <div
          style={{
            position: "absolute",
            left: refinePos.x - 100,
            top: refinePos.y - 30,
          }}
        >
          <CycleStepBox
            title="Refine"
            description="Adjust based on what's missing"
            bgColor={COLORS.refineBg}
            scale={refineBox.scale}
            opacity={refineBox.opacity}
            descOpacity={refineDescOpacity}
          />
        </div>
      )}

      {/* INSIGHT - bottom */}
      {insight.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 60,
            textAlign: "center",
            transform: `scale(${insight.scale})`,
            opacity: insight.opacity,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 32,
              color: COLORS.text,
              marginBottom: 8,
            }}
          >
            Start simple. See results. Improve.
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 26,
              color: "#666",
              fontStyle: "italic",
            }}
          >
            Think of it as a conversation with that junior assistant
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
