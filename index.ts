import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const auth = req.headers.get('Authorization');
  if (!auth) return json({ error: 'No autorizado' }, 401);
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data: userData, error: authError } = await db.auth.getUser(auth.replace('Bearer ', ''));
  if (authError || userData.user?.email !== Deno.env.get('ADMIN_EMAIL')) return json({ error: 'No autorizado' }, 401);

  const { token } = await req.json();
  if (typeof token !== 'string') return json({ error: 'Token inválido' }, 400);
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  const hash = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  const { data, error } = await db.rpc('check_in_ticket', { p_token_hash: hash, p_operator: userData.user.email });
  if (error) return json({ error: 'No se pudo validar el acceso' }, 500);
  return json(data?.[0] ?? { success: false, message: 'Error inesperado' });
});
