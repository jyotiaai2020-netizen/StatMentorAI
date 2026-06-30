export type Report = { id?: string | number; title: string; status?: string; summary?: string; created_at?: string };

export default function ReportCard({ report }: { report: Report }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-950">{report.title}</h2>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{report.status ?? "Generated"}</span>
      </div>
      <p className="mt-3 text-sm text-slate-600">{report.summary ?? "AI-assisted statistical report generated from your latest parameters."}</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{report.created_at ?? "Just now"}</p>
    </article>
  );
}
