import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditPopup.module.css";

const EditPopup = ({ postId }) => {
    const navigate = useNavigate();

    return (
        <button
            className={styles.popupContainer}
            onClick={() => navigate(`/edit/${postId}`)}
        >
            <p className={styles.popupText}>Clicca qui per modificare</p>
        </button>
    );
};

export default EditPopup;

