'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Phone, Menu, X, Scale } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-paper-line transition-all duration-300">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <Scale size={26} className="text-oxblood group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.75} />
            <span className="font-display text-xl tracking-tight text-ink group-hover:text-oxblood transition-colors duration-300">
              Brennan <span className="italic font-semibold">Injury Law</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={pathname === link.href}
                className="folder-tab text-ink/85 hover:text-oxblood pb-1 transition-colors duration-200"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15551234357"
              className="flex items-center gap-2 text-sm font-mono text-ink hover:text-oxblood transition-colors"
            >
              <Phone size={16} />
              (555) 123-HURT
            </a>
            <Link
              href="/contact"
              className="bg-oxblood hover:bg-oxblood-dark text-paper text-sm font-medium px-5 py-2.5 transition-colors tab-notch"
            >
              File Your Claim
            </Link>
          </div>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-paper-line bg-paper px-5 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block font-mono text-sm text-ink/80"
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <a href="tel:+15551234357" className="flex items-center gap-2 text-sm font-mono text-ink">
            <Phone size={16} /> (555) 123-HURT
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-center bg-oxblood text-paper text-sm font-medium px-5 py-3 tab-notch"
          >
            File Your Claim
          </Link>
        </div>
      )}
    </header>
  );
}
