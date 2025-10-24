import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">You need to sign in</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Access your profile and shopping cart after signing in.</p>
        <Link href="/auth/signin" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="rounded border dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
  {session.user?.image && (
    <img
      src={session.user.image}
      alt={session.user.name || 'Profile picture'}
      className="w-24 h-24 rounded-full mx-auto mb-4"
    />
  )}
  <p className="mb-1"><span className="font-semibold">Name:</span> {session.user?.name || 'N/A'}</p>
  <p className="mb-1"><span className="font-semibold">Email:</span> {session.user?.email}</p>
</div>

    </div>
  )
}
