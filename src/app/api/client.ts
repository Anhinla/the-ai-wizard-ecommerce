import axios, { InternalAxiosRequestConfig, AxiosError } from "axios"

export const apiClientUser = axios.create({
  baseURL: `http://localhost:3000/api/users/`,
  headers: {
    "Content-Type": "application/json",
  },
})

export const apiClientCourse = axios.create({
  baseURL: `http://localhost:3000/api/courses/`,
  headers: {
    "Content-Type": "application/json",
  },
})

export const apiClientPrompt = axios.create({
  baseURL: `http://localhost:3000/api/prompts/`,
  headers: {
    "Content-Type": "application/json",
  },
})
export const apiClientCart = axios.create({
  baseURL: `http://localhost:3000/api/cart/`,
  headers: {
    "Content-Type": "application/json",
  },
})
export const apiClientOrder = axios.create({
  baseURL: `http://localhost:3000/api/orders/`,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface APIResponse<T = any> {
  success: boolean
  code: number
  message: string
  payload: T
}

export interface PaginatedPayload<T> {
  page: number
  size: number
  total: number
  data: T[]
  extra?: Record<string, any>
}

// ✅ Sửa lại forceLogout
export const forceLogout = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  window.location.href = "/login"
}

// ✅ Sửa lại requestInterceptor
const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

apiClientUser.interceptors.request.use(requestInterceptor)
apiClientCourse.interceptors.request.use(requestInterceptor)
apiClientPrompt.interceptors.request.use(requestInterceptor)
apiClientCart.interceptors.request.use(requestInterceptor)
apiClientOrder.interceptors.request.use(requestInterceptor)

const responseInterceptorSuccess = (response: any) => {
  if (response.data && response.data.message === "token-expired") {
    forceLogout()
  }
  return response
}

const responseInterceptorError = (error: AxiosError<any>) => {
  if (
    error.response?.status === 401 ||
    error.response?.data?.message === "token-expired"
  ) {
    forceLogout()
  }

  return Promise.reject(error)
}

apiClientUser.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError,
)

apiClientCourse.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError,
)

apiClientPrompt.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError,
)
apiClientCart.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError,
)
apiClientOrder.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError,
)
