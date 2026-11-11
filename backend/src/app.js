import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString(), student: "2416501052" });
});
app.use("/events", eventRoutes);
app.use((_req, res) => res.status(404).json({ error: { message: "Route not found" } }));

export default app;
