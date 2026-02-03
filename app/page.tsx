import Link from 'next/link';
import { Shield, FileCheck, DoorClosed, Wind, Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import AccreditationBanner from '@/components/AccreditationBanner';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Bold Contractor Style */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-32 pb-64 md:pb-32 bg-dark-900">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark-900/85"></div>
          <img
            src="/hero section.png"
            alt="Fire inspection and property protection"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-block mb-6 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Over 15 Years of Experience
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 text-white font-bold leading-tight">
              EXPERT FIRE
              <br />
              PROTECTION
              <br />
              <span className="text-[var(--accent)]">SERVICES</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-medium leading-relaxed">
              London's leading provider of passive fire protection and fire risk assessments
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[var(--primary)] text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-2xl"
              >
                Get Free Quote
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
              <a
                href="tel:02035762292"
                className="inline-flex items-center justify-center border-4 border-white text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-white hover:text-dark-900 transition-all"
              >
                <Phone className="mr-3 h-6 w-6" />
                020 3576 2292
              </a>
            </div>

            {/* Features Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mb-48 md:mb-0 border-t-4 border-[var(--primary)]">
              <div className="flex items-center gap-3">
                <div className="bg-[var(--primary)] p-3">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Same Day</div>
                  <div className="text-gray-400">Quotes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[var(--primary)] p-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">15+ Years</div>
                  <div className="text-gray-400">Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[var(--primary)] p-3">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Certified</div>
                  <div className="text-gray-400">Professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations Rolling Banner */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <AccreditationBanner />
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Get Started Today
            </div>
            <h2 className="text-4xl lg:text-6xl text-[var(--heading)] mb-6 font-bold">
              REQUEST A FREE QUOTE
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Same-day quotes available - Fill out the form below
            </p>
          </div>

          <form className="max-w-2xl mx-auto bg-gray-100 p-10 border-l-8 border-[var(--primary)] shadow-lg">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Inspection Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Number of doors needing inspection</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dark-900 mb-2 uppercase">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-[var(--primary)] focus:outline-none text-dark-900 bg-white font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--primary)] text-white px-8 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-xl"
              >
                Send Inquiry
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-8 font-medium">
            Once we receive your form, our team will prepare and email a formal quote to the email address provided.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
                About Fyrup
              </div>
              <h2 className="text-4xl lg:text-6xl text-[var(--heading)] mb-8 font-bold leading-tight">
                LONDON'S TRUSTED
                <br />FIRE PROTECTION
                <br /><span className="text-[var(--primary)]">EXPERTS</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
                With over 15 years of experience, Fyrup is the leading provider of passive fire protection
                and fire risk assessments. Our team of certified experts is committed to delivering exceptional
                services that exceed our client's expectations.
              </p>
              <Link
                href="/about/values"
                className="inline-flex items-center bg-dark-900 text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-dark-800 transition-all"
              >
                Learn About Our Values
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-gray-100 p-10 border-l-8 border-[var(--primary)]">
              <h3 className="text-3xl font-bold text-[var(--heading)] mb-8 uppercase">Our Core Values (HOPP)</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-[var(--primary)] text-white w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">H</div>
                  <div>
                    <h4 className="text-xl font-bold text-dark-900 mb-2">HONEST</h4>
                    <p className="text-gray-600 font-medium">Transparent communication and straightforward information about your fire safety needs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[var(--primary)] text-white w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">O</div>
                  <div>
                    <h4 className="text-xl font-bold text-dark-900 mb-2">OPEN</h4>
                    <p className="text-gray-600 font-medium">Maintaining open lines of communication throughout every project.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[var(--primary)] text-white w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">P</div>
                  <div>
                    <h4 className="text-xl font-bold text-dark-900 mb-2">PROFESSIONAL</h4>
                    <p className="text-gray-600 font-medium">Over 15 years of experience with unmatched expertise in fire protection.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[var(--primary)] text-white w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">P</div>
                  <div>
                    <h4 className="text-xl font-bold text-dark-900 mb-2">PASSIONATE</h4>
                    <p className="text-gray-600 font-medium">Fire safety is more than just a job – it's our mission to protect people and properties.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Our Services
            </div>
            <h2 className="text-4xl lg:text-6xl text-[var(--heading)] mb-6 font-bold">
              COMPREHENSIVE FIRE
              <br />PROTECTION SERVICES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We specialize in providing a range of high-quality fire protection services to customers in London and the surrounding areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fire Risk Assessments */}
            <Link href="/services/fire-risk-assessments" className="group">
              <div className="bg-white p-10 hover:shadow-2xl transition-all h-full border-l-4 border-[var(--primary)]">
                <div className="bg-[var(--primary)] p-4 inline-block mb-6">
                  <FileCheck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-dark-900 mb-4 uppercase group-hover:text-[var(--primary)] transition-colors">
                  Fire Risk Assessments
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  Commercial or non-domestic property are required by law to have one carried out.
                </p>
                <span className="inline-flex items-center text-[var(--primary)] font-bold uppercase tracking-wide">
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Fire Stopping */}
            <Link href="/services/fire-stopping" className="group">
              <div className="bg-white p-10 hover:shadow-2xl transition-all h-full border-l-4 border-[var(--primary)]">
                <div className="bg-[var(--primary)] p-4 inline-block mb-6">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-dark-900 mb-4 uppercase group-hover:text-[var(--primary)] transition-colors">
                  Fire Stopping
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  Creating a barrier to prevent the spread of fire and smoke through a building.
                </p>
                <span className="inline-flex items-center text-[var(--primary)] font-bold uppercase tracking-wide">
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Fire Doors */}
            <Link href="/services/fire-doors" className="group">
              <div className="bg-white p-10 hover:shadow-2xl transition-all h-full border-l-4 border-[var(--primary)]">
                <div className="bg-[var(--primary)] p-4 inline-block mb-6">
                  <DoorClosed className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-dark-900 mb-4 uppercase group-hover:text-[var(--primary)] transition-colors">
                  Fire Doors
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  A door that has been designed to withstand fire and prevent the spread of flames and smoke.
                </p>
                <span className="inline-flex items-center text-[var(--primary)] font-bold uppercase tracking-wide">
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Fire Dampers */}
            <Link href="/services/fire-dampers" className="group">
              <div className="bg-white p-10 hover:shadow-2xl transition-all h-full border-l-4 border-[var(--primary)]">
                <div className="bg-[var(--primary)] p-4 inline-block mb-6">
                  <Wind className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-dark-900 mb-4 uppercase group-hover:text-[var(--primary)] transition-colors">
                  Fire Dampers
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                  A device that prevents the spread of fire and smoke through ventilation systems.
                </p>
                <span className="inline-flex items-center text-[var(--primary)] font-bold uppercase tracking-wide">
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl mb-6 font-bold">
              READY TO PROTECT
              <br />YOUR PROPERTY?
            </h2>
            <p className="text-2xl text-gray-300 mb-8 font-medium">
              Get in touch with our team today to discuss your fire protection needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-dark-800 p-8 border-t-4 border-[var(--primary)]">
              <MapPin className="h-12 w-12 text-[var(--primary)] mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-3 uppercase">Location</h3>
              <p className="text-gray-300 font-medium">45-55 Commercial Street<br />London, E1 6BD</p>
            </div>

            <div className="bg-dark-800 p-8 border-t-4 border-[var(--primary)]">
              <Phone className="h-12 w-12 text-[var(--primary)] mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-3 uppercase">Phone</h3>
              <a href="tel:02035762292" className="text-gray-300 hover:text-[var(--accent)] transition-colors font-bold text-lg">
                020 3576 2292
              </a>
            </div>

            <div className="bg-dark-800 p-8 border-t-4 border-[var(--primary)]">
              <Mail className="h-12 w-12 text-[var(--primary)] mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-3 uppercase">Email</h3>
              <a href="mailto:info@fyrup.co.uk" className="text-gray-300 hover:text-[var(--accent)] transition-colors font-medium break-all">
                info@fyrup.co.uk
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-[var(--primary)] text-white px-12 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-2xl"
            >
              Get Free Quote
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
