import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ThumbsUp, Reply, Send } from 'lucide-react';
import type { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);
  const [sortBy, setSortBy] = useState<'top' | 'new'>('top');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: `new-${Date.now()}`,
      user: { name: 'You', avatar: '😎' },
      text: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
    };
    setLocalComments([comment, ...localComments]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg flex items-center gap-2" style={{ color: 'var(--color-on-surface)' }}>
          <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          Terminal Chatter
          <span
            className="text-xs font-normal px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface-variant)' }}
          >
            {localComments.length}
          </span>
        </h3>

        <div className="flex gap-1">
          {(['top', 'new'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className="px-3 py-1 rounded-lg text-xs font-medium capitalize cursor-pointer transition-colors"
              style={{
                backgroundColor: sortBy === sort ? 'var(--color-surface-bright)' : 'transparent',
                color: sortBy === sort ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
              }}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div
        className="flex items-start gap-3 p-3 rounded-xl"
        style={{ backgroundColor: 'var(--color-surface-container)' }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
          style={{ backgroundColor: 'var(--color-surface-container-highest)' }}
        >
          😎
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Drop your take..."
            className="w-full bg-transparent text-sm outline-none resize-none"
            style={{ color: 'var(--color-on-surface)', minHeight: '40px' }}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <div className="flex justify-end mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitComment}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
              style={{
                background: newComment.trim() ? 'linear-gradient(135deg, #46f1c5, #00d4aa)' : 'var(--color-surface-container-high)',
                color: newComment.trim() ? 'var(--color-on-primary)' : 'var(--color-outline)',
              }}
            >
              <Send className="w-3 h-3" />
              Post
            </motion.button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <AnimatePresence>
        <div className="space-y-1">
          {localComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex gap-3 p-3 rounded-xl transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                style={{ backgroundColor: 'var(--color-surface-container-highest)' }}
              >
                {comment.user.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>
                    {comment.user.name}
                  </span>
                  {comment.user.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'linear-gradient(135deg, rgba(70, 241, 197, 0.2), rgba(0, 212, 170, 0.2))',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {comment.user.badge}
                    </span>
                  )}
                  <span className="text-xs" style={{ color: 'var(--color-outline)' }}>
                    {comment.timestamp}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {comment.text}
                </p>

                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-xs cursor-pointer"
                    style={{ color: 'var(--color-outline)' }}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {comment.likes}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 text-xs cursor-pointer"
                    style={{ color: 'var(--color-outline)' }}
                  >
                    <Reply className="w-3 h-3" />
                    {comment.replies}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
