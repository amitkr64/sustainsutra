import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogService } from '@/services/blogService';
import { Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const BlogPostPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        const post = blogService.getBySlug(slug);
        if (post) {
            setBlog(post);
            blogService.incrementView(post.id);

            // Get related posts
            const allPosts = blogService.getPublished();
            const related = allPosts
                .filter(p => p.category === post.category && p.id !== post.id)
                .slice(0, 3);
            setRelatedPosts(related);
        }
    }, [slug]);

    if (!blog) return <LoadingSpinner fullScreen />;

    return (
        <div className="min-h-screen bg-navy text-offwhite pt-20">
            <Helmet>
                <title>{blog.title} | SustainSutra Insights</title>
                <meta name="description" content={blog.excerpt} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:image" content={blog.featuredImage} />
            </Helmet>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-2 text-sm text-dimmed">
                    <Link to="/" className="hover:text-gold">Home</Link>
                    <span>/</span>
                    <Link to="/insights" className="hover:text-gold">Insights</Link>
                    <span>/</span>
                    <span className="text-gold truncate max-w-[200px]">{blog.title}</span>
                </div>
            </div>

            {/* Article Header */}
            <article>
                <div className="relative h-[60vh] w-full">
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                        <div className="container mx-auto">
                            <span className="inline-block px-4 py-1 bg-gold text-navy font-bold rounded-full mb-6">
                                {blog.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-playfair text-white mb-6 leading-tight drop-shadow-lg">
                                {blog.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-offwhite/90">
                                <div className="flex items-center gap-2">
                                    <User size={18} className="text-gold" />
                                    <span className="font-medium">{blog.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-gold" />
                                    <span>{blog.publishDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-gold" />
                                    <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-playfair prose-headings:text-gold prose-p:text-offwhite/80 prose-li:text-offwhite/80">
                            {/* Simple Markdown Rendering (Since we can't add new packages like react-markdown) */}
                            {blog.content.split('\n').map((paragraph, idx) => {
                                if (paragraph.startsWith('###')) return <h3 key={idx}>{paragraph.replace('###', '')}</h3>;
                                if (paragraph.startsWith('##')) return <h2 key={idx}>{paragraph.replace('##', '')}</h2>;
                                if (paragraph.startsWith('#')) return <h1 key={idx}>{paragraph.replace('#', '')}</h1>;
                                if (!paragraph.trim()) return <br key={idx} />;
                                return <p key={idx}>{paragraph}</p>;
                            })}
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-4">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-dimmed hover:text-white transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-12 p-8 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-gold/20">
                                <img src={blog.authorImage || "https://ui-avatars.com/api/?name=" + blog.author} alt={blog.author} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-xl font-playfair text-white mb-2">About {blog.author}</h3>
                                <p className="text-dimmed text-sm leading-relaxed">
                                    {blog.authorBio || `Expert contributor at SustainSutra, specializing in ${blog.category} and sustainable business transformation strategies.`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Share */}
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-playfair text-white mb-4 flex items-center gap-2">
                                <Share2 size={20} className="text-gold" /> Share this insight
                            </h3>
                            <div className="flex gap-4">
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-offwhite hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-offwhite hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all"
                                >
                                    <Twitter size={20} />
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-offwhite hover:bg-blue-700 hover:border-blue-700 hover:text-white transition-all"
                                >
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div>
                            <h3 className="text-2xl font-playfair text-white mb-6">Related Insights</h3>
                            <div className="space-y-6">
                                {relatedPosts.map(post => (
                                    <Link to={`/blog/${post.slug}`} key={post.id} className="block group">
                                        <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                                            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <h4 className="font-playfair text-lg text-white group-hover:text-gold transition-colors">
                                            {post.title}
                                        </h4>
                                        <span className="text-xs text-dimmed">{post.publishDate}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPostPage;