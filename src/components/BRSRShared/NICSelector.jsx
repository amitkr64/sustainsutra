import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Check } from 'lucide-react';
import nicData from '@/constants/nic_database.json';

const NICSelector = ({ onSelect, currentCode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSection, setActiveSection] = useState(null);

    // Flatten all subclasses for global search
    const allSubClasses = useMemo(() => {
        const result = [];
        nicData.sections.forEach(section => {
            section.divisions?.forEach(division => {
                division.groups?.forEach(group => {
                    group.classes?.forEach(cls => {
                        cls.subclasses?.forEach(sub => {
                            result.push({
                                ...sub,
                                section: section.id,
                                division: division.id,
                                group: group.id,
                                className: cls.id,
                                fullPath: `${section.description} > ${division.description} > ${sub.description}`
                            });
                        });
                    });
                });
            });
        });
        return result;
    }, []);

    const filteredResults = useMemo(() => {
        if (!searchQuery) return [];
        const query = searchQuery.toLowerCase();
        return allSubClasses.filter(item =>
            item.id.includes(query) ||
            item.description.toLowerCase().includes(query)
        ).slice(0, 50); // Limit to 50 results for performance
    }, [searchQuery, allSubClasses]);

    return (
        <div className="flex flex-col h-[600px] bg-navy-light rounded-xl overflow-hidden text-offwhite border border-white/10">
            {/* Search Header */}
            <div className="p-4 border-b border-white/10 bg-black/20">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                    <input
                        type="text"
                        placeholder="Search by NIC code or business activity description..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-gold outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {searchQuery ? (
                    <div className="space-y-1">
                        <p className="px-3 py-2 text-xs font-semibold text-gold/70 uppercase tracking-wider">
                            Search Results ({filteredResults.length})
                        </p>
                        {filteredResults.map(item => (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`w-full text-left p-3 rounded-lg hover:bg-white/5 transition-all group flex justify-between items-center ${currentCode === item.id ? 'bg-gold/10 border border-gold/20' : 'border border-transparent'}`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-gold font-mono font-bold">{item.id}</span>
                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/50">Section {item.section}</span>
                                    </div>
                                    <p className="text-sm line-clamp-2 leading-relaxed">{item.description}</p>
                                    <p className="text-[10px] text-white/30 mt-1 truncate italic">{item.fullPath}</p>
                                </div>
                                {currentCode === item.id ? (
                                    <Check className="text-gold flex-shrink-0 ml-4" size={20} />
                                ) : (
                                    <ChevronRight className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" size={18} />
                                )}
                            </button>
                        ))}
                        {filteredResults.length === 0 && (
                            <div className="text-center py-10 text-dimmed">
                                <p>No codes found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p className="px-3 py-2 text-xs font-semibold text-gold/70 uppercase tracking-wider">
                            Browse by Section
                        </p>
                        {nicData.sections.map(section => (
                            <div key={section.id} className="mb-2">
                                <button
                                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                    className={`w-full text-left p-3 rounded-lg transition-all flex justify-between items-center border ${activeSection === section.id ? 'bg-gold/5 border-gold/20' : 'hover:bg-white/5 border-transparent'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-gold/10 flex items-center justify-center text-gold font-bold">
                                            {section.id}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{section.description}</p>
                                            <p className="text-[10px] text-white/40">{section.divisions?.length || 0} Divisions</p>
                                        </div>
                                    </div>
                                    <ChevronRight className={`transition-transform ${activeSection === section.id ? 'rotate-90 text-gold' : 'text-white/20'}`} size={16} />
                                </button>

                                {activeSection === section.id && (
                                    <div className="ml-11 mt-1 space-y-1 border-l border-white/10 pl-2">
                                        {section.divisions?.map(div => (
                                            <div key={div.id} className="pb-2">
                                                <p className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-widest">{div.id} - {div.description}</p>
                                                {div.groups?.map(group => (
                                                    group.classes?.map(cls => (
                                                        cls.subclasses?.map(sub => (
                                                            <button
                                                                key={sub.id}
                                                                onClick={() => onSelect(sub.id)}
                                                                className={`w-full text-left p-2 rounded hover:bg-white/5 text-sm transition-all flex justify-between items-center ${currentCode === sub.id ? 'text-gold font-bold' : ''}`}
                                                            >
                                                                <span className="truncate flex-1 pr-2"><span className="text-gold/70 mr-2 font-mono">{sub.id}</span> {sub.description}</span>
                                                                {currentCode === sub.id && <Check size={14} />}
                                                            </button>
                                                        ))
                                                    ))
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-black/40 border-t border-white/10 text-[10px] text-center text-dimmed">
                Source: National Industrial Classification (NIC) 2008 • {allSubClasses.length} total codes
            </div>
        </div>
    );
};

export default NICSelector;
