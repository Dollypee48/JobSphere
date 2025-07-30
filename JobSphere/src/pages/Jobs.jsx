import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    setError("");

    let url = "http://localhost:5000/api/jobs";
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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Explore Remote Jobs
      </h2>

      <FilterBar onFilter={fetchJobs} />

      {loading && (
        <p className="text-center mt-8 text-gray-600">Loading jobs...</p>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 mt-8">{error}</p>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-center mt-8 text-gray-500">No jobs found.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {jobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
