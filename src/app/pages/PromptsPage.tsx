import { FilterSidebar } from "../components/FilterSidebar"
import { PromptCard } from "../components/PromptCard" // Đảm bảo PromptCard cũng đã bỏ hiển thị giá
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import {
  Search,
  SlidersHorizontal,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom" // Thêm navigate để chuyển trang

// Import API
import { getPrompts, PromptProps, PromptParams } from "../api/prompt"

// Import Shadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"

export function PromptsPage() {
  const navigate = useNavigate()


  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(true)


  const [prompts, setPrompts] = useState<PromptProps[]>([])
  const [loading, setLoading] = useState(true)

  
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minVote, setMinVote] = useState<number>(0)
  const [sortOption, setSortOption] = useState<string>("Popularity")


  useEffect(() => {
    const fetchPromptsData = async () => {
      setLoading(true)
      try {
        let sortField = ""
        let sortOrder: "asc" | "desc" = "desc"

        if (sortOption === "Popularity") {
          sortField = "purchasedCount" // Hoặc field tương đương đo độ phổ biến
          sortOrder = "desc"
        } else if (sortOption === "Rating") {
          sortField = "vote"
          sortOrder = "desc"
        }

        const params: PromptParams = {
          page: page,
          size: 9,
          category: selectedCategories.join(","),
          sort_field: sortField,
          sort_order: sortOrder,
          min_vote: minVote,
        }

        const response = await getPrompts(params)

        const fetchedPrompts = response.payload?.data || []
        const totalItems = response.payload?.total || 0

        setPrompts(fetchedPrompts)
        setTotalPages(Math.ceil(totalItems / 9)) // Đổi thành 9 cho khớp với 'size: 9'
      } catch (error) {
        console.error("Error fetching prompts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPromptsData()
  }, [page, selectedCategories, minVote, sortOption])

  // Filter Handlers
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
    setPage(1)
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

  // Frontend Search Filter
  const filteredPrompts = prompts.filter((prompt) =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen">
      {/* Header - Thiết kế lại để nhấn mạnh tính chất MIỄN PHÍ */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                100% Free Library
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">
                Free AI Prompt Library
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                Explore our curated collection of free, high-quality prompts.
                Copy, adapt, and supercharge your AI workflows instantly. 
              </p>

              {/* Search */}
              <div className="flex gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search free prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
                <Button
                  variant="outline"
                  className="md:hidden h-11"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* UPSELL BANNER (Phễu marketing sang Course) */}
            <div className="w-full md:w-80 p-6 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="font-semibold text-lg mb-2">
                Want to create your own?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Stop copying. Start engineering. Learn the frameworks behind
                these prompts in our masterclasses.
              </p>
              <Button
                onClick={() => navigate("/courses")}
                className="w-full group"
              >
                Browse Courses
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
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
                type="prompts"
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
                  {filteredPrompts.length}
                </span>{" "}
                free prompts
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.courseId}
                    id={prompt.courseId.toString()}
                    title={prompt.title}
                    description={prompt.description}
                    rating={prompt.vote}
                    reviewCount={0}
                    purchases={prompt.purchasedCount} // Có thể đổi label trong PromptCard thành "Downloads"
                    category={prompt.category}
                    featured={false}
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
            {!loading && prompts.length === 0 && (
              <p className="mt-12 text-center text-muted-foreground">
                No free prompts found matching your criteria.
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
