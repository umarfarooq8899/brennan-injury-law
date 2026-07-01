'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, HardHat, Footprints, Stethoscope, HeartCrack, Dog,
  ArrowRight, ChevronDown, Scale, TrendingUp, Users,
} from 'lucide-react';

import FadeIn from '../../components/animations/FadeIn';
import CountUp from '../../components/animations/CountUp';
import { StaggerContainer, StaggerItem } from '../../components/animations/StaggerContainer';
import MagneticButton from '../../components/animations/MagneticButton';

/* ── static data ─────────────────────────────────────────────── */

const files = [
  {
    code: 'MVA-001',
    icon: Car,
    title: 'Car & Truck Accidents',
    summary:
      'Rear-end collisions, intersection crashes, highway pile-ups, and rideshare incidents. We deal directly with insurers so you don\u2019t have to give a recorded statement alone.',
    handles: [
      'Passenger vehicle collisions',
      'Commercial truck accidents',
      'Rideshare & delivery driver crashes',
      'Hit-and-run claims',
    ],
    detail:
      'Auto collisions require immediate preservation of black-box data, witness statements, and dashcam footage. Insurance adjusters attempt to settle early — often for far less than the full medical, income, and future-care costs the injury entails. We act fast to secure evidence before it disappears.',
    recovery: 'Medical bills, future rehabilitation, lost wages, vehicle repair & diminished value.',
  },
  {
    code: 'WPI-014',
    icon: HardHat,
    title: 'Workplace Injury',
    summary:
      'When a workplace injury involves a third party — a subcontractor, equipment manufacturer, or property owner — you may have a claim beyond workers\u2019 comp.',
    handles: [
      'Construction site injuries',
      'Defective equipment & machinery',
      'Third-party negligence on job sites',
      'Repetitive strain claims',
    ],
    detail:
      'Workers\u2019 compensation covers basic medical costs, but rarely all of your lost future earnings or pain and suffering. If a third-party manufacturer, subcontractor, or property owner contributed to your injury, a separate civil claim may recover what workers\u2019 comp can\u2019t.',
    recovery: 'Full lost earnings, specialist treatment, permanent disability compensation.',
  },
  {
    code: 'SFL-027',
    icon: Footprints,
    title: 'Slip & Fall',
    summary:
      'Property owners have a legal duty to keep premises reasonably safe. We document the hazard before it gets cleaned up or repaired.',
    handles: [
      'Wet floors & spills',
      'Icy walkways & parking lots',
      'Broken stairs & handrails',
      'Inadequate lighting',
    ],
    detail:
      'The moment after a slip and fall, the property owner\u2019s first instinct is to fix the hazard and erase the evidence. We send investigators and a spoliation letter quickly to preserve photos, surveillance footage, maintenance logs, and witness accounts before they vanish.',
    recovery: 'Surgical costs, physical therapy, lost income, pain and suffering.',
  },
  {
    code: 'MED-009',
    icon: Stethoscope,
    title: 'Medical Malpractice',
    summary:
      'Misdiagnosis, surgical errors, and medication mistakes require an attorney willing to bring in qualified medical experts early.',
    handles: [
      'Diagnostic errors',
      'Surgical & anesthesia errors',
      'Medication & dosage mistakes',
      'Birth injury claims',
    ],
    detail:
      'Medical malpractice cases hinge on proving what a competent provider would have done differently. We work with a network of board-certified medical consultants who review records and identify deviations from the standard of care — a step many firms skip until trial is imminent.',
    recovery: 'Corrective procedures, long-term specialist care, loss of future earnings.',
  },
  {
    code: 'WD-003',
    icon: HeartCrack,
    title: 'Wrongful Death',
    summary:
      'When negligence causes a death, surviving family members may be entitled to compensation for loss of support, companionship, and funeral costs.',
    handles: [
      'Fatal traffic accidents',
      'Fatal workplace incidents',
      'Nursing home neglect',
      'Defective product deaths',
    ],
    detail:
      'Losing a family member to someone else\u2019s negligence is devastating on every level. We handle wrongful death cases with strict confidentiality and compassion, while pursuing the full measure of economic and non-economic damages available under state law.',
    recovery: 'Lost financial support, loss of consortium, funeral expenses, estate claims.',
  },
  {
    code: 'DOG-041',
    icon: Dog,
    title: 'Dog Bites & Animal Attacks',
    summary:
      'Owner liability rules vary by situation. We establish what the owner knew and whether local leash and containment laws were followed.',
    handles: [
      'Bite injuries & scarring',
      'Off-leash attacks',
      'Repeat-offender animals',
      'Delivery & utility worker attacks',
    ],
    detail:
      'Dog bite cases often turn on local ordinances, the owner\u2019s prior knowledge of the animal\u2019s aggression, and whether the victim was lawfully present. Scarring and psychological trauma can warrant significant damages beyond immediate medical costs.',
    recovery: 'Emergency treatment, reconstructive surgery, psychological counseling, scarring damages.',
  },
];

