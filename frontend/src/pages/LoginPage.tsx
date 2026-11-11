import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthField from "../components/forms/AuthField";
interface LoginErrors {
  email?: string;
  password?: string;
}
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: LoginErrors = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }
  return (
    <>
      <h2>Giriş Yap</h2>
      <section className="form-kapsayici">
        {sent && (
          <p className="basari-kutusu" role="status">
            Form doğrulandı. Gerçek giriş Sprint 10’da.
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
            error={errors.email}
          />
          <AuthField
            name="password"
            label="Şifre"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setSent(false);
            }}
            error={errors.password}
          />
          <button className="btn-islem" type="submit">
            Giriş yap
          </button>
        </form>
        <div className="auth-linkler">
          <Link to="/forgot-password">Şifremi unuttum</Link>
          <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
        </div>
      </section>
    </>
  );
}
