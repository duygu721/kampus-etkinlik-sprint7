import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";
export default function AdminPage() {
  const { events, deleteEvent } = useEvents();
  function handleDelete(id: string, title: string) {
    if (window.confirm(`“${title}” silinsin mi?`)) deleteEvent(id);
  }
  return (
    <>
      <h2>Etkinlik Yönetimi</h2>
      <Link className="btn-islem" to="/admin/new">
        + Yeni etkinlik
      </Link>
      {events.length === 0 ? (
        <p role="status">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <caption className="sr-only">Etkinlik yönetim listesi</caption>
          <thead>
            <tr>
              <th scope="col">Etkinlik</th>
              <th scope="col">Tarih</th>
              <th scope="col">Kategori</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-baslik="Etkinlik">
                  <Link to={`/events/${event.id}`}>{event.title}</Link>
                </td>
                <td data-baslik="Tarih">{formatDate(event.date)}</td>
                <td data-baslik="Kategori">{event.category}</td>
                <td data-baslik="İşlemler">
                  <div className="islemler">
                    <Link
                      className="btn-islem"
                      aria-label={`${event.title} düzenle`}
                      to={`/admin/${event.id}/edit`}
                    >
                      Düzenle
                    </Link>
                    <button
                      className="btn-islem buton-sil"
                      aria-label={`${event.title} sil`}
                      onClick={() => handleDelete(event.id, event.title)}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
