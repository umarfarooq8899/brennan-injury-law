import Link from 'next/link';
import Stamp from '../components/Stamp';
import {
  ArrowRight,
  Phone,
  Car,
  HardHat,
  Footprints,
  Stethoscope,
  ShieldAlert,
  Quote,
} from 'lucide-react';

const today = new Date();
const caseNumber = `${today.getFullYear()}-PI${String(today.getMonth() + 1).padStart(2, '0')}${String(
  today.getDate()
).padStart(2, '0')}`;
const filedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const process = [
  {
    n: '01',
    title: 'Free case review',
    body: 'Call or submit the intake form. We listen to what happened and tell you honestly whether you have a claim worth pursuing — within one business day.',
  },
  {
    n: '02',
    title: 'We investigate',
    body: 'We pull police reports, medical records, and witness statements, and deal with insurance adjusters so you can focus on recovering.',
  },
  {
    n: '03',
    title: 'We negotiate',
    body: 'Most claims settle before trial. We build the file to make the strongest possible demand — and we tell you exactly where things stand.',
  },
  {
    n: '04',
    title: 'You get paid',
    body: 'If we settle or win at trial, you receive your share before we take a fee. If we don\u2019t recover anything, you owe us nothing.',
  },
];

const areas = [
  { icon: Car, title: 'Car & Truck Accidents', blurb: 'Rear-end collisions, highway crashes, rideshare incidents.' },
  { icon: HardHat, title: 'Workplace Injury', blurb: 'On-the-job injuries, third-party claims beyond workers\u2019 comp.' },
  { icon: Footprints, title: 'Slip & Fall', blurb: 'Unsafe property conditions in stores, sidewalks, and stairwells.' },
  { icon: Stethoscope, title: 'Medical Malpractice', blurb: 'Misdiagnosis, surgical errors, and medication mistakes.' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-16 md:pb-24">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs text-ink/50 mb-7">
                <span>CASE NO. {caseNumber}</span>
                <span className="hidden sm:inline">·</span>
                <span>FILED: {filedDate}</span>
                <span className="hidden sm:inline">·</span>
                <span>STATUS: OPEN INTAKE</span>
              </div>

              <h1 className="font-display text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.02] tracking-tight text-ink">
                Hurt in an accident?
                <br />
                <span className="italic text-oxblood">We file. We fight.</span>
                <br />
                You recover.
              </h1>

              <p className="mt-7 text-lg text-ink/70 max-w-lg leading-relaxed">
                Brennan Injury Law has represented injured people across Rivermont for over a decade.
                One call starts your case file — and you don&rsquo;t pay us a dollar unless we win.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-oxblood hover:bg-oxblood-dark text-paper px-7 py-4 font-medium transition-colors tab-notch"
                >
                  File Your Claim
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+15551234357"
                  className="inline-flex items-center gap-2 px-7 py-4 font-medium text-ink border border-ink/20 hover:border-oxblood hover:text-oxblood transition-colors"
                >
                  <Phone size={17} />
                  (555) 123-HURT
                </a>
              </div>
            </div>

            <div className="hidden md:flex justify-end pt-4">
              <Stamp size={156}>
                No Fee
                <br />
                Unless
                <br />
                We Win
              </Stamp>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-paper-line bg-paper-dark/60">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ['$42M+', 'recovered for clients'],
              ['1,100+', 'cases handled'],
              ['14 yrs', 'serving Rivermont'],
              ['24/7', 'phones answered'],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="font-display text-2xl md:text-3xl text-ink">{stat}</div>
                <div className="font-mono text-[0.68rem] uppercase tracking-wide text-ink/50 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <p className="eyebrow text-oxblood mb-3">How a claim moves</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink max-w-xl">
          Four stages, start to finish.
        </h2>
        <p className="mt-4 text-ink/65 max-w-lg leading-relaxed">
          This is the actual sequence your case file follows — not a sales pitch. Most clients hear
          from us at every stage without having to ask.
        </p>

        <div className="mt-14 grid md:grid-cols-4 gap-px bg-paper-line">
          {process.map((step, i) => (
            <div key={step.n} className="bg-paper p-7 md:p-6">
              <div className="font-display text-4xl text-oxblood/30 mb-4">{step.n}</div>
              <h3 className="font-display text-xl text-ink mb-2">{step.title}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRACTICE AREAS TEASER */}
      <section className="bg-ink text-paper py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow text-oxblood-light mb-3">What we handle</p>
              <h2 className="font-display text-3xl md:text-4xl">Cases we take on.</h2>
            </div>
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-1.5 text-sm font-mono text-paper/70 hover:text-paper border-b border-paper/30 hover:border-paper pb-1"
            >
              VIEW ALL PRACTICE AREAS <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {areas.map(({ icon: Icon, title, blurb }) => (
              <div key={title} className="border border-paper/15 p-6 hover:border-oxblood-light/60 transition-colors">
                <Icon size={26} className="text-oxblood-light mb-4" strokeWidth={1.6} />
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-sm text-paper/60 leading-relaxed">{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <Quote size={32} className="text-oxblood/40 mb-6" />
          <p className="font-display text-2xl md:text-3xl text-ink leading-snug">
            &ldquo;After my accident I didn&rsquo;t know where to start. Brennan&rsquo;s office handled the
            insurance company so I could focus on physical therapy. They called with updates before I
            had to ask.&rdquo;
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/50">
            Former client, car accident claim &mdash; result reflects this client&rsquo;s specific facts and
            does not guarantee a similar outcome.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <ShieldAlert size={32} className="text-oxblood mt-1 shrink-0" />
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-ink">
                Most injury claims have a filing deadline.
              </h2>
              <p className="text-ink/65 mt-2 max-w-md leading-relaxed">
                The statute of limitations doesn&rsquo;t wait. The sooner your case file opens, the more
                evidence we can preserve.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-oxblood hover:bg-oxblood-dark text-paper px-7 py-4 font-medium transition-colors tab-notch"
          >
            Start My Free Review <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
