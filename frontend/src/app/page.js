"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, MapPin, Activity, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const popularTests = [
  { name: 'Complete Blood Count (CBC)', price: 300, desc: 'Measures different parts of your blood.' },
  { name: 'Thyroid Profile', price: 500, desc: 'Tests T3, T4, and TSH levels.' },
  { name: 'Diabetes Test (HbA1c)', price: 400, desc: 'Average blood sugar over 3 months.' },
  { name: 'Lipid Profile', price: 600, desc: 'Measures cholesterol and triglycerides.' },
  { name: 'Liver Function Test (LFT)', price: 700, desc: 'Checks health of your liver.' },
  { name: 'Kidney Function Test (KFT)', price: 700, desc: 'Checks health of your kidneys.' },
  { name: 'Vitamin D', price: 1200, desc: 'Essential for bone health.' },
  { name: 'Vitamin B12', price: 1000, desc: 'Crucial for nerve function.' },
];

const packages = [
  { name: 'Basic Health Package', price: 1499, tests: ['CBC', 'Blood Sugar Fasting', 'Lipid Profile', 'Urine Routine'] },
  { name: 'Executive Health Package', price: 2999, tests: ['Basic Health Package', 'LFT', 'KFT', 'Thyroid Profile'] },
  { name: 'Senior Citizen Package', price: 3499, tests: ['Executive Health Package', 'Vitamin D', 'Vitamin B12', 'HbA1c'] },
  { name: 'Full Body Checkup', price: 4999, tests: ['Senior Citizen Package', 'Iron Profile', 'Electrolytes'] },
];

const faqs = [
  { q: 'How can I book a test?', a: 'You can book a test by calling us, using WhatsApp, or filling out the form on our Book Test page.' },
  { q: 'Do you offer home sample collection?', a: 'Yes, we offer free home sample collection within Gorakhpur city limits.' },
  { q: 'How long does it take to get reports?', a: 'Most routine tests are reported within 6-8 hours. Special tests may take 24-48 hours.' },
  { q: 'Can I view my reports online?', a: 'Yes, you can download your reports from our website using your Patient ID and Mobile Number.' },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Premium Glassmorphism Hero Section */}
      <section 
        className="relative bg-cover bg-center py-20 lg:py-32 overflow-hidden"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Trusted Diagnostic Centre in <span className="text-green-400 drop-shadow-md">Gorakhpur</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-100 mb-8 font-medium"
            >
              NABL-style professional pathology testing. Get accurate reports, fast turnaround times, and convenient home sample collection.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/book-test" className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-semibold text-center hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.8)]">
                Book a Test
              </Link>
              <a href="https://wa.me/918815832425?text=Hello,%20I%20would%20like%20to%20book%20a%20lab%20test." target="_blank" rel="noreferrer" className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-all shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Chief Pathologist Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-sm border border-blue-100 flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200"
          >
            <img src="/doctor.jpg" alt="Chief Pathologist" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/256?text=Upload+doctor.jpg' }} />
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Dr. Shachindra Singh Baghel</h2>
            <p className="text-xl text-[var(--primary)] font-medium mb-2">MBBS (KGMU, Lucknow), MD Pathology (BRD Medical College, Gorakhpur)</p>
            <div className="w-16 h-1 bg-[var(--primary)] rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg mb-4">
              With extensive training from prestigious medical institutions and years of experience in clinical pathology, Dr. Shachindra Singh Baghel ensures that every single test result is meticulously verified for 100% accuracy. We believe that behind every sample is a human life, and we treat it with the utmost care and precision.
            </p>
            <p className="text-gray-500 italic">"Accuracy is not just our profession; it's our promise to your health."</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose L.N. Pathology?</h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <CheckCircle className="w-8 h-8 text-green-500" />, title: 'Accurate Reports', desc: 'Precision in every test with high-end equipment.' },
            { icon: <Activity className="w-8 h-8 text-blue-500" />, title: 'Experienced Staff', desc: 'Highly qualified pathologists and technicians.' },
            { icon: <Clock className="w-8 h-8 text-purple-500" />, title: 'Fast Turnaround', desc: 'Quick reporting for timely medical decisions.' },
            { icon: <MapPin className="w-8 h-8 text-red-500" />, title: 'Home Collection', desc: 'Safe and hygienic sample collection from your home.' },
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Tests */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Tests</h2>
              <p className="text-gray-600">Frequently booked routine and special tests</p>
            </div>
            <Link href="/services" className="hidden md:inline-flex text-[var(--primary)] font-medium hover:underline">
              View All Tests &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTests.map((test, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{test.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{test.desc}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                  <span className="font-bold text-[var(--primary)]">₹{test.price}</span>
                  <Link href={`/book-test?test=${encodeURIComponent(test.name)}`} className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md font-medium hover:bg-blue-100 transition-colors">
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/services" className="inline-block bg-[var(--primary)] text-white px-6 py-2 rounded-md font-medium">
              View All Tests
            </Link>
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Health Packages</h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="bg-[var(--primary)] p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-extrabold">₹{pkg.price}</div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.tests.map((test, tidx) => (
                    <li key={tidx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{test}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/book-test?package=${encodeURIComponent(pkg.name)}`} className="w-full block text-center bg-gray-50 border border-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all">
                  Book Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Patients Say</h2>
          <div className="flex justify-center items-center gap-2 mb-10">
            <span className="font-bold text-xl">4.8</span>
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current text-yellow-200" />
            </div>
            <span className="text-gray-600 text-sm">on Google Reviews</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ramesh Singh', text: 'Very clean lab and professional staff. Got my reports on time. Highly recommended.' },
              { name: 'Priya Sharma', text: 'Home collection service was excellent. The phlebotomist was very polite and skilled.' },
              { name: 'Amit Verma', text: 'Affordable health packages and accurate results. Trustworthy diagnostic center.' }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm text-left">
                <div className="flex text-yellow-400 mb-3">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                <div className="font-semibold text-gray-900">- {review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-gray-600 text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
