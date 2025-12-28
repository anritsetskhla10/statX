export const PrivacyContent = () => {
  return (
    <section className="pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card-bg border border-border-color rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-text-muted leading-relaxed">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-text-main">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, update your profile, or use our analytics features. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (Name, Email, Password)</li>
              <li>Uploaded data (Excel files, CSVs) for processing</li>
              <li>Usage data and interaction with dashboard features</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-text-main">2. How We Use Your Data</h2>
            <p>
              We use the collected data primarily to provide the StatX services. We do not sell your personal data to third parties. Your data is used to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generate analytics and AI insights</li>
              <li>Improve platform performance and security</li>
              <li>Send administrative information (updates, security alerts)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-text-main">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, or unauthorized disclosure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-text-main">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@statx.com" className="text-primary hover:underline">privacy@statx.com</a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};