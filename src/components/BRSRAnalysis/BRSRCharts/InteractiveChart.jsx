import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Filter, Download, RefreshCw, Maximize2, ChevronDown, ChevronUp, Minimize2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const InteractiveChart = ({ 
  type = 'line', 
  data = [], 
  title, 
  subtitle, 
  metrics = [], 
  onRefresh, 
  onExport,
  onFilter,
  showLegend = true,
  height = 300,
  className = '' 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]?.id || null);
  const [timeRange, setTimeRange] = useState('all');

  const timeRanges = [
    { id: 'all', label: 'All Time' },
    { id: '1y', label: '1 Year' },
    { id: '6m', label: '6 Months' },
    { id: '3m', label: '3 Months' },
    { id: '1m', label: '1 Month' },
  ];

  const filteredData = data.filter(item => {
    if (timeRange === 'all') return true;
    // Add date filtering logic based on data structure
    return true;
  });

  const activeMetric = metrics.find(m => m.id === selectedMetric);

  const renderChart = () => {
    if (type === 'line') {
      return (
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke={SUSTAINSUTRA_THEME.colors.sage} />
          <XAxis
            dataKey={activeMetric?.xKey || 'name'}
            tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
            stroke="#64748B"
            strokeWidth={1.5}
          />
          <YAxis
            tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => value.toLocaleString('en-IN')}
            stroke="#64748B"
            strokeWidth={1.5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px' }}
            formatter={(value, name) => [value.toLocaleString('en-IN'), name]}
          />
          {metrics.map(metric => (
            <Line
              key={metric.id}
              type="monotone"
              dataKey={metric.dataKey}
              stroke={metric.color || SUSTAINSUTRA_THEME.colors.growth}
              strokeWidth={2}
              dot={{ fill: metric.color || SUSTAINSUTRA_THEME.colors.growth, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 3 }}
              name={metric.label}
            />
          ))}
          {showLegend && <Legend />}
        </LineChart>
      );
    }

    if (type === 'bar') {
      return (
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke={SUSTAINSUTRA_THEME.colors.sage} />
          <XAxis
            dataKey={activeMetric?.xKey || 'name'}
            tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
            stroke="#64748B"
            strokeWidth={1.5}
          />
          <YAxis
            tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => value.toLocaleString('en-IN')}
            stroke="#64748B"
            strokeWidth={1.5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px' }}
            formatter={(value, name) => [value.toLocaleString('en-IN'), name]}
          />
          {metrics.map(metric => (
            <Bar
              key={metric.id}
              dataKey={metric.dataKey}
              fill={metric.color || SUSTAINSUTRA_THEME.colors.growth}
              radius={[4, 4, 0, 0]}
              name={metric.label}
            />
          ))}
          {showLegend && <Legend />}
        </BarChart>
      );
    }

    if (type === 'area') {
      return (
        <AreaChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" stroke={SUSTAINSUTRA_THEME.colors.sage} />
          <XAxis
            dataKey={activeMetric?.xKey || 'name'}
            tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
            stroke="#64748B"
            strokeWidth={1.5}
          />
          <YAxis
            tick={{ fill: '#E2E8F0', fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => value.toLocaleString('en-IN')}
            stroke="#64748B"
            strokeWidth={1.5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0A192F', border: 'none', borderRadius: '8px' }}
            formatter={(value, name) => [value.toLocaleString('en-IN'), name]}
          />
          {metrics.map(metric => (
            <Area
              key={metric.id}
              type="monotone"
              dataKey={metric.dataKey}
              stroke={metric.color || SUSTAINSUTRA_THEME.colors.growth}
              fill={metric.color || SUSTAINSUTRA_THEME.colors.growth}
              fillOpacity={0.3}
              strokeWidth={2}
              name={metric.label}
            />
          ))}
          {showLegend && <Legend />}
        </AreaChart>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-navy-light/30 border border-white/10 rounded-3xl ${expanded ? 'fixed inset-4 z-50 bg-navy' : ''} ${className}`}
      style={{ height: expanded ? 'calc(100vh - 2rem)' : 'auto' }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-dimmed">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw size={18} className="text-dimmed" />
              </button>
            )}
            {onFilter && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Filter size={18} className="text-dimmed" />
              </button>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {expanded ? <Minimize2 size={18} className="text-dimmed" /> : <Maximize2 size={18} className="text-dimmed" />}
            </button>
            {onExport && (
              <button
                onClick={onExport}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Download size={18} className="text-dimmed" />
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-navy p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-dimmed">Time Range:</label>
                  <div className="flex gap-2">
                    {timeRanges.map(range => (
                      <button
                        key={range.id}
                        onClick={() => setTimeRange(range.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          timeRange === range.id 
                            ? 'bg-gold text-navy' 
                            : 'bg-navy-light/30 text-dimmed hover:text-white'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div style={{ height: expanded ? 'calc(100% - 200px)' : height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export { InteractiveChart };
