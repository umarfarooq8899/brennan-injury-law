import Link from 'next/link';
import { Car, HardHat, Footprints, Stethoscope, HeartCrack, Dog, ArrowRight } from 'lucide-react';

const files = [
  {
    code: 'MVA-001',
    icon: Car,
    title: 'Car & Truck Accidents',
    summary:
      'Rear-end collisions, intersection crashes, highway pile-ups, and rideshare incidents. We deal directly with insurers so you don\u2019t have to give a recorded statement alone.',
    handles: ['Passenger vehicle collisions', 'Commercial truck accidents', 'Rideshare & delivery driver crashes', 'Hit-and-run claims'],
  },
  {
    code: 'WPI-014',
    icon: HardHat,
    title: 'Workplace Injury',
    summary:
      'When a workplace injury involves a third party \u2014 a subcontractor, equipment manufacturer, or property owner \u2014 you may have a claim beyond workers\u2019 comp.',
    handles: ['Construction site injuries', 'Defective equipment & machinery', 'Third-party negligence on job sites', 'Repetitive strain claims'],
  },
  {
    code: 'SFL-027',
    icon: Footprints,
    title: 'Slip & Fall',
    summary:
      'Property owners have a legal duty to keep premises reasonably safe. We document the hazard before it gets cleaned up or repaired.',
    handles: ['Wet floors & spills', 'Icy walkways & parking lots', 'Broken stairs & handrails', 'Inadequate lighting'],
  },
  {
    code: 'MED-009',
    icon: Stethoscope,
    title: 'Medical Malpractice',
    summary:
      'Misdiagnosis, surgical errors, and medication mistakes require an attorney willing to bring in qualified medical experts early.',
    handles: ['Diagnostic errors', 'Surgical & anesthesia errors', 'Medication & dosage mistakes', 'Birth injury claims'],
  },
  {
    code: 'WD-003',
    icon: HeartCrack,
    title: 'Wrongful Death',
    summary:
      'When negligence causes a death, surviving family members may be entitled to compensation for loss of support, companionship, and funeral costs.',
    handles: ['Fatal traffic accidents', 'Fatal workplace incidents', 'Nursing home neglect', 'Defective product deaths'],
  },
  {
    code: 'DOG-041',
    icon: Dog,
    title: 'Dog Bites & Animal Attacks',
    summary:
      'Owner liability rules vary by situation. We establish what the owner knew and whether local leash and containment laws were followed.',
    handles: ['Bite injuries & scarring', 'Off-leash attacks', 'Repeat-offender animals', 'Delivery & utility worker attacks'],
  },
];

export default function PracticeAreas() {
  return (
    <>
      <section className="border-b border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <p className="eyebrow text-oxblood mb-3">File Index</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
            What we represent.
          </h1>
          <p className="mt-5 text-ink/65 max-w-xl leading-relaxed">
            Six categories cover most of what comes through intake. If your situation doesn&rsquo;t fit
            neatly into one of these, call anyway — we&rsquo;ll tell you honestly if it&rsquo;s something
            we can take on.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {files.map(({ code, icon: Icon, title, summary, handles }) => (
            <div key={code} className="case-card p-7 md:p-8 flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <Icon size={28} className="text-oxblood" strokeWidth={1.6} />
                <span className="font-mono text-[0.68rem] text-ink/40 tracking-wide">FILE {code}</span>
              </div>
              <h2 className="font-display text-2xl text-ink mb-3">{title}</h2>
              <p className="text-sm text-ink/65 leading-relaxed mb-5">{summary}</p>

              <div className="thread-line pt-4 mt-auto">
                <p className="font-mono text-[0.65rem] uppercase tracking-wide text-ink/40 mb-2.5">
                  Common scenarios
                </p>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-ink/70">
                  {handles.map((h) => (
                    <li key={h} className="flex items-start gap-1.5">
                      <span className="text-oxblood/60 mt-1.5">&bull;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dark border-t border-paper-line py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-ink">Not sure which file fits?</h2>
            <p className="text-ink/65 mt-2 max-w-md leading-relaxed">
              Describe what happened and we&rsquo;ll tell you, free of charge, whether it&rsquo;s worth
              pursuing.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-oxblood hover:bg-oxblood-dark text-paper px-6 py-3.5 font-medium transition-colors tab-notch"
          >
            Start Free Review <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
