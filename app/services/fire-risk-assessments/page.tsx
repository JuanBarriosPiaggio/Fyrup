import Link from 'next/link';
import { FileCheck, Shield, ClipboardCheck, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Fire Risk Assessments | Fyrup',
  description: 'Professional fire risk assessments for commercial and non-domestic properties in London. Legal compliance guaranteed.',
};

export default function FireRiskAssessmentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-primary-600 p-4 inline-block mb-6">
                <FileCheck className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
                FIRE RISK
                <br />ASSESSMENTS
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                Commercial or non-domestic property are required by law to have one carried out.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
              >
                Request Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>

            <div className="bg-white p-10 border-l-8 border-primary-600 shadow-xl">
              <h3 className="text-3xl font-bold text-dark-900 mb-8 uppercase">Why Fire Risk Assessments?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Legal requirement for all commercial properties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Identifies potential fire hazards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Protects lives and property</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Ensures regulatory compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Reduces insurance premiums</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Requirement */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl text-dark-900 mb-8 font-bold uppercase">A Legal Requirement</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                <p>
                  Under the Regulatory Reform (Fire Safety) Order 2005, all commercial and non-domestic properties 
                  in England and Wales must have a suitable and sufficient fire risk assessment carried out by a 
                  competent person.
                </p>
                <p>
                  This includes offices, shops, warehouses, factories, hotels, residential care homes, schools, 
                  and any other premises where people work or visit. Failure to comply can result in serious 
                  penalties, including unlimited fines and imprisonment.
                </p>
                <p className="font-bold text-dark-900 text-lg">
                  Don't leave your fire safety to chance. Ensure your property is compliant with a professional 
                  fire risk assessment from Fyrup.
                </p>
              </div>
            </div>

            <div className="bg-primary-600 p-10 text-white">
              <AlertTriangle className="h-16 w-16 text-white mb-6" />
              <h3 className="text-3xl font-bold mb-6 uppercase">Non-Compliance Risks</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-xl">•</span>
                  <span className="font-medium">Unlimited fines</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-xl">•</span>
                  <span className="font-medium">Up to 2 years imprisonment</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-xl">•</span>
                  <span className="font-medium">Invalidated insurance claims</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-xl">•</span>
                  <span className="font-medium">Closure of premises</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-xl">•</span>
                  <span className="font-medium">Reputational damage</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3 text-xl">•</span>
                  <span className="font-medium">Risk to life and property</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Assessment Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
              Our Process
            </div>
            <h2 className="text-4xl lg:text-6xl text-dark-900 mb-6 font-bold uppercase">Assessment Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Our comprehensive fire risk assessments follow a systematic approach to ensure nothing is overlooked.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 border-l-4 border-primary-600">
              <div className="bg-primary-600 p-4 inline-block mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">1. Site Inspection</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                We conduct a thorough inspection of your premises, identifying fire hazards, means of escape, 
                fire detection systems, and fire-fighting equipment.
              </p>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-primary-600">
              <div className="bg-primary-600 p-4 inline-block mb-6">
                <ClipboardCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">2. Risk Evaluation</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                We assess the likelihood and potential impact of fire, considering all persons at risk including 
                employees, visitors, and vulnerable individuals.
              </p>
            </div>

            <div className="bg-gray-100 p-8 border-l-4 border-primary-600">
              <div className="bg-primary-600 p-4 inline-block mb-6">
                <FileCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">3. Action Plan</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                You receive a comprehensive report with clear, prioritized recommendations and an action plan 
                to address any identified issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
              Comprehensive Service
            </div>
            <h2 className="text-4xl lg:text-5xl text-dark-900 font-bold uppercase">What's Included</h2>
          </div>
          
          <div className="bg-white p-10 border-l-8 border-primary-600">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Identification of fire hazards</strong> – Sources of ignition, fuel, and oxygen</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">People at risk assessment</strong> – Staff, visitors, contractors, and vulnerable persons</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Evaluation of existing measures</strong> – Fire detection, alarm systems, emergency lighting, and signage</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Means of escape review</strong> – Routes, exits, and emergency procedures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Fire-fighting equipment check</strong> – Extinguishers, hose reels, and sprinkler systems</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Staff training assessment</strong> – Fire safety awareness and emergency procedures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Detailed written report</strong> – With photographs, floor plans, and prioritized recommendations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 font-medium"><strong className="text-dark-900">Action plan</strong> – Clear steps to achieve and maintain compliance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Ensure Your Compliance</h2>
          <p className="text-2xl text-gray-300 mb-10 font-medium">
            Get a professional fire risk assessment from our experienced team.
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
