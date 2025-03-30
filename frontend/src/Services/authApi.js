import axios from "axios";

//collegamento al backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const API_URL = `${backendUrl}/api/users`;

// Funzione per registrare un utente
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);

        // Salva il token nel localStorage dopo una registrazione riuscita
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);  // Salva il token
        }

        return response.data;  // Ritorna la risposta (incluso il token)
    } catch (error) {
        throw error.response?.data?.message || "Errore nella registrazione";
    }
};

// Funzione per autenticare un utente (login)
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);

        // Salva il token nel localStorage dopo un login riuscito
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Errore di login";
    }
};

// Funzione per effettuare il logout
export const logoutUser = () => {
    // Rimuove il token dal localStorage
    localStorage.removeItem("token");
};

// Funzione per recuperare il token JWT dal localStorage
export const getToken = () => {
    return localStorage.getItem("token");
};

// Funzione per fare una richiesta protetta (aggiungi il token alle intestazioni)
export const protectedRequest = async (url, method = "GET", data = null) => {
    const token = getToken();  // Recupera il token dal localStorage

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,  // Aggiungi il token nelle intestazioni
        },
    };

    try {
        const response = await axios({
            url,
            method,
            data,
            ...config,  // Unisci le intestazioni con il resto della configurazione
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Errore nella richiesta protetta";
    }
};
