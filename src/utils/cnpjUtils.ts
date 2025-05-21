
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
  endereco: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  message?: string;
}

export const consultarCNPJ = async (cnpj: string): Promise<CNPJResponse | null> => {
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
