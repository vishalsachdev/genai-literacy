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
 * 5. Proper color interpolation for highlights
 */

// Load font properly - blocks until ready
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Color scheme - warm orange/yellow
const COLORS = {
  bg: "#fffbf5",
  text: "#333333",
  gradientStart: "#f5af19",
  gradientEnd: "#f12711",
  gradient: "linear-gradient(135deg, #f5af19 0%, #f12711 100%)",
  useAI: "#22c55e", // Green for "use AI"
  skipAI: "#f97316", // Orange for "skip AI"
  useAIBg: "rgba(34, 197, 94, 0.1)",
  skipAIBg: "rgba(249, 115, 22, 0.1)",
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

// Slide-in from left animation
const useSlideInLeft = (delaySeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const translateX = interpolate(progress, [0, 1], [-50, 0]);

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { translateX, opacity, isVisible: frame >= delayFrames };
};

// Slide-in from right animation
const useSlideInRight = (delaySeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const translateX = interpolate(progress, [0, 1], [50, 0]);

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { translateX, opacity, isVisible: frame >= delayFrames };
};

// Checkmark icon component
const CheckIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill={COLORS.useAI} />
    <path
      d="M7 12l3 3 7-7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// X mark icon component
const XIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill={COLORS.skipAI} />
    <path
      d="M8 8l8 8M16 8l-8 8"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// List item component
const ListItem: React.FC<{
  text: string;
  icon: "check" | "x";
  delay: number;
  side: "left" | "right";
}> = ({ text, icon, delay, side }) => {
  const slideIn =
    side === "left" ? useSlideInLeft(delay) : useSlideInRight(delay);

  if (!slideIn.isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
        transform: `translateX(${slideIn.translateX}px)`,
        opacity: slideIn.opacity,
      }}
    >
      {icon === "check" ? <CheckIcon /> : <XIcon />}
      <span
        style={{
          fontFamily,
          fontSize: 28,
          color: COLORS.text,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Column component
const Column: React.FC<{
  title: string;
  items: string[];
  icon: "check" | "x";
  headerColor: string;
  bgColor: string;
  delay: number;
  side: "left" | "right";
}> = ({ title, items, icon, headerColor, bgColor, delay, side }) => {
  const headerAnim = usePopIn(delay);

  return (
    <div
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      {/* Column header */}
      {headerAnim.isVisible && (
        <div
          style={{
            transform: `scale(${headerAnim.scale})`,
            opacity: headerAnim.opacity,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 32,
              fontWeight: 700,
              color: headerColor,
              backgroundColor: bgColor,
              padding: "12px 20px",
              borderRadius: 12,
              textAlign: "center",
              border: `2px solid ${headerColor}`,
            }}
          >
            {title}
          </div>
        </div>
      )}

      {/* List items */}
      <div style={{ paddingLeft: 8 }}>
        {items.map((item, index) => (
          <ListItem
            key={item}
            text={item}
            icon={icon}
            delay={delay + 0.4 + index * 0.4}
            side={side}
          />
        ))}
      </div>
    </div>
  );
};

// Balance scale visual
const BalanceScale: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleAnim = usePopIn(delay);

  // Gentle rocking animation
  const rockProgress = spring({
    frame: frame - delay * fps - fps,
    fps,
    config: { damping: 200 },
  });

  const rotation = interpolate(rockProgress, [0, 1], [5, 0]);

  if (!scaleAnim.isVisible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: "50%",
        transform: `translateX(-50%) scale(${scaleAnim.scale}) rotate(${rotation}deg)`,
        opacity: scaleAnim.opacity,
        transformOrigin: "center top",
      }}
    >
      <svg width="120" height="80" viewBox="0 0 120 80">
        {/* Base triangle */}
        <polygon points="60,75 50,80 70,80" fill="#666" />
        {/* Vertical stand */}
        <rect x="57" y="15" width="6" height="60" fill="#666" rx="2" />
        {/* Horizontal beam */}
        <rect x="10" y="10" width="100" height="8" fill="#888" rx="4" />
        {/* Left pan hook */}
        <circle cx="20" cy="18" r="4" fill={COLORS.useAI} />
        {/* Right pan hook */}
        <circle cx="100" cy="18" r="4" fill={COLORS.skipAI} />
        {/* Center pivot */}
        <circle cx="60" cy="14" r="6" fill="#555" />
      </svg>
    </div>
  );
};

// Divider line component
const Divider: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delay * fps;

  const height = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const actualHeight = interpolate(height, [0, 1], [0, 280]);

  if (frame < delayFrames) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 220,
        width: 3,
        height: actualHeight,
        background: `linear-gradient(180deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
        borderRadius: 2,
        transform: "translateX(-50%)",
      }}
    />
  );
};

// Main Component
export const SustainabilityBalance: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timeline in seconds (clearer than raw frames)
  const TIMELINE = {
    title: 0,
    scale: 0.5,
    divider: 1,
    leftHeader: 1.5,
    rightHeader: 1.8,
    // Items staggered via Column component
    insight: 7,
  };

  // Use AI items
  const useAIItems = [
    "Long documents",
    "First drafts",
    "Brainstorming",
    "Reorganizing",
  ];

  // Skip AI items
  const skipAIItems = ["Quick tasks", "Need deep thinking", "Practicing skills"];

  // Animations
  const title = usePopIn(TIMELINE.title);
  const insight = usePopIn(TIMELINE.insight);

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
            Sustainable AI Use
          </span>
        </div>
      )}

      {/* Balance Scale Visual */}
      <BalanceScale delay={TIMELINE.scale} />

      {/* Divider Line */}
      <Divider delay={TIMELINE.divider} />

      {/* Two columns container */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 60,
          right: 60,
          display: "flex",
          gap: 40,
        }}
      >
        {/* Left column - USE AI FOR */}
        <Column
          title="USE AI FOR"
          items={useAIItems}
          icon="check"
          headerColor={COLORS.useAI}
          bgColor={COLORS.useAIBg}
          delay={TIMELINE.leftHeader}
          side="left"
        />

        {/* Right column - SKIP AI WHEN */}
        <Column
          title="SKIP AI WHEN"
          items={skipAIItems}
          icon="x"
          headerColor={COLORS.skipAI}
          bgColor={COLORS.skipAIBg}
          delay={TIMELINE.rightHeader}
          side="right"
        />
      </div>

      {/* INSIGHT */}
      {insight.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 50,
            textAlign: "center",
            transform: `scale(${insight.scale})`,
            opacity: insight.opacity,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 32,
              fontWeight: 700,
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              padding: "0 40px",
            }}
          >
            Use AI to augment, not replace, your capabilities
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
