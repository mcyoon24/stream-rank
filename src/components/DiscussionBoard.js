import React, { useEffect, useState } from 'react';
import { postComment, subscribeToComments, deleteComment } from '../firestore';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './DiscussionBoard.css';

function DiscussionBoard({ movieId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = subscribeToComments(movieId, setComments);
        const user = auth.currentUser;
        if (user) {
            setCurrentUserId(user.uid);
        }
        return () => unsubscribe();
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user){
            return alert("You must be logged in to comment.");
        } 

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const username = userDoc.exists() ? userDoc.data().username : "Anonymous";

        await postComment(movieId, {
            userId: user.uid,
            username,
            content: newComment.trim(),
        });

        setNewComment("");
    };

    const handleDelete = async (commentId) => {
        const confirm = window.confirm("Are you sure you want to delete this comment?");
        if (confirm) {
            await deleteComment(movieId, commentId);
        }
    };

    return (
        <div className="discussion-board">
            <h3>Discussion</h3>
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                    <strong>{comment.username}:</strong> {comment.content}
                    {comment.userId === currentUserId && (
                        <button onClick={() => handleDelete(comment.id)} className="delete-button">
                            Delete
                        </button>
                    )}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default DiscussionBoard;
