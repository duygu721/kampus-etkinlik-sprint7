import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";
export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />;
  return (
    <>
      <h2>Etkinlik Güncelle</h2>
      <EventForm
        key={event.id}
        initialData={{ ...event, capacity: String(event.capacity) }}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
      <Link className="donus-linki" to="/admin">
        ← Yönetime dön
      </Link>
    </>
  );
}
