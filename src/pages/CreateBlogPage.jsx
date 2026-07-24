import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import BlogEditor from '@/components/BlogEditor';

const CreateBlogPage = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-navy pt-12 px-4">
            <Helmet>
                <title>Create New Blog | SustainSutra Admin</title>
            </Helmet>

            <div className="container mx-auto">
                <h1 className="text-3xl font-playfair text-white mb-8">{t('insights.createBlogTitle', 'Create New Blog Post')}</h1>
                <BlogEditor />
            </div>
        </div>
    );
};

export default CreateBlogPage;