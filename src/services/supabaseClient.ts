
import { createClient } from '@supabase/supabase-js';

// Verificamos se as variáveis existem e usamos valores padrão para desenvolvimento
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificamos se as chaves estão presentes antes de criar o cliente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis de ambiente do Supabase não configuradas. Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão definidas.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
