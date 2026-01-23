import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Compliance Trajectory Chart Component
 * Displays baseline → target → achieved GEI trajectory over years
 */
const ComplianceTrajectoryChart = ({ baseline,
    targets = [],
    achieved = [],
    height = 400
}) => {
    // Prepare data for chart
    const prepareChartData = () => {
        const dataMap = new Map();

        // Add baseline
        if (baseline) {
            dataMap.set(baseline.year, {
                year: baseline.year,
                baseline: baseline.gei,
                label: `Baseline (${baseline.year})`
            });
        }

        // Add targets
        targets.forEach(target => {
            const existing = dataMap.get(target.complianceYear) || { year: target.complianceYear };
            existing.target = target.targetGEI;
            existing.label = target.complianceYear;
            dataMap.set(target.complianceYear, existing);
        });

        // Add achieved values
        achieved.forEach(item => {
            const existing = dataMap.get(item.year) || { year: item.year };
            existing.achieved = item.gei;
            existing.label = item.year;
            existing.complianceStatus = item.complianceStatus;
            dataMap.set(item.year, existing);
        });

        // Convert map to sorted array
        return Array.from(dataMap.values()).sort((a, b) => {
            const yearA = parseInt(a.year.split('-')[0]);
            const yearB = parseInt(b.year.split('-')[0]);
            return yearA - yearB;
        });
    };

    const chartData = prepareChartData();

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-darkgray/95 backdrop-blur-sm border border-gold/30 p-4 rounded-lg shadow-xl">
                    <p className="text-gold font-semibold mb-2">{label}</p>
                    {data.baseline && (
                        <p className="text-offwhite">
                            <span className="text-blue-400">● Baseline:</span> {data.baseline.toFixed(4)} tCO₂e/tonne
                        </p>
                    )}
                    {data.target && (
                        <p className="text-offwhite">
                            <span className="text-green-400">● Target:</span> {data.target.toFixed(4)} tCO₂e/tonne
                        </p>
                    )}
                    {data.achieved && (
                        <p className="text-offwhite">
                            <span className={data.complianceStatus === 'Compliant' ? 'text-emerald-400' : 'text-red-400'}>
                                ● Achieved:
                            </span> {data.achieved.toFixed(4)} tCO₂e/tonne
                        </p>
                    )}
                    {data.complianceStatus && (
                        <p className={`mt-2 font-semibold ${data.complianceStatus === 'Compliant' ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                            {data.complianceStatus}
                        </p>
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
            </div>
        </div>
    );
};

export default ComplianceTrajectoryChart;
