import axios from 'axios';
import type { Route } from './+types/createPost';
import * as z from 'zod';

import PostForm from '~/components/PostForm';
import { redirect } from 'react-router';

const API_HOST = import.meta.env.VITE_API_URL;

const postDataSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
  published: z.string().transform((val) => Boolean(val)),
});

const badRequestErrSchema = z.object({
  error: z.string(),
  detail: z.object({
    published: z.object({ msg: z.string() }).optional(),
    title: z.object({ msg: z.string() }).optional(),
    content: z.object({ msg: z.string() }).optional(),
  }),
});

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const values = postDataSchema.parse(formData);
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API_HOST}/posts`, values, {
    validateStatus: (status) => status < 500,
    headers: { Authorization: token ? `Bearer ${token}` : null },
  });

  if (res.status === 201) {
    return redirect(`/posts/${res.data.id}`);
  } else if (res.status === 400) {
    return badRequestErrSchema.parse(res.data);
  } else {
    throw new Error(res.data);
  }
}

export default function CreatePost({ actionData }: Route.ComponentProps) {
  return (
    <div>
      {actionData && (
        <div className="p-4">
          <p>{actionData.error}</p>
          <ul>
            {Object.entries(actionData.detail).map(([key, { msg }]) => (
              <li>
                {key}: {msg}
              </li>
            ))}
          </ul>
        </div>
      )}
      <PostForm />
    </div>
  );
}
