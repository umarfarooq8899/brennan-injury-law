import Link from 'next/link';
import { Scale, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Scale size={22} className="text-oxblood-light" strokeWidth={1.75} />
              <span className="font-display text-lg text-paper">Brennan Injury Law</span>
            </div>
            <p className="text-sm text-paper/60 leading-relaxed">
              Representing injured people across the metro area since 2011.
            </p>
          </div>

          <div>
            <p className="eyebrow text-oxblood-light mb-3">Office</p>
            <ul className="space-y-2.5 text-sm text-paper/70">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                412 Courthouse Square, Suite 6, Rivermont
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="shrink-0" /> (555) 123-HURT
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0" /> intake@brennaninjurylaw.example
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 shrink-0" /> Phones answered 24/7 — case review within one business day
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-oxblood-light mb-3">Practice Areas</p>
            <ul className="space-y-2 text-sm text-paper/70">
              <li><Link href="/practice-areas" className="hover:text-paper">Car &amp; Truck Accidents</Link></li>
              <li><Link href="/practice-areas" className="hover:text-paper">Workplace Injury</Link></li>
              <li><Link href="/practice-areas" className="hover:text-paper">Slip &amp; Fall</Link></li>
              <li><Link href="/practice-areas" className="hover:text-paper">Medical Malpractice</Link></li>
              <li><Link href="/practice-areas" className="hover:text-paper">Wrongful Death</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-oxblood-light mb-3">Firm</p>
            <ul className="space-y-2 text-sm text-paper/70">
              <li><Link href="/about" className="hover:text-paper">About the Firm</Link></li>
              <li><Link href="/contact" className="hover:text-paper">Free Case Review</Link></li>
            </ul>
          </div>
        </div>

        <div className="thread-line mt-12 pt-6 text-xs text-paper/45 leading-relaxed">
          <p className="mb-2">
            <strong className="text-paper/60">Attorney Advertising.</strong> This website is for general informational
            purposes only and does not constitute legal advice. Viewing this site, or sending an inquiry through the
            contact form, does not create an attorney&ndash;client relationship. Please do not include confidential
            or case-sensitive information in any form on this site. Prior results described on this website do not
            guarantee or predict a similar outcome in any future matter.
          </p>
          <p>&copy; {new Date().getFullYear()} Brennan Injury Law, P.C. &mdash; Demo site built for portfolio purposes.</p>
        </div>
      </div>
    </footer>
  );
}
