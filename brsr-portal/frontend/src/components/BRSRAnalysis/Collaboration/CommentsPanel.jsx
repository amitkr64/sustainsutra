import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Share2, X, Trash2, Reply, Bookmark, BookmarkCheck, MoreVertical, CheckCircle2 } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const CommentsPanel = ({ reportId, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const replyFormRef = useRef(null);
  const [newComment, setNewComment] = useState('');
  const [showResolved, setShowResolved] = useState(false);

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: {
        name: 'Current User',
        email: 'user@sustainsutra.in',
        avatar: null,
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      parentId: replyingTo?.id || null,
      resolved: false,
      likes: 0,
      replies: 0
    };

    setComments(prev => ({
      ...prev,
      [comment.id]: comment
    }));

    if (replyingTo) {
      setComments(prev => ({
        ...prev,
        [replyingTo.id]: {
          ...prev[replyingTo.id],
          replies: [...(prev[replyingTo.id].replies || []), comment]
        }
      }));
      setReplyingTo(null);
    }

    setNewComment('');
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    replyFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleEdit = (comment) => {
    setEditingComment(comment.id);
    setNewComment(comment.content);
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(prev => {
        const removeComment = (id, comments) => {
          const comment = comments[id];
          const hasReplies = comment.replies && comment.replies.length > 0;
          if (hasReplies) {
            const parentComment = comments.find(c => c.replies?.some(r => r.id === id));
            return {
              ...parentComment,
              replies: parentComment.replies.filter(r => r.id !== id)
            };
          }
          return removeComment;
        });
      });
    }
  };

  const handleResolve = (commentId) => {
    setComments(prev => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        resolved: !prev[commentId].resolved
      }
    }));
  };

  const handleLike = (commentId) => {
    setComments(prev => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        likes: (prev[commentId].likes || 0) + 1
      }
    }));
  };

  const filteredComments = showResolved 
    ? comments.filter(c => c.resolved)
    : comments.filter(c => !c.resolved);

  const groupedComments = filteredComments.reduce((groups, comment) => {
    if (!comment.parentId) {
      groups[comment.id] = { ...comment, replies: [] };
    }
    groups[comment.parentId] = {
      ...groups[comment.parentId],
      replies: [...groups[comment.parentId].replies, comment]
    };
    return groups;
  }, {});

  return (
    <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Comments & Discussion</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowResolved(!showResolved)}
            className="px-4 py-2 bg-navy border border-white/10 rounded-lg text-dimmed hover:border-gold/30 transition-all"
          >
            {showResolved ? 'Show All' : 'Hide Resolved'}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search comments..."
                  className="pl-10 pr-4 py-2 bg-navy border border-white/10 rounded-lg text-white placeholder-dimmed focus:border-gold outline-none w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={replyingTo ? `Replying to ${replyingTo.user.name}...` : 'Add a comment...'}
              ref={replyFormRef}
              className="w-full p-4 bg-navy border border-white/10 rounded-xl text-white placeholder-dimmed focus:border-gold outline-none min-h-[80px] resize-y"
              rows="3"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="px-6 py-2 bg-gold text-navy rounded-lg font-bold hover:bg-gold/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
            Post
          </button>
        </div>

        {Object.values(groupedComments).map(comment => {
          if (!comment.parentId) {
            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-navy border border-white/10 rounded-xl p-4"
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center">
                    <span className="text-navy font-bold text-lg">{comment.user.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className="text-dimmed" />
                      <div>
                        <div className="font-semibold text-white text-sm mb-1">{comment.user.name}</div>
                        <div className="text-xs text-dimmed">{new Date(comment.timestamp).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {comment.likes > 0 ? <BookmarkCheck size={16} className="text-gold" /> : <Bookmark size={16} className="text-dimmed hover:text-gold" />}
                    </button>
                    <button
                      onClick={() => handleReply(comment)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Reply size={16} className="text-dimmed hover:text-gold" />
                    </button>
                    {comment.user.email === 'user@sustainsutra.in' && (
                      <>
                        <button
                          onClick={() => handleEdit(comment)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <MessageSquare size={16} className="text-dimmed" />
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-sm text-dimmed mb-2 whitespace-pre-line">{comment.content}</div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 border-l-2 border-white/10 pl-4">
                    {comment.replies.map(reply => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                      >
                        <div className="absolute -left-2 top-0 w-0.5 h-full bg-white/10"></div>
                        <div className="pl-4">
                          <div className="flex gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{reply.user.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <User size={14} className="text-dimmed" />
                                <div>
                                  <div className="font-semibold text-white text-sm mb-1">{reply.user.name}</div>
                                  <div className="text-xs text-dimmed">{new Date(reply.timestamp).toLocaleDateString()}</div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleResolve(reply.id)}
                              className="text-xs px-2 py-1 rounded-full bg-navy border border-white/10 hover:bg-white/10 transition-all"
                            >
                              {reply.resolved ? 'Resolved' : 'Mark Resolved'}
                            </button>
                          </div>
                        </div>

                        <div className="text-sm text-dimmed mt-2 whitespace-pre-line">{reply.content}</div>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleResolve(comment.id)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      comment.resolved
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                        : 'bg-navy border-white/10 hover:bg-white/10 text-dimmed hover:text-white'
                    }`}
                  >
                    {comment.resolved ? '✓ Resolved' : 'Mark as Resolved'}
                  </button>
                  <span className="text-xs text-dimmed">
                    {comment.replies?.length || 0} {comment.replies?.length === 1 ? 'reply' : 'replies'}
                  </span>
                  <span className="text-xs text-dimmed">• {comment.likes || 0} likes</span>
                </div>
              </div>
            </motion.div>
            );
          }) || <div className="text-center text-dimmed py-12">No comments yet. Start the discussion!</div>
        )}
      </div>
    </div>
  );
};

export { CommentsPanel };
