import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthProvider } from '@/context/AuthContext';
import { CourseProvider } from '@/context/CourseContext';
import { AppointmentProvider } from '@/context/AppointmentContext';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import CreateBlogPage from '@/pages/CreateBlogPage';
import EditBlogPage from '@/pages/EditBlogPage';
import InsightsLandingPage from '@/pages/InsightsLandingPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

import ServicesLandingPage from '@/pages/ServicesLandingPage';
import CarbonFootprintingPage from '@/pages/CarbonFootprintingPage';
import GHGMappingPage from '@/pages/GHGMappingPage';
import ESGStrategyPage from '@/pages/ESGStrategyPage';
import BRSRReportingPage from '@/pages/BRSRReportingPage';
import ISOVerificationPage from '@/pages/ISOVerificationPage';
import TrainingCapacityPage from '@/pages/TrainingCapacityPage';
import EnergyAuditsPage from '@/pages/EnergyAuditsPage';
import WasteManagementPage from '@/pages/WasteManagementPage';
import CircularEconomyPage from '@/pages/CircularEconomyPage';
import EPRPage from '@/pages/EPRPage';
import CleanerProductionPage from '@/pages/CleanerProductionPage';
import ResourceEfficiencyPage from '@/pages/ResourceEfficiencyPage';

// Course pages
import CoursesLandingPage from '@/pages/CoursesLandingPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import CourseContentPage from '@/pages/CourseContentPage';
import MyCourses from '@/pages/MyCourses';
import CreateCoursePage from '@/pages/CreateCoursePage';
import EditCoursePage from '@/pages/EditCoursePage';

// Appointment pages
import AppointmentBookingPage from '@/pages/AppointmentBookingPage';

// User management pages
import UserProfilePage from '@/pages/UserProfilePage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';

// Tools
import CarbonCalculatorPage from '@/pages/CarbonCalculatorPage';

// Company pages
import AboutPage from '@/pages/AboutPage';
import OurApproachPage from '@/pages/OurApproachPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';

// Resources
import ResourcesLandingPage from '@/pages/ResourcesLandingPage';
import SustainabilityGlossaryPage from '@/pages/SustainabilityGlossaryPage';
import DownloadableTemplatesPage from '@/pages/DownloadableTemplatesPage';
import IndustryReportsPage from '@/pages/IndustryReportsPage';
import RegulatoryUpdatesPage from '@/pages/RegulatoryUpdatesPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import CaseStudyDetailPage from '@/pages/CaseStudyDetailPage';

import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Linkedin, Twitter } from 'lucide-react';
import { ScrollToTop } from '@/components/ScrollToTop';
import { newsletterService } from '@/services/newsletterService';

const ScrollToTopWrapper = () => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
};

