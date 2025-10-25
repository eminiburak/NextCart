import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import ProfileExtras from '@/components/ProfileExtras';
import Image from 'next/image';
import CartProvider from '@/context/CartContext';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold mb-2">You need to sign in</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Access your profile and shopping cart after signing in.
        </p>
        <Link
          href="/auth/signin"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="rounded border dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'Profile picture'}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <p className="mb-1">
          <span className="font-semibold">Name:</span> {session.user?.name || 'N/A'}
        </p>
        <p className="mb-1">
          <span className="font-semibold">Email:</span> {session.user?.email}
        </p>
      </div>
      <CartProvider>
        <ProfileExtras />
      </CartProvider>
    </div>
  );
}
