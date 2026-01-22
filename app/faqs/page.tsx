'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
    {
        category: 'Fire Risk Assessments',
        questions: [
            {
                question: 'What is a fire risk assessment?',
                answer: 'A fire risk assessment is a systematic evaluation of your premises to identify fire hazards, people at risk, and evaluate existing fire safety measures. It\'s a legal requirement for all commercial and non-domestic properties under the Regulatory Reform (Fire Safety) Order 2005.'
            },
            {
                question: 'How often should a fire risk assessment be carried out?',
                answer: 'Fire risk assessments should be reviewed regularly, typically annually, or whenever there are significant changes to the premises, its use, or the people using it. High-risk premises may require more frequent assessments.'
            },
            {
                question: 'Who can carry out a fire risk assessment?',
                answer: 'Fire risk assessments must be carried out by a "competent person" - someone with sufficient training, experience, and knowledge. At Fyrup, our team has over 15 years of experience and follows all relevant guidance and standards.'
            },
            {
                question: 'What happens if I don\'t have a fire risk assessment?',
                answer: 'Failure to have a suitable and sufficient fire risk assessment can result in enforcement action by fire authorities, including prohibition notices, unlimited fines, and up to 2 years imprisonment. It also puts lives at risk and may invalidate your insurance.'
            }
        ]
    },
    {
        category: 'Fire Doors',
        questions: [
            {
                question: 'How often should fire doors be inspected?',
                answer: 'Fire doors should be inspected at least every 6 months according to current guidance. However, fire doors in high-traffic areas or critical locations may require more frequent inspection. Your fire risk assessment should specify the required frequency.'
            },
            {
                question: 'What makes a fire door effective?',
                answer: 'An effective fire door requires all components working together: fire-resistant door leaf and frame, intumescent seals, smoke seals, self-closing device, correct hinges (minimum 3), appropriate latches/locks, and proper installation. If any component is missing or damaged, the door may fail.'
            },
            {
                question: 'Can I prop open a fire door?',
                answer: 'Fire doors should never be propped open unless fitted with an automatic release mechanism connected to the fire alarm system. Propping open fire doors defeats their purpose and is a serious fire safety violation.'
            },
            {
                question: 'Do all doors need to be fire doors?',
                answer: 'Not all doors need to be fire doors. Fire doors are required in specific locations to maintain fire compartmentation and protect escape routes. Your fire risk assessment will identify which doors need to be fire doors.'
            }
        ]
    },
    {
        category: 'Fire Stopping',
        questions: [
            {
                question: 'What is fire stopping?',
                answer: 'Fire stopping is the sealing of openings and joints in fire-resistant walls, floors, and ceilings to prevent the spread of fire and smoke. It involves using specialized materials to seal penetrations made by cables, pipes, ducts, and other services.'
            },
            {
                question: 'Why is fire stopping important?',
                answer: 'Fire stopping maintains the integrity of fire compartmentation. Without proper fire stopping, gaps and penetrations provide a pathway for fire and smoke to spread rapidly through the building, defeating the purpose of fire-resistant construction.'
            },
            {
                question: 'How long does fire stopping last?',
                answer: 'When properly installed using quality materials, fire stopping should last many years. However, it should be inspected regularly, especially after any building works or service installations, to ensure it remains intact and effective.'
            },
            {
                question: 'Can I do fire stopping myself?',
                answer: 'Fire stopping must be installed correctly following manufacturer\'s tested systems and specifications. Improper installation can render it ineffective. We recommend using experienced professionals who understand the materials and installation requirements.'
            }
        ]
    },
    {
        category: 'Fire Dampers',
        questions: [
            {
                question: 'What is a fire damper?',
                answer: 'A fire damper is a device installed in HVAC ductwork where it passes through fire-resistant walls or floors. It contains a fusible link that melts in high temperatures (typically 72°C), causing blades to close and prevent fire and smoke from spreading through the ventilation system.'
            },
            {
                question: 'How often should fire dampers be tested?',
                answer: 'Fire dampers must be tested annually by a competent person according to BS 9999:2017 and Building Regulations. This testing must be documented with records kept for inspection by fire authorities.'
            },
            {
                question: 'What happens during a fire damper test?',
                answer: 'Testing involves visual inspection of the damper, a drop test to ensure it closes correctly, checking the fusible link, and resetting the damper. The inspector provides a detailed report and certification upon completion.'
            },
            {
                question: 'Can a building be occupied if fire dampers fail testing?',
                answer: 'Failed fire dampers are a serious fire safety issue. Building owners must take immediate action to repair or replace failed dampers. Occupancy decisions depend on the specific circumstances and should be made in consultation with fire safety professionals and authorities.'
            }
        ]
    },
    {
        category: 'General',
        questions: [
            {
                question: 'What areas does Fyrup serve?',
                answer: 'Fyrup provides fire protection services throughout London and the surrounding areas. Contact us to discuss your specific location and requirements.'
            },
            {
                question: 'How quickly can you provide a quote?',
                answer: 'We pride ourselves on providing same-day quotes. Once you submit your inquiry with the necessary details, our team will prepare and send you a detailed quote, typically within the same business day.'
            },
            {
                question: 'Are your services compliant with current regulations?',
                answer: 'Yes, all our services fully comply with current UK fire safety regulations, including the Regulatory Reform (Fire Safety) Order 2005, Building Regulations Approved Document B, and relevant British Standards. Our team stays updated with all regulatory changes.'
            },
            {
                question: 'Do you provide emergency services?',
                answer: 'While we primarily work on scheduled assessments and installations, we understand fire safety issues can be urgent. Contact us at 020 3576 2292 to discuss your specific situation and timeframes.'
            },
            {
                question: 'What makes Fyrup different from other fire protection companies?',
                answer: 'Our HOPP values (Honest, Open, Professional, Passionate) set us apart. With over 15 years of experience, we combine technical expertise with genuine care for our clients\' safety. We provide transparent pricing, clear communication, and services that consistently exceed expectations.'
            }
        ]
    }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b-2 border-gray-300 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <span className="text-lg font-bold text-dark-900 pr-8 uppercase">{question}</span>
                <ChevronDown
                    className={`h-6 w-6 text-primary-600 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            {isOpen && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed font-medium">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function FAQsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-dark-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider">
                        Support
                    </div>
                    <h1 className="text-6xl lg:text-7xl text-white mb-6 font-bold uppercase">
                        FREQUENTLY ASKED QUESTIONS
                    </h1>
                    <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
                        Find answers to common questions about our fire protection services.
                    </p>
                </div>
            </section>

            {/* FAQs Content */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {faqs.map((category, idx) => (
                            <div key={idx}>
                                <div className="mb-6">
                                    <div className="inline-block px-6 py-2 bg-primary-600 text-white text-sm font-bold uppercase tracking-wider mb-2">
                                        {category.category}
                                    </div>
                                    <h2 className="text-3xl font-bold text-dark-900 uppercase">{category.category}</h2>
                                </div>
                                <div className="bg-white border-l-8 border-primary-600 overflow-hidden shadow-lg">
                                    {category.questions.map((faq, faqIdx) => (
                                        <FAQItem key={faqIdx} question={faq.question} answer={faq.answer} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-100 p-12 text-center border-l-8 border-primary-600 shadow-lg">
                        <h2 className="text-4xl lg:text-5xl text-dark-900 mb-6 font-bold uppercase">Still Have Questions?</h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
                            Can't find the answer you're looking for? Our friendly team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
                            >
                                Contact Us
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Link>
                            <a
                                href="tel:02035762292"
                                className="inline-flex items-center justify-center border-4 border-dark-900 text-dark-900 px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-dark-900 hover:text-white transition-all"
                            >
                                Call 020 3576 2292
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl lg:text-6xl mb-8 font-bold uppercase">Ready to Get Started?</h2>
                    <p className="text-2xl text-gray-300 mb-10 font-medium">
                        Let us help you with professional fire protection services.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 text-lg font-bold uppercase tracking-wide hover:bg-primary-700 transition-all shadow-2xl"
                    >
                        Request a Quote
                        <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
