import { createBrowserRouter, Outlet } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { Layout } from "./components/Layout"
import { LandingPage } from "./pages/LandingPage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { PromptsPage } from "./pages/PromptsPage"
import { CoursesPage } from "./pages/CoursesPage"
import { PromptDetailPage } from "./pages/PromptDetailPage"
import { CourseDetailPage } from "./pages/CourseDetailPage"
import { CartPage } from "./pages/CartPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { SuccessPage } from "./pages/SuccessPage"
import { PurchaseHistoryPage } from "./pages/PurchaseHistoryPage"
import { CommunityPage } from "./pages/CommunityPage"
import { ProfilePage } from "./pages/ProfilePage"
import { AboutPage } from "./pages/AboutPage"
import { PrivacyPage } from "./pages/PrivacyPage"
import { TermsPage } from "./pages/TermsPage"
import { MyLearningPage } from "./pages/MyLearningPage"
import { CourseLearningPage } from "./pages/CourseLearningPage"
import { VNPayReturnPage } from "./pages/VNReturnPage"

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Layout, 
        children: [
          { index: true, Component: LandingPage },
          { path: "prompts", Component: PromptsPage },
          { path: "prompts/:id", Component: PromptDetailPage },
          { path: "courses", Component: CoursesPage },
          { path: "courses/:id", Component: CourseDetailPage },
          { path: "community", Component: CommunityPage },
          { path: "cart", Component: CartPage },
          { path: "checkout", Component: CheckoutPage },
          { path: "success", Component: SuccessPage },
          { path: "history", Component: PurchaseHistoryPage },
          { path: "profile", Component: ProfilePage },
          { path: "vnpay_return", Component: VNPayReturnPage },
          { path: "about", Component: AboutPage },
          { path: "privacy", Component: PrivacyPage },
          { path: "terms", Component: TermsPage },
          { path: "my-learning", Component: MyLearningPage },
        ],
      },
      {
        path: "/my-learning/:id",
        Component: CourseLearningPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignupPage,
      },
    ],
  },
])