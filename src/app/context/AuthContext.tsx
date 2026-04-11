import { createContext, useContext, useState, ReactNode } from "react"
// Import hàm login thật từ file API của bạn (nhớ sửa lại đường dẫn cho đúng nhé)
import { login as apiLogin } from "../api/auth"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  // Sửa lại thành async function trả về Promise để UI (như trang Login) có thể bắt lỗi hoặc loading
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || null
  })

  const login = async (email: string, password: string) => {
    try {
      // Gọi API của bạn
      const response = await apiLogin({ email, password })

      if (response.success) {
        const loggedInUser = response.payload.user
        const jwtToken = response.payload.token

        setUser(loggedInUser)
        setToken(jwtToken)

        localStorage.setItem("user", JSON.stringify(loggedInUser))
        localStorage.setItem("token", jwtToken)
      } else {
        throw new Error(response.message || "Đăng nhập thất bại")
      }
    } catch (error: any) {
      console.error("Login Error:", error)
      // Ném lỗi ra ngoài để component Login có thể hiển thị thông báo cho user (vd: "Sai mật khẩu")
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
