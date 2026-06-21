'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const caseTypes = [
  'Car or Truck Accident',
  'Workplace Injury',
  'Slip & Fall',
  'Medical Malpractice',
  'Wrongful Death',
  'Dog Bite',
  'Other',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', caseType: '', details: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only — in production this posts to an API route or email/CRM service.
    setSubmitted(true);
  }

  return (
    <>
      <section className="border-b border-paper-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <p className="eyebrow text-oxblood mb-3">Open Intake</p>
          <h1 className="font-display text-4xl md:text-5xl text-ink max-w-2xl">
            Start your free case review.
          </h1>
          <p className="mt-5 text-ink/65 max-w-xl leading-relaxed">
            Tell us what happened. A real person reads every submission — usually the same business
            day.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          {/* Intake form */}
          <div className="case-card p-7 md:p-9">
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={40} className="text-oxblood mx-auto mb-4" />
                <h2 className="font-display text-2xl text-ink mb-2">File received.</h2>
                <p className="text-ink/65 max-w-sm mx-auto leading-relaxed">
                  Your case has been logged. Someone from our office will call you back within one
                  business day to discuss next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-ink/50">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="mt-2 w-full bg-paper border border-paper-line px-3.5 py-2.5 text-ink focus:border-oxblood outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-mono text-xs uppercase tracking-wide text-ink/50">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="mt-2 w-full bg-paper border border-paper-line px-3.5 py-2.5 text-ink focus:border-oxblood outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-ink/50">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full bg-paper border border-paper-line px-3.5 py-2.5 text-ink focus:border-oxblood outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="caseType" className="font-mono text-xs uppercase tracking-wide text-ink/50">
                    What type of incident?
                  </label>
                  <select
                    id="caseType"
                    name="caseType"
                    required
                    value={form.caseType}
                    onChange={handleChange}
                    className="mt-2 w-full bg-paper border border-paper-line px-3.5 py-2.5 text-ink focus:border-oxblood outline-none"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {caseTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="font-mono text-xs uppercase tracking-wide text-ink/50">
                    Briefly, what happened?
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    required
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Date, location, and a short summary of the incident."
                    className="mt-2 w-full bg-paper border border-paper-line px-3.5 py-2.5 text-ink focus:border-oxblood outline-none resize-none"
                  />
                </div>

                <div className="flex items-start gap-2.5 text-xs text-ink/50 leading-relaxed">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Submitting this form does not create an attorney&ndash;client relationship. Please
                    avoid including highly sensitive details until we&rsquo;ve spoken directly.
                  </span>
                </div>

                <button
                  type="submit"
                  className="inline-flex bg-oxblood hover:bg-oxblood-dark text-paper px-7 py-3.5 font-medium transition-colors tab-notch"
                >
                  Submit Case for Review
                </button>
              </form>
            )}
          </div>

          {/* Office info */}
          <div className="space-y-6">
            <div className="case-card p-6">
              <p className="eyebrow text-oxblood mb-4">Office</p>
              <ul className="space-y-4 text-sm text-ink/70">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-ink/40" />
                  412 Courthouse Square, Suite 6
                  <br />
                  Rivermont
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-ink/40" />
                  <a href="tel:+15551234357" className="hover:text-oxblood">
                    (555) 123-HURT
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-ink/40" />
                  intake@brennaninjurylaw.example
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-ink/40" />
                  Phones answered 24/7
                  <br />
                  Office hours: Mon&ndash;Fri, 8:30am&ndash;5:30pm
                </li>
              </ul>
            </div>

            <div className="bg-ink text-paper p-6">
              <p className="font-display text-lg leading-snug mb-2">
                Hurt and not sure where to start?
              </p>
              <p className="text-sm text-paper/65 leading-relaxed mb-4">
                Call now. No cost, no obligation, no pressure.
              </p>
              <a
                href="tel:+15551234357"
                className="inline-flex items-center gap-2 text-sm font-mono border-b border-paper/40 hover:border-paper pb-1"
              >
                (555) 123-HURT
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
