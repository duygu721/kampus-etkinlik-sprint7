import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);
  return (
    <>
      <h2>Yaklaşan 2 etkinlik</h2>
      <EventList
        events={upcoming}
        className="iki-sutun"
        label="Yaklaşan etkinlikler"
      />
      <Link className="btn-islem" to="/events">
        Tüm etkinlikleri gör →
      </Link>
    </>
  );
}
