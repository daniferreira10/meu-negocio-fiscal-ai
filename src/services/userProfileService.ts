
import { supabase } from './supabaseClient';
import { getCurrentUser } from './authService';
import { 
  UserProfile, 
  PhysicalPersonProfile, 
  LegalPersonProfile,
  ProfileType,
  MaritalStatus,
  IncomeRange,
  RevenueRange
} from '@/types/userProfileTypes';
import { ClientInfo } from '@/types/clientInfoTypes';

// Re-exporte dos tipos para compatibilidade com código existente
export { 
  ProfileType, 
  MaritalStatus,
  IncomeRange,
  RevenueRange 
} from '@/types/userProfileTypes';
export type { 
  UserProfile, 
  PhysicalPersonProfile, 
  LegalPersonProfile 
} from '@/types/userProfileTypes';

// Determinar o tipo de perfil pelo ID do usuário
export const getProfileType = async (userId: string): Promise<ProfileType | null> => {
  try {
    // Verifica na tabela de perfis físicos
    const { data: physicalProfile } = await supabase
      .from('physical_person_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (physicalProfile) return ProfileType.PHYSICAL;
    
    // Verifica na tabela de perfis jurídicos
    const { data: legalProfile } = await supabase
      .from('legal_person_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (legalProfile) return ProfileType.LEGAL;
    
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
    
    if (profileType === ProfileType.PHYSICAL) {
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

      return {
        ...data,
        profile_type: ProfileType.PHYSICAL
      } as PhysicalPersonProfile;
    } else if (profileType === ProfileType.LEGAL) {
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

      return {
        ...data,
        profile_type: ProfileType.LEGAL
      } as LegalPersonProfile;
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

    // Verificar se os campos obrigatórios estão preenchidos
    if (!profile.full_name || !profile.cpf) {
      console.error("Campos obrigatórios não preenchidos");
      throw new Error("Campos obrigatórios não preenchidos");
    }

    // Modo de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Modo de desenvolvimento: simulando salvamento de perfil");
      // Simular sucesso no salvamento
      return {
        id: "mock-id",
        ...profile,
        profile_type: ProfileType.PHYSICAL,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as PhysicalPersonProfile;
    }

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('physical_person_profiles')
      .select('id')
      .eq('user_id', currentUser.id)
      .single();
    
    // Prepara os dados para salvar, garantindo que o user_id está correto
    const dataToSave = {
      ...profile,
      user_id: currentUser.id,
      profile_type: ProfileType.PHYSICAL // Garante o tipo correto
    };
    
    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('physical_person_profiles')
        .update({
          ...dataToSave,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar perfil físico:", error);
        return null;
      }

      return {
        ...data,
        profile_type: ProfileType.PHYSICAL
      } as PhysicalPersonProfile;
    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('physical_person_profiles')
        .insert([dataToSave])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar perfil físico:", error);
        return null;
      }

      return {
        ...data,
        profile_type: ProfileType.PHYSICAL
      } as PhysicalPersonProfile;
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

    // Verificar se os campos obrigatórios estão preenchidos
    if (!profile.company_name || !profile.cnpj) {
      console.error("Campos obrigatórios não preenchidos");
      throw new Error("Campos obrigatórios não preenchidos");
    }

    // Modo de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Modo de desenvolvimento: simulando salvamento de perfil jurídico");
      // Simular sucesso no salvamento
      return {
        id: "mock-id",
        ...profile,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as LegalPersonProfile;
    }

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('legal_person_profiles')
      .select('id')
      .eq('user_id', currentUser.id)
      .single();
    
    // Prepara os dados para salvar, garantindo que o user_id está correto
    const dataToSave = {
      ...profile,
      user_id: currentUser.id,
      profile_type: ProfileType.LEGAL // Garante o tipo correto
    };
    
    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('legal_person_profiles')
        .update({
          ...dataToSave,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar perfil jurídico:", error);
        return null;
      }

      return {
        ...data,
        profile_type: ProfileType.LEGAL
      } as LegalPersonProfile;
    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('legal_person_profiles')
        .insert([dataToSave])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar perfil jurídico:", error);
        return null;
      }

      return {
        ...data,
        profile_type: ProfileType.LEGAL
      } as LegalPersonProfile;
    }
  } catch (error) {
    console.error("Erro ao salvar perfil jurídico:", error);
    return null;
  }
};

// Nova função para salvar informações do cliente
export const saveClientInfo = async (
  clientInfo: Omit<ClientInfo, 'id' | 'created_at' | 'updated_at'>
): Promise<ClientInfo | null> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error("Nenhum usuário autenticado encontrado");
      return null;
    }

    // Verificar se os campos obrigatórios estão preenchidos
    if (!clientInfo.nome_completo) {
      console.error("Nome completo é obrigatório");
      throw new Error("Nome completo é obrigatório");
    }

    if (!clientInfo.cpf && !clientInfo.cnpj) {
      console.error("É necessário fornecer CPF ou CNPJ");
      throw new Error("É necessário fornecer CPF ou CNPJ");
    }

    // Modo de desenvolvimento sem Supabase configurado
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.log("Modo de desenvolvimento: simulando salvamento de informações do cliente");
      // Simular sucesso no salvamento
      return {
        id: "mock-id",
        ...clientInfo,
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as ClientInfo;
    }

    // Verificar se o perfil já existe
    const { data: existingClientInfo } = await supabase
      .from('client_info')
      .select('id')
      .eq('user_id', currentUser.id)
      .single();
    
    // Prepara os dados para salvar, garantindo que o user_id está correto
    const dataToSave = {
      ...clientInfo,
      user_id: currentUser.id
    };
    
    if (existingClientInfo) {
      // Atualizar informações existentes
      const { data, error } = await supabase
        .from('client_info')
        .update({
          ...dataToSave,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingClientInfo.id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar informações do cliente:", error);
        return null;
      }

      return data as ClientInfo;
    } else {
      // Criar novas informações
      const { data, error } = await supabase
        .from('client_info')
        .insert([dataToSave])
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar informações do cliente:", error);
        return null;
      }

      return data as ClientInfo;
    }
  } catch (error) {
    console.error("Erro ao salvar informações do cliente:", error);
    return null;
  }
};
