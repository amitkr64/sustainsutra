import React, { useState, useEffect } from 'react';
import { resourceService } from '@/services/resourceService';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ArrowLeft, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const ResourceManager = () => {
    const [activeTab, setActiveTab] = useState('reports');
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [editingItem, setEditingItem] = useState(null);
    const [data, setData] = useState([]);
    const { toast } = useToast();

    // Form states
    const [formData, setFormData] = useState({});

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        let fetchedData = [];
        if (activeTab === 'reports') fetchedData = await resourceService.getIndustryReports();
        else if (activeTab === 'updates') fetchedData = await resourceService.getRegulatoryUpdates();
        else if (activeTab === 'templates') fetchedData = await resourceService.getTemplates();
        else if (activeTab === 'casestudies') fetchedData = await resourceService.getCaseStudies();
        setData(fetchedData || []);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setFormData({});
        setView('form');
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ ...item });
        setView('form');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            let success = false;
            if (activeTab === 'reports') success = await resourceService.deleteIndustryReport(id);
            else if (activeTab === 'updates') success = await resourceService.deleteRegulatoryUpdate(id);
            else if (activeTab === 'templates') success = await resourceService.deleteTemplate(id);
            else if (activeTab === 'casestudies') success = await resourceService.deleteCaseStudy(id);

            if (success) {
                toast({ title: "Item deleted successfully" });
                await loadData();
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let result = null;

        try {
            if (activeTab === 'reports') {
                if (editingItem) result = await resourceService.updateIndustryReport(editingItem.id, formData);
                else result = await resourceService.addIndustryReport(formData);
            } else if (activeTab === 'updates') {
                if (editingItem) result = await resourceService.updateRegulatoryUpdate(editingItem.id, formData);
                else result = await resourceService.addRegulatoryUpdate(formData);
            } else if (activeTab === 'templates') {
                if (editingItem) result = await resourceService.updateTemplate(editingItem.id, formData);
                else result = await resourceService.addTemplate(formData);
            } else if (activeTab === 'casestudies') {
                if (editingItem) result = await resourceService.updateCaseStudy(editingItem.id, formData);
                else result = await resourceService.createCaseStudy(formData);
            }

            if (result) {
                toast({ title: editingItem ? "Item updated" : "Item created" });
                setView('list');
                await loadData();
            }
        } catch (error) {
            toast({ title: "Error saving item", variant: "destructive" });
        }
    };

    const renderForm = () => {
        return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-playfair text-white">
                        {editingItem ? 'Edit Item' : 'Add New Item'}
                    </h3>
                    <Button variant="ghost" onClick={() => setView('list')} className="text-offwhite/60 hover:text-white">
                        <X size={20} />
                    </Button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                    {/* Common Fields */}
                    <div>
                        <label className="block text-sm text-offwhite/60 mb-1">Title</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    {activeTab !== 'casestudies' && (
                        <div>
                            <label className="block text-sm text-offwhite/60 mb-1">Description</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    )}

                    {/* Specific Fields: Reports */}
                    {activeTab === 'reports' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Sector</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.sector || ''}
                                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Size (e.g., 4.2 MB)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.size || ''}
                                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={formData.image || ''}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">File URL (Download Link)</label>
                                <input
                                    type="text"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={formData.fileUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {/* Specific Fields: Case Studies */}
                    {activeTab === 'casestudies' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Client Industry</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.clientIndustry || ''}
                                        onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Date</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={formData.image || ''}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">The Challenge</label>
                                <textarea
                                    rows="3"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={formData.challenge || ''}
                                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">Our Solution</label>
                                <textarea
                                    rows="3"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={formData.solution || ''}
                                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">Key Results (One per line)</label>
                                <textarea
                                    rows="3"
                                    placeholder="20% reduction in emissions&#10;Saved $50k annually"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={Array.isArray(formData.results) ? formData.results.join('\n') : (formData.results || '')}
                                    onChange={(e) => setFormData({ ...formData, results: e.target.value.split('\n') })}
                                />
                            </div>
                        </>
                    )}

                    {/* Specific Fields: Updates */}
                    {activeTab === 'updates' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Source</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.source || ''}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Category</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.category || ''}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Date</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., July 12, 2025"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Link URL</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.link || ''}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Specific Fields: Templates */}
                    {activeTab === 'templates' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Category</label>
                                    <input
                                        type="text"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.category || ''}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Icon Type</label>
                                    <select
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.iconType || 'FileText'}
                                        onChange={(e) => setFormData({ ...formData, iconType: e.target.value })}
                                    >
                                        <option value="FileText">FileText</option>
                                        <option value="FileSpreadsheet">FileSpreadsheet</option>
                                        <option value="CheckCircle">CheckCircle</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-offwhite/60 mb-1">Icon Color Class</label>
                                    <input
                                        type="text"
                                        placeholder="text-green-400"
                                        className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                        value={formData.iconColor || ''}
                                        onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center pt-6">
                                    <input
                                        type="checkbox"
                                        id="premium"
                                        className="mr-2"
                                        checked={formData.premium || false}
                                        onChange={(e) => setFormData({ ...formData, premium: e.target.checked })}
                                    />
                                    <label htmlFor="premium" className="text-white">Premium Content</label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-offwhite/60 mb-1">File URL (Download Link)</label>
                                <input
                                    type="text"
                                    className="w-full bg-navy border border-white/20 rounded-md p-2 text-white focus:border-gold outline-none"
                                    value={formData.fileUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={() => setView('list')} className="text-navy hover:bg-offwhite">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-gold text-navy hover:bg-gold/90">
                            <Save size={16} className="mr-2" /> Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setView('list'); }} className="w-auto">
                    <TabsList className="bg-white/5 border border-white/10">
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                        <TabsTrigger value="updates">Regulatory Updates</TabsTrigger>
                        <TabsTrigger value="templates">Templates</TabsTrigger>
                        <TabsTrigger value="casestudies">Case Studies</TabsTrigger>
                    </TabsList>
                </Tabs>

                {view === 'list' && (
                    <Button onClick={handleAddNew} className="bg-gold text-navy hover:bg-gold/90">
                        <Plus className="w-4 h-4 mr-2" /> Add New
                    </Button>
                )}
            </div>

            {view === 'form' ? renderForm() : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr className="border-b border-white/10">
                                <th className="p-4 text-left text-offwhite/60">Title</th>
                                <th className="p-4 text-left text-offwhite/60">
                                    {activeTab === 'reports' ? 'Sector' : activeTab === 'updates' ? 'Source' : activeTab === 'templates' ? 'Category' : 'Industry'}
                                </th>
                                <th className="p-4 text-left text-offwhite/60">
                                    {activeTab === 'reports' ? 'Date' : activeTab === 'updates' ? 'Date' : activeTab === 'templates' ? 'Premium' : 'Date'}
                                </th>
                                <th className="p-4 text-right text-offwhite/60">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 text-white font-medium">{item.title}</td>
                                    <td className="p-4 text-offwhite/80">
                                        {activeTab === 'reports' ? item.sector : activeTab === 'updates' ? item.source : activeTab === 'templates' ? item.category : item.clientIndustry}
                                    </td>
                                    <td className="p-4 text-offwhite/80">
                                        {activeTab === 'reports' ? item.date : activeTab === 'updates' ? item.date : activeTab === 'templates' ? (item.premium ? 'Yes' : 'No') : item.date}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 hover:text-gold transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 hover:text-red-400 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-offwhite/40">
                                        No items found. Click "Add New" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ResourceManager;
