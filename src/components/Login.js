import { useState } from "react";

const Login = ({ onLogin }) => {
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
    onLogin(values.email, values.password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
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
          value="Войти"
        />
      </form>
    </section>
  );
};

export default Login;
