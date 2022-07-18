import { useState } from "react";

const Login = ({ onLogin }) => {
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
    onLogin(email, password);
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
          value="Войти"
        />
      </form>
    </section>
  );
};

export default Login;
