"use client";

import { FormEvent, useState } from "react";
import AppShell from "@/components/AppShell";
import PageTitle from "@/components/PageTitle";
import ReportCard, { Report } from "@/components/ReportCard";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function ReportsPage() {
  const [title, setTitle] = useState("Statistical Mentoring Report");
  const [prompt, setPrompt] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/reports/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("statmentor_token") ?? ""}` },
        body: JSON.stringify({ title, prompt }),
      });
      const data = (await response.json()) as Partial<Report> & { detail?: string };
      if (!response.ok) throw new Error(data.detail ?? "Unable to generate report.");
      setReport({ title: data.title ?? title, status: data.status ?? "Generated", summary: data.summary ?? prompt, created_at: data.created_at });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected report error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <PageTitle eyebrow="Reports" title="Generate statistical reports" description="Submit report criteria to the FastAPI report generation endpoint and review the result." />
      <form onSubmit={handleGenerate} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block text-sm font-semibold text-slate-700" htmlFor="title">Report title</label>
        <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
        <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="prompt">Report prompt</label>
        <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} required rows={5} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Describe the dataset, analysis goal, and reporting audience." />
        {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        <button disabled={loading} className="mt-5 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-60">{loading ? "Generating..." : "Generate report"}</button>
      </form>
      {report ? <section className="mt-8"><ReportCard report={report} /></section> : null}
    </AppShell>
  );
}
