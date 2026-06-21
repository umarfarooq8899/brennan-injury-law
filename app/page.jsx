'use client';

import { useState } from 'react';
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
  Check,
  Calendar,
  FileText,
  AlertTriangle,
  FolderOpen,
  Briefcase,
  ChevronRight,
  Scale,
  Signature
} from 'lucide-react';

const today = new Date();
const caseNumber = `${today.getFullYear()}-PI${String(today.getMonth() + 1).padStart(2, '0')}${String(
  today.getDate()
).padStart(2, '0')}`;
const filedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const processSteps = [
  {
    n: '01',
    title: 'Free Case Review',
    stamp: 'REVIEW SCHEDULED',
    body: 'Call or submit the intake form. We listen to what happened and tell you honestly whether you have a claim worth pursuing — within one business day.',
  },
  {
    n: '02',
    title: 'We Investigate',
    stamp: 'CASE FILE OPENED',
    body: 'We pull police reports, medical records, and witness statements, and deal with insurance adjusters so you can focus on recovering.',
  },
  {
    n: '03',
    title: 'We Negotiate',
    stamp: 'DEMAND DEPOSITED',
    body: 'Most claims settle before trial. We build the file to make the strongest possible demand — and we tell you exactly where things stand.',
  },
  {
    n: '04',
    title: 'You Get Paid',
    stamp: 'FUNDS RESTORED',
    body: 'If we settle or win at trial, you receive your share before we take a fee. If we don’t recover anything, you owe us nothing.',
  },
];

const practiceAreasData = [
  {
    icon: Car,
    title: 'Car & Truck Accidents',
    shortBlurb: 'Rear-end collisions, highway crashes, rideshare incidents.',
    details: 'Auto collisions require immediate preservation of black-box data, witness statements, and dashcam footage. Insurance adjusters will try to settle early for pennies.',
    dos: [
      'Take photos of all vehicles & road signs',
      'Get contact info of eyewitnesses',
      'Get evaluated by a doctor within 72 hours',
    ],
    recovery: 'Medical expenses, future rehab, lost wages, vehicle damage.',
    accent: 'oxblood',
  },
  {
    icon: HardHat,
    title: 'Workplace Injury',
    shortBlurb: 'On-the-job injuries, third-party claims beyond workers’ comp.',
    details: 'If a subcontractor, manufacturer, or driver caused your workplace injury, you can file a third-party lawsuit in addition to standard workers’ compensation.',
    dos: [
      'Report injury to supervisor immediately in writing',
      'Identify any third-party machinery involved',
      'Document hazardous work site conditions',
    ],
    recovery: 'Full lost earnings, specialist treatment, disability compensation.',
    accent: 'slate',
  },
  {
    icon: Footprints,
    title: 'Slip & Fall',
    shortBlurb: 'Unsafe property conditions in stores, sidewalks, and stairwells.',
    details: 'Property owners are legally required to keep premises safe. If they fail to fix a spill, ice, or broken steps, you have a premises liability claim.',
    dos: [
      'Report the fall to the store manager immediately',
      'Photograph the exact hazard (spill, ice, hole)',
      'Keep the shoes you were wearing in a bag as evidence',
    ],
    recovery: 'Surgical costs, physical therapy, lost shifts, pain and suffering.',
    accent: 'oxblood',
  },
  {
    icon: Stethoscope,
    title: 'Medical Malpractice',
    shortBlurb: 'Misdiagnosis, surgical errors, and medication mistakes.',
    details: 'Medical errors are a leading cause of death. Our expert medical board reviews files to identify surgical deviations, missed diagnoses, and pharmacy mistakes.',
    dos: [
      'Request full copies of your medical charts',
      'Keep a daily journal of physical symptoms',
      'Avoid posting details on public social media',
    ],
    recovery: 'Corrective procedures, specialized long-term care, loss of livelihood.',
    accent: 'slate',
  },
];

