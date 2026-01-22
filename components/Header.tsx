'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-900' 
        : 'bg-transparent backdrop-blur-md bg-dark-900/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Fyrup Logo" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary-500 transition-colors text-sm font-semibold uppercase tracking-wide">
              Home
            </Link>
            
            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-primary-500 transition-colors text-sm font-semibold uppercase tracking-wide">
                About
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-dark-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/about/values" className="block px-4 py-3 text-gray-300 hover:bg-dark-700 hover:text-primary-500 transition-colors text-sm">
                  Our Values
                </Link>
                <Link href="/about/guarantee" className="block px-4 py-3 text-gray-300 hover:bg-dark-700 hover:text-primary-500 transition-colors text-sm">
                  Our Guarantee
                </Link>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-primary-500 transition-colors text-sm font-semibold uppercase tracking-wide">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-dark-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/services/fire-risk-assessments" className="block px-4 py-3 text-gray-300 hover:bg-dark-700 hover:text-primary-500 transition-colors text-sm">
                  Fire Risk Assessments
                </Link>
                <Link href="/services/fire-stopping" className="block px-4 py-3 text-gray-300 hover:bg-dark-700 hover:text-primary-500 transition-colors text-sm">
                  Fire Stopping
                </Link>
                <Link href="/services/fire-doors" className="block px-4 py-3 text-gray-300 hover:bg-dark-700 hover:text-primary-500 transition-colors text-sm">
                  Fire Doors
                </Link>
                <Link href="/services/fire-dampers" className="block px-4 py-3 text-gray-300 hover:bg-dark-700 hover:text-primary-500 transition-colors text-sm">
                  Fire Dampers
                </Link>
              </div>
            </div>

            <Link href="/contact" className="text-white hover:text-primary-500 transition-colors text-sm font-semibold uppercase tracking-wide">
              Contact
            </Link>
            <Link href="/faqs" className="text-white hover:text-primary-500 transition-colors text-sm font-semibold uppercase tracking-wide">
              FAQs
            </Link>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="tel:02035762292" className="text-white font-bold text-sm">
              020 3576 2292
            </a>
            <Link 
              href="/contact" 
              className="bg-primary-600 text-white px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-lg"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-800">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-primary-500 font-semibold uppercase">
              Home
            </Link>
            
            <div className="space-y-2">
              <div className="text-white font-semibold py-2 uppercase">About</div>
              <Link href="/about/values" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-gray-300 hover:text-primary-500">
                Our Values
              </Link>
              <Link href="/about/guarantee" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-gray-300 hover:text-primary-500">
                Our Guarantee
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-white font-semibold py-2 uppercase">Services</div>
              <Link href="/services/fire-risk-assessments" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-gray-300 hover:text-primary-500">
                Fire Risk Assessments
              </Link>
              <Link href="/services/fire-stopping" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-gray-300 hover:text-primary-500">
                Fire Stopping
              </Link>
              <Link href="/services/fire-doors" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-gray-300 hover:text-primary-500">
                Fire Doors
              </Link>
              <Link href="/services/fire-dampers" onClick={() => setMobileMenuOpen(false)} className="block py-2 pl-4 text-gray-300 hover:text-primary-500">
                Fire Dampers
              </Link>
            </div>

            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-primary-500 font-semibold uppercase">
              Contact
            </Link>
            <Link href="/faqs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white hover:text-primary-500 font-semibold uppercase">
              FAQs
            </Link>

            <div className="pt-4 border-t border-dark-700">
              <a href="tel:02035762292" className="block text-lg font-bold text-white mb-3">
                020 3576 2292
              </a>
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-primary-600 text-white px-6 py-3 font-bold uppercase"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
