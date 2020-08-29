import { RouteConfigDeclaration } from '@/router';

const routes: RouteConfigDeclaration[] = [
  {
    name: 'page1',
    path: '/page1',
    models: () => [import('./models')],
    component: () => import('./index'),
  },
];

export default routes;
