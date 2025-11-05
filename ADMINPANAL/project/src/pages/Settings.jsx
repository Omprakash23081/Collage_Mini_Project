import React, { useState } from "react";
import { Save, User, Globe, Palette } from "lucide-react";
import Button from "../components/Common/Button";
import { mockProfile } from "../data/mockData";
import { useContext } from "react";
import { AppContext } from "../AppContext.jsx";

export default function Settings() {
  const { userName } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(mockProfile);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "website", name: "Website", icon: Globe },
    { id: "appearance", name: "Appearance", icon: Palette },
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedProfile = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      avatar: formData.get("avatar"),
      socialLinks: {
        linkedin: formData.get("linkedin"),
        github: formData.get("github"),
        twitter: formData.get("twitter"),
        website: formData.get("website"),
      },
    };

    setProfile(updatedProfile);
    alert("Profile updated successfully!");
  };

  const handleWebsiteSubmit = (e) => {
    e.preventDefault();
    alert("Website settings updated successfully!");
  };

  const renderProfileTab = () => (
    <form onSubmit={handleProfileSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={userName}
            required
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Profile Picture URL
          </label>
          <input
            type="url"
            name="avatar"
            defaultValue={profile.avatar}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          rows={4}
          defaultValue={profile.bio}
          className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              defaultValue={profile.socialLinks.linkedin}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              GitHub
            </label>
            <input
              type="url"
              name="github"
              defaultValue={profile.socialLinks.github}
              placeholder="https://github.com/username"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Twitter
            </label>
            <input
              type="url"
              name="twitter"
              defaultValue={profile.socialLinks.twitter}
              placeholder="https://twitter.com/username"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Website
            </label>
            <input
              type="url"
              name="website"
              defaultValue={profile.socialLinks.website}
              placeholder="https://yourwebsite.com"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" icon={Save}>
          Save Profile
        </Button>
      </div>
    </form>
  );

  const renderWebsiteTab = () => (
    <form onSubmit={handleWebsiteSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              defaultValue="John Doe - Full Stack Developer"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Meta Description
            </label>
            <textarea
              rows={3}
              defaultValue="Full-stack developer specializing in React, Node.js, and modern web technologies."
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Keywords
            </label>
            <input
              type="text"
              defaultValue="web developer, react, node.js, portfolio"
              placeholder="Comma-separated keywords"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              defaultValue="San Francisco, CA"
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Timezone
            </label>
            <select className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="PST">Pacific Standard Time (PST)</option>
              <option value="EST">Eastern Standard Time (EST)</option>
              <option value="CST">Central Standard Time (CST)</option>
              <option value="MST">Mountain Standard Time (MST)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" icon={Save}>
          Save Website Settings
        </Button>
      </div>
    </form>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Theme Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Dark Mode</h4>
              <p className="text-sm text-gray-400">
                Currently enabled by default
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDarkMode ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Primary Color
            </label>
            <div className="grid grid-cols-6 gap-3">
              {[
                { name: "Blue", color: "bg-blue-500" },
                { name: "Purple", color: "bg-purple-500" },
                { name: "Green", color: "bg-green-500" },
                { name: "Red", color: "bg-red-500" },
                { name: "Orange", color: "bg-orange-500" },
                { name: "Pink", color: "bg-pink-500" },
              ].map((colorOption) => (
                <button
                  key={colorOption.name}
                  className={`w-12 h-12 rounded-lg ${colorOption.color} hover:scale-105 transition-transform ring-2 ring-offset-2 ring-transparent hover:ring-blue-400`}
                  title={colorOption.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Font Family
            </label>
            <select className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="inter">Inter (Default)</option>
              <option value="roboto">Roboto</option>
              <option value="open-sans">Open Sans</option>
              <option value="poppins">Poppins</option>
              <option value="lato">Lato</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Font Size
            </label>
            <select className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="small">Small</option>
              <option value="medium">Medium (Default)</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button icon={Save}>Save Appearance Settings</Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your profile and website configuration
        </p>
      </div>

      {/* Settings Content */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex flex-wrap gap-2 sm:gap-8 px-4 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "website" && renderWebsiteTab()}
          {activeTab === "appearance" && renderAppearanceTab()}
        </div>
      </div>
    </div>
  );
}
