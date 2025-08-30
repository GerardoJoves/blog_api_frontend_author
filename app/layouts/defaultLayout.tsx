import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { jwtDecode } from 'jwt-decode';

import { userTokenPayloadSchema, type User } from '~/types';
import UserContext from '~/UserContext';

export default function DefaultLayout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const decodedJwt = jwtDecode(token);
    const { sub, username, role } = userTokenPayloadSchema.parse(decodedJwt);
    setUser({ id: sub, username, role });
  }, []);

  return (
    <>
      <header className="mb-10 border-b border-white p-4">
        <nav>
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/posts/create">Create post</Link>
            </li>
          </ul>
        </nav>
        <p>Current user:</p>
        {user ? (
          <ul>
            <li>User role: {user.role}</li>
            <li>Username: {user.username}</li>
          </ul>
        ) : (
          'No user'
        )}
      </header>
      <main>
        <UserContext value={user}>
          <Outlet />
        </UserContext>
      </main>
    </>
  );
}
