import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Progress } from "../components/ui/progress"
import { Separator } from "../components/ui/separator"
import {
  Star,
  Heart,
  Share2,
  CheckCircle2,
  Download,
  Zap,
  Loader2,
  AlertCircle,
  GraduationCap,
  ArrowRight,
  FileText,
} from "lucide-react"

// Import API
import { getPromptById, PromptProps } from "../api/prompt"
import { getCourses, CourseProps } from "../api/course"

export function PromptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // States quản lý API cho Prompt
  const [prompt, setPrompt] = useState<PromptProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State quản lý việc download
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  // State quản lý Upsell Course (Chuyển thành mảng để chứa nhiều khóa học)
  const [upsellCourses, setUpsellCourses] = useState<CourseProps[]>([])

  // Fetch Prompt Detail
  useEffect(() => {
    const fetchPromptDetail = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const response = await getPromptById(Number(id))
        if (response.payload) {
          setPrompt(response.payload)
        } else {
          setError("Prompt not found")
        }
      } catch (err) {
        console.error("Error fetching prompt details:", err)
        setError("Failed to load prompt details. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchPromptDetail()
  }, [id])

  // Fetch Upsell Course dựa vào Category của Prompt
  useEffect(() => {
    const fetchUpsellCourse = async () => {
      if (!prompt?.category) return

      try {
        const response = await getCourses({
          page: 1,
          size: 2, // Lấy 2 khóa học
          category: prompt.category,
          sort_field: "purchased_count",
          sort_order: "desc",
          min_vote: 0,
        })

        if (response.payload?.data && response.payload.data.length > 0) {
          // Lưu thẳng mảng data trả về vào state
          setUpsellCourses(response.payload.data)
        }
      } catch (err) {
        console.error("Error fetching upsell course:", err)
      }
    }

    fetchUpsellCourse()
  }, [prompt?.category])

  // Hàm xử lý Download
  const handleDownload = () => {
    if (!prompt) return
    setIsDownloading(true)

    setTimeout(() => {
      setIsDownloading(false)
      setIsDownloaded(true)

      // Logic tải file thực tế
      // const link = document.createElement("a");
      // link.href = prompt.downloadUrl;
      // link.download = `${prompt.title}.zip`;
      // link.click();

      setTimeout(() => setIsDownloaded(false), 3000)
    }, 1500)
  }

  // --- Static Data ---
  const features = [
    "Ready-to-use prompt templates",
    "Works with ChatGPT, Claude, and other AI models",
    "Customizable tone and formality levels",
    "Includes step-by-step guidance",
  ]

  const examples = [
    {
      title: "Example 1: Professional Follow-up",
      input: "Follow up on the project proposal submitted last week",
      output:
        "Subject: Following Up: Project Proposal\n\nDear Client,\n\nI hope this email finds you well. I am writing to follow up on the proposal...",
    },
  ]

  const reviews = [
    {
      id: "1",
      author: "Sarah Miller",
      rating: 5,
      date: "March 20, 2026",
      comment:
        "This free prompt collection is better than paid ones I've seen!",
    },
  ]

  const ratingDistribution = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ]
  // -------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading details...</p>
      </div>
    )
  }

  if (error || !prompt) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
        <p className="text-muted-foreground">{error || "Resource not found"}</p>
        <Button onClick={() => navigate("/prompts")} variant="outline">
          Back to Resources
        </Button>
      </div>
    )
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
                  {prompt.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  100% Free
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-4">{prompt.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                {prompt.description}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="font-semibold">{prompt.vote || 0}</span>
                  <span className="text-muted-foreground">(Reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Download className="h-5 w-5" />
                  <span>
                    {prompt.purchasedCount?.toLocaleString() || 0} downloads
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  By{" "}
                  <span className="font-medium text-foreground">
                    {prompt.ownedBy}
                  </span>
                </span>
                <span>•</span>
                <span>Category: {prompt.category}</span>
              </div>
            </div>

            {/* 2. Tabs */}
            <div className="pt-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="examples">Preview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      What's included in this pack
                    </h2>
                    <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                      {prompt.description}
                    </p>

                    <h3 className="text-xl font-semibold mb-3 mt-6">
                      Features
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="examples" className="space-y-6">
                  {examples.map((example, index) => (
                    <Card key={index} className="p-6 border-border shadow-sm">
                      <h3 className="text-lg font-semibold mb-4">
                        {example.title}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            Input:
                          </div>
                          <div className="bg-muted p-4 rounded-lg text-sm">
                            {example.input}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            Output:
                          </div>
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
                          <div className="text-5xl font-bold mb-2">
                            {prompt.vote}
                          </div>
                          <div className="flex justify-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(prompt.vote)
                                    ? "fill-secondary text-secondary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
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

          {/* CỘT PHẢI: Sticky Sidebar cho Actions & Upsell */}
          <div className="lg:w-96 flex-shrink-0">
            {/* sticky top-8 giúp sidebar trượt theo màn hình khi cuộn */}
            <div className="sticky top-8 flex flex-col gap-4">
              {/* Free Action Card */}
              <Card className="p-6 border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-4">
                  Get these prompts
                </h3>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 mb-4 transition-all"
                  size="lg"
                  onClick={handleDownload}
                  disabled={isDownloading || isDownloaded}
                >
                  {isDownloading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : isDownloaded ? (
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                  ) : (
                    <FileText className="mr-2 h-5 w-5" />
                  )}
                  {isDownloading
                    ? "Preparing Download..."
                    : isDownloaded
                      ? "Downloaded Successfully!"
                      : "Download Free Resource"}
                </Button>

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

              {/* Lặp qua mảng upsellCourses để hiển thị */}
              {upsellCourses.map((course) => (
                <Card
                  key={course.courseId}
                  className="p-1 border-2 border-primary/20 bg-primary/5 overflow-hidden relative shadow-sm"
                >
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                    Related Course
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 mt-2">
                      {course.coverUrl ? (
                        <img
                          src={course.coverUrl}
                          alt={course.title}
                          className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                        />
                      ) : (
                        <div className="bg-primary/20 p-2 rounded-full flex-shrink-0">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <h3 className="font-bold text-lg leading-tight line-clamp-2">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {course.description ||
                        "Want to write prompts like this yourself? Learn the exact frameworks to 10x your productivity in our premium course."}
                    </p>

                    <div className="flex items-end gap-2 mb-5">
                      <span className="text-2xl font-bold">
                        ${course.price}
                      </span>
                      {/* Đã xóa dòng render giá line-through (giá ảo) ở đây */}
                    </div>

                    <Button
                      className="w-full group"
                      onClick={() => navigate(`/courses/${course.courseId}`)}
                    >
                      View Course Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
