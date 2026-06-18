export default function PrivacyPolicy() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-blue">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Privacy Policy</h1>
        
        <div className="text-gray-700 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
          <p>At L.N. Pathology, we collect personal information that you provide to us when booking a test or filling out our contact forms. This may include your name, phone number, email address, physical address, age, gender, and relevant medical history necessary for the tests.</p>

          <h2 className="text-xl font-semibold text-gray-900">2. Use of Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide and manage your diagnostic testing services.</li>
            <li>To communicate with you regarding your appointments, sample collection, and reports.</li>
            <li>To improve our services and user experience on our website.</li>
            <li>To comply with legal and regulatory medical requirements.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900">3. Data Security and Confidentiality</h2>
          <p>Your medical reports and personal data are strictly confidential. We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. Only authorized personnel have access to your health records.</p>

          <h2 className="text-xl font-semibold text-gray-900">4. Sharing of Information</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only with your consent, or when required by law, such as reporting certain communicable diseases to government health authorities.</p>

          <h2 className="text-xl font-semibold text-gray-900">5. Contact Us</h2>
          <p>If you have any questions or concerns about our Privacy Policy, please contact us at info@lnpathology.com or call us at +91 88158 32425.</p>
        </div>
      </div>
    </div>
  );
}
