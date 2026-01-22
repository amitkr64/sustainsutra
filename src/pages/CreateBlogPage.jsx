import React from 'react';
import { Helmet } from 'react-helmet';
import BlogEditor from '@/components/BlogEditor';

const CreateBlogPage = () => {
    return (
        <div className="min-h-screen bg-navy pt-24 px-4">
            <Helmet>
                <title>Create New Blog | SustainSutra Admin</title>
            </Helmet>

            <div className="container mx-auto">
                <h1 className="text-3xl font-playfair text-white mb-8">Create New Blog Post</h1>
                <BlogEditor />
            </div>
        </div>
    );
};

export default CreateBlogPage;