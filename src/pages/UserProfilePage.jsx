import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Save, GraduationCap, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CourseContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const UserProfilePage = () => {
    const { user, updateProfile, changePassword } = useAuth();
    const { registrations } = useCourses();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswordSection, setShowPasswordSection] = useState(false);

    const handleProfileUpdate = () => {
        const result = updateProfile(profileData);
        if (result.success) {
            toast({ title: "Profile Updated Successfully!" });
            setIsEditing(false);
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
            return;
        }

        const result = changePassword(passwordData.currentPassword, passwordData.newPassword);
        if (result.success) {
            toast({ title: "Password Changed Successfully!" });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setShowPasswordSection(false);
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    };

    const enrolledCourses = registrations.length;

    return (
        <>
            <Helmet>
                <title>My Profile | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy pt-24 pb-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl font-playfair text-gold mb-8">My Profile</h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="md:col-span-1">
                            <div className="glassmorphism rounded-2xl p-6 text-center">
                                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="text-gold" size={48} />
                                </div>
                                <h2 className="text-2xl font-playfair text-offwhite mb-1">{user?.name}</h2>
                                <p className="text-dimmed text-sm mb-4">{user?.email}</p>

                                <div className="flex items-center justify-center gap-2 text-sm text-dimmed mb-2">
                                    <Calendar size={16} />
                                    <span>Joined {new Date(user?.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-sm text-gold">
                                    <GraduationCap size={16} />
                                    <span>{enrolledCourses} Courses Enrolled</span>
                                </div>
                            </div>

                            <Link to="/my-courses" className="block mt-4 py-3 px-4 bg-gradient-sage-forest text-offwhite rounded-lg text-center font-medium hover:opacity-90">
                                View My Courses →
                            </Link>
                        </div>

                        {/* Profile Details */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Profile Information */}
                            <div className="glassmorphism rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-playfair text-offwhite">Profile Information</h3>
                                    <Button
                                        onClick={() => setIsEditing(!isEditing)}
                                        variant="outline"
                                        className="text-sm"
                                    >
                                        {isEditing ? 'Cancel' : 'Edit Profile'}
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-dimmed mb-2">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dimmed mb-2">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                disabled={!isEditing}
                                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dimmed mb-2">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dimmed mb-2">Bio</label>
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            rows={3}
                                            className="block w-full px-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white disabled:opacity-50 resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    {isEditing && (
                                        <Button
                                            onClick={handleProfileUpdate}
                                            className="w-full bg-gold text-navy hover:bg-gold/90"
                                        >
                                            <Save size={16} className="mr-2" />
                                            Save Changes
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Change Password Section */}
                            <div className="glassmorphism rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-playfair text-offwhite">Security</h3>
                                    <Button
                                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                                        variant="outline"
                                        className="text-sm"
                                    >
                                        {showPasswordSection ? 'Cancel' : 'Change Password'}
                                    </Button>
                                </div>

                                {showPasswordSection && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-dimmed mb-2">Current Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="password"
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dimmed mb-2">New Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="password"
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dimmed mb-2">Confirm New Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-navy/50 text-white"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handlePasswordChange}
                                            className="w-full bg-gold text-navy hover:bg-gold/90"
                                        >
                                            Update Password
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfilePage;
