import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/defaultLayout.tsx', [
    index('routes/home.tsx'),
    route('/posts', 'routes/posts.tsx'),
    route('/posts/:postId', 'routes/post.tsx'),
    route('/login', 'routes/login.tsx'),
  ]),
] satisfies RouteConfig;
