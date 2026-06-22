'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Stamp from '../components/Stamp';
import {
  ArrowRight, Phone, Car, HardHat, Footprints, Stethoscope,
  ShieldAlert, Quote, Check, FileText, AlertTriangle, Scale,
  Star, Award, ChevronRight, TrendingUp, Clock, Shield,
} from 'lucide-react';

/* ── static data ────────────────────────────────────────────── */

const today      = new Date();
const caseNumber = `${today.getFullYear()}-PI${String(today.getMonth()+1).padStart(2,'0')}${String(today.getDate()).padStart(2,'0')}`;
const filedDate  = today.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

const practiceAreas = [
  {
    icon: Car,
    title: 'Car & Truck Accidents',
    blurb: 'Rear-end collisions, highway crashes, rideshare incidents.',
    image: '/images/car_accident.png',
    details: 'Auto collisions require immediate preservation of black-box data, witness statements, and dashcam footage. Insurance adjusters attempt to settle early for far less than you deserve.',
    dos: ['Photograph all vehicles, road signs & skid marks','Collect eyewitness contact information','Seek a doctor within 72 hours — even if you feel fine'],
    recovery: 'Medical bills, future rehabilitation, lost wages, vehicle repair & diminished value.',
  },
  {
    icon: HardHat,
    title: 'Workplace Injury',
    blurb: "On-the-job injuries, third-party claims beyond workers' comp.",
    image: '/images/workplace_injury.png',
    details: "If a subcontractor, equipment manufacturer, or third-party driver caused your workplace injury, you may pursue a separate civil claim in addition to standard workers' compensation.",
    dos: ['Report injury in writing to a supervisor immediately','Identify any third-party machinery or vehicles involved','Document unsafe site conditions with photos'],
    recovery: 'Full lost earnings, specialist treatment, permanent disability compensation.',
  },
  {
    icon: Footprints,
    title: 'Slip & Fall',
    blurb: 'Unsafe property conditions in stores, sidewalks, and stairwells.',
    image: '/images/slip_fall.png',
    details: 'Property owners are legally required to maintain safe premises. When they fail to address known hazards — spills, ice, broken stairs — they may be held liable for your injuries.',
    dos: ['Report the fall to the manager and get a written incident report',"Photograph the exact hazard before it's cleaned up",'Preserve the footwear you wore as physical evidence'],
    recovery: 'Surgical costs, physical therapy, lost income, pain and suffering.',
  },
  {
    icon: Stethoscope,
    title: 'Medical Malpractice',
    blurb: 'Misdiagnosis, surgical errors, and medication mistakes.',
    image: '/images/lawyer_hero.png',
    details: 'Medical errors are among the leading causes of serious injury. Our expert medical advisory board reviews every file to identify deviations from the standard of care.',
    dos: ['Request complete copies of your medical records','Keep a daily symptom journal with photos','Avoid discussing your case on social media'],
    recovery: 'Corrective procedures, long-term specialist care, loss of future earnings.',
  },
];

const caseResults = [
  { type: 'Auto Collision — Spinal Injury',    verdict: 'Settlement',  amount: '$3,200,000', year: 2024 },
  { type: 'Workplace Fall — Fractures',        verdict: 'Jury Verdict', amount: '$1,875,000', year: 2024 },
  { type: 'Truck Accident — Traumatic Brain',  verdict: 'Settlement',  amount: '$2,650,000', year: 2023 },
  { type: 'Slip & Fall — Knee Replacement',    verdict: 'Settlement',  amount: '$940,000',   year: 2023 },
  { type: 'Medical Malpractice — Misdiagnosis',verdict: 'Settlement',  amount: '$1,400,000', year: 2022 },
  { type: 'Rideshare Collision — Neck Surgery',verdict: 'Jury Verdict', amount: '$820,000',   year: 2022 },
];

const attorneys = [
  {
    name:   'John R. Brennan',
    title:  'Founding Partner',
    bar:    'Rivermont Bar · Admitted 2009',
    bio:    'John has spent 15 years exclusively representing injured people. A former insurance-defense attorney, he knows every tactic adjusters use — and how to counter them. He has taken over 40 cases to jury verdict.',
    image:  '/images/lawyer_hero.png',
    stats:  [['$42M+','recovered'],['40+ trials','to verdict'],['15 yrs','experience']],
    rating: 5,
  },
  {
    name:   'Sarah M. Jenkins',
    title:  'Senior Trial Counsel',
    bar:    'Rivermont Bar · Admitted 2015',
    bio:    'Sarah leads our medical malpractice and workplace injury practices. A biology graduate turned litigator, she excels at distilling complex medical evidence for judges and juries alike.',
    image:  '/images/lawyer_counsel.png',
    stats:  [['$18M+','recovered'],['20+ trials','to verdict'],['9 yrs','experience']],
    rating: 5,
  },
];

