import { RouteConfigDeclaration } from '@/router';

const routes: RouteConfigDeclaration[] = [
  {
    name: 'home',
    path: '/',
    models: () => [import('./models')],
    component: () => import('./index'),
  },
];

export default routes;
