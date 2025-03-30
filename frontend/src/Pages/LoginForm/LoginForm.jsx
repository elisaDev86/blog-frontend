import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { loginUser } from "../../Services/authApi"; // Import della funzione API
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Import del contesto
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton"; //Button per oauth


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Usa il contesto per il login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await loginUser({ email, password }); // Usa la funzione API per il login
      setSuccess("Login effettuato con successo!");
      
      // Aggiorna lo stato dell'utente nel contesto
      const userData = { email, token: data.token }; // Puoi aggiungere altre info utente se necessarie
      login(userData); // Usa il contesto per gestire il login
      
      // Salva il token in localStorage
      localStorage.setItem("token", data.token);

      // Dopo il successo, reindirizza l'utente alla home
      setTimeout(() => navigate("/"), 2000);
    } catch (errMessage) {
      setError(errMessage); // In caso di errore, imposta l'errore
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles["input-group"]}>
          <label htmlFor="password">Password</label>
          <div className={styles["password-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className={styles["eye-icon"]}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <button type="submit">Login</button>
        <GoogleLoginButton />
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <p>
        Non hai un account? <Link to="/register">Registrati qui</Link>
      </p>
    </div>
  );
};

export default LoginForm;
