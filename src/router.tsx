import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';
import { RootLayout } from './layouts/RootLayout';
import HomePage from './pages/home/HomePage';
import AuthPage from './pages/auth/AuthForm';
import ProfilePage from './pages/setings/SettingsPage';
import { useAuthStore } from './store/authStore';


const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
  beforeLoad: () => {
    if (useAuthStore.getState().session) {
      throw redirect({ to: '/profile' });
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

const routeTree = rootRoute.addChildren([indexRoute, authRoute, profileRoute]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}