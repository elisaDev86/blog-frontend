import React, { useEffect } from "react";

//collegamento al backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = (`${backendUrl}/api/auth/google`);
  };

  useEffect(() => {
    // Controlla se l'URL contiene un token dopo il reindirizzamento
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token); // Salva il token
      window.history.replaceState({}, document.title, window.location.pathname); // Rimuove il token dall'URL
    }
  }, []);

  return (
    <button id="google-login-button" onClick={handleGoogleLogin}>
      Accedi con Google
    </button>
  );
};

export default GoogleLoginButton;

