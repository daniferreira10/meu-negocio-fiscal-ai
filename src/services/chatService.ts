import { Message, KnowledgeBase } from '@/types/chat';

// Categorized knowledge base for accounting and business topics
export const knowledgeBase: KnowledgeBase = {
  "company_formation": [
    {
      question: "Como escolher o tipo societário ideal para minha empresa?",
      answer: "A escolha do tipo societário (MEI, EI, LTDA, etc.) depende de vários fatores como faturamento previsto, número de sócios, responsabilidade patrimonial desejada e regime tributário. O MEI é adequado para faturamento até R$81.000/ano com atividades permitidas. A EI é para empreendedores individuais com faturamento maior. A LTDA é ideal para sociedades, oferecendo proteção patrimonial aos sócios. Podemos analisar seu caso específico para uma recomendação personalizada."
    },
    {
      question: "Quais documentos são necessários para abrir uma empresa?",
      answer: "Para abrir uma empresa, você precisará de: 1) Documentos pessoais dos sócios (RG, CPF, comprovante de residência); 2) Contrato social ou requerimento de empresário; 3) Consulta prévia de local e atividade; 4) Cadastro Nacional de Pessoa Jurídica (CNPJ); 5) Inscrições estadual e municipal (dependendo da atividade); 6) Alvarás específicos conforme o segmento; 7) Registro em órgão de classe, quando aplicável. Nossa equipe pode auxiliar em todo este processo."
    },
    {
      question: "Quanto tempo demora para abrir uma empresa?",
      answer: "O tempo para abrir uma empresa varia conforme a localidade e o tipo de negócio. Com a implementação da REDESIM, o prazo médio é de 3 a 7 dias úteis para empresas com atividades de baixo risco. Para empresas com atividades reguladas ou que necessitam de licenciamentos específicos, o prazo pode estender-se para 30 a 90 dias. Trabalhamos com processos otimizados para garantir a abertura no menor prazo possível."
    }
  ],
  "tax_planning": [
    {
      question: "Qual o melhor regime tributário para minha empresa?",
      answer: "A escolha do regime tributário ideal (Simples Nacional, Lucro Presumido ou Lucro Real) depende de diversos fatores como faturamento, margem de lucro, tipo de atividade e projeção de crescimento. O Simples Nacional é vantajoso para pequenas empresas com faturamento até R$4,8 milhões/ano. O Lucro Presumido é interessante para empresas com alta margem de lucro. O Lucro Real é obrigatório para empresas com faturamento acima de R$78 milhões/ano e pode ser vantajoso para negócios com margens reduzidas. Realizamos um estudo tributário completo para determinar a melhor opção para seu negócio."
    },
    {
      question: "Como reduzir legalmente a carga tributária da minha empresa?",
      answer: "A redução legal da carga tributária pode ser alcançada através de: 1) Escolha adequada do regime tributário; 2) Planejamento tributário preventivo; 3) Aproveitamento correto de créditos tributários; 4) Classificação fiscal adequada de produtos e serviços; 5) Reorganização societária quando necessário; 6) Incentivos fiscais aplicáveis ao seu setor; 7) Gestão eficiente do fluxo de caixa fiscal. Nossa consultoria especializada pode identificar oportunidades específicas para seu negócio dentro da legalidade."
    },
    {
      question: "Quais são os principais impostos que uma empresa precisa pagar?",
      answer: "Os principais impostos variam conforme o regime tributário e atividade, mas geralmente incluem: 1) Tributos federais: IRPJ (Imposto de Renda Pessoa Jurídica), CSLL (Contribuição Social sobre Lucro Líquido), PIS (Programa de Integração Social), COFINS (Contribuição para Financiamento da Seguridade Social); 2) Tributos estaduais: ICMS (Imposto sobre Circulação de Mercadorias e Serviços); 3) Tributos municipais: ISS (Imposto Sobre Serviços); 4) Outros: FGTS e INSS sobre a folha de pagamento. Para empresas do Simples Nacional, estes impostos são unificados em uma única guia (DAS)."
    }
  ],
  "accounting": [
    {
      question: "Por que preciso de contabilidade para minha empresa?",
      answer: "A contabilidade é essencial para: 1) Cumprir obrigações legais e fiscais, evitando multas e problemas com o fisco; 2) Fornecer informações precisas para tomada de decisões gerenciais; 3) Controlar patrimônio, receitas e despesas; 4) Auxiliar no planejamento financeiro e tributário; 5) Viabilizar acesso a crédito e financiamentos; 6) Demonstrar a saúde financeira da empresa para investidores e parceiros; 7) Prevenir fraudes e irregularidades. Mesmo para MEIs, que têm contabilidade simplificada, o acompanhamento profissional é recomendado para crescimento sustentável."
    },
    {
      question: "O que é o balanço patrimonial e para que serve?",
      answer: "O Balanço Patrimonial é uma demonstração contábil que apresenta a posição patrimonial e financeira da empresa em determinada data. Ele é dividido em duas partes: Ativo (bens e direitos) e Passivo + Patrimônio Líquido (obrigações e capital próprio). Serve como uma 'fotografia' da situação financeira da empresa, evidenciando sua capacidade de pagamento, endividamento e evolução patrimonial. É utilizado para análise de crédito, avaliação de investimentos, comparação de desempenho e cumprimento de obrigações legais. Elaboramos este documento com precisão e clareza para auxiliar nas decisões estratégicas do seu negócio."
    },
    {
      question: "Como interpretar o DRE (Demonstrativo de Resultado do Exercício)?",
      answer: "O DRE (Demonstrativo de Resultado do Exercício) mostra o desempenho financeiro da empresa em determinado período, detalhando receitas, custos e despesas até chegar ao lucro ou prejuízo final. Para interpretá-lo corretamente: 1) Analise a Receita Líquida e sua evolução; 2) Verifique a Margem Bruta (diferença entre receita e custo); 3) Avalie as despesas operacionais e sua proporção em relação à receita; 4) Observe o EBITDA, que indica a geração de caixa operacional; 5) Compare o Lucro Líquido final com períodos anteriores; 6) Calcule índices como Margem Líquida e ROE. Fornecemos análises detalhadas do seu DRE com recomendações para melhorar a lucratividade."
    }
  ],
  "tax_obligations": [
    {
      question: "Quais são as principais declarações que minha empresa precisa entregar?",
      answer: "As principais declarações fiscais incluem: 1) Mensais: DCTF, EFD-Contribuições, EFD-ICMS/IPI (conforme regime); 2) Anuais: ECF (Escrituração Contábil Fiscal), DEFIS (para Simples Nacional), DIRPJ (para outros regimes), DIRF (se houver retenções); 3) Periódicas: ECD (Escrituração Contábil Digital), SPED Contábil. Além disso, existem obrigações específicas por setor. Nossa equipe gerencia todo o calendário fiscal da sua empresa, garantindo a entrega dentro dos prazos e evitando penalidades."
    },
    {
      question: "Qual o prazo para pagamento dos principais impostos?",
      answer: "Os prazos de pagamento variam conforme o imposto e regime tributário: 1) Simples Nacional (DAS): dia 20 do mês seguinte; 2) ICMS: geralmente até dia 20 do mês seguinte (varia por estado); 3) ISS: normalmente até dia 10 do mês seguinte (varia por município); 4) PIS/COFINS (regime não-cumulativo): até dia 25 do mês seguinte; 5) IRPJ e CSLL (trimestral): último dia útil do mês seguinte ao trimestre; 6) INSS e FGTS sobre folha: dia 20 e dia 7 do mês seguinte, respectivamente. Monitoramos todos os vencimentos e enviamos lembretes com antecedência para evitar atrasos."
    },
    {
      question: "O que acontece se eu atrasar o pagamento de impostos?",
      answer: "O atraso no pagamento de impostos gera: 1) Multa de mora, geralmente de 0,33% por dia de atraso, limitada a 20%; 2) Juros de mora calculados pela taxa SELIC; 3) Possível inclusão em dívida ativa após determinado período; 4) Restrições para emissão de certidões negativas de débito; 5) Dificuldades para participar de licitações e obter financiamentos; 6) Em casos extremos, podem ocorrer procedimentos fiscais mais severos. Oferecemos serviços de regularização fiscal e parcelamento de débitos para empresas que enfrentam estas situações."
    }
  ],
  "hr_department": [
    {
      question: "Quais documentos preciso para contratar um funcionário?",
      answer: "Para contratar um funcionário, você precisará solicitar: 1) Documentos pessoais (RG, CPF, título de eleitor); 2) Carteira de trabalho digital (número do NIS/PIS); 3) Comprovante de residência atualizado; 4) Certidão de nascimento de dependentes (para fins de IR); 5) Comprovante de escolaridade; 6) Atestado de saúde ocupacional admissional; 7) Foto 3x4 recente; 8) Dados bancários para pagamento. A partir desses documentos, será necessário registrar o funcionário no eSocial e elaborar o contrato de trabalho. Nossa equipe realiza todo o processo de admissão com segurança e conformidade legal."
    },
    {
      question: "Quais são os encargos trabalhistas que incídem sobre a folha de pagamento?",
      answer: "Os principais encargos sobre a folha de pagamento incluem: 1) INSS patronal: 20% sobre a folha (empresas não optantes pelo Simples Nacional); 2) FGTS: 8% do salário de cada funcionário; 3) RAT/SAT: 1% a 3%, dependendo do grau de risco da atividade; 4) Terceiros (Sistema S): até 5,8% (não se aplica ao Simples Nacional); 5) INSS retido do funcionário: 7,5% a 14%, conforme a faixa salarial; 6) IRRF: conforme tabela progressiva, se aplicável. Além disso, existem provisões para 13º salário, férias e FGTS sobre estas verbas. Realizamos o cálculo preciso desses encargos e orientamos sobre estratégias legais para otimização da folha de pagamento."
    },
    {
      question: "Como funciona o processo de demissão de um funcionário?",
      answer: "O processo de demissão envolve: 1) Aviso prévio (trabalhado ou indenizado, conforme negociação); 2) Documentação formal (comunicado de dispensa, termo de rescisão); 3) Exame demissional; 4) Cálculo das verbas rescisórias, que podem incluir saldo de salário, férias proporcionais + 1/3, 13º proporcional, aviso prévio, multa de 40% do FGTS (em demissão sem justa causa) e outras verbas específicas conforme o caso; 5) Pagamento em até 10 dias da notificação (dispensa sem justa causa) ou no dia útil seguinte ao término do contrato; 6) Baixa na carteira de trabalho digital; 7) Comunicação aos órgãos competentes via eSocial. Nossa equipe acompanha todo o processo, garantindo conformidade legal e minimizando riscos de passivos trabalhistas."
    }
  ],
  "financial_consulting": [
    {
      question: "Como elaborar um fluxo de caixa eficiente?",
      answer: "Para elaborar um fluxo de caixa eficiente: 1) Registre todas as entradas e saídas detalhadamente; 2) Categorize corretamente cada transação; 3) Estabeleça projeções realistas para períodos futuros; 4) Monitore diariamente os movimentos financeiros; 5) Reconcilie regularmente com extratos bancários; 6) Analise sazonalidades e tendências; 7) Mantenha reservas para contingências; 8) Utilize software especializado para automação. Oferecemos implementação de sistemas de fluxo de caixa personalizados e treinamento para sua equipe, além de análises periódicas para identificar oportunidades de melhoria na gestão financeira."
    },
    {
      question: "Quais indicadores financeiros devo monitorar na minha empresa?",
      answer: "Os principais indicadores financeiros a monitorar são: 1) Liquidez (corrente, seca e imediata) - capacidade de honrar compromissos; 2) Rentabilidade (margem bruta, operacional e líquida) - eficiência do negócio; 3) Endividamento - proporção de capital próprio versus terceiros; 4) Ciclo operacional e financeiro - tempo de conversão de estoque em caixa; 5) Ponto de equilíbrio - volume mínimo necessário para cobrir custos; 6) EBITDA - geração operacional de caixa; 7) ROI e payback - retorno sobre investimentos; 8) Giro de estoques e prazo médio de recebimento/pagamento. Desenvolvemos dashboards gerenciais personalizados que monitoram estes indicadores automaticamente e fornecem insights estratégicos."
    },
    {
      question: "Como avaliar se minha empresa está crescendo de forma sustentável?",
      answer: "Para avaliar o crescimento sustentável, observe: 1) Crescimento equilibrado entre receita, lucro e fluxo de caixa; 2) Capacidade de autofinanciamento sem dependência excessiva de capital de terceiros; 3) Margens consistentes ou em melhoria ao longo do tempo; 4) Estrutura operacional escalável sem aumento proporcional de custos fixos; 5) Diversificação adequada de clientes e fornecedores; 6) Investimentos em inovação e capital humano; 7) Índices de endividamento controlados; 8) Reservas estratégicas para períodos adversos. Nossa consultoria financeira realiza diagnósticos periódicos da saúde financeira da sua empresa, com recomendações para crescimento sustentável e mitigação de riscos."
    }
  ],
  "annual_obligations": [
    {
      question: "O que é a Declaração de Imposto de Renda Pessoa Jurídica (IRPJ)?",
      answer: "A Declaração de IRPJ é uma obrigação fiscal anual onde a empresa informa à Receita Federal seus resultados financeiros, apurando o imposto devido. Para empresas no Lucro Real, ela é feita via ECF (Escrituração Contábil Fiscal) até o último dia útil de julho do ano seguinte. Para o Lucro Presumido, a apuração é trimestral. A declaração inclui informações patrimoniais, receitas, despesas, apuração de tributos e outras informações fiscais relevantes. O não cumprimento ou erros na declaração podem resultar em multas e fiscalizações. Nossa equipe especializada garante a elaboração e transmissão correta da sua declaração, maximizando benefícios fiscais legais."
    },
    {
      question: "O que é a DEFIS e quem deve entregar?",
      answer: "A DEFIS (Declaração de Informações Socioeconômicas e Fiscais) é uma obrigação anual exclusiva para empresas optantes pelo Simples Nacional. Nela, a empresa informa seu faturamento anual, custos, despesas, ativos e outras informações fiscais e socioeconômicas. O prazo de entrega geralmente vai até 31 de março do ano seguinte. A declaração é fundamental para comprovar o enquadramento no regime simplificado e serve como base para fiscalizações. A não entrega ou atraso gera multa mínima de R$ 50,00 por mês-calendário. Elaboramos e transmitimos sua DEFIS com precisão, revisando todas as informações para evitar inconsistências."
    },
    {
      question: "Qual o prazo para guardar documentos fiscais e contábeis?",
      answer: "Os prazos para guarda de documentos fiscais e contábeis variam conforme sua natureza: 1) Documentos societários (contratos, atas): permanentemente; 2) Livros contábeis obrigatórios: mínimo de 10 anos após o último lançamento; 3) Documentos fiscais (notas fiscais, guias de recolhimento): 5 anos em regra geral; 4) Documentos trabalhistas: variam de 2 a 30 anos, sendo recomendável manter por 30 anos para segurança; 5) Processos fiscais com créditos: até 5 anos após utilização do crédito. Oferecemos soluções de gestão documental física e digital, com políticas de retenção conformes à legislação e gestão segura do descarte quando permitido."
    }
  ]
};

