import { Link } from 'react-router-dom';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-10 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Cookie Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <p>
            This Cookie Policy explains how Invenza ("Company", "we", "us", "our") uses cookies and similar technologies when you visit our website or use our ERP platform. This policy should be read together with our <Link to="/privacy-policy" className="text-[#2563EB] hover:underline font-medium">Privacy Policy</Link>.
          </p>
        </section>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners information about how their site is being used.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Cookie Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">access_token</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium">Strictly Necessary</span></td>
                  <td className="px-4 py-3">Authenticates your session and keeps you logged in.</td>
                  <td className="px-4 py-3">2 hours</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">refresh_token</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium">Strictly Necessary</span></td>
                  <td className="px-4 py-3">Refreshes your authentication token securely.</td>
                  <td className="px-4 py-3">7 days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">theme</td>
                  <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-medium">Functional</span></td>
                  <td className="px-4 py-3">Remembers your light/dark mode preference.</td>
                  <td className="px-4 py-3">Persistent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">cookie_consent</td>
                  <td className="px-4 py-3"><span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded text-xs font-medium">Strictly Necessary</span></td>
                  <td className="px-4 py-3">Records your cookie consent preference.</td>
                  <td className="px-4 py-3">365 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Types of Cookies</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Strictly Necessary Cookies:</strong> These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions made by you, such as logging in or setting your privacy preferences. You can set your browser to block these cookies, but some parts of the site will not work.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalisation, such as remembering your display preferences. If you do not allow these cookies, some features may not function properly.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. We currently do not use third-party analytics cookies. If we introduce them in the future, we will update this policy and request your consent.
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. Managing Cookies</h2>
          <p>
            When you first visit our website, you will be presented with a cookie consent banner. You can accept or decline non-essential cookies at that time. You can also manage your cookie preferences at any time by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Adjusting your browser settings to refuse cookies or alert you when cookies are being sent.</li>
            <li>Clearing your browser's cookie storage to remove all stored cookies.</li>
          </ul>
          <p>
            Please note that if you disable strictly necessary cookies, you may not be able to use certain features of the Service, such as logging into your account.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">Contact Us</h2>
          <p>
            For questions about this Cookie Policy, contact <strong>privacy@invenza.co.uk</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
