import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogService } from '@/services/blogService';
import { courseService } from '@/services/courseService';
import { appointmentService } from '@/services/appointmentService';
import { newsletterService } from '@/services/newsletterService';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Eye, Search, FileText, CheckCircle, Clock, GraduationCap, Calendar, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import EmissionFactorManager from '@/components/EmissionFactorManager';
import UserManagement from '@/components/UserManagement';
import ResourceManager from '@/components/ResourceManager';
import TeamManager from '@/components/TeamManager';

const AdminDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [courses, setCourses] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [activeTab, setActiveTab] = useState('blogs');
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [blogsData, appointmentsData, subscribersData] = await Promise.all([
                blogService.getAll(),
                appointmentService.getAllAppointments(),
                newsletterService.getAll()
            ]);

            setBlogs(blogsData || []);
            setCourses(courseService.getAllCourses() || []);
            setAppointments(appointmentsData || []);
            setSubscribers(subscribersData || []);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            // Fallbacks for when API is down
            setBlogs([]);
            setCourses(courseService.getAllCourses() || []);
            setAppointments([]);
            setSubscribers([]);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (window.confirm('Are you sure?')) {
            await blogService.delete(id);
            await loadData();
            toast({ title: "Blog Deleted", variant: "destructive" });
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure?')) {
            await courseService.deleteCourse(id);
            await loadData();
            toast({ title: "Course Deleted", variant: "destructive" });
        }
    };

    const handleUpdateAppointment = async (id, status) => {
        await appointmentService.updateAppointmentStatus(id, status);
        await loadData();
        toast({ title: "Appointment Updated" });
    };

    const handleUnsubscribe = async (id) => {
        if (confirm("Remove this subscriber?")) {
            await newsletterService.unsubscribe(id);
            await loadData();
            toast({ title: "Subscriber Removed" });
        }
    };

    const stats = {
        blogs: blogs.length,
        courses: courses.length,
        appointments: appointments.length,
        pendingAppointments: appointments.filter(a => a.status === 'pending').length,
        subscribers: subscribers.length
    };

    return (
        <div className="min-h-screen bg-navy pt-24 px-4 pb-12">
            <Helmet>
                <title>Admin Dashboard | SustainSutra</title>
            </Helmet>

            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-playfair text-white mb-2">Admin Dashboard</h1>
                    <p className="text-offwhite/60">Manage blogs, courses, and appointments.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-offwhite/80 font-medium">Total Blogs</h3>
                            <FileText className="text-gold w-5 h-5" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.blogs}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-offwhite/80 font-medium">Courses</h3>
                            <GraduationCap className="text-gold w-5 h-5" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.courses}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-offwhite/80 font-medium">Appointments</h3>
                            <Calendar className="text-gold w-5 h-5" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.appointments}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-offwhite/80 font-medium">Pending</h3>
                            <Clock className="text-orange-400 w-5 h-5" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.pendingAppointments}</p>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-white/5 border border-white/10">
                        <TabsTrigger value="blogs">Blogs</TabsTrigger>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="emission-factors">Emission Factors</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
                        <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>

                    {/* Blogs Tab */}
                    <TabsContent value="blogs" className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-playfair text-white">Blog Posts</h2>
                            <Link to="/admin/blog/new">
                                <Button className="bg-gold text-navy hover:bg-gold/90">
                                    <Plus className="w-4 h-4 mr-2" /> New Blog
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="border-b border-white/10">
                                        <th className="p-4 text-left text-offwhite/60">Title</th>
                                        <th className="p-4 text-left text-offwhite/60">Author</th>
                                        <th className="p-4 text-left text-offwhite/60">Status</th>
                                        <th className="p-4 text-right text-offwhite/60">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog.id} className="border-b border-white/5">
                                            <td className="p-4 text-white">{blog.title}</td>
                                            <td className="p-4 text-offwhite/80">{blog.author}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs ${blog.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <Link to={`/admin/blog/${blog.id}/edit`}>
                                                    <button className="p-2 hover:text-gold"><Edit size={16} /></button>
                                                </Link>
                                                <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 hover:text-red-400">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>

                    {/* Courses Tab */}
                    <TabsContent value="courses" className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-playfair text-white">Courses</h2>
                            <Link to="/admin/course/new">
                                <Button className="bg-gold text-navy hover:bg-gold/90">
                                    <Plus className="w-4 h-4 mr-2" /> New Course
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="border-b border-white/10">
                                        <th className="p-4 text-left text-offwhite/60">Title</th>
                                        <th className="p-4 text-left text-offwhite/60">Category</th>
                                        <th className="p-4 text-left text-offwhite/60">Level</th>
                                        <th className="p-4 text-left text-offwhite/60">Price</th>
                                        <th className="p-4 text-right text-offwhite/60">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id} className="border-b border-white/5">
                                            <td className="p-4 text-white">{course.title}</td>
                                            <td className="p-4 text-offwhite/80">{course.category}</td>
                                            <td className="p-4 text-offwhite/80">{course.level}</td>
                                            <td className="p-4 text-gold">₹{course.price?.toLocaleString('en-IN')}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <Link to={`/admin/course/${course.id}/edit`}>
                                                    <button className="p-2 hover:text-gold"><Edit size={16} /></button>
                                                </Link>
                                                <button onClick={() => handleDeleteCourse(course.id)} className="p-2 hover:text-red-400">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>

                    {/* Appointments Tab */}
                    <TabsContent value="appointments" className="mt-6">
                        <h2 className="text-2xl font-playfair text-white mb-4">Appointment Requests</h2>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="border-b border-white/10">
                                        <th className="p-4 text-left text-offwhite/60">Name</th>
                                        <th className="p-4 text-left text-offwhite/60">Email</th>
                                        <th className="p-4 text-left text-offwhite/60">Date</th>
                                        <th className="p-4 text-left text-offwhite/60">Status</th>
                                        <th className="p-4 text-right text-offwhite/60">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(apt => (
                                        <tr key={apt.id} className="border-b border-white/5">
                                            <td className="p-4 text-white">{apt.name}</td>
                                            <td className="p-4 text-offwhite/80">{apt.email}</td>
                                            <td className="p-4 text-offwhite/80">{apt.date} - {apt.timeSlot}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs ${apt.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                                    apt.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-orange-500/20 text-orange-400'
                                                    }`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                {apt.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleUpdateAppointment(apt.id, 'confirmed')}
                                                            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs">
                                                            Confirm
                                                        </button>
                                                        <button onClick={() => handleUpdateAppointment(apt.id, 'cancelled')}
                                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs">
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>

                    {/* Resources Tab */}
                    <TabsContent value="resources" className="mt-6">
                        <ResourceManager />
                    </TabsContent>

                    {/* Emission Factors Tab */}
                    <TabsContent value="emission-factors" className="mt-6">
                        <EmissionFactorManager />
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users" className="mt-6">
                        <UserManagement />
                    </TabsContent>

                    {/* Subscribers Tab */}
                    <TabsContent value="subscribers" className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-playfair text-white">Newsletter Subscribers</h2>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr className="border-b border-white/10">
                                        <th className="p-4 text-left text-offwhite/60">Email</th>
                                        <th className="p-4 text-left text-offwhite/60">Date Subscribed</th>
                                        <th className="p-4 text-left text-offwhite/60">Status</th>
                                        <th className="p-4 text-right text-offwhite/60">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscribers.map(sub => (
                                        <tr key={sub.id} className="border-b border-white/5">
                                            <td className="p-4 text-white">{sub.email}</td>
                                            <td className="p-4 text-offwhite/80">{sub.date}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs capitalize">
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleUnsubscribe(sub.id)}
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                                    title="Remove Subscriber"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {subscribers.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-dimmed">No subscribers yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </TabsContent>

                    {/* Team Tab */}
                    <TabsContent value="team" className="mt-6">
                        <TeamManager />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;