// Function to find the best response based on user input
export const findBestResponse = (userInput: string, includeFile: boolean = false) => {
  // Convert to lowercase for case-insensitive matching
  const inputLower = userInput.toLowerCase();
  
  // Keywords for each category to help with classification
  const categoryKeywords = {
    company_formation: ["abrir empresa", "abertura", "regularização", "contrato social", "junta comercial", "cnpj", "tipo societário", "mei", "ltda", "alvará", "licença"],
    tax_planning: ["imposto", "tributário", "simples nacional", "lucro presumido", "lucro real", "regime", "carga tributária", "planejamento fiscal", "redução de impostos"],
    accounting: ["contabilidade", "balanço", "dre", "demonstrativo", "escrituração", "livro contábil", "fluxo de caixa", "ativo", "passivo", "patrimônio"],
    tax_obligations: ["obrigação fiscal", "declaração", "dctf", "sped", "efd", "guia", "das", "darf", "prazo", "multa"],
    hr_department: ["funcionário", "contratação", "demissão", "folha", "pagamento", "férias", "13º", "salário", "inss", "fgts", "esocial"],
    financial_consulting: ["financeiro", "consultoria", "análise", "investimento", "expansão", "custo", "margem", "lucratividade", "indicadores"],
    annual_obligations: ["anual", "irpj", "defis", "ecf", "declaração anual", "balanço anual"]
  };
  
  // Determine which category the question belongs to
  let bestCategory = "company_formation"; // Default
  let bestScore = 0;
  
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    const score = keywords.reduce((acc, keyword) => {
      return acc + (inputLower.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  });
  
  // If no clear category, try to find direct question match across all categories
  let bestMatch = null;
  let bestMatchScore = 0;
  
  Object.values(knowledgeBase).forEach(categoryQuestions => {
    categoryQuestions.forEach(qa => {
      const questionLower = qa.question.toLowerCase();
      
      // Simple similarity check based on word overlap
      const questionWords = questionLower.split(' ');
      const inputWords = inputLower.split(' ');
      
      const commonWords = questionWords.filter(word => 
        inputWords.includes(word) && word.length > 3 // Only count meaningful words
      );
      
      const similarity = commonWords.length / Math.max(questionWords.length, inputWords.length);
      
      if (similarity > bestMatchScore && similarity > 0.3) { // Threshold for similarity
        bestMatchScore = similarity;
        bestMatch = qa;
      }
    });
  });
  
  if (bestMatch) {
    return bestMatch.answer;
  }
  
  // If no good match, select a response from the best category
  const categoryResponses = knowledgeBase[bestCategory as keyof typeof knowledgeBase];
  let response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)].answer;

  // If there's an attachment, add context about it
  if (includeFile) {
    response = `Analisei seu documento e aqui está minha resposta: ${response}\n\nSe precisar de uma análise mais detalhada ou específica sobre seu documento, recomendo agendar uma consultoria com um de nossos especialistas.`;
  }

  return response;
};
