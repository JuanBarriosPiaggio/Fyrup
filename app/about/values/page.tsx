import Link from 'next/link';
import { Heart, Users, Award, Flame, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Our Values - HOPP | Fyrup',
    description: 'Learn about Fyrup\'s core values: Honest, Open, Professional, and Passionate. These principles guide everything we do in fire protection.',
};

export default function ValuesPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                        Our Foundation
                    </div>
                    <h1 className="text-6xl lg:text-7xl text-white mb-6 font-bold uppercase">
                        OUR VALUES
                    </h1>
                    <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
                        HOPP - The principles that guide everything we do at Fyrup
                    </p>
                </div>
            </section>

            {/* HOPP Values */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                            Core Values
                        </div>
                        <h2 className="text-4xl lg:text-6xl text-dark-900 mb-8 font-bold uppercase">HOPP: Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                            Our core values of HOPP (Honest, Open, Professional, and Passionate) set us apart from other fire protection companies.
                            These principles are not just words – they're the foundation of how we work with every client.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Honest */}
                        <div className="bg-white p-10 border-l-8 border-primary-600 shadow-lg hover:shadow-2xl transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Heart className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-4xl font-bold text-dark-900 mb-6 uppercase">
                                Honest
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                We believe in complete transparency with our clients. From our initial assessments to our final reports,
                                we provide honest, straightforward information about your fire safety needs. We never oversell services
                                you don't need, and we always give you the facts you need to make informed decisions about your property's safety.
                            </p>
                        </div>

                        {/* Open */}
                        <div className="bg-white p-10 border-l-8 border-primary-600 shadow-lg hover:shadow-2xl transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Users className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-4xl font-bold text-dark-900 mb-6 uppercase">
                                Open
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Communication is key to successful fire protection. We maintain open lines of communication throughout
                                every project, ensuring you're always informed about our progress, findings, and recommendations.
                                Our team is always available to answer your questions and address your concerns promptly and thoroughly.
                            </p>
                        </div>

                        {/* Professional */}
                        <div className="bg-white p-10 border-l-8 border-primary-600 shadow-lg hover:shadow-2xl transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Award className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-4xl font-bold text-dark-900 mb-6 uppercase">
                                Professional
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                With over 15 years of experience in the industry, our team brings unmatched expertise to every project.
                                We stay current with all fire safety regulations and industry best practices. Our work is thorough,
                                meticulous, and always meets the highest professional standards. You can count on us to deliver
                                exceptional results, every time.
                            </p>
                        </div>

                        {/* Passionate */}
                        <div className="bg-white p-10 border-l-8 border-primary-600 shadow-lg hover:shadow-2xl transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Flame className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-4xl font-bold text-dark-900 mb-6 uppercase">
                                Passionate
                            </h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Fire safety is more than just a job for us – it's our passion. We genuinely care about protecting
                                people and properties from fire hazards. This passion drives us to go above and beyond for every client,
                                ensuring that your property receives the comprehensive protection it deserves. Your safety is our mission.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why It Matters */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                            The Difference
                        </div>
                        <h2 className="text-4xl lg:text-5xl text-dark-900 mb-8 font-bold uppercase">Why HOPP Matters</h2>
                    </div>
                    <div className="bg-gray-100 p-10 border-l-8 border-primary-600">
                        <p className="text-gray-600 leading-relaxed text-lg mb-6 font-medium">
                            In an industry where safety is paramount, our values aren't just nice to have – they're essential.
                            They ensure that every fire risk assessment is thorough, every fire door is inspected meticulously,
                            every fire stopping installation meets the highest standards, and every fire damper test is conducted properly.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg font-medium">
                            When you work with Fyrup, you're not just hiring a contractor – you're partnering with a team that
                            genuinely cares about your safety and is committed to delivering excellence in every aspect of fire protection.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Experience The HOPP Difference</h2>
                    <p className="text-2xl text-gray-300 mb-10 font-medium">
                        Partner with a fire protection company that puts integrity and excellence first.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
                        >
                            Get In Touch
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
