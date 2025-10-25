'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to register');
      await signIn('credentials', { email, password, redirect: true, callbackUrl: '/' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-md border dark:border-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create your account</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        We use Google to quickly create your account.
      </p>
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continue with Google
      </button>
      <div className="text-center text-gray-500 my-2">or</div>
      <form onSubmit={onRegister} className="space-y-3">
        <input
          className="w-full px-3 py-2 border dark:border-gray-700 rounded bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-blue-600 dark:text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
