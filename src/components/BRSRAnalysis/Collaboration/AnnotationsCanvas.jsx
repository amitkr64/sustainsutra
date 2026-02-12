import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Type, Edit3, Trash2, Move, Pin, MessageSquare, Highlighter, Eye, EyeOff } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const Annotation = ({ 
  id,
  x,
  y,
  type = 'highlight',
  content = '',
  author,
  timestamp,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onPin,
  replies = [],
  isPinned = false,
  isResolved = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showReplies, setShowReplies] = useState(false);
  const annotationRef = useRef(null);

  const typeIcons = {
    highlight: Highlighter,
    note: MessageSquare,
    comment: Type,
    question: AlertTriangle,
  };

  const Icon = typeIcons[type] || Type;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (isSelected && annotationRef.current) {
      annotationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  const handleSaveEdit = () => {
    onEdit(id, editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <motion.div
      ref={annotationRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      className={`${isSelected ? 'ring-2 ring-gold/50 z-50' : ''} z-40`}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-navy border ${isSelected ? 'border-gold/50' : 'border-white/10'} rounded-2xl shadow-lg max-w-sm p-4"
      >
        <div className={`flex items-center justify-between mb-2 ${isSelected ? 'cursor-move' : ''}`}>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${type === 'highlight' ? 'bg-amber-500/20' : 'bg-navy-light/30'}`}>
              <Icon size={16} className="text-dimmed" />
            </div>
            <div className="text-xs text-dimmed">{author} • {new Date(timestamp).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <button onClick={onEdit} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <Edit3 size={14} className="text-dimmed" />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors">
              <Trash2 size={14} className="text-red-400" />
            </button>
          )}
          {onPin && (
            <button onClick={() => onPin(id)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <Pin size={14} className={`text-dimmed ${isPinned ? 'text-gold' : ''}`} />
            </button>
          )}
          <button onClick={() => onSelect(id)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
            <Eye size={14} className="text-dimmed" />
          </button>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showReplies ? <EyeOff size={14} className="text-dimmed" /> : <MessageSquare size={14} className="text-dimmed" />}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full bg-navy border border-white/10 rounded-lg p-2 text-white text-sm resize-y min-h-[80px] focus:border-gold outline-none"
            rows={4}
            placeholder="Edit annotation..."
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-all"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-navy border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-dimmed whitespace-pre-wrap">
          {content}
        </div>
      )}

      {replies.length > 0 && showReplies && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
          {replies.map((reply, index) => (
            <div key={index} className="ml-8 relative">
              <div className="absolute left-0 top-0 -translate-x-full w-0.5 h-0.5 bg-gold" />
              <div className="ml-4 pl-4 py-2 bg-navy-light/30 rounded-lg text-sm">
                <div className="text-xs text-dimmed mb-1">{reply.author} • {new Date(reply.timestamp).toLocaleDateString()}</div>
                <div className="text-white">{reply.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isResolved && (
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">Resolved</span>
        </div>
      )}
    </motion.div>
  );
};

const AnnotationsCanvas = ({ report, onAddAnnotation, onEditAnnotation, onDeleteAnnotation, onTogglePin }) => {
  const [annotations, setAnnotations] = useState([]);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [mode, setMode] = useState('highlight');

  const modes = [
    { id: 'highlight', label: 'Highlight', icon: Highlighter, color: 'bg-amber-500/20 text-amber-400' },
    { id: 'note', label: 'Note', icon: MessageSquare, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'comment', label: 'Comment', icon: Type, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'question', label: 'Question', icon: AlertTriangle, color: 'bg-red-500/20 text-red-400' },
  ];

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newAnnotation = {
      id: Date.now().toString(),
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      type: mode,
      content: '',
      author: { name: 'You', email: 'user@sustainsutra.in' },
      timestamp: new Date().toISOString()
    };

    setAnnotations(prev => [...prev, newAnnotation]);
    setShowAnnotationModal(false);
    setSelectedAnnotation(newAnnotation.id);
  };

  const handleAnnotationSave = (content) => {
    onEditAnnotation(selectedAnnotation.id, content);
    setAnnotations(prev =>
      prev.map(a => 
        a.id === selectedAnnotation.id ? { ...a, content, timestamp: new Date().toISOString() } : a
      )
    );
    setSelectedAnnotation(null);
  };

  const handleAnnotationCancel = () => {
    setShowAnnotationModal(false);
    setSelectedAnnotation(null);
  };

  const handleDeleteAnnotation = (id) => {
    onDeleteAnnotation(id);
    setAnnotations(prev => prev.filter(a => a.id !== id));
    setSelectedAnnotation(null);
  };

  const handleTogglePin = (id) => {
    onTogglePin(id);
    setAnnotations(prev =>
      prev.map(a =>
        a.id === id ? { ...a, isPinned: !a.isPinned } : a
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Annotations</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAnnotationModal(true)}
            className="inline-flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg font-bold hover:bg-gold/80 transition-all shadow-lg shadow-gold/20"
          >
            <Plus size={18} />
            Add Annotation
          </button>
          <div className="flex gap-2">
            {modes.map(mode => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setMode(mode.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                    activeTab === mode.id
                      ? `${mode.color} text-white font-bold`
                      : 'bg-navy text-dimmed hover:border-white/10'
                  }`}
                >
                  <Icon size={18} className="text-dimmed" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-navy-light/20 border border-white/10 rounded-3xl relative overflow-hidden" style={{ height: '500px' }}>
        <div className="w-full h-full relative cursor-crosshair" onClick={handleCanvasClick}>
          {annotations.map(annotation => (
            <Annotation
              key={annotation.id}
              {...annotation}
              onSelect={() => setSelectedAnnotation(annotation.id)}
              onEdit={(id, content) => {
                setAnnotations(prev =>
                  prev.map(a => a.id === id ? { ...a, content } : a
                )
              );
                setSelectedAnnotation(null);
              }}
              onDelete={() => handleDeleteAnnotation(annotation.id)}
              onPin={() => handleTogglePin(annotation.id)}
              isSelected={selectedAnnotation === annotation.id}
              isPinned={annotation.isPinned}
              isResolved={annotation.resolved}
            />
          ))}
          )}
          {selectedAnnotation && (
            <div className="absolute top-0 right-4 z-50 bg-navy border border-white/10 rounded-2xl p-4 w-64 shadow-2xl">
              <div className="mb-2">
                <input
                  type="text"
                  defaultValue={selectedAnnotation.content}
                  placeholder="Type your note..."
                  className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-dimmed focus:border-gold outline-none"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAnnotationSave(selectedAnnotation.content)}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500/30 transition-all"
                  >
                  Save
                </button>
                <button
                  onClick={() => setSelectedAnnotation(null)}
                  className="px-4 py-2 bg-navy border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-all"
                  >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {annotations.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-dimmed">
              <Plus size={48} className="text-gold/50 mb-4" />
              <div className="text-center">
                <div className="text-lg font-semibold text-white mb-2">Click anywhere to add annotation</div>
                <div className="text-sm text-dimmed">Highlight, note, or comment</div>
              </div>
            </div>
          )}
        </div>

        {annotations.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-navy border border-white/10 rounded-xl p-2">
            <div className="text-xs text-dimmed mb-2">
              {annotations.filter(a => a.isPinned).length} pinned
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnnotations(annotations.filter(a => !a.isPinned))}
                className="px-2 py-1.5 text-dimmed hover:text-white transition-colors"
              >
                Pin {annotations.filter(a => a.isPinned).length} / {annotations.length}
              </button>
              <button
                onClick={() => setAnnotations([])}
                className="px-2 py-1.5 text-dimmed hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAnnotationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-light/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-navy border border-white/10 rounded-3xl p-6 max-w-md w-[90vw]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Plus size={24} className="text-gold" />
                  <h3 className="text-2xl font-bold text-white">New Annotation</h3>
                </div>
                <button
                  onClick={handleAnnotationCancel}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                  <X size={20} className="text-dimmed" />
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white mb-3">Type</h4>
                <div className="flex gap-2">
                  {modes.map(mode => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setMode(mode.id)}
                        className={`flex-1 flex items-center gap-2 p-3 rounded-lg border transition-all ${
                          mode === activeTab
                            ? `${mode.color} text-white font-bold`
                            : 'bg-navy text-dimmed hover:border-gold/30'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${mode === activeTab ? mode.color.replace('text-', 'bg-').replace('500/20', '')} border-0`}>
                          <Icon size={20} className="text-dimmed" />
                        </div>
                        <span>{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Content</h4>
                  <textarea
                    value={selectedAnnotation?.content}
                    onChange={(e) => {
                      if (selectedAnnotation) {
                        setAnnotations(prev =>
                          prev.map(a =>
                            a.id === selectedAnnotation.id ? { ...a, content: e.target.value, timestamp: new Date().toISOString() } : a
                          )
                        );
                      }
                    }}
                    placeholder="Type your annotation here..."
                    className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dimmed focus:border-gold outline-none min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleAnnotationSave(selectedAnnotation?.content)}
                    disabled={!selectedAnnotation?.content?.trim()}
                    className="px-6 py-2 bg-gold text-navy rounded-xl font-bold hover:bg-gold/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Annotation
                  </button>
                  <button
                    onClick={handleAnnotationCancel}
                    className="px-6 py-2 bg-navy border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    );
};

export { AnnotationsCanvas, Annotation };
