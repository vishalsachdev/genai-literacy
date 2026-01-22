import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import React from "react";

// Excalidraw fonts - loaded via Google Fonts
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Comic+Neue:wght@400;700&display=swap');
`;

// Font family mapping (matches Excalidraw's fontFamily values)
const getFontFamily = (fontFamily?: number): string => {
  switch (fontFamily) {
    case 1: // Virgil (hand-drawn) - use Caveat as substitute
      return "'Caveat', 'Comic Neue', cursive";
    case 2: // Helvetica
      return "Helvetica, Arial, sans-serif";
    case 3: // Cascadia (code)
      return "'Cascadia Code', 'Fira Code', monospace";
    default:
      return "'Caveat', cursive";
  }
};

// Types for Excalidraw elements
interface ExcalidrawElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: string;
  strokeWidth: number;
  roughness: number;
  opacity: number;
  text?: string;
  fontSize?: number;
  fontFamily?: number;
  textAlign?: string;
  points?: number[][];
}

interface ExcalidrawData {
  elements: ExcalidrawElement[];
  appState?: {
    viewBackgroundColor?: string;
  };
}

interface Props {
  excalidrawPath: string;
  excalidrawData?: ExcalidrawData;
}

// Render a single element with animation
const AnimatedElement: React.FC<{
  element: ExcalidrawElement;
  progress: number; // 0 to 1
  offsetX: number;
  offsetY: number;
}> = ({ element, progress, offsetX, offsetY }) => {
  if (progress <= 0) return null;

  const x = element.x - offsetX;
  const y = element.y - offsetY;
  const opacity = element.opacity / 100 * progress;
  const strokeDashoffset = (1 - progress) * 1000;

  const commonStyle: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    opacity,
  };

  switch (element.type) {
    case "rectangle":
      return (
        <div
          style={{
            ...commonStyle,
            width: element.width,
            height: element.height,
            border: `${element.strokeWidth}px solid ${element.strokeColor}`,
            backgroundColor: element.backgroundColor === "transparent" ? "transparent" : element.backgroundColor,
            borderRadius: 4,
          }}
        />
      );

    case "ellipse":
      return (
        <div
          style={{
            ...commonStyle,
            width: element.width,
            height: element.height,
            border: `${element.strokeWidth}px solid ${element.strokeColor}`,
            backgroundColor: element.backgroundColor === "transparent" ? "transparent" : element.backgroundColor,
            borderRadius: "50%",
          }}
        />
      );

    case "line":
      if (!element.points || element.points.length < 2) return null;
      const [lineStart, lineEnd] = element.points;
      const lineDx = lineEnd[0] - lineStart[0];
      const lineDy = lineEnd[1] - lineStart[1];
      const lineLength = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
      const lineAngle = Math.atan2(lineDy, lineDx) * (180 / Math.PI);

      return (
        <div
          style={{
            ...commonStyle,
            width: lineLength,
            height: element.strokeWidth || 2,
            backgroundColor: element.strokeColor,
            transform: `rotate(${lineAngle}deg)`,
            transformOrigin: "0 50%",
            clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
          }}
        />
      );

    case "arrow":
      if (!element.points || element.points.length < 2) return null;
      const [arrowStart, arrowEnd] = element.points;
      const dx = arrowEnd[0] - arrowStart[0];
      const dy = arrowEnd[1] - arrowStart[1];
      const arrowLength = Math.sqrt(dx * dx + dy * dy);
      const arrowAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      const tipSize = Math.max(8, (element.strokeWidth || 2) * 4);

      return (
        <div style={{ ...commonStyle, overflow: "visible" }}>
          {/* Arrow line */}
          <div
            style={{
              position: "absolute",
              width: arrowLength,
              height: element.strokeWidth || 2,
              backgroundColor: element.strokeColor,
              transform: `rotate(${arrowAngle}deg)`,
              transformOrigin: "0 50%",
              clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
            }}
          />
          {/* Arrow tip */}
          {progress > 0.8 && (
            <div
              style={{
                position: "absolute",
                left: arrowEnd[0] - tipSize / 2,
                top: arrowEnd[1] - tipSize / 2,
                width: 0,
                height: 0,
                borderLeft: `${tipSize}px solid ${element.strokeColor}`,
                borderTop: `${tipSize / 2}px solid transparent`,
                borderBottom: `${tipSize / 2}px solid transparent`,
                transform: `rotate(${arrowAngle}deg)`,
                transformOrigin: "center center",
                opacity: (progress - 0.8) * 5, // Fade in at end
              }}
            />
          )}
        </div>
      );

    case "text":
      const fontScale = 1.3; // Increase font size by 30%
      return (
        <div
          style={{
            ...commonStyle,
            color: element.strokeColor,
            fontSize: (element.fontSize || 16) * fontScale,
            fontFamily: getFontFamily(element.fontFamily),
            textAlign: (element.textAlign as React.CSSProperties["textAlign"]) || "left",
            whiteSpace: "pre",
            overflow: "visible",
            clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
          }}
        >
          {element.text}
        </div>
      );

    default:
      return null;
  }
};

export const ExcalidrawAnimation: React.FC<Props> = ({ excalidrawData }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Default empty data if none provided
  const data: ExcalidrawData = excalidrawData || { elements: [] };
  const elements = data.elements || [];
  const bgColor = data.appState?.viewBackgroundColor || "#ffffff";

  if (elements.length === 0) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "#666"
      }}>
        No elements to render
      </div>
    );
  }

  // No runtime transforms - elements should already be positioned for 1280x720
  const offsetX = 0;
  const offsetY = 0;

  // Animation: each element gets a portion of the total duration
  const framesPerElement = durationInFrames / elements.length;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{FONTS}</style>
      {elements.map((element, index) => {
        const elementStartFrame = index * framesPerElement * 0.8; // Overlap animations
        const elementEndFrame = elementStartFrame + framesPerElement;

        const progress = interpolate(
          frame,
          [elementStartFrame, elementEndFrame],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <AnimatedElement
            key={element.id}
            element={element}
            progress={progress}
            offsetX={offsetX}
            offsetY={offsetY}
          />
        );
      })}
    </div>
  );
};
