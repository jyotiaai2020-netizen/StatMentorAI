import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Organizations", href: "/organizations" },
  { name: "Reports", href: "/reports" },
  { name: "Login", href: "/login" },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white px-6 py-8 shadow-sm lg:block">
      <Link href="/" className="block">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Lotus & Dorje</div>
        <div className="mt-2 text-2xl font-bold text-slate-950">StatMentorAI</div>
      </Link>
      <nav className="mt-10 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
