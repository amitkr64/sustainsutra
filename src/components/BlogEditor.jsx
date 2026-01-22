import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { blogService } from '@/services/blogService';
import { Save, ArrowLeft, Eye } from 'lucide-react';

const BlogEditor = ({ initialData, isEditing = false }) => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        featuredImage: '',
        category: 'General',
        author: '',
        excerpt: '',
        content: '',
        metaDescription: '',
        tags: '',
        publishDate: new Date().toISOString().split('T')[0],
        status: 'draft',
        ...initialData
    });

    const [autoSaveStatus, setAutoSaveStatus] = useState('');

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, isEditing]);

    // Auto-save draft functionality (simulate)
    useEffect(() => {
        const timer = setInterval(() => {
            if (formData.title && formData.content) {
                // In a real app, save to localStorage draft key
                setAutoSaveStatus('Auto-saved to local draft');
                setTimeout(() => setAutoSaveStatus(''), 2000);
            }
        }, 30000);
        return () => clearInterval(timer);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e, statusOverride = null) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.author) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields (Title, Content, Author)",
                variant: "destructive"
            });
            return;
        }

        const dataToSave = {
            ...formData,
            status: statusOverride || formData.status,
            tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags
        };

        try {
            if (isEditing) {
                blogService.update(initialData.id, dataToSave);
                toast({ title: "Success", description: "Blog post updated successfully" });
            } else {
                blogService.create(dataToSave);
                toast({ title: "Success", description: "New blog post created successfully" });
            }
            navigate('/admin');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save blog post",
                variant: "destructive"
            });
        }
    };

    const categories = [
        "Carbon Footprinting",
        "GHG Mapping",
        "ESG Strategy",
        "BRSR",
        "ISO Verification",
        "Training",
        "General"
    ];

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" onClick={() => navigate('/admin')} className="text-offwhite hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex gap-3">
                    <span className="text-xs text-dimmed self-center mr-2">{autoSaveStatus}</span>
                    <Button variant="outline" onClick={(e) => handleSubmit(e, 'draft')} className="border-white/20 text-offwhite hover:bg-white/10">
                        <Save className="mr-2 h-4 w-4" /> Save Draft
                    </Button>
                    <Button onClick={(e) => handleSubmit(e, 'published')} className="bg-gold text-navy hover:bg-gold/90 font-bold">
                        {isEditing ? 'Update & Publish' : 'Publish Post'}
                    </Button>
                </div>
            </div>

            <form className="space-y-8 bg-white/5 p-8 rounded-xl border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                            placeholder="Enter blog title"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Slug (URL)</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-dimmed focus:border-gold outline-none"
                            placeholder="auto-generated-slug"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Author *</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                            placeholder="Author name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Publish Date</label>
                        <input
                            type="date"
                            name="publishDate"
                            value={formData.publishDate}
                            onChange={handleChange}
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-offwhite">Featured Image URL</label>
                    <input
                        type="text"
                        name="featuredImage"
                        value={formData.featuredImage}
                        onChange={handleChange}
                        className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                        placeholder="https://example.com/image.jpg"
                    />
                    {formData.featuredImage && (
                        <div className="mt-2 h-40 w-full overflow-hidden rounded-lg border border-white/10">
                            <img src={formData.featuredImage} alt="Preview" className="h-full w-full object-cover opacity-80" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-offwhite">Short Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows="3"
                        className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                        placeholder="Brief summary for card display..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-offwhite">Full Content (Markdown supported) *</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="12"
                        className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none font-mono text-sm"
                        placeholder="# Heading\n\nWrite your blog post content here..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Meta Description (SEO)</label>
                        <textarea
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            rows="2"
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-offwhite">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full bg-navy border border-white/20 rounded-lg p-3 text-white focus:border-gold outline-none"
                            placeholder="ESG, Climate, BRSR..."
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogEditor;