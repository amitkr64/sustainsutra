// Edit course page - simplified version
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { courseService } from '@/services/courseService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

const EditCoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const course = courseService.getCourseById(id);
        if (course) {
            setFormData(course);
        } else {
            toast({ title: "Course not found", variant: "destructive" });
            navigate('/admin');
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        try {
            courseService.updateCourse(id, formData);
            toast({ title: "Course Updated!" });
            navigate('/admin');
        } catch (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    if (!formData) return <div className="min-h-screen bg-navy pt-24 text-white text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-navy pt-24 px-4 pb-12">
            <Helmet>
                <title>Edit Course | Admin</title>
            </Helmet>

            <div className="container mx-auto max-w-4xl">
                <button onClick={() => navigate('/admin')} className="mb-6 text-gold hover:underline flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <h1 className="text-3xl font-playfair text-white mb-8">Edit Course</h1>

                <div className="glassmorphism rounded-2xl p-8 space-y-6">
                    <div>
                        <label className="block text-offwhite mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-offwhite mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                            />
                        </div>
                        <div>
                            <label className="block text-offwhite mb-2">Level</label>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-offwhite mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                            />
                        </div>
                        <div>
                            <label className="block text-offwhite mb-2">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-offwhite mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-offwhite cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-4 h-4"
                            />
                            Published
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleSubmit} className="bg-gold text-navy hover:bg-gold/90">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                        <Button onClick={() => navigate('/admin')} variant="outline">
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCoursePage;
