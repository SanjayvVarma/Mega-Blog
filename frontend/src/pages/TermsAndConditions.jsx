import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-700 text-white py-4 flex justify-center">
      <div className="max-w-6xl w-full bg-gray-900 p-3 rounded-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">
          Terms and Conditions
        </h1>

        <div className="bg-gray-900 rounded-2xl shadow-lg p-8 max-h-[76vh] overflow-y-auto border border-blue-500 scrollbar-hide">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to SKBlog. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our site.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">2. Use of the Platform</h2>
            <ul className="list-disc pl-5 mt-2 text-gray-300">
              <li>You must be at least 15 years old to use SKBlog.</li>
              <li>Do not post illegal, abusive, or harmful content.</li>
              <li>Respect other users and their opinions.</li>
              <li>You are responsible for the content you post.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">3. Intellectual Property</h2>
            <p className="text-gray-300">
              All content, trademarks, and logos on SKBlog are either owned by us or licensed. You may not copy, reuse, or distribute them without written permission.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">4. Termination</h2>
            <p className="text-gray-300">
              We reserve the right to suspend or delete your account if you violate these terms or misuse our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">5. Limitation of Liability</h2>
            <p className="text-gray-300">
              We are not liable for any loss or damage resulting from your use of the platform. Content is for informational purposes only.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">6. Changes to These Terms</h2>
            <p className="text-gray-300">
              We may update these Terms from time to time. Continued use of the platform after changes implies your acceptance of the new terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">7. User Accounts and Security</h2>
            <p className="text-gray-300">
              You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use. We are not liable for any loss or damage from your failure to comply.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">8. Privacy Policy</h2>
            <p className="text-gray-300">
              Your use of the platform is also governed by our{" "}
              <Link to="/privacy" className="text-blue-400 underline">Privacy Policy</Link>, which outlines how we collect, use, and protect your personal data.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">9. Third-Party Links and Services</h2>
            <p className="text-gray-300">
              SKBlog may contain links to third-party websites or services that we do not control. We are not responsible for their content or practices. Use them at your own risk.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">10. Governing Law</h2>
            <p className="text-gray-300">
              These Terms are governed by the laws of India. Any disputes arising from these Terms will be handled in the appropriate courts of Madhya Pradesh.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">11. Feedback and Suggestions</h2>
            <p className="text-gray-300">
              Any feedback or suggestions you provide may be used without obligation to compensate you. By submitting feedback, you grant us the right to use it in any form.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">12. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at:{" "}
              <span className="text-blue-400 underline">support@skblog.com</span>
            </p>
          </section>

          <Link className="text-blue-400 mt-2 inline-block" to="/register">Return to REGISTRATION</Link>
          <p className="text-sm text-gray-500 mt-5">Last updated: June 18, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
