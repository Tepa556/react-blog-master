import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            if (response.ok) {
                setTitle('');
                setContent('');
            } else {
                console.error('Ошибка при отправке данных');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    return (
        <div className="post-form">
            <h2>Создать новый пост</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Заголовок" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Содержание" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                />
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default PostForm;