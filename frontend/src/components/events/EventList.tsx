import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";
interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  className?: string;
  label?: string;
}
export default function EventList({
  events,
  emptyText = "Etkinlik bulunamadı.",
  className = "uc-sutun",
  label = "Etkinlik sonuçları",
}: EventListProps) {
  if (events.length === 0)
    return (
      <p className="sonuc" role="status">
        {emptyText}
      </p>
    );
  return (
    <section className={`etkinlik-grid ${className}`} aria-label={label}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
