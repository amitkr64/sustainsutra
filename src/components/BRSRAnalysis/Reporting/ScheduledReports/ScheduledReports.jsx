import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Download, FileText, Clock, CheckCircle2, X, Play, Pause, RefreshCw, Filter, ChevronDown, ChevronUp, Mail, CalendarCheck } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const ScheduledReport = ({ 
  id,
  name,
  description,
  type = 'pdf',
  schedule,
  format = 'weekly',
  frequency = 'every',
  recipients = [],
  status = 'scheduled',
  lastRun,
  nextRun,
  onNextRun,
  onToggle,
  onEdit,
  onDelete,
  onRunNow
}) => {
  const [expanded, setExpanded] = useState(false);

  const statusConfig = {
    'scheduled': { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    'running': { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', 'border-emerald-400/50' },
    'paused': { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    'completed': { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'failed': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  };

  const config = statusConfig[status] || statusConfig.scheduled;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-navy-light/30 border ${config.border} rounded-xl p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="text-lg font-bold text-white">{name}</div>
          <div className="text-xs text-dimmed">{description}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-2 py-1 rounded-full ${config.bg} text-white`}>
            {status.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={() => onToggle(id)}
            className={`ml-4 p-1 hover:opacity-80 transition-colors ${status === 'completed' ? 'cursor-not-allowed' : ''}`}
          >
            {status === 'running' ? <Pause size={18} className="text-dimmed" /> : <Play size={18} className="text-dimmed" />}
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEdit(id)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <CalendarCheck size={16} className="text-dimmed" />
            </button>
            <button
              onClick={() => onRunNow(id)}
              className="p-1 hover:bg-emerald-500/20 rounded-lg transition-colors"
            >
              <RefreshCw size={16} className="text-dimmed" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <X size={16} className="text-dimmed" />
            </button>
          </div>
        </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-dimmed hover:text-white transition-colors"
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4"
          >
            <div className="grid grid-cols-2 gap-4 text-sm text-dimmed">
              <div>
                <span className="text-dimmed">Type:</span>
                <div className="text-white font-medium">{type.toUpperCase()}</div>
              </div>
              <div>
                <span className="text-dimmed">Format:</span>
                <div className="text-white font-medium">{format.toUpperCase()}</div>
              </div>
              <div>
                <span className="text-dimmed">Frequency:</span>
                <div className="text-white font-medium">{frequency} ({schedule})</div>
              </div>
              <div>
                <span className="text-dimmed">Recipients:</span>
                <div className="text-white font-medium">{recipients.length} || 'All Users'}</div>
              </div>
            </div>
            <div>
              <span className="text-dimmed">Last Run:</span>
              <div className="text-white font-medium">{lastRun || 'Never'}</div>
            </div>
            <div>
              <span className="text-dimmed">Next Run:</span>
              <div className="text-white font-medium">{nextRun || 'Next ' + (onNextRun ? 'scheduled' : 'manual')}</div>
              </div>
            </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => onRunNow(id)}
                className="w-full px-4 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold hover:bg-emerald-500/30 transition-all"
              >
                Run Now
              </button>
              <button
                onClick={() => onEdit(id)}
                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                Edit Schedule
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ReportSchedule = ({ reports, onScheduleReport, onEditSchedule, onRunNowReport }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [reportSchedule, setReportSchedule] = useState([]);

  const frequencies = [
    { value: 'on_demand', label: 'On Demand', description: 'Run manually when needed' },
    { value: 'daily', label: 'Daily', description: 'Every day at specified time' },
    { value: 'weekly', label: 'Weekly', description: 'Every week' },
    { value: 'monthly', label: 'Monthly', description: 'Every month' },
    { value: 'quarterly', label: 'Quarterly', description: 'Every quarter' },
    { value: 'half_yearly', label: 'Half-Yearly', description: 'Twice a year' },
    { value: 'yearly', label: 'Yearly', description: 'Once a year' },
  ];

  const reportTypes = [
    { value: 'pdf', label: 'PDF Report', description: 'Complete analysis with all metrics' },
    { value: 'csv', label: 'CSV Export', description: 'Raw data download' },
    { value: 'excel', label: 'Excel Export', description: 'Formatted spreadsheet' },
    { value: 'dashboard', label: 'Dashboard Snapshot', description: 'Executive summary' },
  ];

  const handleCreateSchedule = () => {
    setShowScheduleModal(true);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleCreateSchedule}
        className="inline-flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-full font-bold hover:bg-gold/80 transition-all"
      >
        <Calendar size={18} />
        Schedule Report
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {frequencies.map(freq => (
            <motion.div
              key={freq.value}
              whileHover={{ scale: 1.02 }}
              onClick={() => onScheduleReport('all_reports', { frequency: freq.value })}
              className="p-4 bg-navy-light/30 border border-white/10 rounded-xl hover:border-gold/30 cursor-pointer transition-all"
            >
              <Clock size={24} className="text-dimmed mb-2" />
              <div className="text-white font-medium">{freq.label}</div>
              <div className="text-xs text-dimmed">{freq.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-light/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-navy border border-white/10 rounded-3xl p-6 max-w-4xl w-[90vw]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <Calendar size={24} className="text-gold" />
                <h2 className="text-2xl font-bold text-white">Schedule Report</h2>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} className="text-dimmed" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Report Type</h3>
                <div className="flex flex-wrap gap-2">
                  {reportTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => onScheduleReport(type.value, 'weekly')}
                      className={`px-4 py-3 rounded-xl border ${
                        reportSchedule.type === type.value
                          ? 'bg-gold/20 border-gold/50 text-gold font-bold'
                          : 'bg-navy border-white/10 hover:border-gold/30'
                      }`}
                    >
                      {type.label}
                    </button>
                ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Frequency</h3>
                <div className="flex flex-wrap gap-2">
                  {frequencies.map(freq => (
                    <button
                      key={freq.value}
                      onClick={() => onScheduleReport(reportSchedule.type || 'pdf', freq.value)}
                      className={`px-4 py-3 rounded-xl border ${
                        reportSchedule.frequency === freq.value && reportSchedule.frequency !== 'on_demand'
                          ? 'bg-gold/20 border-gold/50 text-gold font-bold'
                          : 'bg-navy border-white/10 hover:border-gold/30'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-6 py-2 bg-navy border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onEditSchedule(reportSchedule);
                    setShowScheduleModal(false);
                  }}
                  className="px-6 py-2 bg-gold text-navy rounded-xl font-bold hover:bg-gold/80 transition-all"
                >
                  Schedule Selected
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EmailNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'alert',
      severity: 'high',
      title: 'Data Quality Issue Detected',
      message: 'Scope 3 emissions reported as 0, but company has significant value chain operations',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      archived: false
    },
    {
      id: '2',
      type: 'info',
      severity: 'info',
      title: 'Report Generated Successfully',
      message: 'Your scheduled ESG report has been generated and is ready for download',
      timestamp: new Date().toISOString(),
      read: true,
      archived: false
    },
    {
      id: '3',
      type: 'warning',
      severity: 'medium',
      title: 'Scheduled Report Overdue',
      message: 'Your weekly ESG report is 2 days overdue. Report will be generated tomorrow.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      archived: false
    },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Notifications</h3>
        <button
          onClick={() => setNotifications([])}
          className="text-dimmed hover:text-white transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => {
          const Icon = notification.severity === 'high' ? AlertTriangle : notification.severity === 'warning' ? Bell : CheckCircle2;
          const iconMap = {
            alert: AlertTriangle,
            info: CheckCircle2,
            warning: Bell
          };
          const Icon = iconMap[notification.type] || Bell;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border-l-2 ${notification.read ? 'opacity-50' : ''} border-white/10 rounded-xl hover:border-gold/30 transition-all ${
                notification.severity === 'high'
                  ? 'border-red-500/30'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  notification.severity === 'high'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-navy border-white/10'
                }`}>
                  <Icon size={20} className="text-dimmed" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white font-medium mb-1">{notification.title}</div>
                  <div className="text-xs text-dimmed">{notification.message}</div>
                  <div className="text-xs text-dimmed">{new Date(notification.timestamp).toLocaleString()}</div>
                </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNotifications(prev => ({
                      ...prev,
                      [notification.id]: {
                        ...prev[notification.id],
                        archived: true,
                        read: true
                      }
                    }))}
                    className="text-xs text-dimmed hover:text-white transition-colors"
                  >
                    {notification.archived ? 'Archive' : 'Mark as read'}
                  </button>
                  <button
                    onClick={() => setNotifications(prev => ({
                      ...prev,
                      [notification.id]: {
                        ...prev[notification.id],
                        read: true
                      }
                    }))}
                    className="text-xs text-dimmed hover:text-white transition-colors"
                  >
                    Mark as unread
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    reports: true,
    alerts: true,
    emails: true,
    reports: 'every monday',
    alerts: 'weekly',
    threshold: 'critical',
  });

  const options = [
    { id: 'reports', label: 'Report Notifications', type: 'toggle', description: 'Email me when reports are ready' },
    { id: 'alerts', label: 'Alert Notifications', type: 'toggle', description: 'Send alerts for data quality issues' },
    { id: 'emails', label: 'Email Digest', type: 'toggle', description: 'Weekly digest of all notifications' },
    { id: 'reports_timing', label: 'Report Schedule', type: 'select', description: 'When to send reports', options: ['every monday', 'every tuesday', 'every wednesday', 'every thursday', 'every friday'] },
    { id: 'threshold', label: 'Alert Threshold', type: 'select', description: 'Trigger alerts above this severity level', options: ['critical', 'high', 'medium', 'low'] },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        {options.map(option => {
          return (
            <div key={option.id} className="flex items-center justify-between p-4 bg-navy border border-white/10 rounded-xl">
              <div>
                <div className="flex-1">
                  <span className="text-white font-medium">{option.label}</span>
                  <span className="text-xs text-dimmed">{option.description}</span>
                </div>
              </div>
              {option.type === 'toggle' ? (
                <button
                  onClick={() => setNotificationPreferences(prev => ({
                    ...prev,
                    [option.id]: !prev[option.id]
                  }))}
                  className={`w-12 h-6 rounded-full transition-all ${
                    notificationPreferences[option.id] ? 'bg-emerald-500 text-emerald-400' : 'bg-navy border-white/10'
                  }`}
                />
              ) : (
                <select
                  value={option.value || 'every'}
                  onChange={(e) => setNotificationPreferences(prev => ({ ...prev, [option.id]: e.target.value }))}
                  className="w-full h-6 border border-white/10 rounded-lg px-3 text-dimmed focus:border-gold outline-none"
                >
                  {option.options.map((opt, i) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>)
                  ))}
                </select>
              )}
                )}
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReportingPanel = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Reporting & Scheduling</h2>
        <button className="text-dimmed hover:text-white transition-colors">
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-navy border border-white/10 rounded-xl">
          <Bell size={32} className="text-gold mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white text-center">Scheduled Reports</h3>
          <EmailNotifications />
        </div>
        <div className="p-4 bg-navy border border-white/10 rounded-xl">
          <Calendar size={32} className="text-gold mx-auto mb-3" />
          <h3 className="text-lg font-bold text-center">Report Schedule</h3>
          <ReportSchedule />
        </div>
        <div className="p-4 bg-navy border border-white/10 rounded-xl">
          <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-center">Notification Settings</h3>
          <NotificationSettings />
        </div>
        </div>
      </div>
    </div>
  );
};

export { ScheduledReport, ReportSchedule, EmailNotifications, NotificationSettings, ReportingPanel };
