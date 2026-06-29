'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Phone, Menu, X, Scale } from 'lucide-react';

import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-solid' : 'navbar-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <Scale
              size={22}
              strokeWidth={1.5}
              className="text-ink transition-transform duration-300 group-hover:rotate-12"
            />
            <span className="font-display text-[1.3rem] tracking-tight text-ink">
              Brennan <em className="not-italic font-semibold">Injury Law</em>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={pathname === link.href}
                className="nav-link pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+15551234357"
              className="flex items-center gap-1.5 text-sm text-ink/70 hover:text-ink transition-colors font-body"
            >
              <Phone size={14} strokeWidth={1.75} />
              (555) 123-HURT
            </a>
            <Link
              href="/contact"
              className="btn-primary text-sm"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink p-1"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-paper border-t border-paper-line px-5 py-6 space-y-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-paper-line space-y-3">
            <a href="tel:+15551234357" className="flex items-center gap-2 text-sm text-ink/70">
              <Phone size={15} /> (555) 123-HURT
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center text-sm"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
