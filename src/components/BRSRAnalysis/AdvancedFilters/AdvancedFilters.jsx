import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Save, Trash2, Plus, Search, ArrowUpDown, CheckCircle2, XCircle, RefreshCw, Download, Calendar } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const FilterButton = ({ 
  label, 
  count = 0, 
  isActive, 
  onToggle, 
  onClear, 
  onEdit,
  onRemove,
  color = 'purple' 
}) => {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? `${color} text-white font-bold bg-opacity-80`
          : 'bg-navy text-dimmed hover:bg-white/10'
      }`}
    >
      <Filter size={16} className="text-dimmed" />
      <span>{label}</span>
      {count > 0 && (
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
          isActive 
            ? `${color} text-white`
            : 'bg-white text-navy'
        }`}>
          {count}
        </span>
      )}
      {count > 0 && onClear && (
        <button
          onClick={onClear}
          className="ml-2 p-1 hover:bg-red-500/20 rounded-full transition-colors"
        >
          <X size={14} className="text-red-400" />
        </button>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 p-1 hover:bg-red-500/20 rounded-full transition-colors"
        >
          <Trash2 size={14} className="text-red-400" />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <RefreshCw size={14} className="text-dimmed" />
        </button>
      )}
    </button>
  );
};

const FilterValue = ({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  min, 
  max,
  placeholder = '',
  options = [],
  prefix,
  suffix,
  icon: null
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm text-dimmed font-semibold">
          {label}
          {icon && <span className="mr-2">{icon}</span>}
        </label>
      </div>
      <div className="flex items-center gap-2">
        {type === 'number' ? (
          <>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              min={min}
              max={max}
              placeholder={placeholder}
              className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-gold outline-none"
            />
            {prefix && <span className="text-dimmed mr-2">{prefix}</span>}
            {suffix && <span className="text-dimmed ml-2">{suffix}</span>}
          </>
        ) : type === 'select' ? (
          <select
            value={value || ''}
            onChange={onChange}
            className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-gold outline-none"
          >
            <option value="">{placeholder}</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : type === 'range' ? (
          <input
            type="range"
            value={value || 0}
            onChange={onChange}
            min={min}
            max={max}
            className="w-full bg-navy text-white appearance-none focus:border-gold"
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 bg-navy border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-gold outline-none placeholder-dimmed"
          />
        )}
      </div>
    </div>
  );
};

const FilterGroup = ({ 
  title, 
  children,
  collapsed: false,
  onToggleCollapse,
  isCollapsible = true
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => {
          if (isCollapsible) {
            setIsCollapsed(!isCollapsed);
          }
        }}
        className="w-full flex items-center justify-between py-4 px-4 hover:bg-white/5 transition-colors"
      >
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {isCollapsible && (
          <ChevronDown size={16} className="text-dimmed" />
        )}
      </button>
      </button>
      {!isCollapsed && children}
    </div>
  );
};

const FilterPreset = ({ name, description, filters, count, isActive, onApply }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onApply}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isActive 
          ? 'bg-gold/20 border-gold/50' 
          : 'bg-navy border-white/10 hover:border-gold/30'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">{name}</div>
          <div className="text-xs text-dimmed">{description}</div>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <CheckCircle2 size={18} className="text-gold" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10" />
          )}
          <div className="text-sm font-medium text-navy">
            {count}
          </div>
        </div>
      </div>
      </motion.div>
  );
};

