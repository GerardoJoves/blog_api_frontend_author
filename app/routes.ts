import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/defaultLayout.tsx', [
    index('routes/home.tsx'),
    ...prefix('/posts', [
      index('routes/posts.tsx'),
      route('/create', 'routes/createPost.tsx'),
      route('/:postId', 'routes/post.tsx'),
    ]),
    route('/login', 'routes/login.tsx'),
  ]),
] satisfies RouteConfig;
