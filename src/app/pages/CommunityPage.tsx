import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { MessageSquare, Heart, Share2, Users } from 'lucide-react';

export function CommunityPage() {
  const posts = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'AI Educator',
      time: '2 hours ago',
      title: 'My favorite ChatGPT prompts for content creation',
      content:
        'I\'ve been using these prompts daily and they\'ve completely transformed my workflow. Here are my top 5...',
      tags: ['ChatGPT', 'Content', 'Writing'],
      likes: 42,
      comments: 15,
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: 'MC',
      role: 'Developer',
      time: '5 hours ago',
      title: 'Building a custom AI assistant with the API',
      content:
        'Just finished my first AI automation project using the prompts from the marketplace. The results are amazing!',
      tags: ['Development', 'API', 'Automation'],
      likes: 87,
      comments: 23,
    },
    {
      id: '3',
      author: 'Emma Davis',
      avatar: 'ED',
      role: 'Designer',
      time: '1 day ago',
      title: 'Midjourney tips and tricks for beginners',
      content:
        'After completing the Midjourney course, I wanted to share some essential tips that helped me...',
      tags: ['Midjourney', 'Design', 'Tutorial'],
      likes: 156,
      comments: 34,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Community</h1>
            <p className="text-lg text-muted-foreground">
              Connect with fellow AI enthusiasts, share insights, and learn together
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold mb-1">2.5K+</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Active Rate</div>
            </Card>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{post.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {post.role} • {post.time}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Join CTA */}
          <Card className="mt-12 p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Connect with thousands of AI enthusiasts and share your journey
            </p>
            <Button size="lg" className="bg-primary">
              Get Started
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
