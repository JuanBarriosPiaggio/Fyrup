import Link from 'next/link';
import { Wind, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Fire Dampers | Fyrup',
  description: 'Professional fire damper installation, inspection, and testing in London. Preventing fire spread through ventilation systems.',
};

export default function FireDampersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-[var(--primary)] p-4 inline-block mb-6">
                <Wind className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
                FIRE
                <br />DAMPERS
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                A device that prevents the spread of fire and smoke through ventilation systems.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-[var(--primary)] text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-2xl"
              >
                Get Fire Damper Service
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>

            <div className="bg-white p-10 border-l-8 border-[var(--primary)] shadow-xl">
              <h3 className="text-3xl font-bold text-dark-900 mb-8 uppercase">Why Fire Dampers?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Prevent fire spread via ducts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Maintain compartmentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Regulatory requirement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Protect building occupants</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Insurance compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fire Damper */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              About Fire Dampers
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 mb-6 font-bold uppercase">What is a Fire Damper?</h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
            <p>
              A fire damper is a passive fire protection device installed within the ductwork of heating, ventilation, 
              and air conditioning (HVAC) systems. Its primary purpose is to prevent the spread of fire and smoke through 
              ventilation ducts that penetrate fire-rated walls, floors, and ceilings.
            </p>
            <p>
              When exposed to high temperatures, the fire damper's fusible link melts, causing the damper blades to close 
              automatically. This creates a barrier that maintains the fire resistance of the building's compartmentation, 
              preventing fire and smoke from spreading to other areas via the ductwork.
            </p>
            <p className="font-bold text-dark-900 text-lg">
              Regular inspection and testing of fire dampers is essential to ensure they operate correctly in an emergency. 
              Building regulations require fire dampers to be tested annually to maintain building safety certification.
            </p>
          </div>
        </div>
      </section>

      {/* Our Fire Damper Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Our Services
            </div>
            <h2 className="text-4xl lg:text-6xl text-dark-900 mb-6 font-bold uppercase">Fire Damper Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Comprehensive fire damper solutions including installation, testing, and maintenance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Fire Damper Testing</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Annual inspection and testing to ensure all fire dampers are operational and comply with 
                building regulations.
              </p>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Visual inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Drop testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Detailed reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Certification</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Installation</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Professional installation of fire dampers in new constructions and retrofit applications.
              </p>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Certified products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Expert installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Compliance guaranteed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Full documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Maintenance & Repair</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Ongoing maintenance to keep fire dampers in optimal working condition and ensure compliance.
              </p>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Cleaning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Repairs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Component replacement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3">•</span>
                  <span>Record keeping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Fire Dampers */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Types
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 font-bold uppercase">Types of Fire Dampers</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Fire Dampers</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Standard fire dampers close automatically when exposed to high temperatures via a fusible link. 
                They are designed to prevent fire spread through ductwork and maintain compartmentation integrity.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Smoke Dampers</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Smoke dampers are designed to prevent smoke migration through ductwork. They are typically 
                motorized and linked to the building's smoke detection system for automatic activation.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Combination Fire/Smoke Dampers</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                These dampers provide both fire and smoke protection in a single unit. They include both 
                fusible links for fire protection and motorized actuators for smoke control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Requirements */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Compliance
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 font-bold uppercase">Testing Requirements</h2>
          </div>
          <div className="bg-gray-100 p-10 border-l-8 border-[var(--primary)]">
            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
              UK building regulations require fire dampers to be tested annually by a competent person. 
              Our testing service includes:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Visual Inspection</strong>
                  <p className="text-gray-600 mt-1 font-medium">Check for damage, corrosion, or obstruction</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Drop Test</strong>
                  <p className="text-gray-600 mt-1 font-medium">Verify the damper closes correctly when the fusible link is released</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Reset and Verification</strong>
                  <p className="text-gray-600 mt-1 font-medium">Reset damper and ensure proper operation</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Documentation</strong>
                  <p className="text-gray-600 mt-1 font-medium">Comprehensive report and certification for building compliance</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Schedule Your Fire Damper Test</h2>
          <p className="text-2xl text-gray-300 mb-10 font-medium">
            Ensure your fire dampers are compliant with annual testing and maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-[var(--primary)] text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-2xl"
            >
              Request a Quote
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
            <a 
              href="tel:02035762292" 
              className="inline-flex items-center justify-center border-4 border-white text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-white hover:text-dark-900 transition-all"
            >
              Call 020 3576 2292
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
