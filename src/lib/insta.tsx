/**
 * Renders parts of a string, turning any @handle into an Instagram link.
 */
export function renderWithInstaLinks(text: string) {
  const parts = text.split(/(@[A-Za-z0-9._]+)/g);
  return parts.map((p, i) => {
    if (/^@[A-Za-z0-9._]+/.test(p)) {
      const handle = p.slice(1);
      return (
        <a
          key={i}
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-dotted underline-offset-4 hover:text-neon-pink transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {p}
        </a>
      );
    }
    return <span key={i}>{p}</span>;
  });
}
