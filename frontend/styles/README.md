# styles/

Tailwind is configured in `tailwind.config.ts` and the design tokens live in
`app/globals.css` (Tailwind requires the stylesheet to sit inside `app/`).

Keep it that way: `app/globals.css` is the single source of truth for:

- CSS variables (`--accent`, `--accent-soft`, `--accent-contrast`, `--navy`, …)
- Color Mood palettes (`html[data-mood="…"]`)
- Category accent scopes (`[data-category="…"]`)
- Component classes (`.btn-primary`, `.surface-card`, `.container-page`, …)
- The `prefers-reduced-motion` overrides

If you split styles later, import the partials from `app/globals.css` so Next.js still
emits one optimised stylesheet.
