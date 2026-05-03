import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import {
  BookOpen,
  Clock,
  PlayCircle,
  Trophy,
  Flame,
  Target,
  Search,
  Wand2,
  Scroll,
  Star,
  CheckCircle2,
  ArrowRight,
  CalendarDays,
  BarChart3,
  Loader2, // Import thêm icon Loading
} from "lucide-react"

// Import API
import { getOwnedCourses } from "../api/course"

interface PurchasedCourse {
  id: string
  title: string
  instructor: string
  imageUrl: string
  progress: number
  totalLessons: number
  completedLessons: number
  duration: string
  lastAccessed: string
  currentLesson: string
  category: string
}

export function MyLearningPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  // Thêm States để quản lý dữ liệu API
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setIsLoading(true)
        const response = await getOwnedCourses()

        if (response.success && response.payload) {
          // Map dữ liệu từ Backend sang format của Frontend UI
          const formattedCourses: PurchasedCourse[] = response.payload.map(
            (course: any) => ({
              id: course.courseId.toString(),
              title: course.title,
              instructor: course.ownedBy || "Instructor",
              imageUrl:
                course.coverUrl ||
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop", // Ảnh mặc định nếu thiếu
              duration: `${course.duration || 0}m`,
              category: course.category || "General",

              // TODO: Các trường này hiện tại DB chưa tính toán được, tạm để mặc định
              progress: 0, // Cần API bảng userLessons để tính chính xác
              totalLessons: 10,
              completedLessons: 0,
              lastAccessed: new Date(course.enrolledAt).toLocaleDateString(),
              currentLesson: "Introduction",
            }),
          )

          setPurchasedCourses(formattedCourses)
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyCourses()
  }, [])

  // Tính toán Stats dựa trên dữ liệu thật
  const stats = {
    totalCourses: purchasedCourses.length,
    completedCourses: purchasedCourses.filter((c) => c.progress === 100).length,
    totalHoursLearned: 0, // Tạm mock
    currentStreak: 1, // Tạm mock
    totalLessonsCompleted: purchasedCourses.reduce(
      (sum, c) => sum + c.completedLessons,
      0,
    ),
    certificates: purchasedCourses.filter((c) => c.progress === 100).length,
  }

  // Vì progress hiện tại đang mock = 0, ta cho vào mảng inProgress tạm để UI hiển thị đẹp
  const inProgressCourses = purchasedCourses.filter(
    (c) => c.progress >= 0 && c.progress < 100,
  )
  const completedCourses = purchasedCourses.filter((c) => c.progress === 100)

  const filteredCourses = (courses: PurchasedCourse[]) =>
    courses.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  // Khoá học học tiếp: Ưu tiên khoá mới nhất (phần tử đầu tiên)
  const continueLearnCourse = inProgressCourses[0] || purchasedCourses[0]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero / Welcome Section */}
      <div className="border-b bg-gradient-to-br from-primary/5 via-card to-secondary/5">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold">My Study Space</h1>
              </div>
              <p className="text-muted-foreground mb-6">
                Welcome back, Wizard! Continue your learning journey and master
                the art of prompting.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Flame className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {stats.currentStreak}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Day Streak
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {stats.totalHoursLearned}h
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Hours Learned
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {stats.totalLessonsCompleted}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Lessons Done
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.certificates}</p>
                      <p className="text-xs text-muted-foreground">
                        Certificates
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Continue Learning Card */}
            {continueLearnCourse && continueLearnCourse.progress < 100 && (
              <Card className="lg:w-[420px] overflow-hidden border-primary/20 bg-card shadow-lg flex-shrink-0">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={continueLearnCourse.imageUrl}
                    alt={continueLearnCourse.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <Badge className="bg-primary text-primary-foreground mb-2">
                      Continue Learning
                    </Badge>
                    <h3 className="text-white font-semibold line-clamp-1">
                      {continueLearnCourse.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Scroll className="h-4 w-4" />
                    <span className="line-clamp-1">
                      Next: {continueLearnCourse.currentLesson}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Progress
                      value={continueLearnCourse.progress}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold text-primary">
                      {continueLearnCourse.progress}%
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() =>
                      navigate(`/my-learning/${continueLearnCourse.id}`)
                    }
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Course Library */}
      <div className="container mx-auto px-4 py-8">
        {/* Search + Filter */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All Courses ({purchasedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <CourseGrid
              courses={filteredCourses(purchasedCourses)}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="in-progress">
            <CourseGrid
              courses={filteredCourses(inProgressCourses)}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="completed">
            {filteredCourses(completedCourses).length === 0 ? (
              <EmptyState
                icon={<Trophy className="h-12 w-12 text-muted-foreground/50" />}
                title="No completed courses yet"
                description="Keep learning and you'll earn your first certificate soon!"
              />
            ) : (
              <CourseGrid
                courses={filteredCourses(completedCourses)}
                navigate={navigate}
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Weekly Activity & Explore More ... (Giữ nguyên như cũ) */}
        {/* ... (Các phần này giữ nguyên mã HTML ban đầu của bạn để tránh file quá dài) ... */}

        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
            <Wand2 className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">
              Ready to learn more spells?
            </h3>
            <p className="text-muted-foreground mb-4">
              Explore our full catalog of prompting courses and level up your
              wizard skills.
            </p>
            <Button
              onClick={() => navigate("/courses")}
              className="bg-primary hover:bg-primary/90"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ==============================================
// Component phụ trợ giữ nguyên
// ==============================================
function CourseGrid({
  courses,
  navigate,
}: {
  courses: PurchasedCourse[]
  navigate: (path: string) => void
}) {
  if (courses.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-12 w-12 text-muted-foreground/50" />}
        title="No courses found"
        description="You haven't enrolled in any courses yet, or try adjusting your search."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          onClick={() => navigate(`/my-learning/${course.id}`)}
        >
          {/* Image */}
          <div className="relative h-44 overflow-hidden bg-muted flex-shrink-0">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {course.progress === 100 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm">
                    Completed!
                  </span>
                </div>
              </div>
            )}
            <Badge className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground border">
              {course.category}
            </Badge>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              by {course.instructor}
            </p>

            <div className="mt-auto">
              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                  <span
                    className={`font-semibold ${course.progress === 100 ? "text-green-500" : "text-primary"}`}
                  >
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>{course.lastAccessed}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Action */}
              <Button
                className="w-full mt-4"
                variant={course.progress === 100 ? "outline" : "default"}
                size="sm"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                {course.progress === 100
                  ? "Review Course"
                  : course.progress > 0
                    ? "Continue Learning"
                    : "Start Learning"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
