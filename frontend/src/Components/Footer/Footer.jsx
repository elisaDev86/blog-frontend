import React from 'react';
import styles from './Footer.module.css'; 

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>© 2025 Il mio Epi_Animals_Blog. Tutti i diritti riservati.</p>
                <div className={styles.socialLinks}>
                    <a href="#" className={styles.link}>Facebook</a>
                    <a href="#" className={styles.link}>Twitter</a>
                    <a href="#" className={styles.link}>Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
