import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => {
        const jobs = Array.isArray(res.data) ? res.data : res.data.jobs || [];
        setFeaturedJobs(jobs.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#060b62] text-white font-sans">
      
      <section
        className="h-[100vh] bg-cover bg-center flex flex-col justify-center items-center text-center px-6 relative"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/64166b14628839bfcd22ac95/647d52ccd320550110e576b3_creative-business.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-[#060b62]/70 backdrop-blur-sm" />
        <div className="relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg leading-tight"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Your Gateway to Global <span className="text-blue-300">Remote Careers</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            Explore top remote roles in tech, design, marketing, and more—carefully curated to launch your next chapter.
          </motion.p>
          <Link
            to="/jobs"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium transition shadow-lg"
          >
            Explore Jobs
          </Link>
        </div>
      </section>

     
      <section className="py-20 px-6 bg-[#070a3d]">
        <h2 className="text-4xl font-bold text-center mb-12">🌟 Featured Roles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {!loading && featuredJobs.length > 0 ? (
            featuredJobs.map((job) => (
              <motion.div
                key={job._id || job.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <JobCard job={job} dark />
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">Loading jobs...</p>
          )}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/jobs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition"
          >
            View All Jobs
          </Link>
        </div>
      </section>

   
      <section className="bg-gradient-to-br from-[#060b62] via-[#0a0f7c] to-[#10166a] py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">Why Choose JobSphere?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12">
          {[
            {
              title: "Curated Listings",
              desc: "Only high-quality jobs from trusted tech employers worldwide.",
              icon: "🌍",
            },
            {
              title: "Verified Employers",
              desc: "We vet companies so you can apply with confidence and clarity.",
              icon: "✅",
            },
            {
              title: "Remote-First Focus",
              desc: "All roles are remote, so you work from wherever inspires you.",
              icon: "🏡",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#0c1174] rounded-xl p-6 shadow-lg border border-blue-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="bg-[#070a3d] py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12">
          {[
            {
              title: "Browse Jobs",
              icon: "🔍",
              desc: "Search by skills, company, or category to find what suits you.",
            },
            {
              title: "Apply Easily",
              icon: "📄",
              desc: "Quick and intuitive applications—no hoops to jump through.",
            },
            {
              title: "Land Your Role",
              icon: "💼",
              desc: "Get hired by top employers and work from wherever you thrive.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="bg-[#0c1174] rounded-xl p-6 shadow-lg border border-blue-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
