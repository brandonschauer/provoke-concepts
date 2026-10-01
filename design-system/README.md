# Warm Editorial — a tiny design system

A small, framework-free set of design tokens and components for **simple static websites**.
Distilled from the Provoke concepts site: a warm, friendly, editorial look with fluid
type, pill/card patterns, a click-to-zoom lightbox, and responsive tables.

No build step, no dependencies. Three files:

| File | What it is |
|------|-----------|
| `warm-editorial.css` | Tokens + components (the whole system) |
| `warm-editorial.js`  | Optional: reveal-on-scroll + zoom lightbox |
| `styleguide.html`    | Live reference / demo of everything |

## Use it

```html
<head>
  <!-- the type family the system is tuned for (optional but recommended) -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="warm-editorial.css">
</head>
<body>
  <section class="section"><div class="container stack">
    <h1 class="display">A headline</h1>
    <p class="lead">A short intro.</p>
    <div class="cluster">
      <span class="pill">Tag</span>
      <span class="pill pill--accent">Highlighted</span>
    </div>
  </div></section>

  <script src="warm-editorial.js" defer></script>
</body>
```

## Re-theme in one place

Components read **semantic tokens**, so override those (not the components) to re-skin:

```css
:root {
  --accent: #2F6FDB;      /* new brand accent */
  --accent-ink: #ffffff;  /* readable text on the accent */
  --bg: #ffffff;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

## Token reference

- **Color** — raw palette `--c-*`; roles `--bg`, `--surface`, `--surface-muted`, `--text`, `--text-muted`, `--border`, `--accent`, `--accent-ink`, `--link`.
- **Type** — `--font-sans`; fluid sizes `--fs-sm | base | lead | h3 | h2 | display`; weights `--fw-normal … --fw-black`.
- **Spacing** — `--space-1 … --space-8`; `--pad` (fluid section inline padding).
- **Radius** — `--r-sm | md | lg | pill`. **Elevation** — `--shadow-sm | md | lg`.
- **Layout/motion** — `--container` (940px), `--ease`, `--dur`.

## Components (class → purpose)

- Layout: `.section`, `.band`, `.container`, `.stack`, `.cluster`, `.grid` (`--cols`, `--cols-sm`), tints `.bg-cream|sand|gold|maroon|green|pink`.
- Type: `.display`, `.h2`, `.h3`, `.lead`, `.eyebrow`, `.muted`, `.accent-text`.
- Pills: `.pill`, `.pill--accent`, `.pill--check`.
- Buttons: `.btn`, `.btn--maroon`, `.btn--ghost`, `.btn--round`.
- Cards/blocks: `.card`, `.card--flat`; `.block` (+ `.block--square`, `.is-green|gray|maroon|pink|gold`).
- Bars: `.bar`, `.bars` (staggered cascade).
- Media: `.media`, `.media--zoom`; add `data-zoom` to an image for the lightbox (the JS makes it
  focusable, so it opens with Enter/Space as well as a click).
- Table: wrap a `.table` in `.table-scroll` for sideways scroll on narrow screens.
- Motion: add `data-reveal` to fade/slide elements in on scroll.

## Notes

- **No-JS safe.** The reveal effect only hides content once the JS marks `<html class="js">`,
  so a missing/blocked script never leaves content invisible.
- **Accessibility.** Honors `prefers-reduced-motion`. Zoomable images are keyboard-operable; the
  lightbox is a labelled dialog that keeps focus on its close button, closes on `Esc` / backdrop
  click, and returns focus to the image that opened it. Use `alt` text on images, a real heading
  outline (`.display`/`.h2`/`.h3` are styles — put them on `h1`–`h3`), and `scope="row"` on table
  row headers.
- **Fonts.** Tuned for Poppins but falls back to the system UI stack.
