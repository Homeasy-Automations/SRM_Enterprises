interface JsonLdProps {
  /** Structured data object(s) emitted as application/ld+json. */
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

/** Renders JSON-LD structured data. Values are serialised safely, never interpolated raw. */
export function JsonLd({ data, id }: JsonLdProps): JSX.Element {
  return (
    <script
      type="application/ld+json"
      id={id}
      // JSON.stringify output is escaped for the closing-script edge case below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
