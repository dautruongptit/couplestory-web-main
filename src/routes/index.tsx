import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { ProtectedRoute, AdminRoute, GuestOnlyRoute } from '@/components/guards/RouteGuards';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import PricingResponsive from '@/pages/PricingResponsive';
import TemplatesGallery from '@/pages/TemplatesGallery';
import CreateType from '@/pages/CreateType';
import Dashboard from '@/pages/Dashboard';
import DashboardUpgrade from '@/pages/DashboardUpgrade';
import Checkout from '@/pages/Checkout';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import AdminUsers from '@/pages/AdminUsers';
import AdminRevenue from '@/pages/AdminRevenue';
import Account from '@/pages/Account';
import NotFound404 from '@/pages/NotFound404';
import Forbidden403 from '@/pages/Forbidden403';
import { EternalLovePage, MinimalCouplePage } from '@/templates/TemplateEternalLoveResponsive';
import DynamicStoryTemplate from '@/templates/DynamicStoryTemplate';
import TemplatePreview from '@/pages/TemplatePreview';
import StoryEditor from '@/pages/StoryEditor';
import StoryPreview from '@/pages/StoryPreview';
import StoryPublished from '@/pages/StoryPublished';
import PublicStory from '@/pages/PublicStory';

export const router = createBrowserRouter([
  // ── Public – with Navbar/Footer ──────────────────────────
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'templates', element: <TemplatesGallery /> },
      { path: 'pricing',   element: <PricingResponsive /> },
      { path: 'create',    element: <ProtectedRoute><CreateType /></ProtectedRoute> },
    ],
  },

  // ── Auth pages – guest only ───────────────────────────────
  { path: '/login',           element: <GuestOnlyRoute><Login /></GuestOnlyRoute> },
  { path: '/register',        element: <GuestOnlyRoute><Register /></GuestOnlyRoute> },
  { path: '/forgot-password', element: <GuestOnlyRoute><ForgotPassword /></GuestOnlyRoute> },

  // ── Protected – Dashboard & Admin (with DashboardLayout) ───────────
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard',         element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'dashboard/upgrade', element: <ProtectedRoute><DashboardUpgrade /></ProtectedRoute> },
      
      { path: 'admin',             element: <Navigate to="/admin/users" replace /> },
      { path: 'admin/users',       element: <AdminRoute><AdminUsers /></AdminRoute> },
      { path: 'admin/revenue',     element: <AdminRoute><AdminRevenue /></AdminRoute> },
    ],
  },

  // ── Protected – standalone ────────────────────────────────
  { path: '/account',           element: <ProtectedRoute><Account /></ProtectedRoute> },
  { path: '/checkout',          element: <ProtectedRoute><Checkout /></ProtectedRoute> },
  { path: '/checkout/success',  element: <ProtectedRoute><CheckoutSuccess /></ProtectedRoute> },

  // ── Public story templates ────────────────────────────────
  { path: '/s/eternal', element: <EternalLovePage /> },
  { path: '/s/minimal', element: <MinimalCouplePage /> },
  { path: '/preview/:templateCode', element: <TemplatePreview /> },
  { path: '/demo/:scenarioId', element: <DynamicStoryTemplate /> },
  { path: '/editor/:scenarioId', element: <ProtectedRoute><StoryEditor /></ProtectedRoute> },
  { path: '/editor/:scenarioId/preview', element: <ProtectedRoute><StoryPreview /></ProtectedRoute> },
  { path: '/editor/:scenarioId/published', element: <ProtectedRoute><StoryPublished /></ProtectedRoute> },
  { path: '/s/:slug', element: <PublicStory /> },

  // ── Error pages ───────────────────────────────────────────
  { path: '/403', element: <Forbidden403 /> },
  { path: '*',    element: <NotFound404 /> },
]);
