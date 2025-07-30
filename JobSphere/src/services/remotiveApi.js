export const fetchJobs = async (searchTerm = "", category = "") => {
  const url = `/api/jobs?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    const data = await res.json();
    return data.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const fetchJobById = async (id) => {
  const url = `/api/jobs/${encodeURIComponent(id)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Job not found");
    const data = await res.json();
    return data.job;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
};
