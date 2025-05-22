
import { createClient } from '@supabase/supabase-js';

// Verificamos se as variáveis existem
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Criamos um cliente mock para desenvolvimento quando as variáveis não estão disponíveis
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis de ambiente do Supabase não configuradas. Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão definidas.');
  
  // Criamos um objeto mock que não tentará fazer requisições reais ao Supabase
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          select: () => Promise.resolve({ data: null, error: null })
        }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        })
      }),
      eq: () => ({
        select: () => Promise.resolve({ data: null, error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      single: () => Promise.resolve({ data: null, error: null }),
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ 
        data: { 
          subscription: { 
            id: '0', 
            callback: () => {}, 
            unsubscribe: () => {} 
          } 
        } 
      }),
    }
  };
} else {
  // Se as variáveis existem, criamos um cliente real
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
