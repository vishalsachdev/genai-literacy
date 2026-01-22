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
 * 5. Sequences use premountFor and layout="none"
 */

// Load font properly - blocks until ready
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Color scheme - blue/indigo gradient
const COLORS = {
  bg: "#f0f4ff",
  text: "#1e293b",
  gradient: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
  cardColors: [
    "#4776E6", // Role - blue
    "#5B7FE8", // Task - slightly lighter
    "#6F88EA", // Audience
    "#8391EC", // Tone
    "#8E54E9", // Constraints - purple
  ],
};

// Icons as simple SVG components
const RoleIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const TaskIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

const AudienceIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <circle cx="9" cy="7" r="3" />
    <circle cx="17" cy="7" r="3" />
    <path d="M3 18c0-3 3-5 6-5s6 2 6 5" />
    <path d="M15 13c3 0 6 2 6 5" />
  </svg>
);

const ToneIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const ConstraintsIcon: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

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

// Slide-in from left animation hook
const useSlideIn = (delaySeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const translateX = interpolate(progress, [0, 1], [-100, 0]);

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return { translateX, opacity, isVisible: frame >= delayFrames };
};

// Element data
const ELEMENTS = [
  {
    name: "Role",
    description: '"Act as a professional K-12 educator"',
    icon: RoleIcon,
    color: COLORS.cardColors[0],
  },
  {
    name: "Task",
    description: '"Draft an email" - be specific!',
    icon: TaskIcon,
    color: COLORS.cardColors[1],
  },
  {
    name: "Audience",
    description: "Who will read this?",
    icon: AudienceIcon,
    color: COLORS.cardColors[2],
  },
  {
    name: "Tone",
    description: "Respectful, encouraging, formal",
    icon: ToneIcon,
    color: COLORS.cardColors[3],
  },
  {
    name: "Constraints",
    description: "Length, format limits",
    icon: ConstraintsIcon,
    color: COLORS.cardColors[4],
  },
];

// Element Card Component
const ElementCard: React.FC<{
  element: typeof ELEMENTS[0];
  index: number;
  delaySeconds: number;
}> = ({ element, index, delaySeconds }) => {
  const slide = useSlideIn(delaySeconds);
  const IconComponent = element.icon;

  if (!slide.isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: element.color,
        borderRadius: 16,
        padding: "16px 24px",
        marginBottom: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transform: `translateX(${slide.translateX}px)`,
        opacity: slide.opacity,
        width: 450,
      }}
    >
      {/* Number badge */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "white",
        }}
      >
        {index + 1}
      </div>

      {/* Icon */}
      <div style={{ marginRight: 16 }}>
        <IconComponent />
      </div>

      {/* Text content */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            marginBottom: 2,
          }}
        >
          {element.name}
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 14,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {element.description}
        </div>
      </div>
    </div>
  );
};

// Example Prompt Component
const ExamplePrompt: React.FC<{ delaySeconds: number }> = ({ delaySeconds }) => {
  const popIn = usePopIn(delaySeconds);

  if (!popIn.isVisible) return null;

  const promptParts = [
    { label: "Role:", text: "Act as a K-12 educator", color: COLORS.cardColors[0] },
    { label: "Task:", text: "Draft a parent email about", color: COLORS.cardColors[1] },
    { label: "", text: "missing homework", color: COLORS.cardColors[1] },
    { label: "Audience:", text: "Working parents", color: COLORS.cardColors[2] },
    { label: "Tone:", text: "Respectful & encouraging", color: COLORS.cardColors[3] },
    { label: "Constraints:", text: "Under 150 words", color: COLORS.cardColors[4] },
  ];

  return (
    <div
      style={{
        position: "absolute",
        right: 60,
        top: 160,
        width: 420,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 8px 40px rgba(71, 118, 230, 0.25)",
        transform: `scale(${popIn.scale})`,
        opacity: popIn.opacity,
        transformOrigin: "top right",
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Example Prompt
      </div>

      <div
        style={{
          backgroundColor: "#f8fafc",
          borderRadius: 12,
          padding: 16,
          border: "2px dashed #cbd5e1",
        }}
      >
        {promptParts.map((part, i) => (
          <div
            key={i}
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 15,
              marginBottom: i < promptParts.length - 1 ? 8 : 0,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {part.label && (
              <span
                style={{
                  color: part.color,
                  fontWeight: 700,
                  marginRight: 6,
                  minWidth: 90,
                }}
              >
                {part.label}
              </span>
            )}
            <span style={{ color: COLORS.text, marginLeft: part.label ? 0 : 96 }}>
              {part.text}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          textAlign: "center",
          fontFamily,
          fontSize: 18,
          color: "#64748b",
        }}
      >
        All 5 elements working together!
      </div>
    </div>
  );
};

// Main Component
export const PromptStructure: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timeline in seconds (clearer than raw frames)
  const TIMELINE = {
    title: 0,
    element1: 1.0,
    element2: 1.6,
    element3: 2.2,
    element4: 2.8,
    element5: 3.4,
    example: 4.5,
    tagline: 7.0,
  };

  // Animations
  const title = usePopIn(TIMELINE.title);
  const tagline = usePopIn(TIMELINE.tagline);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Decorative gradient background */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(142, 84, 233, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(71, 118, 230, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

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
              fontSize: 60,
              fontWeight: 700,
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The 5-Element Prompt
          </span>
        </div>
      )}

      {/* ELEMENT CARDS */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 140,
        }}
      >
        {ELEMENTS.map((element, index) => (
          <ElementCard
            key={element.name}
            element={element}
            index={index}
            delaySeconds={TIMELINE.element1 + index * 0.6}
          />
        ))}
      </div>

      {/* EXAMPLE PROMPT */}
      <Sequence
        from={Math.round(TIMELINE.example * fps)}
        layout="none"
        premountFor={Math.round(0.5 * fps)}
      >
        <ExamplePrompt delaySeconds={TIMELINE.example} />
      </Sequence>

      {/* TAGLINE */}
      {tagline.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 50,
            textAlign: "center",
            transform: `scale(${tagline.scale})`,
            opacity: tagline.opacity,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 32,
              color: "#64748b",
            }}
          >
            Structure your prompts for
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 700,
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: 4,
            }}
          >
            better, more consistent results
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
