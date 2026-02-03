import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white border-t-8 border-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <img 
              src="/logo.png" 
              alt="Fyrup Logo" 
              className="h-14 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 text-sm leading-relaxed font-medium">
              Leading provider of passive fire protection and fire risk assessments with over 15 years of experience.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:02035762292" className="flex items-center text-gray-400 hover:text-[var(--primary)] transition-colors font-bold">
                <Phone className="h-5 w-5 mr-2" />
                020 3576 2292
              </a>
              <a href="mailto:info@fyrup.co.uk" className="flex items-center text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                <Mail className="h-5 w-5 mr-2" />
                info@fyrup.co.uk
              </a>
              <div className="flex items-start text-gray-400 font-medium">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>45-55 Commercial Street,<br />London, E1 6BD</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide border-b-2 border-[var(--primary)] pb-2">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about/values" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Our Values
                </Link>
              </li>
              <li>
                <Link href="/about/guarantee" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Our Guarantee
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide border-b-2 border-[var(--primary)] pb-2">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/fire-risk-assessments" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Fire Risk Assessments
                </Link>
              </li>
              <li>
                <Link href="/services/fire-stopping" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Fire Stopping
                </Link>
              </li>
              <li>
                <Link href="/services/fire-doors" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Fire Doors
                </Link>
              </li>
              <li>
                <Link href="/services/fire-dampers" className="text-gray-400 hover:text-[var(--primary)] transition-colors font-medium">
                  Fire Dampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 uppercase tracking-wide border-b-2 border-[var(--primary)] pb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm font-medium">Subscribe to our newsletter for fire safety tips and updates.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-dark-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] text-sm font-medium"
              />
              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-white px-6 py-3 font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t-2 border-dark-800 mt-12 pt-8 text-center text-gray-400 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Fyrup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
