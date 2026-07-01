'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight, ArrowLeft, Check,
} from 'lucide-react';

import FadeIn from '../../components/animations/FadeIn';

/* ── constants ───────────────────────────────────────────────── */

const STEPS = ['Your Info', 'Incident', 'Review'];

const caseTypes = [
  'Car or Truck Accident',
  'Workplace Injury',
  'Slip & Fall',
  'Medical Malpractice',
  'Wrongful Death',
  'Dog Bite',
  'Other',
];

const EMPTY_FORM = {
  name: '', phone: '', email: '',
  caseType: '', details: '',
};

/* ── helpers ─────────────────────────────────────────────────── */

function validate(step, form) {
  const errors = {};
  if (step === 0) {
    if (!form.name.trim())  errors.name  = 'Full name is required.';
    if (!form.phone.trim()) errors.phone = 'Phone number is required.';
    if (!form.email.trim()) errors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = 'Please enter a valid email.';
  }
  if (step === 1) {
    if (!form.caseType) errors.caseType = 'Please select an incident type.';
    if (!form.details.trim()) errors.details = 'Please describe what happened.';
  }
  return errors;
}

/* ── FloatingField ───────────────────────────────────────────── */

function FloatingField({ id, label, type = 'text', name, value, onChange, error, inputMode, autoComplete }) {
  return (
    <div>
      <div className="field-group">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={`field-float${error ? ' has-error' : ''}`}
        />
        <label htmlFor={id} className="field-label">{label}</label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="field-error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FloatingTextarea ────────────────────────────────────────── */

function FloatingTextarea({ id, label, name, value, onChange, error, rows = 5 }) {
  return (
    <div>
      <div className="field-group textarea">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          rows={rows}
          className={`field-float resize-none${error ? ' has-error' : ''}`}
        />
        <label htmlFor={id} className="field-label">{label}</label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="field-error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FloatingSelect ──────────────────────────────────────────── */

function FloatingSelect({ id, label, name, value, onChange, error, options }) {
  return (
    <div>
      <div className="field-group">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`field-float${error ? ' has-error' : ''}`}
          style={{ paddingTop: value ? '1.4rem' : '0.95rem', paddingBottom: value ? '0.5rem' : '0.95rem' }}
        >
          <option value="" disabled hidden />
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <label
          htmlFor={id}
          className="field-label"
          style={value ? {
            top: '0.45rem',
            transform: 'none',
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#000',
          } : {}}
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="field-error"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── StepProgress ────────────────────────────────────────────── */

function StepProgress({ current }) {
  return (
    <div className="step-progress">
      {STEPS.map((label, i) => {
        const status = i < current ? 'done' : i === current ? 'active' : '';
        return (
          <div key={label} className="contents">
            <div className="step-node">
              <div className={`step-node-circle ${status}`}>
                {i < current ? <Check size={12} strokeWidth={2.5} /> : i + 1}
              </div>
              <span className={`step-node-label ${status}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="step-connector">
                <div
                  className="step-connector-fill"
                  style={{ width: i < current ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── SuccessState ────────────────────────────────────────────── */

function SuccessState({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="py-12 text-center"
    >
      {/* Animated SVG checkmark */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-16 h-16 mx-auto mb-6"
        aria-hidden="true"
      >
        <circle
          cx="32" cy="32" r="30"
          stroke="#000"
          strokeWidth="1.5"
          className="svg-circle-path"
        />
        <path
          d="M20 33 L29 42 L44 25"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-check-path"
        />
      </svg>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-display text-3xl text-ink mb-2"
      >
        File received{name ? `, ${name.split(' ')[0]}` : ''}.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="text-ink/60 max-w-sm mx-auto leading-relaxed text-sm"
      >
        Your case has been logged. Someone from our office will call you back
        within one business day to discuss next steps.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 inline-flex items-center gap-3 bg-paper-warm border border-paper-line px-5 py-3.5 text-sm text-ink/65"
      >
        <Clock size={15} className="text-ink/35 shrink-0" />
        <span>Typical callback time: <strong className="text-ink font-medium">same business day</strong></span>
      </motion.div>
    </motion.div>
  );
}

/* ── inner form (uses useSearchParams) ───────────────────────── */

function ContactForm() {
  const searchParams = useSearchParams();
  const preType = searchParams.get('type') || '';

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM, caseType: preType });
  const [errors, setErrors] = useState({});
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const formRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }));
  }

  function advance() {
    const errs = validate(step, form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setDirection(1);
    setStep((s) => s + 1);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function retreat() {
    setDirection(-1);
    setStep((s) => s - 1);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div ref={formRef} className="case-card p-7 md:p-9">
      {submitted ? (
        <SuccessState name={form.name} />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <StepProgress current={step} />

          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ── Step 0: Your Info ─────────────────────── */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="font-display text-2xl text-ink mb-0.5">Who are you?</h2>
                    <p className="text-xs text-ink/45">We need basic contact info to reach you.</p>
                  </div>

                  <FloatingField
                    id="name" label="Full name" name="name"
                    value={form.name} onChange={handleChange} error={errors.name}
                    autoComplete="name"
                  />
                  <FloatingField
                    id="phone" label="Phone number" name="phone" type="tel"
                    value={form.phone} onChange={handleChange} error={errors.phone}
                    inputMode="tel" autoComplete="tel"
                  />
                  <FloatingField
                    id="email" label="Email address" name="email" type="email"
                    value={form.email} onChange={handleChange} error={errors.email}
                    autoComplete="email"
                  />
                </motion.div>
              )}

              {/* ── Step 1: What Happened ─────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="font-display text-2xl text-ink mb-0.5">What happened?</h2>
                    <p className="text-xs text-ink/45">Select the incident type and give us a brief summary.</p>
                  </div>

                  <FloatingSelect
                    id="caseType" label="Type of incident" name="caseType"
                    value={form.caseType} onChange={handleChange} error={errors.caseType}
                    options={caseTypes}
                  />
                  <FloatingTextarea
                    id="details" label="Briefly, what happened? (date, location, summary)"
                    name="details" value={form.details} onChange={handleChange}
                    error={errors.details} rows={5}
                  />
                </motion.div>
              )}

              {/* ── Step 2: Review ────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="font-display text-2xl text-ink mb-0.5">Review & submit</h2>
                    <p className="text-xs text-ink/45">Confirm your information before we log the file.</p>
                  </div>

                  <div className="bg-paper-warm border border-paper-line divide-y divide-paper-line">
                    {[
                      { label: 'Name',     value: form.name },
                      { label: 'Phone',    value: form.phone },
                      { label: 'Email',    value: form.email },
                      { label: 'Incident', value: form.caseType },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-4 px-5 py-3.5">
                        <span className="font-mono text-[0.62rem] uppercase tracking-wide text-ink/40 w-16 shrink-0 mt-0.5">
                          {label}
                        </span>
                        <span className="text-sm text-ink">{value}</span>
                      </div>
                    ))}
                    <div className="px-5 py-3.5">
                      <span className="font-mono text-[0.62rem] uppercase tracking-wide text-ink/40 block mb-1">
                        Summary
                      </span>
                      <p className="text-sm text-ink/70 leading-relaxed">{form.details}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-ink/45 leading-relaxed">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-ink/30" />
                    <span>
                      Submitting does not create an attorney&ndash;client relationship. Please avoid
                      including highly sensitive details until we&rsquo;ve spoken directly.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-paper-line">
            {step > 0 ? (
              <button
                type="button"
                onClick={retreat}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wide text-ink/50 hover:text-ink transition-colors"
              >
                <ArrowLeft size={13} /> Back
              </button>
            ) : (
              <span />
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={advance}
                className="inline-flex items-center gap-2 bg-ink hover:bg-ink-soft text-paper px-6 py-3 text-sm font-medium transition-colors tab-notch"
              >
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-ink hover:bg-ink-soft text-paper px-6 py-3 text-sm font-medium transition-colors tab-notch"
              >
                Submit Case for Review <ArrowRight size={14} />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

/* ── main export ─────────────────────────────────────────────── */

export default function Contact() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <FadeIn delay={0}>
            <p className="eyebrow text-oxblood mb-3">Open Intake</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink max-w-2xl leading-tight">
              Start your free case review.
            </h1>
          </FadeIn>
          <FadeIn delay={0.22}>
            <p className="mt-5 text-ink/65 max-w-xl leading-relaxed">
              Tell us what happened. A real person reads every submission &mdash; usually the same
              business day.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Form + Sidebar ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-[1fr_300px] gap-10 lg:gap-14">
          {/* Multi-step form */}
          <Suspense fallback={<div className="case-card p-7 md:p-9 animate-pulse h-96" />}>
            <ContactForm />
          </Suspense>

          {/* Sidebar */}
          <FadeIn direction="left" delay={0.2} className="space-y-5">
            {/* Office info card */}
            <motion.div
              className="case-card p-6"
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.09)' }}
              transition={{ duration: 0.3 }}
            >
              <p className="eyebrow text-ink/40 mb-4">Office</p>
              <ul className="space-y-4 text-sm text-ink/65">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-ink/30" />
                  <span>
                    412 Courthouse Square, Suite 6<br />Rivermont
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={15} className="shrink-0 text-ink/30" />
                  <a href="tel:+15551234357" className="hover:text-ink transition-colors">
                    (555) 123-HURT
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="shrink-0 text-ink/30" />
                  <span className="break-all">intake@brennaninjurylaw.example</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0 text-ink/30" />
                  <span>
                    <span className="flex items-center gap-1.5 mb-0.5">
                      <span className="pulse-dot" />
                      <span className="text-ink font-medium">Phones answered 24/7</span>
                    </span>
                    Office hours: Mon&ndash;Fri, 8:30am&ndash;5:30pm
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Map placeholder */}
            <motion.div
              className="case-card overflow-hidden"
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.09)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-paper-warm h-36 flex items-center justify-center border-b border-paper-line relative overflow-hidden">
                {/* Decorative grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#000" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
                {/* Pin */}
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center shadow-lg">
                    <MapPin size={14} className="text-paper" />
                  </div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-wide text-ink/50 bg-paper px-2 py-0.5 border border-paper-line">
                    412 Courthouse Sq.
                  </span>
                </div>
              </div>
              <div className="px-5 py-3 flex items-center justify-between">
                <span className="text-xs text-ink/45">Rivermont</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7rem] font-mono uppercase tracking-wide text-ink/50 hover:text-ink transition-colors"
                >
                  Get directions →
                </a>
              </div>
            </motion.div>

            {/* Emergency CTA card */}
            <div className="bg-ink text-paper p-6">
              <p className="font-display text-lg leading-snug mb-1.5">
                Hurt and not sure where to start?
              </p>
              <p className="text-xs text-paper/50 leading-relaxed mb-5">
                Call now. No cost, no obligation, no pressure.
              </p>
              <a
                href="tel:+15551234357"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-paper border border-paper/25 hover:border-paper/60 px-4 py-2.5 transition-colors tab-notch"
              >
                <Phone size={14} />
                (555) 123-HURT
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
