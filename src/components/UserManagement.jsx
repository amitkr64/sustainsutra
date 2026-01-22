import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { userService } from '@/services/userService';
import { Search, Shield, User, GraduationCap, Trash2, Plus, X } from 'lucide-react';

const UserManagement = () => {
    const { toast } = useToast();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchQuery]);

    const loadUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data || []);
        } catch (error) {
            console.error('Error loading users:', error);
            setUsers([]);
        }
    };

    const filterUsers = () => {
        let filtered = users;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(u =>
                u.name.toLowerCase().includes(query) ||
                u.email.toLowerCase().includes(query)
            );
        }

        setFilteredUsers(filtered);
    };

    const changeUserRole = async (userId, newRole) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            return;
        }

        try {
            await userService.update(userId, { role: newRole });
            await loadUsers();
            toast({
                title: "Role Updated!",
                description: `User role changed to ${newRole}.`
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            return;
        }

        try {
            await userService.delete(userId);
            await loadUsers();
            toast({
                title: "User Deleted",
                description: "The user has been permanently removed."
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await userService.create(newUser);
            setNewUser({ name: '', email: '', password: '', role: 'user' });
            setShowAddForm(false);
            await loadUsers();
            toast({ title: "User Created", description: `${newUser.name} has been added.` });
        } catch (error) {
            toast({ title: "Error", description: error.message, variant: 'destructive' });
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <Shield className="text-red-400" size={16} />;
            case 'instructor':
                return <GraduationCap className="text-gold" size={16} />;
            default:
                return <User className="text-blue-400" size={16} />;
        }
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'instructor':
                return 'bg-gold/20 text-gold border-gold/30';
            default:
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-playfair text-offwhite">User Management</h2>
                    <p className="text-dimmed text-sm">Manage user roles and permissions</p>
                </div>
                {!showAddForm && (
                    <Button onClick={() => setShowAddForm(true)} className="bg-gold text-navy hover:bg-gold/90">
                        <Plus size={16} className="mr-2" /> Add User
                    </Button>
                )}
            </div>

            {/* Add User Form */}
            {showAddForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-playfair text-white">Add New User</h3>
                        <Button variant="ghost" onClick={() => setShowAddForm(false)} className="text-offwhite/60 hover:text-white">
                            <X size={20} />
                        </Button>
                    </div>
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-dimmed mb-1">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-navy border border-white/20 rounded-md p-2 text-white outline-none focus:border-gold"
                                value={newUser.name}
                                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-dimmed mb-1">Email</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-navy border border-white/20 rounded-md p-2 text-white outline-none focus:border-gold"
                                value={newUser.email}
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-dimmed mb-1">Password</label>
                            <input
                                required
                                type="password"
                                className="w-full bg-navy border border-white/20 rounded-md p-2 text-white outline-none focus:border-gold"
                                value={newUser.password}
                                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-dimmed mb-1">Role</label>
                            <select
                                className="w-full bg-navy border border-white/20 rounded-md p-2 text-white outline-none focus:border-gold"
                                value={newUser.role}
                                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="border-white/20 text-offwhite hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-gold text-navy hover:bg-gold/90">
                                Create User
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            <div className="glassmorphism rounded-lg p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-navy border border-white/10 rounded text-offwhite focus:border-gold outline-none"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="glassmorphism rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Current Role</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Joined</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-dimmed">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5">
                                    <td className="px-4 py-3 text-sm text-offwhite">{user.name}</td>
                                    <td className="px-4 py-3 text-sm text-dimmed">{user.email}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                                            {getRoleIcon(user.role)}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-dimmed">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm flex gap-2">
                                        <select
                                            value={user.role}
                                            onChange={(e) => changeUserRole(user.id, e.target.value)}
                                            className="px-3 py-1 bg-navy border border-white/10 rounded text-offwhite text-xs cursor-pointer focus:border-gold outline-none"
                                            disabled={user.role === 'admin' && user.email === 'admin@sustainsutra.com'}
                                        >
                                            <option value="user">User</option>
                                            <option value="instructor">Instructor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-1.5 text-red-400 hover:bg-red-400/20 rounded transition-colors"
                                            title="Delete User"
                                            disabled={user.role === 'admin' && user.email === 'admin@sustainsutra.com'}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-dimmed">
                        No users found
                    </div>
                )}
            </div>

            {/* Role Descriptions */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="glassmorphism rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="text-blue-400" size={20} />
                        <h3 className="text-offwhite font-semibold">User</h3>
                    </div>
                    <p className="text-dimmed text-sm">
                        Can enroll in courses, use tools, and book appointments. Standard access level.
                    </p>
                </div>

                <div className="glassmorphism rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="text-gold" size={20} />
                        <h3 className="text-offwhite font-semibold">Instructor</h3>
                    </div>
                    <p className="text-dimmed text-sm">
                        Can create and edit courses. Has all user permissions plus content creation.
                    </p>
                </div>

                <div className="glassmorphism rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="text-red-400" size={20} />
                        <h3 className="text-offwhite font-semibold">Admin</h3>
                    </div>
                    <p className="text-dimmed text-sm">
                        Full system access. Can manage users, courses, emission factors, and all content.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
