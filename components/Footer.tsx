export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-4 py-6 text-sm text-slate-500 lg:px-8">
      © {new Date().getFullYear()} Lotus & Dorje. Built for secure statistical mentoring workflows.
    </footer>
  );
}
