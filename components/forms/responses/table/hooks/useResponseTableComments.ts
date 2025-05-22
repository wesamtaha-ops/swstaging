import { useState } from 'react';
import { Comment, CommentThread } from '../types';

export function useResponseTableComments() {
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [activeCommentThread, setActiveCommentThread] = useState<CommentThread | null>(null);

  const addComment = (responseId: string, content: string, userId: string, userName: string, userAvatar: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId,
      userName,
      userAvatar,
      content,
      timestamp: new Date()
    };

    setComments(prev => ({
      ...prev,
      [responseId]: [...(prev[responseId] || []), newComment]
    }));
  };

  const editComment = (responseId: string, commentId: string, content: string) => {
    setComments(prev => ({
      ...prev,
      [responseId]: prev[responseId].map(comment => 
        comment.id === commentId 
          ? { ...comment, content, edited: true }
          : comment
      )
    }));
  };

  const deleteComment = (responseId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [responseId]: prev[responseId].filter(comment => comment.id !== commentId)
    }));
  };

  return {
    comments,
    addComment,
    editComment,
    deleteComment,
    activeCommentThread,
    setActiveCommentThread
  };
}