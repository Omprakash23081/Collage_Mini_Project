import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Shield, User, Camera, Calendar, MapPin, Edit3, Settings, Phone, Globe, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import Modal from '../components/Modal';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  // Edit Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || 'New Delhi, India',
    bio: user?.bio || 'Senior Administrator managing the college portal. Passionate about education technology.'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Simulate API Call
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
      // In a real app, you'd update the context/backend here
    }, 1000);
  };

  const handleImageUpload = () => {
    // Simulate file input click
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)),
          {
            loading: 'Uploading image...',
            success: 'Image uploaded successfully!',
            error: 'Could not upload image.',
          }
        );
      }
    };
    input.click();
  };
  
  const stats = [
    { label: "Role", value: user?.role || "Admin", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Status", value: "Active", icon: User, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Joined", value: "Jan 2024", icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-b-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
        
        <button 
          onClick={handleImageUpload}
          className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
          title="Change Cover Photo"
        >
          <Camera size={20} />
        </button>
      </div>

      {/* Profile Header */}
      <div className="px-4 md:px-8 relative -mt-16 sm:-mt-20 z-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-zinc-950 ring-4 ring-zinc-800 relative z-10 overflow-hidden">
              {user?.profileImage ? (
                 <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-rose-600 to-orange-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                  {user?.name?.charAt(0) ||('A')}
                </div>
              )}
            </div>
            <button 
              onClick={handleImageUpload}
              className="absolute bottom-2 right-2 p-2 bg-rose-500 rounded-full text-white shadow-lg z-20 hover:scale-105 transition-transform"
              title="Change Profile Picture"
            >
              <Camera size={18} />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left mb-2 sm:mb-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">{user?.name || 'Administrator'}</h1>
            <p className="text-zinc-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Mail size={16} />
              {user?.email || 'admin@example.com'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-rose-500/20"
            >
              <Edit3 size={18} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8 mt-8">
        {/* Left Column - Stats & Info */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-zinc-200 font-semibold">{stat.value}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 text-zinc-400 text-sm">
                <MapPin size={18} />
                <span>{formData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-white/5 overflow-x-auto">
            {['overview', 'activity', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-rose-500 text-rose-500'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm min-h-[300px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bio</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {formData.bio}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                    <h4 className="text-sm font-medium text-zinc-400 mb-1">Last Login</h4>
                    <p className="text-white font-mono">Today, 10:45 AM</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                    <h4 className="text-sm font-medium text-zinc-400 mb-1">Last Updated</h4>
                    <p className="text-white font-mono">Just now</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'activity' && (
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                        <Edit3 size={18} />
                      </div>
                      <div>
                        <p className="text-zinc-200 font-medium">Updated Notes for Semester {i}</p>
                        <p className="text-zinc-500 text-sm">2 hours ago</p>
                      </div>
                    </div>
                  ))}
               </div>
            )}

            {activeTab === 'security' && (
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                        <Lock size={20} />
                      </div>
                      <div>
                        <p className="text-zinc-200 font-medium">Change Password</p>
                        <p className="text-zinc-500 text-sm">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm transition-colors">
                      Update
                    </button>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Full Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email Address</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Phone</label>
              <input 
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                placeholder="+91 99999 99999"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Location</label>
              <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Bio</label>
            <textarea 
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button 
              type="button" 
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors bg-transparent border border-transparent font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} title="Settings">
        <div className="space-y-6">
           {/* Notification Settings */}
           <div className="space-y-4">
              <h3 className="text-md font-medium text-zinc-300 flex items-center gap-2">
                <Bell size={18} /> Notifications
              </h3>
              <div className="space-y-3 pl-2">
                 {['Email Notifications', 'Desktop Alerts', 'Marketing Emails'].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/50 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors">
                       <span className="text-zinc-400">{item}</span>
                       <input type="checkbox" defaultChecked={i === 0} className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-rose-500 focus:ring-rose-500/20" />
                    </label>
                 ))}
              </div>
           </div>

           {/* Appearance */}
           <div className="space-y-4">
              <h3 className="text-md font-medium text-zinc-300 flex items-center gap-2">
                <Globe size={18} /> General
              </h3>
              <div className="grid grid-cols-2 gap-3">
                 <button className="p-3 rounded-lg border-2 border-rose-500 bg-rose-500/10 text-rose-500 text-sm font-medium">Dark Mode</button>
                 <button className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 text-sm font-medium hover:border-zinc-700">Light Mode</button>
              </div>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
