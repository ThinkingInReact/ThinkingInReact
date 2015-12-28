import App from 'containers//App';
import Landing from 'components//Landing';
import Chapter from 'components//Chapter';

const routes = [
  { path: '/',
    component: App,
    indexRoute: { component: Landing },
    childRoutes: [
      {
        path: '/:chapter',
        component: Chapter
      },
      {
        path: '/:chapter/:subchapter',
        component: Chapter
      }
    ]
  }
];

export default routes;
