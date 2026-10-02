import { Link } from 'react-router-dom';

export default function AcceptableUse() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-10 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Acceptable Use Policy
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4">
          <p>
            This Acceptable Use Policy ("AUP") governs your use of the Invenza ERP platform. This AUP is incorporated by reference into our <Link to="/terms" className="text-[#2563EB] hover:underline font-medium">Terms &amp; Conditions</Link>. Violation of this AUP may result in suspension or termination of your account.
          </p>
        </section>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Permitted Use</h2>
          <p>
            Invenza ERP is intended exclusively for legitimate business operations including, but not limited to, inventory management, customer relationship management (CRM), invoicing, order processing, financial reporting, and other standard ERP functions. You agree to use the Service only for lawful purposes and in accordance with all applicable local, national, and international laws and regulations.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Prohibited Activities</h2>
          <p>You agree NOT to use the Service to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Store, transmit, or distribute any content that is unlawful, harmful, threatening, abusive, defamatory, obscene, or otherwise objectionable.</li>
            <li>Conduct or facilitate fraudulent transactions, money laundering, or any financial crime.</li>
            <li>Store or process data in violation of data protection laws (e.g., UK GDPR, PECR) or without proper legal basis.</li>
            <li>Attempt to reverse engineer, decompile, disassemble, or otherwise derive the source code of the Service.</li>
            <li>Attempt to gain unauthorised access to the Service, other accounts, computer systems, or networks connected to the Service.</li>
            <li>Introduce viruses, trojans, worms, logic bombs, or other harmful material.</li>
            <li>Use the Service for competitive benchmarking or to build a competing product.</li>
            <li>Scrape, data mine, or systematically extract data from the Service for purposes other than your own business use.</li>
            <li>Exceed reasonable usage limits or intentionally overload the Service infrastructure.</li>
            <li>Impersonate another person or entity, or falsely state or misrepresent your affiliation with a person or entity.</li>
            <li>Use the Service to send unsolicited commercial communications (spam) through any integrated features.</li>
          </ul>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Data Isolation &amp; Multi-Tenancy</h2>
          <p>
            Invenza operates a multi-tenant architecture. Your data is logically isolated from other customers' data. You agree not to attempt to access, view, or manipulate data belonging to other tenants. Any attempt to circumvent tenant isolation is a serious violation and will result in immediate account termination and may be reported to law enforcement.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. API &amp; Integration Usage</h2>
          <p>
            If you use Invenza's APIs or integrations, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respect rate limits and not make excessive API calls that could degrade service performance.</li>
            <li>Keep API credentials secure and not share them with unauthorised parties.</li>
            <li>Not use APIs to circumvent security controls, subscription limits, or access restrictions.</li>
          </ul>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Consequences of Violation</h2>
          <p>
            Invenza reserves the right to investigate any suspected violations of this AUP. Upon confirmation of a violation, we may, at our sole discretion:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Warning:</strong> Issue a written warning for minor or first-time violations.</li>
            <li><strong>Temporary Suspension:</strong> Suspend your account while the investigation is ongoing.</li>
            <li><strong>Permanent Termination:</strong> Terminate your account without refund for serious or repeated violations.</li>
            <li><strong>Legal Action:</strong> Report illegal activities to the relevant law enforcement authorities and cooperate fully with any resulting investigation.</li>
          </ul>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">6. Reporting Violations</h2>
          <p>
            If you become aware of any violation of this AUP, please report it immediately to <strong>abuse@invenza.co.uk</strong>. We take all reports seriously and will investigate promptly.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">Contact Us</h2>
          <p>
            For questions about this Acceptable Use Policy, contact <strong>support@invenza.co.uk</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
