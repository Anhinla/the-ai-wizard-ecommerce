import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import {
  Wand2,
  Sparkles,
  Crown,
  Gem,
  Moon,
  FlaskConical,
  Scroll,
  Shield,
  Heart,
  Users,
  Target,
  Zap,
  Star,
  ArrowRight,
  BookOpen,
  Globe,
} from 'lucide-react';

const team = [
  {
    name: 'Alaric the Sage',
    role: 'Founder & CEO',
    bio: 'Former AI researcher at OpenAI with a passion for democratizing AI tools for creators worldwide.',
    icon: Crown,
  },
  {
    name: 'Luna Spellweaver',
    role: 'Head of Product',
    bio: 'Ex-Google product lead who believes in crafting magical user experiences through intuitive design.',
    icon: Moon,
  },
  {
    name: 'Orion Brightforge',
    role: 'CTO',
    bio: 'Full-stack wizard with 15+ years of experience building scalable platforms and AI infrastructure.',
    icon: FlaskConical,
  },
  {
    name: 'Elara Gemstone',
    role: 'Head of Community',
    bio: 'Community builder and educator who has helped over 50,000 creators master AI tools.',
    icon: Gem,
  },
];

const values = [
  {
    icon: Sparkles,
    title: 'Magic for Everyone',
    description: 'We believe AI should be accessible to all, not just the technically gifted. Our marketplace breaks down barriers.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Every prompt and course is vetted by our council of wizards. Quality is our sacred oath.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'Our guild of creators, learners, and innovators is the heart of everything we conjure.',
  },
  {
    icon: Target,
    title: 'Relentless Innovation',
    description: 'We constantly push the boundaries of what\'s possible, brewing new features and tools for our users.',
  },
];

const milestones = [
  { year: '2023', event: 'Prompt Wizard was founded in a small enchanted workshop', icon: Wand2 },
  { year: '2024', event: 'Reached 10,000 wizards in our community guild', icon: Users },
  { year: '2025', event: 'Launched 500+ premium prompts and 50+ courses', icon: BookOpen },
  { year: '2026', event: 'Expanded globally with creators from 80+ realms', icon: Globe },
];

const stats = [
  { value: '50K+', label: 'Active Wizards', icon: Users },
  { value: '2,500+', label: 'AI Prompts', icon: Scroll },
  { value: '150+', label: 'Courses', icon: BookOpen },
  { value: '80+', label: 'Countries', icon: Globe },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        {/* Mystical background dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #5B21B6 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              <Wand2 className="h-3.5 w-3.5 mr-1.5" />
              Our Story
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              The <span className="text-primary">Magic</span> Behind{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Prompt Wizard</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're on a quest to make AI accessible, powerful, and enchanting for creators,
              developers, marketers, and students around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-gradient-to-r from-primary/5 via-card to-secondary/5 border-primary/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge variant="secondary" className="mb-4 px-3 py-1 bg-secondary/10 text-secondary border-secondary/20">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Empowering the Next Generation of <span className="text-primary">AI Wizards</span>
              </h2>
              <p className="text-muted-foreground mb-4">
                In a world where AI is reshaping every industry, we believe that the right prompts
                are like the right spells — they unlock incredible power. Prompt Wizard was born from
                a simple idea: create a marketplace where anyone can find, share, and master the art
                of AI prompting.
              </p>
              <p className="text-muted-foreground mb-6">
                Our curated collection of prompts and expert-led courses are designed to transform
                beginners into apprentices, and apprentices into archmages. Whether you're crafting
                content, writing code, or building businesses — we have the magic you need.
              </p>
              <Button onClick={() => navigate('/prompts')} className="bg-primary hover:bg-primary/90">
                Explore the Marketplace
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwQUklMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc1MTMxMzA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Technology"
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20">
              <Gem className="h-3.5 w-3.5 mr-1.5" />
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4">The Pillars of Our <span className="text-primary">Guild</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every spell we cast and every potion we brew is guided by these core principles.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:border-primary/20 group text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow">
                      <value.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1 bg-secondary/10 text-secondary border-secondary/20">
              <Scroll className="h-3.5 w-3.5 mr-1.5" />
              Our Journey
            </Badge>
            <h2 className="text-3xl font-bold mb-4">The <span className="text-primary">Chronicle</span> of Our Quest</h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-primary/40 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  className="flex items-start gap-6"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <m.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <Card className="flex-1 p-5 hover:shadow-md transition-shadow">
                    <div className="text-sm font-semibold text-primary mb-1">{m.year}</div>
                    <p className="text-foreground">{m.event}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20">
              <Crown className="h-3.5 w-3.5 mr-1.5" />
              The Council
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Our <span className="text-primary">Archmages</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The masterminds behind the spells, potions, and enchantments that power Prompt Wizard.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Card className="p-6 h-full text-center hover:shadow-lg transition-all hover:border-primary/20 group">
                  <div className="flex justify-center mb-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow">
                      <member.icon className="h-9 w-9 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/10 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-10">
              <Wand2 className="h-32 w-32 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">Ready to Begin Your <span className="text-primary">Quest</span>?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of wizards who are already mastering AI. Start your journey today
                and unlock the full power of artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate('/prompts')} className="bg-primary hover:bg-primary/90">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Browse Prompts
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/courses')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore Courses
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}