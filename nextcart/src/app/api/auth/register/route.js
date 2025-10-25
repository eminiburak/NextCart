import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = getAdminDb();
    const users = db.collection('users');

    const existing = await users.where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const doc = await users.add({
      name: name || null,
      email,
      password: hashed,
      createdAt: Date.now(),
      provider: 'credentials',
    });

    return NextResponse.json({ id: doc.id, email }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: err?.message || 'Internal Server Error' }, { status: 500 });
  }
}
