import React from 'react';
import { Helmet } from 'react-helmet';

const CookiePolicyPage = () => {
    return (
        <>
            <Helmet>
                <title>Cookie Policy | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy pt-16 pb-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-5xl font-playfair text-offwhite mb-8">Cookie Policy</h1>
                    <div className="glassmorphism rounded-xl p-8 space-y-6 text-dimmed leading-relaxed">
                        <p className="text-sm text-dimmed">Last updated: January 22, 2026</p>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">1. What Are Cookies</h2>
                            <p>
                                Cookies are small text files that are placed on your device when you visit our website.
                                They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">2. How We Use Cookies</h2>
                            <p>We use cookies for the following purposes:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong className="text-offwhite">Essential Cookies:</strong> Required for the website to function properly</li>
                                <li><strong className="text-offwhite">Functional Cookies:</strong> Remember your preferences and settings</li>
                                <li><strong className="text-offwhite">Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                                <li><strong className="text-offwhite">Performance Cookies:</strong> Improve website performance and user experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">3. Third-Party Cookies</h2>
                            <p>
                                We may use third-party services that set cookies on our behalf for analytics and advertising purposes.
                                These third parties have their own privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">4. Managing Cookies</h2>
                            <p>
                                You can control and manage cookies through your browser settings. However, disabling cookies may affect
                                the functionality of our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-playfair text-offwhite mb-4">5. Contact Us</h2>
                            <p>
                                If you have questions about our use of cookies, please contact us at:<br />
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

export default CookiePolicyPage;
