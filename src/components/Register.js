import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.email, values.password);
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
          value={values.email || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          className="auth__form-input"
          placeholder="Пароль"
          name="password"
          type="password"
          required
          value={values.password || ""}
          onChange={handleChange}
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
