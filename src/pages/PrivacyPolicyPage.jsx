import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicyPage = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-5xl font-playfair text-offwhite mb-8">Privacy Policy</h1>
                    <div className="glassmorphism rounded-xl p-8 space-y-6 text-dimmed leading-relaxed">
                        <p className="text-sm text-dimmed">Last updated: January 22, 2026</p>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">1. Information We Collect</h2>
                            <p>
                                We collect information you provide directly to us, including when you create an account, enroll in courses,
                                use our carbon calculator, book appointments, or contact us for support.
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Personal information (name, email, phone number)</li>
                                <li>Organization details</li>
                                <li>Carbon footprint calculation data</li>
                                <li>Course progress and completion data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">2. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process your transactions and send related information</li>
                                <li>Send you technical notices and support messages</li>
                                <li>Respond to your comments and questions</li>
                                <li>Provide personalized content and recommendations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">3. Information Sharing</h2>
                            <p>
                                We do not sell your personal information. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>With your consent</li>
                                <li>To comply with legal obligations</li>
                                <li>With service providers who assist in our operations</li>
                                <li>In connection with a merger, sale, or acquisition</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">4. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information
                                against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">5. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to processing of your data</li>
                                <li>Export your data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">6. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please contact us at:<br />
                                Email: privacy@sustainsutra.in<br />
                                Phone: +91-8742939191
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
