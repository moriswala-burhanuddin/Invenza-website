import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] py-20 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-3xl mx-auto space-y-10 text-[#475569] dark:text-[#94A3B8]">
        
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-8 mb-8">
          <Link to="/" className="text-[#2563EB] hover:underline font-medium mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl font-black text-[#0F172A] dark:text-white font-['Outfit']">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4">Last Updated: September 2026</p>
        </div>

        {/* 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Invenza ERP platform ("Service"), you ("Customer", "you", "your") agree to be bound by these Terms and Conditions ("Terms"). These Terms constitute a legally binding agreement between you and Invenza ("Company", "we", "us", "our"). If you do not agree with any part of these Terms, you must not access or use the Service.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use the Service. By using the Service on behalf of a business or entity, you represent and warrant that you have the authority to bind that entity to these Terms.
          </p>
        </section>

        {/* 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age and capable of forming a binding contract under applicable law to use this Service. By using the Service, you represent and warrant that you meet these eligibility requirements.
          </p>
        </section>

        {/* 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">3. Enterprise License</h2>
          <p>
            Subject to your compliance with these Terms and your payment of the applicable subscription fee (currently £500 per year), Invenza grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the ERP software solely for your internal business operations during the subscription term.
          </p>
          <p>
            This license does not include the right to: (a) sublicense, resell, distribute, or make the Service available to any third party; (b) modify, adapt, or create derivative works of the Service; (c) reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code of the Service; or (d) use the Service to build a competing product.
          </p>
        </section>

        {/* 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Invenza and its licensors. The Service is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Invenza.
          </p>
        </section>

        {/* 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">5. Customer Data Ownership</h2>
          <p>
            You retain all right, title, and interest in and to your data ("Customer Data"). Invenza claims no ownership over the financial, inventory, CRM, or other business data you input, process, or store through our systems. We process Customer Data solely as described in our <Link to="/privacy-policy" className="text-[#2563EB] hover:underline font-medium">Privacy Policy</Link> and, where applicable, our <Link to="/data-processing-agreement" className="text-[#2563EB] hover:underline font-medium">Data Processing Agreement</Link>.
          </p>
        </section>

        {/* 6 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">6. Subscription, Billing &amp; Refunds</h2>
          <p>
            Your subscription is governed by our <Link to="/billing-policy" className="text-[#2563EB] hover:underline font-medium">Subscription &amp; Billing Policy</Link> and our <Link to="/cancellation-policy" className="text-[#2563EB] hover:underline font-medium">Cancellation &amp; Refund Policy</Link>, which are incorporated into these Terms by reference. Key terms include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Annual subscription fee of £500, billed upfront for a 12-month term.</li>
            <li>Automatic renewal unless cancelled before the renewal date.</li>
            <li>Annual subscription fees are non-refundable once activated.</li>
            <li>No prorated refunds for cancellation during an active annual term.</li>
          </ul>
        </section>

        {/* 7 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">7. Disclaimer of Warranties</h2>
          <p className="uppercase font-semibold text-[#0F172A] dark:text-white text-sm">
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
          </p>
          <p>
            To the fullest extent permitted by applicable law, Invenza disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.
          </p>
          <p>
            Invenza does not warrant that: (a) the Service will function uninterrupted, secure, or available at any particular time or location; (b) any errors or defects will be corrected; (c) the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements.
          </p>
          <p>
            You acknowledge that the Service is ERP software used for business operations, and Invenza is not responsible for any business decisions made based on data processed through the Service.
          </p>
        </section>

        {/* 8 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">8. Limitation of Liability</h2>
          <p className="uppercase font-semibold text-[#0F172A] dark:text-white text-sm">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW:
          </p>
          <p>
            In no event shall Invenza, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, loss of data, loss of use, loss of goodwill, business interruption, or other intangible losses, resulting from: (a) your access to or use of or inability to access or use the Service; (b) any conduct or content of any third party on the Service; (c) any content obtained from the Service; or (d) unauthorized access, use, or alteration of your transmissions or content.
          </p>
          <p>
            <strong>In no event shall Invenza's total cumulative liability to you for all claims arising out of or relating to these Terms or the Service exceed the amount you have actually paid to Invenza in the twelve (12) months immediately preceding the event giving rise to the claim.</strong>
          </p>
          <p>
            The limitations of this section apply regardless of the legal theory on which the claim is based, whether in contract, tort (including negligence), strict liability, or otherwise, and even if Invenza has been advised of the possibility of such damage.
          </p>
        </section>

        {/* 9 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Invenza and its licensors, employees, contractors, agents, officers, and directors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to legal fees) arising from: (a) your use of and access to the Service; (b) your violation of any term of these Terms; (c) your violation of any third-party right, including without limitation any intellectual property, privacy, or proprietary right; or (d) any claim that your Customer Data caused damage to a third party.
          </p>
        </section>

        {/* 10 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">10. Account Suspension &amp; Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
          </p>
          <p>
            Grounds for termination include but are not limited to: (a) violation of these Terms or our <Link to="/acceptable-use" className="text-[#2563EB] hover:underline font-medium">Acceptable Use Policy</Link>; (b) request by law enforcement or government agencies; (c) unexpected technical or security issues; (d) extended periods of inactivity; (e) non-payment of subscription fees.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may do so by cancelling your subscription through the dashboard. Termination does not entitle you to a refund.
          </p>
        </section>

        {/* 11 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">11. Force Majeure</h2>
          <p>
            Invenza shall not be liable for any failure or delay in performing its obligations under these Terms where such failure or delay results from any cause that is beyond the reasonable control of Invenza, including but not limited to: acts of God, flood, fire, earthquake, pandemic, governmental actions, war, terrorism, cyber-attacks, denial-of-service attacks, Internet service provider failures, power outages, or any other force majeure event.
          </p>
        </section>

        {/* 12 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">12. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. You agree that any legal action or proceeding arising out of or relating to these Terms or the Service shall be brought exclusively in the courts of England and Wales, and you irrevocably submit to the personal jurisdiction of such courts.
          </p>
        </section>

        {/* 13 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">13. Dispute Resolution</h2>
          <p>
            Before initiating any formal legal proceedings, you agree to first attempt to resolve any dispute informally by contacting us at <strong>support@invenza.co.uk</strong>. We will attempt to resolve the dispute informally within 30 days. If the dispute is not resolved within 30 days, either party may proceed with formal proceedings as permitted under these Terms.
          </p>
          <p>
            You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
          </p>
        </section>

        {/* 14 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">14. Modifications to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect, either by email or by posting a prominent notice on our website. What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
        </section>

        {/* 15 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">15. Severability &amp; Entire Agreement</h2>
          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
          </p>
          <p>
            These Terms, together with the Privacy Policy, Subscription &amp; Billing Policy, Cancellation &amp; Refund Policy, Acceptable Use Policy, Data Processing Agreement, Service Level Agreement, and Cookie Policy, constitute the entire agreement between you and Invenza regarding the Service, and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the subject matter.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4 border-t border-[#E2E8F0] dark:border-[#1E293B] pt-8">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-['Outfit']">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <strong>support@invenza.co.uk</strong>.
          </p>
        </section>

        {/* Related Policies */}
        <section className="bg-[#F8FAFC] dark:bg-[#0F172A] rounded-2xl p-6 border border-[#E2E8F0] dark:border-[#1E293B]">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-4">Related Policies</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/privacy-policy" className="text-sm text-[#2563EB] hover:underline font-medium">Privacy Policy</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/billing-policy" className="text-sm text-[#2563EB] hover:underline font-medium">Billing Policy</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/cancellation-policy" className="text-sm text-[#2563EB] hover:underline font-medium">Cancellation &amp; Refund</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/acceptable-use" className="text-sm text-[#2563EB] hover:underline font-medium">Acceptable Use</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/cookie-policy" className="text-sm text-[#2563EB] hover:underline font-medium">Cookie Policy</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/sla" className="text-sm text-[#2563EB] hover:underline font-medium">Service Level Agreement</Link>
            <span className="text-[#CBD5E1]">•</span>
            <Link to="/data-processing-agreement" className="text-sm text-[#2563EB] hover:underline font-medium">Data Processing Agreement</Link>
          </div>
        </section>

      </div>
    </div>
  );
}
