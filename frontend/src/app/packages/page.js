import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Health Packages | L.N. Pathology',
  description: 'Book comprehensive full body checkups and health packages at L.N. Pathology Gorakhpur at affordable prices.',
};

const packages = [
  { name: 'Basic Health Package', price: 1499, description: 'Essential tests to monitor your general health status.', tests: ['Complete Blood Count (CBC)', 'Blood Sugar Fasting', 'Lipid Profile (Cholesterol)', 'Urine Routine & Microscopy'] },
  { name: 'Executive Health Package', price: 2999, description: 'A detailed overview of major organ functions for working professionals.', tests: ['All tests in Basic Health Package', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Thyroid Profile (T3, T4, TSH)'] },
  { name: 'Senior Citizen Package', price: 3499, description: 'Specially designed screening for age-related health issues.', tests: ['All tests in Executive Health Package', 'Vitamin D (Bone Health)', 'Vitamin B12 (Nerve Health)', 'HbA1c (3-month average blood sugar)'] },
  { name: 'Full Body Checkup', price: 4999, description: 'The most comprehensive total body health evaluation.', tests: ['All tests in Senior Citizen Package', 'Iron Profile', 'Serum Electrolytes', 'Uric Acid', 'Calcium'] },
];

export default function Packages() {
  return (
    <div className="py-16 bg-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Packages</h1>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Preventive healthcare is the best care. Choose from our curated full body checkup packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
              <div className="bg-[var(--primary)] p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-3">{pkg.name}</h2>
                <p className="text-blue-100 text-sm mb-4">{pkg.description}</p>
                <div className="text-4xl font-extrabold">₹{pkg.price}</div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">Includes the following tests:</h3>
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.tests.map((test, tidx) => (
                    <li key={tidx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{test}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/book-test?package=${encodeURIComponent(pkg.name)}`} 
                  className="w-full text-center bg-[var(--secondary)] text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
