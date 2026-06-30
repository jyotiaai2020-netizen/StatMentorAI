import AppShell from "@/components/AppShell";
import PageTitle from "@/components/PageTitle";
import StatCard from "@/components/StatCard";
import ReportCard from "@/components/ReportCard";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageTitle eyebrow="Dashboard" title="Enterprise statistics command center" description="Monitor organization activity, report generation, and mentoring operations from one polished SaaS workspace." />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active organizations" value="12" helper="Connected to FastAPI organization workflows" />
        <StatCard label="Reports generated" value="248" helper="Monthly statistical report volume" />
        <StatCard label="Mentor response SLA" value="98%" helper="Requests handled within target window" />
      </section>
      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <ReportCard report={{ title: "Outcome Analysis", status: "Ready", summary: "Latest generated report is ready for review by the analytics team." }} />
        <ReportCard report={{ title: "Cohort Variance Review", status: "Draft", summary: "A working report template for upcoming mentoring sessions." }} />
      </section>
    </AppShell>
  );
}
