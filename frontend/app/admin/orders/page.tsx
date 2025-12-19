"use client";
import React, { useState, useMemo } from "react";
import {
  Package,
  ShoppingCart,
  RotateCcw,
  CheckCircle2,
  Search,
  ChevronDown,
  MoreVertical,
  Calendar,
  User,
  CreditCard,
  DollarSign,
  Truck,
  CircleCheck,
  Clock,
  XCircle,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  customer: string;
  payment: "Paid" | "Pending" | "Failed";
  total: string;
  delivery: "Shipped" | "Processing" | "Delivered";
  items: number;
  fulfillment: "Fulfilled" | "Unfulfilled" | "Partially Fulfilled";
  status: "Open" | "Closed"; // Added for Open/Closed filtering
}

const mockOrders: Order[] = [
  {
    id: "#ORD-001",
    date: "Dec 18, 2025",
    customer: "John Doe",
    payment: "Paid",
    total: "$129.99",
    delivery: "Delivered",
    items: 3,
    fulfillment: "Fulfilled",
    status: "Closed",
  },
  {
    id: "#ORD-002",
    date: "Dec 17, 2025",
    customer: "Alice Smith",
    payment: "Pending",
    total: "$89.50",
    delivery: "Processing",
    items: 2,
    fulfillment: "Unfulfilled",
    status: "Open",
  },
  {
    id: "#ORD-003",
    date: "Dec 16, 2025",
    customer: "Bob Johnson",
    payment: "Paid",
    total: "$245.00",
    delivery: "Shipped",
    items: 5,
    fulfillment: "Partially Fulfilled",
    status: "Open",
  },
  {
    id: "#ORD-004",
    date: "Dec 15, 2025",
    customer: "Emma Wilson",
    payment: "Failed",
    total: "$67.20",
    delivery: "Processing",
    items: 1,
    fulfillment: "Unfulfilled",
    status: "Open",
  },
  {
    id: "#ORD-005",
    date: "Dec 14, 2025",
    customer: "Michael Brown",
    payment: "Paid",
    total: "$312.75",
    delivery: "Delivered",
    items: 4,
    fulfillment: "Fulfilled",
    status: "Closed",
  },
];

const views = ["All", "Unfulfilled", "Unpaid", "Open", "Closed"] as const;
type ViewType = (typeof views)[number];

export default function OrdersPage() {
  const [view, setView] = useState<ViewType>("All");
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const statsData = [
    {
      title: "Total Orders",
      count: "1,248",
      trend: "+25.3% last week",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Pending Fulfillment",
      count: "47",
      trend: "+12 new today",
      icon: Package,
      color: "text-orange-600",
    },
    {
      title: "Returns",
      count: "18",
      trend: "3 this week",
      icon: RotateCcw,
      color: "text-red-600",
    },
    {
      title: "Fulfilled Today",
      count: "89",
      trend: "+18% from yesterday",
      icon: CheckCircle2,
      color: "text-green-600",
    },
  ];

  // Filter orders based on current view and search query
  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;

    // View filtering
    switch (view) {
      case "Unfulfilled":
        filtered = filtered.filter((o) => o.fulfillment !== "Fulfilled");
        break;
      case "Unpaid":
        filtered = filtered.filter((o) => o.payment !== "Paid");
        break;
      case "Open":
        filtered = filtered.filter((o) => o.status === "Open");
        break;
      case "Closed":
        filtered = filtered.filter((o) => o.status === "Closed");
        break;
      // "All" shows everything
    }

    // Search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [view, searchQuery]);

  const toggleOrderSelection = (id: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOrders(newSelected);
  };

  const toggleAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(filteredOrders.map((o) => o.id)));
    }
  };

  const getPaymentIcon = (status: Order["payment"]) => {
    switch (status) {
      case "Paid":
        return <CircleCheck className="w-4 h-4 text-green-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getFulfillmentColor = (status: Order["fulfillment"]) => {
    switch (status) {
      case "Fulfilled":
        return "text-green-700 bg-green-100";
      case "Unfulfilled":
        return "text-orange-700 bg-orange-100";
      case "Partially Fulfilled":
        return "text-blue-700 bg-blue-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col gap-8 p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 text-sm mt-1">
              Friday, December 19, 2025
            </p>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Orders Table Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border-b border-gray-200 gap-6">
            {/* View Tabs */}
            <div className="flex flex-wrap gap-2">
              {views.map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                    view === v
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2.5 w-full min-w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent transition"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <ChevronDown className="w-4 h-4" />
                <span className="text-sm font-medium">Sort</span>
              </button>
            </div>
          </header>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left w-12">
                    <input
                      type="checkbox"
                      checked={
                        filteredOrders.length > 0 &&
                        selectedOrders.size === filteredOrders.length
                      }
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Customer
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Payment
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Total
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" /> Delivery
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Fulfillment
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No orders found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.has(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getPaymentIcon(order.payment)}
                          <span className="text-sm text-gray-700">
                            {order.payment}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {order.delivery}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {order.items}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getFulfillmentColor(
                            order.fulfillment
                          )}`}
                        >
                          {order.fulfillment}
                        </span>
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
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
            <p>
              Showing {filteredOrders.length} of {mockOrders.length} orders
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
