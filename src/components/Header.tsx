import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 rounded-xl gradient-kenya grid place-items-center shadow-soft">
            <span className="text-white font-bold text-lg">C</span>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-kenya-red border-2 border-background" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight">Cleanshelf</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Careers Kenya</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a href="#positions" className="text-muted-foreground hover:text-foreground transition">Open Roles</a>
          <a href="#benefits" className="text-muted-foreground hover:text-foreground transition">Benefits</a>
          <a href="#process" className="text-muted-foreground hover:text-foreground transition">Process</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition">Contact</a>
        </nav>
        <a href="#positions" className="hidden sm:inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold bg-foreground text-background hover:opacity-90 transition">
          Apply Now
        </a>
      </div>
    </header>
  );
}
