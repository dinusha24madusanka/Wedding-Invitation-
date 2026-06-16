# Innovative Wedding App: The Love Story Quest & Digital Wedding Pass

Instead of a traditional static scroll-page, we will transform the app into an interactive experience combining gamified storytelling, floating interactive guestbooks, customizable digital wedding tickets, and dynamic style universes.

## User Review Required

> [!IMPORTANT]
> This will replace the traditional layout with a dashboard/game-style layout where guests unlock sections step-by-step. Let me know if you would like to adjust the mini-game trivia or theme configurations!

## Core Innovative Features

### 1. The Quest (Story Unlocker)
- The main event page starts locked behind a beautiful cover.
- Guests are guided through "The Love Story Quest" where they play a trivia game (e.g., "Where did Dinusha and Chamini go on their first date?").
- Correct answers animate the timeline milestone and unlock the next section of the invitation.

### 2. Style Universes (Dynamic Themes)
- A floating floating widget allows guests to switch the UI theme:
  - **Celestial Dream**: Deep indigo background with glowing gold constellations.
  - **Enchanted Forest**: Sage greens, cream accents, and soft floating fireflies.
  - **Synthwave Love**: Tech-inspired neon pink, cyan borders, and digital scanlines.

### 3. "Sky of Blessings" Board
- Guest wishes float as interactive elements (balloons or stars) across a canvas.
- Guests click on them to read messages.
- New submissions instantly float onto the board.

### 4. Interactive RSVP Ticket Generator
- Submitting the RSVP form generates a custom glassmorphic **Digital Wedding Pass** in real-time.
- Displays guest name, invitation status, seat QR placeholder, and customized theme.
- Includes a button to download the ticket card layout as an image.

## Proposed Code Changes

### [MODIFY] [App.jsx](file:///c:/Users/madus/Downloads/wedding-master/wedding-master/wedding-app/src/App.jsx)
- Handle global state for: Active theme/universe, quest unlock progress, and generated ticket data.

### [NEW] [ThemeSelector.jsx](file:///c:/Users/madus/Downloads/wedding-master/wedding-master/wedding-app/src/components/ThemeSelector.jsx)
- Floating controller for switching style classes and sound effects.

### [NEW] [StoryQuest.jsx](file:///c:/Users/madus/Downloads/wedding-master/wedding-master/wedding-app/src/components/StoryQuest.jsx)
- Trivia cards and milestone transitions.

### [NEW] [BlessingSky.jsx](file:///c:/Users/madus/Downloads/wedding-master/wedding-master/wedding-app/src/components/BlessingSky.jsx)
- Floating message board using canvas/CSS animations.

### [NEW] [TicketGenerator.jsx](file:///c:/Users/madus/Downloads/wedding-master/wedding-master/wedding-app/src/components/TicketGenerator.jsx)
- Renders the downloadable glassmorphic pass.

## Verification Plan
- Verify build compiling and bundle size.
- Manually test trivia completion flow opens the full invitation.
- Test theme switcher switches CSS custom variables instantly.
