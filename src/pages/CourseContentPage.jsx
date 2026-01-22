import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    ArrowLeft, CheckCircle, Circle, Lock, ChevronDown, ChevronRight,
    Play, FileText, File, Clock, Award
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/courseService';
import { courseContentService } from '@/services/courseContentService';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import PDFViewer from '@/components/PDFViewer';
import DocumentViewer from '@/components/DocumentViewer';

const CourseContentPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { toast } = useToast();

    const [course, setCourse] = useState(null);
    const [content, setContent] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [currentModule, setCurrentModule] = useState(null);
    const [progress, setProgress] = useState({ completedLessons: [], currentLesson: null });
    const [expandedModules, setExpandedModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        // Load course
        const courseData = courseService.getCourseBySlug(slug);
        if (!courseData) {
            toast({ title: "Course not found", variant: "destructive" });
            navigate('/courses');
            return;
        }

        // Check if user is enrolled
        const isEnrolled = courseService.isUserRegistered(courseData.id, user.email);
        if (!isEnrolled) {
            toast({ title: "Access Denied", description: "Please enroll in this course first", variant: "destructive" });
            navigate(`/courses/${slug}`);
            return;
        }

        setCourse(courseData);

        // Load content
        const courseContent = courseContentService.getCourseContent(courseData.id, user.email);
        if (!courseContent) {
            toast({ title: "Content not available", description: "Course content is being prepared", variant: "destructive" });
            return;
        }

        setContent(courseContent);

        // Load progress
        const userProgress = courseContentService.getUserProgress(courseData.id, user.email);
        setProgress(userProgress);

        // Set current lesson (either from progress or first lesson)
        if (userProgress.currentLesson) {
            loadLessonById(userProgress.currentLesson, courseContent);
        } else if (courseContent.modules.length > 0 && courseContent.modules[0].lessons.length > 0) {
            const firstLesson = courseContent.modules[0].lessons[0];
            setCurrentModule(courseContent.modules[0]);
            setCurrentLesson(firstLesson);
            setExpandedModules([courseContent.modules[0].id]);
        }

        setLoading(false);
    }, [slug, user]);

    const loadLessonById = (lessonId, courseContent) => {
        for (const module of courseContent.modules) {
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) {
                setCurrentModule(module);
                setCurrentLesson(lesson);
                if (!expandedModules.includes(module.id)) {
                    setExpandedModules([...expandedModules, module.id]);
                }
                break;
            }
        }
    };

    const handleLessonClick = (module, lesson) => {
        setCurrentModule(module);
        setCurrentLesson(lesson);
        courseContentService.setCurrentLesson(course.id, user.email, lesson.id);

        // Update progress state
        const updatedProgress = courseContentService.getUserProgress(course.id, user.email);
        setProgress(updatedProgress);
    };

    const handleMarkComplete = () => {
        if (!currentLesson) return;

        courseContentService.markLessonComplete(course.id, user.email, currentLesson.id);
        const updatedProgress = courseContentService.getUserProgress(course.id, user.email);
        setProgress(updatedProgress);

        toast({ title: "Lesson marked as complete!" });

        // Auto-advance to next lesson
        advanceToNextLesson();
    };

    const advanceToNextLesson = () => {
        if (!content || !currentModule || !currentLesson) return;

        const moduleIndex = content.modules.findIndex(m => m.id === currentModule.id);
        const lessonIndex = currentModule.lessons.findIndex(l => l.id === currentLesson.id);

        // Next lesson in current module
        if (lessonIndex < currentModule.lessons.length - 1) {
            const nextLesson = currentModule.lessons[lessonIndex + 1];
            handleLessonClick(currentModule, nextLesson);
        }
        // First lesson of next module
        else if (moduleIndex < content.modules.length - 1) {
            const nextModule = content.modules[moduleIndex + 1];
            if (nextModule.lessons.length > 0) {
                handleLessonClick(nextModule, nextModule.lessons[0]);
                if (!expandedModules.includes(nextModule.id)) {
                    setExpandedModules([...expandedModules, nextModule.id]);
                }
            }
        }
    };

    const toggleModule = (moduleId) => {
        if (expandedModules.includes(moduleId)) {
            setExpandedModules(expandedModules.filter(id => id !== moduleId));
        } else {
            setExpandedModules([...expandedModules, moduleId]);
        }
    };

    const isLessonCompleted = (lessonId) => {
        return progress.completedLessons.includes(lessonId);
    };

    const getLessonIcon = (type) => {
        switch (type) {
            case 'video':
                return <Play size={16} />;
            case 'pdf':
                return <FileText size={16} />;
            case 'doc':
            case 'ppt':
                return <File size={16} />;
            default:
                return <File size={16} />;
        }
    };

    const renderContent = () => {
        if (!currentLesson) {
            return (
                <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                        <Award className="text-gold mx-auto mb-4" size={64} />
                        <p className="text-offwhite text-lg">Select a lesson to start learning</p>
                    </div>
                </div>
            );
        }

        const { type, content: lessonContent } = currentLesson;

        switch (type) {
            case 'video':
                return <VideoPlayer url={lessonContent.url} title={currentLesson.title} />;
            case 'pdf':
                return <PDFViewer url={lessonContent.url} title={currentLesson.title} />;
            case 'doc':
            case 'ppt':
                return <DocumentViewer url={lessonContent.url} title={currentLesson.title} type={type} />;
            default:
                return <div className="text-dimmed">Unsupported content type</div>;
        }
    };

    const progressPercentage = courseContentService.calculateProgress(course?.id, user?.email);

    if (loading) {
        return <div className="min-h-screen bg-navy flex items-center justify-center text-offwhite">Loading...</div>;
    }

    if (!course || !content) {
        return null;
    }

    return (
        <>
            <Helmet>
                <title>{course.title} - Learn | SustainSutra</title>
            </Helmet>

            <div className="min-h-screen bg-navy pt-20">
                {/* Header */}
                <div className="border-b border-white/10 bg-navy/95 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link to={`/courses/${slug}`} className="text-gold hover:underline flex items-center gap-2">
                                    <ArrowLeft size={20} />
                                    Back to Course
                                </Link>
                                <h1 className="text-xl font-playfair text-offwhite">{course.title}</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-dimmed">
                                    Progress: <span className="text-gold font-medium">{progressPercentage}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex h-[calc(100vh-140px)]">
                    {/* Sidebar - Course Navigation */}
                    <div className="w-80 border-r border-white/10 bg-navy/50 overflow-y-auto">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-offwhite mb-4">Course Content</h3>

                            {content.modules.map((module, moduleIndex) => (
                                <div key={module.id} className="mb-2">
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-2">
                                            {expandedModules.includes(module.id) ? (
                                                <ChevronDown size={20} className="text-gold" />
                                            ) : (
                                                <ChevronRight size={20} className="text-dimmed" />
                                            )}
                                            <span className="text-offwhite font-medium text-sm">
                                                {moduleIndex + 1}. {module.title}
                                            </span>
                                        </div>
                                    </button>

                                    {expandedModules.includes(module.id) && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {module.lessons.map((lesson, lessonIndex) => {
                                                const isCompleted = isLessonCompleted(lesson.id);
                                                const isCurrent = currentLesson?.id === lesson.id;

                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => handleLessonClick(module, lesson)}
                                                        className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${isCurrent ? 'bg-gold/10 border border-gold/30' : 'hover:bg-white/5'
                                                            }`}
                                                    >
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            {isCompleted ? (
                                                                <CheckCircle size={18} className="text-green-400" />
                                                            ) : (
                                                                <Circle size={18} className="text-dimmed" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gold">{getLessonIcon(lesson.type)}</span>
                                                                <span className={`text-sm ${isCurrent ? 'text-gold font-medium' : 'text-offwhite'}`}>
                                                                    {lesson.title}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1 text-xs text-dimmed">
                                                                <Clock size={12} />
                                                                {lesson.duration}
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-8">
                            {currentLesson && (
                                <div className="mb-6">
                                    <h2 className="text-3xl font-playfair text-offwhite mb-2">
                                        {currentLesson.title}
                                    </h2>
                                    {currentLesson.content.description && (
                                        <p className="text-dimmed">{currentLesson.content.description}</p>
                                    )}
                                </div>
                            )}

                            {renderContent()}

                            {currentLesson && (
                                <div className="mt-8 flex items-center justify-between">
                                    <Button
                                        onClick={handleMarkComplete}
                                        disabled={isLessonCompleted(currentLesson.id)}
                                        className="bg-gradient-sage-forest text-offwhite hover:opacity-90"
                                    >
                                        {isLessonCompleted(currentLesson.id) ? (
                                            <>
                                                <CheckCircle size={16} className="mr-2" />
                                                Completed
                                            </>
                                        ) : (
                                            'Mark as Complete'
                                        )}
                                    </Button>

                                    <Button
                                        onClick={advanceToNextLesson}
                                        variant="outline"
                                        className="text-gold border-gold/30 hover:bg-gold/10"
                                    >
                                        Next Lesson →
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseContentPage;
