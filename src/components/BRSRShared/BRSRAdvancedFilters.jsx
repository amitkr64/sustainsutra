import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useBRSRFilters } from '../../hooks/useBRSRAnalysis';

const BRSRAdvancedFilters = ({ onFilterChange }) => {
  const { filters, filteredReports, setFilter, resetAllFilters } = useBRSRFilters();
  const [isExpanded, setIsExpanded] = useState(true);

  const availableYears = useMemo(() => {
    const years = filteredReports.map(r => r.financialYear).filter(Boolean);
    return [...new Set(years)].sort((a, b) => b.localeCompare(a));
  }, [filteredReports]);

  const availableSectors = useMemo(() => {
    const sectors = filteredReports.map(r => r.sector).filter(Boolean);
    return [...new Set(sectors)].sort();
  }, [filteredReports]);

  const handleYearToggle = (year) => {
    const newYears = filters.years.includes(year)
      ? filters.years.filter(y => y !== year)
      : [...filters.years, year];
    setFilter('years', newYears);
  };

  const toggleAllYears = () => {
    setFilter('years', filters.years.length === availableYears.length ? [] : availableYears);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.years.length > 0) count++;
    if (filters.sector !== 'All') count++;
    if (filters.esgScoreRange[0] !== 0 || filters.esgScoreRange[1] !== 100) count++;
    if (filters.hasDataIssues) count++;
    return count;
  }, [filters]);

  return (
    <div className="brsr-advanced-filters bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Advanced Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Financial Years</label>
              <button
                onClick={toggleAllYears}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                {filters.years.length === availableYears.length ? 'Clear All' : 'Select All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableYears.length > 0 ? (
                availableYears.map(year => (
                  <button
                    key={year}
                    onClick={() => handleYearToggle(year)}
                    className={`
                      px-3 py-1.5 text-sm rounded-md border transition-all
                      ${filters.years.includes(year)
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {year}
                  </button>
                ))
              ) : (
                <span className="text-sm text-gray-500 italic">No years available</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Sector</label>
            <div className="relative">
              <select
                value={filters.sector}
                onChange={(e) => setFilter('sector', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
              >
                <option value="All">All Sectors</option>
                {availableSectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              ESG Score Range: {filters.esgScoreRange[0]} - {filters.esgScoreRange[1]}
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.esgScoreRange[1]}
                onChange={(e) => setFilter('esgScoreRange', [filters.esgScoreRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasDataIssues"
                checked={filters.hasDataIssues}
                onChange={(e) => setFilter('hasDataIssues', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="hasDataIssues" className="text-sm text-gray-700 cursor-pointer">
                Show reports with data issues only
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </button>
            <div className="flex-1 text-right text-sm text-gray-600">
              {filteredReports.length} of {filteredReports.length} reports displayed
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BRSRAdvancedFilters;
