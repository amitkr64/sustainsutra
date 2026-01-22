import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LeadCaptureForm = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        sectorType: '',
        processType: '',
        reportingStandard: '',
        inquiryDetails: ''
    });

    const [errors, setErrors] = useState({});

    const sectorTypes = [
        'Textile',
        'Manufacturing',
        'Energy',
        'Technology',
        'Agriculture',
        'Other'
    ];

    const processTypes = ['Dyeing', 'Spinning'];

    const reportingStandards = [
        'ISO 14064',
        'GRI Standards',
        'SEBI BRSR',
        'None - Need Guidance'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.inquiryDetails.trim()) {
            newErrors.inquiryDetails = 'Inquiry details are required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);

            toast({
                title: "Success!",
                description: "Thank you! We'll contact you within 24 hours.",
                duration: 5000
            });

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    companyName: '',
                    sectorType: '',
                    processType: '',
                    reportingStandard: '',
                    inquiryDetails: ''
                });
                setIsSuccess(false);
            }, 3000);
        }, 2500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto glassmorphism rounded-2xl p-8"
        >
            <h3 className="text-3xl font-playfair text-gold mb-2">Start Your ESG Journey</h3>
            <p className="text-dimmed mb-8">Fill in your details and we'll get back to you within 24 hours</p>

            {isSuccess ? (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                >
                    <CheckCircle2 className="text-gold mb-4" size={64} />
                    <h4 className="text-2xl font-playfair text-offwhite mb-2">Thank You!</h4>
                    <p className="text-dimmed text-center">We'll contact you within 24 hours.</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label htmlFor="companyName" className="block text-offwhite font-medium mb-2">
                            Company Name <span className="text-gold">*</span>
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-navy/50 border ${errors.companyName ? 'border-red-500' : 'border-white/20'} rounded-lg text-offwhite placeholder-dimmed focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-smooth`}
                            placeholder="Enter your company name"
                        />
                        {errors.companyName && (
                            <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>
                        )}
                    </div>

                    {/* Sector Type */}
                    <div>
                        <label htmlFor="sectorType" className="block text-offwhite font-medium mb-2">
                            Sector Type
                        </label>
                        <select
                            id="sectorType"
                            name="sectorType"
                            value={formData.sectorType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-navy/50 border border-white/20 rounded-lg text-offwhite focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-smooth"
                        >
                            <option value="">Select sector</option>
                            {sectorTypes.map(sector => (
                                <option key={sector} value={sector}>{sector}</option>
                            ))}
                        </select>
                    </div>

                    {/* Conditional Process Type (only for Textile) */}
                    {formData.sectorType === 'Textile' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <label htmlFor="processType" className="block text-offwhite font-medium mb-2">
                                Process Type
                            </label>
                            <select
                                id="processType"
                                name="processType"
                                value={formData.processType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-navy/50 border border-white/20 rounded-lg text-offwhite focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-smooth"
                            >
                                <option value="">Select process</option>
                                {processTypes.map(process => (
                                    <option key={process} value={process}>{process}</option>
                                ))}
                            </select>
                        </motion.div>
                    )}

                    {/* Reporting Standard */}
                    <div>
                        <label htmlFor="reportingStandard" className="block text-offwhite font-medium mb-2">
                            Reporting Standard
                        </label>
                        <select
                            id="reportingStandard"
                            name="reportingStandard"
                            value={formData.reportingStandard}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-navy/50 border border-white/20 rounded-lg text-offwhite focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-smooth"
                        >
                            <option value="">Select standard</option>
                            {reportingStandards.map(standard => (
                                <option key={standard} value={standard}>{standard}</option>
                            ))}
                        </select>
                    </div>

                    {/* Inquiry Details */}
                    <div>
                        <label htmlFor="inquiryDetails" className="block text-offwhite font-medium mb-2">
                            Inquiry Details <span className="text-gold">*</span>
                        </label>
                        <textarea
                            id="inquiryDetails"
                            name="inquiryDetails"
                            value={formData.inquiryDetails}
                            onChange={handleChange}
                            rows={4}
                            className={`w-full px-4 py-3 bg-navy/50 border ${errors.inquiryDetails ? 'border-red-500' : 'border-white/20'} rounded-lg text-offwhite placeholder-dimmed focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-smooth resize-none`}
                            placeholder="Tell us about your ESG goals and requirements..."
                        />
                        {errors.inquiryDetails && (
                            <p className="text-red-400 text-sm mt-1">{errors.inquiryDetails}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gold hover:bg-gold/90 text-navy font-medium py-6 text-lg rounded-lg transition-smooth hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" size={20} />
                                Submitting...
                            </>
                        ) : (
                            'Submit Inquiry'
                        )}
                    </Button>
                </form>
            )}
        </motion.div>
    );
};

export default LeadCaptureForm;