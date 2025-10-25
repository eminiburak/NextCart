'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Hi, {session.user.name || session.user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Login with Google
    </button>
  );
}
