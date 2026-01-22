'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        // Simulate form submission
        setTimeout(() => {
            setFormStatus('success');
            // Reset form
            (e.target as HTMLFormElement).reset();
            // Reset status after 5 seconds
            setTimeout(() => setFormStatus('idle'), 5000);
        }, 1000);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                        Let's Talk
                    </div>
                    <h1 className="text-6xl lg:text-7xl text-white mb-6 font-bold uppercase">
                        GET IN TOUCH
                    </h1>
                    <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
                        We're here to answer your questions and provide expert fire protection services.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Phone className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-dark-900 mb-3 uppercase">Phone</h3>
                            <a href="tel:02035762292" className="text-2xl font-bold text-dark-900 hover:text-primary-600 transition-colors">
                                020 3576 2292
                            </a>
                            <p className="text-gray-600 mt-2 text-sm font-medium">Mon - Fri, 9am - 6pm</p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <Mail className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-dark-900 mb-3 uppercase">Email</h3>
                            <a href="mailto:info@fyrup.co.uk" className="text-lg font-medium text-dark-900 hover:text-primary-600 transition-colors break-all">
                                info@fyrup.co.uk
                            </a>
                            <p className="text-gray-600 mt-2 text-sm font-medium">We'll respond within 24 hours</p>
                        </div>

                        <div className="bg-white p-8 border-l-4 border-primary-600 text-center hover:shadow-lg transition-all">
                            <div className="bg-primary-600 p-4 inline-block mb-6">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-dark-900 mb-3 uppercase">Address</h3>
                            <p className="text-gray-700 font-medium">
                                45-55 Commercial Street<br />
                                London, E1 6BD
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Contact Form */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                            Contact Form
                        </div>
                        <h2 className="text-4xl lg:text-5xl text-dark-900 mb-6 font-bold uppercase">Send Us a Message</h2>
                        <p className="text-xl text-gray-600 font-medium">
                            Fill out the form below and we'll get back to you with a quote as soon as possible.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-gray-100 p-10 border-l-8 border-primary-600 shadow-lg">
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                    Property Address *
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                    Service Needed *
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                >
                                    <option value="">Select a service...</option>
                                    <option value="fire-risk-assessment">Fire Risk Assessment</option>
                                    <option value="fire-stopping">Fire Stopping</option>
                                    <option value="fire-doors">Fire Doors</option>
                                    <option value="fire-dampers">Fire Dampers</option>
                                    <option value="multiple">Multiple Services</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="propertyType" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                    Property Type *
                                </label>
                                <select
                                    id="propertyType"
                                    name="propertyType"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                >
                                    <option value="">Select property type...</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="residential">Residential</option>
                                    <option value="industrial">Industrial</option>
                                    <option value="mixed-use">Mixed Use</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-dark-900 mb-2 uppercase">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    placeholder="Please provide details about your fire protection needs..."
                                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none text-dark-900 bg-white font-medium"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-primary-600 text-white px-8 py-5 text-lg font-bold uppercase hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-xl"
                            >
                                {formStatus === 'submitting' ? (
                                    'SENDING...'
                                ) : (
                                    <>
                                        SEND MESSAGE
                                        <Send className="ml-3 h-6 w-6" />
                                    </>
                                )}
                            </button>

                            {formStatus === 'success' && (
                                <div className="bg-green-100 border-l-4 border-green-600 p-4 text-center">
                                    <p className="text-green-800 font-bold">
                                        THANK YOU! YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY. WE'LL GET BACK TO YOU SOON.
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>

                    <p className="text-center text-gray-600 mt-8 text-sm font-medium">
                        * REQUIRED FIELDS | FOR URGENT MATTERS, PLEASE CALL US AT <a href="tel:02035762292" className="font-bold text-primary-600 hover:underline">020 3576 2292</a>
                    </p>
                </div>
            </section>

            {/* Additional Info Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 border-l-8 border-primary-600">
                            <h2 className="text-3xl font-bold text-dark-900 mb-6 uppercase">Why Choose Fyrup?</h2>
                            <ul className="space-y-4 text-gray-600 font-medium">
                                <li className="flex items-start">
                                    <span className="text-primary-600 font-bold mr-3 text-xl">•</span>
                                    <span>Over 15 years of experience in fire protection services</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 font-bold mr-3 text-xl">•</span>
                                    <span>Same-day quotes for all inquiries</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 font-bold mr-3 text-xl">•</span>
                                    <span>Fully certified and compliant with all UK fire safety regulations</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 font-bold mr-3 text-xl">•</span>
                                    <span>Transparent pricing with no hidden fees</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-600 font-bold mr-3 text-xl">•</span>
                                    <span>Dedicated support throughout your project</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-10 border-l-8 border-primary-600">
                            <h2 className="text-3xl font-bold text-dark-900 mb-6 uppercase">What Happens Next?</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-primary-600 text-white flex items-center justify-center font-bold text-xl mr-3">1</div>
                                        <h3 className="font-bold text-dark-900 uppercase">We Review Your Inquiry</h3>
                                    </div>
                                    <p className="text-gray-600 ml-13 font-medium">Our team carefully reviews your requirements and property details.</p>
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-primary-600 text-white flex items-center justify-center font-bold text-xl mr-3">2</div>
                                        <h3 className="font-bold text-dark-900 uppercase">We Prepare Your Quote</h3>
                                    </div>
                                    <p className="text-gray-600 ml-13 font-medium">We create a detailed, transparent quote tailored to your specific needs.</p>
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-primary-600 text-white flex items-center justify-center font-bold text-xl mr-3">3</div>
                                        <h3 className="font-bold text-dark-900 uppercase">We Get Started</h3>
                                    </div>
                                    <p className="text-gray-600 ml-13 font-medium">Once approved, we schedule and complete your fire protection services efficiently.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
