
import { supabase } from './supabaseClient';
import { getCurrentUser } from './authService';

export interface UserProfile {
  id?: string;
  user_id: string;
  full_name: string;
  email: string;
  cpf: string;
  profession: string;
  monthly_expenses: number;
  created_at?: string;
  updated_at?: string;
}

// Buscar o perfil do usuário atual
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error("Nenhum usuário autenticado encontrado");
      return null;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', currentUser.id)
      .single();

    if (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil de usuário:", error);
    return null;
  }
};

// Criar ou atualizar o perfil do usuário
export const saveUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile | null> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error("Nenhum usuário autenticado encontrado");
      return null;
    }

    // Verificar se o perfil já existe
    const existingProfile = await getUserProfile();
    
    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          full_name: profile.full_name,
          email: profile.email,
          cpf: profile.cpf,
          profession: profile.profession,
          monthly_expenses: profile.monthly_expenses,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar perfil:", error);
        return null;
      }

      return data;
    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([
          { 
            user_id: currentUser.id,
            full_name: profile.full_name,
            email: profile.email,
            cpf: profile.cpf,
            profession: profile.profession,
            monthly_expenses: profile.monthly_expenses
          }
        ])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar perfil:", error);
        return null;
      }

      return data;
    }
  } catch (error) {
    console.error("Erro ao salvar perfil de usuário:", error);
    return null;
  }
};
