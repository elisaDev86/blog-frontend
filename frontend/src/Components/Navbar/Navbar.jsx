import React, { useState, useContext } from 'react';
import styles from './Navbar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate per il reindirizzamento
import { UserContext } from '../../context/UserContext';  // Importa il contesto

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();  // Hook per il reindirizzamento
    const { logout } = useContext(UserContext);  // Usa il contesto per il logout

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Rimuovi il token dal localStorage
        localStorage.removeItem("token");

        // Usa il contesto per fare il logout
        logout();

        // Reindirizza l'utente alla pagina di login
        navigate("/login");
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Epi_Animals_Blog</h1>
            </div>
            <div className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li>
                        {/* Icona di logout */}
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            <FaSignOutAlt size={24} />
                        </button>
                    </li>
                </ul>
            </div>
            <div className={styles.burger} onClick={toggleMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </div>
        </nav>
    );
};

export default Navbar;
