import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
interface EventCardProps {
  event: CampusEvent;
}
export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="etkinlik-karti">
      <span className="tur-etiket">{event.category}</span>
      <h3>{event.title}</h3>
      <p className="detay-bilgi">
        <time dateTime={`${event.date}T${event.time}`}>
          {formatDate(event.date)} · {event.time}
        </time>
        <br />
        {event.location}
        <br />
        Kontenjan: {event.capacity}
      </p>
      <Link className="kart-link" to={`/events/${event.id}`}>
        Detayları gör →
      </Link>
    </article>
  );
}
