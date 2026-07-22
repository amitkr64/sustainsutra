import { useState, useEffect, useCallback, useMemo } from 'react';
import { useBRSRAnalysis } from '../contexts/BRSRAnalysisContext';

export const useBRSRData = (reportId = null) => {
  const { state, actions } = useBRSRAnalysis();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentReport = useMemo(() => {
    if (reportId) {
      return state.reports.find(r => r._id === reportId);
    }
    return state.currentReport;
  }, [reportId, state.reports, state.currentReport]);

  const fetchReport = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await actions.fetchReports();
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [actions]);

  const uploadXBRLFile = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const result = await actions.uploadXBRL(file);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [actions]);

  const deleteReport = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await actions.deleteReport(id);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, [actions]);

  return {
    reports: state.reports,
    currentReport,
    loading: state.loading || loading,
    error: state.error || error,
    fetchReport,
    uploadXBRL: uploadXBRLFile,
    deleteReport,
  };
};

export const useBRSRFilters = () => {
  const { state, actions } = useBRSRAnalysis();
  const { reports, filters } = state;

  const filteredReports = useMemo(() => {
    let result = [...reports];

    if (filters.years.length > 0) {
      result = result.filter(r => filters.years.includes(r.financialYear));
    }

    if (filters.sector !== 'All') {
      result = result.filter(r => r.sector === filters.sector);
    }

    if (filters.esgScoreRange) {
      const [min, max] = filters.esgScoreRange;
      result = result.filter(r => {
        const score = r.esgScore || 0;
        return score >= min && score <= max;
      });
    }

    if (filters.hasDataIssues) {
      result = result.filter(r => {
        const quality = r.dataQuality || {};
        return quality.totalIssues && quality.totalIssues > 0;
      });
    }

    return result;
  }, [reports, filters]);

  const setFilter = useCallback((key, value) => {
    actions.setFilters({ [key]: value });
  }, [actions]);

  const resetAllFilters = useCallback(() => {
    actions.resetFilters();
  }, [actions]);

  return {
    filters,
    filteredReports,
    setFilter,
    resetAllFilters,
  };
};

export const useBRSRComparison = () => {
  const { state, actions } = useBRSRAnalysis();
  const { selectedReports, reports, comparisonMode } = state;

  const comparisonReports = useMemo(() => {
    return reports.filter(r => selectedReports.includes(r._id));
  }, [reports, selectedReports]);

  const toggleReport = useCallback((reportId) => {
    if (selectedReports.length >= 4 && !selectedReports.includes(reportId)) {
      throw new Error('Maximum 4 reports can be compared');
    }
    actions.toggleReportSelection(reportId);
  }, [selectedReports, actions]);

  const clearSelection = useCallback(() => {
    actions.clearReportSelection();
  }, [actions]);

  const enterComparisonMode = useCallback(() => {
    if (selectedReports.length < 2) {
      throw new Error('At least 2 reports must be selected for comparison');
    }
    actions.setComparisonMode(true);
  }, [selectedReports, actions]);

  const exitComparisonMode = useCallback(() => {
    actions.setComparisonMode(false);
  }, [actions]);

  return {
    selectedReports: comparisonReports,
    comparisonMode,
    toggleReport,
    clearSelection,
    enterComparisonMode,
    exitComparisonMode,
    canCompare: selectedReports.length >= 2 && selectedReports.length <= 4,
  };
};

