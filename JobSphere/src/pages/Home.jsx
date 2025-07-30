import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to JobSphere</h1>
      <p className="text-lg text-gray-600 mb-6">
        Discover remote jobs from around the world in tech, design, marketing and more.
      </p>
      <Link
        to="/jobs"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
      >
        Browse Jobs
      </Link>
    </section>
  );
}
