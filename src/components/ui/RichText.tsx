export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[var(--color-mist-400)] leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}
