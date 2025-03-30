import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPostForm.module.css";

//collegamento al backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const EditPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ comment: "", imageUrl: "", title: "" });

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
      const formData = new FormData();
      formData.append("image", post.imageUrl);

      // Upload a Cloudinary
      const res = await fetch("http://localhost:5000/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.result.url;

      await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: post.comment,
            imageUrl,
            title: post.title,
        }),
      });

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
            onChange={(e) => setPost({ ...post, imageUrl: e.target.files[0] })}
          />
          <input
            type="text"
            className={styles.input}
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="modifica titolo"
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

export default EditPostForm;
