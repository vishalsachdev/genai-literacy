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
 * 5. Proper color interpolation for warning/safe zones
 */

// Load font properly - blocks until ready
const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

// Color scheme - red/orange warning, green safe
const COLORS = {
  bg: "#f8fafc",
  text: "#333333",
  danger: "#ff416c",
  dangerLight: "rgba(255, 65, 108, 0.12)",
  dangerBorder: "rgba(255, 65, 108, 0.4)",
  safe: "#22c55e",
  safeLight: "rgba(34, 197, 94, 0.12)",
  safeBorder: "rgba(34, 197, 94, 0.4)",
  gradient: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
  safeGradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
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

// Slide-in animation hook for boundary line
const useSlideIn = (delaySeconds: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  return { progress, isVisible: frame >= delayFrames };
};

// Private Item Component
const PrivateItem: React.FC<{
  text: string;
  icon: string;
  delaySeconds: number;
}> = ({ text, icon, delaySeconds }) => {
  const anim = usePopIn(delaySeconds);

  if (!anim.isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: COLORS.dangerLight,
        border: `2px solid ${COLORS.dangerBorder}`,
        borderRadius: 12,
        padding: "10px 16px",
        marginBottom: 10,
        transform: `scale(${anim.scale})`,
        opacity: anim.opacity,
        transformOrigin: "left center",
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span
        style={{
          fontFamily,
          fontSize: 24,
          color: COLORS.danger,
          fontWeight: 700,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Safe Item Component
const SafeItem: React.FC<{
  text: string;
  icon: string;
  delaySeconds: number;
}> = ({ text, icon, delaySeconds }) => {
  const anim = usePopIn(delaySeconds);

  if (!anim.isVisible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: COLORS.safeLight,
        border: `2px solid ${COLORS.safeBorder}`,
        borderRadius: 12,
        padding: "10px 16px",
        marginBottom: 10,
        transform: `scale(${anim.scale})`,
        opacity: anim.opacity,
        transformOrigin: "left center",
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span
        style={{
          fontFamily,
          fontSize: 24,
          color: COLORS.safe,
          fontWeight: 700,
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Boundary Line Component
const BoundaryLine: React.FC<{ delaySeconds: number }> = ({ delaySeconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const anim = useSlideIn(delaySeconds);

  if (!anim.isVisible) return null;

  // Animate height from 0 to full
  const height = interpolate(anim.progress, [0, 1], [0, 380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow effect
  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 160,
        transform: "translateX(-50%)",
        width: 6,
        height,
        background: `linear-gradient(180deg, ${COLORS.danger} 0%, ${COLORS.safe} 100%)`,
        borderRadius: 3,
        boxShadow: `0 0 20px rgba(255, 75, 43, ${glowOpacity})`,
      }}
    />
  );
};

// Zone Header Component
const ZoneHeader: React.FC<{
  title: string;
  color: string;
  gradient: string;
  align: "left" | "right";
  delaySeconds: number;
}> = ({ title, color, gradient, align, delaySeconds }) => {
  const anim = usePopIn(delaySeconds);

  if (!anim.isVisible) return null;

  return (
    <div
      style={{
        transform: `scale(${anim.scale})`,
        opacity: anim.opacity,
        marginBottom: 20,
        textAlign: align,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: 36,
          fontWeight: 700,
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </span>
    </div>
  );
};

// Main Component
export const PrivacyBoundary: React.FC = () => {
  const { fps } = useVideoConfig();

  // Timeline in seconds (clearer than raw frames)
  const TIMELINE = {
    title: 0,
    boundaryLine: 0.8,
    keepPrivateHeader: 1.2,
    safeHeader: 1.5,
    private1: 2.0,
    private2: 2.5,
    private3: 3.0,
    private4: 3.5,
    safe1: 4.0,
    safe2: 4.5,
    safe3: 5.0,
    rule: 6.0,
  };

  // Animations
  const title = usePopIn(TIMELINE.title);
  const rule = usePopIn(TIMELINE.rule);

  // Private items data
  const privateItems = [
    { text: "Student names & IDs", icon: "X", delay: TIMELINE.private1 },
    { text: "Grades & IEP info", icon: "X", delay: TIMELINE.private2 },
    { text: "Staff personal info", icon: "X", delay: TIMELINE.private3 },
    { text: "Internal communications", icon: "X", delay: TIMELINE.private4 },
  ];

  // Safe items data
  const safeItems = [
    { text: "Anonymized scenarios", icon: "\u2713", delay: TIMELINE.safe1 },
    { text: "General questions", icon: "\u2713", delay: TIMELINE.safe2 },
    { text: "Public information", icon: "\u2713", delay: TIMELINE.safe3 },
  ];

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
            The Privacy Boundary
          </span>
        </div>
      )}

      {/* BOUNDARY LINE */}
      <BoundaryLine delaySeconds={TIMELINE.boundaryLine} />

      {/* LEFT SIDE - KEEP PRIVATE */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 140,
          width: "40%",
        }}
      >
        <ZoneHeader
          title="KEEP PRIVATE"
          color={COLORS.danger}
          gradient={COLORS.gradient}
          align="left"
          delaySeconds={TIMELINE.keepPrivateHeader}
        />
        {privateItems.map((item, index) => (
          <PrivateItem
            key={index}
            text={item.text}
            icon={item.icon}
            delaySeconds={item.delay}
          />
        ))}
      </div>

      {/* RIGHT SIDE - SAFE TO SHARE */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 140,
          width: "40%",
        }}
      >
        <ZoneHeader
          title="SAFE TO SHARE"
          color={COLORS.safe}
          gradient={COLORS.safeGradient}
          align="left"
          delaySeconds={TIMELINE.safeHeader}
        />
        {safeItems.map((item, index) => (
          <SafeItem
            key={index}
            text={item.text}
            icon={item.icon}
            delaySeconds={item.delay}
          />
        ))}
      </div>

      {/* RULE TEXT */}
      {rule.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 60,
            textAlign: "center",
            transform: `scale(${rule.scale})`,
            opacity: rule.opacity,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #22c55e 100%)",
              borderRadius: 16,
              padding: "16px 32px",
              boxShadow: "0 8px 30px rgba(255, 65, 108, 0.25)",
            }}
          >
            <span
              style={{
                fontFamily,
                fontSize: 32,
                fontWeight: 700,
                color: "white",
              }}
            >
              When in doubt, leave it out
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
