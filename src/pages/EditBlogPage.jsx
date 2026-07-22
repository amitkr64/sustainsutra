import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogService } from '@/services/blogService';
import BlogEditor from '@/components/BlogEditor';
import { useToast } from '@/components/ui/use-toast';

const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await blogService.getBlogById(id);
                if (data) {
                    // Ensure tags is a string for the editor
                    const formattedData = {
                        ...data,
                        tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags
                    };
                    setBlogData(formattedData);
                } else {
                    toast({
                        title: "Error",
                        description: "Blog post not found",
                        variant: "destructive"
                    });
                    navigate('/admin');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                navigate('/admin');
            }
        };
        fetchBlog();
    }, [id, navigate, toast]);

    if (!blogData) return <div className="text-center text-white pt-32">Loading...</div>;

    return (
        <div className="min-h-screen bg-navy pt-24 px-4">
            <Helmet>
                <title>Edit Blog | SustainSutra Admin</title>
            </Helmet>

            <div className="container mx-auto">
                <h1 className="text-3xl font-playfair text-white mb-8">Edit Blog Post</h1>
                <BlogEditor initialData={blogData} isEditing={true} />
            </div>
        </div>
    );
};

export default EditBlogPage;