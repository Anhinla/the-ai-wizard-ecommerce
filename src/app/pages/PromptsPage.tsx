import { FilterSidebar } from '../components/FilterSidebar';
import { PromptCard } from '../components/PromptCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const prompts = [
    {
      id: '1',
      title: 'Professional Email Writer',
      description: 'Create perfect professional emails for any business scenario in seconds',
      price: 12.99,
      rating: 4.9,
      reviewCount: 234,
      purchases: 1523,
      category: 'Writing',
      featured: true,
    },
    {
      id: '2',
      title: 'Social Media Content Generator',
      description: 'Generate engaging social media posts that drive engagement and growth',
      price: 15.99,
      rating: 4.8,
      reviewCount: 189,
      purchases: 982,
      category: 'Marketing',
      featured: true,
    },
    {
      id: '3',
      title: 'Code Documentation Assistant',
      description: 'Automatically generate comprehensive documentation for your codebase',
      price: 19.99,
      rating: 4.9,
      reviewCount: 156,
      purchases: 743,
      category: 'Code',
    },
    {
      id: '4',
      title: 'Blog Post Outline Creator',
      description: 'Generate detailed blog post outlines with SEO optimization',
      price: 9.99,
      rating: 4.7,
      reviewCount: 312,
      purchases: 1876,
      category: 'Writing',
    },
    {
      id: '5',
      title: 'Product Description Writer',
      description: 'Create compelling product descriptions that convert visitors into buyers',
      price: 14.99,
      rating: 4.8,
      reviewCount: 267,
      purchases: 1234,
      category: 'Marketing',
    },
    {
      id: '6',
      title: 'Resume & Cover Letter Builder',
      description: 'Professional resume and cover letter templates tailored to your industry',
      price: 11.99,
      rating: 4.9,
      reviewCount: 445,
      purchases: 2341,
      category: 'Business',
    },
    {
      id: '7',
      title: 'Creative Story Generator',
      description: 'Generate unique story ideas and plot outlines for your creative writing',
      price: 13.99,
      rating: 4.6,
      reviewCount: 178,
      purchases: 654,
      category: 'Writing',
    },
    {
      id: '8',
      title: 'SEO Content Optimizer',
      description: 'Optimize your content for search engines with AI-powered suggestions',
      price: 17.99,
      rating: 4.8,
      reviewCount: 223,
      purchases: 891,
      category: 'Marketing',
    },
    {
      id: '9',
      title: 'ChatGPT Conversation Starter',
      description: 'Pre-built conversation starters for common ChatGPT use cases',
      price: 8.99,
      rating: 4.7,
      reviewCount: 534,
      purchases: 3421,
      category: 'ChatGPT',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">AI Prompts Marketplace</h1>
          <p className="text-muted-foreground mb-6">
            Discover powerful AI prompts to supercharge your productivity
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
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
              <FilterSidebar type="prompts" />
            </aside>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{prompts.length}</span> prompts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} {...prompt} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Prompts
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
