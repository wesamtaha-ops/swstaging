import React, { useState } from 'react';
import { User, Send, Edit2, Trash2, Reply, AtSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface Comment {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  mentions: string[];
  replies?: Comment[];
}

interface ResponseCommentsProps {
  responseId: string;
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

export function ResponseComments({ responseId, collaborators }: ResponseCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      },
      content: 'This response shows some interesting patterns in the customer feedback.',
      timestamp: new Date('2024-02-20T10:30:00Z'),
      mentions: [],
      replies: [
        {
          id: '2',
          user: {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
          },
          content: '@John Doe Agreed! The satisfaction scores are notably high.',
          timestamp: new Date('2024-02-20T10:35:00Z'),
          mentions: ['1'],
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [mentionSearch, setMentionSearch] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      user: {
        id: '1',
        name: 'Current User',
        avatar: 'https://ui-avatars.com/api/?name=Current+User',
      },
      content: newComment,
      timestamp: new Date(),
      mentions: [],
    };

    if (replyTo) {
      setComments(comments.map(comment =>
        comment.id === replyTo
          ? {
            ...comment,
            replies: [...(comment.replies || []), newCommentObj]
          }
          : comment
      ));
      setReplyTo(null);
    } else {
      setComments([...comments, newCommentObj]);
    }

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

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="relative">
              <textarea
                rows={3}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {showMentions && (
                <div className="absolute bottom-full mb-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200">
                  <ul className="py-1">
                    {collaborators.map((collaborator) => (
                      <li
                        key={collaborator.id}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                        onClick={() => {
                          setNewComment(newComment + collaborator.name + ' ');
                          setShowMentions(false);
                        }}
                      >
                        <img
                          src={collaborator.avatar}
                          alt={collaborator.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <span className="text-sm font-almarai text-gray-700">
                          {collaborator.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-almarai text-gray-700 bg-white hover:bg-gray-50"
                >
                  <AtSign className="h-4 w-4 mr-1" />
                  Mention
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-almarai rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={comment.user.avatar}
                  alt={comment.user.name}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-almarai text-gray-900">
                      {comment.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {comment.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>{comment.content}</p>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                  <button
                    onClick={() => setReplyTo(comment.id)}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 ml-6 border-l-2 border-gray-100 pl-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={reply.user.avatar}
                            alt={reply.user.name}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-almarai text-gray-900">
                                {reply.user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {reply.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
