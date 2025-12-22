import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { RootLayout } from './layouts/RootLayout';
import AuthForm from './pages/auth/AuthForm'; 
import HomePage from './pages/home/HomePage';
import SettingsPage from './pages/setings/SettingsPage';


const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage  ,
});


const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthForm,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});


const routeTree = rootRoute.addChildren([indexRoute, authRoute, settingsRoute]);
export const router = createRouter({ routeTree });


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}