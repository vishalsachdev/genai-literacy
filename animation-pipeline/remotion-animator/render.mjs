#!/usr/bin/env node
/**
 * Render an Excalidraw file to video using Remotion
 *
 * Usage: node render.mjs <excalidraw-file> [output-name] [duration-seconds]
 */

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function render(excalidrawFile, outputName, durationSeconds = 10) {
  console.log("🎬 Remotion Excalidraw Animator");
  console.log("================================");

  // Read excalidraw file
  const excalidrawPath = path.resolve(excalidrawFile);
  if (!fs.existsSync(excalidrawPath)) {
    console.error(`Error: File not found: ${excalidrawPath}`);
    process.exit(1);
  }

  const excalidrawContent = fs.readFileSync(excalidrawPath, "utf-8");
  const excalidrawData = JSON.parse(excalidrawContent);

  console.log(`📁 Input: ${excalidrawFile}`);
  console.log(`📊 Elements: ${excalidrawData.elements?.length || 0}`);
  console.log(`⏱️  Duration: ${durationSeconds}s`);

  // Pre-process: transform coordinates to fit 1280x720
  const videoWidth = 1280;
  const videoHeight = 720;
  const padding = 60;

  const elements = excalidrawData.elements || [];
  if (elements.length > 0) {
    // Calculate bounding box
    const minX = Math.min(...elements.map(e => e.x));
    const minY = Math.min(...elements.map(e => e.y));
    const maxX = Math.max(...elements.map(e => e.x + (e.width || 0)));
    const maxY = Math.max(...elements.map(e => e.y + (e.height || 0)));

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // Calculate scale to fit
    const scaleX = (videoWidth - padding * 2) / contentWidth;
    const scaleY = (videoHeight - padding * 2) / contentHeight;
    const scale = Math.min(scaleX, scaleY);

    // Calculate offset to center
    const scaledWidth = contentWidth * scale;
    const scaledHeight = contentHeight * scale;
    const offsetX = (videoWidth - scaledWidth) / 2 - minX * scale;
    const offsetY = (videoHeight - scaledHeight) / 2 - minY * scale;

    console.log(`📐 Scale: ${scale.toFixed(2)}, Offset: (${offsetX.toFixed(0)}, ${offsetY.toFixed(0)})`);

    // Transform all elements
    for (const el of elements) {
      el.x = el.x * scale + offsetX;
      el.y = el.y * scale + offsetY;
      if (el.width) el.width = el.width * scale;
      if (el.height) el.height = el.height * scale;
      if (el.fontSize) el.fontSize = el.fontSize * scale;
      if (el.strokeWidth) el.strokeWidth = el.strokeWidth * scale;
      // Scale points for lines/arrows
      if (el.points) {
        el.points = el.points.map(p => [p[0] * scale, p[1] * scale]);
      }
    }
  }

  // Bundle the project
  console.log("\n1. Bundling project...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, "./src/index.ts"),
    webpackOverride: (config) => config,
  });

  // Select composition
  console.log("2. Preparing composition...");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "ExcalidrawAnimation",
    inputProps: {
      excalidrawData,
    },
  });

  // Override duration
  const fps = 30;
  const durationInFrames = durationSeconds * fps;

  // Output path
  const outputDir = path.resolve(__dirname, "../output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, `${outputName}.mp4`);

  // Render
  console.log(`3. Rendering to ${outputPath}...`);
  await renderMedia({
    composition: {
      ...composition,
      durationInFrames,
    },
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: {
      excalidrawData,
    },
    onProgress: ({ progress }) => {
      process.stdout.write(`   ${Math.round(progress * 100)}%\r`);
    },
  });

  console.log(`\n✅ Done! Output: ${outputPath}`);
}

// CLI
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log("Usage: node render.mjs <excalidraw-file> [output-name] [duration-seconds]");
  console.log("\nExample:");
  console.log("  node render.mjs ../../slides/assets/diagrams/v2-autocomplete-metaphor.excalidraw v2-autocomplete 10");
  process.exit(1);
}

const excalidrawFile = args[0];
const outputName = args[1] || path.basename(excalidrawFile, ".excalidraw");
const duration = parseInt(args[2]) || 10;

render(excalidrawFile, outputName, duration).catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
