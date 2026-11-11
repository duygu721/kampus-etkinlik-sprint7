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
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = status === 400 ? "Invalid JSON body" : status === 413 ? "Request body too large" : "Internal server error";
  res.status(status).json({ error: { message } });
});

export default app;
