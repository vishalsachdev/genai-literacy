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

// Color scheme - cyan/teal
const COLORS = {
  bg: "#f0f9ff",
  text: "#1e3a5f",
  accent: "#0891b2",
  accentDark: "#005bea",
  gradient: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
  cardBg: "white",
  citationBg: "rgba(0, 198, 251, 0.15)",
  citationBorder: "#00c6fb",
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

// Slide-in animation hook for arrows
const useSlideIn = (delaySeconds: number, direction: "right" | "down" = "right") => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delayFrames = delaySeconds * fps;

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + 0.2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translate = direction === "right"
    ? interpolate(progress, [0, 1], [-20, 0])
    : interpolate(progress, [0, 1], [-10, 0]);

  return { progress, opacity, translate, isVisible: frame >= delayFrames };
};

// Document Icon Component
const DocumentIcon: React.FC<{
  label: string;
  icon: string;
  color: string;
}> = ({ label, icon, color }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 80,
          height: 100,
          backgroundColor: COLORS.cardBg,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: `3px solid ${color}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        <span style={{ fontSize: 36 }}>{icon}</span>
        <div
          style={{
            width: "100%",
            marginTop: 8,
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 4,
                backgroundColor: `${color}40`,
                borderRadius: 2,
                marginBottom: 4,
                width: i === 3 ? "60%" : "100%",
              }}
            />
          ))}
        </div>
      </div>
      <span
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          color: COLORS.text,
          textAlign: "center",
          maxWidth: 90,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// AI Box Component
const AIBox: React.FC = () => {
  return (
    <div
      style={{
        width: 140,
        height: 140,
        background: COLORS.gradient,
        borderRadius: 20,
        boxShadow: "0 8px 30px rgba(0, 139, 234, 0.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 48 }}>🤖</span>
      <span
        style={{
          fontFamily,
          fontSize: 28,
          fontWeight: 700,
          color: "white",
        }}
      >
        AI
      </span>
    </div>
  );
};

// Arrow Component
const Arrow: React.FC<{
  direction: "right" | "down";
  length?: number;
}> = ({ direction, length = 60 }) => {
  if (direction === "right") {
    return (
      <svg width={length} height={30} viewBox={`0 0 ${length} 30`}>
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c6fb" />
            <stop offset="100%" stopColor="#005bea" />
          </linearGradient>
        </defs>
        <line
          x1={0}
          y1={15}
          x2={length - 12}
          y2={15}
          stroke="url(#arrowGradient)"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <polygon
          points={`${length - 12},5 ${length},15 ${length - 12},25`}
          fill="url(#arrowGradient)"
        />
      </svg>
    );
  }
  return (
    <svg width={30} height={length} viewBox={`0 0 30 ${length}`}>
      <defs>
        <linearGradient id="arrowGradientDown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00c6fb" />
          <stop offset="100%" stopColor="#005bea" />
        </linearGradient>
      </defs>
      <line
        x1={15}
        y1={0}
        x2={15}
        y2={length - 12}
        stroke="url(#arrowGradientDown)"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <polygon
        points={`5,${length - 12} 15,${length} 25,${length - 12}`}
        fill="url(#arrowGradientDown)"
      />
    </svg>
  );
};

// Output Box with Citations
const OutputBox: React.FC<{ showCitations: boolean; citationProgress: number }> = ({
  showCitations,
  citationProgress,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: 380,
        border: `2px solid ${COLORS.citationBorder}`,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          color: "#666",
          marginBottom: 12,
        }}
      >
        AI Response:
      </div>
      <div
        style={{
          fontFamily,
          fontSize: 22,
          color: COLORS.text,
          lineHeight: 1.5,
        }}
      >
        Based on your meeting notes, the project deadline is{" "}
        <span
          style={{
            backgroundColor: showCitations ? COLORS.citationBg : "transparent",
            padding: showCitations ? "2px 4px" : 0,
            borderRadius: 4,
            fontWeight: 700,
            color: COLORS.accentDark,
          }}
        >
          March 15th
          {showCitations && (
            <sup
              style={{
                fontSize: 14,
                marginLeft: 2,
                opacity: citationProgress,
              }}
            >
              [1]
            </sup>
          )}
        </span>
        . The budget was approved at{" "}
        <span
          style={{
            backgroundColor: showCitations ? COLORS.citationBg : "transparent",
            padding: showCitations ? "2px 4px" : 0,
            borderRadius: 4,
            fontWeight: 700,
            color: COLORS.accentDark,
          }}
        >
          $50,000
          {showCitations && (
            <sup
              style={{
                fontSize: 14,
                marginLeft: 2,
                opacity: citationProgress,
              }}
            >
              [2]
            </sup>
          )}
        </span>
        .
      </div>
    </div>
  );
};

// Citations List Component
const CitationsList: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: COLORS.cardBg,
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        width: 320,
        border: `2px solid ${COLORS.citationBorder}`,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          color: "#666",
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        Sources:
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.accentDark,
            }}
          >
            [1]
          </span>
          <div>
            <div
              style={{
                fontFamily,
                fontSize: 18,
                color: COLORS.text,
                fontWeight: 600,
              }}
            >
              Meeting Notes
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 13,
                color: "#666",
              }}
            >
              Page 2, Paragraph 3
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.accentDark,
            }}
          >
            [2]
          </span>
          <div>
            <div
              style={{
                fontFamily,
                fontSize: 18,
                color: COLORS.text,
                fontWeight: 600,
              }}
            >
              Budget Policy
            </div>
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 13,
                color: "#666",
              }}
            >
              Section 4.1, Line 12
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export const SourceGrounded: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timeline in seconds
  const TIMELINE = {
    title: 0,
    doc1: 0.8,
    doc2: 1.2,
    doc3: 1.6,
    arrow1: 2.2,
    aiBox: 2.8,
    arrow2: 3.4,
    output: 4.0,
    citations: 5.5,
    citationsList: 6.5,
    insight: 8.0,
  };

  // Animations
  const title = usePopIn(TIMELINE.title);
  const doc1 = usePopIn(TIMELINE.doc1);
  const doc2 = usePopIn(TIMELINE.doc2);
  const doc3 = usePopIn(TIMELINE.doc3);
  const arrow1 = useSlideIn(TIMELINE.arrow1, "right");
  const aiBox = usePopIn(TIMELINE.aiBox);
  const arrow2 = useSlideIn(TIMELINE.arrow2, "down");
  const output = usePopIn(TIMELINE.output);
  const citationsList = usePopIn(TIMELINE.citationsList);
  const insight = usePopIn(TIMELINE.insight);

  // Citation highlight progress
  const citationProgress = interpolate(
    frame,
    [TIMELINE.citations * fps, (TIMELINE.citations + 0.5) * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showCitations = frame >= TIMELINE.citations * fps;

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
            Source-Grounded AI
          </span>
        </div>
      )}

      {/* DOCUMENTS ROW */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 160,
          display: "flex",
          gap: 24,
        }}
      >
        {doc1.isVisible && (
          <div
            style={{
              transform: `scale(${doc1.scale})`,
              opacity: doc1.opacity,
              transformOrigin: "center",
            }}
          >
            <DocumentIcon
              label="Meeting Notes"
              icon="📋"
              color="#00c6fb"
            />
          </div>
        )}

        {doc2.isVisible && (
          <div
            style={{
              transform: `scale(${doc2.scale})`,
              opacity: doc2.opacity,
              transformOrigin: "center",
            }}
          >
            <DocumentIcon
              label="Budget Policy"
              icon="📄"
              color="#0891b2"
            />
          </div>
        )}

        {doc3.isVisible && (
          <div
            style={{
              transform: `scale(${doc3.scale})`,
              opacity: doc3.opacity,
              transformOrigin: "center",
            }}
          >
            <DocumentIcon
              label="Research Paper"
              icon="📚"
              color="#005bea"
            />
          </div>
        )}
      </div>

      {/* ARROW TO AI */}
      {arrow1.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 400,
            top: 200,
            opacity: arrow1.opacity,
            transform: `translateX(${arrow1.translate}px)`,
          }}
        >
          <Arrow direction="right" length={80} />
        </div>
      )}

      {/* AI BOX */}
      {aiBox.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 500,
            top: 150,
            transform: `scale(${aiBox.scale})`,
            opacity: aiBox.opacity,
            transformOrigin: "center",
          }}
        >
          <AIBox />
        </div>
      )}

      {/* ARROW DOWN FROM AI */}
      {arrow2.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 555,
            top: 300,
            opacity: arrow2.opacity,
            transform: `translateY(${arrow2.translate}px)`,
          }}
        >
          <Arrow direction="down" length={50} />
        </div>
      )}

      {/* OUTPUT BOX */}
      <Sequence
        from={Math.round(TIMELINE.output * fps)}
        layout="none"
        premountFor={Math.round(0.5 * fps)}
      >
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 140,
            transform: `scale(${output.scale})`,
            opacity: output.opacity,
            transformOrigin: "top left",
          }}
        >
          <OutputBox
            showCitations={showCitations}
            citationProgress={citationProgress}
          />
        </div>
      </Sequence>

      {/* CITATIONS LIST */}
      {citationsList.isVisible && (
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 400,
            transform: `scale(${citationsList.scale})`,
            opacity: citationsList.opacity,
            transformOrigin: "top left",
          }}
        >
          <CitationsList />
        </div>
      )}

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
            }}
          >
            Every answer is traceable to YOUR sources
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
