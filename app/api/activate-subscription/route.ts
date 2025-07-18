import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Upsert subscription for this user
  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: user.id,
      status: 'active',
      updated_at: new Date().toISOString(),
    }, { onConflict: ['user_id'] });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
} 