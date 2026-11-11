import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../types/campus-event";
const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};
export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();
  return (
    <>
      <h2>Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
      <Link className="donus-linki" to="/admin">
        ← Yönetime dön
      </Link>
    </>
  );
}
