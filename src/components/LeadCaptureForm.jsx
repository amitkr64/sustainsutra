import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, User, Mail, Phone, Building2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { leadService } from '@/services/leadService';

const LeadCaptureForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        contactName: '',
        email: '',
        phone: '',
        company: '',
        sector: '',
        reportingStandard: '',
        inquiryDetails: ''
    });
    const [errors, setErrors] = useState({});

    const sectors = ['Textile', 'Manufacturing', 'Energy', 'Technology', 'Agriculture', 'Other'];
    const standards = ['ISO 14064', 'GRI Standards', 'SEBI BRSR', 'Not sure — need guidance'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!formData.contactName.trim()) e.contactName = 'Your name is required';
        if (!formData.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';
        if (!formData.company.trim()) e.company = 'Company name is required';
        if (!formData.inquiryDetails.trim()) e.inquiryDetails = 'Please tell us about your needs';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            toast({ title: 'Please check the form', description: 'Some required fields are missing.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        try {
            await leadService.createLead(formData);
            setIsSuccess(true);
            toast({ title: 'Inquiry submitted!', description: 'Our team will contact you within 1-2 business days.' });
            setFormData({ contactName: '', email: '', phone: '', company: '', sector: '', reportingStandard: '', inquiryDetails: '' });
        } catch (err) {
            toast({ title: 'Submission failed', description: err.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 shadow-md">
                <CheckCircle2 className="mb-4 text-primary" size={56} />
                <h4 className="text-xl font-bold text-foreground">Thank you, {formData.contactName || 'there'}!</h4>
                <p className="mt-2 text-center text-muted-foreground">Your inquiry has been received. Our sustainability team will contact you within 1-2 business days.</p>
                <p className="mt-1 text-xs text-muted-foreground/70">We&apos;ll be in touch shortly.</p>
                <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>Submit another inquiry</Button>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-md md:p-8">
            <h3 className="text-xl font-bold text-foreground md:text-2xl">Start Your ESG Journey</h3>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">Fill in your details and we'll get back to you within 1-2 business days.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="input-label" htmlFor="contactName">Full Name *</label>
                        <div className="relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input id="contactName" name="contactName" type="text" value={formData.contactName} onChange={handleChange} className={`input-field pl-10 ${errors.contactName ? 'border-destructive' : ''}`} placeholder="Your name" />
                        </div>
                        {errors.contactName && <p className="mt-1 text-xs text-destructive">{errors.contactName}</p>}
                    </div>
                    <div>
                        <label className="input-label" htmlFor="company">Company *</label>
                        <div className="relative">
                            <Building2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} className={`input-field pl-10 ${errors.company ? 'border-destructive' : ''}`} placeholder="Company name" />
                        </div>
                        {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="input-label" htmlFor="email">Email *</label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`input-field pl-10 ${errors.email ? 'border-destructive' : ''}`} placeholder="you@company.com" />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="input-label" htmlFor="phone">Phone</label>
                        <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="input-field pl-10" placeholder="+91 9876543210" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="input-label" htmlFor="sector">Sector</label>
                        <select id="sector" name="sector" value={formData.sector} onChange={handleChange} className="input-field">
                            <option value="">Select sector</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="input-label" htmlFor="reportingStandard">Reporting Standard</label>
                        <select id="reportingStandard" name="reportingStandard" value={formData.reportingStandard} onChange={handleChange} className="input-field">
                            <option value="">Select standard</option>
                            {standards.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="input-label" htmlFor="inquiryDetails">How can we help? *</label>
                    <textarea id="inquiryDetails" name="inquiryDetails" value={formData.inquiryDetails} onChange={handleChange} rows={4} className={`input-field resize-none ${errors.inquiryDetails ? 'border-destructive' : ''}`} placeholder="Tell us about your ESG goals and requirements..." />
                    {errors.inquiryDetails && <p className="mt-1 text-xs text-destructive">{errors.inquiryDetails}</p>}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                    {isLoading ? <><Loader2 className="mr-2 animate-spin" size={18} /> Submitting...</> : 'Submit Inquiry'}
                </Button>
            </form>
        </motion.div>
    );
};

export default LeadCaptureForm;
