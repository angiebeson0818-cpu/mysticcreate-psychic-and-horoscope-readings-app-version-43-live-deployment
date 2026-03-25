# mysticCREATE Psychic and Horoscope Readings App

## Current State
Full mysticCREATE app with celestial Gothic design, gold/blue theme toggle, psychic readings, horoscope/love horoscope modals, zodiac calendar strip, animated stars, moondress watermark, custom footer with About Her modal, and angieCREATES branding.

## Requested Changes (Diff)

### Add
- ZenMusicPlayer component: autoplay zen/mystical music on app open at 50% volume using a royalty-free audio URL (Web Audio API or HTML audio element). Falls back gracefully if browser blocks autoplay.
- Persistent floating play/pause toggle button (fixed position, bottom-right or bottom-left corner, above footer). Shows Play icon when paused, Pause icon when playing.
- Button color changes with theme: gold when gold theme active, celestial-blue when blue theme active.
- On app open: attempt autoplay; if browser blocks it, show a subtle "tap to play music" prompt that auto-dismisses when user interacts.

### Modify
- HomePage.tsx: import and mount ZenMusicPlayer, pass isBlueTheme prop.
- The existing Moon theme toggle button stays; music player button is a separate control.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/ZenMusicPlayer.tsx` — uses HTML `<audio>` element with a royalty-free streaming zen music URL (e.g. a publicly accessible CDN URL for ambient music). Manages play/pause state with a useRef for the audio element.
2. On mount: attempt `audio.play()`, handle the promise rejection (autoplay blocked) by setting a flag to show prompt.
3. Render a fixed floating button with play/pause icon. Color adapts to isBlueTheme.
4. Mount ZenMusicPlayer in HomePage.tsx.
