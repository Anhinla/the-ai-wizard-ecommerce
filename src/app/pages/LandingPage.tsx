import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { PromptCard } from "../components/PromptCard";
import { CourseCard } from "../components/CourseCard";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Slider from "react-slick";
import {
  Wand2,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Crown,
  CheckCircle2,
  ArrowRight,
  Star,
  Play,
  Quote,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Moon,
  Gem,
  Scroll,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function LandingPage() {
  const navigate = useNavigate();

  const featuredPrompts = [
    {
      id: "1",
      title: "Professional Email Writer",
      description:
        "Create perfect professional emails for any business scenario in seconds",
      price: 12.99,
      rating: 4.9,
      reviewCount: 234,
      purchases: 1523,
      category: "Writing",
      featured: true,
    },
    {
      id: "2",
      title: "Social Media Content Generator",
      description:
        "Generate engaging social media posts that drive engagement and growth",
      price: 15.99,
      rating: 4.8,
      reviewCount: 189,
      purchases: 982,
      category: "Marketing",
      featured: true,
    },
    {
      id: "3",
      title: "Code Documentation Assistant",
      description:
        "Automatically generate comprehensive documentation for your codebase",
      price: 19.99,
      rating: 4.9,
      reviewCount: 156,
      purchases: 743,
      category: "Code",
    },
  ];

  const featuredCourses = [
    {
      id: "1",
      title: "Master ChatGPT Prompt Engineering",
      instructor: "Sarah Johnson",
      description:
        "Learn to craft powerful prompts that unlock ChatGPT's full potential",
      price: 49.99,
      rating: 4.9,
      reviewCount: 567,
      duration: "8h 30m",
      students: 3421,
      level: "Beginner",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    },
    {
      id: "2",
      title: "Advanced Prompt Patterns & Frameworks",
      instructor: "Michael Chen",
      description:
        "Master chain-of-thought, few-shot, and role-based prompting strategies",
      price: 79.99,
      rating: 4.8,
      reviewCount: 423,
      duration: "12h 15m",
      students: 2156,
      level: "Intermediate",
      imageUrl:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop",
    },
    {
      id: "3",
      title: "Midjourney Prompting: From Beginner to Pro",
      instructor: "Emma Davis",
      description:
        "Create stunning AI artwork by mastering image generation prompts",
      price: 59.99,
      rating: 4.9,
      reviewCount: 789,
      duration: "10h 45m",
      students: 4532,
      level: "All Levels",
      imageUrl:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=400&fit=crop",
    },
  ];

  const stats = [
    { label: "Active Wizards", value: "50K+", icon: Users },
    { label: "Magic Prompts", value: "10K+", icon: Wand2 },
    { label: "Spellbooks", value: "500+", icon: Scroll },
    { label: "Satisfaction Rate", value: "98%", icon: Crown },
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Access",
      description:
        "Get immediate access to all purchased prompts and courses",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "All content is verified and tested by AI experts",
    },
    {
      icon: FlaskConical,
      title: "Regular Updates",
      description:
        "Stay current with the latest AI techniques and best practices",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Browse & Discover",
      description:
        "Explore our curated collection of AI prompts and courses",
      icon: Gem,
    },
    {
      step: "2",
      title: "Purchase",
      description:
        "Secure checkout with instant delivery to your account",
      icon: Moon,
    },
    {
      step: "3",
      title: "Start Creating",
      description:
        "Use your prompts or start learning immediately",
      icon: Wand2,
    },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Content Creator",
      content:
        "The prompts I bought saved me hours of work. My content quality has improved dramatically!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90JTIwbWFufGVufDF8fHx8MTc3NDc0NDE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Lisa Rodriguez",
      role: "Marketing Manager",
      content:
        "The AI marketing course transformed how our team approaches campaigns. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90JTIwd29tYW58ZW58MXx8fHwxNzc0Nzk3NjMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "James Kim",
      role: "Developer",
      content:
        "Best investment for learning AI. The courses are practical and easy to follow.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NzQ4NDAyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Sarah Martinez",
      role: "Freelance Designer",
      content:
        "These AI tools have revolutionized my design workflow. I can deliver projects 3x faster now!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1753162661809-ce0cb99b6fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbmVyJTIwd29ya2luZyUyMHRhYmxldHxlbnwxfHx8fDE3NzQ4NDAyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      content:
        "The Prompt Wizard helped me bootstrap my startup with limited resources. Absolutely game-changing!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjB0ZWFtJTIwYnJhaW5zdG9ybWluZ3xlbnwxfHx8fDE3NzQ4NDAyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const faqs = [
    {
      question: "How do I access my purchased prompts?",
      answer:
        "Once you complete your purchase, prompts are instantly available in your purchase history. You can download and use them immediately.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "Yes! We offer a 30-day money-back guarantee on all purchases. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      question: "Are the courses self-paced?",
      answer:
        "Absolutely! All courses are self-paced, allowing you to learn at your own speed. You get lifetime access to all course materials.",
    },
    {
      question: "Do I need prior AI experience?",
      answer:
        "No prior experience needed! We have courses for all skill levels, from complete beginners to advanced practitioners.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-y-0 inset-x-8 md:inset-x-16"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(108, 59, 255) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Wand2 className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Trusted by 50,000+ wizards
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Discover Powerful AI Prompts & Prompting Courses
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Unlock the full potential of AI with our curated
                marketplace of premium prompts and expert-led
                prompting courses designed for creators, developers, and
                marketers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg h-12 px-8"
                  onClick={() => navigate("/prompts")}
                >
                  Explore Prompts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-12 px-8"
                  onClick={() => navigate("/courses")}
                >
                  Browse Courses
                </Button>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzc0Njg3NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Technology"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      50K+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Happy Users
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      4.9
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Featured Prompts
              </h2>
              <p className="text-muted-foreground">
                Hand-picked prompts to supercharge your AI
                workflow
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/prompts")}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Featured Courses
              </h2>
              <p className="text-muted-foreground">
                Learn from industry experts and master AI skills
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/courses")}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your AI journey in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-2xl font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center absolute top-1/2 right-0 translate-x-[calc(50%+1rem)] -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Banner */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518731027-78a22c8852ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwYWNoaWV2ZW1lbnQlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzQ2NjU2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Success Achievement"
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join the Success Stories
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our community members have achieved remarkable
                results using our AI prompts and courses. From
                boosting productivity to launching successful
                businesses, discover what's possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Increased Productivity
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Save 10+ hours per week on content
                      creation and automation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Better Results
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Improve content quality and AI output
                      consistency by 300%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Career Growth
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Learn in-demand AI skills to advance your
                      career
                    </p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="mt-8 bg-primary hover:bg-primary/90"
                onClick={() => navigate("/community")}
              >
                View Success Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 border-border hover:shadow-lg transition-shadow"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied creators and
              professionals
            </p>
          </div>
          <div className="max-w-6xl mx-auto testimonial-slider">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-3">
                  <Card className="p-6 border-border h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({
                        length: testimonial.rating,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                      <p className="text-muted-foreground pl-6 italic">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                See Prompt Wizard in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch how our platform helps creators transform
                their workflow with powerful AI prompts and
                courses
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1723862349011-e9992c8a721a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB1c2luZyUyMGxhcHRvcCUyMGFpJTIwc29mdHdhcmV8ZW58MXx8fHwxNzc0ODQwMjY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Video Demo Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <button className="flex items-center justify-center w-20 h-20 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transform group-hover:scale-110 transition-transform shadow-xl">
                    <Play
                      className="h-10 w-10 ml-1"
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  Platform Overview: 2 Minutes
                </h3>
                <p className="text-white/90 text-sm">
                  Learn how to get started and maximize your
                  results
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="p-4 bg-card/50 backdrop-blur border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      Quick Start Guide
                    </div>
                    <div className="text-xs text-muted-foreground">
                      5 min watch
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
                    <Crown className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      Success Stories
                    </div>
                    <div className="text-xs text-muted-foreground">
                      8 min watch
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      Advanced Tips
                    </div>
                    <div className="text-xs text-muted-foreground">
                      12 min watch
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our platform
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of creators, developers, and
              marketers who are already using AI to transform
              their work.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg h-12 px-8"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}