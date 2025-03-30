import React, { useState } from "react";
import styles from "./CreatePostPage.module.css";
import { useNavigate } from "react-router-dom";

//collegamento al backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const CreatePostPage = () => {
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload a Cloudinary
      const res = await fetch(`${backendUrl}/api/cloudinary/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.result.url;

      // Recupera l'utente e il token dal localStorage
      const user = localStorage.getItem("user");
      const authToken = localStorage.getItem("authToken"); // Ottieni il token da localStorage
      const userData = JSON.parse(user);
      const email = userData?.email;

      // Salva il post nel backend
      await fetch(`${backendUrl}/api/posts/create` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Aggiungi il token nell'intestazione
        },
        body: JSON.stringify({ content: comment, imageUrl, email, title }),
      });

      redirect("/"); // Redirigi alla home dopo la creazione del post
    } catch (error) {
      console.error("Errore durante la creazione del post:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crea un nuovo post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="file"
          className={styles.fileInput}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          className={styles.fileInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title ..."
        />
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Scrivi un commento..."
        />
        <button type="submit" className={styles.button}>
          Crea Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