export const useBRSRMetrics = (report) => {
  const metrics = useMemo(() => {
    if (!report) return null;

    // DEBUG: Log what's in the report
    console.log('[useBRSRMetrics] Report:', {
      hasIndicators: !!report.indicators,
      hasMetrics: !!report.metrics,
      indicators: report.indicators,
      metrics: report.metrics
    });

    const indicators = report.indicators || {};
    const prevIndicators = indicators.prev_year || {};
    // Use backend-calculated metrics as primary source if available
    const backendMetrics = report.metrics || {};


    const calculateTrend = (current, previous) => {
      if (!previous || previous === 0) return 0;
      return Math.round(((current - previous) / previous) * 1000) / 10;
    };

    const calculateIntensity = (value, turnover) => {
      // Return 0 if no valid data for intensity calculation
      if (!turnover || turnover === 0) return 0;
      if (!value || value === 0 || isNaN(value)) return 0;
      // Convert turnover from INR to crores (1 crore = 10,000,000 INR)
      // Result is value/₹ Cr (e.g., GJ/₹ Cr, tCO2e/₹ Cr)
      // Round to 4 decimal places at source to prevent long decimals
      const intensity = value / (turnover / 10000000);
      const result = Math.round(intensity * 10000) / 10000;
      return isNaN(result) || !isFinite(result) ? 0 : result;
    };

    // Get turnover value - don't use fallback of 1 as it produces misleading results
    // If turnover is 0 or missing, intensity will be 0 (no meaningful calculation possible)
    const turnover = indicators.turnover || 0;

    // IMPORTANT: Use standardized base unit fields from parser
    // Base units: Energy=GJ, GHG=tCO2e, Water=KL, Waste=tonnes
    // Fallback to raw fields if standardized fields not available
    const energyTotal = indicators.p6_energy_total_gj ||
                       indicators.p6_total_energy_mj && indicators.p6_total_energy_mj / 1000 ||
                       indicators.p6_e1_grand_total_fy && indicators.p6_e1_grand_total_fy / 1000 ||
                       indicators.p6_energy_total && indicators.p6_energy_total / 1000 || 0;

    // IMPORTANT: GHG values should always be in tCO2 (tonnes CO2 equivalent)
    // Prefer _base values (already converted by parser from original units like MtCO2e, ktCO2e)
    // Fallback to raw values assuming they're in tCO2
    const ghgScope1 = indicators.p6_e7_scope1_fy_base || indicators.p6_ghg_scope1_base || indicators.p6_scope1_base ||
                       indicators.p6_ghg_scope1 || indicators.p6_scope1 || indicators.p6_e7_scope1_fy || 0;
    const ghgScope2 = indicators.p6_e7_scope2_fy_base || indicators.p6_ghg_scope2_base || indicators.p6_scope2_base ||
                       indicators.p6_ghg_scope2 || indicators.p6_scope2 || indicators.p6_e7_scope2_fy || 0;
    const ghgScope3 = indicators.p6_l2_scope3_fy_base || indicators.p6_ghg_scope3_base || indicators.p6_scope3_base ||
                       indicators.p6_ghg_scope3 || indicators.p6_scope3 || indicators.p6_l2_scope3_fy || 0;
    const ghgTotal = ghgScope1 + ghgScope2 + ghgScope3;

    const waterWithdrawal = indicators.p6_water_withdrawal || indicators.p6_e3_total_withdrawal_fy || 0;
    const wasteTotal = indicators.p6_waste_total || indicators.p6_total_generation || indicators.p6_e9_total_generation_fy || 0;
    const wasteRecycled = indicators.p6_waste_recycled || indicators.p6_recycled || indicators.p6_e9_recycled_fy || 0;
    const wasteReused = indicators.p6_waste_reused || indicators.p6_reused || indicators.p6_e9_reused_fy || 0;
    const wasteIncinerated = indicators.p6_waste_incinerated || 0;
    const wasteLandfill = indicators.p6_waste_landfill || 0;
    const wasteCoProcessed = indicators.p6_waste_coprocessed || 0;

    // Calculate total waste from treatment methods if wasteTotal is not available
    const totalFromTreatment = wasteRecycled + wasteReused + wasteIncinerated + wasteLandfill + wasteCoProcessed;
    const effectiveWasteTotal = wasteTotal > 0 ? wasteTotal : totalFromTreatment;

    // Calculate recycling rate more robustly (capped at 100%)
    const circularWaste = wasteRecycled + wasteReused + wasteCoProcessed;
    const rawRecyclingRate = effectiveWasteTotal > 0 ? (circularWaste / effectiveWasteTotal * 100) : 0;
    const wasteRecyclingRate = Math.min(100, Math.round(rawRecyclingRate * 10) / 10);

    // Use standardized renewable/non-renewable breakdown in GJ
    const totalRenewable = indicators.p6_renewable_total_gj || 0;
    const totalNonRenewable = indicators.p6_non_renewable_total_gj || 0;

    return {
      energy: {
        total: energyTotal,
        intensity: backendMetrics.energyIntensity || calculateIntensity(energyTotal, turnover),
        intensityPhysical: indicators.p6_e1_intensity_physical_fy || 0,
        renewable: totalRenewable,
        renewableShare: backendMetrics.renewableEnergyShare || Math.round(((totalRenewable) / (energyTotal || 1)) * 1000) / 10,
        trend: backendMetrics.energyTrend || calculateTrend(
          energyTotal,
          prevIndicators.p6_energy_total_gj || prevIndicators.p6_energy_total && prevIndicators.p6_energy_total / 1000 || 0
        ),
        // Detailed breakdown for charts - use standardized GJ values with fallback
        breakdown: {
          renewable: {
            electricity: indicators.p6_e1_renew_elec_fy && indicators.p6_e1_renew_elec_fy / 1000 || indicators.p6_energy_renewable_electricity || 0,
            fuel: indicators.p6_e1_renew_fuel_fy && indicators.p6_e1_renew_fuel_fy / 1000 || indicators.p6_energy_renewable_fuel || 0,
            other: indicators.p6_e1_renew_other_fy && indicators.p6_e1_renew_other_fy / 1000 || indicators.p6_energy_renewable_other || 0,
          },
          nonRenewable: {
            electricity: indicators.p6_e1_non_renew_elec_fy && indicators.p6_e1_non_renew_elec_fy / 1000 || indicators.p6_energy_non_renewable_electricity || 0,
            fuel: indicators.p6_e1_non_renew_fuel_fy && indicators.p6_e1_non_renew_fuel_fy / 1000 || indicators.p6_energy_non_renewable_fuel || 0,
            other: indicators.p6_e1_non_renew_other_fy && indicators.p6_e1_non_renew_other_fy / 1000 || indicators.p6_energy_non_renewable_other || 0,
          },
        },
      },
      ghg: {
        scope1: ghgScope1,
        scope2: ghgScope2,
        scope3: ghgScope3,
        total: ghgTotal,
        intensity: backendMetrics.ghgIntensity || calculateIntensity(ghgScope1 + ghgScope2, turnover),
        intensityPhysical: indicators.p6_e7_intensity_physical_fy || 0,
        trend: backendMetrics.ghgTrend || calculateTrend(
          ghgTotal,
          (prevIndicators.p6_e7_scope1_fy_base || prevIndicators.p6_scope1_base || prevIndicators.p6_scope1 || 0) +
          (prevIndicators.p6_e7_scope2_fy_base || prevIndicators.p6_scope2_base || prevIndicators.p6_scope2 || 0) +
          (prevIndicators.p6_l2_scope3_fy_base || prevIndicators.p6_scope3_base || prevIndicators.p6_scope3 || 0)
        ),
      },
      water: {
        withdrawal: waterWithdrawal,
        consumption: indicators.p6_water_consumption || indicators.p6_e3_total_consumption_fy || 0,
        recycled: indicators.p6_water_recycled || 0,
        reused: indicators.p6_water_reused || 0,
        intensity: backendMetrics.waterIntensity || calculateIntensity(waterWithdrawal, turnover),
        intensityPhysical: indicators.p6_e3_intensity_physical_fy || 0,
        // Water sources breakdown
        sources: {
          surface: indicators.water_surface || 0,
          ground: indicators.water_ground || 0,
          thirdParty: indicators.water_third_party || 0,
        },
        // Wastewater treatment
        effluentDischarged: indicators.p6_effluent_discharged || 0,
        zldImplemented: indicators.p6_zld_status === 'Yes' || indicators.p6_zld_status === true,
      },
      waste: {
        total: effectiveWasteTotal,
        recycled: wasteRecycled,
        reused: wasteReused,
        recyclingRate: backendMetrics.wasteRecyclingRate !== undefined ? backendMetrics.wasteRecyclingRate : wasteRecyclingRate,
        intensityPhysical: indicators.p6_e9_intensity_physical_fy || 0,
        // Waste breakdown by type
        byType: {
          plastic: indicators.p6_waste_plastic || 0,
          ewaste: indicators.p6_waste_ewaste || 0,
          biomedical: indicators.p6_waste_biomedical || 0,
          construction: indicators.p6_waste_construction || 0,
          battery: indicators.p6_waste_battery || 0,
          radioactive: indicators.p6_waste_radioactive || 0,
          hazardousOther: indicators.p6_waste_hazardous_other || 0,
          nonHazardousOther: indicators.p6_waste_non_hazardous_other || 0,
          hazardous: indicators.p6_waste_hazardous || 0,
          industrial: indicators.p6_waste_industrial || 0,
          municipal: indicators.p6_waste_municipal || 0,
        },
        // Waste treatment methods
        treatment: {
          recycled: wasteRecycled,
          reused: wasteReused,
          incinerated: wasteIncinerated,
          landfill: wasteLandfill,
          coProcessed: wasteCoProcessed,
        },
        trend: backendMetrics.wasteTrend || calculateTrend(
          effectiveWasteTotal,
          prevIndicators.p6_e9_total_generation_fy || prevIndicators.p6_waste_total || 0
        ),
      },
      social: {
        totalEmployees: indicators.p3_total_employees || 0,
        femaleEmployees: indicators.p3_total_employees_female || indicators.p3_female_employees || 0,
        femaleDirectors: indicators.p3_female_directors || 0,
        femaleKmpPct: indicators.p3_female_kmp_pct || 0,
        turnoverRate: indicators.p3_employee_turnover_rate || 0,
        wellbeingSpendingPct: indicators.p3_wellbeing_spending_pct || 0,
        genderDiversity: backendMetrics.genderDiversity !== undefined ? backendMetrics.genderDiversity : (() => {
          // Try multiple ways to calculate gender diversity
          if (indicators.p3_total_employees_male && indicators.p3_total_employees_female) {
            return Math.round((indicators.p3_total_employees_female / (indicators.p3_total_employees_male + indicators.p3_total_employees_female)) * 1000) / 10;
          }
          if (indicators.p3_female_employees && indicators.p3_total_employees) {
            return Math.round((indicators.p3_female_employees / indicators.p3_total_employees) * 1000) / 10;
          }
          if (indicators.p3_total_employees && indicators.p3_permanent_employees) {
            // Fallback: calculate non-permanent as proxy (often used in BRSR)
            const nonPermanent = indicators.p3_total_employees - indicators.p3_permanent_employees;
            return Math.round((nonPermanent / indicators.p3_total_employees) * 1000) / 10;
          }
          return 0;
        })(),
      },
      governance: {
        csrSpendPct: backendMetrics.csrSpendPct !== undefined ? backendMetrics.csrSpendPct : (
          indicators.p8_csr_spent && turnover > 0
            ? Math.round((indicators.p8_csr_spent / turnover) * 1000) / 10
            : indicators.p8_csr_percentage || 0
        ),
        boardIndependence: indicators.p1_independent_directors_pct || 50,
      },
    };
  }, [report]);

  return metrics;
};
