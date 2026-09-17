import { motion } from 'framer-motion';

export default function TermsPrivacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030308] pt-32 pb-20 px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-8">
          Privacy Policy & Terms
        </h1>

        <div className="prose prose-lg dark:prose-invert text-[#5F6368] dark:text-gray-400">
          <p className="font-medium text-lg text-[#1D1D1F] dark:text-white">
            Invenza ERP is a premium enterprise resource planning software developed and maintained by SYSFOTECH IT SERVICES.
          </p>

          <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mt-10 mb-4">1. Subscription Terms</h2>
          <p>
            Invenza ERP is provided as an annual subscription service. By subscribing to our software, you agree to an annual commitment. Subscription fees are billed annually in advance and are non-refundable after the initial trial or grace period.
          </p>

          <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mt-10 mb-4">2. Software Usage</h2>
          <p>
            SYSFOTECH IT SERVICES grants you a non-exclusive, non-transferable license to use the Invenza ERP software for your internal business operations during the term of your active subscription. You may not reverse engineer, redistribute, or resell the software.
          </p>

          <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mt-10 mb-4">3. Data Privacy</h2>
          <p>
            We take your privacy and data security seriously. SYSFOTECH IT SERVICES collects and processes your data strictly for the purpose of providing you with the ERP services. We employ industry-standard security measures to protect your sensitive business information. We do not sell your data to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mt-10 mb-4">4. Support and Maintenance</h2>
          <p>
            Active annual subscriptions include regular software updates, security patches, and access to technical support. Support is provided according to the tier of your subscription plan.
          </p>

          <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white mt-10 mb-4">5. Modifications to Service</h2>
          <p>
            SYSFOTECH IT SERVICES reserves the right to modify, suspend, or discontinue any part of the service with appropriate notice. We will always strive to ensure a smooth transition and continuous service for our active subscribers.
          </p>
          
          <div className="mt-12 p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
            <p className="text-sm m-0">
              For any questions regarding these terms, please contact our support team.<br />
              &copy; {new Date().getFullYear()} SYSFOTECH IT SERVICES. All rights reserved.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
