import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">L.N. <span className="text-[var(--secondary)]">Pathology</span></span>
            </div>
            <p className="text-sm">
              Your trusted partner for accurate and timely pathology tests in Gorakhpur. NABL standards, modern equipment, and experienced staff.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">All Tests</Link></li>
              <li><Link href="/packages" className="hover:text-white transition-colors">Health Packages</Link></li>
              <li><Link href="/home-collection" className="hover:text-white transition-colors">Home Collection</Link></li>
              <li><Link href="/reports" className="hover:text-white transition-colors">Download Reports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-[var(--primary)] flex-shrink-0" />
                <span>BS Complex, Opp. Petrol Pump, Basharatpur, Gorakhpur, UP 273004</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-[var(--primary)]" />
                <a href="tel:+918815832425" className="hover:text-white transition-colors">+91 88158 32425</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[var(--primary)]" />
                <a href="mailto:info@lnpathology.com" className="hover:text-white transition-colors">info@lnpathology.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Opening Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span>Mon - Sat:</span>
                <span>7:00 AM - 9:00 PM</span>
              </li>
              <li className="flex items-center justify-between border-b border-gray-700 pb-2">
                <span>Sunday:</span>
                <span>8:00 AM - 2:00 PM</span>
              </li>
              <li className="mt-4">
                <Link href="/book-test" className="inline-block w-full text-center bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} L.N. Pathology. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
