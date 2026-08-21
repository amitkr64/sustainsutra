import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link2, Copy, Check, X, Users, Lock, Globe, Download, Plus } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const ShareModal = ({ isOpen, onClose, reportData, onShare }) => {
  const [selectedShareType, setSelectedShareType] = useState('email');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [permissions, setPermissions] = useState({
    view: true,
    download: true,
    comment: true,
    copy: true
  });

  const shareTypes = [
    { id: 'email', label: 'Email', icon: Link2, description: 'Send report via email' },
    { id: 'link', label: 'Copy Link', icon: Copy, description: 'Get shareable URL' },
    { id: 'public', label: 'Public Sharing', icon: Globe, description: 'Make publicly accessible' },
  { id: 'team', label:Team', icon: Users, description: 'Share with team members' },
  ];

  const handleShare = () => {
    onShare({
      type: selectedShareType,
      permissions
    });
    onClose();
  };

  const generateLink = () => {
    const link = `${window.location.origin}/brsr/reports/${reportData.id}`;
    setShareLink(link);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-navy-light/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-0 right-0 w-full max-w-lg bg-navy border border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <Share2 size={20} className="text-gold" />
                <h2 className="text-2xl font-bold text-white">Share Report</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} className="text-dimmed" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-dimmed mb-3">Select Sharing Method</h3>
                  <div className="space-y-3">
                    {shareTypes.map(type => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedShareType(type.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            selectedShareType === type.id
                              ? 'bg-gold/20 border-gold/50 text-gold font-bold'
                              : 'bg-navy border-white/10 text-dimmed hover:border-gold/30 hover:bg-white/10'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            selectedShareType === type.id
                              ? 'bg-gold/30'
                              : 'bg-navy-light/30'
                          }`}>
                            <Icon size={20} className="text-dimmed" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">{type.label}</div>
                            <div className="text-xs text-dimmed mt-1">{type.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedShareType === 'link' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-semibold text-white mb-2">Share Link</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={shareLink}
                          readOnly
                          className="flex-1 bg-navy border border-white/10 rounded-lg px-4 py-3 text-white placeholder-dimmed"
                        />
                        <button
                          onClick={copyLink}
                          className="px-4 py-2 bg-navy border border-white/10 rounded-lg hover:border-gold/30 transition-all"
                        >
                          {copied ? (
                            <>
                              <Check size={16} className="text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="text-dimmed" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-dimmed mb-3">Permissions</h3>
                  <div className="space-y-3">
                    {Object.entries(permissions).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-pointer hover:border-gold/30">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setPermissions(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="w-5 h-5 rounded border-white/20 bg-navy focus:border-gold focus:ring-0"
                        />
                        <span className="text-white font-medium ml-2 capitalize">{key.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-3 bg-gold text-navy px-6 py-3 rounded-xl font-bold hover:bg-gold/80 transition-all shadow-lg shadow-gold/20"
                >
                  <Share2 size={20} />
                  Share Report
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { ShareModal };
