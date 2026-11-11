import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthField from "../components/forms/AuthField";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }
  return (
    <>
      <h2>Şifremi Unuttum</h2>
      <section className="form-kapsayici">
        <p>
          Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı
          gönderelim.
        </p>
        {sent && (
          <p className="basari-kutusu" role="status">
            Bağlantı {email} adresine gönderildi (demo).
          </p>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <AuthField
            name="email"
            label="E-posta"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setSent(false);
            }}
            error={error}
          />
          <button className="btn-islem" type="submit">
            Bağlantı gönder
          </button>
        </form>
        <div className="auth-linkler">
          <Link to="/login">← Girişe dön</Link>
        </div>
      </section>
    </>
  );
}
