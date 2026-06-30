type PageTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageTitle({ eyebrow, title, description }: PageTitleProps) {
  return (
    <div className="mb-8">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">{eyebrow}</p> : null}
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-base text-slate-600">{description}</p> : null}
    </div>
  );
}