function App() {
    const { toast } = useToast();

    return (
        <AuthProvider>
            <CourseProvider>
                <AppointmentProvider>
                    <Router>
                        <ScrollToTopWrapper />
                        <Helmet>
                            <title>SustainSutra - ESG Advisory & NetZero Strategy</title>
                            <meta name="description" content="Leading ESG Advisory firm offering Carbon Footprint Analysis, ISO 14064 Verifier services, and BRSR Consultant India expertise." />
                        </Helmet>

                        <div className="min-h-screen bg-navy text-offwhite flex flex-col">
                            <Header />

                            <main className="flex-grow">
                                <Routes>
                                    {/* Public Routes */}
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/insights" element={<InsightsLandingPage />} />
                                    <Route path="/blog/:slug" element={<BlogPostPage />} />

                                    {/* Services */}
                                    <Route path="/services" element={<ServicesLandingPage />} />
                                    <Route path="/services/carbon-footprinting" element={<CarbonFootprintingPage />} />
                                    <Route path="/services/ghg-mapping" element={<GHGMappingPage />} />
                                    <Route path="/services/esg-strategy" element={<ESGStrategyPage />} />
                                    <Route path="/services/brsr-reporting" element={<BRSRReportingPage />} />
                                    <Route path="/services/iso-verification" element={<ISOVerificationPage />} />
                                    <Route path="/services/training-capacity" element={<TrainingCapacityPage />} />
                                    <Route path="/services/energy-audits" element={<EnergyAuditsPage />} />
                                    <Route path="/services/waste-management" element={<WasteManagementPage />} />
                                    <Route path="/services/circular-economy" element={<CircularEconomyPage />} />
                                    <Route path="/services/epr" element={<EPRPage />} />
                                    <Route path="/services/cleaner-production" element={<CleanerProductionPage />} />
                                    <Route path="/services/resource-efficiency" element={<ResourceEfficiencyPage />} />

                                    {/* Courses */}
                                    <Route path="/courses" element={<CoursesLandingPage />} />
                                    <Route path="/courses/:slug" element={<CourseDetailPage />} />
                                    <Route path="/courses/:slug/learn" element={<CourseContentPage />} />
                                    <Route path="/my-courses" element={<MyCourses />} />

                                    {/* Appointments */}
                                    <Route path="/book-appointment" element={<AppointmentBookingPage />} />

                                    {/* Tools */}
                                    <Route path="/carbon-calculator" element={<CarbonCalculatorPage />} />

                                    {/* Company */}
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/our-approach" element={<OurApproachPage />} />
                                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                                    <Route path="/terms" element={<TermsOfServicePage />} />
                                    <Route path="/cookies" element={<CookiePolicyPage />} />

                                    {/* Resources */}
                                    <Route path="/resources" element={<ResourcesLandingPage />} />
                                    <Route path="/resources/glossary" element={<SustainabilityGlossaryPage />} />
                                    <Route path="/resources/templates" element={<DownloadableTemplatesPage />} />
                                    <Route path="/resources/reports" element={<IndustryReportsPage />} />
                                    <Route path="/resources/regulatory-updates" element={<RegulatoryUpdatesPage />} />
                                    <Route path="/resources/case-studies" element={<CaseStudiesPage />} />
                                    <Route path="/resources/case-studies/:id" element={<CaseStudyDetailPage />} />

                                    {/* User Profile & Auth */}
                                    <Route path="/profile" element={<UserProfilePage />} />
                                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

                                    {/* Admin - Protected Routes */}
                                    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                                    <Route path="/admin/blog/new" element={<ProtectedRoute><CreateBlogPage /></ProtectedRoute>} />
                                    <Route path="/admin/blog/:id/edit" element={<ProtectedRoute><EditBlogPage /></ProtectedRoute>} />
                                    <Route path="/admin/course/new" element={<RoleProtectedRoute allowedRoles={['admin', 'instructor']}><CreateCoursePage /></RoleProtectedRoute>} />
                                    <Route path="/admin/course/:id/edit" element={<RoleProtectedRoute allowedRoles={['admin', 'instructor']}><EditCoursePage /></RoleProtectedRoute>} />
                                </Routes>
                            </main>

                            <footer className="bg-navy/95 border-t border-white/10 py-12 mt-auto">
                                <div className="container mx-auto px-4">
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                                        <div className="md:col-span-2">
                                            <h3 className="text-2xl font-playfair text-gold mb-4">SustainSutra</h3>
                                            <p className="text-dimmed text-sm leading-relaxed mb-4">
                                                Engineering NetZero pathways through holistic ESG strategy and compliance excellence.
                                            </p>
                                            <p className="text-dimmed text-sm">
                                                <strong className="text-offwhite">Email:</strong> info@sustainsutra.in<br />
                                                <strong className="text-offwhite">Phone:</strong> +91-8742939191<br />
                                                <strong className="text-offwhite">Location:</strong> F-853, Gaur Siddhartham, Ghaziabad, Uttar Pradesh
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-playfair text-lg text-offwhite mb-4">Services</h4>
                                            <ul className="space-y-2 text-dimmed text-sm">
                                                <li><a href="/services/carbon-footprinting" className="hover:text-gold transition-smooth">Carbon Footprinting</a></li>
                                                <li><a href="/services/ghg-mapping" className="hover:text-gold transition-smooth">GHG Mapping</a></li>
                                                <li><a href="/services/esg-strategy" className="hover:text-gold transition-smooth">ESG Strategy</a></li>
                                                <li><a href="/services/brsr-reporting" className="hover:text-gold transition-smooth">BRSR Reporting</a></li>
                                                <li><a href="/services/iso-verification" className="hover:text-gold transition-smooth">ISO Verification</a></li>
                                                <li><a href="/services" className="hover:text-gold transition-smooth">View All →</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-playfair text-lg text-offwhite mb-4">Company</h4>
                                            <ul className="space-y-2 text-dimmed text-sm">
                                                <li><a href="/about" className="hover:text-gold transition-smooth">About Us</a></li>
                                                <li><a href="/our-approach" className="hover:text-gold transition-smooth">Our Approach</a></li>
                                                <li><a href="/courses" className="hover:text-gold transition-smooth">Courses</a></li>
                                                <li><a href="/carbon-calculator" className="hover:text-gold transition-smooth">Carbon Calculator</a></li>
                                                <li><a href="/insights" className="hover:text-gold transition-smooth">Insights</a></li>
                                                <li><a href="/book-appointment" className="hover:text-gold transition-smooth">Contact Us</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-playfair text-lg text-offwhite mb-4">Connect</h4>
                                            <div className="flex gap-4 mb-6">
                                                <a href="https://www.linkedin.com/in/amit-kumar-42a79927/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center hover:bg-gold/30 transition-smooth">
                                                    <Linkedin className="text-gold" size={20} />
                                                </a>
                                                <button className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center hover:bg-gold/30 transition-smooth">
                                                    <Twitter className="text-gold" size={20} />
                                                </button>
                                            </div>
                                            <p className="text-dimmed text-xs mb-3">
                                                Subscribe to our newsletter for sustainability insights
                                            </p>
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                const email = e.target.email.value;
                                                try {
                                                    newsletterService.subscribe(email);
                                                    toast({
                                                        title: "Subscribed!",
                                                        description: "Thank you for subscribing to our newsletter."
                                                    });
                                                    e.target.reset();
                                                } catch (error) {
                                                    toast({
                                                        title: "Subscription Failed",
                                                        description: error.message,
                                                        variant: "destructive"
                                                    });
                                                }
                                            }}>
                                                <div className="flex gap-2">
                                                    <input type="email" name="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-offwhite w-full focus:border-gold outline-none" required />
                                                    <button type="submit" className="bg-gold text-navy px-3 py-2 rounded text-sm font-bold hover:bg-gold/80 transition-smooth">Go</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <p className="text-dimmed text-sm">© 2026 SustainSutra. All rights reserved.</p>
                                        <div className="flex gap-6 text-dimmed text-sm">
                                            <a href="/privacy" className="hover:text-gold transition-smooth">Privacy Policy</a>
                                            <a href="/terms" className="hover:text-gold transition-smooth">Terms of Service</a>
                                            <a href="/cookies" className="hover:text-gold transition-smooth">Cookie Policy</a>
                                        </div>
                                    </div>
                                </div>
                            </footer>

                            <Toaster />
                        </div>
                    </Router>
                </AppointmentProvider>
            </CourseProvider>
        </AuthProvider>
    );
}

export default App;
