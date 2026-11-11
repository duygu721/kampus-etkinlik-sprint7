import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent, EventFormData } from "../types/campus-event";
interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}
const EventsContext = createContext<EventsContextValue | null>(null);
function toEvent(id: string, data: EventFormData): CampusEvent {
  if (!data.category) throw new Error("Kategori seçilmeli.");
  return {
    id,
    title: data.title.trim(),
    category: data.category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
  };
}
export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  function addEvent(data: EventFormData) {
    const event = toEvent(`event-${crypto.randomUUID()}`, data);
    setEvents((previous) => [...previous, event]);
  }
  function updateEvent(id: string, data: EventFormData) {
    const updated = toEvent(id, data);
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id ? { ...event, ...updated } : event,
      ),
    );
  }
  function deleteEvent(id: string) {
    setEvents((previous) => previous.filter((event) => event.id !== id));
  }
  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}
export function useEvents() {
  const value = useContext(EventsContext);
  if (!value) throw new Error("EventsProvider bulunamadı.");
  return value;
}
