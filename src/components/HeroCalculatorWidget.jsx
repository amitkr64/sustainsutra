import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Fuel, Factory, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '@/components/CountUp';

/**
 * Interactive live calculator widget for the hero. Visitors drag sliders for
 * electricity, fuel, and materials and see a live tCO₂e estimate update in
 * real time. Demonstrates the product instantly — high engagement.
 *
 * Emission factors are simplified India-grid defaults for demo purposes.
 */
const EF = {
    electricity: 0.82,  // tCO₂e per MWh (India grid)
    fuel: 2.6,          // tCO₂e per kL (diesel approx)
    materials: 0.15,    // tCO₂e per tonne (generic raw material)
};

const Slider = ({ icon: Icon, label, value, onChange, min, max, unit, color }) => (
    <div>
        <div className="mb-1.5 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Icon size={13} style={{ color }} /> {label}
            </label>
            <span className="text-xs font-bold text-foreground">{value.toLocaleString()} {unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
            style={{ accentColor: color }}
        />
    </div>
);

const HeroCalculatorWidget = ({ style }) => {
    const [electricity, setElectricity] = useState(500);   // MWh/year
    const [fuel, setFuel] = useState(50);                   // kL/year
    const [materials, setMaterials] = useState(1000);       // tonnes/year

    const { scope1, scope2, scope3, total } = useMemo(() => ({
        scope1: fuel * EF.fuel,
        scope2: electricity * EF.electricity,
        scope3: materials * EF.materials,
        total: fuel * EF.fuel + electricity * EF.electricity + materials * EF.materials,
    }), [electricity, fuel, materials]);

    const maxScope = Math.max(scope1, scope2, scope3, 1);

    return (
        <motion.div
            style={style}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div className="overflow-hidden rounded-2xl border border-border bg-card/90 p-5 shadow-xl backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <div className="text-sm font-bold text-foreground">Live Emissions Estimator</div>
                            <div className="text-[10px] text-muted-foreground">Drag to estimate your footprint</div>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">DEMO</span>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-3.5">
                        <Slider icon={Zap} label="Electricity" value={electricity} onChange={setElectricity} min={0} max={5000} unit="MWh" color="#D4AF37" />
                        <Slider icon={Fuel} label="Fuel (Scope 1)" value={fuel} onChange={setFuel} min={0} max={500} unit="kL" color="#74C69D" />
                        <Slider icon={Factory} label="Materials" value={materials} onChange={setMaterials} min={0} max={10000} unit="t" color="#D4AF37" />
                    </div>

                    {/* Scope breakdown bars */}
                    <div className="mt-4 space-y-1.5">
                        {[
                            ['Scope 1', scope1, '#D4AF37'],
                            ['Scope 2', scope2, '#74C69D'],
                            ['Scope 3', scope3, '#A0AAB5'],
                        ].map(([label, val, color]) => (
                            <div key={label} className="flex items-center gap-2">
                                <span className="w-14 text-[10px] text-muted-foreground">{label}</span>
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(val / maxScope) * 100}%` }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                    />
                                </div>
                                <span className="w-12 text-right text-[10px] font-semibold text-foreground">{Math.round(val)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                        <span className="text-xs text-muted-foreground">Annual total</span>
                        <span className="text-2xl font-extrabold text-gradient">
                            <CountUp value={Math.round(total)} suffix="" duration={0.5} />
                        </span>
                        <span className="pb-1 text-xs font-semibold text-muted-foreground">tCO₂e</span>
                    </div>

                    <Link to="/carbon-calculator" className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20">
                        Get full report <ArrowRight size={12} />
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HeroCalculatorWidget;
