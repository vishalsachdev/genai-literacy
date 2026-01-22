#!/usr/bin/env node
/**
 * Excalidraw Animation Recorder
 *
 * Automates the process of:
 * 1. Loading an .excalidraw file into excalidraw-animate
 * 2. Playing the animation
 * 3. Recording to video via Puppeteer screencast
 *
 * Usage:
 *   node animate.js <excalidraw-file> [output-name] [duration-seconds]
 *
 * Example:
 *   node animate.js ../slides/assets/diagrams/v2-autocomplete-metaphor.excalidraw v2-autocomplete 15
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const EXCALIDRAW_ANIMATE_URL = 'https://dai-shi.github.io/excalidraw-animate/';

async function recordAnimation(excalidrawFile, outputName, durationSeconds = 15) {
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${outputName}.webm`);

  // Read the excalidraw file
  const excalidrawContent = fs.readFileSync(excalidrawFile, 'utf-8');
  const excalidrawData = JSON.parse(excalidrawContent);

  console.log('🎬 Excalidraw Animation Recorder');
  console.log('================================');
  console.log(`📁 Input: ${excalidrawFile}`);
  console.log(`📹 Output: ${outputPath}`);
  console.log(`⏱️  Duration: ${durationSeconds}s`);
  console.log(`📊 Elements: ${excalidrawData.elements?.length || 0}`);
  console.log('');

  // Launch browser (headed mode for canvas rendering)
  console.log('1. Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--window-size=1280,720',
      '--disable-web-security',
      '--allow-file-access-from-files'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // Navigate to excalidraw-animate
  console.log('2. Loading excalidraw-animate...');
  await page.goto(EXCALIDRAW_ANIMATE_URL, { waitUntil: 'networkidle2' });

  // Wait for React app to mount
  await page.waitForSelector('button', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));

  console.log('3. Loading excalidraw file...');

  // Start a simple HTTP server to serve the excalidraw file
  const http = require('http');
  const tempFile = path.resolve(__dirname, 'temp-serve.excalidraw');
  fs.writeFileSync(tempFile, excalidrawContent);

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(excalidrawContent);
  });

  await new Promise(resolve => server.listen(8765, resolve));
  console.log('   ✓ Started local server on port 8765');

  // Find the URL input field and enter our local URL
  // The site has a text field for pasting URLs
  const urlInput = await page.$('input[type="text"]');
  if (urlInput) {
    await urlInput.type('http://localhost:8765/file.excalidraw');
    console.log('   ✓ Entered local URL');
    await new Promise(r => setTimeout(r, 500));
  } else {
    console.log('   ⚠️  No URL input found');
  }

  // Clean up
  fs.unlinkSync(tempFile);

  // Look for and click the "Animate!" button
  console.log('4. Starting animation...');

  // Find all buttons and look for Animate
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (const btn of buttons) {
      if (btn.textContent && btn.textContent.includes('Animate')) {
        btn.click();
        return true;
      }
    }
    return false;
  });

  if (clicked) {
    console.log('   ✓ Clicked Animate button');
  } else {
    console.log('   ⚠️  Could not find Animate button');
    console.log('   Available buttons:');
    const buttonTexts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map(b => b.textContent);
    });
    console.log('   ', buttonTexts);
  }

  // Wait for animation to initialize
  await new Promise(r => setTimeout(r, 2000));

  // Capture frames using repeated screenshots
  console.log(`5. Recording for ${durationSeconds} seconds...`);

  const frames = [];
  const frameRate = 15; // 15fps is sufficient for animations
  const frameInterval = 1000 / frameRate;
  const totalFrames = durationSeconds * frameRate;

  const startTime = Date.now();

  for (let i = 0; i < totalFrames; i++) {
    const frameStart = Date.now();

    const screenshot = await page.screenshot({ type: 'png' });
    frames.push(screenshot);

    // Maintain frame timing
    const elapsed = Date.now() - frameStart;
    const waitTime = Math.max(0, frameInterval - elapsed);
    if (waitTime > 0) {
      await new Promise(r => setTimeout(r, waitTime));
    }

    // Progress indicator
    if (i % frameRate === 0) {
      process.stdout.write(`   ${Math.floor(i / frameRate)}s...`);
    }
  }
  console.log(' done');

  console.log(`   ✓ Captured ${frames.length} frames`);

  // Save frames as individual PNGs (for ffmpeg to combine)
  const framesDir = path.join(outputDir, `${outputName}-frames`);
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  for (let i = 0; i < frames.length; i++) {
    fs.writeFileSync(path.join(framesDir, `frame-${String(i).padStart(5, '0')}.png`), frames[i]);
  }

  console.log(`   ✓ Saved frames to ${framesDir}`);

  await browser.close();

  console.log('');
  console.log('6. Converting to video with ffmpeg...');

  const mp4Path = outputPath.replace('.webm', '.mp4');
  const { execSync } = require('child_process');
  try {
    execSync(`ffmpeg -y -framerate 15 -i "${framesDir}/frame-%05d.png" -c:v libx264 -pix_fmt yuv420p -crf 20 "${mp4Path}"`, {
      stdio: 'pipe'
    });
    console.log(`   ✓ Video saved: ${mp4Path}`);

    // Clean up frames
    fs.rmSync(framesDir, { recursive: true });
    console.log('   ✓ Cleaned up frames');
  } catch (err) {
    console.log(`   ⚠️  ffmpeg failed. Frames saved in: ${framesDir}`);
    console.log('   Run manually:');
    console.log(`   ffmpeg -framerate 15 -i "${framesDir}/frame-%05d.png" -c:v libx264 -pix_fmt yuv420p "${mp4Path}"`);
  }

  console.log('');
  console.log('✅ Done!');
}

// CLI
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Usage: node animate.js <excalidraw-file> [output-name] [duration-seconds]');
  console.log('');
  console.log('Example:');
  console.log('  node animate.js ../slides/assets/diagrams/v2-autocomplete-metaphor.excalidraw v2-autocomplete 15');
  process.exit(1);
}

const excalidrawFile = args[0];
const outputName = args[1] || path.basename(excalidrawFile, '.excalidraw');
const duration = parseInt(args[2]) || 15;

if (!fs.existsSync(excalidrawFile)) {
  console.error(`Error: File not found: ${excalidrawFile}`);
  process.exit(1);
}

recordAnimation(excalidrawFile, outputName, duration)
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
