import Link from 'next/link';
import { Scale, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Scale size={20} className="text-gold" strokeWidth={1.5} />
              <span className="font-display text-lg text-white">Brennan Injury Law</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Representing injured people across the metro area since 2011.
            </p>
          </div>

          {/* Office */}
          <div>
            <p className="eyebrow text-white/35 mb-4">Office</p>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold/70" />
                412 Courthouse Square, Suite 6, Rivermont
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold/70" />
                (555) 123-HURT
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-gold/70" />
                intake@brennaninjurylaw.example
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold/70" />
                Phones answered 24/7
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <p className="eyebrow text-white/35 mb-4">Practice Areas</p>
            <ul className="space-y-2.5 text-sm text-white/55">
              {['Car & Truck Accidents', 'Workplace Injury', 'Slip & Fall', 'Medical Malpractice', 'Wrongful Death'].map((area) => (
                <li key={area}>
                  <Link href="/practice-areas" className="hover:text-white transition-colors">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <p className="eyebrow text-white/35 mb-4">Firm</p>
            <ul className="space-y-2.5 text-sm text-white/55">
              <li><Link href="/about" className="hover:text-white transition-colors">About the Firm</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Free Case Review</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-xs text-white/30 leading-relaxed">
          <p className="mb-2">
            <strong className="text-white/45">Attorney Advertising.</strong> This website is for general informational
            purposes only and does not constitute legal advice. Viewing this site, or sending an inquiry through the
            contact form, does not create an attorney–client relationship. Prior results described on this website do not
            guarantee or predict a similar outcome in any future matter.
          </p>
          <p>&copy; {new Date().getFullYear()} Brennan Injury Law, P.C. &mdash; Demo site built for portfolio purposes.</p>
        </div>
      </div>
    </footer>
  );
}
