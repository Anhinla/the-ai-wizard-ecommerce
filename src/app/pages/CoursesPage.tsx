import { FilterSidebar } from "../components/FilterSidebar"
import { CourseCard } from "../components/CourseCard"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Search, SlidersHorizontal, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

// Import API
import { getCourses, CourseProps, CourseParams } from "../api/course"

// Import Shadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"

export function CoursesPage() {
  // UI States
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(true)

  // Data States
  const [courses, setCourses] = useState<CourseProps[]>([])
  const [loading, setLoading] = useState(true)

  // Pagination States
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minVote, setMinVote] = useState<number>(0)
  const [sortOption, setSortOption] = useState<string>("Popularity")

  // Fetch API
  useEffect(() => {
    const fetchCoursesData = async () => {
      setLoading(true)
      try {
        // Dịch UI Sort Option sang tham số API
        let sortField = ""
        let sortOrder: "asc" | "desc" = "desc"

        if (sortOption === "Price: Low to High") {
          sortField = "price"
          sortOrder = "asc"
        } else if (sortOption === "Price: High to Low") {
          sortField = "price"
          sortOrder = "desc"
        } else if (sortOption === "Rating") {
          sortField = "vote"
          sortOrder = "desc"
        }
        // "Popularity" có thể dùng field mặc định hoặc để trống tùy cấu hình backend của bạn

        const params: CourseParams = {
          page: page,
          size: 6,
          category: selectedCategories.join(","), // Nối mảng category thành chuỗi "Cat1,Cat2"
          sort_field: sortField,
          sort_order: sortOrder,
          min_vote: minVote,
        }

        const response = await getCourses(params)

        // Bóc tách data từ response
        const fetchedCourses = response.payload?.data || []
        const totalItems = response.payload?.total || 0

        setCourses(fetchedCourses)

        // Tính tổng số trang
        setTotalPages(Math.ceil(totalItems / 6))
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoursesData()
  }, [page, selectedCategories, minVote, sortOption]) // Re-fetch khi một trong các state này thay đổi

  // Filter Handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
    setPage(1) // Reset về trang 1 khi đổi bộ lọc
  }

  const handleRatingChange = (rating: number) => {
    setMinVote((prev) => (prev === rating ? 0 : rating))
    setPage(1)
  }

  const handleSortChange = (sort: string) => {
    setSortOption(sort)
    setPage(1)
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setMinVote(0)
    setSortOption("Popularity")
    setSearchQuery("")
    setPage(1)
  }

  // Frontend Search Filter (Dành cho Search Query Client-side)
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Prompting Courses</h1>
          <p className="text-muted-foreground mb-6">
            Master the art of AI prompting with expert-led courses
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
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
              <FilterSidebar
                type="courses"
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                selectedRating={minVote}
                onRatingChange={handleRatingChange}
                selectedSort={sortOption}
                onSortChange={handleSortChange}
                onClear={handleClearFilters}
              />
            </aside>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {/* Trong thực tế nếu search backend thì chỗ này hiển thị totalItems, ở đây mình hiển thị length của mảng hiện tại */}
                  {filteredCourses.length}
                </span>{" "}
                courses
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.courseId}
                    id={course.courseId.toString()}
                    title={course.title}
                    instructor={course.ownedBy}
                    description={course.description}
                    price={course.price}
                    rating={course.vote}
                    reviewCount={0}
                    duration={`${course.duration}m`}
                    students={course.purchasedCount}
                    level={course.category}
                    imageUrl={course.coverUrl}
                    isInCart={course.isInCart}
                    isOwned={course.isOwned}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setPage(pageNumber)}
                          isActive={page === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            {/* Empty State */}
            {!loading && courses.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                No courses found matching your criteria.
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
