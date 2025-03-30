import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { registerUser } from "../../Services/authApi"; // Importa la funzione API

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Funzione per validare la password con regex
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePassword(password)) {
      setPasswordError("La password deve avere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale.");
      return;
    }

    try {
      await registerUser({ firstName, lastName, email, password });
      setSuccess("Registrazione completata! Reindirizzamento al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (errMessage) {
      setError(errMessage);
    }
  };

  return (
    <div className={styles["register-container"]}>
      <h2 className={styles.heading}>Registrazione</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles["input-group"]}>
          <label htmlFor="firstName">Nome</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div className={styles["input-group"]}>
          <label htmlFor="lastName">Cognome</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div className={styles["input-group"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className={styles["input-group"]}>
          <label htmlFor="password">Password</label>
          <div className={styles["password-wrapper"]}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); // Rimuove l'errore quando l'utente digita
              }}
              required
            />
            <span className={styles["eye-icon"]} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        <button type="submit">Registrati</button>
      </form>

      <p>
        Hai già un account? <Link to="/login">Accedi qui</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
