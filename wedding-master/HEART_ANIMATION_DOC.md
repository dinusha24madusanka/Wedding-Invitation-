# Heart Loader Animation Documentation

This document describes the implementation of the elegant, high-performance Heart Loader Animation added to the digital wedding invitation website. It acts as an introductory "curtain-raiser," offering a polished and romantic welcome before revealing the full interactive invitation.

---

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [File Structure](#file-structure)
4. [How It Works](#how-it-works)
5. [Customization Options](#customization-options)
6. [Performance Optimization](#performance-optimization)
7. [Browser Compatibility](#browser-compatibility)

---

## Overview

The load animation is designed as a full-screen, responsive overlay with a glassmorphism card in the center. The core animation is a double interlocking heart shape representing the union of the groom (**Dinusha**) and the bride (**Chamini**). The heart contours draw themselves dynamically, fill with a soft gradient, and pulse in a double-heartbeat rhythm before fading out smoothly once the website has finished loading.

---

## Key Features

- **Theme Adaptability**: Synchronizes automatically with the application's style universes:
  - *Enchanted Forest*: Soft gold-light outlines on a warm cream backdrop.
  - *Celestial Dream*: Radiant yellow-gold outlines on a dark indigo glass card.
  - *Synthwave Love*: Vibrant hot-pink outlines on a deep purple glass backdrop with an active neon glow.
- **Performant CSS Animations**: Outline drawing (`stroke-dashoffset`), scaling, and sparkles utilize CSS keyframes running on the browser's compositor thread (60 FPS).
- **Graceful Unmounting**: Once the site loads and the intro fades out, the React component unmounts itself entirely from the DOM to free up memory and prevent click conflicts.
- **Minimum Display Timer**: Implements a minimum delay of 2.5 seconds, ensuring that guests on fast connections still experience the elegant intro transition without jarring cuts.

---

## File Structure

The load animation consists of the following files:

1. **Component**: [`src/components/HeartLoader.jsx`](file:///c:/Users/madus/OneDrive/Desktop/GitHub%20Clone/My%20Work/Wedding-Invitation-/wedding-master/wedding-app/src/components/HeartLoader.jsx) - Controls the loading states, registers event listeners, and renders the SVG/HTML structure.
2. **Styles**: [`src/components/HeartLoader.css`](file:///c:/Users/madus/OneDrive/Desktop/GitHub%20Clone/My%20Work/Wedding-Invitation-/wedding-master/wedding-app/src/components/HeartLoader.css) - Defines all layouts, animations, transitions, keyframes, and theme variables.
3. **Integration**: [`src/App.jsx`](file:///c:/Users/madus/OneDrive/Desktop/GitHub%20Clone/My%20Work/Wedding-Invitation-/wedding-master/wedding-app/src/App.jsx) - Modified to include and render the `HeartLoader` component.

---

## How It Works

1. **Initial Mount**: As the page starts mounting, the `HeartLoader` is rendered at the top level. The body's overflow is set to `hidden` to disable scrolling.
2. **Stroke Drawing**: The SVG paths of the interlocking hearts are animated from `stroke-dashoffset: 450` to `0` over 2 seconds.
3. **Fill & Twinkle**: A linear gradient (`url(#heartGrad)`) fades into the hearts, and surrounding sparkles twinkle randomly.
4. **Heartbeat Pulse**: Once drawn, the SVG container begins scaling rhythmically at `1.8s` intervals representing a double heartbeat.
5. **Loading Resolve**: A `Promise.all` waits for:
   - The document state to be `complete` (all scripts, stylesheets, and images loaded).
   - A minimum `2500ms` timer.
6. **Fade-Out Transition**: A `.fade-out` class is applied to the overlay, triggering an `800ms` opacity fade transition.
7. **Clean Unmount**: After the fade completes, the component clears its visible state, unmounts itself, and restores the scrollbar (`overflow: ''`).

---

## Customization Options

### 1. Adjusting Display Timers
To modify the minimum time the loader stays visible, open [`HeartLoader.jsx`](file:///c:/Users/madus/OneDrive/Desktop/GitHub%20Clone/My%20Work/Wedding-Invitation-/wedding-master/wedding-app/src/components/HeartLoader.jsx) and change the millisecond value:

```javascript
// Change 2500 (2.5 seconds) to your preferred duration
const minTimer = new Promise((resolve) => setTimeout(resolve, 2500));
```

To modify the fade-out speed, adjust both the CSS transition in [`HeartLoader.css`](file:///c:/Users/madus/OneDrive/Desktop/GitHub%20Clone/My%20Work/Wedding-Invitation-/wedding-master/wedding-app/src/components/HeartLoader.css) and the timeout in [`HeartLoader.jsx`](file:///c:/Users/madus/OneDrive/Desktop/GitHub%20Clone/My%20Work/Wedding-Invitation-/wedding-master/wedding-app/src/components/HeartLoader.jsx):

**In `HeartLoader.jsx`**:
```javascript
// Match this to your CSS transition duration (e.g., 800ms)
const fadeTimeout = setTimeout(() => {
  setVisible(false);
}, 800);
```

**In `HeartLoader.css`**:
```css
.heart-loader-overlay {
  /* Match the 0.8s to the React timeout */
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 2. Changing Theme Colors
The loader uses the design token custom properties defined in `index.css`. To customize the coloring, edit the relevant variables in `index.css`:

- Background Color: `var(--cream)`
- Heart Drawing Color: `var(--gold)`
- Sparkles & Heart Gradient: `var(--gold-light)`
- Title & Text: `var(--charcoal)`

---

## Performance Optimization

To ensure smooth animations and avoid blocking other elements:
1. **GPU Acceleration**: Animations use `transform` (scale/translate) and `opacity` properties. These run directly on the compositor thread and avoid expensive layout recalculations.
2. **Resource Unmounting**: The loader doesn't merely hide with CSS; it fully unmounts from the DOM. This reduces the virtual DOM complexity and ensures mouse interactions are not blocked.
3. **Optimized SVG**: The double heart uses two bezier-curve paths with a minimum set of nodes, ensuring efficient rendering.

---

## Browser Compatibility

The animation has been tested and operates across all modern web browsers:

| Feature | Chrome / Edge | Firefox | Safari | Opera | Notes |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **CSS Keyframes** | Yes | Yes | Yes | Yes | Fully supported. |
| **SVG Drawing (`stroke-dashoffset`)** | Yes | Yes | Yes | Yes | Fully supported. |
| **Backdrop Filter Blur** | Yes | Yes | Yes (needs prefix) | Yes | Webkit-prefix is included. Fallback to soft background opacity if disabled. |
| **CSS Custom Variables** | Yes | Yes | Yes | Yes | Fully supported. |