const AdvancedFilters = ({ 
  report,
  onFiltersChange,
  filters,
  onApplyFilters,
  onResetFilters
}) => {
  const [showCustomFilter, setShowCustomFilter] = useState(null);
  const [savedPresets, setSavedPresets] = useState(() => {
    const saved = localStorage.getItem('brsr-filter-presets');
    return saved ? JSON.parse(saved) : [];
  });
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [selectedPresets, setSelectedPresets] = useState([]);

  const presetPresets = [
    {
      name: 'All Data',
      description: 'No filters applied',
      filters: {}
    },
    {
      name: 'Last Year Data',
      description: 'Only shows last year metrics',
      filters: { dateRange: '1y' }
    },
    {
      name: 'Year to Date',
      description: 'Compare across years',
      filters: { comparisonMode: 'yoy' }
    },
    {
      name: 'Top Performers',
      description: 'Show top 5 ESG scores',
      filters: { sortBy: 'esgScore', limit: 5, order: 'desc' }
    },
    {
      name: 'High Risk',
      description: 'Only show high-risk items',
      filters: { dataQuality_min: 60, severity: 'critical|high' }
    },
    {
      name: 'Regulatory Only',
      description: 'Hide optional metrics',
      filters: { showOnly: ['p1_.*', 'p8_.*'] }
    },
  ];

  const customFilterGroups = [
    {
      id: 'dateRange',
      title: 'Date Range',
      icon: Calendar,
      collapsible: true,
      filters: [
        { id: 'dateRange', label: 'Period', type: 'select', value: filters.dateRange || 'all', options: [
          { value: 'all', label: 'All Time' },
          { value: '1m', label: '1 Month' },
          { value: '3m', label: '3 Months' },
          { value: '6m', label: '6 Months' },
          { value: '1y', label: '1 Year' },
          { value: '2y', label: '2 Years' },
          { value: '5y', label: '5 Years' },
        ]}
      ]
    },
    {
      id: 'esgScore',
      title: 'ESG Score',
      icon: Target,
      collapsible: true,
      filters: [
        { id: 'esgScore', label: 'Score Range', type: 'range', min: 0, max: 100, value: filters.esgScore_min || 0, suffix: '%' },
        { id: 'esgScore', label: 'Score Range', type: 'range', min: 0, max: 100, value: filters.esgScore_max || 100, suffix: '%' },
      ]
    },
    {
      id: 'dataQuality',
      title: 'Data Quality',
      icon: CheckCircle2,
      collapsible: true,
      filters: [
        { id: 'dataQuality_min', label: 'Minimum Score', type: 'number', placeholder: '0', min: 0, max: 100, value: filters.dataQuality_min || 0 },
          { id: 'dataQuality_max', label: 'Maximum Score', type: 'number', placeholder: '80', min: 0, max: 100, value: filters.dataQuality_max || 80 },
          { id: 'dataQuality_severity', label: 'Severity Level', type: 'select', options: [
            { value: 'all', label: 'All Levels' },
            { value: 'critical', label: 'Critical Only' },
            { value: 'critical|high', label: 'Critical & High' },
            { value: 'critical|high|medium', label: 'All but Low' },
            { value: 'critical|high|medium|low', label: 'All Levels' },
            { value: 'critical|high|low', label: 'Low & Very Low' },
          { value: 'medium|low', label: 'Medium & Low' },
            { value: 'critical|high', label: 'Medium Only' },
            { value: 'low', label: 'Low Only' },
            { value: 'all', label: 'All Levels' },
          ]}
        ]
      }
      },
    {
      id: 'principles',
      title: 'Principles',
      icon: CheckCircle2,
      collapsible: true,
      filters: [
        { id: 'principles', label: 'Include Principles', type: 'multi-select', options: [
          { id: 'p1', label: 'Principle 1 (Ethics)', checked: true },
          { id: 'p3', label: 'Principle 3 (Employees)', checked: true },
          { id: 'p6', label: 'Principle 6 (Environment)', checked: true },
          { id: 'p8', label: 'Principle 8 (Governance)', checked: true },
          { id: 'p9', label: 'Principle 9 (Business)', checked: true },
        ]
      }
    },
    {
      id: 'metrics',
      title: 'Metrics',
      icon: Database,
      collapsible: true,
      filters: [
        { id: 'metrics_env', label: 'Environmental Metrics', type: 'multi-select', options: [
          { id: 'p6_energy', label: 'Energy', checked: true },
          { id: 'p6_water', label: 'Water', checked: true },
          { id: 'p6_ghg', label: 'Emissions', checked: true },
          { id: 'p6_waste', label: 'Waste', checked: true },
          { id: 'p6_renewable', label: 'Renewable', checked: true },
        ]}
        ],
      },
      { id: 'metrics_social', label: 'Social Metrics', type: 'multi-select', options: [
          { id: 'p3_total_employees', label: 'Total Employees', checked: true },
          { id: 'p3_permanent_employees', label: 'Permanent Employees', checked: true },
          { id: 'p3_female_directors', label: 'Female Directors', checked: true },
          { id: 'p3_female_kmp', label: 'Female KMPs', checked: true },
          { id: 'p3_employee_turnover_rate', label: 'Turnover Rate', checked: true },
        ],
      },
      { id: 'metrics_governance', label: 'Governance Metrics', type: 'multi-select', options: [
          { id: 'p1_board_meetings', label: 'Board Meetings', checked: true },
          { id: 'p1_independent_directors', label: 'Independent Directors', checked: true },
          { id: 'p1_board_attendance', label: 'Board Attendance', checked: true },
          { id: 'p8_csr_percentage', label: 'CSR %', checked: true },
        ],
      },
    },
    {
      id: 'custom',
      title: 'Custom Filters',
      icon: Plus,
      collapsible: true,
      custom: true
    },
  ];

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    const newPreset = {
      name: presetName,
      description: `Custom filter: ${Object.entries(filters).filter(([k, v]) => v).join(', ')}`,
      filters: { ...filters },
      createdAt: new Date().toISOString()
    };

    setSavedPresets(prev => [...prev, newPreset]);
    setShowPresetModal(false);
  };

  const handleApplyPreset = (preset) => {
    onFiltersChange(preset.filters);
    setShowPresetModal(false);
    setSelectedPresets([preset]);
  };

  const handleDeletePreset = (presetId) => {
    setSavedPresets(prev => prev.filter(p => p.name !== presetId));
  };

  const handleReset = () => {
    onResetFilters();
    setSelectedPresets([]);
    onResetFilters();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterButton
          label="Date Range"
          count={Object.keys(filters).filter(k => k.startsWith('dateRange')).length}
          isActive={showCustomFilter === 'dateRange'}
          onToggle={() => setShowCustomFilter('dateRange')}
          color="text-blue-400"
        />
        <FilterButton
          label="ESG Score"
          count={Object.keys(filters).filter(k => k.startsWith('esgScore')).length}
          isActive={showCustomFilter === 'esgScore'}
          onToggle={() => setShowCustomFilter('esgScore')}
          color="text-emerald-400"
        />
        <FilterButton
          label="Data Quality"
          count={Object.keys(filters).filter(k => k.startsWith('dataQuality')).length}
          isActive={showCustomFilter === 'dataQuality'}
          onToggle={() => setShowCustomFilter('dataQuality')}
          color="text-amber-400"
        />
        <FilterButton
          label="Principles"
          count={Object.keys(filters).filter(k => k.startsWith('principles')).length}
          isActive={showCustomFilter === 'principles'}
          onToggle={() => setShowCustomFilter('principles')}
          color="text-purple-400"
        />
        <FilterButton
          label="Metrics"
          count={Object.keys(filters).filter(k => k.startsWith('metrics')).length}
          isActive={showCustomFilter === 'metrics'}
          onToggle={() => setShowCustomFilter('metrics')}
          color="text-cyan-400"
        />
        <FilterButton
          label="Active Filters"
          count={Object.keys(filters).filter(k => !!Object.keys(filters).find(k => k !== 'dateRange' && !k.startsWith('custom'))).length}
          onClear={handleReset}
          onEdit={() => setShowCustomFilter('custom')}
          color="text-pink-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {presetPresets.map(preset => {
          const isActive = selectedPresets.length > 0 && selectedPresets[0]?.name === preset.name;
          return (
            <FilterPreset
              key={preset.name}
              name={preset.name}
              description={preset.description}
              filters={preset.filters}
              count={Object.keys(preset.filters).length}
              isActive={isActive}
              onApply={() => handleApplyPreset(preset)}
            />
          );
        })}
      </div>

      <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Saved Presets</h3>
          <button
            onClick={() => setShowPresetModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy px-6 py-2 rounded-lg font-bold hover:bg-gold/80 transition-all"
          >
            <Plus size={18} />
            Save Current as Preset
          </button>
        </div>
      </div>

      {showPresetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-light/80 backdrop-blur-sm">
          <div className="bg-navy border border-white/10 rounded-3xl p-6 max-w-md w-[90vw]">
            <h3 className="text-2xl font-bold text-white mb-6">Save Filter Preset</h3>
            <div className="mb-4">
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Enter preset name..."
                className="w-full bg-navy border border-white/10 rounded-xl px-4 py-3 text-white text-white placeholder-dimmed focus:border-gold outline-none"
              />
            </div>
            <button
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className="w-full px-6 py-2 bg-gold text-navy rounded-lg font-bold hover:bg-gold/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Preset
            </button>
            <button
              onClick={() => setShowPresetModal(false)}
              className="px-6 py-2 bg-navy border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {customFilterGroups.map(group => (
        <FilterGroup
          key={group.id}
          title={group.title}
          icon={group.icon}
          filters={group.filters}
          isCollapsible={group.collapsible}
        >
          {group.id === 'custom' && group.custom && (
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={filters.custom_filter_name || ''}
                  onChange={(e) => onFiltersChange({ ...filters, custom_filter_name: e.target.value })}
                  placeholder="Custom filter name..."
                  className="flex-1 bg-navy border border-white/10 rounded-lg px-4 py-2 text-white text-white placeholder-dimmed focus:border-gold outline-none"
                />
                <button
                  onClick={() => {
                    const name = filters.custom_filter_name || `Custom ${Date.now()}`;
                    onFiltersChange({ ...filters, [`custom_filter_${name}`]: '' });
                    setShowCustomFilter(`custom_${name}`);
                  }}
                  className="px-4 py-2 bg-navy border border-white/10 rounded-lg hover:border-gold/30 transition-colors"
                >
                  <Plus size={16} className="text-dimmed" />
                  Add Filter
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const name = filters.custom_filter_name || `Custom ${Date.now()}`;
                    if (window.confirm(`Delete custom filter "${name}"?`)) {
                      onFiltersChange({ ...filters, [`custom_filter_${name}`]: undefined });
                    setShowCustomFilter(null);
                    }
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          )}
        </FilterGroup>
      )}
    </div>

      <div className="flex justify-end">
      <button
        onClick={onApplyFilters}
        className="px-8 py-3 bg-gold text-navy rounded-xl font-bold hover:bg-gold/80 transition-all"
      >
        Apply Filters
        </button>
        <button
          onClick={onResetFilters}
          className="px-8 py-3 bg-navy border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export { AdvancedFilters, FilterButton, FilterGroup, FilterPreset, FilterValue };
