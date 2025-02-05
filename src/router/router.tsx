import React from 'react';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import App from '../App';
import LandingPage from '../pages/LandingPage';
import SignInPage from '../pages/auth/signin';
import SignUpPage from '../pages/auth/signup';
import Dashboard from '../pages/home/dashboard';
import NotFoundPage from '../pages/notfound';
import PasswordRecoveryPage from '../pages/auth/passwordrecovery';
import Example from '../pages/example';
import OrganizationDashboard from '../pages/organization/index';
import OrganizationManagement from '../pages/organization/management';
import VacancyDashboard from '../pages/vacancy/index';
import Career from '../pages/ maintenance';
import UserDashboard from '../pages/user';
import CovenantPage from '../pages/covenant';
import Justify from '../pages/justifies';
import Schedule from '../pages/ schedule';
import { useAccessTokenData } from '../store/auth/store';
import { TokenData } from '../store/auth/type';
import Events from '../pages/events';
import Migrate from '../pages/migrate';
import UserSettings from '../pages/settings/user';
import ScheduleSettings from '../pages/settings/schedule';
import SubjectSettings from '../pages/settings/subject';
import BuildingSettings from '../pages/settings/buildings';
import DepartmentsSettings from '../pages/settings/departament';
import PeriodSettings from '../pages/settings/periodo';
import CareerSettings from '../pages/settings/career';

const rootRoute = new RootRoute();

const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <App Component={SignInPage} />,
});

const signUpRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth/signup',
  component: () => <App Component={SignUpPage} />,
});

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/LandingPage',
  component: () => <App Component={LandingPage} />,
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'home/dashboard',
  component: () => <App Component={Dashboard} />,
});

const justifyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'justify/dashboard',
  component: () => <App Component={Justify} />,
});

const scheduleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'schedule/dashboard',
  component: () => <App Component={Schedule} />,
});

const eventsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'events/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['DIRTECTOR_ACADEMICO', 'SUBDIRECTOR_ACADEMICO', 'JEFE_ACADEMICO'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={Events} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const migrateRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'migrate/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={Migrate} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/app/example',
  component: () => <App Component={Example} />,
});

const passwordRecoveryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth/passwordrecovery',
  component: () => <App Component={PasswordRecoveryPage} />,
});

const maintenanceRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/maintenance/dashboard',
  component: () => <App Component={Career} />,
});

const eventRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/event/dashboard',
  component: () => <App Component={Events} />,
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <App Component={NotFoundPage} />,
});

// RUTA DE USERS

const userDashboard = new Route({
  getParentRoute: () => rootRoute,
  path: '/user/dashboard',
  component: () => <App Component={UserDashboard} />,
});
// RUTAS DE ORGANIZACION
const organizationDashboard = new Route({
  getParentRoute: () => rootRoute,
  path: '/organization/dashboard',
  component: () => <App Component={OrganizationDashboard} />,
});

const organizationManagement = new Route({
  getParentRoute: () => rootRoute,
  path: '/organization/management',
  component: () => <App Component={OrganizationManagement} />,
});

const covenantRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/covenant/dashboard',
  component: () => <App Component={CovenantPage} />,
});

// RUTAS DE VACANTES
const vacancyDashboard = new Route({
  getParentRoute: () => rootRoute,
  path: '/vacancy/dashboard',
  component: () => <App Component={VacancyDashboard} />,
});

const userSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/users',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={UserSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const scheduleSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/schedule',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={ScheduleSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const subjectSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/subject',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={SubjectSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const buildingSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/building',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={BuildingSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const departamntSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/departamnt',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={DepartmentsSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const periodSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/period',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={PeriodSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const careerSettings = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings/career',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={CareerSettings} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const routeConfig = rootRoute.addChildren([
  landingRoute,
  dashboardRoute,
  homeRoute,
  signInRoute,
  signUpRoute,
  notFoundRoute,
  passwordRecoveryRoute,
  organizationDashboard,
  organizationManagement,
  vacancyDashboard,
  maintenanceRoute,
  userDashboard,
  covenantRoute,
  justifyRoute,
  scheduleRoute,
  eventsRoute,
  userSettings,
  scheduleSettings,
  subjectSettings,
  buildingSettings,
  departamntSettings,
  periodSettings,
  careerSettings,
  eventRoute,
]);

// Create the router using your route tree
const router = new Router({ routeTree: routeConfig });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;
