import { Scale, GraduationCap, Award, Landmark, Users } from 'lucide-react';

const credentials = [
  { icon: GraduationCap, label: 'J.D., Rivermont State University School of Law, 2009' },
  { icon: Landmark, label: 'Licensed: State Bar, U.S. District Court (Eastern District)' },
  { icon: Award, label: 'Member, American Association for Justice' },
  { icon: Users, label: '1,100+ injury claims handled since founding the firm in 2011' },
];

const values = [
  {
    title: 'You talk to a person, not a call center',
    body: 'Every client gets a direct line to the paralegal and attorney on their file. No outsourced intake desk.',
  },
  {
    title: 'We tell you the truth about your case',
    body: 'Not every accident is worth a lawsuit. If yours isn\u2019t, we\u2019ll tell you in the first conversation, free of charge.',
  },
  {
    title: 'We front the costs',
    body: 'Filing fees, expert witnesses, record requests \u2014 we cover it. You repay those costs only out of a settlement or verdict.',
  },
];

export default function About() {
  return (
    <>
      <section className="border-b border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <p className="eyebrow text-oxblood mb-3">Personnel File</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
            One attorney. One caseload. No hand-offs.
          </h1>
          <p className="mt-5 text-ink/65 max-w-xl leading-relaxed">
            Brennan Injury Law is a small practice by design — small enough that Marcus Brennan
            personally reviews every file that comes through the door.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-16">
          {/* "ID card" panel instead of a stock headshot */}
          <div className="case-card p-7">
            <div className="w-24 h-24 rounded-full bg-ink text-paper flex items-center justify-center font-display text-3xl mb-5">
              MB
            </div>
            <h2 className="font-display text-2xl text-ink">Marcus Brennan</h2>
            <p className="font-mono text-xs uppercase tracking-wide text-oxblood mt-1 mb-6">
              Founding Attorney
            </p>

            <div className="thread-line pt-5 space-y-4">
              {credentials.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={16} className="text-ink/40 mt-0.5 shrink-0" />
                  <span className="text-xs text-ink/65 leading-relaxed">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl text-ink mb-4">Why I started this firm</h3>
            <div className="space-y-4 text-ink/70 leading-relaxed max-w-2xl">
              <p>
                Before opening this practice, I spent six years defending insurance companies. I saw
                how claims got minimized from the inside — the adjuster scripts, the lowball first
                offers, the slow-walking on records requests.
              </p>
              <p>
                I started Brennan Injury Law in 2011 to sit on the other side of that table. We keep
                the caseload deliberately small so that no client becomes a file number to anyone but
                the insurance company.
              </p>
            </div>

            <h3 className="font-display text-2xl text-ink mt-12 mb-6">How we work</h3>
            <div className="space-y-7">
              {values.map((v, i) => (
                <div key={v.title} className="flex gap-5">
                  <span className="font-mono text-sm text-oxblood/50 mt-1">0{i + 1}</span>
                  <div>
                    <h4 className="font-display text-lg text-ink mb-1.5">{v.title}</h4>
                    <p className="text-sm text-ink/65 leading-relaxed">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <Scale size={28} className="text-oxblood-light shrink-0" />
            <p className="font-display text-xl md:text-2xl max-w-md">
              Free, no-obligation case reviews — every conversation stays confidential.
            </p>
          </div>
          <a
            href="/contact"
            className="shrink-0 inline-flex items-center bg-oxblood hover:bg-oxblood-dark text-paper px-6 py-3.5 font-medium transition-colors tab-notch"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
