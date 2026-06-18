"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Users, Activity, Package, LogOut, Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data states
  const [bookings, setBookings] = useState([]);
  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);

  // Form states
  const [isAddingTest, setIsAddingTest] = useState(false);
  const [newTest, setNewTest] = useState({ name: '', description: '', price: '', popular: false });

  useEffect(() => {
    const token = Cookies.get('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchData();
    }
  }, [activeTab]);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${Cookies.get('adminToken')}` }
  });

  const fetchData = async () => {
    try {
      if (activeTab === 'bookings') {
        const res = await axios.get(`${API_URL}/bookings`, getAuthHeader());
        setBookings(res.data);
      } else if (activeTab === 'tests') {
        const res = await axios.get(`${API_URL}/tests`); // Public route
        setTests(res.data);
      } else if (activeTab === 'packages') {
        const res = await axios.get(`${API_URL}/packages`); // Public route
        setPackages(res.data);
      }
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab}`);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('adminToken');
    router.push('/admin/login');
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/bookings/${id}`, { status }, getAuthHeader());
      toast.success('Status updated');
      fetchData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const deleteBooking = async (id) => {
    if(!confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/bookings/${id}`, getAuthHeader());
      toast.success('Booking deleted');
      fetchData();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const addTest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/tests`, newTest, getAuthHeader());
      toast.success('Test added');
      setIsAddingTest(false);
      setNewTest({ name: '', description: '', price: '', popular: false });
      fetchData();
    } catch (error) {
      toast.error('Failed to add test');
    }
  };

  const deleteTest = async (id) => {
    if(!confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/tests/${id}`, getAuthHeader());
      toast.success('Test deleted');
      fetchData();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const tabs = [
    { id: 'bookings', name: 'Bookings', icon: <Users className="w-5 h-5" /> },
    { id: 'tests', name: 'Tests', icon: <Activity className="w-5 h-5" /> },
    { id: 'packages', name: 'Packages', icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Toaster />
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Admin Panel</h1>
          <p className="text-xs text-gray-500 mt-1">L.N. Pathology</p>
        </div>
        <nav className="flex-1 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-blue-50 text-[var(--primary)] border-r-4 border-[var(--primary)]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium w-full px-2 py-2">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
          <Link href="/" className="text-sm bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium text-gray-700">View Live Website</Link>
        </div>

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test/Package</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-8 text-gray-500">No bookings found</td></tr>
                ) : (
                  bookings.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.testRequired}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${booking.bookingType === 'Home Collection' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {booking.bookingType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className={`text-xs font-bold rounded-full px-3 py-1 border-0 focus:ring-0 ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => deleteBooking(booking._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5 inline" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TESTS TAB */}
        {activeTab === 'tests' && (
          <div>
            <div className="mb-6 flex justify-end">
              <button 
                onClick={() => setIsAddingTest(!isAddingTest)}
                className="bg-[var(--secondary)] text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" /> Add New Test
              </button>
            </div>

            {isAddingTest && (
              <form onSubmit={addTest} className="bg-white p-6 rounded-lg shadow mb-8 border-l-4 border-[var(--secondary)]">
                <h3 className="text-lg font-bold mb-4">Add New Test</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input required placeholder="Test Name" className="border p-2 rounded" value={newTest.name} onChange={e => setNewTest({...newTest, name: e.target.value})} />
                  <input required type="number" placeholder="Price (₹)" className="border p-2 rounded" value={newTest.price} onChange={e => setNewTest({...newTest, price: e.target.value})} />
                </div>
                <textarea required placeholder="Description" className="border p-2 rounded w-full mb-4" rows="2" value={newTest.description} onChange={e => setNewTest({...newTest, description: e.target.value})}></textarea>
                <label className="flex items-center mb-4">
                  <input type="checkbox" className="mr-2" checked={newTest.popular} onChange={e => setNewTest({...newTest, popular: e.target.checked})} />
                  Mark as Popular Test
                </label>
                <div className="flex space-x-3">
                  <button type="submit" className="bg-[var(--primary)] text-white px-4 py-2 rounded">Save Test</button>
                  <button type="button" onClick={() => setIsAddingTest(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tests.length === 0 ? <p className="text-gray-500">No tests available.</p> : tests.map(test => (
                <div key={test._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{test.name}</h3>
                      {test.popular && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Popular</span>}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4 mt-2">
                    <span className="font-extrabold text-[var(--primary)] text-xl">₹{test.price}</span>
                    <button onClick={() => deleteTest(test._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PACKAGES TAB */}
        {activeTab === 'packages' && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Packages Management</h3>
            <p className="text-gray-500">The structure to add packages is similar to tests. It is fully supported by the backend API.</p>
          </div>
        )}

      </div>
    </div>
  );
}
