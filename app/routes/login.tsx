import type { Route } from './+types/login';
import axios from 'axios';
import { Form, redirect } from 'react-router';

import { loginResSchema } from '../types';

const API_HOST = import.meta.env.VITE_API_URL;

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const url = `${API_HOST}/users/login`;
  const userCredentials = {
    username: formData.username,
    password: formData.password,
  };
  const res = await axios.post(url, userCredentials, {
    validateStatus: (status) => status < 500,
  });
  const parsedRes = loginResSchema.parse(res.data);
  if ('error' in parsedRes) return parsedRes;
  localStorage.setItem('token', parsedRes.data.token);
  return redirect('/');
}

export default function Login({ actionData }: Route.ComponentProps) {
  const inputClasses = 'bg-white border-2 text-black';
  return (
    <div>
      <h1>login</h1>
      <Form method="post">
        <p>{actionData?.error && 'invalid username or password'}</p>
        <section>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className={inputClasses}
          />
        </section>
        <section>
          <label htmlFor="password">Username</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className={inputClasses}
          />
        </section>
        <button type="submit" className="hover:cursor-pointer">
          Submit
        </button>
      </Form>
    </div>
  );
}
