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
 * 5. Proper use of interpolate for all animations
 */

// Load font properly - blocks until ready
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Color scheme - green/teal
const COLORS = {
  bg: "#f0fdf4",
  text: "#1a1a1a",
  accent: "#11998e",
  accentLight: "rgba(17, 153, 142, 0.15)",
  gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  cardBg: "white",
  generalPurple: "#667eea",
  sourceGreen: "#11998e",
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

// Slide-in animation hook
const useSlideIn = (delaySeconds: number, direction: "left" | "right") => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const translateX = interpolate(
    progress,
    [0, 1],
    [direction === "left" ? -100 : 100, 0]
  );

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { translateX, opacity, isVisible: frame >= delayFrames };
};

// Brain/Lightbulb Icon for General-Purpose AI
const BrainIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Lightbulb shape */}
    <path d="M9 21h6" />
    <path d="M10 21v-1a2 2 0 0 1 4 0v1" />
    <path d="M12 3a6 6 0 0 0-5.2 9c.6 1 1.2 2 1.2 3h8c0-1 .6-2 1.2-3A6 6 0 0 0 12 3z" />
    {/* Light rays */}
    <path d="M12 1v1" />
    <path d="M18.4 4.6l-.7.7" />
    <path d="M21 11h-1" />
    <path d="M4 11H3" />
    <path d="M6.3 5.3l-.7-.7" />
  </svg>
);

// Document/Book Icon for Source-Grounded AI
const DocumentIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Book/Document */}
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    {/* Citation lines */}
    <path d="M8 7h8" />
    <path d="M8 11h8" />
    <path d="M8 15h4" />
  </svg>
);

// Bullet Point Component
const BulletPoint: React.FC<{
  text: string;
  delaySeconds: number;
  color: string;
}> = ({ text, delaySeconds, color }) => {
  const popIn = usePopIn(delaySeconds);

  if (!popIn.isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 12,
        transform: `scale(${popIn.scale})`,
        opacity: popIn.opacity,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: 12,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily,
          fontSize: 24,
          color: COLORS.text,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Tool Card Component
const ToolCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: string[];
  accentColor: string;
  delaySeconds: number;
  bulletStartDelay: number;
  direction: "left" | "right";
}> = ({
  title,
  subtitle,
  icon,
  bullets,
  accentColor,
  delaySeconds,
  bulletStartDelay,
  direction,
}) => {
  const slideIn = useSlideIn(delaySeconds, direction);

  if (!slideIn.isVisible) return null;

  return (
    <div
      style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        padding: 32,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        width: 420,
        transform: `translateX(${slideIn.translateX}px)`,
        opacity: slideIn.opacity,
        border: `3px solid ${accentColor}`,
      }}
    >
      {/* Icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
          color: accentColor,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
          color: "#666",
          textAlign: "center",
          marginBottom: 24,
          fontStyle: "italic",
        }}
      >
        "{subtitle}"
      </div>

      {/* Bullets */}
      <div style={{ paddingLeft: 16 }}>
        {bullets.map((bullet, index) => (
          <BulletPoint
            key={index}
            text={bullet}
            delaySeconds={bulletStartDelay + index * 0.4}
            color={accentColor}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
export const TwoToolModel: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timeline in seconds (clearer than raw frames)
  const TIMELINE = {
    title: 0.3,
    leftCard: 1.2,
    leftBullets: 2.0,
    rightCard: 1.6,
    rightBullets: 2.4,
    takeaway: 6.5,
  };

  // Animations
  const title = usePopIn(TIMELINE.title);
  const takeaway = usePopIn(TIMELINE.takeaway);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, #dcfce7 100%)`,
      }}
    >
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
              fontSize: 64,
              fontWeight: 700,
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Two Types of AI Tools
          </span>
        </div>
      )}

      {/* CARDS CONTAINER */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* LEFT CARD - General-Purpose AI */}
        <ToolCard
          title="General-Purpose AI"
          subtitle="Open-book generalist"
          icon={<BrainIcon color={COLORS.generalPurple} />}
          bullets={["Brainstorming", "Drafting", "Open-ended tasks"]}
          accentColor={COLORS.generalPurple}
          delaySeconds={TIMELINE.leftCard}
          bulletStartDelay={TIMELINE.leftBullets}
          direction="left"
        />

        {/* RIGHT CARD - Source-Grounded AI */}
        <ToolCard
          title="Source-Grounded AI"
          subtitle="Closed-book librarian"
          icon={<DocumentIcon color={COLORS.sourceGreen} />}
          bullets={["Your documents only", "Citations included", "No hallucinations"]}
          accentColor={COLORS.sourceGreen}
          delaySeconds={TIMELINE.rightCard}
          bulletStartDelay={TIMELINE.rightBullets}
          direction="right"
        />
      </div>

      {/* TAKEAWAY */}
      {takeaway.isVisible && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `scale(${takeaway.scale})`,
            opacity: takeaway.opacity,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 32,
              color: "#374151",
              marginBottom: 8,
            }}
          >
            Choose the right tool for the task
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 28,
              fontWeight: 700,
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Creativity vs. Accuracy
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
