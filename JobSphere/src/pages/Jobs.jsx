import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    setError("");

    const url = "https://job-sphere-67rc.vercel.app/api/jobs";
    const params = {};

    if (filters.search?.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.category && filters.category !== "All") {
      params.category = filters.category;
    }

    try {
      const response = await axios.get(url, { params });

      if (Array.isArray(response.data.jobs)) {
        setJobs(response.data.jobs);
      } else {
        setError("Unexpected response format.");
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err.message);
      if (err.message.includes("Network Error")) {
        setError("Network error or CORS issue. Make sure the backend is running.");
      } else {
        setError(err.response?.data?.error || "Failed to load jobs.");
      }
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[#060b62] text-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 max-w-7xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow">
          Explore Remote Jobs
        </h2>

        <FilterBar onFilter={fetchJobs} />

        {loading && (
          <p className="text-center mt-12 text-gray-300 animate-pulse">
            Loading jobs...
          </p>
        )}

        {!loading && error && (
          <p className="text-center text-red-400 mt-8">{error}</p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <p className="text-center mt-8 text-gray-400">No jobs found.</p>
        )}

        {!loading && !error && jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {jobs.map((job) => (
              <motion.div
                key={job._id || job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <JobCard job={job} dark />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
