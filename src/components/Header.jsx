import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, User, Calculator, BookOpen, FileText, Info, Mail, LayoutDashboard, Database } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (id) => {
        setIsMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const tickerData = [
        "EU ETS: €88.45/ton",
        "CCTS Estimate: ₹1,800/ton",
        "SEBI BRSR Filing Open",
        "GRI Standards Update",
        "ISO 14064-1:2018 Active"
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? 'glassmorphism-strong shadow-lg' : 'glassmorphism'}`}>
            <div className="bg-gold/90 text-navy overflow-hidden py-2">
                <div className="flex animate-scroll-ticker whitespace-nowrap">
                    {[...tickerData, ...tickerData].map((item, index) => (
                        <span key={index} className="inline-flex items-center mx-8 font-medium text-sm">
                            <span className="w-1.5 h-1.5 bg-navy rounded-full mr-3"></span>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-playfair text-gold hover:text-white transition-colors">
                    SustainSutra
                </Link>

                {/* Desktop Menu - REARRANGED FOR LOGIC */}
                <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {/* 1. Services */}
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-offwhite hover:text-gold transition-smooth font-medium outline-none">
                                Services <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-64 shadow-2xl backdrop-blur-xl">
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services')}>
                                    All Advisory Services
                                </DropdownMenuItem>
                                <div className="border-t border-white/5 my-1" />
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services/carbon-footprinting')}>
                                    Carbon Footprinting
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services/ghg-mapping')}>
                                    GHG Mapping
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services/esg-strategy')}>
                                    ESG Strategy
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services/brsr-reporting')}>
                                    BRSR Reporting
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services/iso-verification')}>
                                    ISO Verification
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services/training-capacity')}>
                                    Corporate Training
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>

                    {/* 2. CCTS (Carbon Credit Trading Scheme) */}
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-offwhite hover:text-gold transition-smooth font-medium outline-none">
                                CCTS <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-64 shadow-2xl backdrop-blur-xl">
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/ccts/dashboard')}>
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Compliance Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/ccts/monitoring-data')}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Monitoring Reports
                                </DropdownMenuItem>
                                <div className="border-t border-white/5 my-1" />
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/resources/regulatory-updates')}>
                                    Regulatory Guidelines
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>

                    {/* 3. Academy (Linked to Course Landing Page) */}
                    <li>
                        <Link to="/courses" className="text-offwhite hover:text-gold transition-smooth font-medium flex items-center gap-1">
                            Academy
                        </Link>
                    </li>

                    {/* 3. Insights */}
                    <li>
                        <Link to="/insights" className="text-offwhite hover:text-gold transition-smooth font-medium">
                            Insights
                        </Link>
                    </li>

                    {/* 4. Tools & Resources Dropdown */}
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-offwhite hover:text-gold transition-smooth font-medium outline-none">
                                Resources <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-60 shadow-2xl">
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/resources')}>
                                    Knowledge Center
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/carbon-calculator')}>
                                    <Calculator className="w-4 h-4 mr-2" />
                                    Carbon Calculator
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/resources/emission-factors')}>
                                    <Database className="w-4 h-4 mr-2" />
                                    Emission Factor Lib
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/resources/templates')}>
                                    Downloadable Templates
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/resources/glossary')}>
                                    Sustainability Glossary
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>

                    {/* 5. About */}
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-offwhite hover:text-gold transition-smooth font-medium outline-none">
                                Company <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-48">
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/about')}>
                                    About Us
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/our-approach')}>
                                    Our Approach
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => handleNavigation('contact')}>
                                    Contact
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>

                    {/* 6. Contact/CTA */}
                    <li>
                        <Link to="/book-appointment" className="px-5 py-2.5 bg-gold text-navy hover:bg-white hover:text-navy rounded-full transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-gold/20">
                            Book Appointment
                        </Link>
                    </li>

                    {/* Auth Controls */}
                    {isAuthenticated ? (
                        <li className="border-l border-white/20 pl-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-2 text-gold hover:text-white transition-colors font-medium outline-none group">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30 group-hover:bg-gold transition-colors">
                                        <User size={16} className="group-hover:text-navy" />
                                    </div>
                                    <ChevronDown size={14} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-56 shadow-2xl">
                                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                                        <p className="text-xs text-dimmed">Logged in as</p>
                                        <p className="text-sm font-medium truncate text-gold">{user?.email}</p>
                                    </div>
                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/profile')}>
                                        <User size={16} className="mr-2" />
                                        My Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/my-courses')}>
                                        <BookOpen size={16} className="mr-2" />
                                        My Academy
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/ccts/dashboard')}>
                                        <LayoutDashboard size={16} className="mr-2" />
                                        CCTS Dashboard
                                    </DropdownMenuItem>
                                    {(user?.role === 'admin' || user?.role === 'instructor') && (
                                        <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/admin')}>
                                            <Calculator size={16} className="mr-2" />
                                            Admin Panel
                                        </DropdownMenuItem>
                                    )}
                                    <div className="border-t border-white/10 my-1" />
                                    <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-dimmed" onClick={logout}>
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    ) : (
                        <li className="border-l border-white/20 pl-4">
                            <Link to="/login" className="px-4 py-2 border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors font-medium">
                                Sign In
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-offwhite p-2 hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu - FULL REWRITE for logic and completeness */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[116px] bg-navy/98 backdrop-blur-xl z-[49] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
                    <ul className="container mx-auto px-6 py-8 flex flex-col gap-8">
                        {/* Services Group */}
                        <li>
                            <div className="text-xs font-bold text-gold/60 uppercase tracking-widest mb-4">Advisory</div>
                            <div className="grid grid-cols-1 gap-4">
                                <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-xl font-playfair text-offwhite hover:text-gold">All Services</Link>
                                <div className="pl-4 space-y-4 border-l border-white/10">
                                    <Link to="/services/carbon-footprinting" onClick={() => setIsMenuOpen(false)} className="block text-offwhite/80 hover:text-gold">Carbon Footprinting</Link>
                                    <Link to="/services/ghg-mapping" onClick={() => setIsMenuOpen(false)} className="block text-offwhite/80 hover:text-gold">GHG Mapping</Link>
                                    <Link to="/services/esg-strategy" onClick={() => setIsMenuOpen(false)} className="block text-offwhite/80 hover:text-gold">ESG Strategy</Link>
                                </div>
                            </div>
                        </li>

                        {/* Academy & Content */}
                        <li>
                            <div className="text-xs font-bold text-gold/60 uppercase tracking-widest mb-4">Learning</div>
                            <div className="space-y-4">
                                <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl font-playfair text-offwhite">
                                    <BookOpen size={20} className="text-gold" /> Academy
                                </Link>
                                <Link to="/insights" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl font-playfair text-offwhite">
                                    <FileText size={20} className="text-gold" /> Insights
                                </Link>
                            </div>
                        </li>

                        {/* Tools & Company */}
                        <li>
                            <div className="text-xs font-bold text-gold/60 uppercase tracking-widest mb-4">More</div>
                            <div className="space-y-4">
                                <Link to="/carbon-calculator" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg text-offwhite">
                                    <Calculator size={18} /> Carbon Calculator
                                </Link>
                                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg text-offwhite">
                                    <Info size={18} /> About SustainSutra
                                </Link>
                                <button onClick={() => { handleNavigation('contact'); }} className="flex items-center gap-3 text-lg text-offwhite">
                                    <Mail size={18} /> Contact Us
                                </button>
                            </div>
                        </li>

                        {/* Bottom CTA & Auth */}
                        <li className="mt-4 pt-8 border-t border-white/10">
                            <Link to="/book-appointment" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-4 bg-gold text-navy font-bold rounded-xl mb-4 shadow-lg shadow-gold/20">
                                Book Appointment
                            </Link>

                            {isAuthenticated ? (
                                <div className="space-y-4">
                                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-3 border border-white/20 text-offwhite rounded-xl">My Profile</Link>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-center py-3 text-red-400 font-medium">Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center py-3 border border-gold/30 text-gold rounded-xl">Sign In</Link>
                            )}
                        </li>
                    </ul>
                    <div className="h-20" /> {/* Spacer for scrolling */}
                </div>
            )}
        </header>
    );
};

export default Header;