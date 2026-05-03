import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Progress } from "../components/ui/progress"
import { Separator } from "../components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  Users,
  Clock,
  BookOpen,
  PlayCircle,
  FileText,
  Loader2,
  AlertCircle,
  Trash2,
} from "lucide-react"

// Import API
import { getCourseById, CourseProps } from "../api/course"
import { addItem, removeItem } from "../api/cart"

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // States quản lý API
  const [course, setCourse] = useState<CourseProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State quản lý loading khi gọi API giỏ hàng
  const [isUpdatingCart, setIsUpdatingCart] = useState(false)

  // Fetch Course Detail
  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const response = await getCourseById(Number(id))
        if (response.payload) {
          setCourse(response.payload)
        } else {
          setError("Course not found")
        }
      } catch (err) {
        console.error("Error fetching course details:", err)
        setError("Failed to load course details. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchCourseDetail()
  }, [id])

  // Hàm xử lý Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!id || !course) return

    setIsUpdatingCart(true)
    try {
      await addItem(Number(id))
      // Cập nhật lại state cục bộ để UI tự động đổi sang nút "Remove"
      setCourse({ ...course, isInCart: true })
    } catch (err) {
      console.error("Failed to add course to cart:", err)
      alert("Something went wrong while adding to cart. Please try again.")
    } finally {
      setIsUpdatingCart(false)
    }
  }

  // Hàm xử lý Xóa khỏi giỏ hàng
  const handleRemoveFromCart = async () => {
    if (!id || !course) return

    setIsUpdatingCart(true)
    try {
      await removeItem(Number(id))
      // Cập nhật lại state cục bộ để UI tự động đổi sang nút "Add"
      setCourse({ ...course, isInCart: false })
    } catch (err) {
      console.error("Failed to remove course from cart:", err)
      alert("Something went wrong while removing from cart. Please try again.")
    } finally {
      setIsUpdatingCart(false)
    }
  }

  // --- Static Data (Dành cho các trường API chưa hỗ trợ) ---
  const features = [
    "Lifetime access to course materials",
    "On-demand video lectures",
    "Downloadable resources and templates",
    "Certificate of completion",
    "Access on mobile, tablet, and desktop",
    "30-day money-back guarantee",
  ]

  const learningOutcomes = [
    "Understand the fundamentals of prompt engineering",
    "Create effective prompts for various AI models",
    "Master advanced prompting techniques and strategies",
    "Apply prompt engineering in real-world scenarios",
    "Optimize AI outputs for your specific needs",
    "Build a portfolio of reusable prompt templates",
  ]

  const curriculum = [
    {
      section: "Introduction to Prompt Engineering",
      lectures: 8,
      duration: "1h 15m",
      lessons: [
        { title: "Welcome to the Course", duration: "5:30", type: "video" },
        {
          title: "What is Prompt Engineering?",
          duration: "12:45",
          type: "video",
        },
        {
          title: "Understanding AI Language Models",
          duration: "15:20",
          type: "video",
        },
        { title: "Course Resources", duration: "3:10", type: "file" },
      ],
    },
    {
      section: "Fundamental Prompting Techniques",
      lectures: 12,
      duration: "2h 30m",
      lessons: [
        { title: "Basic Prompt Structure", duration: "18:25", type: "video" },
        { title: "Context and Instructions", duration: "22:15", type: "video" },
        { title: "Practice Exercise 1", duration: "10:00", type: "file" },
      ],
    },
  ]

  const reviews = [
    {
      id: "1",
      author: "Michael Chen",
      rating: 5,
      date: "March 22, 2026",
      comment:
        "This course is absolutely fantastic! The instructor explains complex concepts in a clear and practical way. I've already applied what I learned to improve my workflow significantly.",
    },
    {
      id: "2",
      author: "Lisa Anderson",
      rating: 5,
      date: "March 19, 2026",
      comment:
        "Best course on this topic I've taken. The examples are practical and the exercises really help cement the concepts. Highly recommended!",
    },
  ]

  const ratingDistribution = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 14 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ]
  // -------------------------------------------------------------

  // Xử lý Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading course details...</p>
      </div>
    )
  }

  // Xử lý Lỗi
  if (error || !course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">{error || "Course not found"}</p>
        <Button onClick={() => navigate("/courses")} variant="outline">
          Back to Courses
        </Button>
      </div>
    )
  }

  // Format Duration (giả sử API trả về số phút)
  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  return (
    <div className="min-h-screen pb-12 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* CỘT TRÁI: Details & Tabs Content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* 1. Header Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {course.category}
                </Badge>
                {course.purchasedCount > 1000 && (
                  <Badge className="bg-secondary text-secondary-foreground">
                    Best Seller
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {course.description}
              </p>

              <div className="flex items-center gap-6 mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{course.vote || 0}</span>
                  <span className="text-muted-foreground">(Rating)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>
                    {course.purchasedCount?.toLocaleString() || 0} students
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Created by{" "}
                  <span className="font-medium text-foreground">
                    {course.ownedBy}
                  </span>
                </span>
                <span>•</span>
                <span>Language: English</span>
              </div>
            </div>

            {/* 2. Tabs */}
            <div className="pt-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="w-full flex justify-start overflow-x-auto no-scrollbar">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      What You'll Learn
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      Course Description
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="whitespace-pre-wrap">
                        {course.description}
                      </p>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      Requirements
                    </h2>
                    <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                      <li>Basic understanding of the subject matter</li>
                      <li>Willingness to practice and experiment</li>
                      <li>No advanced technical experience required</li>
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">
                      Course Content
                    </h2>
                    <p className="text-muted-foreground">
                      {curriculum.length} sections •{" "}
                      {formatDuration(course.duration)} total length
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
                              {lesson.type === "video" ? (
                                <PlayCircle className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              )}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 overflow-hidden">
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-1">
                          {course.ownedBy}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          Course Creator & Expert
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                              <Star className="h-4 w-4" />
                              <span className="text-sm">Instructor Rating</span>
                            </div>
                            <div className="font-semibold">{course.vote}</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">Students</span>
                            </div>
                            <div className="font-semibold">
                              {course.purchasedCount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 text-muted-foreground">
                          <p>
                            {course.ownedBy} is an expert in their field with a
                            passion for teaching. They have created this
                            comprehensive curriculum to help students master the
                            subject matter efficiently and practically.
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
                          <div className="text-5xl font-bold mb-2">
                            {course.vote}
                          </div>
                          <div className="flex justify-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(course.vote)
                                    ? "fill-secondary text-secondary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Course Rating
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          {ratingDistribution.map((dist) => (
                            <div
                              key={dist.stars}
                              className="flex items-center gap-2"
                            >
                              <div className="text-sm w-12">
                                {dist.stars} star
                              </div>
                              <Progress
                                value={dist.percentage}
                                className="flex-1"
                              />
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
                          <div
                            key={review.id}
                            className="border-b pb-4 last:border-b-0"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-semibold">
                                  {review.author}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {Array.from({ length: review.rating }).map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="h-4 w-4 fill-secondary text-secondary"
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {review.date}
                              </div>
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* CỘT PHẢI: Sticky Sidebar cho Actions Purchase */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="sticky top-8 flex flex-col gap-4">
              <Card className="overflow-hidden border-border shadow-sm">
                {/* Course Cover Image */}
                {course.coverUrl ? (
                  <img
                    src={course.coverUrl}
                    alt={course.title}
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="w-full h-52 bg-muted flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground opacity-50" />
                  </div>
                )}

                <div className="p-6">
                  <div className="text-4xl font-bold mb-6">${course.price}</div>

                  <div className="space-y-3 mb-6">
                    {/* Render button dựa vào trạng thái isOwned và isInCart */}
                    {course.isOwned ? (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        size="lg"
                        onClick={() => navigate(`/my-learning/${course.courseId}`)}
                      >
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Go to Learning
                      </Button>
                    ) : course.isInCart ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                            variant="outline"
                            size="lg"
                            disabled={isUpdatingCart}
                          >
                            {isUpdatingCart ? (
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-5 w-5" />
                            )}
                            {isUpdatingCart
                              ? "Updating..."
                              : "Remove from Cart"}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove from cart?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove "{course.title}"
                              from your shopping cart?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleRemoveFromCart}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white hover:text-white"
                        variant="outline"
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={isUpdatingCart}
                      >
                        {isUpdatingCart ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <ShoppingCart className="mr-2 h-5 w-5" />
                        )}
                        {isUpdatingCart ? "Adding..." : "Add to Cart"}
                      </Button>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3">
                    <h3 className="font-semibold mb-3">
                      This course includes:
                    </h3>
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
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
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
