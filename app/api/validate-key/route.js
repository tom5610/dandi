import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { apiKey } = await request.json();
    
    // Query Supabase to check if the API key exists and is valid
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
    //   .eq('is_active', true)
      .single();

    if (error) {
      return new Response(JSON.stringify({ message: 'Invalid API key' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (data) {
      return new Response(JSON.stringify({ message: 'Valid API key' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Invalid API key' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 