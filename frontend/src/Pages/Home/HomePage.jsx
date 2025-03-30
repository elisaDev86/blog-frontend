import React, { useEffect, useState } from "react";
import PostList from "../../Components/PostList/PostList";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

//collegamento al backend
const backendUrl = import.meta.env.VITE_BACKEND_HOST;

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/posts`);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Errore nel recupero dei post:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        
    <>
        <div className={styles.container}>
            <h1 className={styles.title}>Post Recenti</h1>
            <PostList posts={posts} />
            <div className={styles.buttonContainer}>
            <Link to="/create-new-post" className={styles.createButton}>
                    Create New
             </Link>
            </div>
        </div>
    </>
    );
};

        
        
export default HomePage;
