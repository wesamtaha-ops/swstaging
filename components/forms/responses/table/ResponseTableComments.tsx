import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Edit2, Trash2, X } from 'lucide-react';
import { Comment } from './types';
import { format } from 'date-fns';

interface ResponseTableCommentsProps {
  comments: Comment[];
  onAddComment: (content: string, userId: string, userName: string, userAvatar: string) => void;
  onEditComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onClose: () => void;
}

export function ResponseTableComments({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onClose
}: ResponseTableCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(
      newComment,
      'current-user-id',
      'Current User',
      'https://ui-avatars.com/api/?name=Current+User'
    );
    setNewComment('');
  };

  const handleEdit = (commentId: string) => {
    onEditComment(commentId, editContent);
    setEditingId(null);
    setEditContent('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="excel-comment-thread"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-almarai text-gray-900">Comments</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 mb-4">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="font-almarai text-gray-900">{comment.userName}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {format(comment.timestamp, 'PPp')}
                      </span>
                    </div>
                    {editingId === comment.id ? (
                      <div className="mt-1">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          rows={2}
                        />
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-sm text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEdit(comment.id)}
                            className="text-sm text-indigo-600 hover:text-indigo-900"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                    )}
                  </div>
                </div>
                {!editingId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditContent(comment.content);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteComment(comment.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-start space-x-3">
          <img
            src="https://ui-avatars.com/api/?name=Current+User"
            alt="Current User"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4 mr-1.5" />
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}