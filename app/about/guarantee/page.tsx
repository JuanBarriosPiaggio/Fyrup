import Link from 'next/link';
import { Shield, CheckCircle, Clock, ThumbsUp, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Our Guarantee | Fyrup',
    description: 'Fyrup\'s guarantee of quality, safety, and satisfaction. Learn about our commitment to excellence in fire protection services.',
};

export default function GuaranteePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-6">
                        <Shield className="h-20 w-20 text-primary-600 mx-auto" />
                    </div>
                    <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                        Our Promise
                    </div>
                    <h1 className="text-6xl lg:text-7xl text-white mb-6 font-bold uppercase">
                        OUR GUARANTEE
                    </h1>
                    <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
                        Your safety and satisfaction are our top priorities. Here's our commitment to you.
                    </p>
                </div>
            </section>

            {/* Main Guarantee Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                            Our Commitment
                        </div>
                        <h2 className="text-4xl lg:text-6xl text-dark-900 mb-8 font-bold uppercase">The Fyrup Guarantee</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                            When you choose Fyrup, you're choosing a partner committed to delivering exceptional fire protection
                            services with complete transparency and reliability.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Quality Assurance */}
                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <CheckCircle className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Quality Assurance</h3>
                            <p className="text-gray-600 font-medium">
                                Every service meets the highest industry standards and regulatory requirements.
                            </p>
                        </div>

                        {/* Timely Service */}
                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Clock className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Timely Service</h3>
                            <p className="text-gray-600 font-medium">
                                Same-day quotes and efficient project completion without compromising quality.
                            </p>
                        </div>

                        {/* Expert Team */}
                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <ThumbsUp className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Expert Team</h3>
                            <p className="text-gray-600 font-medium">
                                15+ years of experience with certified professionals dedicated to your safety.
                            </p>
                        </div>

                        {/* Full Support */}
                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Shield className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-900 mb-4 uppercase">Full Support</h3>
                            <p className="text-gray-600 font-medium">
                                Ongoing support and guidance throughout your fire protection journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Commitments */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                            Details
                        </div>
                        <h2 className="text-4xl lg:text-5xl text-dark-900 font-bold uppercase">What You Can Expect</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-100 p-8 border-l-8 border-primary-600 shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Transparent Pricing</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                We believe in complete transparency when it comes to pricing. Our quotes are detailed, comprehensive,
                                and free from hidden fees. You'll know exactly what you're paying for and why, with no surprises along the way.
                            </p>
                        </div>

                        <div className="bg-gray-100 p-8 border-l-8 border-primary-600 shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Comprehensive Reporting</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Every fire risk assessment, inspection, and test comes with detailed, easy-to-understand reporting.
                                Our reports include photographs, clear recommendations, and prioritized action plans to help you maintain
                                compliance and safety.
                            </p>
                        </div>

                        <div className="bg-gray-100 p-8 border-l-8 border-primary-600 shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Certified Materials & Methods</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                We only use certified, tested products and follow manufacturer specifications and industry best practices.
                                Our installations are backed by proper certification and documentation to ensure your building remains compliant
                                and your insurance valid.
                            </p>
                        </div>

                        <div className="bg-gray-100 p-8 border-l-8 border-primary-600 shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Responsive Communication</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Questions? Concerns? We're here to help. Our team responds promptly to calls and emails, and we're always
                                happy to explain our findings, recommendations, and processes in plain language. Your understanding and
                                peace of mind are important to us.
                            </p>
                        </div>

                        <div className="bg-gray-100 p-8 border-l-8 border-primary-600 shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Minimal Disruption</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                We understand your business needs to keep running. Our team works efficiently and professionally to minimize
                                disruption to your operations. We'll coordinate with you to find the best times for surveys, installations,
                                and testing.
                            </p>
                        </div>

                        <div className="bg-gray-100 p-8 border-l-8 border-primary-600 shadow-lg">
                            <h3 className="text-2xl font-bold text-dark-900 mb-4 uppercase">Ongoing Support</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Our relationship doesn't end when the project is complete. We provide ongoing support, annual reminders for
                                required inspections and tests, and are always available to help you maintain your fire protection systems
                                and documentation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Statement */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <Shield className="h-16 w-16 text-primary-600 mx-auto mb-8" />
                    <h2 className="text-3xl lg:text-4xl text-dark-900 mb-6 font-bold uppercase">Our Promise to You</h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                        At Fyrup, we stand behind our work. If something doesn't meet your expectations or our high standards,
                        we'll make it right. Your safety and satisfaction are not just goals – they're guarantees.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Ready To Experience Excellence?</h2>
                    <p className="text-2xl text-gray-300 mb-10 font-medium">
                        Contact us today to learn more about our fire protection services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
                        >
                            Get A Quote
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
