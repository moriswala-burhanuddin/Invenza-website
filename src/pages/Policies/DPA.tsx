import { Link } from 'react-router-dom';

export default function DPA() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-10 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Data Processing Agreement (DPA)
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        <section className="space-y-4 bg-[#EFF6FF] dark:bg-[#1E293B]/50 rounded-xl p-6 border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm">
            This Data Processing Agreement ("DPA") forms part of the agreement between Invenza ("Processor", "we", "us") and the Customer ("Controller", "you") for the provision of the Invenza ERP platform. This DPA is entered into to ensure compliance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and any successor legislation.
          </p>
          <p className="text-sm">
            By using the Invenza ERP platform, you acknowledge and agree that you are the Data Controller of any personal data that you or your authorised users input into the system, and that Invenza acts as the Data Processor of such data on your behalf.
          </p>
        </section>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person that the Controller inputs into the Service.</li>
            <li><strong>"Processing"</strong> means any operation performed on Personal Data, including collection, recording, storage, retrieval, use, transmission, erasure, or destruction.</li>
            <li><strong>"Sub-Processor"</strong> means any third party engaged by the Processor to process Personal Data on behalf of the Controller.</li>
            <li><strong>"Data Breach"</strong> means a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Data.</li>
          </ul>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Scope &amp; Purpose of Processing</h2>
          <p>The Processor shall process Personal Data only for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing the Invenza ERP platform and related features.</li>
            <li>Storing and managing Customer Data (inventory, CRM records, invoices, financial data) as directed by the Controller through use of the Service.</li>
            <li>Processing billing and subscription transactions via Stripe.</li>
            <li>Sending service-related communications (billing reminders, security alerts).</li>
          </ul>
          <p>
            The categories of data subjects include the Controller's employees, customers, suppliers, and business contacts whose data is entered into the ERP system. The types of personal data processed may include names, email addresses, phone numbers, addresses, financial transaction data, and any other data fields used within the ERP.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Obligations of the Processor</h2>
          <p>The Processor shall:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process Personal Data only on documented instructions from the Controller, unless required to do so by UK law.</li>
            <li>Ensure that persons authorised to process Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.</li>
            <li>Implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including encryption, access controls, and regular security testing.</li>
            <li>Not engage another processor (sub-processor) without prior specific or general written authorisation of the Controller. In the case of general written authorisation, the Processor shall inform the Controller of any intended changes and give the Controller the opportunity to object.</li>
            <li>Assist the Controller in fulfilling its obligations to respond to data subject rights requests (access, rectification, erasure, portability, restriction, objection).</li>
            <li>Assist the Controller in ensuring compliance with data breach notification obligations.</li>
            <li>At the choice of the Controller, delete or return all Personal Data to the Controller after the end of the provision of services, and delete existing copies unless UK law requires storage of the Personal Data.</li>
            <li>Make available to the Controller all information necessary to demonstrate compliance with this DPA and allow for and contribute to audits.</li>
          </ul>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. Obligations of the Controller</h2>
          <p>The Controller shall:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ensure that it has a valid lawful basis for providing Personal Data to the Processor.</li>
            <li>Ensure that data subjects have been informed about the processing and their rights.</li>
            <li>Be solely responsible for the accuracy, quality, and legality of the Personal Data provided to the Processor.</li>
            <li>Promptly notify the Processor if it becomes aware of any data protection issues related to the Service.</li>
          </ul>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Sub-Processors</h2>
          <p>The Controller provides general authorisation for the Processor to engage the following sub-processors:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-[#0F172A]">
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Sub-Processor</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Processing Activity</th>
                  <th className="text-left px-4 py-3 font-semibold text-[#0F172A] dark:text-white">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                <tr><td className="px-4 py-3">Stripe, Inc.</td><td className="px-4 py-3">Payment processing</td><td className="px-4 py-3">USA (EU SCCs)</td></tr>
                <tr><td className="px-4 py-3">Cloud Hosting Provider</td><td className="px-4 py-3">Server infrastructure &amp; data storage</td><td className="px-4 py-3">UK/EU</td></tr>
                <tr><td className="px-4 py-3">Email Service Provider</td><td className="px-4 py-3">Transactional email delivery</td><td className="px-4 py-3">UK/EU</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The Processor will notify the Controller at least 30 days before adding or replacing any sub-processor. The Controller may object to such changes. If the Controller objects and the Processor cannot reasonably accommodate the objection, the Controller may terminate the agreement.
          </p>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">6. Data Breach Notification</h2>
          <p>
            In the event of a Data Breach, the Processor shall:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Notify the Controller without undue delay, and in any event within <strong>48 hours</strong> of becoming aware of the breach.</li>
            <li>Provide the Controller with sufficient information to enable the Controller to meet its own notification obligations to the ICO (within 72 hours) and to affected data subjects.</li>
            <li>Cooperate with the Controller and take reasonable commercial steps to assist in the investigation, mitigation, and remediation of the breach.</li>
          </ul>
        </section>

        {/* 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">7. International Transfers</h2>
          <p>
            The Processor shall not transfer Personal Data outside the UK or EEA unless: (a) the transfer is to a country with an adequacy decision; or (b) appropriate safeguards are in place, such as UK-approved Standard Contractual Clauses (SCCs) or Binding Corporate Rules.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">8. Data Retention &amp; Deletion</h2>
          <p>
            Upon termination or expiry of the subscription, the Controller may request a full export of their data within 90 days. After this 90-day period, the Processor will securely delete all Personal Data, except where retention is required by UK law (e.g., billing records retained for 7 years under HMRC requirements).
          </p>
        </section>

        {/* 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">9. Security Measures</h2>
          <p>The Processor implements and maintains the following technical and organisational measures:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Strong password hashing using industry-standard algorithms (bcrypt/Argon2).</li>
            <li>Role-based access controls with principle of least privilege.</li>
            <li>Regular security vulnerability scanning and patching.</li>
            <li>Daily encrypted backups with 30-day retention.</li>
            <li>Firewall and network intrusion detection systems.</li>
            <li>Employee security training and confidentiality agreements.</li>
          </ul>
        </section>

        {/* 10 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">10. Duration &amp; Termination</h2>
          <p>
            This DPA shall remain in effect for the duration of the Processor's processing of Personal Data on behalf of the Controller. It shall automatically terminate when the Processor no longer processes Personal Data on behalf of the Controller, subject to the data retention and deletion obligations above.
          </p>
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
