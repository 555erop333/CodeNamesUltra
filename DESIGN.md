# Design System: Tactical Intelligence

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Intelligence Briefing"**

This design system moves away from the "board game" aesthetic and toward a high-end, editorial intelligence dashboard. It is defined by **Intentional Asymmetry** and **Tonal Depth**. Instead of a rigid, boxed-in grid, we use expansive breathing room and overlapping layers to create a sense of mystery and sophistication. The interface should feel like a redacted document or a high-security digital terminal—clean, authoritative, and premium. 

We break the "template" look by using a high-contrast typography scale (Space Grotesk vs. Inter) and replacing standard borders with subtle shifts in surface luminosity.

## 2. Colors & Surface Architecture
The color palette is built on the tension between the two competing factions, set against a sterile, high-end environment.

*   **Primary (Intelligence Blue):** `primary` (#00236f) and `primary_container` (#1e3a8a). Used for Team A.
*   **Secondary (Infiltration Red):** `secondary` (#b02d29) and `secondary_container` (#ff665c). Used for Team B.
*   **Tertiary (The Asset/Assassin):** `tertiary` (#442100) and `tertiary_container` (#653400). Used for high-stakes highlights and the "Assassin" state.
*   **Neutral (The Briefing Room):** `surface` (#f8f9fa) and `on_surface` (#191c1d).

### Color Tokens (Full Palette)
| Token | Value |
|---|---|
| background | #f8f9fa |
| surface | #f8f9fa |
| surface_bright | #f8f9fa |
| surface_container | #edeeef |
| surface_container_high | #e7e8e9 |
| surface_container_highest | #e1e3e4 |
| surface_container_low | #f3f4f5 |
| surface_container_lowest | #ffffff |
| surface_dim | #d9dadb |
| surface_tint | #4059aa |
| surface_variant | #e1e3e4 |
| on_surface | #191c1d |
| on_surface_variant | #444651 |
| primary | #00236f |
| primary_container | #1e3a8a |
| primary_fixed | #dce1ff |
| primary_fixed_dim | #b6c4ff |
| on_primary | #ffffff |
| on_primary_container | #90a8ff |
| secondary | #b02d29 |
| secondary_container | #ff665c |
| secondary_fixed | #ffdad6 |
| secondary_fixed_dim | #ffb4ac |
| on_secondary | #ffffff |
| on_secondary_container | #690007 |
| tertiary | #442100 |
| tertiary_container | #653400 |
| tertiary_fixed | #ffdcc3 |
| tertiary_fixed_dim | #ffb77d |
| on_tertiary | #ffffff |
| outline | #757682 |
| outline_variant | #c5c5d3 |
| error | #ba1a1a |
| error_container | #ffdad6 |
| inverse_surface | #2e3132 |
| inverse_on_surface | #f0f1f2 |
| inverse_primary | #b6c4ff |

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** 
Boundaries must be defined solely through background color shifts. For example, the game board (using `surface_container_low`) sits on the main background (`surface`), creating a natural boundary through luminosity rather than a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Base:** `surface` (The desk).
*   **Sectioning:** `surface_container_low` (The folder).
*   **Active Elements:** `surface_container_lowest` (The individual cards).
Each inner container uses a slightly higher or lower tier to define its importance, creating "nested" depth without visual clutter.

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for floating elements like the "Spymaster Console." Use semi-transparent surface colors with a `backdrop-blur` of 12px-16px. Main CTAs should use a subtle linear gradient from `primary` to `primary_container` to add a "liquid" professional polish.

## 3. Typography
We use a dual-typeface system to balance technical precision with readability.

*   **Display & Headlines (Space Grotesk):** This typeface provides a geometric, "coded" feel. Use `display-lg` (3.5rem) for game-over states and `headline-md` (1.75rem) for team turn indicators.
*   **Body & Titles (Inter):** Inter provides maximum legibility for the game words. Use `title-md` (1.125rem) for card labels and `body-md` (0.875rem) for secondary UI instructions.
*   **Labels (Inter Mono):** Use `label-sm` for technical metadata, like card coordinates or "REDACTED" stamps, to lean into the intelligence briefing theme.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional structural lines.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section to create a soft, natural lift. 
*   **Ambient Shadows:** For floating modals, use extra-diffused shadows.
    *   *Shadow:* `0px 20px 40px rgba(25, 28, 29, 0.06)` (A tinted version of `on_surface`).
*   **The Ghost Border Fallback:** If accessibility requires a stroke (e.g., card focus states), use the `outline_variant` token at **20% opacity**. Never use 100% opaque borders.
*   **Atmospheric Blurs:** Use `surface_tint` at 5% opacity as a background overlay behind modals to maintain a cohesive color temperature.

## 5. Components

### The Game Card (Primary Component)
*   **Style:** No borders. Background: `surface_container_lowest`. 
*   **State - Unrevealed:** `surface_container_highest` with `title-md` centered text.
*   **State - Revealed:** Transition background to the team's `primary_container` or `secondary_container`. Text color shifts to `on_primary`.
*   **Spacing:** Use `spacing.4` (1rem) for internal padding.

### Buttons
*   **Primary (Action):** Gradient from `primary` to `primary_container`. Roundedness: `md` (0.375rem).
*   **Secondary (Ghost):** No background. Ghost border (20% `outline`) only. Text: `label-md` in uppercase with 0.05em letter spacing.

### Team Turn Indicators (The "Pulse")
*   Instead of a simple box, use a full-width `surface_container_high` bar at the top. The active team's color should "bleed" in from the side using a soft gradient, indicating whose turn it is without breaking the clean aesthetic.

### Input Fields
*   **Style:** Minimalist. Only a bottom stroke using `outline_variant` at 40% opacity. 
*   **Focus:** Stroke transitions to `primary` with a height of 2px.

### Cards & Lists (Global Rule)
**Forbid divider lines.** Separate content using vertical white space from the spacing scale (e.g., `spacing.8`) or subtle background luminosity shifts between list items.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts for the dashboard (e.g., Spymaster clues aligned right, game board centered).
*   **Do** use `surface_bright` to highlight the "current word" being guessed.
*   **Do** allow the background color of the active team to subtly tint the `surface` of the entire page (1-2% opacity).

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` (#191C1D) for text to maintain the premium editorial feel.
*   **Don't** use heavy "drop shadows" on game cards. Rely on the "No-Line" luminosity shifts.
*   **Don't** use standard 4-way rounded corners for everything. Try `rounded-none` for the game board container while keeping cards `rounded-md` to create visual contrast between "The Briefing Folder" and "The Intel."
