import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  students: number;
  level: string;
  imageUrl: string;
}

export function CourseCard({
  id,
  title,
  instructor,
  description,
  price,
  rating,
  reviewCount,
  duration,
  students,
  level,
  imageUrl,
}: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground border">
          {level}
        </Badge>
      </div>

      <div className="p-6">
        {/* Content */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">by {instructor}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">${price}</span>
          </div>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate(`/courses/${id}`)}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Enroll
          </Button>
        </div>
      </div>
    </Card>
  );
}
