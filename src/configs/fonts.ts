/**
 * List of available font names (visit the url `/settings/appearance`).
 * This array is used to generate dynamic font classes (e.g., `font-inter`, `font-manrope`).
 *
 * 📝 How to Add a New Font (Tailwind v4+):
 * 1. Add the font name here.
 * 2. Update the `links` array in `src/routes/__root.tsx` to include the new font from Google Fonts (or any other source).
 * 3. Add the new font family to `src/styles/styles.css` using `@theme inline` and `font-family` CSS variable.
 *
 * Example:
 * fonts.ts           → Add 'roboto' to this array.
 * __root.tsx         → Add Google Fonts link in the `head()` function's `links` array.
 * styles.css         → Add the new font in the CSS, e.g.:
 *   @theme inline {
 *      // ... other font families
 *      --font-roboto: 'Roboto', var(--font-sans);
 *   }
 */
export const fonts = ["inter", "manrope", "system"] as const;
