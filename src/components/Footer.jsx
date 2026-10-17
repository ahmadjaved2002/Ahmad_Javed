import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line px-gutter py-8">
      <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.16em] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, Vite, Tailwind CSS and GSAP</p>
      </div>
    </footer>
  );
}
