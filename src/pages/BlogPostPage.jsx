import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useSpring } from 'framer-motion';
import { blogService } from '@/services/blogService';
import { Calendar, User, Clock, Share2, Linkedin, Twitter, Facebook, ArrowLeft, Bookmark, Sparkles, ChevronRight } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const BlogPostPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const contentRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchBlogData = async () => {
            const post = await blogService.getBySlug(slug);
            if (post) {
                setBlog(post);
                blogService.incrementView(post.id);

                const allPosts = await blogService.getPublished();
                const related = (allPosts || [])
                    .filter(p => p.category === post.category && p.id !== post.id)
                    .slice(0, 3);
                setRelatedPosts(related);

                // Scroll to top on slug change
                window.scrollTo(0, 0);
            }
        };
        fetchBlogData();
    }, [slug]);

    if (!blog) return <LoadingSpinner fullScreen />;

    return (
        <div className="min-h-screen bg-[#0A0F14] text-offwhite selection:bg-gold/30">
            <Helmet>
                <title>{blog.title} | SustainSutra Insights</title>
                <meta name="description" content={blog.excerpt} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:image" content={blog.featuredImage} />
            </Helmet>

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gold z-[100] origin-left shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                style={{ scaleX }}
            />

            {/* Premium Hero */}
            <header className="relative w-full h-[85vh] overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/40 to-[#0A0F14]" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col justify-end pb-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-5 py-2 bg-gold text-navy text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
                                    {blog.category}
                                </span>
                                <div className="w-12 h-px bg-white/20" />
                                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {Math.ceil(blog.content.length / 1000)} min read
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-playfair text-white mb-10 leading-[1.1] drop-shadow-2xl">
                                {blog.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 text-offwhite/70">
                                <div className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                                        <img src={blog.authorImage || `https://ui-avatars.com/api/?name=${blog.author}`} alt={blog.author} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-bold text-white group-hover:text-gold transition-colors">{blog.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-gold/50" />
                                    <span className="text-xs uppercase tracking-widest font-black">{blog.publishDate}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Back Navigation */}
            <div className="sticky top-20 z-40 bg-[#0A0F14]/80 backdrop-blur-xl border-y border-white/5 h-16 flex items-center">
                <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
                    <Link to="/insights" className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors font-black text-[10px] uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="text-offwhite/40 hover:text-gold transition-colors">
                            <Bookmark size={18} />
                        </button>
                        <button className="text-offwhite/40 hover:text-gold transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-4 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <main ref={contentRef} className="lg:col-span-8">
                        <div className="prose prose-invert prose-2xl max-w-none 
                            prose-headings:font-playfair prose-headings:text-white prose-headings:mb-10 prose-headings:mt-16
                            prose-p:text-dimmed prose-p:leading-[1.8] prose-p:mb-8
                            prose-strong:text-gold prose-strong:font-black
                            prose-blockquote:border-l-gold prose-blockquote:bg-gold/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-white
                            prose-li:text-dimmed prose-li:mb-2
                            selection:bg-gold/30"
                        >
                            {blog.content.split('\n').map((paragraph, idx) => {
                                if (paragraph.startsWith('###')) return <h3 key={idx}>{paragraph.replace('###', '')}</h3>;
                                if (paragraph.startsWith('##')) return <h2 key={idx} className="border-b border-white/5 pb-4">{paragraph.replace('##', '')}</h2>;
                                if (paragraph.startsWith('#')) return <h1 key={idx}>{paragraph.replace('#', '')}</h1>;
                                if (paragraph.startsWith('>')) return <blockquote key={idx}>{paragraph.replace('>', '')}</blockquote>;
                                if (!paragraph.trim()) return <div key={idx} className="h-4" />;
                                return <p key={idx}>{paragraph}</p>;
                            })}
                        </div>

                        {/* Metadata & Author */}
                        <footer className="mt-20 pt-16 border-t border-white/5">
                            <div className="flex flex-wrap gap-3 mb-12">
                                {blog.tags.map((tag, i) => (
                                    <span key={i} className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-dimmed hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="p-10 glassmorphism rounded-[32px] border border-gold/10 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-32 h-32 rounded-[24px] overflow-hidden shrink-0 border-2 border-gold/20 shadow-2xl">
                                    <img src={blog.authorImage || `https://ui-avatars.com/api/?name=${blog.author}`} alt={blog.author} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-center md:text-left">
                                    <span className="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Executive Author</span>
                                    <h3 className="text-3xl font-playfair text-white mb-4">{blog.author}</h3>
                                    <p className="text-dimmed leading-relaxed max-w-xl">
                                        {blog.authorBio || `A leading authority on ${blog.category}, dedicated to engineering resilient net-zero pathways for global enterprises.`}
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </main>

                    {/* Premium Sidebar */}
                    <aside className="lg:col-span-4 space-y-16">
                        {/* Share & Social */}
                        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                            <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <Share2 size={16} /> Amplify Knowledge
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <a href="#" className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-[#0077b5] transition-all group">
                                    <Linkedin size={24} className="text-dimmed group-hover:text-white" />
                                    <span className="text-[10px] font-bold text-dimmed group-hover:text-white">LinkedIn</span>
                                </a>
                                <a href="#" className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-[#1DA1F2] transition-all group">
                                    <Twitter size={24} className="text-dimmed group-hover:text-white" />
                                    <span className="text-[10px] font-bold text-dimmed group-hover:text-white">Twitter</span>
                                </a>
                                <a href="#" className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl hover:bg-[#1877F2] transition-all group">
                                    <Facebook size={24} className="text-dimmed group-hover:text-white" />
                                    <span className="text-[10px] font-bold text-dimmed group-hover:text-white">Facebook</span>
                                </a>
                            </div>
                        </div>

                        {/* Recommended Reading */}
                        <div>
                            <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <Sparkles size={16} /> Recommended Insights
                            </h3>
                            <div className="space-y-8">
                                {relatedPosts.map(post => (
                                    <Link to={`/blog/${post.slug}`} key={post.id} className="group block">
                                        <div className="flex gap-6">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                                                <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-playfair text-lg text-white group-hover:text-gold transition-colors leading-tight mb-2">
                                                    {post.title}
                                                </h4>
                                                <span className="text-[10px] font-black text-dimmed uppercase tracking-widest">{post.publishDate}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Consultation CTA */}
                        <div className="relative p-10 bg-gold rounded-[40px] overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform">
                                <Sparkles size={120} className="text-navy" />
                            </div>
                            <h3 className="text-3xl font-playfair text-navy font-bold mb-6 relative z-10">Strategic Guidance</h3>
                            <p className="text-navy/80 mb-8 font-medium relative z-10">
                                Need institutional expertise to navigate these challenges? Let's discuss your transformation.
                            </p>
                            <Link to="/book-appointment" className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-navy transition-all relative z-10">
                                Book Session <ChevronRight size={18} />
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;