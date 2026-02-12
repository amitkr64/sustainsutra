import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Palette, Bell, Globe, Moon, Sun, Save, RotateCcw, X } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const UserSettings = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('brsr-user-settings');
    return saved ? JSON.parse(saved) : {
      theme: 'dark',
      language: 'en',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'en-IN',
      autoSave: true,
      autoSaveInterval: 30,
      notifications: {
        email: true,
        browser: true,
        reports: true,
        alerts: true
      },
      defaultView: 'overview',
      compactMode: false,
      showTutorials: true,
      dataRefresh: 60,
      exportFormat: 'pdf',
      chartAnimations: true,
      showGridlines: true
    };
  });
  const [activeTab, setActiveTab] = useState('appearance');
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: Globe },
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem('brsr-user-settings', JSON.stringify(settings));
    if (onSave) {
      onSave(settings);
    }
    setHasChanges(false);
  };

  const handleReset = () => {
    const defaultSettings = {
      theme: 'dark',
      language: 'en',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'en-IN',
      autoSave: true,
      autoSaveInterval: 30,
      notifications: {
        email: true,
        browser: true,
        reports: true,
        alerts: true
      },
      defaultView: 'overview',
      compactMode: false,
      showTutorials: true,
      dataRefresh: 60,
      exportFormat: 'pdf',
      chartAnimations: true,
      showGridlines: true
    };
    setSettings(defaultSettings);
    setHasChanges(true);
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
            className="fixed inset-y-0 right-0 w-full max-w-3xl bg-navy border border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Settings className="text-gold" size={24} />
                <h2 className="text-2xl font-bold text-white">Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-dimmed" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-48 border-r border-white/10 p-4">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id 
                          ? 'bg-gold text-navy font-bold'
                          : 'text-dimmed hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'appearance' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleSettingChange('theme', 'dark')}
                          className={`flex-1 p-4 rounded-xl border transition-all ${
                            settings.theme === 'dark'
                              ? 'bg-gold/20 border-gold/50 text-gold font-bold'
                              : 'bg-navy border-white/10 text-dimmed hover:border-gold/30'
                          }`}
                        >
                          <Moon className="mr-2" size={20} />
                          Dark
                        </button>
                        <button
                          onClick={() => handleSettingChange('theme', 'light')}
                          className={`flex-1 p-4 rounded-xl border transition-all ${
                            settings.theme === 'light'
                              ? 'bg-gold/20 border-gold/50 text-gold font-bold'
                              : 'bg-navy border-white/10 text-dimmed hover:border-gold/30'
                          }`}
                        >
                          <Sun className="mr-2" size={20} />
                          Light
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Layout</h3>
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 cursor-pointer hover:border-gold/30">
                        <input
                          type="checkbox"
                          checked={settings.compactMode}
                          onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                          className="w-5 h-5 rounded border-white/20"
                        />
                        <div className="flex-1">
                          <span className="text-white font-medium">Compact Mode</span>
                          <span className="text-dimmed text-sm">More content per screen</span>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'general' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Timezone</h3>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="Asia/Mumbai">Asia/Mumbai</option>
                        <option value="Asia/Delhi">Asia/Delhi</option>
                        <option value="Asia/Bangalore">Asia/Bangalore</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Date Format</h3>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Number Format</h3>
                      <select
                        value={settings.numberFormat}
                        onChange={(e) => handleSettingChange('numberFormat', e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="en-IN">Indian (1,25,000)</option>
                        <option value="en-US">US (1,000.00)</option>
                        <option value="de-DE">European (1.000,00)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                        <input
                          type="checkbox"
                          checked={settings.notifications.email}
                          onChange={(e) => handleSettingChange('notifications', { ...settings.notifications, email: e.target.checked })}
                          className="w-5 h-5 rounded border-white/20"
                        />
                        <span className="text-white">Email me about report updates</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                        <input
                          type="checkbox"
                          checked={settings.notifications.reports}
                          onChange={(e) => handleSettingChange('notifications', { ...settings.notifications, reports: e.target.checked })}
                          className="w-5 h-5 rounded border-white/20"
                        />
                        <span className="text-white">Notify when reports are added</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                        <input
                          type="checkbox"
                          checked={settings.notifications.alerts}
                          onChange={(e) => handleSettingChange('notifications', { ...settings.notifications, alerts: e.target.checked })}
                          className="w-5 h-5 rounded border-white/20"
                        />
                        <span className="text-white">Alert me for data quality issues</span>
                      </label>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-4">Browser Notifications</h3>
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                      <input
                        type="checkbox"
                        checked={settings.notifications.browser}
                        onChange={(e) => handleSettingChange('notifications', { ...settings.notifications, browser: e.target.checked })}
                        className="w-5 h-5 rounded border-white/20"
                      />
                      <div className="flex-1">
                        <span className="text-white">Allow browser notifications</span>
                        <span className="text-dimmed text-sm">For report completions and reminders</span>
                      </div>
                    </label>
                  </motion.div>
                )}

                {activeTab === 'data' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Default View</h3>
                      <select
                        value={settings.defaultView}
                        onChange={(e) => handleSettingChange('defaultView', e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="overview">Overview Dashboard</option>
                        <option value="environmental">Environmental Analysis</option>
                        <option value="social">Social Analysis</option>
                        <option value="governance">Governance Analysis</option>
                        <option value="analytics">Analytics Dashboard</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Data Refresh</h3>
                      <div className="flex items-center gap-4">
                        <select
                          value={settings.dataRefresh}
                          onChange={(e) => handleSettingChange('dataRefresh', parseInt(e.target.value))}
                          className="flex-1 bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                        >
                          <option value={30}>30 seconds</option>
                          <option value={60}>1 minute</option>
                          <option value={300}>5 minutes</option>
                          <option value={600}>10 minutes</option>
                          <option value={3600}>1 hour</option>
                        </select>
                        <span className="text-dimmed text-sm">Auto-refresh interval</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Export Format</h3>
                      <select
                        value={settings.exportFormat}
                        onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none"
                      >
                        <option value="pdf">PDF Report</option>
                        <option value="csv">CSV Data</option>
                        <option value="json">JSON Data</option>
                        <option value="excel">Excel</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Chart Settings</h3>
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                        <input
                          type="checkbox"
                          checked={settings.chartAnimations}
                          onChange={(e) => handleSettingChange('chartAnimations', e.target.checked)}
                          className="w-5 h-5 rounded border-white/20"
                        />
                        <span className="text-white">Enable chart animations</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                        <input
                          type="checkbox"
                          checked={settings.showGridlines}
                          onChange={(e) => handleSettingChange('showGridlines', e.target.checked)}
                          className="w-5 h-5 rounded border-white/20"
                        />
                        <span className="text-white">Show gridlines in charts</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-dimmed hover:text-white transition-colors"
                >
                  <RotateCcw size={18} />
                  Reset to Default
                </button>
                <div className="h-8 w-px bg-white/10"></div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-dimmed hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
                    hasChanges
                      ? 'bg-gold text-navy hover:bg-gold/80 shadow-lg shadow-gold/20'
                      : 'bg-navy text-dimmed cursor-not-allowed'
                  }`}
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { UserSettings };
