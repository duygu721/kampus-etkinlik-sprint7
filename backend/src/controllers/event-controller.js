import { randomUUID } from "node:crypto";
import { events } from "../data/events.js";

export function getEvents(req, res) {
  const { category } = req.query;
  const result = category ? events.filter((event) => event.category === category) : events;
  res.json(result);
}

export function getEventById(req, res) {
  const event = events.find((item) => item.id === req.params.id);
  if (!event) return res.status(404).json({ error: { message: "Event not found" } });
  res.json(event);
}

export function createEvent(req, res) {
  const { title, category, date } = req.body ?? {};
  if (![title, category, date].every((value) => typeof value === "string" && value.trim())) {
    return res.status(400).json({ error: { message: "title, category and date are required" } });
  }

  const capacity = req.body.capacity;
  if (capacity !== undefined && (!Number.isInteger(Number(capacity)) || Number(capacity) < 1 || Number(capacity) > 1000)) {
    return res.status(400).json({ error: { message: "capacity must be an integer between 1 and 1000" } });
  }

  const event = {
    id: `event-${randomUUID()}`,
    title: title.trim(),
    category: category.trim(),
    date: date.trim(),
    time: typeof req.body.time === "string" ? req.body.time : "",
    location: typeof req.body.location === "string" ? req.body.location : "",
    description: typeof req.body.description === "string" ? req.body.description : "",
    capacity: capacity === undefined ? 0 : Number(capacity)
  };
  events.push(event);
  res.status(201).json(event);
}
