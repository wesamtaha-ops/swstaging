import React, { useState } from 'react';
import { User, Send, AtSign, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  mentions: string[];
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

export function CommentsTab() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      },
      content: 'Added a new section for customer feedback. @jane what do you think?',
      timestamp: '2 hours ago',
      mentions: ['jane'],
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [mentionSearch, setMentionSearch] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);

  const collaborators: Collaborator[] = [
    { id: '1', name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
    { id: '2', name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const mentions = newComment.match(/@(\w+)/g)?.map(m => m.slice(1)) || [];

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      },
      content: newComment,
      timestamp: 'Just now',
      mentions,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '@') {
      setShowMentions(true);
      setMentionSearch('');
    } else if (showMentions && e.key === 'Escape') {
      setShowMentions(false);
    }
  };

  const insertMention = (username: string) => {
    const lastAtIndex = newComment.lastIndexOf('@');
    const newValue = newComment.slice(0, lastAtIndex) + `@${username} `;
    setNewComment(newValue);
    setShowMentions(false);
  };

  const deleteComment = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id);
    setNewComment(comment.content);
  };

  const saveEdit = (commentId: string) => {
    setComments(comments.map(c =>
      c.id === commentId
        ? { ...c, content: newComment }
        : c
    ));
    setEditingComment(null);
    setNewComment('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-almarai text-gray-900">Discussion</h2>
        </div>

        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex space-x-3 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-almarai text-gray-900">
                        {comment.author.name}
                      </span>
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(comment)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {editingComment === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingComment(null);
                            setNewComment('');
                          }}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(comment.id)}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700">
                      {comment.content.split(' ').map((word, i) =>
                        word.startsWith('@') ? (
                          <span key={i} className="text-indigo-600 font-almarai">
                            {word}{' '}
                          </span>
                        ) : (
                          word + ' '
                        )
                      )}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 text-gray-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a comment... Use @ to mention collaborators"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={3}
                />
                {showMentions && (
                  <div className="absolute z-10 mt-1 w-60 rounded-md bg-white shadow-lg">
                    <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {collaborators.map((collaborator) => (
                        <li
                          key={collaborator.id}
                          onClick={() => insertMention(collaborator.name.toLowerCase().replace(' ', ''))}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
                        >
                          <div className="flex items-center">
                            <img
                              src={collaborator.avatar}
                              alt=""
                              className="h-6 w-6 rounded-full"
                            />
                            <span className="ml-3 block font-almarai truncate">
                              {collaborator.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setShowMentions(true)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-almarai rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <AtSign className="h-4 w-4 mr-1" />
                    Mention
                  </button>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}