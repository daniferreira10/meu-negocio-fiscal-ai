
import { DevelopmentPhase, KnowledgeBase, Message } from "@/types/chat";

// Base de conhecimento simulada
const knowledgeBase: KnowledgeBase[] = [
  {
    id: "1",
    title: "Simples Nacional",
    content: "O Simples Nacional é um regime tributário simplificado para micro e pequenas empresas com faturamento anual de até R$ 4,8 milhões. Unifica 8 impostos (IRPJ, CSLL, PIS, COFINS, IPI, CPP, ICMS e ISS) em uma única guia (DAS). As alíquotas variam de 4% a 33%, divididas em 5 anexos conforme a atividade.",
    "consultoria_contabil": true,
    "planejamento_tributario": true,
    "contabilidade": true
  },
  {
    id: "2",
    title: "Lucro Presumido",
    content: "O Lucro Presumido é um regime de tributação simplificado para empresas com faturamento anual de até R$ 78 milhões. A base de cálculo do IRPJ é determinada pela aplicação de percentuais de presunção sobre a receita bruta (1,6% a 32%, conforme atividade). Além disso, são devidos PIS (0,65%), COFINS (3%), CSLL, ICMS/ISS.",
    "consultoria_contabil": true,
    "planejamento_tributario": true,
    "contabilidade": true
  },
  {
    id: "3",
    title: "Lucro Real",
    content: "O Lucro Real é um regime tributário onde o IRPJ e a CSLL são calculados com base no lucro efetivo da empresa (receitas menos despesas). É obrigatório para empresas com faturamento anual superior a R$ 78 milhões ou em atividades específicas. Também são devidos PIS (1,65%), COFINS (7,6%), além de ICMS/ISS conforme a atividade.",
    "consultoria_contabil": true,
    "planejamento_tributario": true,
    "contabilidade": true
  },
  {
    id: "4",
    title: "Obrigações Fiscais",
    content: "As principais obrigações fiscais incluem: 1) Mensais: DAS (Simples Nacional), DARF (Lucro Presumido/Real), PGDAS-D (Simples Nacional), EFD-Contribuições, GIA, GFIP/eSocial; 2) Anuais: DEFIS (Simples Nacional), ECF (Lucro Real/Presumido), DIRF, RAIS, DCTF; 3) Outras obrigatórias: ECD (Escrituração Contábil Digital), Sped Fiscal.",
    "consultoria_contabil": true,
    "planejamento_tributario": false,
    "obrigacoes_fiscais": true
  },
  {
    id: "5",
    title: "Cálculo de Imposto de Renda PF",
    content: "O cálculo do IRPF considera a renda tributável da pessoa física aplicando alíquotas progressivas de 0% a 27,5%. São possíveis deduções legais como dependentes (R$2.275,08 por pessoa), educação (até R$3.561,50 por dependente), despesas médicas (valor integral), previdência oficial e privada. A declaração deve ser entregue anualmente entre março e maio.",
    "consultoria_contabil": true,
    "planejamento_tributario": true
  }
];

// Função para encontrar resposta na base de conhecimento
export const findBestResponse = (query: string, isDocumentAnalysis = false): string => {
  // Lista de respostas pré-definidas para simulação do chatbot
  if (isDocumentAnalysis) {
    return "Analisei seu documento fiscal. Identifiquei que se trata de uma nota fiscal de venda de produtos. Os valores estão corretos e o documento está em conformidade com as exigências fiscais. Os impostos destacados são: ICMS (17%): R$85,00, PIS (0,65%): R$3,25, COFINS (3%): R$15,00. Recomendo arquivar este documento pelo período mínimo de 5 anos para fins fiscais.";
  }

  if (query.toLowerCase().includes('irpf') || query.toLowerCase().includes('imposto de renda')) {
    return "Para calcular seu IRPF, precisamos considerar sua renda tributável anual e aplicar a tabela progressiva atual:\n\n**Cálculo IRPF:**\n- Renda mensal: (informe o valor)\n- Alíquota aplicável: (verificar na tabela)\n- Dedução por dependentes: R$2.275,08/ano por dependente\n- Despesas dedutíveis: educação até R$3.561,50/ano por pessoa\n\nPosso fazer um cálculo detalhado se informar seus rendimentos e deduções. Gostaria de simular agora?";
  }

  if (query.toLowerCase().includes('das') || query.toLowerCase().includes('simples nacional')) {
    return "Para calcular o DAS do Simples Nacional, preciso das seguintes informações:\n\n**Dados necessários:**\n- Faturamento do mês\n- Anexo aplicável (I a V) conforme atividade\n- Faturamento acumulado nos 12 meses anteriores\n\nCom essas informações, posso calcular sua alíquota efetiva e o valor devido. Gostaria de fazer esse cálculo agora?";
  }

  if (query.toLowerCase().includes('livro caixa') || query.toLowerCase().includes('fluxo')) {
    return "Para gerar seu livro caixa, precisamos registrar as receitas e despesas do período:\n\n**Estrutura do Livro Caixa:**\n- Data\n- Descrição\n- Receitas (+)\n- Despesas (-)\n- Saldo\n\nVocê pode me fornecer as movimentações financeiras do período desejado e posso organizar em formato de livro caixa automaticamente.";
  }

  if (query.toLowerCase().includes('obrigação') || query.toLowerCase().includes('declaração')) {
    return "As principais obrigações fiscais para o seu perfil incluem:\n\n**Mensais:**\n- DAS (até dia 20)\n- Folha de pagamento (eSocial)\n\n**Anuais:**\n- DEFIS (até 31/março)\n- RAIS (fevereiro/março)\n- DIRF (fevereiro)\n\nGostaria de um calendário fiscal completo ou informações sobre alguma obrigação específica?";
  }

  // Resposta padrão
  return "Sou a IA Contábil especializada em legislação fiscal brasileira. Posso ajudar com cálculos de impostos (IRPF, IRPJ, Simples Nacional), livro caixa, obrigações fiscais, e mais. Como posso auxiliar na sua contabilidade hoje?";
};

