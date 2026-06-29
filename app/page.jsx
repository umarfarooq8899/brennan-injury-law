'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion, useScroll, useTransform, useInView,
} from 'framer-motion';
import {
  ArrowRight, Phone, Car, HardHat, Footprints, Stethoscope,
  Shield, FileText, TrendingUp, Star, Award, Scale,
  ChevronRight, Check,
} from 'lucide-react';

import FadeIn from '../components/animations/FadeIn';
import CountUp from '../components/animations/CountUp';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import ImageReveal from '../components/animations/ImageReveal';
import MagneticButton from '../components/animations/MagneticButton';

/* ── static data ────────────────────────────────────────────── */

const practiceAreas = [
  {
    icon: Car,
    title: 'Car & Truck Accidents',
    blurb: 'Rear-end collisions, highway crashes, rideshare incidents.',
    image: '/images/car_accident.png',
    details: 'Auto collisions require immediate preservation of black-box data, witness statements, and dashcam footage. Insurance adjusters attempt to settle early for far less than you deserve.',
    dos: ['Photograph all vehicles, road signs & skid marks', 'Collect eyewitness contact information', 'Seek a doctor within 72 hours — even if you feel fine'],
    recovery: 'Medical bills, future rehabilitation, lost wages, vehicle repair & diminished value.',
  },
  {
    icon: HardHat,
    title: 'Workplace Injury',
    blurb: "On-the-job injuries, third-party claims beyond workers' comp.",
    image: '/images/workplace_injury.png',
    details: "If a subcontractor, equipment manufacturer, or third-party driver caused your workplace injury, you may pursue a separate civil claim in addition to standard workers' compensation.",
    dos: ['Report injury in writing to a supervisor immediately', 'Identify any third-party machinery or vehicles involved', 'Document unsafe site conditions with photos'],
    recovery: 'Full lost earnings, specialist treatment, permanent disability compensation.',
  },
  {
    icon: Footprints,
    title: 'Slip & Fall',
    blurb: 'Unsafe property conditions in stores, sidewalks, and stairwells.',
    image: '/images/slip_fall.png',
    details: 'Property owners are legally required to maintain safe premises. When they fail to address known hazards — spills, ice, broken stairs — they may be held liable for your injuries.',
    dos: ['Report the fall to the manager and get a written incident report', "Photograph the exact hazard before it's cleaned up", 'Preserve the footwear you wore as physical evidence'],
    recovery: 'Surgical costs, physical therapy, lost income, pain and suffering.',
  },
  {
    icon: Stethoscope,
    title: 'Medical Malpractice',
    blurb: 'Misdiagnosis, surgical errors, and medication mistakes.',
    image: '/images/lawyer_hero.png',
    details: 'Medical errors are among the leading causes of serious injury. Our expert medical advisory board reviews every file to identify deviations from the standard of care.',
    dos: ['Request complete copies of your medical records', 'Keep a daily symptom journal with photos', 'Avoid discussing your case on social media'],
    recovery: 'Corrective procedures, long-term specialist care, loss of future earnings.',
  },
];

const caseResults = [
  { type: 'Auto Collision — Spinal Injury',     verdict: 'Settlement',   amount: '$3,200,000', year: 2024 },
  { type: 'Workplace Fall — Fractures',          verdict: 'Jury Verdict', amount: '$1,875,000', year: 2024 },
  { type: 'Truck Accident — Traumatic Brain',   verdict: 'Settlement',   amount: '$2,650,000', year: 2023 },
  { type: 'Slip & Fall — Knee Replacement',     verdict: 'Settlement',   amount: '$940,000',   year: 2023 },
  { type: 'Medical Malpractice — Misdiagnosis', verdict: 'Settlement',   amount: '$1,400,000', year: 2022 },
  { type: 'Rideshare Collision — Neck Surgery', verdict: 'Jury Verdict', amount: '$820,000',   year: 2022 },
];

