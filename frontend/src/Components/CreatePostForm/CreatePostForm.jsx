import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePostForm.module.css";

//collegamento backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const CreatePostForm = () => {
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload immagine a Cloudinary
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "tuo_preset_cloudinary");

        try {
            const res = await fetch(`${backendUrl}/api.cloudinary.com/v1_1/tuo_account/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            const imageUrl = data.secure_url;

            // Salva il post nel backend
            console.log("Chiamata API:", `${import.meta.env.VITE_BACKEND_HOST}/api/posts`);

            await fetch(`${backendUrl}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment, imageUrl }),
            });

            navigate("/"); // Reindirizza alla home dopo la creazione
        } catch (error) {
            console.error("Errore durante la creazione del post:", error);
        }
    };

    return (
        <>
          <div className={styles.container}>
            <h1 className={styles.title}>Crea un nuovo post</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={styles.fileInput}
                    accept="image/*"
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={styles.textarea}
                    placeholder="Scrivi un commento..."
                />
                <button type="submit" className={styles.button}>
                    Crea Post
                </button>
            </form>
        </div>
    </>
        
    );
};

export default CreatePostForm;
