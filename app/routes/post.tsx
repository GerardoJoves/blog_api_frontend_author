import { postSchema } from '~/types';
import type { Route } from './+types/post';
import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_URL;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_HOST}/posts/${params.postId}`, {
    headers: { Authorization: token ? `bearer ${token}` : null },
  });
  const post = postSchema.parse(res.data);
  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <div className="p-4">
      <h1 className="text-lg mb-4">{post.title}</h1>
      <ul className="mb-4">
        <li>Published: {String(post.published)}</li>
        <li>Author: {post.author.username}</li>
        <li>Created at: {new Date(post.createdAt).toDateString()}</li>
        <li>Updated at: {new Date(post.updatedAt).toDateString()}</li>
      </ul>
      <div>{post.content}</div>
    </div>
  );
}
