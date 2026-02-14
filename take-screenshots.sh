#!/bin/bash

# Screenshot helper script for מתמטיקול
# This script helps you take screenshots for the README

echo "📸 מתמטיקול Screenshot Tool"
echo "============================"
echo ""
echo "Instructions:"
echo "1. Make sure the app is running at http://localhost:3000"
echo "2. Open the app in your browser"
echo "3. This script will guide you through taking screenshots"
echo ""

SCREENSHOT_DIR="./public/screenshots"
mkdir -p "$SCREENSHOT_DIR"

echo "Ready to take screenshots!"
echo ""

# Function to take a screenshot
take_screenshot() {
    local filename=$1
    local description=$2

    echo "📷 Taking screenshot: $description"
    echo "   1. Navigate to the required page"
    echo "   2. Press ENTER when ready..."
    read

    echo "   3. Click on the browser window within 3 seconds..."
    sleep 3

    screencapture -w -o "$SCREENSHOT_DIR/$filename"

    if [ -f "$SCREENSHOT_DIR/$filename" ]; then
        echo "   ✓ Saved: $filename"
        echo ""
    else
        echo "   ✗ Failed to capture screenshot"
        echo ""
    fi
}

# Take screenshots
echo "Screenshot 1 of 4"
take_screenshot "home.png" "Homepage with יסודות and כיתות"

echo "Screenshot 2 of 4"
take_screenshot "basics-home.png" "Basics page with לוח הכפל"

echo "Screenshot 3 of 4"
take_screenshot "multiplication-quiz.png" "Multiplication quiz question"

echo "Screenshot 4 of 4"
take_screenshot "solution-steps.png" "Step-by-step solution display"

echo "✅ Done! Screenshots saved to $SCREENSHOT_DIR"
echo ""
echo "Next steps:"
echo "1. Check the screenshots in $SCREENSHOT_DIR"
echo "2. Update README.md to use these images"
echo "3. Commit and push the changes"
