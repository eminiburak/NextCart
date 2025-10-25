'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
      if (res?.error) setError(res.error);
    } finally {
      setLoading(false);
    }
  };

  const urlParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const callbackError = urlParams?.get('error');
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-md border dark:border-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue with Google
      </button>
      <div className="text-center text-gray-500 dark:text-gray-400 my-2">or</div>
      {callbackError && <p className="text-red-600 text-sm mb-2">{callbackError}</p>}
      <form onSubmit={onCredentials} className="space-y-3">
        <input
          className="w-full px-3 py-2 border dark:border-gray-700 rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border dark:border-gray-700 rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        New here?{' '}
        <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
