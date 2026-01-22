import React, { useState, useEffect } from 'react';
import { teamService } from '../services/teamService';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, X, Save, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await teamService.getAll();
        setTeam(data || []);
    };

    const handleEdit = (member) => {
        setCurrentMember(member);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentMember({
            name: '',
            role: '',
            bio: '',
            image: '',
            linkedin: '',
            email: ''
        });
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentMember.id) {
                await teamService.update(currentMember.id, currentMember);
                toast({ title: "Team member updated" });
            } else {
                await teamService.create(currentMember);
                toast({ title: "Team member added" });
            }
            setIsEditing(false);
            setCurrentMember(null);
            await loadData();
        } catch (error) {
            toast({ title: "Error saving team member", variant: "destructive" });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this team member?")) {
            await teamService.delete(id);
            toast({ title: "Team member removed", variant: "destructive" });
            await loadData();
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-playfair text-white">
                        {currentMember.id ? 'Edit Team Member' : 'Add Team Member'}
                    </h2>
                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-offwhite hover:text-white">
                        <X size={24} />
                    </Button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-offwhite/80 mb-1">Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-gold outline-none"
                                value={currentMember.name}
                                onChange={e => setCurrentMember({ ...currentMember, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-offwhite/80 mb-1">Role</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-gold outline-none"
                                value={currentMember.role}
                                onChange={e => setCurrentMember({ ...currentMember, role: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-offwhite/80 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-gold outline-none"
                                value={currentMember.email || ''}
                                onChange={e => setCurrentMember({ ...currentMember, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-offwhite/80 mb-1">LinkedIn URL</label>
                            <input
                                type="url"
                                className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-gold outline-none"
                                value={currentMember.linkedin || ''}
                                onChange={e => setCurrentMember({ ...currentMember, linkedin: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-offwhite/80 mb-1">Image URL</label>
                            <input
                                required
                                type="url"
                                className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-gold outline-none"
                                value={currentMember.image}
                                onChange={e => setCurrentMember({ ...currentMember, image: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-offwhite/80 mb-1">Bio</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-gold outline-none"
                                value={currentMember.bio}
                                onChange={e => setCurrentMember({ ...currentMember, bio: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-gold text-navy hover:bg-gold/90">
                            <Save className="w-4 h-4 mr-2" /> Save Member
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair text-white">Team Management</h2>
                <Button onClick={handleCreate} className="bg-gold text-navy hover:bg-gold/90">
                    <Plus className="w-4 h-4 mr-2" /> Add Member
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(member => (
                    <div key={member.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60"></div>
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="p-2 bg-navy/80 text-white rounded-full hover:bg-gold hover:text-navy transition-colors"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="p-2 bg-navy/80 text-white rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-playfair text-white mb-1">{member.name}</h3>
                            <p className="text-gold text-sm mb-3">{member.role}</p>
                            <div className="flex gap-3 mb-3">
                                {member.linkedin && <Linkedin size={16} className="text-offwhite/60" />}
                                {member.email && <Mail size={16} className="text-offwhite/60" />}
                            </div>
                            <p className="text-offwhite/60 text-sm line-clamp-3">
                                {member.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamManager;
