import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { RootLayout } from './layouts/RootLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage'; 
import AuthPage from './pages/auth/AuthForm';
import ProfilePage from './pages/setings/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import LandingPage from './pages/home/LandingPage'; 
import { useAuthStore } from './store/authStore';

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent : NotFoundPage
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage, 
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage, 
  beforeLoad: () => {
    if (!useAuthStore.getState().session) {
      throw redirect({ to: '/auth' });
    }
  },
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
  beforeLoad: () => {
    if (useAuthStore.getState().session) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
  beforeLoad: () => {
    if (!useAuthStore.getState().session) {
      throw redirect({
        to: '/auth',
      });
    }
  },
});

const routeTree = rootRoute.addChildren([
    indexRoute, 
    dashboardRoute, 
    authRoute, 
    profileRoute
]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}