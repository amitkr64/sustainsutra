import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, User, Calculator, BookOpen, FileText, Info, Mail, LayoutDashboard, Database, Shield, BarChart3, Settings, Leaf, Globe, FileCheck, Landmark, GraduationCap, Zap, Recycle, Repeat, ClipboardCheck, Factory, Lightbulb, GraduationCap as TrainingIcon, Search, FileJson, FileType, Newspaper, Briefcase } from 'lucide-react';
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
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

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

    const isAdmin = user?.role === 'admin' || user?.role === 'ccts-admin';

    const serviceLinks = [
        { name: 'Carbon Footprinting', path: '/services/carbon-footprinting', icon: Leaf },
        { name: 'GHG Mapping', path: '/services/ghg-mapping', icon: Globe },
        { name: 'ESG Strategy', path: '/services/esg-strategy', icon: Shield },
        { name: 'BRSR Reporting', path: '/services/brsr-reporting', icon: FileCheck },
        { name: 'ISO Verification', path: '/services/iso-verification', icon: FileCheck },
        { name: 'Training & Capacity', path: '/services/training-capacity', icon: GraduationCap },
        { name: 'Energy Audits', path: '/services/energy-audits', icon: Zap },
        { name: 'Waste Management', path: '/services/waste-management', icon: Recycle },
        { name: 'Circular Economy', path: '/services/circular-economy', icon: Repeat },
        { name: 'EPR Compliance', path: '/services/epr', icon: ClipboardCheck },
        { name: 'Cleaner Production', path: '/services/cleaner-production', icon: Factory },
        { name: 'Resource Efficiency', path: '/services/resource-efficiency', icon: Lightbulb },
    ];

    const resourceLinks = [
        { name: 'Sustainability Glossary', path: '/resources/glossary', icon: BookOpen },
        { name: 'Downloadable Templates', path: '/resources/templates', icon: FileJson },
        { name: 'Industry Reports', path: '/resources/reports', icon: BarChart3 },
        { name: 'Regulatory Updates', path: '/resources/regulatory-updates', icon: Newspaper },
        { name: 'Case Studies', path: '/resources/case-studies', icon: Briefcase },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 transform ${(isVisible || isMenuOpen) ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    } ${isScrolled ? 'glassmorphism-strong shadow-lg' : 'glassmorphism'}`}
            >
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

                <nav className="container mx-auto px-6 py-4 flex items-center justify-between h-20">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-playfair font-bold text-offwhite">
                        Sustain<span className="text-gold">Sutra</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-8 text-offwhite/90">
                        {/* Services Dropdown */}
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gold transition-colors font-medium outline-none">
                                    Services <ChevronDown size={16} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-navy border-white/10 text-offwhite min-w-[280px] grid grid-cols-2 gap-1 p-2 z-[1001]">
                                    {serviceLinks.map((link) => (
                                        <DropdownMenuItem
                                            key={link.path}
                                            className="focus:bg-white/5 cursor-pointer py-2 px-3 rounded-lg group"
                                            onClick={() => navigate(link.path)}
                                        >
                                            <link.icon className="mr-2 h-4 w-4 text-gold/60 group-hover:text-gold transition-colors" />
                                            <span className="text-sm">{link.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                    <div className="col-span-2 border-t border-white/5 mt-2 pt-2">
                                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-2 px-3 text-center block w-full text-gold font-bold" onClick={() => navigate('/services')}>
                                            View All Services
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>

                        <li><Link to="/courses" className="hover:text-gold transition-colors font-medium">Academy</Link></li>
                        <li><Link to="/insights" className="hover:text-gold transition-colors font-medium">Insights</Link></li>

                        {/* Resources Dropdown */}
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gold transition-colors font-medium outline-none">
                                    Resources <ChevronDown size={16} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-navy border-white/10 text-offwhite min-w-[240px] p-2 z-[1001]">
                                    {resourceLinks.map((link) => (
                                        <DropdownMenuItem
                                            key={link.path}
                                            className="focus:bg-white/5 cursor-pointer py-2.5 px-3 rounded-lg group"
                                            onClick={() => navigate(link.path)}
                                        >
                                            <link.icon className="mr-3 h-4 w-4 text-gold/60 group-hover:text-gold transition-colors" />
                                            <span className="text-sm">{link.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>

                        {/* CCTS Dropdown */}
                        {isAuthenticated && (
                            <li>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gold transition-colors font-medium outline-none">
                                        CCTS <ChevronDown size={16} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-navy border-white/10 text-offwhite min-w-[220px] p-2 z-[1001]">
                                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/ccts/dashboard')}>
                                            <Database className="mr-3 h-4 w-4 text-gold" />
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/ccts/monitoring-data')}>
                                            <BarChart3 className="mr-3 h-4 w-4 text-gold" />
                                            <span>Monitoring Data</span>
                                        </DropdownMenuItem>
                                        {(user?.role === 'verifier' || isAdmin) && (
                                            <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/ccts/verification-queue')}>
                                                <Shield className="mr-3 h-4 w-4 text-gold" />
                                                <span>Verification Queue</span>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/resources/emission-factors')}>
                                            <Calculator className="mr-3 h-4 w-4 text-gold" />
                                            <span>Emission Factors</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        )}

                        {/* More Menu */}
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gold transition-colors font-medium outline-none">
                                    More <ChevronDown size={16} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-navy border-white/10 text-offwhite min-w-[200px] p-2 z-[1001]">
                                    <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/our-approach')}>
                                        <Shield className="mr-3 h-4 w-4 text-gold/60" />
                                        <span>Our Approach</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/carbon-calculator')}>
                                        <Calculator className="mr-3 h-4 w-4 text-gold/60" />
                                        <span>Carbon Calculator</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-3 px-3" onClick={() => navigate('/about')}>
                                        <Info className="mr-3 h-4 w-4 text-gold/60" />
                                        <span>About Us</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>

                        {isAuthenticated ? (
                            <li className="flex items-center gap-4">
                                <Link to="/book-appointment" className="bg-gold text-navy px-6 py-2.5 rounded-lg font-bold hover:bg-gold/90 transition-all shadow-lg shadow-gold/20">
                                    Book Appointment
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-white/5 p-1 rounded-full border border-white/10 outline-none">
                                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                                            <User className="text-gold" size={20} />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-navy border-white/10 text-offwhite min-w-[200px] p-2 z-[1001]">
                                        <div className="px-3 py-2 border-b border-white/5 mb-1 text-center">
                                            <p className="text-sm font-bold text-gold">{user?.name || 'User'}</p>
                                            <p className="text-xs text-offwhite/50 truncate uppercase tracking-tighter">{user?.role}</p>
                                        </div>
                                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-2.5 px-3" onClick={() => navigate('/profile')}>
                                            <LayoutDashboard className="mr-3 h-4 w-4" />
                                            <span>My Dashboard</span>
                                        </DropdownMenuItem>
                                        {isAdmin && (
                                            <DropdownMenuItem className="focus:bg-white/5 cursor-pointer py-2.5 px-3 bg-gold/10" onClick={() => navigate('/admin')}>
                                                <Settings className="mr-3 h-4 w-4 text-gold" />
                                                <span className="font-bold">Admin Panel</span>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="focus:bg-white/5 cursor-pointer text-red-400 py-2.5 px-3" onClick={logout}>
                                            <LogOut className="mr-3 h-4 w-4" />
                                            <span>Logout</span>
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
                        className="lg:hidden text-offwhite p-2 hover:bg-white/10 rounded-lg transition-colors relative z-[1000]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X size={32} className="text-gold" /> : <Menu size={32} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 w-full h-full z-[2000] overflow-y-auto bg-[#121820]"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000 }}
                >
                    <div className="sticky top-0 left-0 right-0 z-[2100] bg-[#121820] px-6 py-4 flex items-center justify-between border-b border-white/5 shadow-2xl">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-playfair font-bold text-offwhite">
                            Sustain<span className="text-gold">Sutra</span>
                        </Link>
                        <button
                            className="text-gold p-2 hover:bg-white/5 rounded-full transition-colors flex items-center justify-center border border-gold/20 bg-gold/5"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>
                    </div>

                    <div className="container mx-auto px-6 py-8 flex flex-col gap-10">
                        {/* Services Nested */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-gold/50 uppercase tracking-[0.4em] block">Expertise</span>
                            <div className="flex flex-col gap-4">
                                <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-2xl font-playfair text-offwhite">All Services</Link>
                                <div className="grid grid-cols-1 gap-3 pl-4 border-l border-gold/20">
                                    {serviceLinks.slice(0, 6).map(link => (
                                        <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-offwhite/70 hover:text-gold">{link.name}</Link>
                                    ))}
                                    <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-gold font-bold">+ View More</Link>
                                </div>
                            </div>
                        </div>

                        {/* Resources Nested */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-gold/50 uppercase tracking-[0.4em] block">Resources</span>
                            <div className="flex flex-col gap-4">
                                {resourceLinks.map(link => (
                                    <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl text-offwhite">
                                        <link.icon size={20} className="text-gold/60" /> {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CCTS Module (Authenticated) */}
                        {isAuthenticated && (
                            <div className="space-y-4">
                                <span className="text-xs font-bold text-gold/50 uppercase tracking-[0.4em] block">CCTS Platform</span>
                                <div className="grid grid-cols-1 gap-4">
                                    <Link to="/ccts/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg text-offwhite">
                                        <Database size={20} className="text-gold" /> Dashboard
                                    </Link>
                                    <Link to="/ccts/monitoring-data" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg text-offwhite">
                                        <BarChart3 size={20} className="text-gold" /> Monitoring
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Academy & Insights */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-gold/50 uppercase tracking-[0.4em] block">Intelligence</span>
                            <div className="flex flex-col gap-5">
                                <Link to="/insights" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-2xl font-playfair text-offwhite">
                                    <Newspaper size={24} className="text-gold" /> Insights
                                </Link>
                                <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-2xl font-playfair text-offwhite">
                                    <BookOpen size={24} className="text-gold" /> Sutra Academy
                                </Link>
                            </div>
                        </div>

                        {/* Bottom CTAs */}
                        <div className="pt-8 border-t border-white/5 flex flex-col gap-5">
                            <Link
                                to="/book-appointment"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-5 bg-gold text-navy text-center font-bold text-lg rounded-xl"
                            >
                                Book Appointment
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-full py-4 border border-white/10 text-offwhite text-center rounded-xl font-medium">My Dashboard</Link>
                                    {isAdmin && (
                                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-gold/10 border border-gold/30 text-gold text-center rounded-xl font-bold">
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-red-400 font-medium py-2">Sign Out</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 border border-gold/20 text-gold text-center rounded-xl font-bold">Sign In</Link>
                            )}
                        </div>
                    </div>
                    <div className="h-20"></div>
                </div>
            )}
        </>
    );
};

export default Header;