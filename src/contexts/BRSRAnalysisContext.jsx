import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import { userService } from '@/services/userService';

const BRSRAnalysisContext = createContext(null);

const initialState = {
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
  view: 'list',
  filters: {
    years: [],
    sector: 'All',
    esgScoreRange: [0, 100],
    hasDataIssues: false,
  },
  selectedReports: [],
  comparisonMode: false,
  sortBy: 'date',
  sortOrder: 'desc',
};

const BRSRReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, reports: action.payload };
    
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'SET_CURRENT_REPORT':
      return { ...state, currentReport: action.payload, view: 'detail' };
    
    case 'SET_VIEW':
      return { ...state, view: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    
    case 'TOGGLE_REPORT_SELECTION':
      const selected = state.selectedReports.includes(action.payload)
        ? state.selectedReports.filter(id => id !== action.payload)
        : [...state.selectedReports, action.payload];
      return { ...state, selectedReports: selected };
    
    case 'CLEAR_REPORT_SELECTION':
      return { ...state, selectedReports: [], comparisonMode: false };
    
    case 'SET_COMPARISON_MODE':
      return { ...state, comparisonMode: action.payload };
    
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    
    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload };
    
    case 'ADD_REPORT':
      return { ...state, reports: [...state.reports, action.payload] };
    
    case 'UPDATE_REPORT':
      return {
        ...state,
        reports: state.reports.map(r => r._id === action.payload._id ? action.payload : r),
        currentReport: state.currentReport?._id === action.payload._id ? action.payload : state.currentReport
      };
    
    case 'DELETE_REPORT':
      return {
        ...state,
        reports: state.reports.filter(r => r._id !== action.payload),
        currentReport: state.currentReport?._id === action.payload ? null : state.currentReport,
        selectedReports: state.selectedReports.filter(id => id !== action.payload)
      };
    
    default:
      return state;
  }
};

export const BRSRAnalysisProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BRSRReducer, initialState);

  const fetchReports = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const token = userService.getToken();
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const { data } = await axios.get('/api/brsr-analysis', config);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error fetching reports:', error);
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const setCurrentReport = useCallback((report) => {
    dispatch({ type: 'SET_CURRENT_REPORT', payload: report });
  }, []);

  const setView = useCallback((view) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const toggleReportSelection = useCallback((reportId) => {
    dispatch({ type: 'TOGGLE_REPORT_SELECTION', payload: reportId });
  }, []);

  const clearReportSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_REPORT_SELECTION' });
  }, []);

  const setComparisonMode = useCallback((enabled) => {
    dispatch({ type: 'SET_COMPARISON_MODE', payload: enabled });
  }, []);

  const addReport = useCallback((report) => {
    dispatch({ type: 'ADD_REPORT', payload: report });
  }, []);

  const updateReport = useCallback((report) => {
    dispatch({ type: 'UPDATE_REPORT', payload: report });
  }, []);

  const deleteReport = useCallback((reportId) => {
    dispatch({ type: 'DELETE_REPORT', payload: reportId });
  }, []);

  const uploadXBRL = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('xbrl', file);

    const token = userService.getToken();
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    try {
      const { data } = await axios.post('/api/brsr-analysis', formData, config);
      dispatch({ type: 'ADD_REPORT', payload: data });
      return data;
    } catch (error) {
      console.error('Error uploading XBRL:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const value = {
    state,
    dispatch,
    actions: {
      fetchReports,
      setCurrentReport,
      setView,
      setFilters,
      resetFilters,
      toggleReportSelection,
      clearReportSelection,
      setComparisonMode,
      addReport,
      updateReport,
      deleteReport,
      uploadXBRL,
      setSort: (sortBy) => dispatch({ type: 'SET_SORT', payload: sortBy }),
      setSortOrder: (order) => dispatch({ type: 'SET_SORT_ORDER', payload: order }),
    },
  };

  return (
    <BRSRAnalysisContext.Provider value={value}>
      {children}
    </BRSRAnalysisContext.Provider>
  );
};

export const useBRSRAnalysis = () => {
  const context = useContext(BRSRAnalysisContext);
  if (!context) {
    throw new Error('useBRSRAnalysis must be used within BRSRAnalysisProvider');
  }
  return context;
};
