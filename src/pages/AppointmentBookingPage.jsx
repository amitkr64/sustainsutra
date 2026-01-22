import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Clock, Mail, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { appointmentService } from '@/services/appointmentService';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const AppointmentBookingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        company: '',
        date: '',
        timeSlot: '',
        purpose: '',
        message: ''
    });

    const timeSlots = [
        '09:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 01:00 PM',
        '02:00 PM - 03:00 PM',
        '03:00 PM - 04:00 PM',
        '04:00 PM - 05:00 PM'
    ];

    const purposes = [
        'ESG Consultation',
        'Carbon Footprint Assessment',
        'Course  Inquiry',
        'Partnership Discussion',
        'General Consultation',
        'Other'
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            appointmentService.createAppointment(formData);
            setSubmitted(true);
            toast({
                title: "Appointment Requested!",
                description: "We'll confirm your appointment soon.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to book appointment. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy">
                <Helmet>
                    <title>Appointment Confirmed - SustainSutra</title>
                </Helmet>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md glassmorphism rounded-2xl p-12"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-400" size={40} />
                    </div>
                    <h2 className="text-3xl font-playfair text-offwhite mb-4">Appointment Requested!</h2>
                    <p className="text-dimmed mb-8">
                        We've received your request and will confirm your appointment via email shortly.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-sage-forest text-offwhite rounded-lg hover:opacity-90"
                    >
                        Return Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Book Appointment - SustainSutra</title>
                <meta name="description" content="Schedule a consultation with our sustainability experts." />
            </Helmet>

            <section className="py-20 bg-gradient-to-br from-navy via-forest to-navy">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
                            <Calendar className="text-gold" size={20} />
                            <span className="text-gold font-medium">Schedule Consultation</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-playfair text-offwhite mb-6">
                            Book an <span className="text-gold">Appointment</span>
                        </h1>
                        <p className="text-xl text-dimmed">
                            Connect with our sustainability experts to discuss your ESG goals and initiatives.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="glassmorphism-strong rounded-2xl p-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-offwhite mb-2 font-medium">
                                        <User className="inline mr-2" size={16} />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-offwhite mb-2 font-medium">
                                        <Mail className="inline mr-2" size={16} />
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-offwhite mb-2 font-medium">
                                        <Phone className="inline mr-2" size={16} />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    />
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-offwhite mb-2 font-medium">Company/Organization</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className="block text-offwhite mb-2 font-medium">
                                        <Calendar className="inline mr-2" size={16} />
                                        Preferred Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    />
                                </div>

                                {/* Time Slot */}
                                <div>
                                    <label className="block text-offwhite mb-2 font-medium">
                                        <Clock className="inline mr-2" size={16} />
                                        Time Slot *
                                    </label>
                                    <select
                                        name="timeSlot"
                                        value={formData.timeSlot}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    >
                                        <option value="">Select time</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Purpose */}
                                <div className="md:col-span-2">
                                    <label className="block text-offwhite mb-2 font-medium">Purpose of Consultation *</label>
                                    <select
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50"
                                    >
                                        <option value="">Select purpose</option>
                                        {purposes.map(purpose => (
                                            <option key={purpose} value={purpose}>{purpose}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="md:col-span-2">
                                    <label className="block text-offwhite mb-2 font-medium">
                                        <MessageSquare className="inline mr-2" size={16} />
                                        Additional Details
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg text-offwhite 
                                                 focus:outline-none focus:border-gold/50 resize-none"
                                        placeholder="Tell us more about your consultation needs..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-8 py-4 bg-gradient-sage-forest text-offwhite rounded-lg font-medium 
                                             hover:opacity-90 transition-smooth disabled:opacity-50 text-lg flex justify-center items-center"
                            >
                                {loading ? <LoadingSpinner size="sm" /> : 'Book Appointment'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AppointmentBookingPage;
