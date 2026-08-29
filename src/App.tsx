import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";
import { trackPageView } from "./utils/analytics";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicLayout } from "./layouts/PublicLayout";
import PlaceholderPage from "./pages/PlaceholderPage";

// Route-level code splitting: each page ships as its own chunk instead of one ~570kB bundle,
// so a visitor only downloads the JS for the page they actually land on.
const HomePage = lazy(() => import("./pages/HomePage"));
const ITAuditPage = lazy(() => import("./pages/ITAuditPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ClientDashboardPage = lazy(() => import("./pages/dashboard/ClientDashboardPage"));
const ServicesOverviewPage = lazy(() => import("./pages/services/ServicesOverviewPage"));
const ServiceDetailPage = lazy(() => import("./pages/services/ServiceDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/legal/TermsPage"));
const CookiePolicyPage = lazy(() => import("./pages/legal/CookiePolicyPage"));

function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    // Deferred so it fires after the destination page's own Seo effect has set document.title.
    const id = setTimeout(() => {
      trackPageView(location.pathname + location.search);
    }, 0);
    return () => clearTimeout(id);
  }, [location.pathname, location.search]);
  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-[var(--color-signal-400)]" size={28} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteChangeTracker />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/it-audit" element={<ITAuditPage />} />

              <Route path="/services" element={<ServicesOverviewPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />

              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/faq" element={<FaqPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ClientDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard/profile" element={<PlaceholderPage title="Profile" />} />
              <Route path="/dashboard/requests" element={<PlaceholderPage title="Requests" />} />
              <Route path="/dashboard/tickets" element={<PlaceholderPage title="Support Tickets" />} />
              <Route path="/dashboard/appointments" element={<PlaceholderPage title="Appointments" />} />
              <Route path="/dashboard/documents" element={<PlaceholderPage title="Documents" />} />

              <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you're looking for doesn't exist." />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
