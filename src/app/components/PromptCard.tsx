import { Star, ShoppingCart, Eye, Download, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  purchases: number;
  category: string;
  featured?: boolean;
}

export function PromptCard({
  id,
  title,
  description,
  price,
  rating,
  reviewCount,
  purchases,
  category,
  featured = false,
}: PromptCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {category}
          </Badge>
          {featured && (
            <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
          )}
        </div>

        {/* Content */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{purchases.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">${price}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/prompts/${id}`)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Wand2 className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}