import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          placeholder="Email"
          name="email"
          type="email"
          required
          value={email || ""}
          onChange={handleEmailChange}
          autoComplete="off"
        />
        <input
          className="auth__form-input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={password || ""}
          onChange={handlePasswordChange}
          autoComplete="off"
        />
        <input
          className="auth__form-submit"
          type="submit"
          name="submit"
          value="Зарегистрироваться"
        />
      </form>
      <p className="auth__signup">
        <span className="auth__signup_text">Уже зарегистрированы?</span>&nbsp;
        <Link to="/sign-in" className="auth__signup_link link">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
