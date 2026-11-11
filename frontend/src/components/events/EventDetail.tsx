import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
interface EventDetailProps {
  event: CampusEvent;
}
export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className={`detay-kapsayici${event.image ? "" : " afissiz"}`}>
      {event.image && (
        <section className="detay-afis-alani">
          <figure>
            <img src={event.image} alt={`${event.title} etkinlik afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        </section>
      )}
      <section className="detay-icerik-alani">
        <h2>Etkinlik bilgileri</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity}</dd>
        </dl>
        <p className="metin-paragraf">{event.description}</p>
        <p>
          <Link className="btn-islem" to={`/admin/${event.id}/edit`}>
            Bu etkinliği güncelle
          </Link>
        </p>
        <Link className="donus-linki" to="/events">
          ← Listeye dön
        </Link>
      </section>
    </article>
  );
}
