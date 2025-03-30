// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Creiamo il contesto
const UserContext = createContext();

// Crea il provider che avvolgerà l'applicazione
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stato che conterrà l'utente loggato
    const [authToken, setAuthToken] = useState(null); // Stato per il token di autenticazione

    useEffect(() => {
        // Al montaggio del componente, verifica se ci sono dati utente e token nel localStorage
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("authToken");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser)); // Imposta l'utente dallo storage locale
            setAuthToken(storedToken); // Imposta il token dallo storage locale
        }
    }, []);

    const login = (userData, token) => {
        // Funzione per gestire il login dell'utente
        setUser(userData);
        setAuthToken(token);
        localStorage.setItem("user", JSON.stringify(userData)); // Salva l'utente in localStorage
        localStorage.setItem("authToken", token); // Salva il token in localStorage
    };

    const logout = () => {
        // Funzione per gestire il logout dell'utente
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("user"); // Rimuovi l'utente da localStorage
        localStorage.removeItem("authToken"); // Rimuovi il token da localStorage
    };

    return (
        <UserContext.Provider value={{ user, authToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
