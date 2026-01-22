// Simple course create page - uses similar structure to BlogEditor
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { courseService } from '@/services/courseService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

const CreateCoursePage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'Sustainability',
        level: 'Intermediate',
        duration: '',
        price: '',
        description: '',
        objectives: [''],
        modules: [{ title: '', duration: '' }],
        instructor: 'Dr. Amit Kumar',
        published: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleObjectiveChange = (index, value) => {
        const newObjectives = [...formData.objectives];
        newObjectives[index] = value;
        setFormData({ ...formData, objectives: newObjectives });
    };

    const addObjective = () => {
        setFormData({ ...formData, objectives: [...formData.objectives, ''] });
    };

    const handleModuleChange = (index, field, value) => {
        const newModules = [...formData.modules];
        newModules[index][field] = value;
        setFormData({ ...formData, modules: newModules });
    };

    const addModule = () => {
        setFormData({ ...formData, modules: [...formData.modules, { title: '', duration: '' }] });
    };

    const handleSubmit = () => {
        try {
            const course = courseService.createCourse(formData);
            toast({ title: "Course Created!" });
            navigate('/admin');
        } catch (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    return (
        <div className="min-h-screen bg-navy pt-24 px-4 pb-12">
            <Helmet>
                <title>Create Course | Admin</title>
            </Helmet>

            <div className="container mx-auto max-w-4xl">
                <button onClick={() => navigate('/admin')} className="mb-6 text-gold hover:underline flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>

                <h1 className="text-3xl font-playfair text-white mb-8">Create New Course</h1>

                <div className="glassmorphism rounded-2xl p-8 space-y-6">
                    <div>
                        <label className="block text-offwhite mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                        />
                    </div>

                    <div>
                        <label className="block text-offwhite mb-2">Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-offwhite mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                            >
                                <option>Sustainability</option>
                                <option>Climate</option>
                                <option>Environmental</option>
                                <option>Standards</option>
                            </select>
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

                        <div>
                            <label className="block text-offwhite mb-2">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g., 8 weeks"
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                            />
                        </div>
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

                    <div>
                        <label className="block text-offwhite mb-2">Learning Objectives</label>
                        {formData.objectives.map((obj, idx) => (
                            <input
                                key={idx}
                                type="text"
                                value={obj}
                                onChange={(e) => handleObjectiveChange(idx, e.target.value)}
                                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite mb-2"
                                placeholder={`Objective ${idx + 1}`}
                            />
                        ))}
                        <button onClick={addObjective} className="text-gold hover:underline text-sm">+ Add Objective</button>
                    </div>

                    <div>
                        <label className="block text-offwhite mb-2">Course Modules</label>
                        {formData.modules.map((mod, idx) => (
                            <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
                                <input
                                    type="text"
                                    value={mod.title}
                                    onChange={(e) => handleModuleChange(idx, 'title', e.target.value)}
                                    className="px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                                    placeholder="Module title"
                                />
                                <input
                                    type="text"
                                    value={mod.duration}
                                    onChange={(e) => handleModuleChange(idx, 'duration', e.target.value)}
                                    className="px-4 py-3 bg-navy border border-white/10 rounded-lg text-offwhite"
                                    placeholder="Duration"
                                />
                            </div>
                        ))}
                        <button onClick={addModule} className="text-gold hover:underline text-sm">+ Add Module</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-offwhite cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-4 h-4"
                            />
                            Publish immediately
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleSubmit} className="bg-gold text-navy hover:bg-gold/90">
                            <Save className="w-4 h-4 mr-2" /> Create Course
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

export default CreateCoursePage;
