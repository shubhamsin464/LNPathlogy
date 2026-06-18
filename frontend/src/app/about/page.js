import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us | L.N. Pathology',
  description: 'Learn about L.N. Pathology, the most trusted diagnostic center in Gorakhpur providing accurate and timely reports.',
};

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About L.N. Pathology</h1>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Committed to providing high-quality, accurate, and affordable diagnostic services to the people of Gorakhpur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden shadow-xl border border-gray-200">
             <img src="/lab_edited.png" alt="L.N. Pathology Laboratory Building" className="w-full h-full object-cover" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Established with the core belief that accurate diagnosis is the first step towards effective treatment, L.N. Pathology has grown to become Gorakhpur's most trusted diagnostic center. We use state-of-the-art technology and strictly adhere to NABL guidelines to ensure that every report is precise and reliable.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our team of experienced pathologists, skilled technicians, and dedicated support staff work round the clock to deliver seamless healthcare services, including our popular free home sample collection.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Values</h3>
            <ul className="space-y-3">
              {[
                'Uncompromising Quality & Accuracy',
                'Patient-Centric Approach',
                'Affordable Healthcare for All',
                'Continuous Technological Upgradation',
                'Ethical Medical Practices'
              ].map((value, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
