import { apiClientCourse, APIResponse, PaginatedPayload } from "./client"

export interface CourseParams {
  page: number
  size: number
  category: string | null
  sort_field: string | null
  sort_order: "asc" | "desc" | null
  min_vote: number
}

export interface CourseProps {
  courseId: number
  title: string
  description: string
  ownedBy: string
  coverUrl: string
  category: string
  price: number
  vote: number
  purchasedCount: number
  duration: number
  isInCart: boolean
  isOwned: boolean
}
export interface LessonProps {
  lessonId: number
  courseId: number
  title: string
  description: string
  category: string
  duration: number
  contentUrl: string
  isCompleted: boolean
}
export interface CourseLearningDetailProps extends CourseProps {
  progressPercentage: number
  completedLessonsCount: number
  totalLessonsCount: number
  lessons: LessonProps[]
}

export const getCourses = async (
  params: CourseParams,
): Promise<APIResponse<PaginatedPayload<CourseProps>>> => {
  const response = await apiClientCourse.get("/", {
    params: params,
  })
  return response.data
}

export const getCourseById = async (
  courseId: number,
): Promise<APIResponse<CourseProps>> => {
  const response = await apiClientCourse.get(`/${courseId}`)
  return response.data
}

export const getCourseCategories = async (): Promise<APIResponse> => {
  const response = await apiClientCourse.get("/categories")
  return response.data
}

export const getOwnedCourses = async (): Promise<
  APIResponse<CourseProps[]>
> => {
  const response = await apiClientCourse.get("/owned")
  return response.data
}

export const getCourseLearningDetail = async (
  courseId: string | number,
): Promise<APIResponse<CourseLearningDetailProps>> => {
  const response = await apiClientCourse.get(`/${courseId}/learn`)
  return response.data
}