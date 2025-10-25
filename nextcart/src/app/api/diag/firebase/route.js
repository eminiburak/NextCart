import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = getAdminDb();
    const docRef = db.collection('health').doc('ping');
    await docRef.set({ updatedAt: Date.now() }, { merge: true });
    const snap = await docRef.get();
    return NextResponse.json({
      ok: true,
      exists: snap.exists,
      projectIdSet: !!process.env.FIREBASE_PROJECT_ID,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
