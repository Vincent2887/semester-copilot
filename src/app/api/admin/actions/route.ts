import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, isPremium } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Missing target User ID.' }, { status: 400 });
    }

    // Calculate dynamic MRR contribution value based on selection
    const targetContribution = isPremium ? 299.00 : 0.00;

    const { error } = await supabase
      .from('profiles')
      .update({ 
        is_premium: isPremium,
        mrr_contribution: targetContribution
      })
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'User tier modified successfully.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}