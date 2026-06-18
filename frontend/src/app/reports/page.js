"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Download, FileText } from 'lucide-react';

export default function Reports() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSearching, setIsSearching] = useState(false);
  const [report, setReport] = useState(null);

  const onSubmit = async (data) => {
    setIsSearching(true);
    setReport(null);
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1500));
      
      // Mock result
      if (data.patientId === 'LN123' && data.mobile === '9999999999') {
        setReport({
          patientName: 'Jane Doe',
          testName: 'Complete Blood Count (CBC)',
          date: '2023-10-25',
          url: '#' // This would be the actual PDF URL
        });
        toast.success('Report found!');
      } else {
        toast.error('No report found with provided details.');
      }
    } catch (error) {
      toast.error('Failed to search for reports.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[var(--primary)] py-8 px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Download Reports</h1>
            <p className="text-blue-100">Enter your details to view and download your test reports.</p>
          </div>
          
          <div className="p-8">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-md mb-6">
              <p><strong>Note:</strong> You can find your Patient ID on the receipt provided at the time of sample collection.</p>
              <p className="mt-2 text-xs">For testing, use Patient ID: LN123 and Mobile: 9999999999</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID *</label>
                <input 
                  {...register("patientId", { required: "Patient ID is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  placeholder="e.g. LN12345"
                />
                {errors.patientId && <span className="text-red-500 text-xs mt-1">{errors.patientId.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registered Mobile Number *</label>
                <input 
                  {...register("mobile", { required: "Mobile Number is required" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  placeholder="e.g. 9876543210"
                />
                {errors.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile.message}</span>}
              </div>

              <button 
                type="submit"
                disabled={isSearching}
                className="w-full bg-[var(--primary)] text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {isSearching ? 'Searching...' : 'View Report'}
              </button>
            </form>

            {report && (
              <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-[var(--secondary)] mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.testName}</h3>
                      <p className="text-sm text-gray-600">Patient: {report.patientName}</p>
                      <p className="text-xs text-gray-500">Date: {report.date}</p>
                    </div>
                  </div>
                  <a 
                    href={report.url}
                    className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md transition-colors text-sm font-medium"
                    onClick={(e) => { e.preventDefault(); toast.success('Downloading report...'); }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
