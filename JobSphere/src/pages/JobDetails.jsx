import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchJobById } from "../services/remotiveApi";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setError("");
      try {
        const jobData = await fetchJobById(id);
        if (!jobData) {
          throw new Error("Job not found");
        }
        setJob(jobData);
      } catch (err) {
        console.error(err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center text-gray-500 animate-pulse">Loading job details...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-500">{error}</p>;
  }

  if (!job) {
    return <p className="p-6 text-center text-gray-500">Job not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{job.title}</h2>

      <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-6">
        <p>
          <span className="font-semibold">{job.company_name}</span> • {job.category}
        </p>
        <p>{job.job_type} • {job.candidate_required_location}</p>
      </div>

      <div
        className="prose prose-slate max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow hover:bg-blue-700 transition"
      >
        Apply on {job.company_name}
      </a>
    </div>
  );
}
