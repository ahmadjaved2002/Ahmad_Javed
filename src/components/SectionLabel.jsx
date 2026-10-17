export default function SectionLabel({ number, label, className = '', ...rest }) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-mute ${className}`}
      {...rest}
    >
      <span className="text-lime">{number}</span>
      <span className="h-px w-10 bg-line" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
