# angieCREATEs website add-ons

## Liquid gold accessibility button

`angieCREATEs-accessibility-button.html` is a self-contained snippet for angiecreates.pro (WordPress on Bluehost). It replaces the orange "All in One Accessibility" plugin with a liquid gold orb: gold waves inside, a shimmering ribbon around it, sparkles, and a ripple when you tap it.

What it offers visitors: text size (Standard, Large, Larger), high contrast, pause animations, easier reading spacing, a readable font, underline links, and reset. Choices are remembered on each visitor's device.

### Install (about five minutes)
1. In WordPress, go to Plugins, then Add New, and install **WPCode** (free). Skip this step if you use Elementor Pro, which has Custom Code built in.
2. Go to Code Snippets, then Add Snippet, then **Add Your Custom Code**, and pick **HTML Snippet**.
3. Paste the whole file. Set the location to **Site Wide Footer**, switch it to **Active**, and save.
   - With Elementor Pro instead: Elementor, then Custom Code, then Add New. Paste it, set the location to **Body End**, and publish to the entire site.
4. Go to Plugins and **deactivate** "All in One Accessibility", then delete it.
5. Clear the **WP Rocket** cache, then refresh the site.

To move the button to the right side, change `POSITION = "left"` to `"right"` at the top of the snippet.

The same orb is used in mysticCREATE (`src/frontend/src/components/AccessibilityMenu.tsx`).
