import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function JobCard({ job }) {
  const cleanDescription = (job?.description || "")
    .replace(/<[^>]+>/g, "")
    .slice(0, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-1">
        {job?.title || "Untitled Job"}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {job?.company || "Unknown Company"}
      </p>
      <div className="flex gap-2 mb-3 text-xs text-white">
        <span className="bg-blue-500 px-2 py-0.5 rounded">
          {job?.category || "General"}
        </span>
        <span className="bg-green-500 px-2 py-0.5 rounded">
          {job?.job_type || "Type Unknown"}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4 truncate">{cleanDescription}...</p>
      <Link
        to={`/job/${job?.id}`}
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        View Details →
      </Link>
    </motion.div>
  );
}