// Informações do plano de desenvolvimento (simuladas)
export const developmentPlan: DevelopmentPhase[] = [
  {
    id: "fase1",
    name: "Fase 1",
    phase: 1,
    title: "Estrutura Básica e Consultas",
    description: "Implementação da estrutura básica da IA Contábil e funcionalidades iniciais de consulta",
    status: "completed",
    progressPercentage: 100,
    tasks: [],
    sections: [
      {
        id: "1.1",
        title: "Interface da Plataforma",
        description: "Desenvolvimento da interface base do sistema",
        status: "completed",
        tasks: [
          {
            description: "Criar dashboard principal",
            completed: true
          },
          {
            description: "Implementar menu de navegação",
            completed: true
          },
          {
            description: "Desenvolver sistema de autenticação",
            completed: true
          }
        ]
      },
      {
        id: "1.2",
        title: "Módulo de Consultas",
        description: "Sistema de perguntas e respostas sobre contabilidade e impostos",
        status: "completed",
        tasks: [
          {
            description: "Criar base de conhecimento fiscal",
            completed: true
          },
          {
            description: "Implementar mecanismo de busca por keywords",
            completed: true
          },
          {
            description: "Desenvolver interface conversacional",
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: "fase2",
    name: "Fase 2",
    phase: 2,
    title: "Processamento de Documentos",
    description: "Funcionalidades para análise e extração de dados de documentos fiscais",
    status: "in_progress",
    progressPercentage: 60,
    tasks: [],
    sections: [
      {
        id: "2.1",
        title: "Upload e Armazenamento",
        description: "Sistema para upload e gerenciamento de documentos",
        status: "completed",
        tasks: [
          {
            description: "Criar interface de upload de arquivos",
            completed: true
          },
          {
            description: "Implementar visualização de documentos",
            completed: true
          },
          {
            description: "Desenvolver sistema de categorização",
            completed: true
          }
        ]
      },
      {
        id: "2.2",
        title: "Extração de Dados",
        description: "Sistema para ler e extrair informações de documentos fiscais",
        status: "in_progress",
        tasks: [
          {
            description: "Implementar OCR para notas fiscais",
            completed: true
          },
          {
            description: "Desenvolver extração de dados de XML",
            completed: false
          },
          {
            description: "Criar validador de documentos fiscais",
            completed: false
          }
        ]
      },
      {
        id: "2.3",
        title: "Validação e Consistência",
        description: "Verificação de conformidade dos documentos e dados",
        status: "not_started",
        tasks: [
          {
            description: "Implementar validação de notas fiscais",
            completed: false
          },
          {
            description: "Criar sistema de alertas para inconsistências",
            completed: false
          },
          {
            description: "Desenvolver relatório de documentos processados",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "fase3",
    name: "Fase 3",
    phase: 3,
    title: "Cálculos Fiscais",
    description: "Módulos para cálculos tributários e geração de guias",
    status: "not_started",
    progressPercentage: 0,
    tasks: [],
    sections: [
      {
        id: "3.1",
        title: "Simples Nacional",
        description: "Cálculo de DAS e relatórios do Simples Nacional",
        status: "not_started",
        tasks: [
          {
            description: "Implementar cálculo de alíquota efetiva",
            completed: false
          },
          {
            description: "Desenvolver gerador de DAS",
            completed: false
          },
          {
            description: "Criar simulador de anexos",
            completed: false
          }
        ]
      },
      {
        id: "3.2",
        title: "Imposto de Renda",
        description: "Cálculo de IRPF e IRPJ com deduções",
        status: "not_started",
        tasks: [
          {
            description: "Implementar cálculo de IRPF",
            completed: false
          },
          {
            description: "Desenvolver cálculo de IRPJ (Presumido e Real)",
            completed: false
          },
          {
            description: "Criar relatório de cálculo fiscal",
            completed: false
          }
        ]
      },
      {
        id: "3.3",
        title: "Outros Tributos",
        description: "Cálculo de ICMS, ISS, PIS/COFINS etc.",
        status: "not_started",
        tasks: [
          {
            description: "Implementar cálculo de PIS/COFINS",
            completed: false
          },
          {
            description: "Desenvolver cálculo de ICMS por UF",
            completed: false
          },
          {
            description: "Criar cálculo de ISS por município",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "fase4",
    name: "Fase 4",
    phase: 4,
    title: "Contabilidade e Relatórios",
    description: "Geração de livros fiscais e relatórios contábeis",
    status: "not_started",
    progressPercentage: 0,
    tasks: [],
    sections: [
      {
        id: "4.1",
        title: "Livro Caixa",
        description: "Sistema de registro e relatório de receitas e despesas",
        status: "not_started",
        tasks: [
          {
            description: "Implementar registro de transações",
            completed: false
          },
          {
            description: "Desenvolver categorização automática",
            completed: false
          },
          {
            description: "Criar relatório mensal e anual",
            completed: false
          }
        ]
      },
      {
        id: "4.2",
        title: "Balanços e Demonstrações",
        description: "Geração de demonstrações contábeis e financeiras",
        status: "not_started",
        tasks: [
          {
            description: "Implementar balanço patrimonial",
            completed: false
          },
          {
            description: "Desenvolver DRE simplificado",
            completed: false
          },
          {
            description: "Criar fluxo de caixa projetado",
            completed: false
          }
        ]
      },
      {
        id: "4.3",
        title: "Exportação e Integração",
        description: "Sistemas para exportar dados e integrar com outros sistemas",
        status: "not_started",
        tasks: [
          {
            description: "Implementar exportação para PDF",
            completed: false
          },
          {
            description: "Desenvolver exportação para Excel",
            completed: false
          },
          {
            description: "Criar APIs para integração externa",
            completed: false
          }
        ]
      }
    ]
  }
];

// Função para obter informações do plano de desenvolvimento
export const getDevelopmentInfo = (query: string): string => {
  // Informações gerais do plano
  if (query.toLowerCase().includes('plano') || query.toLowerCase().includes('desenvolvimento')) {
    return "**Plano de Desenvolvimento da IA Contábil**\n\nNosso desenvolvimento está dividido em 4 fases principais:\n\n1. **Estrutura Básica e Consultas** - 100% concluída\n2. **Processamento de Documentos** - 60% concluída (em andamento)\n3. **Cálculos Fiscais** - não iniciada\n4. **Contabilidade e Relatórios** - não iniciada\n\nAcesse o painel para mais detalhes sobre cada fase e funcionalidade.";
  }

  // Informações específicas por fase
  if (query.toLowerCase().includes('fase 1')) {
    return "**Fase 1: Estrutura Básica e Consultas (100% concluída)**\n\nImplementamos com sucesso:\n- Interface completa da plataforma\n- Sistema de autenticação\n- Base de conhecimento fiscal\n- Mecanismo de consultas por inteligência artificial\n- Interface conversacional\n\nTodos os objetivos desta fase foram alcançados.";
  }

  if (query.toLowerCase().includes('fase 2')) {
    return "**Fase 2: Processamento de Documentos (60% concluída)**\n\nStatus atual:\n- ✅ Upload e armazenamento de documentos\n- ✅ Visualização e categorização\n- ⏳ Extração de dados (parcial)\n- ⏳ Validação de documentos (pendente)\n\nTrabalhando atualmente na finalização da extração de dados de XMLs de notas fiscais.";
  }

  if (query.toLowerCase().includes('fase 3')) {
    return "**Fase 3: Cálculos Fiscais (não iniciada)**\n\nPrevisto para iniciar no próximo trimestre, incluindo:\n- Cálculo de DAS (Simples Nacional)\n- Geração de guias de pagamento\n- Cálculo de IRPF e IRPJ\n- Cálculos de outros tributos (ICMS, ISS, PIS/COFINS)";
  }

  if (query.toLowerCase().includes('fase 4')) {
    return "**Fase 4: Contabilidade e Relatórios (não iniciada)**\n\nPrevisto para o último trimestre, incluindo:\n- Sistema completo de Livro Caixa\n- Geração de balanços e demonstrações\n- Exportação para PDF e Excel\n- Integrações com sistemas externos";
  }

  // Sobre o progresso atual
  if (query.toLowerCase().includes('progresso') || query.toLowerCase().includes('status')) {
    return "**Status Atual do Desenvolvimento (Maio/2025)**\n\nProgresso global: 40%\n\n- ✅ Fase 1: 100% concluída\n- ⏳ Fase 2: 60% concluída (em andamento)\n- ❌ Fase 3: 0% (não iniciada)\n- ❌ Fase 4: 0% (não iniciada)\n\nPróximos passos: finalizar a extração de dados de documentos fiscais na Fase 2.";
  }

  // Resposta padrão
  return "O plano de desenvolvimento da IA Contábil está dividido em 4 fases principais. Atualmente estamos na Fase 2 (Processamento de Documentos), com 60% de conclusão. A Fase 1 já foi concluída e as Fases 3 e 4 ainda serão iniciadas. Posso detalhar alguma fase específica se desejar.";
};
