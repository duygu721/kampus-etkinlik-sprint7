import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";
interface Props {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}
const fields = [
  { name: "title", label: "Etkinlik adı", type: "text" },
  { name: "category", label: "Kategori", type: "select" },
  { name: "date", label: "Tarih", type: "date" },
  { name: "time", label: "Saat", type: "time" },
  { name: "location", label: "Yer", type: "text" },
  { name: "capacity", label: "Kontenjan", type: "number" },
  { name: "description", label: "Açıklama", type: "textarea" },
] as const;
export default function EventForm({
  initialData,
  submitText,
  onSubmit,
}: Props) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});
  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;
    setData((previous) => ({ ...previous, [name]: value }));
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }
  return (
    <section className="form-kapsayici">
      <form noValidate onSubmit={handleSubmit}>
        {fields.map(({ name, label, type }) => {
          const props = {
            id: name,
            name,
            value: data[name],
            onChange: handleChange,
            required: true,
            "aria-invalid": errors[name] ? (true as const) : undefined,
            "aria-describedby": errors[name] ? `${name}-error` : undefined,
          };
          return (
            <div className="form-alan" key={name}>
              <label htmlFor={name}>{label}</label>
              {type === "select" ? (
                <select {...props}>
                  <option value="">Seçiniz</option>
                  {["Seminer", "Atölye", "Söyleşi", "Yarışma"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              ) : type === "textarea" ? (
                <textarea {...props} rows={5} />
              ) : (
                <input
                  {...props}
                  type={type}
                  min={type === "number" ? 1 : undefined}
                  max={type === "number" ? 1000 : undefined}
                  step={type === "number" ? 1 : undefined}
                />
              )}
              {errors[name] && (
                <span id={`${name}-error`} className="hata-metni" role="alert">
                  {errors[name]}
                </span>
              )}
            </div>
          );
        })}
        <button className="btn-islem" type="submit">
          {submitText}
        </button>
      </form>
    </section>
  );
}