const attorneys = [
  {
    name:   'John R. Brennan',
    title:  'Founding Partner',
    bar:    'Rivermont Bar · Admitted 2009',
    bio:    'John has spent 15 years exclusively representing injured people. A former insurance-defense attorney, he knows every tactic adjusters use — and how to counter them. He has taken over 40 cases to jury verdict.',
    image:  '/images/lawyer_hero.png',
    stats:  [['$42M+', 'Recovered'], ['40+', 'Jury Trials'], ['15 yrs', 'Experience']],
    rating: 5,
  },
  {
    name:   'Sarah M. Jenkins',
    title:  'Senior Trial Counsel',
    bar:    'Rivermont Bar · Admitted 2015',
    bio:    'Sarah leads our medical malpractice and workplace injury practices. A biology graduate turned litigator, she excels at distilling complex medical evidence for judges and juries alike.',
    image:  '/images/lawyer_counsel.png',
    stats:  [['$18M+', 'Recovered'], ['20+', 'Jury Trials'], ['9 yrs', 'Experience']],
    rating: 5,
  },
];

const processSteps = [
  { n: '01', icon: Phone,      title: 'Free Case Review',  body: 'Call or submit the intake form. We respond honestly — within one business day.' },
  { n: '02', icon: FileText,   title: 'We Investigate',    body: 'Police reports, medical records, expert witnesses. We handle everything.' },
  { n: '03', icon: TrendingUp, title: 'We Negotiate',      body: 'We build the strongest demand and fight to maximize your recovery.' },
  { n: '04', icon: Shield,     title: 'You Get Paid',      body: 'You receive your share first. If we recover nothing, you owe us nothing.' },
];

const testimonials = [
  {
    text:   "The attorney at Brennan Law were professional and compassionate. Their dedication to my case made a significant difference in my life. I couldn't have asked for better representation.",
    name:   'Emily R.',
    role:   'IT Director at HealthCare',
    rating: 5,
  },
  {
    text:   'Navigating our case complexities was daunting until Brennan Law stepped in. Their expertise guided us through a successful legal process. We rely on them for all our legal needs.',
    name:   'Michael T.',
    role:   'CEO of TechSolutions Inc.',
    rating: 5,
  },
  {
    text:   'Facing criminal charges was terrifying, but Brennan Law provided hope. Their meticulous defense and unwavering support pointed us to a favorable outcome. I am incredibly grateful for their expertise.',
    name:   'James L.',
    role:   'IT Director at HealthCare',
    rating: 5,
  },
];

/* ── Hero heading animation variants ────────────────────────── */

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const heroLine = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

/* ── component ──────────────────────────────────────────────── */

