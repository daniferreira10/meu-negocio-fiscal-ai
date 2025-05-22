
interface CNPJResponse {
  status: string;
  nome: string;
  fantasia: string;
  atividade_principal: Array<{
    code: string;
    text: string;
  }>;
  situacao: string;
  data_abertura: string;
  endereco: string;       // Already has endereco instead of logradouro
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  message?: string;
  // The API doesn't return numero separately, it's part of endereco
}

/**
 * Consulta os dados de um CNPJ na API da Receita Federal
 * @param cnpj CNPJ a ser consultado (com ou sem formatação)
 * @returns Dados do CNPJ ou null em caso de erro
 */
export const consultarCNPJ = async (cnpj: string): Promise<CNPJResponse> => {
  // Remove tudo que não for número
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');

  if (cnpjLimpo.length !== 14) {
    throw new Error("CNPJ inválido. Deve conter 14 dígitos.");
  }

  try {
    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`);
    const data = await response.json();

    if (data.status === "ERROR") {
      throw new Error(data.message || "Erro na consulta do CNPJ");
    }

    return data;
  } catch (error) {
    console.error("Erro na consulta do CNPJ:", error);
    throw new Error(typeof error === 'string' ? error : "Erro na consulta do CNPJ");
  }
};

/**
 * Formata um CNPJ para o padrão 00.000.000/0000-00
 * @param cnpj CNPJ sem formatação
 * @returns CNPJ formatado
 */
export const formatarCNPJ = (cnpj: string): string => {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  
  if (cnpjLimpo.length !== 14) {
    return cnpj; // Retorna sem formatação se não tiver 14 dígitos
  }
  
  // Aplica a máscara de CNPJ: 00.000.000/0000-00
  return cnpjLimpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

/**
 * Valida se um CNPJ é válido (implementação do algoritmo de validação)
 * @param cnpj CNPJ a ser validado
 * @returns true se o CNPJ for válido, false caso contrário
 */
export const validarCNPJ = (cnpj: string): boolean => {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  
  if (cnpjLimpo.length !== 14) {
    return false;
  }
  
  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpjLimpo)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  let tamanho = cnpjLimpo.length - 2;
  let numeros = cnpjLimpo.substring(0, tamanho);
  const digitos = cnpjLimpo.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }
  
  // Validação do segundo dígito verificador
  tamanho = tamanho + 1;
  numeros = cnpjLimpo.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }
  
  return true;
};
