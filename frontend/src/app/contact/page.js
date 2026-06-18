"use client";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className="py-16">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We are here to help. Reach out to us via phone, email, or visit our center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Map */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="w-6 h-6 text-[var(--primary)] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Lab Location</h3>
                    <p className="text-gray-600 mt-1">BS Complex, Opp. Petrol Pump, Basharatpur, Gorakhpur, Uttar Pradesh 273004</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-6 h-6 text-[var(--primary)] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600 mt-1">+91 88158 32425</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-6 h-6 text-[var(--primary)] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">info@lnpathology.com</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="w-6 h-6 text-[var(--primary)] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Working Hours</h3>
                    <p className="text-gray-600 mt-1">Sun - Fri: 7:30 AM - 10:00 PM<br/>Saturday: 7:30 AM - 2:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Embedded Google Map */}
            <div className="bg-gray-200 rounded-2xl h-64 w-full flex items-center justify-center overflow-hidden shadow-inner">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.8586786360765!2d83.38217597621012!3d26.78077437672609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145e9f3d65239%3A0x1d369865e7e32c26!2sL.N%20Pathology!5e0!3m2!1sen!2sus!4v1781786359260!5m2!1sen!2sus" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="L.N. Pathology Location on Google Maps"
               ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input 
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input 
                  {...register("phone", { required: "Phone is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea 
                  {...register("message", { required: "Message is required" })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
              </div>

              <button 
                type="submit"
                className="w-full bg-[var(--primary)] text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