const stats = [
  { value: 1100, suffix: '+', label: 'Claims handled', icon: Users },
  { value: 42, prefix: '$', suffix: 'M+', label: 'Recovered for clients', icon: TrendingUp },
  { value: 15, suffix: ' yrs', label: 'Practice experience', icon: Scale },
];

/* ── component ───────────────────────────────────────────────── */

export default function PracticeAreas() {
  const [expanded, setExpanded] = useState(null);

  function toggle(code) {
    setExpanded((prev) => (prev === code ? null : code));
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <FadeIn delay={0}>
            <p className="eyebrow text-oxblood mb-3">File Index</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink max-w-2xl leading-tight">
              What we represent.
            </h1>
          </FadeIn>
          <FadeIn delay={0.22}>
            <p className="mt-5 text-ink/65 max-w-xl leading-relaxed">
              Six categories cover most of what comes through intake. If your situation doesn&rsquo;t
              fit neatly into one of these, call anyway &mdash; we&rsquo;ll tell you honestly if
              it&rsquo;s something we can take on.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats Ribbon ─────────────────────────────────────── */}
      <section className="border-b border-paper-line bg-paper-warm">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-paper-line">
            {stats.map(({ value, prefix = '', suffix, label, icon: Icon }, i) => (
              <FadeIn key={label} delay={i * 0.12} className="flex items-center gap-5 py-6 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
                <Icon size={22} className="text-ink/30 shrink-0" strokeWidth={1.4} />
                <div>
                  <p className="font-display text-3xl text-ink leading-none">
                    <CountUp target={value} prefix={prefix} suffix={suffix} duration={2} />
                  </p>
                  <p className="font-mono text-[0.65rem] uppercase tracking-wide text-ink/45 mt-1">
                    {label}
                  </p>
                </div>
              </FadeIn>
            ))}

          </div>
        </div>
      </section>

      {/* ── Cards Grid ───────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {files.map(({ code, icon: Icon, title, summary, handles, detail, recovery }) => (
            <StaggerItem key={code}>
              <div className="case-card flex flex-col h-full">
                {/* Card header */}
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <Icon size={28} className="text-ink" strokeWidth={1.5} />
                    </motion.div>
                    <span className="font-mono text-[0.68rem] text-ink/35 tracking-wide">
                      FILE {code}
                    </span>
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
                          <span className="text-ink/40 mt-1.5">&bull;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => toggle(code)}
                    className="mt-5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-ink/50 hover:text-ink transition-colors group"
                    aria-expanded={expanded === code}
                  >
                    <span>{expanded === code ? 'Hide details' : 'View details'}</span>
                    <motion.span
                      animate={{ rotate: expanded === code ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={13} />
                    </motion.span>
                  </button>
                </div>

                {/* Expandable detail drawer */}
                <AnimatePresence initial={false}>
                  {expanded === code && (
                    <motion.div
                      key="drawer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-paper-line mx-7 md:mx-8" />
                      <div className="px-7 md:px-8 py-6 bg-paper-warm space-y-4">
                        <p className="text-sm text-ink/70 leading-relaxed">{detail}</p>
                        <div>
                          <p className="font-mono text-[0.65rem] uppercase tracking-wide text-ink/40 mb-1.5">
                            Typical recovery includes
                          </p>
                          <p className="text-sm text-ink/65">{recovery}</p>
                        </div>
                        <Link
                          href={`/contact?type=${encodeURIComponent(title)}`}
                          className="inline-flex items-center gap-2 text-xs font-medium bg-ink text-paper px-5 py-2.5 tab-notch hover:bg-ink-soft transition-colors mt-2"
                        >
                          Start Free Review <ArrowRight size={13} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="bg-ink text-paper py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <FadeIn direction="right" className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="pulse-dot" style={{ background: '#d4a853' }} />
              <p className="font-mono text-[0.65rem] uppercase tracking-wide text-paper/50">
                Free consultations · No fee unless we win
              </p>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-paper mb-2">
              Not sure which file fits?
            </h2>
            <p className="text-paper/60 max-w-md leading-relaxed text-sm">
              Describe what happened and we&rsquo;ll tell you, free of charge, whether it&rsquo;s
              worth pursuing.
            </p>
          </FadeIn>
          <MagneticButton>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-paper text-ink hover:bg-paper-warm px-7 py-4 font-medium transition-colors tab-notch"
            >
              Start Free Review <ArrowRight size={16} />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
