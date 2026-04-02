import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  Users,
  Clock,
  BookOpen,
  Award,
  PlayCircle,
  FileText,
  Download,
} from 'lucide-react';

export function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = {
    id,
    title: 'Complete AI Prompt Engineering Masterclass',
    description:
      'Master the art of prompt engineering and unlock the full potential of AI tools. Learn advanced techniques to create effective prompts for ChatGPT, Claude, and other AI models.',
    price: 79.99,
    rating: 4.9,
    reviewCount: 342,
    students: 5234,
    duration: '8h 45m',
    level: 'Intermediate',
    instructor: 'Dr. Sarah Johnson',
    instructorTitle: 'AI Research Scientist',
    lastUpdated: 'March 2026',
    language: 'English',
    lectures: 47,
  };

  const features = [
    '47 lectures with lifetime access',
    '8+ hours of on-demand video',
    'Downloadable resources and templates',
    'Certificate of completion',
    'Access on mobile, tablet, and desktop',
    '30-day money-back guarantee',
  ];

  const learningOutcomes = [
    'Understand the fundamentals of prompt engineering',
    'Create effective prompts for various AI models',
    'Master advanced prompting techniques and strategies',
    'Apply prompt engineering in real-world scenarios',
    'Optimize AI outputs for your specific needs',
    'Build a portfolio of reusable prompt templates',
  ];

  const curriculum = [
    {
      section: 'Introduction to Prompt Engineering',
      lectures: 8,
      duration: '1h 15m',
      lessons: [
        { title: 'Welcome to the Course', duration: '5:30', type: 'video' },
        { title: 'What is Prompt Engineering?', duration: '12:45', type: 'video' },
        { title: 'Understanding AI Language Models', duration: '15:20', type: 'video' },
        { title: 'Course Resources', duration: '3:10', type: 'file' },
      ],
    },
    {
      section: 'Fundamental Prompting Techniques',
      lectures: 12,
      duration: '2h 30m',
      lessons: [
        { title: 'Basic Prompt Structure', duration: '18:25', type: 'video' },
        { title: 'Context and Instructions', duration: '22:15', type: 'video' },
        { title: 'Practice Exercise 1', duration: '10:00', type: 'file' },
      ],
    },
    {
      section: 'Advanced Strategies',
      lectures: 15,
      duration: '3h 20m',
      lessons: [
        { title: 'Chain-of-Thought Prompting', duration: '25:40', type: 'video' },
        { title: 'Few-Shot Learning', duration: '28:15', type: 'video' },
        { title: 'Role-Based Prompting', duration: '20:30', type: 'video' },
      ],
    },
    {
      section: 'Real-World Applications',
      lectures: 12,
      duration: '1h 40m',
      lessons: [
        { title: 'Content Creation', duration: '15:25', type: 'video' },
        { title: 'Code Generation', duration: '18:50', type: 'video' },
        { title: 'Final Project', duration: '30:00', type: 'file' },
      ],
    },
  ];

  const reviews = [
    {
      id: '1',
      author: 'Michael Chen',
      rating: 5,
      date: 'March 22, 2026',
      comment:
        'This course is absolutely fantastic! Dr. Johnson explains complex concepts in a clear and practical way. I\'ve already applied what I learned to improve my workflow significantly.',
    },
    {
      id: '2',
      author: 'Lisa Anderson',
      rating: 5,
      date: 'March 19, 2026',
      comment:
        'Best course on prompt engineering I\'ve taken. The examples are practical and the exercises really help cement the concepts. Highly recommended!',
    },
    {
      id: '3',
      author: 'David Martinez',
      rating: 4,
      date: 'March 16, 2026',
      comment:
        'Excellent content and well-structured. Would have loved more industry-specific examples, but overall a great investment.',
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 14 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {course.level}
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground">Best Seller</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

              <div className="flex items-center gap-6 mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Created by <span className="font-medium text-foreground">{course.instructor}</span>
                </span>
                <span>•</span>
                <span>Updated {course.lastUpdated}</span>
                <span>•</span>
                <span>{course.language}</span>
              </div>
            </div>

            {/* Right: Purchase Card */}
            <Card className="lg:w-96 p-6 border-border h-fit">
              <div className="text-4xl font-bold mb-6">${course.price}</div>

              <div className="space-y-3 mb-6">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button className="w-full" variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h3 className="font-semibold mb-3">This course includes:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 mt-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Welcome to the most comprehensive course on AI prompt engineering available online.
                  This course is designed to take you from beginner to expert in crafting effective
                  prompts for AI language models.
                </p>
                <p>
                  Throughout this course, you'll learn the fundamental principles of prompt
                  engineering, discover advanced techniques used by professionals, and gain hands-on
                  experience through practical exercises and real-world projects.
                </p>
                <p>
                  Whether you're a content creator, developer, marketer, or business professional,
                  this course will equip you with the skills to leverage AI tools effectively and
                  achieve better results in less time.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Basic understanding of AI and language models (helpful but not required)</li>
                <li>Access to ChatGPT, Claude, or similar AI tool</li>
                <li>Willingness to practice and experiment</li>
                <li>No programming experience required</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Course Content</h2>
              <p className="text-muted-foreground">
                {curriculum.length} sections • {course.lectures} lectures • {course.duration} total
                length
              </p>
            </div>

            {curriculum.map((section, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-4 bg-muted flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5" />
                    <div>
                      <h3 className="font-semibold">{section.section}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section.lectures} lectures • {section.duration}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.type === 'video' ? (
                          <PlayCircle className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className="text-sm">{lesson.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-1">{course.instructor}</h2>
                  <p className="text-muted-foreground mb-4">{course.instructorTitle}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">Instructor Rating</span>
                      </div>
                      <div className="font-semibold">4.9</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Award className="h-4 w-4" />
                        <span className="text-sm">Reviews</span>
                      </div>
                      <div className="font-semibold">1,234</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Students</span>
                      </div>
                      <div className="font-semibold">12,450</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Courses</span>
                      </div>
                      <div className="font-semibold">5</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Dr. Sarah Johnson is an AI research scientist with over 10 years of experience
                      in natural language processing and machine learning. She holds a Ph.D. in
                      Computer Science from MIT and has published numerous papers on AI and language
                      models.
                    </p>
                    <p>
                      Her passion for making AI accessible to everyone led her to create this
                      comprehensive course on prompt engineering. She has trained thousands of
                      professionals and helped them leverage AI tools to enhance their productivity
                      and creativity.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Rating Summary */}
                <div className="md:w-64">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold mb-2">{course.rating}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.reviewCount} reviews
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    {ratingDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-2">
                        <div className="text-sm w-12">{dist.stars} star</div>
                        <Progress value={dist.percentage} className="flex-1" />
                        <div className="text-sm text-muted-foreground w-12 text-right">
                          {dist.percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="flex-1 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.author}</div>
                          <div className="flex gap-1 mt-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-secondary text-secondary"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
