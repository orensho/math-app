# Screenshots

This directory contains screenshots for the README.

## Taking Screenshots

### Option 1: Manual (Recommended)
1. Open the app at http://localhost:3000
2. Use macOS screenshot tool (Cmd+Shift+4, then Space to capture window)
3. Save screenshots with these names:
   - `home.png` - Homepage with grade selection
   - `basics-home.png` - Basics section homepage
   - `multiplication-quiz.png` - Multiplication quiz in action
   - `solution-steps.png` - Step-by-step solution display

### Option 2: Automated
Run this command from the project root:
```bash
# Install playwright first
npm install -D @playwright/test
npx playwright install chromium

# Take screenshots (create a script for this)
```

## Image Specifications
- Format: PNG
- Recommended width: 1200px
- Recommended height: 750px
- Background: Light mode
