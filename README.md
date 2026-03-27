# Codenames Ultra

A premium online implementation of the classic **Codenames** board game, styled as a tactical intelligence briefing.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Overview

Codenames Ultra reimagines the classic party game with a high-end "Intelligence Briefing" aesthetic — clean, authoritative surfaces, glassmorphic elements, and a dual-typeface system (Space Grotesk + Inter).

### Features

- Two-team gameplay (Blue Intelligence vs Red Infiltration)
- Spymaster and Operative roles
- Real-time clue giving and guessing
- Responsive, premium UI with no-border design philosophy
- Tonal layering and ambient depth instead of traditional card borders

## Getting Started

Open `index.html` in your browser — no build step required.

## Design System

The visual language is documented in [`DESIGN.md`](DESIGN.md). Key principles:

- **No-Line Rule** — boundaries defined by surface luminosity, not borders
- **Glass & Gradient** — glassmorphism for floating elements, gradient CTAs
- **Dual Typography** — Space Grotesk for headlines, Inter for body text
- **Tonal Depth** — layered surfaces create natural elevation without shadows

## Project Structure

```
├── index.html          # Entry point
├── css/
│   └── styles.css      # Full design system implementation
├── js/
│   ├── app.js          # Application bootstrap
│   ├── app.bundle.js   # Bundled application
│   ├── game.js         # Game logic & state
│   ├── ui.js           # UI rendering & interactions
│   └── words.js        # Word database
└── DESIGN.md           # Design system documentation
```

## License

MIT
