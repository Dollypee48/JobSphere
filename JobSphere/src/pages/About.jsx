import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-blue-600">JobSphere</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          JobSphere is your gateway to high-quality remote opportunities. From developers to designers, we connect professionals with real jobs from trusted companies across the globe — 100% remote, 100% curated.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-3 text-left">
          {[
            {
              title: "Remote First",
              description:
                "We list only remote jobs, giving you the freedom to work from anywhere — no borders, no limits.",
            },
            {
              title: "Curated Listings",
              description:
                "Our job feeds are filtered from sources like Remotive, ensuring quality and legitimacy every time.",
            },
            {
              title: "User-Centric Design",
              description:
                "The clean, intuitive interface helps you find and explore opportunities without distractions.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/jobs"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-8 py-3 rounded-lg transition shadow"
          >
            Explore Jobs →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
