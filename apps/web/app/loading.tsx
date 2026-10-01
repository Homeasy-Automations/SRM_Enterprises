/** Route-level loading UI — a light, on-brand skeleton while a page's data/JS arrives. */
export default function Loading(): JSX.Element {
  return (
    <div className="container-page section-pad" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page…</span>
      <div className="flex flex-col gap-6">
        <div className="h-8 w-40 animate-pulse rounded-full bg-accent-soft" />
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-navy/5" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-navy/5" />
        <div className="h-5 w-3/4 max-w-lg animate-pulse rounded-full bg-navy/5" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((key) => (
            <div key={key} className="h-52 animate-pulse rounded-[26px] border border-navy/10 bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
