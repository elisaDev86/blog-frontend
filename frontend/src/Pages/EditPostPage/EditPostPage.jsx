import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPostPage.module.css";

//collegamento al backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ comment: "", imageUrl: "", title: "" });
  const [newImage, setNewImage] = useState(null); // Nuova immagine selezionata

  useEffect(() => {
    // Recupera il post da modificare
    const fetchPost = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Errore nel recupero del post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = post.imageUrl; // Usa l'immagine attuale se non viene cambiata

      if (newImage) {
        // Se è stata selezionata una nuova immagine, fai l'upload su Cloudinary
        const formData = new FormData();
        formData.append("image", newImage);

        console.log("Caricamento immagine su Cloudinary...");

        const res = await fetch(`${backendUrl}/api/cloudinary/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("Risposta Cloudinary:", data);

        if (!data.result || !data.result.url) {
          throw new Error("Errore nell'upload su Cloudinary");
        }

        imageUrl = data.result.url; // Nuova immagine caricata
      }

      // Aggiorna il post con i nuovi dati
      const updateResponse = await fetch(`${backendUrl}/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: post.comment,
          imageUrl,
          title: post.title,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Errore nell'aggiornamento del post");
      }

      console.log("Post aggiornato con successo!");

      navigate("/"); // Reindirizza alla home dopo l'aggiornamento
    } catch (error) {
      console.error("Errore durante l'aggiornamento del post:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Modifica il tuo post</h1>
        <form onSubmit={handleUpdate} className={styles.form}>
          <input
            type="file"
            className={styles.fileInput}
            onChange={(e) => setNewImage(e.target.files[0])} // Salva la nuova immagine
          />
          <input
            type="text"
            className={styles.fileInput}
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Modifica titolo"
          />
          <textarea
            className={styles.textarea}
            value={post.comment}
            onChange={(e) => setPost({ ...post, comment: e.target.value })}
            placeholder="Modifica il tuo commento..."
          />
          <button type="submit" className={styles.button}>
            Salva modifiche
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPostPage;
