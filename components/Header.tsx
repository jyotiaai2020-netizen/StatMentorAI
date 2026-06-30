import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-slate-950 lg:hidden">Lotus & Dorje</Link>
        <div className="hidden text-sm text-slate-500 lg:block">Enterprise analytics workspace</div>
        <div className="flex items-center gap-3">
          <Link href="/organizations" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Organizations</Link>
          <Link href="/login" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Sign in</Link>
        </div>
      </div>
    </header>
  );
}
