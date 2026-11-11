import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthField from "../components/forms/AuthField";
interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3)
      found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (!password2 || password2 !== password)
      found.password2 = "Şifreler aynı değil.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }
  return (
    <>
      <h2>Kayıt Ol</h2>
      <section className="form-kapsayici">
        {sent && (
          <p className="basari-kutusu" role="status">
            Form doğrulandı. Gerçek kayıt Sprint 10’da.
          </p>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <AuthField
            name="name"
            label="Ad Soyad"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(value) => {
              setName(value);
              setSent(false);
            }}
            error={errors.name}
          />
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
            autoComplete="new-password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setSent(false);
            }}
            error={errors.password}
          />
          <AuthField
            name="password2"
            label="Şifre (tekrar)"
            type="password"
            autoComplete="new-password"
            value={password2}
            onChange={(value) => {
              setPassword2(value);
              setSent(false);
            }}
            error={errors.password2}
          />
          <button className="btn-islem" type="submit">
            Kayıt ol
          </button>
        </form>
        <div className="auth-linkler">
          <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
        </div>
      </section>
    </>
  );
}
