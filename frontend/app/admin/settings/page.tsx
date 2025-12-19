"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Bell,
  Shield,
  Globe,
  Lock,
  CreditCard,
  Smartphone,
  ChevronRight,
  Check,
} from "lucide-react";

type SettingsTab =
  | "Profile"
  | "Account"
  | "Notifications"
  | "Security"
  | "Billing"
  | "Integrations";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");

  const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: "Profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "Account", label: "Account", icon: <Mail className="w-5 h-5" /> },
    {
      id: "Notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    { id: "Security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    {
      id: "Billing",
      label: "Billing",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "Integrations",
      label: "Integrations",
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col gap-8 p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account and preferences
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between gap-3 px-6 py-4 text-left transition-all  cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-gray-100 text-orange-500 border-r-4 border-orange-600"
                          : "text-gray-700 hover:bg-gray-50 border-r border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {tab.icon}
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      {activeTab === tab.id && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {activeTab === "Profile" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Profile Information
                  </h2>

                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-500" />
                    </div>
                    <div>
                      <button className="px-5 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition cursor-pointer">
                        Change Avatar
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, PNG up to 5MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Alex Thompson"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="alex@example.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue="Acme Corp"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end ">
                    <button className="px-6 py-3 bg-orange-400 text-white font-medium rounded-lg  cursor-pointer hover:bg-orange-500 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Notifications" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    {[
                      { label: "New orders", enabled: true },
                      { label: "Order status updates", enabled: true },
                      { label: "New customer registrations", enabled: false },
                      { label: "Low stock alerts", enabled: true },
                      { label: "Weekly reports", enabled: true },
                      { label: "Marketing & promotions", enabled: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between py-4"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Receive notifications when{" "}
                            {item.label.toLowerCase()}
                          </p>
                        </div>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            item.enabled ? "bg-orange-400" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.enabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Security" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Security
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Change Password
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <input
                          type="password"
                          placeholder="Current password"
                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <input
                          type="password"
                          placeholder="New password"
                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button className="mt-6 px-6 py-3 bg-orange-400 text-white font-medium rounded-full place-content-end hover:bg-orange-500 transition cursor-pointer">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Two-Factor Authentication
                      </h3>
                      <div className="flex items-center justify-between max-w-2xl">
                        <div>
                          <p className="font-medium text-gray-900">
                            Enable 2FA
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className="px-5 py-2.5 bg-black text-white rounded-full hover:brightness-110 transition flex items-center cursor-pointer gap-2">
                          <Lock className="w-4 h-4" />
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {["Account", "Billing", "Integrations"].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    {activeTab === "Account" && (
                      <Mail className="w-12 h-12 text-gray-400" />
                    )}
                    {activeTab === "Billing" && (
                      <CreditCard className="w-12 h-12 text-gray-400" />
                    )}
                    {activeTab === "Integrations" && (
                      <Globe className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-gray-700">
                    {activeTab} Settings
                  </h3>
                  <p className="text-gray-500 mt-2">
                    This section is coming soon.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