export default function Home() {
  const [expandedArea, setExpandedArea] = useState(null);

  /* Parallax for hero photo */
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroPhotoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  /* Process section line draw */
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: '-80px 0px' });

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen bg-paper-warm overflow-hidden flex items-center">

        {/* Parallax hero photo */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[52%] pointer-events-none">
          <motion.div
            style={{ y: heroPhotoY }}
            className="relative w-full h-[110%] -top-[5%]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
              className="w-full h-full"
            >
              <Image
                src="/images/lawyer_hero.png"
                alt="Brennan Injury Law attorneys"
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </motion.div>
          {/* Gradient fades */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/60 lg:via-[#F5F2ED]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2ED]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-[580px]">

            {/* Badge — floats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hero-badge mb-8 animate-float inline-flex"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Accepting New Clients
            </motion.div>

            {/* Heading — staggered line reveal */}
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div className="overflow-hidden">
                <motion.h1
                  variants={heroLine}
                  className="display-heading text-[3rem] sm:text-[4rem] lg:text-[4.8rem] text-ink leading-[1.08]"
                >
                  Your Trusted
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.div variants={heroLine} className="display-heading text-[3rem] sm:text-[4rem] lg:text-[4.8rem] text-ink leading-[1.08]">
                  Advisors for
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div variants={heroLine} className="display-heading text-[3rem] sm:text-[4rem] lg:text-[4.8rem] text-ink leading-[1.08]">
                  <em className="italic font-light">Legal Solutions</em>
                </motion.div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
              className="text-ink/65 text-[1.05rem] leading-relaxed max-w-[440px] mb-10"
            >
              Expert legal guidance tailored to your needs, delivering proven results with trust and excellence. Over{' '}
              <strong className="text-ink font-semibold">$42 million</strong> recovered for our clients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <MagneticButton href="/contact" className="animate-pulse-ring">
                <span className="btn-primary group inline-flex items-center gap-2.5">
                  Schedule Your Consultation Today
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', repeatDelay: 1 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </span>
              </MagneticButton>

              <motion.a
                href="tel:+15551234357"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline group inline-flex items-center gap-2.5"
              >
                <Phone size={15} strokeWidth={1.75} />
                Contact Now
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap gap-5"
            >
              {[
                { icon: Award,  text: 'Top 100 Trial Attorneys' },
                { icon: Star,   text: '5-Star Client Rating'    },
                { icon: Shield, text: 'No Fee Unless We Win'    },
              ].map(({ icon: Icon, text }, i) => (
                <motion.span
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-2 text-xs text-ink/55 font-body"
                >
                  <Icon size={13} strokeWidth={1.5} className="text-gold" />
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats bar — counting numbers */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-paper-line">
          <div className="max-w-6xl mx-auto px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-paper-line">
            {[
              { target: 42,   prefix: '$', suffix: 'M+',  label: 'Recovered for clients' },
              { target: 1100, prefix: '',  suffix: '+',   label: 'Cases handled' },
              { target: 14,   prefix: '',  suffix: ' yrs', label: 'Serving the community' },
              { target: 24,   prefix: '',  suffix: '/7',  label: 'Phones answered' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center px-6 py-5">
                <div className="font-display text-2xl md:text-3xl text-ink font-semibold">
                  <CountUp
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1.6}
                  />
                </div>
                <div className="text-[0.68rem] uppercase tracking-wider text-ink/40 mt-0.5 font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT TEASER
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-paper">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image grid with reveal animations */}
            <div className="relative grid grid-cols-2 gap-3 h-[460px]">
              <ImageReveal className="relative rounded-sm h-full" direction="right" delay={0.1}>
                <Image src="/images/lawyer_hero.png" alt="Attorney at work" fill className="object-cover object-top rounded-sm" />
              </ImageReveal>
              <ImageReveal className="relative rounded-sm h-full mt-8" direction="left" delay={0.3}>
                <Image src="/images/lawyer_counsel.png" alt="Legal consultation" fill className="object-cover object-top rounded-sm" />
              </ImageReveal>
              {/* Floating stat card */}
              <FadeIn delay={0.6} className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-paper-line shadow-lg px-6 py-4 text-center whitespace-nowrap"
                >
                  <div className="font-display text-3xl font-semibold text-ink">Excellence</div>
                  <div className="text-xs text-ink/50 mt-0.5 tracking-wider uppercase font-body">Reputation for Excellence</div>
                </motion.div>
              </FadeIn>
            </div>

            {/* Copy */}
            <div className="lg:pl-4">
              <FadeIn delay={0.1}>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                />
              </FadeIn>
              <FadeIn delay={0.15}><p className="eyebrow mb-4">About Us</p></FadeIn>
              <FadeIn delay={0.25}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink mb-6">
                  Personalized legal solutions delivered expertly.
                </h2>
              </FadeIn>
              <FadeIn delay={0.35}>
                <p className="text-ink/60 leading-relaxed mb-5">
                  Founded in 2010, Brennan Law has consistently demonstrated a commitment to excellence in the legal field. Over the years, we have earned a reputation for providing exceptional legal services tailored to the unique needs of each client.
                </p>
              </FadeIn>
              <FadeIn delay={0.45}>
                <p className="text-ink/60 leading-relaxed mb-8">
                  Our team of seasoned attorneys brings a wealth of experience across various practice areas, ensuring comprehensive and effective legal solutions.
                </p>
              </FadeIn>
              <FadeIn delay={0.55}>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link href="/about" className="btn-ghost group">
                    Learn More About Us <ArrowRight size={14} className="inline ml-1" />
                  </Link>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PRACTICE AREAS — animated photo card grid
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <FadeIn>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                />
              </FadeIn>
              <FadeIn delay={0.1}><p className="eyebrow mb-3">Practice Areas</p></FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink">Our Expertise</h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.3} direction="left">
              <p className="text-ink/55 max-w-sm text-sm leading-relaxed">
                Our team is dedicated to offering comprehensive legal solutions across multiple practice areas.
              </p>
            </FadeIn>
          </div>

          {/* Staggered card grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.09}>
            {practiceAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <StaggerItem key={area.title}>
                  <motion.div
                    className="practice-card group rounded-sm bg-paper-warm aspect-[3/4] cursor-pointer"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onClick={() => setExpandedArea(expandedArea === idx ? null : idx)}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        className="object-cover object-top"
                      />
                      <div className="practice-card-overlay" />

                      {/* Index number */}
                      <span className="font-display text-[2.5rem] font-light text-white/20 absolute top-4 right-5 leading-none">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={14} strokeWidth={1.5} className="text-white/80" />
                          <span className="text-[0.65rem] uppercase tracking-widest text-white/60 font-body">
                            Practice Area
                          </span>
                        </div>
                        <motion.h3
                          className="font-display text-xl text-white font-medium leading-tight"
                          initial={{ y: 0 }}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.3 }}
                        >
                          {area.title}
                        </motion.h3>
                        <p className="text-white/65 text-xs mt-1.5 leading-relaxed line-clamp-2 font-body">
                          {area.blurb}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 text-white/70 text-[0.7rem] font-body">
                          <span>Learn more</span>
                          <motion.span
                            animate={{ x: expandedArea === idx ? 2 : 0, rotate: expandedArea === idx ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRight size={12} />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Expanded detail panel */}
          <motion.div
            initial={false}
            animate={{
              height: expandedArea !== null ? 'auto' : 0,
              opacity: expandedArea !== null ? 1 : 0,
            }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            {expandedArea !== null && (
              <div className="mt-4 bg-paper-warm border border-paper-line p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-display text-2xl text-ink mb-3">
                      {practiceAreas[expandedArea].title}
                    </h3>
                    <p className="text-ink/65 text-sm leading-relaxed">
                      {practiceAreas[expandedArea].details}
                    </p>
                  </div>
                  <div>
                    <span className="eyebrow block mb-3">First 72-Hour Checklist</span>
                    <ul className="space-y-2.5">
                      {practiceAreas[expandedArea].dos.map((d, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2.5 text-sm text-ink/65"
                        >
                          <Check size={13} className="mt-0.5 shrink-0 text-ink/40" strokeWidth={2.5} />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="eyebrow block mb-3">Damages Recovered</span>
                    <p className="text-sm text-ink/65 leading-relaxed italic">
                      {practiceAreas[expandedArea].recovery}
                    </p>
                    <MagneticButton href="/contact" className="mt-6 block">
                      <span className="btn-primary inline-flex text-xs items-center gap-2">
                        Open a Case File <ArrowRight size={13} />
                      </span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <FadeIn delay={0.2} className="mt-8 text-center">
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link href="/practice-areas" className="btn-ghost group">
                View All Practice Areas <ArrowRight size={14} className="inline ml-1" />
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS — staggered 3-column cards
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-paper-warm">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <FadeIn>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
              </FadeIn>
              <FadeIn delay={0.1}><p className="eyebrow mb-4">Testimonials</p></FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink">
                  What Our Clients Say
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-ink/55 text-sm leading-relaxed mt-4 max-w-xs">
                  Our clients consistently praise our professionalism, compassion, and expertise in delivering successful legal outcomes.
                </p>
              </FadeIn>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-4" staggerDelay={0.13}>
              {testimonials.map((t, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="testimonial-card h-full"
                    whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.09)' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="flex items-center gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + s * 0.06, type: 'spring', stiffness: 400 }}
                        >
                          <Star size={12} className="text-gold fill-gold" />
                        </motion.span>
                      ))}
                      <span className="text-[0.65rem] text-ink/40 ml-1 font-body">{t.rating}.0</span>
                    </div>
                    <p className="text-ink/70 text-sm leading-relaxed mb-5 font-body">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="border-t border-paper-line pt-4">
                      <p className="font-display text-base font-medium text-ink">{t.name}</p>
                      <p className="text-[0.68rem] text-ink/45 mt-0.5 font-body">{t.role}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MEET THE ATTORNEYS
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <FadeIn>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
              </FadeIn>
              <FadeIn delay={0.1}><p className="eyebrow mb-3">Our Team</p></FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink">
                  Meet Our Attorneys
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} direction="left">
              <p className="text-ink/55 max-w-sm text-sm leading-relaxed">
                Meet our experienced team of attorneys, dedicated to providing expert legal solutions with personalised attention.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
            {attorneys.map((atty) => (
              <StaggerItem key={atty.name}>
                <motion.div
                  className="attorney-card bg-paper-warm"
                  whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <ImageReveal className="relative h-80" direction="right">
                    <Image
                      src={atty.image}
                      alt={atty.name}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {Array.from({ length: atty.rating }).map((_, s) => (
                          <Star key={s} size={11} className="text-gold fill-gold" />
                        ))}
                      </div>
                      <h3 className="font-display text-2xl text-white font-semibold">{atty.name}</h3>
                      <p className="text-white/65 text-xs mt-0.5 font-body tracking-wider uppercase">{atty.title}</p>
                    </div>
                  </ImageReveal>

                  <div className="p-6 space-y-4">
                    <p className="text-ink/65 text-sm leading-relaxed font-body">{atty.bio}</p>
                    <p className="text-[0.68rem] uppercase tracking-wider text-ink/40 font-body border-t border-paper-line pt-4">
                      {atty.bar}
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {atty.stats.map(([val, lbl]) => (
                        <motion.div
                          key={lbl}
                          className="text-center py-3 bg-paper border border-paper-line"
                          whileHover={{ backgroundColor: '#111111', color: '#FAFAF8' }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="font-display text-xl font-semibold">{val}</div>
                          <div className="text-[0.65rem] uppercase tracking-wide mt-0.5 font-body opacity-60">{lbl}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS — sequential reveal
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-paper-warm">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-16">
            <FadeIn>
              <motion.span
                className="gold-line-animated mx-auto block"
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              />
            </FadeIn>
            <FadeIn delay={0.1}><p className="eyebrow mb-4">Our Process</p></FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink mb-4">
                How It Works
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-ink/55 max-w-md mx-auto text-sm leading-relaxed">
                No confusion, no runaround. Here is the exact path your file takes — and we update you at every stage.
              </p>
            </FadeIn>
          </div>

          <div ref={processRef} className="grid md:grid-cols-4 gap-6 lg:gap-10 relative">
            {/* Animated connecting line */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px hidden md:block overflow-hidden">
              <motion.div
                className="h-px border-t border-dashed border-paper-line w-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={processInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                style={{ transformOrigin: 'left center' }}
              />
            </div>

            <StaggerContainer className="contents" staggerDelay={0.18} initialDelay={0.3}>
              {processSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <StaggerItem key={step.n}>
                    <div className="process-step relative pt-4">
                      <div className="process-step-number">{step.n}</div>
                      <motion.div
                        className="relative z-10 w-14 h-14 bg-white border border-paper-line flex items-center justify-center mb-5 mx-auto md:mx-0 shadow-sm"
                        whileHover={{ backgroundColor: '#111111', borderColor: '#111111', scale: 1.08 }}
                        transition={{ duration: 0.25 }}
                      >
                        <Icon size={22} strokeWidth={1.5} className="text-ink/50" />
                      </motion.div>
                      <h3 className="font-display text-xl text-ink font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-ink/55 leading-relaxed font-body">{step.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CASE RESULTS — staggered card grid
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <FadeIn>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
              </FadeIn>
              <FadeIn delay={0.1}><p className="eyebrow mb-3">Track Record</p></FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink">
                  Recent Case Results
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} direction="left">
              <p className="text-ink/45 max-w-xs text-xs leading-relaxed font-body">
                Prior results do not guarantee a similar outcome. Each case is unique.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {caseResults.map((row, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="result-card"
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)', borderLeftColor: '#C9A96E' }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-[0.65rem] uppercase tracking-wider px-2.5 py-1 font-body font-medium ${row.verdict === 'Jury Verdict' ? 'bg-ink text-paper' : 'bg-paper-dark text-ink/60'}`}>
                      {row.verdict}
                    </span>
                    <span className="text-[0.65rem] text-ink/35 font-body">{row.year}</span>
                  </div>
                  <p className="text-sm text-ink/70 font-body mb-3 leading-relaxed">{row.type}</p>
                  <div className="font-display text-3xl md:text-4xl font-semibold text-ink">{row.amount}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LEGAL INSIGHTS (BLOG TEASER)
      ══════════════════════════════════════════════════════════ */}
      <section className="section-pad bg-paper-warm">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <FadeIn>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
              </FadeIn>
              <FadeIn delay={0.1}><p className="eyebrow mb-3">Blog</p></FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink">
                  Legal Insights &amp; Resources
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} direction="left">
              <p className="text-ink/55 max-w-sm text-sm leading-relaxed">
                Stay informed with the latest legal updates, insights, and expert articles to guide your legal journey.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {[
              {
                image: '/images/car_accident.png',
                category: 'Business Law',
                title: 'Understanding Corporate Compliance: A Guide for Business Owners',
                excerpt: 'Navigating the complex world of corporate compliance can be daunting. Our experts break down the essentials.',
                author: 'Jessica Clint',
                date: 'January 2024',
              },
              {
                image: '/images/workplace_injury.png',
                category: 'Family Law',
                title: 'Navigating Family Law: What to Expect During Legal Proceedings',
                excerpt: "Divorce can be one of life's most challenging experiences. Let our legal team guide your path forward.",
                author: 'Albert Flores',
                date: 'January 2024',
              },
              {
                image: '/images/slip_fall.png',
                category: 'Estate Planning',
                title: "The Importance of Estate Planning: Securing Your Family's Future",
                excerpt: "Estate planning is a crucial step in ensuring your family's financial security and peace of mind.",
                author: 'Dianne Russell',
                date: 'January 2024',
              },
            ].map((post, i) => (
              <StaggerItem key={i}>
                <motion.article
                  className="bg-white border border-paper-line group cursor-pointer overflow-hidden"
                  whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover object-top"
                      />
                    </motion.div>
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white text-ink text-[0.65rem] uppercase tracking-wider font-body font-medium px-2.5 py-1 border border-paper-line">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-ink font-medium leading-snug mb-2 group-hover:underline decoration-1 underline-offset-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-ink/55 leading-relaxed mb-4 font-body">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-[0.65rem] text-ink/40 font-body border-t border-paper-line pt-3">
                      <Scale size={11} strokeWidth={1.5} />
                      <span className="font-medium">{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GET IN TOUCH — split layout
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-paper-line overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: attorney photo with reveal */}
            <ImageReveal className="relative h-[460px] rounded-sm order-2 lg:order-1" direction="right" delay={0.15}>
              <Image
                src="/images/lawyer_counsel.png"
                alt="Get in touch with our legal team"
                fill
                className="object-cover object-top rounded-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-xl text-white font-medium">Let us talk about your case</p>
                <p className="text-white/60 text-sm mt-1 font-body">Free consultation · No obligation</p>
              </div>
            </ImageReveal>

            {/* Right: form */}
            <div className="order-1 lg:order-2">
              <FadeIn>
                <motion.span
                  className="gold-line-animated block"
                  initial={{ width: 0 }}
                  whileInView={{ width: '3rem' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
              </FadeIn>
              <FadeIn delay={0.1}><p className="eyebrow mb-4">Contact Us</p></FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="display-heading text-[2.4rem] md:text-[3rem] text-ink mb-3">
                  Get in Touch
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-ink/55 text-sm leading-relaxed mb-8">
                  Have questions? We are here to help. Contact us to discuss your legal needs.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="eyebrow block mb-1.5">First name</label>
                      <motion.input
                        type="text"
                        placeholder="First name"
                        className="field-input"
                        whileFocus={{ borderColor: '#111111', scale: 1.005 }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                    <div>
                      <label className="eyebrow block mb-1.5">Last name</label>
                      <motion.input
                        type="text"
                        placeholder="Last name"
                        className="field-input"
                        whileFocus={{ borderColor: '#111111', scale: 1.005 }}
                        transition={{ duration: 0.15 }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="eyebrow block mb-1.5">Email</label>
                    <motion.input
                      type="email"
                      placeholder="you@example.com"
                      className="field-input"
                      whileFocus={{ borderColor: '#111111' }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                  <div>
                    <label className="eyebrow block mb-1.5">Phone</label>
                    <motion.input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="field-input"
                      whileFocus={{ borderColor: '#111111' }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                  <div>
                    <label className="eyebrow block mb-1.5">Message</label>
                    <motion.textarea
                      rows={4}
                      placeholder="Leave us a message..."
                      className="field-input resize-none"
                      whileFocus={{ borderColor: '#111111' }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                  <p className="text-[0.65rem] text-ink/35 font-body">
                    By submitting, you agree to our{' '}
                    <Link href="/contact" className="underline underline-offset-2 hover:text-ink/60 transition-colors">
                      privacy policy
                    </Link>.
                  </p>
                  <MagneticButton className="w-full">
                    <motion.button
                      type="submit"
                      className="btn-primary w-full justify-center"
                      whileHover={{ backgroundColor: '#2C2C2C' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Contact Us Today <ArrowRight size={15} className="inline ml-2" />
                    </motion.button>
                  </MagneticButton>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
