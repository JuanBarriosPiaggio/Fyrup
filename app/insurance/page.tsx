import { FileText, Download, Shield } from 'lucide-react';
import Link from 'next/link';

const insuranceDocs = [
  {
    title: 'Employer and Public Liability Insurance',
    filename: '250227 - Fyrup Employer and Public Liabity Insurance exp - 14-03-26.pdf',
    description: 'Comprehensive coverage for employer and public liability',
    expires: '14 March 2026',
  },
  {
    title: 'Professional Indemnity Insurance',
    filename: '250227 - PI Insurance Policy document Exp 14-03-26.pdf',
    description: 'Professional indemnity insurance policy document',
    expires: '14 March 2026',
  },
  {
    title: 'Professional Indemnity - Excess Cover',
    filename: '250327 - PI Insurance Policy Document Excess cover - 14-03-26.pdf',
    description: 'Additional excess cover for professional indemnity',
    expires: '14 March 2026',
  },
];

export const metadata = {
  title: 'Insurance & Certifications | Fyrup',
  description: 'View and download our insurance documents and certifications. Fully insured and certified fire protection services.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function InsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block mb-4 px-6 py-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wider">
            Insurance & Certifications
          </div>
          <h1 className="text-4xl lg:text-6xl text-white mb-6 font-bold uppercase">
            INSURANCE &
            <br />
            <span className="text-[var(--accent)]">CERTIFICATIONS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl font-medium leading-relaxed">
            We maintain comprehensive insurance coverage and industry certifications to protect our clients and ensure the highest standards of service delivery.
          </p>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4 uppercase">Available Documents</h2>
            <p className="text-gray-600 font-medium">
              Click on any document below to view or download. All documents are in PDF format.
            </p>
          </div>

          <div className="grid gap-6">
            {insuranceDocs.map((doc, index) => (
              <div
                key={index}
                className="bg-white p-8 border-l-4 border-[var(--primary)] shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex gap-6 flex-1">
                    <div className="bg-[var(--primary)]/10 p-4 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-10 w-10 text-[var(--primary)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-dark-900 mb-2">{doc.title}</h3>
                      <p className="text-gray-600 mb-3 font-medium">{doc.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-[var(--primary)]" />
                        <span className="font-bold text-dark-900">Valid until: {doc.expires}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/insurance/${encodeURIComponent(doc.filename)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[var(--primary)] text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-md whitespace-nowrap"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-dark-900 mb-8 uppercase">Why Our Insurance Matters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Client Protection</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Our comprehensive insurance coverage ensures that you and your property are fully protected throughout every stage of our work.
              </p>
            </div>
            <div className="bg-gray-50 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Industry Standards</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                We maintain all required certifications and exceed industry standards for fire protection services in the UK.
              </p>
            </div>
            <div className="bg-gray-50 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Peace of Mind</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Work with confidence knowing that we're fully insured and certified by recognized industry bodies.
              </p>
            </div>
            <div className="bg-gray-50 p-8 border-l-4 border-[var(--primary)]">
              <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Compliance</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                All our insurance policies and certifications are kept current to meet legal and regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl text-white mb-6 font-bold uppercase">
            NEED MORE INFORMATION?
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-medium">
            If you have questions about our insurance or certifications, get in touch with our team
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-[var(--primary)] text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-[var(--primary-hover)] transition-all shadow-2xl"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
