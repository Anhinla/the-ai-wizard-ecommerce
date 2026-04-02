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
  Download,
  Code,
  Zap,
} from 'lucide-react';

export function PromptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const prompt = {
    id,
    title: 'Professional Email Writer',
    description:
      'Create perfect professional emails for any business scenario in seconds. This comprehensive prompt helps you generate emails that are clear, concise, and professionally formatted.',
    price: 12.99,
    rating: 4.9,
    reviewCount: 234,
    purchases: 1523,
    category: 'Writing',
    author: 'Alex Thompson',
    lastUpdated: 'March 15, 2026',
  };

  const features = [
    'Works with ChatGPT, Claude, and other AI models',
    'Customizable tone and formality levels',
    'Supports multiple email types',
    'Includes 20+ example scenarios',
    'Regular updates and improvements',
    'Lifetime access',
  ];

  const examples = [
    {
      title: 'Professional Follow-up Email',
      input: 'Follow up on job application for Software Engineer position',
      output:
        'Subject: Following Up on Software Engineer Application\n\nDear Hiring Manager,\n\nI hope this email finds you well. I wanted to follow up on my application for the Software Engineer position...',
    },
    {
      title: 'Client Meeting Request',
      input: 'Request meeting with client to discuss project timeline',
      output:
        'Subject: Meeting Request - Project Timeline Discussion\n\nDear [Client Name],\n\nI hope you\'re doing well. I\'m writing to schedule a meeting to discuss...',
    },
  ];

  const reviews = [
    {
      id: '1',
      author: 'Sarah Miller',
      rating: 5,
      date: 'March 20, 2026',
      comment:
        'This prompt has saved me countless hours! The emails it generates are always professional and well-structured.',
    },
    {
      id: '2',
      author: 'John Davis',
      rating: 5,
      date: 'March 18, 2026',
      comment:
        'Excellent quality. I use it daily for all my business correspondence. Highly recommended!',
    },
    {
      id: '3',
      author: 'Emma Wilson',
      rating: 4,
      date: 'March 15, 2026',
      comment: 'Very useful prompt. Would love to see more examples for specific industries.',
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
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
                  {prompt.category}
                </Badge>
                <Badge className="bg-secondary text-secondary-foreground">Best Seller</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{prompt.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{prompt.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{prompt.rating}</span>
                  <span className="text-muted-foreground">({prompt.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Download className="h-5 w-5" />
                  <span>{prompt.purchases.toLocaleString()} purchases</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By {prompt.author}</span>
                <span>•</span>
                <span>Updated {prompt.lastUpdated}</span>
              </div>
            </div>

            {/* Right: Purchase Card */}
            <Card className="lg:w-96 p-6 border-border h-fit">
              <div className="text-4xl font-bold mb-6">${prompt.price}</div>

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
                <h3 className="font-semibold mb-3">What's included:</h3>
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
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">What This Prompt Does</h2>
              <p className="text-muted-foreground mb-4">
                This professional email writer prompt helps you craft polished, effective business
                emails in seconds. Whether you need to write a follow-up email, request a meeting,
                send a proposal, or handle customer inquiries, this prompt has you covered.
              </p>
              <p className="text-muted-foreground mb-4">
                The prompt is designed to understand context and generate emails that match your
                desired tone and formality level. It automatically structures your emails with
                proper greetings, body content, and professional sign-offs.
              </p>
              <h3 className="text-xl font-semibold mb-3 mt-6">Key Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Save hours of time writing and editing emails</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Ensure consistent professional tone across all communications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Reduce anxiety about email etiquette and formatting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Improve response rates with clear, compelling messages</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            {examples.map((example, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-4">{example.title}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Input:</div>
                    <div className="bg-muted p-4 rounded-lg text-sm">{example.input}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Output:</div>
                    <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">
                      {example.output}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Rating Summary */}
                <div className="md:w-64">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold mb-2">{prompt.rating}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-secondary text-secondary"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {prompt.reviewCount} reviews
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
