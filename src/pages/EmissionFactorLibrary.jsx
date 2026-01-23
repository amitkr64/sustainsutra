import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getEmissionFactors } from '@/services/cctsEmissionFactorService';
import { Search, Info, Database, Filter } from 'lucide-react';

const EmissionFactorLibrary = () => {
    const [factors, setFactors] = useState([]);
    const [filteredFactors, setFilteredFactors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterData();
    }, [search, categoryFilter, factors]);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await getEmissionFactors();
            setFactors(res.data);
        } catch (error) {
            console.error('Error loading factors', error);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        let result = factors;

        if (categoryFilter !== 'All') {
            result = result.filter(f => f.category === categoryFilter);
        }

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(f =>
                f.name.toLowerCase().includes(lowerSearch) ||
                f.source.toLowerCase().includes(lowerSearch)
            );
        }

        setFilteredFactors(result);
    };

    const categories = ['All', ...new Set(factors.map(f => f.category))];

    return (
        <>
            <Helmet>
                <title>Emission Factor Library | CCTS Reference | SustainSutra</title>
                <meta name="description" content="Official CCTS emission factors reference library for IPCC 2006 and Annexure IV compliance calculation." />
            </Helmet>

            <div className="min-h-screen bg-navy text-offwhite pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-playfair text-gold mb-4">
                            Emission Factor Library
                        </h1>
                        <p className="text-xl text-offwhite/70 max-w-3xl mx-auto">
                            Standardized emission factors for CCTS compliance reporting as per IPCC Guidelines (2006) and Annexure IV.
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-grow w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-offwhite/50 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search fuels, materials (e.g., Coal, Diesel, Steel)..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-navy/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-gold outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <Filter className="text-gold w-5 h-5" />
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="bg-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none flex-grow min-w-[200px]"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                        {loading ? (
                            <div className="p-12 text-center text-gold">Loading database...</div>
                        ) : filteredFactors.length === 0 ? (
                            <div className="p-12 text-center">
                                <Database className="w-16 h-16 text-offwhite/20 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-offwhite">No Factors Found</h3>
                                <p className="text-offwhite/60">Try adjusting your search criteria.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Category</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Factor</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Unit</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Scope</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Source</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredFactors.map((factor) => (
                                            <tr key={factor._id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-medium text-white">{factor.name}</td>
                                                <td className="px-6 py-4 text-offwhite/80">{factor.category}</td>
                                                <td className="px-6 py-4 font-mono text-gold font-bold">{factor.factor.toFixed(4)}</td>
                                                <td className="px-6 py-4 text-offwhite/80">{factor.unit}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs ${factor.scope === 'Scope 1' ? 'bg-red-500/20 text-red-400' :
                                                            factor.scope === 'Scope 2' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-green-500/20 text-green-400'
                                                        }`}>
                                                        {factor.scope}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-offwhite/60 italic">{factor.source}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="p-4 bg-white/5 border-t border-white/10 text-center text-xs text-offwhite/50">
                            Showing {filteredFactors.length} emission factors from official references.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmissionFactorLibrary;