export default function Home() {
  // Hero Widget State
  const [activeHeroTab, setActiveHeroTab] = useState('overview');
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Seek immediate medical evaluation', checked: true },
    { id: 2, text: 'Obtain copy of official accident report', checked: false },
    { id: 3, text: 'Photograph injuries and scene evidence', checked: true },
    { id: 4, text: 'Open insurance claim file (Do not sign waivers)', checked: false },
    { id: 5, text: 'Consult with legal counsel before giving statements', checked: false },
  ]);

  // Statute of Limitations State
  const [accidentDaysAgo, setAccidentDaysAgo] = useState(90);
  const statuteDaysTotal = 1095; // 3 years
  const daysRemaining = Math.max(0, statuteDaysTotal - accidentDaysAgo);
  const percentElapsed = Math.min(100, ((accidentDaysAgo / statuteDaysTotal) * 100).toFixed(1));

  // Filing Cabinet State
  const [expandedArea, setExpandedArea] = useState(0);

  // Timeline State
  const [hoveredProcessIndex, setHoveredProcessIndex] = useState(null);

  const toggleChecklistItem = (id) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-paper-line bg-grain pb-20 pt-10">
        <div className="absolute inset-0 slant-stripes-muted opacity-20 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Hero Left Content */}
            <div className="z-10">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs text-ink/50 mb-7 bg-paper-dark/30 px-3 py-1.5 rounded inline-flex border border-paper-line/45">
                <span className="flex items-center gap-1.5">
                  <FileText size={13} className="text-oxblood" />
                  CASE NO. {caseNumber}
                </span>
                <span className="hidden sm:inline text-ink/20">|</span>
                <span>FILED: {filedDate}</span>
                <span className="hidden sm:inline text-ink/20">|</span>
                <span className="text-oxblood font-semibold">STATUS: OPEN INTAKE</span>
              </div>

              <h1 className="font-display text-[2.8rem] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink">
                Hurt in an accident?
                <br />
                <span className="italic text-oxblood font-semibold">We file. We fight.</span>
                <br />
                You recover.
              </h1>

              <p className="mt-7 text-lg text-ink/75 max-w-xl leading-relaxed">
                Brennan Injury Law represents injured individuals across Rivermont.
                We establish, manage, and litigate your case file with radical transparency — and you do not pay us a single dollar unless we win.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 bg-oxblood hover:bg-oxblood-dark text-paper px-8 py-4.5 font-medium transition-all shadow-md hover:shadow-lg tab-notch"
                >
                  File Your Claim
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+15551234357"
                  className="inline-flex items-center gap-2.5 bg-paper/60 backdrop-blur-sm px-8 py-4.5 font-medium text-ink border border-ink/20 hover:border-oxblood hover:text-oxblood transition-all shadow-sm hover:shadow"
                >
                  <Phone size={18} className="animate-pulse" />
                  (555) 123-HURT
                </a>
              </div>
            </div>

            {/* Interactive Hero Case File Widget */}
            <div className="relative">
              {/* Stacked Paper Effect Backings */}
              <div className="absolute inset-0 bg-paper-dark border border-paper-line transform rotate-2 rounded shadow-sm translate-y-2 translate-x-1" />
              <div className="absolute inset-0 bg-paper/85 border border-paper-line transform -rotate-1 rounded shadow-sm translate-y-1" />
              
              <div className="relative bg-[#FDFBF7] border border-paper-line p-6 md:p-8 shadow-paper-stacked">
                {/* Folder Header clip & index tabs */}
                <div className="absolute -top-[37px] left-0 right-0 flex justify-between pr-4 select-none">
                  <div className="flex gap-1.5 pl-2">
                    {[
                      { id: 'overview', label: 'Case Summary' },
                      { id: 'checklist', label: 'File Checklist' },
                      { id: 'timer', label: 'Statute Timer' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveHeroTab(tab.id)}
                        className={`index-tab px-4 py-2 font-mono text-[10px] md:text-xs uppercase tracking-wider border-t border-x border-paper-line transition-all duration-200 ${
                          activeHeroTab === tab.id
                            ? 'bg-[#FDFBF7] text-oxblood font-bold border-b-[#FDFBF7] -translate-y-[2px] z-10'
                            : 'bg-paper-dark/50 text-ink/50 hover:bg-paper-dark/80 border-b-paper-line translate-y-[1px]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div className="hidden sm:flex items-center text-ink/30 font-mono text-[10px]">
                    INTAKE_DOSSIER.PDF
                  </div>
                </div>

                {/* Tab content area */}
                <div className="min-h-[300px] flex flex-col justify-between">
                  {activeHeroTab === 'overview' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="border-b border-paper-line pb-4 flex justify-between items-start">
                        <div>
                          <h3 className="font-display text-xl text-ink font-semibold">BRENNAN INJURY LAW</h3>
                          <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">Legal Representatives & Trial Attorneys</p>
                        </div>
                        <FolderOpen className="text-oxblood/40" size={24} />
                      </div>
                      
                      <div className="space-y-3 font-mono text-xs text-ink/70">
                        <div className="grid grid-cols-[100px_1fr] border-b border-paper-line/50 pb-2">
                          <span className="text-ink/40">CASE TYPE:</span>
                          <span className="font-bold text-ink">Personal Injury / Negligence Claims</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] border-b border-paper-line/50 pb-2">
                          <span className="text-ink/40">FEE STRUCTURE:</span>
                          <span className="font-bold text-oxblood">Contingency Fee (0% Out Of Pocket)</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] border-b border-paper-line/50 pb-2">
                          <span className="text-ink/40">JURISDICTION:</span>
                          <span className="text-ink font-semibold">Rivermont District Court</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] pb-1">
                          <span className="text-ink/40">COUNCIL:</span>
                          <span className="text-ink font-semibold">Brennan Trial Unit</span>
                        </div>
                      </div>

                      <div className="bg-paper/40 p-4 border border-dashed border-paper-line">
                        <div className="flex gap-3">
                          <Scale className="text-oxblood shrink-0 mt-0.5" size={16} />
                          <p className="text-xs text-ink/65 leading-relaxed">
                            <strong>Note:</strong> We handles all calls, letters, insurance documentation, and negotiation. You focus solely on healing and recovery.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeHeroTab === 'checklist' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h3 className="font-display text-lg text-ink font-semibold">Immediate Action Steps</h3>
                        <p className="font-mono text-[10px] text-ink/40 uppercase">Interactive Pre-Litigation Checklist</p>
                      </div>

                      <div className="space-y-2.5">
                        {checklist.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => toggleChecklistItem(item.id)}
                            className="flex items-start gap-3 p-2 bg-paper/20 hover:bg-paper/40 border border-paper-line/35 rounded cursor-pointer transition-colors select-none"
                          >
                            <div className="mt-0.5 shrink-0">
                              {item.checked ? (
                                <div className="bg-oxblood text-paper rounded p-0.5">
                                  <Check size={11} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="w-[17px] h-[17px] border border-paper-line rounded bg-white" />
                              )}
                            </div>
                            <span className={`text-xs text-ink/75 leading-tight ${item.checked ? 'line-through text-ink/40' : ''}`}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeHeroTab === 'timer' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div>
                        <h3 className="font-display text-lg text-ink font-semibold">Evidence Decay Tracker</h3>
                        <p className="font-mono text-[10px] text-ink/40 uppercase">Rivermont Statute of Limitations</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="flex justify-between font-mono text-xs text-ink/60 mb-2">
                            <span>Days since your accident:</span>
                            <span className="font-bold text-oxblood">{accidentDaysAgo} days</span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="730"
                            value={accidentDaysAgo}
                            onChange={(e) => setAccidentDaysAgo(Number(e.target.value))}
                            className="w-full h-2 bg-paper-dark rounded-lg appearance-none cursor-pointer accent-oxblood"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-paper/30 p-3 border border-paper-line/60 rounded text-center">
                            <span className="block font-mono text-[10px] uppercase text-ink/40">Days Remaining</span>
                            <span className="font-display text-2xl font-bold text-ink">{daysRemaining}</span>
                          </div>
                          <div className="bg-paper/30 p-3 border border-paper-line/60 rounded text-center">
                            <span className="block font-mono text-[10px] uppercase text-ink/40">Timeline Elapsed</span>
                            <span className="font-display text-2xl font-bold text-oxblood">{percentElapsed}%</span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-start bg-oxblood/5 p-3.5 border border-oxblood/10 rounded">
                          <AlertTriangle className="text-oxblood shrink-0 mt-0.5" size={16} />
                          <p className="text-[11px] text-ink/70 leading-relaxed">
                            <strong>Statute Deadline Notice:</strong> Physical evidence (skid marks, vehicle components) degrades and security feeds overwrite within 30 days. Action is recommended immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stamp & Footer Details inside Folder */}
                  <div className="mt-6 pt-4 border-t border-paper-line flex justify-between items-center">
                    <span className="font-mono text-[10px] text-ink/40">FORM NO. BRN-809-PI</span>
                    <div className="relative -mr-2">
                      <div className="animate-stamp">
                        <Stamp size={84} className="text-oxblood/80 font-bold bg-[#FDFBF7] shadow-sm transform -rotate-12">
                          No Fee
                          <br />
                          Guaranteed
                        </Stamp>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="border-y border-paper-line bg-[#EBE4D5]/80 backdrop-blur-sm mt-16 shadow-inner">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-paper-line/60">
            {[
              ['$42 Million+', 'recovered for clients'],
              ['1,100+ cases', 'successfully handled'],
              ['14 years', 'serving the community'],
              ['24/7 client line', 'always answered by staff'],
            ].map(([stat, label], i) => (
              <div key={label} className={`pt-4 lg:pt-0 ${i === 0 ? 'pt-0' : ''}`}>
                <div className="font-display text-3xl md:text-4xl text-ink font-black tracking-tight">{stat}</div>
                <div className="font-mono text-[0.72rem] uppercase tracking-wider text-ink/50 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC FILING CABINET - PRACTICE AREAS */}
      <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-5 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow text-oxblood-light mb-3">Litigation Scope</p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold">Cases We Litigate.</h2>
            </div>
            <Link
              href="/practice-areas"
              className="group inline-flex items-center gap-2 text-sm font-mono text-paper/70 hover:text-paper border-b border-paper/20 hover:border-paper pb-1 transition-all"
            >
              VIEW ALL DOSSIERS 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Filing Cabinet Drawer Grid */}
          <div className="space-y-4">
            {practiceAreasData.map((area, index) => {
              const Icon = area.icon;
              const isExpanded = expandedArea === index;
              return (
                <div
                  key={area.title}
                  className={`border border-paper/10 transition-all duration-300 ${
                    isExpanded ? 'bg-ink-soft border-paper/20 shadow-lg' : 'hover:border-paper/25 bg-transparent'
                  }`}
                >
                  {/* Drawer Handle / Tab */}
                  <button
                    onClick={() => setExpandedArea(isExpanded ? null : index)}
                    className="w-full text-left px-6 py-5 md:py-6 flex items-center justify-between gap-4 select-none focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded transition-colors ${isExpanded ? 'bg-oxblood text-paper' : 'bg-paper/5 text-paper/70'}`}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] text-paper/30 block tracking-widest">DRAWER_0{index+1}</span>
                        <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-paper">{area.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden sm:inline font-mono text-xs text-paper/55">{area.shortBlurb}</span>
                      <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-oxblood-light' : 'text-paper/40'}`}>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </button>

                  {/* Drawer Content */}
                  <div
                    className={`transition-drawer overflow-hidden ${
                      isExpanded ? 'max-h-[500px] opacity-100 border-t border-paper/10' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 bg-paper/5">
                      <div className="space-y-4">
                        <p className="text-sm md:text-base text-paper/85 leading-relaxed">
                          {area.details}
                        </p>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wide text-oxblood-light block mb-2">Damages Recoverable</span>
                          <p className="text-sm text-paper/70 italic border-l-2 border-oxblood-light pl-3.5">
                            {area.recovery}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <span className="font-mono text-[10px] uppercase tracking-wide text-oxblood-light block">Recommended Actions (First 72 Hours)</span>
                        <ul className="space-y-2.5">
                          {area.dos.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-paper/75">
                              <span className="w-1.5 h-1.5 bg-oxblood-light rounded-full mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-xs font-mono text-paper bg-oxblood hover:bg-oxblood-dark px-4 py-2.5 transition-colors tab-notch"
                          >
                            Open This Case File <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <p className="eyebrow text-oxblood mb-3">Case Lifecycle</p>
        <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold">Four stages, start to finish.</h2>
        <p className="mt-4 text-ink/70 max-w-xl leading-relaxed">
          We treat claims like serious legal procedures, not sales funnels. Here is the exact path your file takes. Hover to see how each step is validated.
        </p>

        {/* Process Stepper Grid */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 relative">
          {/* Thread Line connecting steps */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t border-dashed border-paper-line -translate-y-1/2 hidden md:block z-0" />

          {processSteps.map((step, i) => (
            <div
              key={step.n}
              onMouseEnter={() => setHoveredProcessIndex(i)}
              onMouseLeave={() => setHoveredProcessIndex(null)}
              className="bg-[#F9F7F2] border border-paper-line p-6 relative shadow-sm hover:shadow-md transition-all duration-300 z-10 flex flex-col justify-between min-h-[250px] overflow-hidden group"
            >
              {/* Slant warning border line for active state */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-paper-line group-hover:bg-oxblood transition-colors" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-display text-4xl text-oxblood/20 font-black">{step.n}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wide text-ink/40 bg-paper px-2 py-0.5 border border-paper-line/50">STAGE_{step.n}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-xs text-ink/65 leading-relaxed">{step.body}</p>
              </div>

              {/* Hover Stamp overlay */}
              <div className={`transition-all duration-300 self-end mt-4 ${
                hoveredProcessIndex === i ? 'opacity-100 scale-100 rotate-12' : 'opacity-0 scale-75 rotate-0'
              }`}>
                <div className="border border-double border-oxblood text-oxblood text-[8px] font-mono font-bold tracking-widest px-2 py-1 uppercase rounded bg-white">
                  {step.stamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SWORN AFFIDAVIT TESTIMONIAL CARD */}
      <section className="bg-paper-dark/30 border-y border-paper-line py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Affidavit Frame */}
            <div className="relative bg-[#FCFAF5] border border-paper-line p-8 md:p-12 shadow-paper-stacked">
              {/* Top Red Binding Line */}
              <div className="absolute top-0 left-0 right-0 h-2 slant-stripes" />
              
              {/* Notary Seal Placement */}
              <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 opacity-65 md:opacity-85 pointer-events-none select-none">
                <div className="border-2 border-double border-oxblood rounded-full w-24 h-24 flex flex-col items-center justify-center text-[7px] font-mono font-black uppercase text-oxblood tracking-widest rotate-[15deg] bg-transparent">
                  <span>OFFICIAL SEAL</span>
                  <span className="my-0.5 border-y border-oxblood/40 px-1 py-0.5">NOTARY PUBLIC</span>
                  <span>STATE OF RIVERMONT</span>
                </div>
              </div>

              {/* Affidavit Heading */}
              <div className="text-center border-b border-paper-line pb-6 mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">In the District of Rivermont</span>
                <h3 className="font-display text-2xl font-black text-ink tracking-tight mt-1">AFFIDAVIT OF SATISFACTION</h3>
                <span className="font-mono text-[9px] uppercase tracking-wider text-oxblood/80 block mt-1">EXHIBIT &ldquo;A&rdquo; — CLIENT TESTIMONY</span>
              </div>

              {/* Affidavit Body */}
              <div className="relative font-mono text-xs md:text-sm text-ink/80 leading-loose py-4 px-2 border-l border-oxblood/10">
                <Quote size={24} className="text-oxblood/10 absolute -top-3 -left-3" />
                <p className="mb-4">
                  &ldquo;I, Sarah Jenkins, hereby declare under oath that after my collision, I was completely overwhelmed by hospital bills and insurance companies pushing quick waivers.
                </p>
                <p className="mb-4">
                  The attorneys and staff at Brennan Injury Law took possession of the entire file, organized all correspondence, and demanded actual value.
                </p>
                <p>
                  They called me weekly with status checks without me having to reach out once. My recovery was fully covered, and their firm fee was settled directly out of the insurance payout as promised.&rdquo;
                </p>
              </div>

              {/* Signatures */}
              <div className="mt-12 pt-6 border-t border-paper-line/50 grid grid-cols-2 gap-8 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase text-ink/45 block mb-1">DEPOSING CLIENT</span>
                  <div className="font-display italic text-lg text-ink font-semibold tracking-tight py-1 border-b border-dashed border-ink/30 h-8 flex items-center">
                    Sarah Jenkins
                  </div>
                  <span className="text-[9px] text-ink/40 block mt-1">Sarah M. Jenkins, Deponent</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/45 block mb-1">WITNESS COUNSEL</span>
                  <div className="font-display italic text-lg text-oxblood font-semibold tracking-tight py-1 border-b border-dashed border-ink/30 h-8 flex items-center">
                    John R. Brennan
                  </div>
                  <span className="text-[9px] text-ink/40 block mt-1">John R. Brennan, Esq.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL SUMMONS / CALL TO ACTION */}
      <section className="relative py-16 md:py-24 bg-grain">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="relative bg-[#FCFAF5] border border-paper-line shadow-lg overflow-hidden">
            {/* Red Warning Stripes Left Side */}
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-oxblood" />
            <div className="absolute top-0 bottom-0 right-0 w-3 bg-oxblood" />
            <div className="absolute top-0 left-0 right-0 h-3 slant-stripes" />
            <div className="absolute bottom-0 left-0 right-0 h-3 slant-stripes" />

            <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-start gap-4">
                <ShieldAlert size={36} className="text-oxblood mt-1 shrink-0" />
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-oxblood font-black">IMPORTANT LEGAL NOTICE</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">
                    Injury claims have strict filing deadlines.
                  </h2>
                  <p className="text-sm text-ink/70 max-w-xl leading-relaxed">
                    The Rivermont Statute of Limitations doesn&rsquo;t pause. The sooner our team establishes your case file, the more witness testimony and electronic evidence we can preserve.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Link
                  href="/contact"
                  className="group text-center inline-flex items-center justify-center gap-2 bg-oxblood hover:bg-oxblood-dark text-paper px-8 py-4 font-semibold transition-colors tab-notch shadow"
                >
                  Start My Free Review 
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+15551234357"
                  className="text-center inline-flex items-center justify-center gap-2 border border-ink/20 hover:border-oxblood bg-white hover:bg-paper-dark/25 px-8 py-4 font-semibold text-ink transition-colors"
                >
                  <Phone size={17} />
                  Call (555) 123-HURT
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
