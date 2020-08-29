import { RouteConfigDeclaration } from '@/router';

const routes: RouteConfigDeclaration[] = [
  {
    name: 'page2',
    path: '/page2',
    models: () => [import('./models')],
    component: () => import('./index'),
  },
];

export default routes;
