import Link from 'next/link';

export const metadata = {
  title: 'Our Tests & Services | L.N. Pathology',
  description: 'Explore the wide range of pathology tests and diagnostic services offered at L.N. Pathology Gorakhpur.',
};

const allTests = [
  { name: 'Complete Blood Count (CBC)', price: 300, desc: 'Measures different parts of your blood, helping diagnose infections, anemia, etc.' },
  { name: 'Thyroid Profile', price: 500, desc: 'Tests T3, T4, and TSH levels to check thyroid gland function.' },
  { name: 'Diabetes Test (HbA1c)', price: 400, desc: 'Average blood sugar over the past 3 months.' },
  { name: 'Lipid Profile', price: 600, desc: 'Measures cholesterol and triglycerides for heart health.' },
  { name: 'Liver Function Test (LFT)', price: 700, desc: 'Checks the health of your liver by measuring proteins, enzymes, and bilirubin.' },
  { name: 'Kidney Function Test (KFT)', price: 700, desc: 'Measures how well your kidneys are working (Urea, Creatinine, etc).' },
  { name: 'Vitamin D', price: 1200, desc: 'Essential for bone health and immune system.' },
  { name: 'Vitamin B12', price: 1000, desc: 'Crucial for nerve function and the production of DNA and red blood cells.' },
  { name: 'Urine Routine & Microscopy', price: 200, desc: 'Checks for urinary tract infections, kidney disease, and diabetes.' },
  { name: 'Iron Profile', price: 800, desc: 'Checks iron levels in your blood to diagnose anemia or iron overload.' },
];

export default function Services() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Pathology Tests</h1>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive menu of high-quality routine and specialized diagnostic tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allTests.map((test, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h2>
                <p className="text-gray-600 text-sm mb-6">{test.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-black text-[var(--primary)]">₹{test.price}</span>
                <Link 
                  href={`/book-test?test=${encodeURIComponent(test.name)}`}
                  className="bg-[var(--secondary)] text-white px-5 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
