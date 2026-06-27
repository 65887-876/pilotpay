import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { ScrollToHash } from './components/ui/ScrollToHash'
import { MetaPixel } from './components/MetaPixel'
import { AdminGuard } from './components/pages/admin/AdminGuard'
import App from './App.tsx'

const Apply = lazy(() => import('./components/pages/Apply.tsx').then((m) => ({ default: m.Apply })))
const ThankYou = lazy(() =>
  import('./components/pages/ThankYou.tsx').then((m) => ({ default: m.ThankYou })),
)
const NotEligible = lazy(() =>
  import('./components/pages/NotEligible.tsx').then((m) => ({ default: m.NotEligible })),
)
const Legal = lazy(() => import('./components/pages/Legal.tsx').then((m) => ({ default: m.Legal })))
const NotFound = lazy(() =>
  import('./components/pages/NotFound.tsx').then((m) => ({ default: m.NotFound })),
)
const AdminLogin = lazy(() =>
  import('./components/pages/admin/AdminLogin.tsx').then((m) => ({ default: m.AdminLogin })),
)
const AdminDashboard = lazy(() =>
  import('./components/pages/admin/AdminDashboard.tsx').then((m) => ({ default: m.AdminDashboard })),
)
const AdminApplicationDetail = lazy(() =>
  import('./components/pages/admin/AdminApplicationDetail.tsx').then((m) => ({
    default: m.AdminApplicationDetail,
  })),
)

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-bg">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MetaPixel />
        <ScrollToHash />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/not-eligible" element={<NotEligible />} />
            <Route path="/legal/:slug" element={<Legal />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminGuard />}>
              <Route index element={<AdminDashboard />} />
              <Route path="applications/:id" element={<AdminApplicationDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
