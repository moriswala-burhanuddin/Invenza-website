import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-10 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Privacy Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        {/* Intro */}
        <section className="space-y-4">
          <p>
            Invenza ("Company", "we", "us", "our") is committed to protecting the privacy and security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ERP platform and website (collectively, the "Service"). This policy is compliant with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
        </section>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Data Controller</h2>
          <p>
            Invenza is the data controller responsible for your personal data. If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at <strong>privacy@invenza.co.uk</strong>.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Information We Collect</h2>
          <p>We collect the following categories of personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, company name, phone number, and password when you register.</li>
            <li><strong>Billing Information:</strong> Payment method details processed securely by Stripe. We do not store your full card number on our servers.</li>
            <li><strong>Business Data:</strong> Inventory, CRM, financial, and operational data you input into the ERP system ("Customer Data").</li>
            <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent on pages, and other diagnostic data.</li>
            <li><strong>Cookies:</strong> Small data files placed on your device. See our <Link to="/cookie-policy" className="text-[#2563EB] hover:underline font-medium">Cookie Policy</Link> for details.</li>
          </ul>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Lawful Basis for Processing</h2>
          <p>Under UK GDPR, we process your personal data on the following lawful bases:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Performance of Contract (Article 6(1)(b)):</strong> Processing necessary to provide you with the Service under your subscription agreement.</li>
            <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> Fraud prevention, system security, analytics to improve the Service, and direct marketing to existing customers.</li>
            <li><strong>Legal Obligation (Article 6(1)(c)):</strong> Compliance with tax, accounting, and regulatory requirements.</li>
            <li><strong>Consent (Article 6(1)(a)):</strong> Where you have given explicit consent, such as for marketing communications or non-essential cookies. You may withdraw consent at any time.</li>
          </ul>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, maintain, and improve the Service.</li>
            <li>To process your subscription and billing transactions.</li>
            <li>To send you service-related communications (billing reminders, security alerts, system updates).</li>
            <li>To detect, prevent, and address fraud and security issues.</li>
            <li>To comply with legal obligations.</li>
            <li>To send marketing communications (only with your consent, and you can opt out at any time).</li>
          </ul>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Data Sharing &amp; Third-Party Processors</h2>
          <p>
            We do not sell, rent, or trade your personal data. We share data only with the following trusted sub-processors, each bound by strict data processing agreements:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Sub-Processor</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                <tr><td className="px-4 py-3">Stripe</td><td className="px-4 py-3">Payment processing</td><td className="px-4 py-3">USA (EU SCCs)</td></tr>
                <tr><td className="px-4 py-3">Hosting Provider (VPS)</td><td className="px-4 py-3">Server infrastructure</td><td className="px-4 py-3">UK/EU</td></tr>
                <tr><td className="px-4 py-3">Email Service Provider</td><td className="px-4 py-3">Transactional emails</td><td className="px-4 py-3">UK/EU</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">6. International Data Transfers</h2>
          <p>
            Where your data is transferred outside the UK or European Economic Area (EEA) — for example, to Stripe's servers in the United States — we ensure that appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner's Office (ICO) or the EU Commission.
          </p>
        </section>

        {/* 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">7. Data Retention</h2>
          <p>We retain your personal data for the following periods:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Data:</strong> For the duration of your active subscription, plus 90 days after account closure to allow for reactivation.</li>
            <li><strong>Customer Data (ERP Data):</strong> For the duration of your subscription. Upon account closure, Customer Data will be deleted within 90 days unless you request earlier deletion or a data export.</li>
            <li><strong>Billing Records:</strong> For 7 years after the transaction, as required by UK tax and accounting regulations (HMRC).</li>
            <li><strong>Usage &amp; Analytics Data:</strong> Anonymised and aggregated data may be retained indefinitely for analytics purposes.</li>
          </ul>
        </section>

        {/* 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">8. Your Rights Under UK GDPR</h2>
          <p>Under the UK GDPR, you have the following rights. To exercise any of these rights, please contact us at <strong>privacy@invenza.co.uk</strong>.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right of Access (Article 15):</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification (Article 16):</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure (Article 17):</strong> Request deletion of your personal data ("right to be forgotten"), subject to legal retention requirements.</li>
            <li><strong>Right to Data Portability (Article 20):</strong> Request a machine-readable export of your data.</li>
            <li><strong>Right to Restrict Processing (Article 18):</strong> Request that we limit processing of your data in certain circumstances.</li>
            <li><strong>Right to Object (Article 21):</strong> Object to processing based on legitimate interests, including direct marketing.</li>
            <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, withdraw your consent at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p>
            We will respond to all valid requests within 30 days. In complex cases, we may extend this by a further 60 days, and we will notify you of any such extension.
          </p>
        </section>

        {/* 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">9. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit (TLS/SSL) and at rest.</li>
            <li>Secure password hashing using industry-standard algorithms.</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>Restricted access controls — only authorised personnel can access personal data.</li>
            <li>Database backups with encrypted storage.</li>
          </ul>
          <p>
            While we strive to protect your data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee its absolute security.
          </p>
        </section>

        {/* 10 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">10. Data Breach Notification</h2>
          <p>
            In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Notify the UK Information Commissioner's Office (ICO) within 72 hours of becoming aware of the breach.</li>
            <li>Notify affected individuals without undue delay if the breach is likely to result in a high risk to their rights and freedoms.</li>
            <li>Document all breaches, including the facts, effects, and remedial actions taken.</li>
          </ul>
        </section>

        {/* 11 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">11. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies. For detailed information about which cookies we use and how to manage them, please see our <Link to="/cookie-policy" className="text-[#2563EB] hover:underline font-medium">Cookie Policy</Link>.
          </p>
        </section>

        {/* 12 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">12. Children's Privacy</h2>
          <p>
            Our Service is not intended for use by anyone under the age of 18. We do not knowingly collect personal data from children under 18. If we become aware that we have collected personal data from a child under 18, we will take steps to delete that information immediately.
          </p>
        </section>

        {/* 13 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">13. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Where required by law, we will also notify you via email. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        {/* 14 */}
        <section className="space-y-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">14. Complaints</h2>
          <p>
            If you are not satisfied with our response to your privacy concern, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">ico.org.uk</a></li>
            <li>Telephone: 0303 123 1113</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="space-y-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">Contact Us</h2>
          <p>
            Data Protection Officer: <strong>privacy@invenza.co.uk</strong><br/>
            General Support: <strong>support@invenza.co.uk</strong>
          </p>
        </section>

      </div>
    </div>
  );
}
