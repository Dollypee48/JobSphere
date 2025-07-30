import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobsRoute.js"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes); 

app.get("/", (req, res) => {
  res.send("JobSphere backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
