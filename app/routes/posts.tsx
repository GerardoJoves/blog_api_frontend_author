import { Link } from 'react-router';
import type { Route } from './+types/posts';
import axios from 'axios';
import { useContext } from 'react';

import { postsResSechema } from '~/types';
import UserContext from '~/UserContext';

const API_HOST = import.meta.env.VITE_API_URL;

export async function clientLoader({ request }: Route.ClientActionArgs) {
  const url = new URL(request.url);
  const { page = 1, published } = Object.fromEntries(url.searchParams);
  const token = localStorage.getItem('token');
  const res = await axios.get(API_HOST + '/posts', {
    params: { page: page, published },
    headers: { Authorization: token ? `bearer ${token}` : null },
  });
  return postsResSechema.parse(res.data);
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  const { posts, page, totalPosts, pageSize } = loaderData;
  const user = useContext(UserContext);

  return (
    <div className="p-4">
      <h1>Posts</h1>
      {(!user || user.role !== 'ADMIN') && (
        <p>
          You must <Link to="/login">Log in</Link> as an ADMIN user to access
          unpublished posts
        </p>
      )}
      <div className="mb-10">
        <ul>
          <li>Total number of posts: {totalPosts}</li>
          <li>Current page: {page}</li>
          <li>Page size: {pageSize} posts per page</li>
        </ul>
        <div className="flex gap-4">
          {page > 1 && (
            <Link to={`?page=${page - 1}`}>Go to previous page</Link>
          )}
          <Link to={`?page=${page + 1}`}>Go to next page</Link>
        </div>
        {user && user.role === 'ADMIN' && (
          <div>
            <ul>
              <li>
                <Link to="/posts">view all posts</Link>
              </li>
              <li>
                <Link to="/posts?published=true">
                  View only published posts
                </Link>
              </li>
              <li>
                <Link to="/posts?published=false">
                  View only unpublished posts
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {posts.length > 0 ? (
        <ul>
          {posts.map((p) => (
            <li key={p.id} className="mb-4 border-b border-white">
              <Link to={`/posts/${p.id}`} className="hover:cursor-pointer">
                <div className="flex gap-4">
                  <p className="grow">{p.title}</p>
                  <p className="min-w-max">Published: {String(p.published)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no posts in this page</p>
      )}
    </div>
  );
}
