import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter({ search, category });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="Search jobs (e.g. React, UI, Marketing)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full md:w-1/2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 rounded w-full md:w-1/4"
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
      >
        Apply
      </button>
    </div>
  );
}
