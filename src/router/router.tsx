import React from 'react';
import { Router, Route, RootRoute } from '@tanstack/react-router';
import App from '../App';
import SignInPage from '../pages/auth/signin';
import SignUpPage from '../pages/auth/signup';
import Dashboard from '../pages/home/dashboard';
import NotFoundPage from '../pages/notfound';
import PasswordRecoveryPage from '../pages/auth/passwordrecovery';
import PasswordConfirmPage from '../pages/auth/passwordconfirm';
import Career from '../pages/ maintenance';
import UserDashboard from '../pages/user';
import Justify from '../pages/justifies';
import Schedule from '../pages/ schedule';
import { useAccessTokenData } from '../store/auth/store';
import { TokenData } from '../store/auth/type';
import Events from '../pages/events';
import UserProfile from '../pages/user/profile';
import ScheduleSettings from '../pages/settings/schedule';
import SubjectSettings from '../pages/settings/subject';
import BuildingSettings from '../pages/settings/buildings';
import DepartmentsSettings from '../pages/settings/departament';
import PeriodSettings from '../pages/settings/periodo';
import CareerSettings from '../pages/settings/career';
import classroomsSettings from '../pages/settings/classroom';
import groupSettings from '../pages/settings/group';

const rootRoute = new RootRoute();

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <App Component={SignInPage} />,
});

const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth/signin',
  component: () => <App Component={SignInPage} />,
});

const signUpRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth/signup',
  component: () => <App Component={SignUpPage} />,
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'home/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = [
      'DIRECTOR_ACADEMICO',
      'SUBDIRECTOR_ACADEMICO',
      'JEFE_ACADEMICO',
      'SUPER_ADMINISTRATOR',
      'DOCENTE',
    ];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={Dashboard} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const classroomRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'settings/classroom',
  component: () => <App Component={classroomsSettings} />,
});

const groupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'settings/group',
  component: () => <App Component={groupSettings} />,
});

const userDashboard = new Route({
  getParentRoute: () => rootRoute,
  path: '/user/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={UserDashboard} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const scheduleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'schedule/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR', 'SUBDIRECTOR_ACADEMICO', 'JEFE_ACADEMICO'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={Schedule} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const justifyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'justify/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = ['SUPER_ADMINISTRATOR', 'DOCENTE', 'RECURSOS_HUMANOS', 'JEFE_ACADEMICO'];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={Justify} />;
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

const passwordConfirmRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth/confirm',
  component: () => <App Component={PasswordConfirmPage} />,
});

const maintenanceRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/maintenance/dashboard',
  component: () => <App Component={Career} />,
});

const eventRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/event/dashboard',
  component: () => {
    const { roles } = useAccessTokenData() as TokenData;
    const allowedroles = [
      'DIRECTOR_ACADEMICO',
      'SUBDIRECTOR_ACADEMICO',
      'JEFE_ACADEMICO',
      'SUPER_ADMINISTRATOR',
    ];

    if (allowedroles.some((role) => roles.includes(role))) {
      return <App Component={Events} />;
    }
    return <App Component={NotFoundPage} />;
  },
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <App Component={NotFoundPage} />,
});

const userProfile = new Route({
  getParentRoute: () => rootRoute,
  path: '/me/profile',
  component: () => <App Component={UserProfile} />,
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
  path: '/settings/department',
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
  passwordConfirmRoute,
  userProfile,
  maintenanceRoute,
  userDashboard,
  justifyRoute,
  scheduleRoute,
  scheduleSettings,
  subjectSettings,
  buildingSettings,
  departamntSettings,
  periodSettings,
  careerSettings,
  classroomRoute,
  groupRoute,
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
