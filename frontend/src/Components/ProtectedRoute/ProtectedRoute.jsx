import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// Creazione del contesto utente
const ProtectedRouterContext = createContext();

const ProtectedRouterProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento iniziale
  const redirect = useNavigate();

  // Carica i dati dell'utente e il token dal localStorage al primo avvio
  useEffect(() => {
    // se non e' loggato lo butto alla /
    (async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("authToken");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
      } else {
        // redirect alla home
        redirect("/", { status: 301 });
      }
      setLoading(false); // Fine caricamento
    })();
  }, []);

  // Funzione di login: salva i dati dell'utente e il token
  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", token);
  };

  // Funzione di logout: rimuove i dati della sessione
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return (
    <ProtectedRouterContext.Provider
      value={{ user, authToken, login, logout, loading }}
    >
      {!loading && children}{" "}
      {/* Evita il rendering finché non ha caricato i dati */}
    </ProtectedRouterContext.Provider>
  );
};

export { ProtectedRouterContext, ProtectedRouterProvider };
