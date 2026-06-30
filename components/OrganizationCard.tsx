export type Organization = { id?: string | number; name: string; industry?: string; description?: string };

export default function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-700">
        {organization.name.charAt(0).toUpperCase()}
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">{organization.name}</h2>
      <p className="mt-2 text-sm font-medium text-indigo-700">{organization.industry ?? "Enterprise"}</p>
      <p className="mt-3 text-sm text-slate-600">{organization.description ?? "Organization workspace ready for reports and collaboration."}</p>
    </article>
  );
}
