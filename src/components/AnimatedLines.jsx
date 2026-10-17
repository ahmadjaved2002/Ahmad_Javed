/**
 * Renders a heading as masked lines that GSAP can reveal.
 * Each line is aria-hidden; the heading itself carries an aria-label with the full text,
 * so screen readers read one clean sentence.
 *
 * lines: array of strings or { text, className }
 */
export default function AnimatedLines({ lines, as: Tag = 'h2', className = '', ...rest }) {
  const label = lines.map((line) => (typeof line === 'string' ? line : line.text)).join(' ');
  return (
    <Tag className={className} {...rest}>
      <span className="sr-only">{label}</span>
      {lines.map((line, i) => {
        const text = typeof line === 'string' ? line : line.text;
        const extra = typeof line === 'string' ? '' : line.className || '';
        return (
          <span key={`${text}-${i}`} className="line-mask" aria-hidden="true">
            <span className={`line-inner block ${extra}`}>{text}</span>
          </span>
        );
      })}
    </Tag>
  );
}