const processSteps = [
  { n:'01', icon: Phone,       title:'Free Case Review',   body:'Call or submit the intake form. We respond honestly — within one business day.' },
  { n:'02', icon: FileText,    title:'We Investigate',     body:'Police reports, medical records, expert witnesses. We handle everything.' },
  { n:'03', icon: TrendingUp,  title:'We Negotiate',       body:'We build the strongest demand and fight to maximize your recovery.' },
  { n:'04', icon: Shield,      title:'You Get Paid',        body:'You receive your share first. If we recover nothing, you owe us nothing.' },
];

/* ── component ──────────────────────────────────────────────── */

export default function Home() {
  const [expandedArea, setExpandedArea] = useState(0);
  const [activeHeroTab, setActiveHeroTab] = useState('overview');
  const [checklist, setChecklist] = useState([
    { id:1, text:'Seek immediate medical evaluation',                 done:true  },
    { id:2, text:'Obtain a copy of the official accident report',     done:false },
    { id:3, text:'Photograph injuries and the scene',                  done:true  },
    { id:4, text:'Open an insurance claim (do NOT sign any waivers)', done:false },
    { id:5, text:'Consult legal counsel before giving statements',    done:false },
  ]);
  const [daysElapsed, setDaysElapsed] = useState(90);
  const daysLeft      = Math.max(0, 1095 - daysElapsed);
  const pctElapsed    = Math.min(100, ((daysElapsed / 1095) * 100).toFixed(1));
  const toggleItem    = (id) => setChecklist(c => c.map(i => i.id===id ? {...i,done:!i.done} : i));

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-paper-line">
        {/* warm gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9F5EE] via-[#F2EEE4] to-[#EDE5D8] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">

            {/* ── left copy ── */}
            <div className="pb-16 md:pb-20 animate-fadeInUp">
              {/* case badge */}
              <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-ink/50 bg-white/60 border border-paper-line px-3.5 py-2 rounded mb-8 shadow-sm">
                <span className="flex items-center gap-1.5 text-oxblood font-bold">
                  <FileText size={12}/> CASE NO. {caseNumber}
                </span>
                <span className="hidden sm:block text-ink/20">|</span>
                <span>FILED: {filedDate}</span>
                <span className="hidden sm:block text-ink/20">|</span>
                <span className="text-emerald-700 font-semibold">● ACCEPTING CLIENTS</span>
              </div>

              <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-[4.2rem] leading-[1.04] tracking-tight text-ink">
                Injured?<br/>
                <span className="italic text-oxblood">We fight hard.</span><br/>
                You focus on healing.
              </h1>

              <p className="mt-7 text-[1.05rem] text-ink/70 max-w-[500px] leading-relaxed">
                For over 14 years Brennan Injury Law has recovered more than&nbsp;
                <strong className="text-ink">$42 million</strong> for people hurt through no fault of their own.
                One call opens your case file — and you pay us <em>nothing</em> unless we win.
              </p>

              {/* trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: Award,  text: 'Top 100 Trial Attorneys'   },
                  { icon: Star,   text: '5-Star Client Rating'       },
                  { icon: Shield, text: 'No Fee Unless We Win'       },
                ].map(({icon:Icon, text}) => (
                  <span key={text} className="inline-flex items-center gap-2 bg-white/80 border border-paper-line px-3.5 py-2 text-xs font-mono text-ink/70 rounded shadow-sm">
                    <Icon size={13} className="text-oxblood"/>{text}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/contact"
                  className="group inline-flex items-center gap-2.5 bg-oxblood hover:bg-oxblood-dark text-paper px-8 py-4 font-semibold transition-all shadow-md hover:shadow-lg tab-notch text-base">
                  Get a Free Case Review
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <a href="tel:+15551234357"
                  className="inline-flex items-center gap-2.5 bg-white/80 border border-ink/20 hover:border-oxblood hover:text-oxblood px-8 py-4 font-semibold text-ink transition-all shadow-sm text-base">
                  <Phone size={17}/>(555) 123-HURT
                </a>
              </div>
            </div>

            {/* ── right: attorney photo pinned to folder ── */}
            <div className="hidden lg:flex justify-center items-end animate-fadeInUp animate-fadeInUp-delay-2">
              <div className="relative">
                {/* stacked file backing */}
                <div className="absolute bottom-0 left-4 right-4 h-[92%] bg-paper-dark border border-paper-line rotate-2 rounded-t-sm shadow" />
                <div className="absolute bottom-0 left-2 right-2 h-[94%] bg-[#EDE8DC] border border-paper-line -rotate-1 rounded-t-sm shadow" />

                {/* main folder face */}
                <div className="relative bg-[#FAF8F3] border border-paper-line rounded-t-sm shadow-xl overflow-hidden w-[380px]">
                  {/* folder tab strip */}
                  <div className="bg-oxblood px-6 py-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-paper/80 uppercase tracking-widest">Client Intake · Case File</span>
                    <Stamp size={52} className="text-paper/90">No Fee</Stamp>
                  </div>

                  {/* attorney photo inside the folder */}
                  <div className="relative px-6 pt-5 pb-2">
                    <div className="photo-pinned photo-polaroid mx-auto max-w-[260px]">
                      <Image
                        src="/images/lawyer_hero.png"
                        alt="John R. Brennan, founding partner"
                        width={260} height={300}
                        className="w-full object-cover object-top"
                        priority
                      />
                      <p className="text-center font-mono text-[10px] text-ink/50 mt-2 uppercase tracking-wider">
                        John R. Brennan, Esq.
                      </p>
                    </div>
                  </div>

                  {/* folder metadata strip */}
                  <div className="px-6 pb-5 pt-3 space-y-2 font-mono text-[10px] text-ink/55 border-t border-paper-line mt-2">
                    <div className="flex justify-between"><span>ADMITTED:</span><span className="font-semibold text-ink/70">Rivermont Bar, 2009</span></div>
                    <div className="flex justify-between"><span>SPECIALTY:</span><span className="font-semibold text-ink/70">Personal Injury / Trial</span></div>
                    <div className="flex justify-between"><span>RECOVERED:</span><span className="font-semibold text-oxblood">$42,000,000+</span></div>
                    <div className="flex justify-between"><span>FEE:</span><span className="font-semibold text-emerald-700">Contingency — 0% Upfront</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── trust stats strip ── */}
        <div className="relative bg-ink mt-0">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-7 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-paper/10">
            {[
              ['$42M+',   'recovered for clients'],
              ['1,100+',  'cases successfully handled'],
              ['14 yrs',  'serving the community'],
              ['24 / 7',  'phones answered'],
            ].map(([stat, label]) => (
              <div key={label} className="text-center px-6 py-1">
                <div className="font-display text-3xl md:text-4xl text-paper font-black">{stat}</div>
                <div className="font-mono text-[0.7rem] uppercase tracking-wider text-paper/45 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PRACTICE AREAS — filing-cabinet with images
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 slant-stripes-muted opacity-10 pointer-events-none"/>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="eyebrow text-oxblood-light mb-3">What We Handle</p>
              <h2 className="font-display text-3xl md:text-5xl text-paper font-semibold">Cases we litigate.</h2>
            </div>
            <Link href="/practice-areas"
              className="group inline-flex items-center gap-2 text-sm font-mono text-paper/60 hover:text-paper border-b border-paper/20 hover:border-paper pb-1 transition-all">
              VIEW ALL PRACTICE AREAS
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>

          <div className="space-y-3">
            {practiceAreas.map((area, idx) => {
              const Icon    = area.icon;
              const open    = expandedArea === idx;
              return (
                <div key={area.title}
                  className={`border transition-all duration-300 ${open ? 'border-paper/20 bg-ink-soft' : 'border-paper/8 hover:border-paper/18'}`}>
                  {/* drawer pull */}
                  <button
                    onClick={() => setExpandedArea(open ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded transition-colors ${open ? 'bg-oxblood text-paper' : 'bg-paper/6 text-paper/65'}`}>
                        <Icon size={22} strokeWidth={1.5}/>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-paper/25 block tracking-widest">DRAWER_{String(idx+1).padStart(2,'0')}</span>
                        <h3 className="font-display text-xl md:text-2xl text-paper font-medium">{area.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="hidden sm:block font-mono text-xs text-paper/45">{area.blurb}</span>
                      <ChevronRight size={20} className={`text-paper/40 transition-transform duration-300 ${open ? 'rotate-90 text-oxblood-light' : ''}`}/>
                    </div>
                  </button>

                  {/* drawer content */}
                  <div className={`transition-drawer overflow-hidden ${open ? 'max-h-[600px] opacity-100 border-t border-paper/10' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 md:p-8 grid md:grid-cols-[240px_1fr] gap-8 bg-paper/4">
                      {/* case photo */}
                      <div className="photo-polaroid self-start shadow-lg">
                        <Image
                          src={area.image}
                          alt={area.title}
                          width={240} height={170}
                          className="w-full h-[170px] object-cover"
                        />
                        <p className="text-center font-mono text-[9px] text-ink/50 mt-2 uppercase tracking-wider">{area.title}</p>
                      </div>

                      {/* detail copy */}
                      <div className="space-y-5">
                        <p className="text-sm md:text-base text-paper/80 leading-relaxed">{area.details}</p>

                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-oxblood-light block mb-2.5">First 72-Hour Checklist</span>
                          <ul className="space-y-2">
                            {area.dos.map((d,i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-paper/70">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-oxblood-light rounded-full shrink-0"/>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-l-2 border-oxblood-light pl-4">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-oxblood-light block mb-1">Damages Typically Recovered</span>
                          <p className="text-sm text-paper/65 italic">{area.recovery}</p>
                        </div>

                        <Link href="/contact"
                          className="inline-flex items-center gap-2 text-xs font-mono bg-oxblood hover:bg-oxblood-dark text-paper px-5 py-2.5 transition-colors tab-notch">
                          Open This Case File <ArrowRight size={12}/>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MEET THE TRIAL TEAM
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F4F0E8]">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="eyebrow text-oxblood mb-3">Your Legal Team</p>
          <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold mb-14">
            Meet the attorneys fighting for you.
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {attorneys.map((atty, i) => (
              <div key={atty.name}
                className={`attorney-card bg-white border border-paper-line overflow-hidden shadow-sm animate-fadeInUp animate-fadeInUp-delay-${i+1}`}>
                {/* photo header */}
                <div className="relative h-64 overflow-hidden bg-paper-dark">
                  <Image
                    src={atty.image}
                    alt={atty.name}
                    fill
                    className="object-cover object-top"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"/>
                  {/* name on photo */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                    <h3 className="font-display text-2xl text-paper font-bold leading-tight">{atty.name}</h3>
                    <p className="font-mono text-[10px] text-paper/75 uppercase tracking-widest">{atty.title}</p>
                  </div>
                  {/* oxblood accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-oxblood"/>
                </div>

                {/* body */}
                <div className="p-6 md:p-8 space-y-5">
                  {/* star rating */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({length: atty.rating}).map((_,i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400"/>
                    ))}
                    <span className="font-mono text-[10px] text-ink/45 ml-1">Client Rating</span>
                  </div>

                  <p className="text-sm text-ink/70 leading-relaxed">{atty.bio}</p>

                  <div className="font-mono text-[10px] text-ink/40 uppercase tracking-wider border-t border-paper-line pt-4">
                    {atty.bar}
                  </div>

                  {/* stat pills */}
                  <div className="grid grid-cols-3 gap-3 border-t border-paper-line pt-4">
                    {atty.stats.map(([val, lbl]) => (
                      <div key={lbl} className="text-center p-2 bg-paper/60 border border-paper-line rounded">
                        <div className="font-display text-lg font-black text-ink">{val}</div>
                        <div className="font-mono text-[8px] uppercase tracking-wide text-ink/45">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-5 md:px-8">
        <p className="eyebrow text-oxblood mb-3">Case Lifecycle</p>
        <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold mb-4">Four stages, start to finish.</h2>
        <p className="text-ink/65 max-w-xl leading-relaxed mb-14">
          No confusion, no runaround. Here is the exact path your file takes — and we update you at every stage.
        </p>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* connecting thread */}
          <div className="absolute top-10 left-12 right-12 h-px border-t-2 border-dashed border-paper-line hidden md:block"/>

          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="relative group">
                {/* circle step */}
                <div className="w-20 h-20 rounded-full bg-white border-2 border-paper-line group-hover:border-oxblood group-hover:bg-oxblood transition-all duration-300 flex items-center justify-center mb-5 mx-auto md:mx-0 shadow-sm">
                  <Icon size={28} className="text-ink/40 group-hover:text-paper transition-colors duration-300"/>
                </div>
                <div className="absolute -top-1 -left-1 w-7 h-7 bg-oxblood text-paper font-mono text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                  {step.n}
                </div>
                <h3 className="font-display text-xl text-ink font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CASE RESULTS LEDGER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#F4F0E8] border-y border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <p className="eyebrow text-oxblood mb-3">Track Record</p>
          <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold mb-3">
            Recent case results.
          </h2>
          <p className="text-sm text-ink/50 font-mono mb-12 max-w-lg leading-relaxed">
            Prior results do not guarantee a similar outcome. Each case is unique and results depend on individual facts and circumstances.
          </p>

          {/* ledger table */}
          <div className="shadow-paper-stacked">
            {/* header */}
            <div className="bg-ink text-paper px-6 py-4 grid grid-cols-[1fr_auto_auto] gap-4 font-mono text-[10px] uppercase tracking-widest">
              <span>Case Type</span>
              <span className="hidden sm:block">Resolution</span>
              <span>Recovery</span>
            </div>
            {/* rows */}
            {caseResults.map((row, i) => (
              <div key={i}
                className={`ledger-row px-6 py-4 grid grid-cols-[1fr_auto_auto] gap-4 items-center border-b border-paper-line last:border-0 ${i%2===0 ? 'bg-[#FDFBF7]' : 'bg-white'}`}>
                <div>
                  <span className="font-medium text-ink text-sm">{row.type}</span>
                  <span className="font-mono text-[10px] text-ink/40 block">{row.year}</span>
                </div>
                <span className={`hidden sm:inline font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded ${row.verdict === 'Jury Verdict' ? 'bg-oxblood/10 text-oxblood font-bold' : 'bg-paper-dark text-ink/50'}`}>
                  {row.verdict}
                </span>
                <span className="font-display text-xl md:text-2xl font-black text-oxblood">
                  {row.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIAL — sworn affidavit
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 max-w-6xl mx-auto px-5 md:px-8">
        <p className="eyebrow text-oxblood mb-12">Client Testimony</p>
        <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
          {/* photo */}
          <div className="photo-pinned photo-polaroid w-44 mx-auto md:mx-0 shrink-0 mt-6">
            <Image
              src="/images/lawyer_counsel.png"
              alt="Client testimony"
              width={176} height={210}
              className="w-full h-[180px] object-cover object-top"
            />
            <p className="text-center font-mono text-[9px] text-ink/45 mt-2 uppercase">Former Client</p>
          </div>

          {/* affidavit text */}
          <div className="relative bg-[#FCFAF5] border border-paper-line p-8 md:p-10 shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-1.5 slant-stripes opacity-80"/>
            <Quote size={28} className="text-oxblood/20 mb-5"/>
            <blockquote className="font-display text-2xl md:text-3xl text-ink leading-snug">
              &ldquo;After my accident I didn&rsquo;t know where to start. Brennan&rsquo;s office handled the insurance company so I could focus on physical therapy. They called with updates before I even had to ask.&rdquo;
            </blockquote>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-paper-line pt-6">
              <div>
                <p className="font-display italic text-lg text-ink font-semibold">Sarah Jenkins</p>
                <p className="font-mono text-[10px] text-ink/40 uppercase tracking-wide">Car accident claim — Rivermont District, 2023</p>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={15} className="text-amber-400 fill-amber-400"/>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA — summons banner
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-paper-line bg-[#F4F0E8]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="relative bg-ink text-paper overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 slant-stripes"/>
            <div className="absolute bottom-0 left-0 right-0 h-2 slant-stripes"/>
            <div className="px-8 md:px-12 py-12 md:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-start gap-5 max-w-xl">
                <ShieldAlert size={36} className="text-oxblood-light mt-1 shrink-0"/>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-oxblood-light font-bold block mb-2">
                    Important Legal Notice
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-snug">
                    Injury claims have strict filing deadlines.
                  </h2>
                  <p className="text-sm text-paper/65 mt-3 leading-relaxed">
                    The statute of limitations does not wait. The sooner our team opens your file,
                    the more evidence — witnesses, footage, black-box data — we can preserve.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                <Link href="/contact"
                  className="group text-center inline-flex items-center justify-center gap-2 bg-oxblood hover:bg-oxblood-dark text-paper px-8 py-4 font-semibold transition-colors tab-notch shadow">
                  Start My Free Review <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <a href="tel:+15551234357"
                  className="text-center inline-flex items-center justify-center gap-2 border border-paper/20 hover:border-paper bg-transparent hover:bg-paper/5 px-8 py-4 font-semibold text-paper transition-colors">
                  <Phone size={17}/> (555) 123-HURT
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
