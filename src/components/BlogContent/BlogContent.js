import React, { Component } from 'react';
import './BlogContent.css';
import BlogCard from './components/BlogCard';
import { posts } from '../../shared/ProjectData';
import PostForm from './components/PostForm';

class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPosts: true,
            posts: [],
            showModal: false
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = () => {
        fetch('http://localhost:4000/api/data')
            .then(response => response.json())
            .then(data => {
                const filteredPosts = data.map(({ id, title, content }) => ({ id, title, content }));
                this.setState({ posts: filteredPosts });
            })
            .catch(error => console.error('Ошибка при получении постов:', error));
    }

    togglePosts = () => {
        this.setState(prevState => ({
            showPosts: !prevState.showPosts
        }));
    }

    toggleLike = (postId, isLiked) => {
        this.setState(prevState => {
            const updatedPosts = prevState.posts.map(post => {
                if (post.id === postId) {
                    return { ...post, likes: post.likes + (isLiked ? -1 : 1) };
                }
                return post;
            });
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            return { posts: updatedPosts };
        });
    }

    deletePost = (postId) => {
        fetch(`http://localhost:4000/api/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при удалении поста');
            }
            return response.json();
        })
        .then(() => {
            this.setState(prevState => {
                const updatedPosts = prevState.posts.filter(post => post.id !== postId);
                return { posts: updatedPosts };
            });
        })
        .catch(error => console.error('Ошибка:', error));
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    handlePostSubmit = (title, content) => {
        const newPost = {
            id: Date.now(),
            title,
            content,
            liked: false
        };

        this.setState(prevState => ({
            posts: [newPost, ...prevState.posts],
            showModal: false
        }), () => {
            localStorage.setItem('posts', JSON.stringify(this.state.posts));
        });
    }

    render() {
        const blogPosts = this.state.posts.map(post => (
            <BlogCard 
                post={post} 
                key={post.id} 
                onLikeToggle={(isLiked) => this.toggleLike(post.id, isLiked)} 
                onDelete={() => this.deletePost(post.id)}
            />
        ));

        return (
            <>
                <h1>Simple Blog</h1>
                <button onClick={this.togglePosts}>
                    {this.state.showPosts ? 'Скрыть посты' : 'Показать посты'}
                </button>
                <button onClick={this.toggleModal} className="open-modal-button">
                    Добавить пост
                </button>
                {this.state.showPosts && (
                    <div className="posts">
                        {blogPosts}
                    </div>
                )}
                {this.state.showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={this.toggleModal}>&times;</span>
                            <PostForm onSubmit={this.handlePostSubmit} />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default BlogContent;