import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import {
  BookOpen,
  Clock,
  PlayCircle,
  Trophy,
  Flame,
  Target,
  Search,
  Wand2,
  Scroll,
  Star,
  CheckCircle2,
  ArrowRight,
  CalendarDays,
  BarChart3,
} from 'lucide-react';

interface PurchasedCourse {
  id: string;
  title: string;
  instructor: string;
  imageUrl: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  lastAccessed: string;
  currentLesson: string;
  category: string;
}

export function MyLearningPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const purchasedCourses: PurchasedCourse[] = [
    {
      id: '1',
      title: 'Master ChatGPT Prompt Engineering',
      instructor: 'Sarah Johnson',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      progress: 68,
      totalLessons: 47,
      completedLessons: 32,
      duration: '8h 30m',
      lastAccessed: '2 hours ago',
      currentLesson: 'Chain-of-Thought Prompting',
      category: 'ChatGPT',
    },
    {
      id: '2',
      title: 'Advanced Prompt Patterns & Frameworks',
      instructor: 'Michael Chen',
      imageUrl: 'https://images.unsplash.com/photo-1770368787729-6a42187b668c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjB3b3Jrc3BhY2UlMjBsZWFybmluZ3xlbnwxfHx8fDE3NzUxOTk3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 35,
      totalLessons: 52,
      completedLessons: 18,
      duration: '12h 15m',
      lastAccessed: '1 day ago',
      currentLesson: 'Few-Shot Learning Patterns',
      category: 'Advanced',
    },
    {
      id: '3',
      title: 'Midjourney Prompting: From Beginner to Pro',
      instructor: 'Emma Davis',
      imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=400&fit=crop',
      progress: 92,
      totalLessons: 38,
      completedLessons: 35,
      duration: '10h 45m',
      lastAccessed: '3 days ago',
      currentLesson: 'Building a Style Library',
      category: 'Image Gen',
    },
    {
      id: '4',
      title: 'Prompting for Developers: Code Generation',
      instructor: 'David Park',
      imageUrl: 'https://images.unsplash.com/photo-1509701852059-c221a6f1e878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMHR1dG9yaWFsfGVufDF8fHx8MTc3NTEwMDM4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 12,
      totalLessons: 60,
      completedLessons: 7,
      duration: '15h 20m',
      lastAccessed: '5 days ago',
      currentLesson: 'Setting Up Your Environment',
      category: 'Development',
    },
    {
      id: '5',
      title: 'Prompting for Marketing & Content Creation',
      instructor: 'Robert Taylor',
      imageUrl: 'https://images.unsplash.com/photo-1558259299-5d46c4408730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBkZXNrJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3NTE5OTcxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      progress: 100,
      totalLessons: 36,
      completedLessons: 36,
      duration: '9h 45m',
      lastAccessed: '1 week ago',
      currentLesson: 'Course Complete!',
      category: 'Marketing',
    },
  ];

  const stats = {
    totalCourses: purchasedCourses.length,
    completedCourses: purchasedCourses.filter((c) => c.progress === 100).length,
    totalHoursLearned: 28,
    currentStreak: 7,
    totalLessonsCompleted: purchasedCourses.reduce((sum, c) => sum + c.completedLessons, 0),
    certificates: 1,
  };

  const inProgressCourses = purchasedCourses.filter((c) => c.progress > 0 && c.progress < 100);
  const completedCourses = purchasedCourses.filter((c) => c.progress === 100);
  const notStartedCourses = purchasedCourses.filter((c) => c.progress === 0);

  const filteredCourses = (courses: PurchasedCourse[]) =>
    courses.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const continueLearnCourse = inProgressCourses.sort((a, b) => b.progress - a.progress)[0] || purchasedCourses[0];

  return (
    <div className="min-h-screen">
      {/* Hero / Welcome Section */}
      <div className="border-b bg-gradient-to-br from-primary/5 via-card to-secondary/5">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold">My Study Space</h1>
              </div>
              <p className="text-muted-foreground mb-6">
                Welcome back, Wizard! Continue your learning journey and master the art of prompting.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Flame className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.currentStreak}</p>
                      <p className="text-xs text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalHoursLearned}h</p>
                      <p className="text-xs text-muted-foreground">Hours Learned</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalLessonsCompleted}</p>
                      <p className="text-xs text-muted-foreground">Lessons Done</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.certificates}</p>
                      <p className="text-xs text-muted-foreground">Certificates</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Continue Learning Card */}
            {continueLearnCourse && continueLearnCourse.progress < 100 && (
              <Card className="lg:w-[420px] overflow-hidden border-primary/20 bg-card shadow-lg">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={continueLearnCourse.imageUrl}
                    alt={continueLearnCourse.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <Badge className="bg-primary text-primary-foreground mb-2">Continue Learning</Badge>
                    <h3 className="text-white font-semibold line-clamp-1">{continueLearnCourse.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Scroll className="h-4 w-4" />
                    <span className="line-clamp-1">Next: {continueLearnCourse.currentLesson}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Progress value={continueLearnCourse.progress} className="flex-1" />
                    <span className="text-sm font-semibold text-primary">{continueLearnCourse.progress}%</span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/my-learning/${continueLearnCourse.id}`)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Resume Learning
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Course Library */}
      <div className="container mx-auto px-4 py-8">
        {/* Search + Filter */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All Courses ({purchasedCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress">
            <CourseGrid courses={filteredCourses(inProgressCourses)} navigate={navigate} />
          </TabsContent>

          <TabsContent value="completed">
            {filteredCourses(completedCourses).length === 0 ? (
              <EmptyState
                icon={<Trophy className="h-12 w-12 text-muted-foreground/50" />}
                title="No completed courses yet"
                description="Keep learning and you'll earn your first certificate soon!"
              />
            ) : (
              <CourseGrid courses={filteredCourses(completedCourses)} navigate={navigate} />
            )}
          </TabsContent>

          <TabsContent value="all">
            <CourseGrid courses={filteredCourses(purchasedCourses)} navigate={navigate} />
          </TabsContent>
        </Tabs>

        {/* Weekly Activity */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Weekly Activity
          </h2>
          <Card className="p-6">
            <div className="flex items-end gap-3 h-40">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [60, 85, 45, 100, 70, 30, 50];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/60 transition-all duration-300 hover:from-secondary hover:to-secondary/60"
                      style={{ height: `${heights[i]}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Explore More */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
            <Wand2 className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Ready to learn more spells?</h3>
            <p className="text-muted-foreground mb-4">
              Explore our full catalog of prompting courses and level up your wizard skills.
            </p>
            <Button onClick={() => navigate('/courses')} className="bg-primary hover:bg-primary/90">
              Browse Courses
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CourseGrid({
  courses,
  navigate,
}: {
  courses: PurchasedCourse[];
  navigate: (path: string) => void;
}) {
  if (courses.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-12 w-12 text-muted-foreground/50" />}
        title="No courses found"
        description="Try adjusting your search query."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate(`/my-learning/${course.id}`)}
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden bg-muted">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {course.progress === 100 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">Completed!</span>
                </div>
              </div>
            )}
            <Badge className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground border">
              {course.category}
            </Badge>
          </div>

          <div className="p-5">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className={`font-semibold ${course.progress === 100 ? 'text-green-500' : 'text-primary'}`}>
                  {course.progress}%
                </span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{course.lastAccessed}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Action */}
            <Button
              className="w-full mt-4"
              variant={course.progress === 100 ? 'outline' : 'default'}
              size="sm"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
