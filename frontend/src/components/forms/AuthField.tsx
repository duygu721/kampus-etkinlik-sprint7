interface AuthFieldProps {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  value: string;
  error?: string;
  autoComplete: string;
  onChange: (value: string) => void;
}
export default function AuthField({
  name,
  label,
  type,
  value,
  error,
  autoComplete,
  onChange,
}: AuthFieldProps) {
  return (
    <div className="form-alan">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} className="hata-metni" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
