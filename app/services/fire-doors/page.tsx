import Link from 'next/link';
import { DoorClosed, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Fire Doors | Fyrup',
  description: 'Professional fire door installation, inspection, and maintenance in London. Ensuring your fire doors meet all safety standards.',
};

export default function FireDoorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-primary-600 p-4 inline-block mb-6">
                <DoorClosed className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
                FIRE
                <br />DOORS
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                A door that has been designed to withstand fire and prevent the spread of flames and smoke.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
              >
                Get Fire Door Service
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>

            <div className="bg-white p-10 border-l-8 border-primary-600 shadow-xl">
              <h3 className="text-3xl font-bold text-dark-900 mb-8 uppercase">Why Fire Doors Matter</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Contain fire and smoke</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Protect escape routes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Save lives and property</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Legal requirement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Insurance compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fire Door */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
              About Fire Doors
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 mb-6 font-bold uppercase">What is a Fire Door?</h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
            <p>
              A fire door is a specially constructed door designed to resist the spread of fire and smoke between 
              separate compartments of a building. Fire doors are a critical part of a building's passive fire 
              protection system and are essential for protecting escape routes and containing fires.
            </p>
            <p>
              Fire doors must be able to withstand fire for a specified period (typically 30 or 60 minutes, denoted 
              as FD30 or FD60) and should close automatically when released. They're constructed with fire-resistant 
              materials and include essential components such as intumescent seals, appropriate hinges, and self-closing devices.
            </p>
            <p className="font-bold text-dark-900 text-lg">
              Properly installed and maintained fire doors are essential for building safety and are required by law 
              in most commercial and multi-occupancy residential buildings.
            </p>
          </div>
        </div>
      </section>

      {/* Our Fire Door Services */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
              Our Services
            </div>
            <h2 className="text-4xl lg:text-6xl text-dark-900 mb-6 font-bold uppercase">Fire Door Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Comprehensive fire door solutions from inspection to installation and maintenance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 border-l-4 border-primary-600">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Fire Door Inspections</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Comprehensive inspections to ensure your fire doors meet all regulatory requirements and are 
                functioning correctly.
              </p>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Visual inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Component checks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Detailed reporting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Certification</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-primary-600">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Fire Door Installation</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Professional installation of certified fire doors to specification, ensuring compliance with 
                building regulations.
              </p>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>FD30 & FD60 doors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Certified products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>All components included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Full documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-primary-600">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Maintenance & Repair</h3>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Ongoing maintenance and repair services to keep your fire doors in optimal working condition.
              </p>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Seal replacement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Closer adjustment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Hardware repair</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 font-bold mr-3">•</span>
                  <span>Remedial works</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fire Door Components */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
              Components
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 font-bold uppercase">Essential Fire Door Components</h2>
          </div>
          
          <div className="bg-white p-10 border-l-8 border-primary-600">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Fire-rated door leaf and frame</strong>
                  <p className="text-gray-600 mt-1 font-medium">Certified to resist fire for specified duration (FD30/FD60)</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Intumescent seals</strong>
                  <p className="text-gray-600 mt-1 font-medium">Expand when heated to seal gaps and prevent smoke passage</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Self-closing device</strong>
                  <p className="text-gray-600 mt-1 font-medium">Ensures the door closes automatically when released</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Appropriate hinges</strong>
                  <p className="text-gray-600 mt-1 font-medium">Fire-rated hinges (usually 3 per door) to support the door weight</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Latch</strong>
                  <p className="text-gray-600 mt-1 font-medium">Keeps door securely closed when not in use</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Certification label</strong>
                  <p className="text-gray-600 mt-1 font-medium">Identifies the door's fire rating and certification</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-dark-900 font-bold">Appropriate glazing (if applicable)</strong>
                  <p className="text-gray-600 mt-1 font-medium">Fire-rated glass with appropriate fire resistance</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Warning Box */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary-600 p-10 text-white">
            <div className="flex items-start">
              <AlertCircle className="h-10 w-10 text-white mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-3xl font-bold mb-6 uppercase">Important: Fire Door Maintenance</h3>
                <p className="mb-6 font-medium">
                  Fire doors must be inspected regularly (at least every 6 months) to ensure they remain effective. 
                  Common issues that compromise fire door performance include:
                </p>
                <ul className="space-y-3 font-medium">
                  <li className="flex items-start">
                    <span className="font-bold mr-3 text-xl">•</span>
                    <span>Doors wedged or propped open</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-3 text-xl">•</span>
                    <span>Damaged or missing seals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-3 text-xl">•</span>
                    <span>Faulty or missing self-closers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-3 text-xl">•</span>
                    <span>Gaps around the door</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-3 text-xl">•</span>
                    <span>Damaged door leaves or frames</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Ensure Your Fire Doors Work</h2>
          <p className="text-2xl text-gray-300 mb-10 font-medium">
            Get professional fire door inspection, installation, and maintenance services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
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
