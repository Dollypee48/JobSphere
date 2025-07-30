import { useState } from "react";
import { motion } from "framer-motion";

export default function FilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter({ search, category });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center"
    >
      <input
        type="text"
        placeholder="Search jobs (e.g. React, UI, Marketing)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        aria-label="Search jobs"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        <option value="software-dev">Software Development</option>
        <option value="design">Design</option>
        <option value="marketing">Marketing</option>
        <option value="product">Product</option>
        <option value="sales">Sales</option>
        <option value="customer-support">Customer Support</option>
        <option value="finance-legal">Finance & Legal</option>
        <option value="hr">Human Resources</option>
        <option value="devops">DevOps & Sysadmin</option>
      </select>

      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        aria-label="Apply filters"
      >
        Apply
      </button>
    </motion.div>
  );
}
