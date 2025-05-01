import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
    return (
        <div className="bg-gray-700 text-white py-4 flex justify-center">
            <div className="max-w-6xl w-full bg-gray-900 p-3 rounded-2xl">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Our Privacy Policy</h1>

                <div className="bg-gray-900 rounded-2xl shadow-lg p-8 max-h-[76vh] overflow-y-auto border border-blue-500 scrollbar-hide">
                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Introduction</h2>
                        <p className="text-gray-300">
                            Welcome to our blog. We respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you engage with our website.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Information We Collect</h2>
                        <p className="text-gray-300">
                            We collect information that you voluntarily provide, such as your name, email address, and any messages or comments you leave. Additionally, we may collect technical data including your IP address, browser type, device details, and pages visited, to improve our service.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">How We Use Your Information</h2>
                        <p className="text-gray-300">
                            Your data is used to:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Personalize your user experience</li>
                                <li>Improve our content and website functionality</li>
                                <li>Send relevant updates, newsletters, and offers (only if you opt-in)</li>
                                <li>Respond to your queries and feedback</li>
                                <li>Ensure website security and prevent misuse</li>
                            </ul>
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Cookies & Tracking</h2>
                        <p className="text-gray-300">
                            We use cookies and similar tracking technologies to understand your behavior and preferences, and to enhance your overall experience. You may disable cookies through your browser settings at any time.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Third-Party Services</h2>
                        <p className="text-gray-300">
                            We may work with third-party partners who assist us in operating our blog, conducting our business, or serving our users. These trusted partners are required to keep your information confidential and use it only for the services they provide to us.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Our Role in Your Privacy</h2>
                        <p className="text-gray-300">
                            As content providers, our responsibility is to protect your privacy by ensuring transparency, ethical data use, and your right to control your information. We never sell or misuse your data and continuously evaluate our practices to align with data protection laws.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Data Security</h2>
                        <p className="text-gray-300">
                            We implement technical and organizational measures to secure your data against unauthorized access, loss, or theft. However, please note that no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Your Rights</h2>
                        <p className="text-gray-300">
                            You have the right to access, correct, or delete your personal data. If you have any concerns or wish to exercise your rights, please contact us via our support email or contact form.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Consent</h2>
                        <p className="text-gray-300">
                            By using our website, you consent to our privacy policy and the processing of your data as described herein.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-300 mb-2">Policy Updates</h2>
                        <p className="text-gray-300">
                            We may revise this Privacy Policy periodically. Any changes will be reflected on this page with the updated date. We recommend checking this page regularly to stay informed.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-300 mt-2">Contact Us</h2>
                        <p className="text-gray-300">
                            If you have any questions about this policy, please contact us at:{" "}
                            <span className="text-blue-400 underline">support@skblog.com</span>
                        </p>
                    </section>
                    <Link className="text-blue-400" to='/'>read more...</Link>
                    <p className="text-sm text-gray-500 mt-7">Last updated: April 5, 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
