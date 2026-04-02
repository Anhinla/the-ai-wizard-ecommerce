import { FilterSidebar } from '../components/FilterSidebar';
import { CourseCard } from '../components/CourseCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const courses = [
    {
      id: '1',
      title: 'Master ChatGPT Prompt Engineering',
      instructor: 'Sarah Johnson',
      description: 'Learn to craft powerful prompts that unlock ChatGPT\'s full potential',
      price: 49.99,
      rating: 4.9,
      reviewCount: 567,
      duration: '8h 30m',
      students: 3421,
      level: 'Beginner',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    },
    {
      id: '2',
      title: 'AI for Business: Complete Guide',
      instructor: 'Michael Chen',
      description: 'Transform your business with practical AI applications and strategies',
      price: 79.99,
      rating: 4.8,
      reviewCount: 423,
      duration: '12h 15m',
      students: 2156,
      level: 'Intermediate',
      imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'Midjourney: From Beginner to Pro',
      instructor: 'Emma Davis',
      description: 'Create stunning AI artwork and learn advanced image generation techniques',
      price: 59.99,
      rating: 4.9,
      reviewCount: 789,
      duration: '10h 45m',
      students: 4532,
      level: 'All Levels',
      imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=400&fit=crop',
    },
    {
      id: '4',
      title: 'Machine Learning Fundamentals',
      instructor: 'David Park',
      description: 'Build a solid foundation in machine learning concepts and applications',
      price: 89.99,
      rating: 4.7,
      reviewCount: 634,
      duration: '15h 20m',
      students: 2987,
      level: 'Beginner',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    },
    {
      id: '5',
      title: 'Natural Language Processing with Python',
      instructor: 'Jessica Lee',
      description: 'Master NLP techniques and build powerful language AI applications',
      price: 94.99,
      rating: 4.8,
      reviewCount: 412,
      duration: '18h 10m',
      students: 1876,
      level: 'Advanced',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    },
    {
      id: '6',
      title: 'AI-Powered Marketing Strategies',
      instructor: 'Robert Taylor',
      description: 'Leverage AI tools to create data-driven marketing campaigns',
      price: 69.99,
      rating: 4.9,
      reviewCount: 523,
      duration: '9h 45m',
      students: 3245,
      level: 'Intermediate',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    },
    {
      id: '7',
      title: 'Stable Diffusion Masterclass',
      instructor: 'Amy Zhang',
      description: 'Create professional-grade AI images with Stable Diffusion',
      price: 64.99,
      rating: 4.8,
      reviewCount: 391,
      duration: '11h 30m',
      students: 2134,
      level: 'Intermediate',
      imageUrl: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=800&h=400&fit=crop',
    },
    {
      id: '8',
      title: 'AI Ethics and Responsible Development',
      instructor: 'Dr. James Wilson',
      description: 'Understand the ethical implications and best practices in AI development',
      price: 54.99,
      rating: 4.7,
      reviewCount: 278,
      duration: '7h 20m',
      students: 1567,
      level: 'All Levels',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    },
    {
      id: '9',
      title: 'Building AI Chatbots',
      instructor: 'Chris Martinez',
      description: 'Design and deploy intelligent chatbots for business applications',
      price: 74.99,
      rating: 4.8,
      reviewCount: 445,
      duration: '13h 15m',
      students: 2456,
      level: 'Intermediate',
      imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">AI Courses</h1>
          <p className="text-muted-foreground mb-6">
            Learn from industry experts and master AI skills
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          {showFilters && (
            <aside className="hidden md:block flex-shrink-0">
              <FilterSidebar type="courses" />
            </aside>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{courses.length}</span> courses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Courses
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
