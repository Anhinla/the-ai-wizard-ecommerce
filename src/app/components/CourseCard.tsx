import {
  Star,
  Clock,
  Users,
  BookOpen,
  ShoppingCart,
  Check,
  PlayCircle,
} from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"

interface CourseCardProps {
  id: string
  title: string
  instructor: string
  description: string
  price: number
  rating: number
  reviewCount: number
  duration: string
  students: number
  level: string
  imageUrl: string
  // BỔ SUNG 2 PROPS TRẠNG THÁI
  isInCart?: boolean
  isOwned?: boolean
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
  isInCart = false, // Giá trị mặc định
  isOwned = false, // Giá trị mặc định
}: CourseCardProps) {
  const navigate = useNavigate()

  // Hàm xử lý render nút bấm tuỳ theo trạng thái
  const renderActionButton = () => {
    // Trạng thái 1: Đã mua -> Nút học ngay
    if (isOwned) {
      return (
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={(e) => {
            e.stopPropagation() // Ngăn click nhầm
            navigate(`/my-learning/${id}`)
          }}
        >
          <PlayCircle className="h-4 w-4 mr-1" />
          Start Learning
        </Button>
      )
    }

    // Trạng thái 2: Nằm trong giỏ hàng -> Nút đi tới giỏ hàng
    if (isInCart) {
      return (
        <Button
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation()
            navigate("/cart")
          }}
        >
          <Check className="h-4 w-4 mr-1" />
          In Cart
        </Button>
      )
    }

    // Trạng thái 3: Mặc định (Chưa mua, chưa có trong giỏ) -> Nút Enroll (Xem chi tiết)
    return (
      <Button
        size="sm"
        className="bg-primary hover:bg-primary/90"
        onClick={(e) => {
          e.stopPropagation()
          navigate(`/courses/${id}`)
        }}
      >
        <BookOpen className="h-4 w-4 mr-1" />
        Enroll
      </Button>
    )
  }

  return (
    <Card
      className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/courses/${id}`)}
    >
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
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium text-foreground">
              {rating.toFixed(1)}
            </span>
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

          {/* Nút bấm được render tự động */}
          {renderActionButton()}
        </div>
      </div>
    </Card>
  )
}
