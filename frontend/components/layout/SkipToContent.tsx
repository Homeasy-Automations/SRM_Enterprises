/** Keyboard users land here first: jumps straight past the navigation to the page content. */
export function SkipToContent(): JSX.Element {
  return (
    <a
      href="#main-content"
      className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast shadow-lift focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
    >
      Skip to main content
    </a>
  );
}
