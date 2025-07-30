import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  const cleanDescription = (job?.description || "")
    .replace(/<[^>]+>/g, "")
    .slice(0, 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-gray-800 mb-1">{job?.title || "Untitled Job"}</h3>
      <p className="text-sm text-gray-600 mb-2">{job?.company || "Unknown Company"}</p>
      <p className="text-sm text-gray-500 mb-2">
        {job?.category || "General"} • {job?.job_type || "Unknown Type"}
      </p>
      <p className="text-sm text-gray-400 mb-4 truncate">{cleanDescription}...</p>
      <Link
        to={`/job/${job?.id}`}
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        View Details →
      </Link>
    </div>
  );
}
