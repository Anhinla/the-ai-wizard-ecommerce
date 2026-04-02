import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  type: 'prompts' | 'courses';
}

export function FilterSidebar({ type }: FilterSidebarProps) {
  const promptCategories = [
    'ChatGPT',
    'Midjourney',
    'Stable Diffusion',
    'DALL-E',
    'Writing',
    'Marketing',
    'Code',
    'Business',
  ];

  const courseCategories = [
    'AI Fundamentals',
    'Prompt Engineering',
    'Machine Learning',
    'Computer Vision',
    'NLP',
    'Business AI',
    'Creative AI',
    'Development',
  ];

  const categories = type === 'prompts' ? promptCategories : courseCategories;

  return (
    <div className="w-64 bg-card border-r p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label
                htmlFor={category}
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Price Range</h4>
        <div className="space-y-4">
          <Slider defaultValue={[0, 100]} max={100} step={1} />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$100+</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal cursor-pointer"
              >
                {rating}+ Stars
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Sort By</h4>
        <div className="space-y-2">
          {['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Rating'].map(
            (option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox id={option} />
                <Label htmlFor={option} className="text-sm font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
