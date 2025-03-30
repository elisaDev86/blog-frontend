import React from "react";
import PostItem from "../PostItem/PostItem";
import styles from "./PostList.module.css";

const PostList = ({ posts }) => {
    return (
        <div className={styles.gridContainer}>
            {posts.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
