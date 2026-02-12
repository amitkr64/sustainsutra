import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Search, Filter, ChevronDown, ChevronUp, Download, Eye, EyeOff } from 'lucide-react';
import { SUSTAINSUTRA_THEME } from '../../../utils/brsr/themeConfig';

const InteractiveDataTable = ({ 
  data = [], 
  columns = [], 
  title,
  subtitle,
  sortable = true,
  filterable = true,
  searchable = true,
  pagination = true,
  pageSize = 10,
  onExport,
  className = '' 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(columns.map(c => c.key));
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleColumn = (key) => {
    setVisibleColumns(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        result = result.filter(row => {
          const rowValue = row[key];
          if (typeof rowValue === 'string') {
            return rowValue.toLowerCase().includes(value.toLowerCase());
          }
          if (typeof rowValue === 'number') {
            return rowValue >= value;
          }
          return true;
        });
      }
    });

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(row => 
        columns.some(col => {
          const value = row[col.key];
          if (value) {
            return value.toString().toLowerCase().includes(term);
          }
          return false;
        })
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        return sortConfig.direction === 'asc' ? 1 : -1;
      });
    }

    return result;
  }, [data, filters, searchTerm, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination 
    ? filteredAndSortedData.slice(startIndex, startIndex + pageSize)
    : filteredAndSortedData;

  const renderCell = (row, column) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }

    if (column.format) {
      return column.format(value);
    }

    if (typeof value === 'number') {
      return value.toLocaleString('en-IN');
    }

    return value || '—';
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const exportData = (format = 'csv') => {
    if (onExport) {
      onExport(filteredAndSortedData, format);
    } else {
      // Default CSV export
      const headers = columns.map(c => c.label).join(',');
      const rows = filteredAndSortedData.map(row => 
        columns.map(c => row[c.key]).join(',')
      );
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      a.click();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-navy-light/30 border border-white/10 rounded-3xl overflow-hidden ${className}`}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-dimmed">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {searchable && (
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-navy border border-white/10 rounded-lg text-sm text-white placeholder-dimmed focus:border-gold outline-none w-64"
                />
              </div>
            )}
            {onExport && (
              <button
                onClick={() => exportData()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Download size={18} className="text-dimmed" />
              </button>
            )}
            {showColumnSelector && (
              <button
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {showColumnSelector ? <Eye size={18} className="text-dimmed" /> : <EyeOff size={18} className="text-dimmed" />}
              </button>
            )}
          </div>
        </div>

        {showColumnSelector && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-4"
          >
            <div className="bg-navy p-4 rounded-xl border border-white/5">
              <div className="text-sm text-dimmed mb-2">Show/Hide Columns</div>
              <div className="flex flex-wrap gap-2">
                {columns.map(column => (
                  <button
                    key={column.key}
                    onClick={() => toggleColumn(column.key)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      visibleColumns.includes(column.key)
                        ? 'bg-gold text-navy'
                        : 'bg-navy-light/30 text-dimmed'
                    }`}
                  >
                    {column.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {columns
                  .filter(col => visibleColumns.includes(col.key))
                  .map(column => (
                    <th
                      key={column.key}
                      onClick={sortable ? () => handleSort(column.key) : undefined}
                      className={`text-left py-3 px-4 text-sm font-semibold text-white cursor-pointer hover:bg-white/5 transition-colors ${
                        sortable ? 'select-none' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {column.label}
                        {renderSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumns.length} className="py-12 text-center">
                    <div className="text-dimmed">No data found</div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {columns
                      .filter(col => visibleColumns.includes(col.key))
                      .map(column => (
                        <td key={column.key} className="py-3 px-4 text-sm text-dimmed">
                          {renderCell(row, column)}
                        </td>
                      ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-dimmed">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredAndSortedData.length)} of {filteredAndSortedData.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-navy rounded-lg text-sm text-dimmed hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-gold text-navy'
                          : 'bg-navy text-dimmed hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 bg-navy rounded-lg text-sm text-dimmed hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { InteractiveDataTable };
