
import { supabase } from './supabaseClient';
import { getCurrentUser } from './authService';

export interface PhysicalPersonProfile {
  id?: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  birth_date: string;
  cpf: string;
  address_street: string;
  address_number: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  marital_status: string;
  dependents_count: number;
  profession: string;
  monthly_income: number;
  monthly_expenses: number;
  assets: any;
  debts: any;
  other_income_sources: any;
  main_bank_account: string;
  tax_return_info: string;
  created_at?: string;
  updated_at?: string;
}

export interface LegalPersonProfile {
  id?: string;
  user_id: string;
  company_name: string;
  cnpj: string;
  legal_representative: string;
  email: string;
  phone: string;
  address_street: string;
  address_number: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  legal_nature: string;
  tax_regime: string;
  cnae_code: string;
  monthly_revenue: number;
  employees_count: number;
  average_payroll: number;
  fixed_expenses: number;
  variable_expenses: number;
  bank_accounts: any;
  issues_invoices: boolean;
  invoice_type: string;
  tax_status: string;
  public_debts: any;
  current_accounting_info: string;
  created_at?: string;
  updated_at?: string;
}

export type UserProfile = PhysicalPersonProfile | LegalPersonProfile;

// Determinar o tipo de perfil pelo ID do usuário
export const getProfileType = async (userId: string): Promise<'physical' | 'legal' | null> => {
  try {
    // Verifica na tabela de perfis físicos
    const { data: physicalProfile } = await supabase
      .from('physical_person_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (physicalProfile) return 'physical';
    
    // Verifica na tabela de perfis jurídicos
    const { data: legalProfile } = await supabase
      .from('legal_person_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (legalProfile) return 'legal';
    
    return null;
  } catch (error) {
    console.error("Erro ao determinar tipo de perfil:", error);
    return null;
  }
};

// Buscar o perfil do usuário atual
export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error("Nenhum usuário autenticado encontrado");
      return null;
    }

    // Determina o tipo de perfil
    const profileType = await getProfileType(currentUser.id);
    
    if (profileType === 'physical') {
      // Busca perfil de pessoa física
      const { data, error } = await supabase
        .from('physical_person_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil físico:", error);
        return null;
      }

      return data as PhysicalPersonProfile;
    } else if (profileType === 'legal') {
      // Busca perfil de pessoa jurídica
      const { data, error } = await supabase
        .from('legal_person_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil jurídico:", error);
        return null;
      }

      return data as LegalPersonProfile;
    }
    
    return null;
  } catch (error) {
    console.error("Erro ao buscar perfil de usuário:", error);
    return null;
  }
};

// Salvar perfil de pessoa física
export const savePhysicalPersonProfile = async (
  profile: Omit<PhysicalPersonProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<PhysicalPersonProfile | null> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error("Nenhum usuário autenticado encontrado");
      return null;
    }

    // Modo de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Modo de desenvolvimento: simulando salvamento de perfil");
      // Simular sucesso no salvamento
      return {
        id: "mock-id",
        user_id: currentUser.id,
        ...profile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('physical_person_profiles')
      .select('id')
      .eq('user_id', currentUser.id)
      .single();
    
    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('physical_person_profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar perfil físico:", error);
        return null;
      }

      return data as PhysicalPersonProfile;
    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('physical_person_profiles')
        .insert([{ ...profile, user_id: currentUser.id }])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar perfil físico:", error);
        return null;
      }

      return data as PhysicalPersonProfile;
    }
  } catch (error) {
    console.error("Erro ao salvar perfil físico:", error);
    return null;
  }
};

// Salvar perfil de pessoa jurídica
export const saveLegalPersonProfile = async (
  profile: Omit<LegalPersonProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<LegalPersonProfile | null> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error("Nenhum usuário autenticado encontrado");
      return null;
    }

    // Modo de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Modo de desenvolvimento: simulando salvamento de perfil jurídico");
      // Simular sucesso no salvamento
      return {
        id: "mock-id",
        user_id: currentUser.id,
        ...profile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('legal_person_profiles')
      .select('id')
      .eq('user_id', currentUser.id)
      .single();
    
    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('legal_person_profiles')
        .update({
          ...profile,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar perfil jurídico:", error);
        return null;
      }

      return data as LegalPersonProfile;
    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('legal_person_profiles')
        .insert([{ ...profile, user_id: currentUser.id }])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar perfil jurídico:", error);
        return null;
      }

      return data as LegalPersonProfile;
    }
  } catch (error) {
    console.error("Erro ao salvar perfil jurídico:", error);
    return null;
  }
};
