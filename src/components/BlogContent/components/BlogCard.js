import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

function BlogCard({ post, onLikeToggle, onDelete }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        setLiked(likedPosts[post.id] || false);
    }, [post.id]);

    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        onLikeToggle(newLiked);

        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
        likedPosts[post.id] = newLiked;
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    };

    return (
        <div className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
                <IconButton onClick={handleLike}>
                    <FavoriteIcon sx={{ color: liked ? 'red' : 'inherit' }} />
                </IconButton>
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default BlogCard;