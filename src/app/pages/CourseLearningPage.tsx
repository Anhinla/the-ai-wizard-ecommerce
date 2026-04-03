import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Textarea } from '../components/ui/textarea';
import {
  PlayCircle,
  Pause,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Clock,
  Lock,
  Download,
  MessageSquare,
  StickyNote,
  Trophy,
  ArrowLeft,
  Wand2,
  Scroll,
  Save,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize2,
  Settings,
  Circle,
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'file' | 'quiz';
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export function CourseLearningPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const courseData = {
    id,
    title: 'Master ChatGPT Prompt Engineering',
    instructor: 'Sarah Johnson',
    progress: 68,
    totalLessons: 47,
    completedLessons: 32,
  };

  const sections: Section[] = [
    {
      id: 's1',
      title: 'Introduction to Prompt Engineering',
      lessons: [
        { id: 'l1', title: 'Welcome to the Course', duration: '5:30', type: 'video', completed: true, locked: false },
        { id: 'l2', title: 'What is Prompt Engineering?', duration: '12:45', type: 'video', completed: true, locked: false },
        { id: 'l3', title: 'Understanding AI Language Models', duration: '15:20', type: 'video', completed: true, locked: false },
        { id: 'l4', title: 'Course Resources & Setup', duration: '3:10', type: 'file', completed: true, locked: false },
        { id: 'l5', title: 'Your First Prompt Exercise', duration: '8:00', type: 'quiz', completed: true, locked: false },
      ],
    },
    {
      id: 's2',
      title: 'Fundamental Prompting Techniques',
      lessons: [
        { id: 'l6', title: 'Basic Prompt Structure', duration: '18:25', type: 'video', completed: true, locked: false },
        { id: 'l7', title: 'Context and Instructions', duration: '22:15', type: 'video', completed: true, locked: false },
        { id: 'l8', title: 'Specificity and Constraints', duration: '16:40', type: 'video', completed: true, locked: false },
        { id: 'l9', title: 'Output Formatting Tricks', duration: '14:50', type: 'video', completed: true, locked: false },
        { id: 'l10', title: 'Practice Exercise: Fundamentals', duration: '10:00', type: 'file', completed: true, locked: false },
      ],
    },
    {
      id: 's3',
      title: 'Advanced Strategies',
      lessons: [
        { id: 'l11', title: 'Chain-of-Thought Prompting', duration: '25:40', type: 'video', completed: true, locked: false },
        { id: 'l12', title: 'Few-Shot Learning', duration: '28:15', type: 'video', completed: true, locked: false },
        { id: 'l13', title: 'Role-Based Prompting', duration: '20:30', type: 'video', completed: false, locked: false },
        { id: 'l14', title: 'System Prompt Design', duration: '24:10', type: 'video', completed: false, locked: false },
        { id: 'l15', title: 'Prompt Chaining Techniques', duration: '19:45', type: 'video', completed: false, locked: false },
        { id: 'l16', title: 'Advanced Exercise', duration: '15:00', type: 'quiz', completed: false, locked: false },
      ],
    },
    {
      id: 's4',
      title: 'Real-World Applications',
      lessons: [
        { id: 'l17', title: 'Content Creation Prompts', duration: '15:25', type: 'video', completed: false, locked: false },
        { id: 'l18', title: 'Code Generation Prompts', duration: '18:50', type: 'video', completed: false, locked: false },
        { id: 'l19', title: 'Data Analysis Prompts', duration: '16:30', type: 'video', completed: false, locked: false },
        { id: 'l20', title: 'Marketing & Copywriting', duration: '14:15', type: 'video', completed: false, locked: false },
        { id: 'l21', title: 'Final Project', duration: '30:00', type: 'file', completed: false, locked: false },
      ],
    },
    {
      id: 's5',
      title: 'Mastery & Certification',
      lessons: [
        { id: 'l22', title: 'Building Your Prompt Library', duration: '12:20', type: 'video', completed: false, locked: true },
        { id: 'l23', title: 'Prompt Testing & Iteration', duration: '18:00', type: 'video', completed: false, locked: true },
        { id: 'l24', title: 'Final Assessment', duration: '20:00', type: 'quiz', completed: false, locked: true },
        { id: 'l25', title: 'Certificate & Next Steps', duration: '5:00', type: 'video', completed: false, locked: true },
      ],
    },
  ];

  const allLessons = sections.flatMap((s) => s.lessons);
  const [currentLessonId, setCurrentLessonId] = useState('l13');
  const currentLesson = allLessons.find((l) => l.id === currentLessonId)!;
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  const currentSection = sections.find((s) => s.lessons.some((l) => l.id === currentLessonId))!;

  const [sidebarTab, setSidebarTab] = useState<'lessons' | 'notes' | 'resources'>('lessons');
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState<{ id: string; lessonId: string; text: string; timestamp: string }[]>([
    { id: 'n1', lessonId: 'l11', text: 'Chain-of-thought prompting works best with complex reasoning tasks. Remember to use "Let\'s think step by step" as a trigger.', timestamp: '12:30' },
    { id: 'n2', lessonId: 'l12', text: 'Few-shot examples should be diverse and representative. 3-5 examples usually gives best results.', timestamp: '08:15' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(sections.map((s) => s.id));
  const [lessonStates, setLessonStates] = useState<Record<string, boolean>>(
    Object.fromEntries(allLessons.map((l) => [l.id, l.completed]))
  );
  const [showSidebar, setShowSidebar] = useState(true);

  const completedCount = Object.values(lessonStates).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const markComplete = () => {
    setLessonStates((prev) => ({ ...prev, [currentLessonId]: true }));
    // Auto-advance to next lesson
    if (currentLessonIndex < allLessons.length - 1) {
      const next = allLessons[currentLessonIndex + 1];
      if (!next.locked) {
        setCurrentLessonId(next.id);
      }
    }
  };

  const goToPrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonId(allLessons[currentLessonIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      const next = allLessons[currentLessonIndex + 1];
      if (!next.locked) setCurrentLessonId(next.id);
    }
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      ...prev,
      { id: `n${Date.now()}`, lessonId: currentLessonId, text: newNote, timestamp: '15:42' },
    ]);
    setNewNote('');
  };

  const getLessonIcon = (lesson: Lesson, isCompleted: boolean) => {
    if (lesson.locked) return <Lock className="h-4 w-4 text-muted-foreground/50" />;
    if (isCompleted) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (lesson.id === currentLessonId) return <PlayCircle className="h-4 w-4 text-primary" />;
    if (lesson.type === 'quiz') return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    if (lesson.type === 'file') return <FileText className="h-4 w-4 text-muted-foreground" />;
    return <Circle className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/my-learning')}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">My Learning</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm line-clamp-1 max-w-[300px]">{courseData.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Progress value={progressPercent} className="w-32 h-2" />
              <span className="text-sm text-muted-foreground">{progressPercent}%</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <BookOpen className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Video / Lesson Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="relative bg-black aspect-video max-h-[calc(100vh-280px)]">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Simulated Video Player UI */}
              <div className="text-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 cursor-pointer hover:bg-primary transition-colors mx-auto mb-4"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <PlayCircle className="h-10 w-10 text-white" />
                  )}
                </div>
                <h3 className="text-white text-lg font-semibold mb-1">{currentLesson.title}</h3>
                <p className="text-white/60 text-sm">{currentSection.title}</p>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group">
                <div className="h-full w-[42%] bg-primary rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-primary transition-colors">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                  </button>
                  <button onClick={goToPrevious} className="text-white hover:text-primary transition-colors">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button onClick={goToNext} className="text-white hover:text-primary transition-colors">
                    <SkipForward className="h-4 w-4" />
                  </button>
                  <button className="text-white hover:text-primary transition-colors">
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <span className="text-white/70 text-xs">10:42 / {currentLesson.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white hover:text-primary transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="text-white hover:text-primary transition-colors">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Below Video */}
          <div className="p-6 border-t">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    {currentSection.title}
                  </Badge>
                  {currentLesson.type === 'quiz' && (
                    <Badge className="bg-secondary text-secondary-foreground text-xs">Quiz</Badge>
                  )}
                </div>
                <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Lesson {currentLessonIndex + 1} of {allLessons.length} &bull; {currentLesson.duration}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentLessonIndex === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                {!lessonStates[currentLessonId] ? (
                  <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={markComplete}>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Mark Complete
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={goToNext} disabled={currentLessonIndex === allLessons.length - 1}>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>

            {/* Lesson Tabs */}
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="notes">My Notes</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">About This Lesson</h3>
                  <p className="text-muted-foreground mb-4">
                    In this lesson, you'll learn about {currentLesson.title.toLowerCase()}. This technique is essential
                    for crafting effective AI prompts that produce consistent, high-quality outputs. We'll cover practical
                    examples and hands-on exercises.
                  </p>
                  <h4 className="font-semibold mb-2">Key Takeaways</h4>
                  <ul className="space-y-2">
                    {[
                      'Understand the core principles behind this prompting technique',
                      'Apply the technique to real-world scenarios',
                      'Combine with other methods for powerful prompt chains',
                      'Practice with guided exercises and templates',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <StickyNote className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold">Your Notes</h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <Textarea
                      placeholder="Write a note about this lesson..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button size="sm" onClick={addNote} disabled={!newNote.trim()}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Note
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  {notes.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No notes yet. Start taking notes to remember key insights!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {notes.map((note) => {
                        const noteLessonTitle = allLessons.find((l) => l.id === note.lessonId)?.title || '';
                        return (
                          <div key={note.id} className="p-3 rounded-lg bg-muted/50 border">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Badge variant="outline" className="text-xs">
                                {noteLessonTitle}
                              </Badge>
                              <span className="text-xs text-muted-foreground">@ {note.timestamp}</span>
                            </div>
                            <p className="text-sm">{note.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Prompt Engineering Cheat Sheet.pdf', size: '2.4 MB' },
                      { name: 'Lesson Slides - Role-Based Prompting.pdf', size: '5.1 MB' },
                      { name: 'Prompt Templates Collection.zip', size: '1.8 MB' },
                      { name: 'Exercise Workbook.pdf', size: '3.2 MB' },
                    ].map((resource, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{resource.name}</p>
                            <p className="text-xs text-muted-foreground">{resource.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar - Course Outline */}
        {showSidebar && (
          <div className="w-[380px] border-l bg-card hidden lg:flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-2">Course Content</h3>
              <div className="flex items-center gap-2">
                <Progress value={progressPercent} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {completedCount}/{allLessons.length} lessons
                </span>
              </div>
            </div>

            {/* Lesson List */}
            <ScrollArea className="flex-1">
              <div className="py-2">
                {sections.map((section) => {
                  const sectionCompleted = section.lessons.every((l) => lessonStates[l.id]);
                  const sectionLessonsCompleted = section.lessons.filter((l) => lessonStates[l.id]).length;
                  const isExpanded = expandedSections.includes(section.id);

                  return (
                    <div key={section.id}>
                      {/* Section Header */}
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {sectionCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Scroll className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                          <span className="text-sm font-semibold line-clamp-1">{section.title}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-xs text-muted-foreground">
                            {sectionLessonsCompleted}/{section.lessons.length}
                          </span>
                          <ChevronRight
                            className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </button>

                      {/* Lessons */}
                      {isExpanded && (
                        <div className="pb-2">
                          {section.lessons.map((lesson) => {
                            const isActive = lesson.id === currentLessonId;
                            const isCompleted = lessonStates[lesson.id];

                            return (
                              <button
                                key={lesson.id}
                                className={`w-full flex items-center gap-3 px-6 py-2.5 text-left transition-colors ${
                                  isActive
                                    ? 'bg-primary/10 border-l-2 border-primary'
                                    : lesson.locked
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-muted/50'
                                }`}
                                onClick={() => !lesson.locked && setCurrentLessonId(lesson.id)}
                                disabled={lesson.locked}
                              >
                                {getLessonIcon(lesson, isCompleted)}
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm line-clamp-1 ${
                                      isActive ? 'font-semibold text-primary' : isCompleted ? 'text-muted-foreground' : ''
                                    }`}
                                  >
                                    {lesson.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  {lesson.type === 'video' && <PlayCircle className="h-3 w-3 text-muted-foreground" />}
                                  {lesson.type === 'file' && <FileText className="h-3 w-3 text-muted-foreground" />}
                                  {lesson.type === 'quiz' && <MessageSquare className="h-3 w-3 text-muted-foreground" />}
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Sidebar Footer */}
            <div className="p-4 border-t">
              {progressPercent === 100 ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600">
                  <Trophy className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-semibold">Course Complete!</p>
                    <p className="text-xs">Download your certificate</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 text-primary">
                  <Wand2 className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-semibold">{allLessons.length - completedCount} lessons remaining</p>
                    <p className="text-xs text-muted-foreground">Keep going, wizard!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
