import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
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
    const { isAuthenticated, logout } = useAuth();

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

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-8">
                    <li>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-offwhite hover:text-gold transition-smooth font-medium outline-none">
                                Services <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-56">
                                <DropdownMenuItem className="focus:bg-white/10 focus:text-gold cursor-pointer" onClick={() => navigate('/services')}>
                                    All Services
                                </DropdownMenuItem>
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
                                    Training & Capacity
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>
                    <li>
                        <Link to="/services/training-capacity" className="text-offwhite hover:text-gold transition-smooth font-medium">
                            Trainings
                        </Link>
                    </li>
                    <li>
                        <Link to="/insights" className="text-offwhite hover:text-gold transition-smooth font-medium">
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link to="/resources" className="text-offwhite hover:text-gold transition-smooth font-medium">
                            Resources
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-offwhite hover:text-gold transition-smooth font-medium">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/carbon-calculator" className="text-offwhite hover:text-gold transition-smooth font-medium">
                            Carbon Calculator
                        </Link>
                    </li>
                    <li>
                        <Link to="/book-appointment" className="px-4 py-2 bg-gold/20 text-gold hover:bg-gold hover:text-navy rounded-lg transition-smooth font-medium">
                            Book Appointment
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('contact')}
                            className="text-offwhite hover:text-gold transition-smooth font-medium"
                        >
                            Contact
                        </button>
                    </li>

                    {/* Auth Controls */}
                    {isAuthenticated ? (
                        <li className="border-l border-white/20 pl-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-2 text-gold hover:text-white transition-colors font-medium outline-none">
                                    <User size={18} />
                                    <span>Account</span>
                                    <ChevronDown size={16} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-navy border border-white/10 text-offwhite w-48">
                                    <DropdownMenuItem
                                        className="focus:bg-white/10 focus:text-gold cursor-pointer"
                                        onClick={() => navigate('/profile')}
                                    >
                                        <User size={16} className="mr-2" />
                                        My Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-white/10 focus:text-gold cursor-pointer"
                                        onClick={() => navigate('/my-courses')}
                                    >
                                        <User size={16} className="mr-2" />
                                        My Courses
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="focus:bg-white/10 focus:text-gold cursor-pointer"
                                        onClick={() => navigate('/admin')}
                                    >
                                        <User size={16} className="mr-2" />
                                        Admin Panel
                                    </DropdownMenuItem>
                                    <div className="border-t border-white/10 my-1" />
                                    <DropdownMenuItem
                                        className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-dimmed"
                                        onClick={logout}
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    ) : (
                        <li className="border-l border-white/20 pl-4">
                            <Link to="/login" className="text-gold font-medium hover:text-white transition-colors">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-offwhite"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glassmorphism-strong border-t border-white/10 h-screen overflow-y-auto pb-20">
                    <ul className="container mx-auto px-4 py-4 flex flex-col gap-6">
                        <li>
                            <div className="font-playfair text-gold text-lg mb-2">Services</div>
                            <ul className="pl-4 border-l border-white/10 space-y-3">
                                <li><button onClick={() => { navigate('/services'); setIsMenuOpen(false); }} className="text-offwhite hover:text-gold text-sm w-full text-left">All Services</button></li>
                                <li><button onClick={() => { navigate('/services/carbon-footprinting'); setIsMenuOpen(false); }} className="text-offwhite hover:text-gold text-sm w-full text-left">Carbon Footprinting</button></li>
                                {/* ... other services ... */}
                            </ul>
                        </li>

                        <li>
                            <Link to="/insights" onClick={() => setIsMenuOpen(false)} className="text-offwhite hover:text-gold transition-smooth font-medium w-full text-left text-lg block">
                                Insights
                            </Link>
                        </li>

                        {/* ... other links ... */}

                        {isAuthenticated && (
                            <li className="border-t border-white/10 pt-4">
                                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-gold font-medium w-full text-left text-lg block mb-4">
                                    Admin Dashboard
                                </Link>
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-red-400 font-medium w-full text-left text-lg block">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;