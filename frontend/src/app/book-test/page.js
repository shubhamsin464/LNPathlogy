"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function BookTest() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Map form data to backend schema
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        date: data.preferredDate || new Date().toISOString().split('T')[0],
        time: 'Not specified',
        address: data.address,
        tests: [data.testRequired],
        packages: []
      };
      
      // API call to backend
      await axios.post('https://lnpathlogy.onrender.com/api/bookings', payload);
      
      toast.success('Booking saved! Redirecting to WhatsApp...');
      
      // WhatsApp Integration
      const messageText = `*New Booking Request*
Name: ${data.name}
Phone: ${data.phone}
Type: ${data.bookingType}
Test/Package: ${data.testRequired}
Preferred Date: ${data.preferredDate || 'Not specified'}
Address: ${data.address}
Notes: ${data.message || 'None'}`;

      const whatsappUrl = `https://wa.me/918815832425?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');
      
      reset();
    } catch (error) {
      toast.error('Failed to submit booking. Ensure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[var(--primary)] py-8 px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Book a Test Online</h1>
            <p className="text-blue-100">Fill out the form below and our team will get back to you with confirmation.</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input 
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    {...register("phone", { required: "Phone is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    placeholder="9876543210"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test/Package Required *</label>
                  <input 
                    {...register("testRequired", { required: "Please specify the test or package" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                    placeholder="e.g. CBC or Complete Body Checkup"
                  />
                  {errors.testRequired && <span className="text-red-500 text-xs mt-1">{errors.testRequired.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                <textarea 
                  {...register("address", { required: "Address is required" })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  placeholder="Your complete address..."
                ></textarea>
                {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input 
                    type="date"
                    {...register("preferredDate")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Type</label>
                  <select 
                    {...register("bookingType")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  >
                    <option value="Lab Visit">Lab Visit</option>
                    <option value="Home Collection">Home Collection</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Any Message / Notes</label>
                <textarea 
                  {...register("message")}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--secondary)] text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
