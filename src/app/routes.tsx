import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PromptsPage } from './pages/PromptsPage';
import { CoursesPage } from './pages/CoursesPage';
import { PromptDetailPage } from './pages/PromptDetailPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SuccessPage } from './pages/SuccessPage';
import { PurchaseHistoryPage } from './pages/PurchaseHistoryPage';
import { PricingPage } from './pages/PricingPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'prompts', Component: PromptsPage },
      { path: 'prompts/:id', Component: PromptDetailPage },
      { path: 'courses', Component: CoursesPage },
      { path: 'courses/:id', Component: CourseDetailPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'community', Component: CommunityPage },
      { path: 'cart', Component: CartPage },
      { path: 'checkout', Component: CheckoutPage },
      { path: 'success', Component: SuccessPage },
      { path: 'history', Component: PurchaseHistoryPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'about', Component: AboutPage },
      { path: 'privacy', Component: PrivacyPage },
      { path: 'terms', Component: TermsPage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignupPage,
  },
]);