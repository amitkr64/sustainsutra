import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const TermsOfServicePage = () => {
    const { t } = useTranslation();
    return (
        <>
            <Helmet>
                <title>Terms of Service | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy pt-16 pb-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-5xl font-playfair text-offwhite mb-8">{t('legal.termsTitle', 'Terms of Service')}</h1>
                    <div className="glassmorphism rounded-xl p-8 space-y-6 text-dimmed leading-relaxed">
                        <p className="text-sm text-dimmed">Last updated: January 22, 2026</p>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using SustainSutra's services, you accept and agree to be bound by these Terms of Service.
                                These terms are issued by SustainSutra GreenTech LLP, a limited liability partnership registered in India.
                                If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">2. Services Description</h2>
                            <p>
                                SustainSutra GreenTech LLP provides environmental, sustainability and climate consulting and technology
                                services — including ESG advisory; GHG accounting, verification support and decarbonisation strategy;
                                water, energy and waste audits; water, wastewater, solid waste and plastic waste management advisory;
                                circular economy and resource efficiency services; environmental law and regulatory compliance advisory;
                                carbon markets, carbon credits and climate finance advisory; green skills training and capacity building;
                                software and digital platforms; and technical testing and analysis services.
                                We reserve the right to modify, suspend, or discontinue any service at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">3. User Accounts</h2>
                            <p>You are responsible for:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                                <li>Providing accurate and complete information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">4. Intellectual Property</h2>
                            <p>
                                All content, features, and functionality of our services are owned by SustainSutra GreenTech LLP and are protected
                                by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">5. Payment Terms</h2>
                            <p>
                                For paid services, you agree to pay all fees as described at the time of purchase.
                                All payments are non-refundable unless otherwise stated.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">6. Limitation of Liability</h2>
                            <p>
                                SustainSutra shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                                resulting from your use of our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">7. Contact Information</h2>
                            <p>
                                For questions about these Terms of Service, contact us at:<br />
                                Email: legal@sustainsutra.in<br />
                                Phone: +91-8742939191
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfServicePage;
