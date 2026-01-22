#!/bin/bash
# Simple animation workflow without Node dependencies
#
# Usage: ./record.sh <output-name> [duration-seconds]
# Example: ./record.sh v2-autocomplete 15

OUTPUT_NAME="${1:-animation}"
DURATION="${2:-15}"
OUTPUT_DIR="./output"

mkdir -p "$OUTPUT_DIR"

echo "🎬 Excalidraw Animation Recorder"
echo "================================"
echo ""
echo "1. Opening excalidraw-animate in browser..."
open "https://dai-shi.github.io/excalidraw-animate/"

echo ""
echo "2. Load your .excalidraw file and click 'Animate!'"
echo ""
read -p "3. Press ENTER when ready to record for ${DURATION}s..."

echo ""
echo "📹 Recording for ${DURATION} seconds..."
screencapture -v -V "$DURATION" "$OUTPUT_DIR/${OUTPUT_NAME}.mov"

echo ""
echo "✅ Saved: $OUTPUT_DIR/${OUTPUT_NAME}.mov"
echo ""
echo "To convert to MP4:"
echo "  ffmpeg -i $OUTPUT_DIR/${OUTPUT_NAME}.mov -c:v libx264 -crf 20 $OUTPUT_DIR/${OUTPUT_NAME}.mp4"
