import express from "express";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
let cachedJobs = [];

router.get("/", async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    
    const arbeitRes = await fetch("https://www.arbeitnow.com/api/job-board-api");
    const arbeitData = await arbeitRes.json();
    const arbeitJobs = arbeitData.data.map((job) => ({
      id: uuidv4(),
      title: job.title || "",
      company: job.company_name || "",
      location: job.location || "",
      url: job.url || "",
      remote: job.remote || false,
      tags: job.tags || [],
      description: job.description || "",
      category: job.job_types ? job.job_types[0] : "General",
      job_type: job.job_types ? job.job_types[0] : "Full Time",
      source: "Arbeitnow",
    }));

    
    const remoteRes = await fetch("https://remoteok.io/api", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const remoteData = await remoteRes.json();

    const remoteJobs = (Array.isArray(remoteData) ? remoteData.slice(1) : []).map((job) => ({
      id: uuidv4(),
      title: job.position || job.title || "",
      company: job.company || "",
      location: "Remote",
      url: job.url || `https://remoteok.io/l/${job.id}`,
      remote: true,
      tags: job.tags || [],
      description: job.description || job.description_html || "",
      category: job.category || "General",
      job_type: job.job_type || "Remote",
      source: "RemoteOK",
    }));

   
    const allJobs = [...arbeitJobs, ...remoteJobs];
    cachedJobs = allJobs;

 
    const filteredJobs = allJobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      const company = job.company?.toLowerCase() || "";
      const tags = job.tags?.map(tag => tag.toLowerCase()) || [];

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        company.includes(search.toLowerCase());

      const matchesCategory = category
        ? tags.includes(category.toLowerCase()) || job.category?.toLowerCase() === category.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });

    res.status(200).json({ jobs: filteredJobs });
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});


router.get("/:id", (req, res) => {
  const job = cachedJobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.status(200).json({ job });
});

export default router;
