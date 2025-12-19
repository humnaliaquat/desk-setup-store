"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  User,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: "Active" | "Inactive";
}

const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia@example.com",
    createdAt: "Dec 10, 2025",
    status: "Active",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson@example.com",
    createdAt: "Dec 8, 2025",
    status: "Active",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    createdAt: "Nov 28, 2025",
    status: "Inactive",
  },
  {
    id: "4",
    name: "William Kim",
    email: "william@example.com",
    createdAt: "Nov 15, 2025",
    status: "Active",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia@example.com",
    createdAt: "Oct 22, 2025",
    status: "Active",
  },
  {
    id: "6",
    name: "Ethan Wilson",
    email: "ethan@example.com",
    createdAt: "Oct 10, 2025",
    status: "Inactive",
  },
  {
    id: "7",
    name: "Emma Johnson",
    email: "emma@example.com",
    createdAt: "Sep 30, 2025",
    status: "Active",
  },
];

const statusOptions = ["All status", "Active", "Inactive"] as const;
type StatusType = (typeof statusOptions)[number];

export default function UsersPage() {
  const [status, setStatus] = useState<StatusType>("All status");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on status and search
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    if (status !== "All status") {
      filtered = filtered.filter((user) => user.status === status);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [status, searchQuery]);

  const getStatusBadge = (userStatus: UserData["status"]) => {
    const isActive = userStatus === "Active";
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
          isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }`}
      >
        {isActive ? (
          <CheckCircle2 className="w-3.5 h-3.5" />
        ) : (
          <XCircle className="w-3.5 h-3.5" />
        )}
        {userStatus}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col gap-8 p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your customer accounts
          </p>
        </header>

        {/* Filters Section */}
        <section className=" rounded-xl   border-gray-200 ">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusType)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Users Table */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date Created
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No users found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {user.createdAt}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          aria-label="More actions"
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
            Showing {filteredUsers.length} of {mockUsers.length} users
          </div>
        </section>
      </div>
    </div>
  );
}
