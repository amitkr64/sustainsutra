import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, CheckCircle, XCircle } from 'lucide-react';

/**
 * Compliance Trajectory Chart Component
 * Displays baseline → target → achieved GEI trajectory over years
 * Enhanced with progress indicators, YoY changes, and gap analysis
 */
const ComplianceTrajectoryChart = ({ baseline,
    targets = [],
    achieved = [],
    height = 400
}) => {
    // Calculate metrics and prepare data for chart
    const { chartData, metrics, baselineData } = useMemo(() => {
        const dataMap = new Map();
        let baseValue = null;
        let prevAchieved = null;

        // Add baseline
        if (baseline) {
            baseValue = baseline.gei;
            dataMap.set(baseline.year, {
                year: baseline.year,
                baseline: baseline.gei,
                label: `Baseline (${baseline.year})`,
                isBaseline: true
            });
        }

        // Add targets
        targets.forEach(target => {
            const existing = dataMap.get(target.complianceYear) || { year: target.complianceYear };
            existing.target = target.targetGEI;
            existing.label = target.complianceYear;
            existing.targetReduction = baseValue ? (((baseValue - target.targetGEI) / baseValue) * 100).toFixed(1) : 0;
            dataMap.set(target.complianceYear, existing);
        });

        // Add achieved values with YoY calculations
        achieved.forEach(item => {
            const existing = dataMap.get(item.year) || { year: item.year };
            existing.achieved = item.gei;
            existing.label = item.year;
            existing.complianceStatus = item.complianceStatus;

            // Calculate YoY change
            if (prevAchieved !== null) {
                existing.yoyChange = ((item.gei - prevAchieved) / prevAchieved * 100).toFixed(2);
            }

            // Calculate gap from target
            const targetForYear = targets.find(t => t.complianceYear === item.year);
            if (targetForYear) {
                existing.gap = item.gei - targetForYear.targetGEI;
                existing.gapPercentage = baseValue ? (((item.gei - targetForYear.targetGEI) / baseValue) * 100).toFixed(2) : 0;
            }

            prevAchieved = item.gei;
            dataMap.set(item.year, existing);
        });

        // Convert map to sorted array
        const sortedData = Array.from(dataMap.values()).sort((a, b) => {
            const yearA = parseInt(a.year.split('-')[0]);
            const yearB = parseInt(b.year.split('-')[0]);
            return yearA - yearB;
        });

        // Calculate overall metrics
        const latestAchieved = achieved.length > 0 ? achieved[achieved.length - 1] : null;
        const latestTarget = targets.length > 0 ? targets[targets.length - 1] : null;

        const metrics = {
            totalReductionAchieved: baseValue && latestAchieved ? (((baseValue - latestAchieved.gei) / baseValue) * 100).toFixed(1) : 0,
            targetVsAchievedGap: latestTarget && latestAchieved ? (latestTarget.targetGEI - latestAchieved.gei).toFixed(4) : 0,
            complianceRate: achieved.length > 0 ? (achieved.filter(a => a.complianceStatus === 'Compliant').length / achieved.length * 100).toFixed(0) : 0,
            avgAnnualReduction: calculateAvgAnnualReduction(baseValue, achieved)
        };

        return { chartData: sortedData, metrics, baselineData: baseline };
    }, [baseline, targets, achieved]);

    // Calculate average annual reduction
    function calculateAvgAnnualReduction(base, achievedArr) {
        if (!base || achievedArr.length < 2) return 0;
        const latest = achievedArr[achievedArr.length - 1];
        const years = achievedArr.length;
        const totalReduction = ((base - latest.gei) / base) * 100;
        return (totalReduction / years).toFixed(2);
    }

    // Custom tooltip with enhanced information
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-darkgray/95 backdrop-blur-sm border border-gold/30 p-4 rounded-lg shadow-xl min-w-[250px]">
                    <p className="text-gold font-bold text-sm mb-3">{label}</p>

                    {data.baseline && (
                        <div className="mb-2">
                            <p className="text-offwhite text-sm">
                                <span className="text-blue-400">●</span> <span className="font-semibold">Baseline:</span> {data.baseline.toFixed(4)} tCO₂e/tonne
                            </p>
                        </div>
                    )}
                    {data.target && (
                        <div className="mb-2">
                            <p className="text-offwhite text-sm">
                                <span className="text-green-400">●</span> <span className="font-semibold">Target:</span> {data.target.toFixed(4)} tCO₂e/tonne
                            </p>
                            {data.targetReduction && (
                                <p className="text-xs text-green-300 ml-4">Target reduction: {data.targetReduction}%</p>
                            )}
                        </div>
                    )}
                    {data.achieved && (
                        <div className="mb-2">
                            <p className="text-offwhite text-sm">
                                <span className={data.complianceStatus === 'Compliant' ? 'text-emerald-400' : 'text-red-400'}>
                                    ●
                                </span> <span className="font-semibold">Achieved:</span> {data.achieved.toFixed(4)} tCO₂e/tonne
                            </p>
                            {data.yoyChange !== undefined && (
                                <p className={`text-xs ml-4 ${parseFloat(data.yoyChange) < 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    YoY Change: {parseFloat(data.yoyChange) < 0 ? '↓' : '↑'} {Math.abs(data.yoyChange)}%
                                </p>
                            )}
                        </div>
                    )}
                    {data.gap !== undefined && (
                        <div className="mt-3 pt-2 border-t border-gold/20">
                            <p className={`text-sm font-semibold ${data.gap <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                Gap: {data.gap <= 0 ? 'Below' : 'Above'} target by {Math.abs(data.gap).toFixed(4)} tCO₂e/tonne
                            </p>
                        </div>
                    )}
                    {data.complianceStatus && (
                        <div className={`mt-2 pt-2 border-t border-gold/20 flex items-center gap-2 ${
                            data.complianceStatus === 'Compliant' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                            {data.complianceStatus === 'Compliant' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                            <span className="font-semibold text-sm">{data.complianceStatus}</span>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 bg-darkgray/30 rounded-lg border border-gold/20">
                <p className="text-offwhite/60">No trajectory data available</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Metrics Summary Cards */}
            {metrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingDown className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs text-offwhite/60">Total Reduction</span>
                        </div>
                        <p className="text-xl font-bold text-emerald-400">{metrics.totalReductionAchieved}%</p>
                        <p className="text-xs text-offwhite/50">from baseline</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-offwhite/60">Target Gap</span>
                        </div>
                        <p className={`text-xl font-bold ${parseFloat(metrics.targetVsAchievedGap) <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {parseFloat(metrics.targetVsAchievedGap) <= 0 ? '-' : '+'}{Math.abs(metrics.targetVsAchievedGap)}
                        </p>
                        <p className="text-xs text-offwhite/50">tCO₂e/tonne</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-gold" />
                            <span className="text-xs text-offwhite/60">Compliance Rate</span>
                        </div>
                        <p className="text-xl font-bold text-gold">{metrics.complianceRate}%</p>
                        <p className="text-xs text-offwhite/50">years compliant</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-purple-400" />
                            <span className="text-xs text-offwhite/60">Avg Annual Reduction</span>
                        </div>
                        <p className="text-xl font-bold text-purple-400">{metrics.avgAnnualReduction}%</p>
                        <p className="text-xs text-offwhite/50">per year</p>
                    </div>
                </div>
            )}

            {/* Main Chart */}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
                    <XAxis
                        dataKey="label"
                        stroke="#F5E6D3"
                        style={{ fontSize: '12px' }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis
                        stroke="#F5E6D3"
                        style={{ fontSize: '12px' }}
                        label={{
                            value: 'GHG Intensity (tCO₂e/tonne)',
                            angle: -90,
                            position: 'insideLeft',
                            style: { fill: '#F5E6D3' }
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="line"
                    />
                    <Line
                        type="monotone"
                        dataKey="baseline"
                        stroke="#60A5FA"
                        strokeWidth={2}
                        name="Baseline"
                        dot={{ fill: '#60A5FA', r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#34D399"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target GEI"
                        dot={{ fill: '#34D399', r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="achieved"
                        stroke="#FFD700"
                        strokeWidth={3}
                        name="Achieved GEI"
                        dot={{ fill: '#FFD700', r: 6 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* Legend Explanation */}
            <div className="mt-4 text-sm text-offwhite/70 space-y-1">
                <p><span className="text-blue-400">—</span> Baseline: Initial GHG intensity from base year</p>
                <p><span className="text-green-400">- -</span> Target: Regulatory target for each compliance year</p>
                <p><span className="text-gold">—</span> Achieved: Actual verified GHG intensity</p>
                <p className="text-xs text-offwhite/50 mt-2">Hover over data points for detailed breakdown and YoY changes</p>
            </div>
        </div>
    );
};

export default ComplianceTrajectoryChart;
