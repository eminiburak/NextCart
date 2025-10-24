import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { FirestoreAdapter } from '@auth/firebase-adapter'
import { getAdminDb } from '@/lib/firebaseAdmin'

export const runtime = 'nodejs'

// ✅ Required: environment variables in .env.local
// TODO(auth): Provide valid GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET and Firebase Admin
// service account vars. If Google sign-in fails with UNAUTHENTICATED (code 16),
// regenerate the service account key and ensure roles (Datastore User, Token Creator).
export const authOptions = {
  adapter: FirestoreAdapter({
    firestore: getAdminDb(),
  }),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Optional: Basic email/password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { getAdminDb } = await import('@/lib/firebaseAdmin')
          const { compare } = await import('bcryptjs')
          const db = getAdminDb()
          const snap = await db.collection('users').where('email', '==', credentials.email).limit(1).get()
          if (snap.empty) return null
          const doc = snap.docs[0]
          const user = doc.data()
          const ok = await compare(credentials.password, user.password)
          if (!ok) return null
          return { id: doc.id, name: user.name || null, email: user.email }
        } catch (e) {
          console.error('Credentials authorize error:', e)
          return null
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
