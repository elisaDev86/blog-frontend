import React, { useState } from "react";
import EditPopup from "../EditPopup/EditPopup";
import styles from "./PostItem.module.css";

const PostItem = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);
  const loggedInUser = localStorage.getItem("user"); // Ottieni l'utente loggato

  const userEmail = JSON.parse(loggedInUser)?.email || null; // Ottieni l'email dell'utente loggato

  return (
    <div
      className={styles.postContainer}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <img src={post.imageUrl} alt="Post" className={styles.postImage} />

      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postComment}>{post.content}</p>

      {post?.author?.email && (
        <p className={styles.postUser}>By {post.author.email}</p>
      )}

      {showPopup && userEmail === post.author.email && (
        <EditPopup postId={post._id} />
      )}
    </div>
  );
};

export default PostItem;
