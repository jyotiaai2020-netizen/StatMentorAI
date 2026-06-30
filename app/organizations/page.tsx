"use client";

import { FormEvent, useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import OrganizationCard, { Organization } from "@/components/OrganizationCard";
import PageTitle from "@/components/PageTitle";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadOrganizations(showLoading = true) {
    if (showLoading) setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/organizations/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("statmentor_token") ?? ""}` },
      });
      if (!response.ok) throw new Error("Unable to load organizations.");
      const data = (await response.json()) as Organization[];
      setOrganizations(Array.isArray(data) ? data : []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected organization error.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadOrganizations(false);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/organizations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("statmentor_token") ?? ""}` },
        body: JSON.stringify({ name, industry }),
      });
      if (!response.ok) throw new Error("Unable to create organization.");
      setName("");
      setIndustry("");
      await loadOrganizations();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected save error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell>
      <PageTitle eyebrow="Organizations" title="Manage customer workspaces" description="Create and view organizations from the FastAPI backend." />
      <form onSubmit={handleCreate} className="mb-8 grid gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_1fr_auto]">
        <input value={name} onChange={(event) => setName(event.target.value)} required placeholder="Organization name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
        <input value={industry} onChange={(event) => setIndustry(event.target.value)} placeholder="Industry" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" />
        <button disabled={saving} className="rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-60">{saving ? "Creating..." : "Create"}</button>
      </form>
      {loading ? <p className="text-slate-600">Loading organizations...</p> : null}
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      {!loading && !error ? <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{organizations.length ? organizations.map((organization, index) => <OrganizationCard key={organization.id ?? index} organization={organization} />) : <p className="text-slate-600">No organizations yet.</p>}</section> : null}
    </AppShell>
  );
}
