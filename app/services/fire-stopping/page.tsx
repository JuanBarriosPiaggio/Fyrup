import Link from 'next/link';
import { Shield, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Fire Stopping Services | Fyrup',
  description: 'Professional fire stopping services in London. Creating barriers to prevent the spread of fire and smoke through buildings.',
};

export default function FireStoppingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-[var(--primary)] p-4 inline-block mb-6">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
                FIRE
                <br />STOPPING
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                Creating a barrier to prevent the spread of fire and smoke through a building.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-[var(--primary)] text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-2xl"
              >
                Get a Quote
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>

            <div className="bg-white p-10 border-l-8 border-[var(--primary)] shadow-xl">
              <h3 className="text-3xl font-bold text-dark-900 mb-8 uppercase">Why Fire Stopping?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Prevents fire and smoke spread</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Maintains compartmentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Protects escape routes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Regulatory compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Saves lives and property</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is Fire Stopping */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              About Fire Stopping
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 mb-6 font-bold uppercase">What is Fire Stopping?</h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
            <p>
              Fire stopping is the process of sealing openings and joints in fire-resistant walls, floors, and ceilings 
              to prevent the spread of fire and smoke between different compartments of a building. These openings are 
              typically created for services such as cables, pipes, and ventilation ducts.
            </p>
            <p>
              When left unsealed or inadequately sealed, these penetrations can compromise the fire resistance of the 
              structure, allowing fire and toxic smoke to spread rapidly throughout the building. Proper fire stopping 
              ensures that fire-resistant barriers maintain their integrity and continue to protect lives and property.
            </p>
            <p className="font-bold text-dark-900 text-lg">
              Fire stopping is a critical component of passive fire protection and is required by building regulations 
              to ensure the safety of occupants and emergency responders.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Fire Stopping */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Our Solutions
            </div>
            <h2 className="text-4xl lg:text-6xl text-dark-900 mb-6 font-bold uppercase">Types of Fire Stopping</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We provide comprehensive fire stopping solutions for all types of penetrations and joints.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Service Penetrations</h3>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Cable penetrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Pipe penetrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Mixed service penetrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>HVAC duct penetrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Large aperture sealing</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-2xl font-bold text-dark-900 mb-6 uppercase">Linear Joint Seals</h3>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Construction joints</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Control joints</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Perimeter fire barriers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Curtain wall fire stopping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary)] font-bold mr-3 text-xl">•</span>
                  <span>Fire-rated partition sealing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
              Our Process
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 font-bold uppercase">Fire Stopping Process</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xl mr-4">1</div>
                <h3 className="text-xl font-bold text-dark-900 uppercase">Survey & Assessment</h3>
              </div>
              <p className="text-gray-600 ml-16 font-medium">
                We conduct a thorough survey to identify all penetrations and joints requiring fire stopping, 
                assessing the fire resistance requirements for each location.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xl mr-4">2</div>
                <h3 className="text-xl font-bold text-dark-900 uppercase">Material Selection</h3>
              </div>
              <p className="text-gray-600 ml-16 font-medium">
                We select appropriate tested and certified fire stopping materials that meet the required fire 
                resistance ratings for your specific application.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xl mr-4">3</div>
                <h3 className="text-xl font-bold text-dark-900 uppercase">Installation</h3>
              </div>
              <p className="text-gray-600 ml-16 font-medium">
                Our experienced technicians install fire stopping systems in accordance with manufacturer 
                specifications and tested details.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-[var(--primary)]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xl mr-4">4</div>
                <h3 className="text-xl font-bold text-dark-900 uppercase">Documentation</h3>
              </div>
              <p className="text-gray-600 ml-16 font-medium">
                We provide comprehensive documentation including photographs, product datasheets, and 
                certification to demonstrate compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Protect Your Building</h2>
          <p className="text-2xl text-gray-300 mb-10 font-medium">
            Ensure proper fire compartmentation with professional fire stopping services.
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
