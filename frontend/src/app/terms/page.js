export default function Terms() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-blue">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Terms and Conditions</h1>
        
        <div className="text-gray-700 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
          <p>By accessing and using the L.N. Pathology website and our services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>

          <h2 className="text-xl font-semibold text-gray-900">2. Medical Disclaimer</h2>
          <p>The content provided on this website, including test descriptions and health packages, is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician regarding any medical condition.</p>

          <h2 className="text-xl font-semibold text-gray-900">3. Booking and Reports</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Turnaround times for reports are estimates and may vary due to technical reasons.</li>
            <li>Reports can be downloaded from the website using the Patient ID and Registered Mobile Number provided during sample collection.</li>
            <li>In case of home collection, please ensure you are available at the scheduled time.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900">4. Pricing and Payment</h2>
          <p>All prices listed on the website are subject to change without prior notice. Payment must be completed at the time of sample collection or at the lab reception.</p>

          <h2 className="text-xl font-semibold text-gray-900">5. Limitation of Liability</h2>
          <p>L.N. Pathology shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our services or website.</p>
        </div>
      </div>
    </div>
  );
}
