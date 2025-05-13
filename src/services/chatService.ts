import { Message, KnowledgeBase, DevelopmentPhase } from '@/types/chat';

// Expanded knowledge base for accounting and business topics covering all 10 modules
export const knowledgeBase: KnowledgeBase = {
  "consultoria_contabil": [
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
  "planejamento_tributario": [
    {
      question: "Qual o melhor regime tributário para minha empresa?",
      answer: "A escolha do regime tributário ideal (Simples Nacional, Lucro Presumido ou Lucro Real) depende de diversos fatores como faturamento, margem de lucro, tipo de atividade e projeção de crescimento. O Simples Nacional é vantajoso para pequenas empresas com faturamento até R$4,8 milhões/ano. O Lucro Presumido é interessante para empresas com alta margem de lucro. O Lucro Real é obrigatório para empresas com faturamento acima de R$78 milhões/ano e pode ser vantajoso para negócios com margens reduzidas. Realizamos um estudo tributário completo para determinar a melhor opção para seu negócio."
    },
    {
      question: "O que é DAS?",
      answer: "O DAS (Documento de Arrecadação do Simples Nacional) é a guia mensal para pagamento dos tributos unificados das empresas optantes pelo Simples Nacional. Ele engloba até 8 impostos: IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS e CPP (contribuição previdenciária patronal). O valor é calculado com base no faturamento mensal e na alíquota determinada pela faixa de receita bruta dos últimos 12 meses. O pagamento deve ser realizado até o dia 20 do mês seguinte ao do faturamento. Nosso sistema calcula automaticamente o valor do DAS e disponibiliza a guia para pagamento."
    },
    {
      question: "Como reduzir legalmente a carga tributária da minha empresa?",
      answer: "A redução legal da carga tributária pode ser alcançada através de: 1) Escolha adequada do regime tributário; 2) Planejamento tributário preventivo; 3) Aproveitamento correto de créditos tributários; 4) Classificação fiscal adequada de produtos e serviços; 5) Reorganização societária quando necessário; 6) Incentivos fiscais aplicáveis ao seu setor; 7) Gestão eficiente do fluxo de caixa fiscal. Nossa consultoria especializada pode identificar oportunidades específicas para seu negócio dentro da legalidade."
    },
    {
      question: "Quais são os principais impostos que uma empresa precisa pagar?",
      answer: "Os principais impostos variam conforme o regime tributário e atividade, mas geralmente incluem: 1) Tributos federais: IRPJ (Imposto de Renda Pessoa Jurídica), CSLL (Contribuição Social sobre Lucro Líquido), PIS (Programa de Integração Social), COFINS (Contribuição para Financiamento da Seguridade Social); 2) Tributos estaduais: ICMS (Imposto sobre Circulação de Mercadorias e Serviços); 3) Tributos municipais: ISS (Imposto Sobre Serviços); 4) Outros: FGTS e INSS sobre a folha de pagamento. Para empresas do Simples Nacional, estes impostos são unificados em uma única guia (DAS)."
    },
    {
      question: "Quando devo pagar o IRPJ?",
      answer: "O prazo de pagamento do IRPJ (Imposto de Renda Pessoa Jurídica) depende do regime tributário da empresa: 1) No Simples Nacional: o IRPJ está incluído na guia DAS, com vencimento no dia 20 do mês seguinte; 2) No Lucro Presumido: o recolhimento é trimestral, com vencimento no último dia útil do mês seguinte ao final do trimestre; 3) No Lucro Real: pode ser trimestral (mesmo prazo do Lucro Presumido) ou anual com antecipações mensais (estimativa), com pagamento até o último dia útil do mês seguinte. Nosso sistema envia lembretes automáticos para evitar atrasos nos pagamentos."
    }
  ],
  "contabilidade": [
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
  "obrigacoes_fiscais": [
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
  "departamento_pessoal": [
    {
      question: "Quais documentos preciso para contratar um funcionário?",
      answer: "Para contratar um funcionário, você precisará solicitar: 1) Documentos pessoais (RG, CPF, título de eleitor); 2) Carteira de trabalho digital (número do NIS/PIS); 3) Comprovante de residência atualizado; 4) Certidão de nascimento de dependentes (para fins de IR); 5) Comprovante de escolaridade; 6) Atestado de saúde ocupacional admissional; 7) Foto 3x4 recente; 8) Dados bancários para pagamento. A partir desses documentos, será necessário registrar o funcionário no eSocial e elaborar o contrato de trabalho. Nossa equipe realiza todo o processo de admissão com segurança e conformidade legal."
    },
    {
      question: "Quais são os encargos trabalhistas que incidem sobre a folha de pagamento?",
      answer: "Os principais encargos sobre a folha de pagamento incluem: 1) INSS patronal: 20% sobre a folha (empresas não optantes pelo Simples Nacional); 2) FGTS: 8% do salário de cada funcionário; 3) RAT/SAT: 1% a 3%, dependendo do grau de risco da atividade; 4) Terceiros (Sistema S): até 5,8% (não se aplica ao Simples Nacional); 5) INSS retido do funcionário: 7,5% a 14%, conforme a faixa salarial; 6) IRRF: conforme tabela progressiva, se aplicável. Além disso, existem provisões para 13º salário, férias e FGTS sobre estas verbas. Realizamos o cálculo preciso desses encargos e orientamos sobre estratégias legais para otimização da folha de pagamento."
    },
    {
      question: "Como funciona o processo de demissão de um funcionário?",
      answer: "O processo de demissão envolve: 1) Aviso prévio (trabalhado ou indenizado, conforme negociação); 2) Documentação formal (comunicado de dispensa, termo de rescisão); 3) Exame demissional; 4) Cálculo das verbas rescisórias, que podem incluir saldo de salário, férias proporcionais + 1/3, 13º proporcional, aviso prévio, multa de 40% do FGTS (em demissão sem justa causa) e outras verbas específicas conforme o caso; 5) Pagamento em até 10 dias da notificação (dispensa sem justa causa) ou no dia útil seguinte ao término do contrato; 6) Baixa na carteira de trabalho digital; 7) Comunicação aos órgãos competentes via eSocial. Nossa equipe acompanha todo o processo, garantindo conformidade legal e minimizando riscos de passivos trabalhistas."
    }
  ],
  "consultoria_financeira": [
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
  "obrigacoes_anuais": [
    {
      question: "O que é a Declaração de Imposto de Renda Pessoa Jurídica (IRPJ)?",
      answer: "A Declaração de IRPJ é uma obrigação fiscal anual onde a empresa informa à Receita Federal seus resultados financeiros, apurando o imposto devido. Para empresas no Lucro Real, ela é feita via ECF (Escrituração Contábil Fiscal) até o último dia útil de julho do ano seguinte. Para o Lucro Presumido, a apuração é trimestral. A declaração inclui informações patrimoniais, receitas, despesas, apuração de tributos e outras informações fiscais e socioeconômicas. O não cumprimento ou erros na declaração podem resultar em multas e fiscalizações. Nossa equipe especializada garante a elaboração e transmissão correta da sua declaração, maximizando benefícios fiscais legais."
    },
    {
      question: "O que é a DEFIS e quem deve entregar?",
      answer: "A DEFIS (Declaração de Informações Socioeconômicas e Fiscais) é uma obrigação anual exclusiva para empresas optantes pelo Simples Nacional. Nela, a empresa informa seu faturamento anual, custos, despesas, ativos e outras informações fiscais e socioeconômicas. O prazo de entrega geralmente vai até 31 de março do ano seguinte. A declaração é fundamental para comprovar o enquadramento no regime simplificado e serve como base para fiscalizações. A não entrega ou atraso gera multa mínima de R$ 50,00 por mês-calendário. Elaboramos e transmitimos sua DEFIS com precisão, revisando todas as informações para evitar inconsistências."
    },
    {
      question: "Qual o prazo para guardar documentos fiscais e contábeis?",
      answer: "Os prazos para guarda de documentos fiscais e contábeis variam conforme sua natureza: 1) Documentos societários (contratos, atas): permanentemente; 2) Livros contábeis obrigatórios: mínimo de 10 anos após o último lançamento; 3) Documentos fiscais (notas fiscais, guias de recolhimento): 5 anos em regra geral; 4) Documentos trabalhistas: variam de 2 a 30 anos, sendo recomendável manter por 30 anos para segurança; 5) Processos fiscais com créditos: até 5 anos após utilização do crédito. Oferecemos soluções de gestão documental física e digital, com políticas de retenção conformes à legislação e gestão segura do descarte quando permitido."
    }
  ],
  "processamento_documentos": [
    {
      question: "Quais tipos de documentos sua IA consegue processar?",
      answer: "Nossa IA contábil consegue processar e extrair informações de diversos tipos de documentos, como: 1) Notas fiscais (NF-e, NFS-e, etc.); 2) Recibos e comprovantes de pagamento; 3) Extratos bancários; 4) Folhas de pagamento; 5) Contratos de prestação de serviços; 6) Declarações fiscais; 7) Guias de recolhimento de impostos; 8) Relatórios financeiros. Utilizamos tecnologia OCR (Reconhecimento Óptico de Caracteres) avançada para converter imagens e PDFs em dados estruturados que alimentam automaticamente seu sistema contábil."
    },
    {
      question: "Como funcionam as análises de documentos contábeis?",
      answer: "Nossa análise de documentos contábeis funciona em quatro etapas: 1) Digitalização e upload do documento; 2) Processamento via OCR e IA para extrair informações relevantes como valores, datas, CNPJs, natureza da operação, etc.; 3) Classificação automática conforme plano de contas e regime tributário da empresa; 4) Integração dos dados ao sistema contábil com sugestões de lançamentos. O sistema também detecta inconsistências, documentos duplicados ou valores discrepantes, garantindo a integridade das informações contábeis."
    },
    {
      question: "Por quanto tempo devo guardar notas fiscais?",
      answer: "O prazo geral para guarda de notas fiscais é de 5 anos, conforme determina o Código Tributário Nacional. No entanto, em casos específicos, esse prazo pode ser estendido: 1) Operações relacionadas a créditos tributários: até 5 anos após o uso do crédito; 2) Documentos de imobilizado: durante toda a vida útil do bem mais 5 anos; 3) Documentos trabalhistas: recomenda-se 30 anos para segurança; 4) Situações com processos administrativos ou judiciais: até o trânsito em julgado mais 5 anos. Nosso sistema de gestão documental organiza seus documentos e alerta sobre prazos de guarda, além de oferecer armazenamento digital seguro."
    }
  ],
  "inteligencia_negocio": [
    {
      question: "Como posso reduzir custos na minha empresa?",
      answer: "Para reduzir custos de forma eficiente: 1) Realize uma análise detalhada por categoria de despesa; 2) Identifique gastos recorrentes que podem ser renegociados ou eliminados; 3) Otimize processos para aumentar produtividade; 4) Considere terceirização de atividades não essenciais; 5) Implemente controles para evitar desperdícios; 6) Renegocie contratos com fornecedores; 7) Avalie alternativas de menor custo para insumos; 8) Aplique tecnologia para automatizar tarefas repetitivas; 9) Revise sua estrutura tributária para possíveis economias legais. Nossa IA analisa seus dados históricos e identifica padrões e oportunidades específicas de redução de custos para seu negócio."
    },
    {
      question: "Como identificar tendências de crescimento no meu negócio?",
      answer: "Para identificar tendências de crescimento: 1) Analise dados históricos de vendas, novos clientes e ticket médio por períodos comparáveis; 2) Observe a taxa de retenção e recorrência de clientes; 3) Monitore a evolução das margens de lucro por produto/serviço; 4) Acompanhe métricas de marketing como taxa de conversão e CAC (Custo de Aquisição de Cliente); 5) Compare seu desempenho com benchmarks do setor; 6) Identifique sazonalidades e padrões cíclicos; 7) Avalie o crescimento por segmento de cliente ou região. Nossa plataforma de BI gera dashboards personalizados que evidenciam tendências e projetam cenários futuros com base em dados históricos e indicadores de mercado."
    },
    {
      question: "Como prever meu fluxo de caixa para os próximos meses?",
      answer: "Para prever seu fluxo de caixa: 1) Consolide dados históricos de receitas e despesas dos últimos 12-24 meses; 2) Identifique padrões sazonais e tendências; 3) Liste recebimentos e pagamentos já programados; 4) Estime vendas futuras com base em contratos existentes e projeções de mercado; 5) Considere despesas fixas e variáveis separadamente; 6) Inclua investimentos e financiamentos planejados; 7) Calcule o saldo projetado mês a mês; 8) Estabeleça cenários otimista, realista e pessimista. Nosso sistema de previsão utiliza IA para analisar seus dados históricos, detectar padrões e gerar projeções precisas com alertas para possíveis déficits ou oportunidades de investimento."
    }
  ],
  "integracao_sistemas": [
    {
      question: "Quais sistemas a plataforma consegue integrar?",
      answer: "Nossa plataforma possui integrações nativas com: 1) Sistemas bancários (via Open Banking): Itaú, Bradesco, Santander, Banco do Brasil e outros; 2) Plataformas fiscais: SEFAZ, Receita Federal, Portais de NFe e NFSe; 3) ERPs populares: SAP, Oracle, Totvs, Sage; 4) Plataformas de e-commerce: Shopify, WooCommerce, Magento, VTEX; 5) Sistemas de PDV: Linx, Bling, Nuvemshop; 6) Folha de pagamento: eSocial, Gupy, Convenia; 7) CRMs: Salesforce, Pipedrive, HubSpot. Também oferecemos APIs abertas para integração personalizada com outros sistemas. Essas integrações permitem automatização de dados, redução de erros e atualização em tempo real."
    },
    {
      question: "Como funciona a integração com bancos?",
      answer: "A integração bancária funciona através do Open Banking (Sistema Financeiro Aberto) seguindo estas etapas: 1) Autorização: você concede permissão para acesso aos dados bancários através de login seguro; 2) Sincronização: nosso sistema acessa extratos e movimentações automaticamente; 3) Categorização: as transações são classificadas conforme seu plano de contas; 4) Conciliação: o sistema associa automaticamente pagamentos e recebimentos aos lançamentos contábeis; 5) Atualização: os dados são sincronizados diariamente para manter as informações atualizadas. A integração é totalmente segura, com criptografia e certificados SSL, sem armazenarmos senhas bancárias."
    },
    {
      question: "Como a plataforma se integra com a Receita Federal?",
      answer: "Nossa integração com a Receita Federal permite: 1) Consulta automática da situação cadastral de CNPJs e CPFs; 2) Verificação de regularidade fiscal; 3) Emissão e consulta de certidões negativas de débitos; 4) Download automático de declarações e recibos de entrega; 5) Validação de notas fiscais; 6) Monitoramento do status de processos; 7) Acompanhamento de parcelamentos. A integração utiliza certificado digital e-CNPJ, garantindo autenticidade e segurança na transmissão de dados. O sistema também monitora mudanças na legislação e obrigações acessórias, mantendo sua empresa atualizada e em conformidade."
    }
  ],
  "seguranca_compliance": [
    {
      question: "Como a plataforma protege meus dados?",
      answer: "Nossa plataforma implementa múltiplas camadas de segurança: 1) Criptografia de ponta a ponta para todos os dados transmitidos; 2) Armazenamento em nuvem com criptografia AES-256; 3) Autenticação em dois fatores para acesso à conta; 4) Controle granular de permissões de usuários; 5) Monitoramento contínuo contra atividades suspeitas; 6) Backups automáticos diários com retenção de 30 dias; 7) Certificação ISO 27001 para gestão de segurança da informação; 8) Conformidade com a LGPD e outras regulamentações de proteção de dados; 9) Auditorias de segurança periódicas por empresas independentes; 10) Centro de dados redundantes em diferentes regiões geográficas."
    },
    {
      question: "Como sua plataforma atende à LGPD?",
      answer: "Nossa plataforma está em total conformidade com a LGPD (Lei Geral de Proteção de Dados) através de: 1) Política de privacidade clara e transparente; 2) Consentimento explícito para coleta e uso de dados; 3) Acesso restrito a dados pessoais apenas para funcionários autorizados; 4) Opção de exclusão de dados a pedido do titular; 5) Registro de operações de tratamento de dados; 6) DPO (Encarregado de Proteção de Dados) designado; 7) Avaliação de impacto sobre proteção de dados; 8) Processos definidos para notificação de vazamentos; 9) Treinamento regular da equipe sobre privacidade e proteção de dados; 10) Contratos com cláusulas específicas sobre proteção de dados com fornecedores e parceiros."
    },
    {
      question: "Qual a importância do compliance fiscal para minha empresa?",
      answer: "O compliance fiscal é fundamental pois: 1) Evita multas e penalidades por descumprimento de obrigações; 2) Previne bloqueios em certidões negativas de débitos; 3) Facilita acesso a crédito e financiamentos; 4) Melhora a imagem da empresa perante clientes e fornecedores; 5) Reduz riscos de fiscalizações e autuações; 6) Proporciona maior segurança nas tomadas de decisões; 7) Permite planejamento tributário eficiente e legal; 8) Evita responsabilização pessoal de sócios e administradores; 9) Viabiliza participação em licitações públicas; 10) Valoriza o negócio em caso de venda ou fusão. Nossa plataforma monitora constantemente a conformidade fiscal de sua empresa, alertando sobre riscos e sugerindo ações preventivas."
    }
  ]
};

// Detalhamento do plano de desenvolvimento
export const developmentPlan: DevelopmentPhase[] = [
  {
    phase: 1,
    title: "Fundações e Cadastro Aprimorado",
    description: "Solidificação da base da plataforma e implementação do sistema de cadastro detalhado",
    status: "in_progress",
    progressPercentage: 15,
    sections: [
      {
        id: "1.1",
        title: "Revisão e Confirmação da Arquitetura da Plataforma",
        description: "Garantir que a arquitetura existente está pronta para suportar as novas funcionalidades",
        status: "in_progress",
        tasks: [
          { description: "Analisar a escalabilidade da API do LLM escolhida", completed: true },
          { description: "Verificar a estrutura atual do banco de dados PostgreSQL", completed: false },
          { description: "Confirmar robustez do sistema de autenticação JWT", completed: false }
        ]
      },
      {
        id: "1.2",
        title: "Implementação do Cadastro Inteligente do Usuário",
        description: "Criar formulários de cadastro distintos e detalhados para Pessoa Física (PF) e Pessoa Jurídica (PJ)",
        status: "in_progress",
        tasks: [
          { description: "Desenvolver componentes de formulário reutilizáveis", completed: true },
          { description: "Criar o fluxo de cadastro para PF", completed: true },
          { description: "Criar o fluxo de cadastro para PJ", completed: true },
          { description: "Implementar validações de entrada para todos os campos", completed: false },
          { description: "Criar endpoints para processar dados de cadastro", completed: false },
          { description: "Implementar lógica de validação no backend", completed: false }
        ]
      },
      {
        id: "1.3",
        title: "Ajustes no Modelo de Banco de Dados",
        description: "Expandir o modelo de dados para acomodar informações coletadas no cadastro e futuras funcionalidades",
        status: "not_started",
        tasks: [
          { description: "Criar/Ajustar tabelas users e companies", completed: false },
          { description: "Criar tabelas para profiles_pf e profiles_pj", completed: false },
          { description: "Criar tabelas para dependents, user_assets, user_debts, company_debts", completed: false },
          { description: "Definir relacionamentos, índices e constraints", completed: false },
          { description: "Manter tabela audit_logs", completed: false }
        ]
      }
    ]
  },
  {
    phase: 2,
    title: "Funcionalidades Essenciais da IA Contábil",
    description: "Implementação de apuração de impostos e geração de obrigações acessórias",
    status: "not_started",
    progressPercentage: 0,
    sections: [
      {
        id: "2.1",
        title: "Apuração de Impostos com IA",
        description: "Automatizar o cálculo de impostos para PF e PJ",
        status: "not_started",
        tasks: [
          { description: "Desenvolver lógica para cálculo automático do IRPF", completed: false },
          { description: "Integrar com o LLM para regras fiscais complexas", completed: false },
          { description: "Desenvolver geração da prévia da declaração de IR", completed: false },
          { description: "Desenvolver apuração mensal do DAS (Simples Nacional)", completed: false },
          { description: "Desenvolver apuração de outros impostos conforme regime", completed: false },
          { description: "Criar endpoints para cálculos e guias", completed: false }
        ]
      },
      {
        id: "2.2",
        title: "Geração de Obrigações Acessórias",
        description: "Automatizar a geração de obrigações acessórias para PJ",
        status: "not_started",
        tasks: [
          { description: "Mapear dados necessários para cada obrigação", completed: false },
          { description: "Desenvolver lógica de geração dos arquivos", completed: false },
          { description: "Criar tabela tax_reports", completed: false }
        ]
      }
    ]
  },
  {
    phase: 3,
    title: "Gestão Financeira e de Pessoal com IA",
    description: "Implementação de folha de pagamento automatizada e análise financeira",
    status: "not_started",
    progressPercentage: 0,
    sections: [
      {
        id: "3.1",
        title: "Folha de Pagamento Automatizada",
        description: "Implementar um módulo completo para gestão da folha de pagamento",
        status: "not_started",
        tasks: [
          { description: "Criar interface para cadastro de funcionários", completed: false },
          { description: "Criar tabela employees", completed: false },
          { description: "Desenvolver lógica para cálculo de salários e encargos", completed: false },
          { description: "Gerar holerites", completed: false },
          { description: "Gerar guias para obrigações trabalhistas", completed: false }
        ]
      },
      {
        id: "3.2",
        title: "Análise Financeira Automatizada com IA",
        description: "Fornecer dashboards e insights financeiros",
        status: "not_started",
        tasks: [
          { description: "Desenvolver componentes de dashboard", completed: false },
          { description: "Criar/Ajustar tabela financial_data", completed: false },
          { description: "Desenvolver APIs para processar dados financeiros", completed: false },
          { description: "Implementar lógica para identificar inconsistências", completed: false },
          { description: "Gerar alertas e notificações", completed: false },
          { description: "Desenvolver sistema de recomendações", completed: false }
        ]
      }
    ]
  },
  {
    phase: 4,
    title: "Suporte Inteligente e Funcionalidades Adicionais",
    description: "Implementação de suporte preditivo, exportação de documentos e funcionalidades extras",
    status: "not_started",
    progressPercentage: 0,
    sections: [
      {
        id: "4.1",
        title: "Suporte Preditivo com IA",
        description: "Tornar a IA mais proativa e oferecer suporte especializado",
        status: "not_started",
        tasks: [
          { description: "Desenvolver sugestões de planejamento tributário", completed: false },
          { description: "Expandir alertas para cobrir riscos fiscais", completed: false },
          { description: "Implementar interface de chatbot fiscal", completed: false },
          { description: "Integrar LLM para responder dúvidas fiscais", completed: false }
        ]
      },
      {
        id: "4.2",
        title: "Exportação de Documentos e Integrações",
        description: "Permitir exportação de dados e integração com outros sistemas",
        status: "not_started",
        tasks: [
          { description: "Implementar geração de PDFs", completed: false },
          { description: "Desenvolver envio automático por e-mail", completed: false },
          { description: "Planejar integração com API da Receita Federal", completed: false },
          { description: "Planejar exportação para softwares contábeis", completed: false }
        ]
      },
      {
        id: "4.3",
        title: "Funcionalidades Extras da Plataforma",
        description: "Melhorar a usabilidade e a gestão da plataforma",
        status: "not_started",
        tasks: [
          { description: "Implementar 'Salvar e Continuar Depois'", completed: false },
          { description: "Internacionalizar o frontend", completed: false },
          { description: "Ajustar para suporte a múltiplas empresas", completed: false },
          { description: "Desenvolver painel administrativo", completed: false }
        ]
      }
    ]
  }
];

// Enhanced function to find the best response based on user input with better categorization
export const findBestResponse = (userInput: string, includeFile: boolean = false) => {
  // Convert to lowercase for case-insensitive matching
  const inputLower = userInput.toLowerCase();
  
  // Enhanced keywords for each category to help with classification
  const categoryKeywords = {
    consultoria_contabil: ["tipo societário", "abrir empresa", "abertura", "regularização", "contrato social", "junta comercial", "cnpj", "mei", "ltda", "alvará", "licença", "registro"],
    planejamento_tributario: ["regime tributário", "imposto", "tributário", "simples nacional", "lucro presumido", "lucro real", "carga tributária", "planejamento fiscal", "redução de impostos", "das", "irpj", "pagar menos"],
    contabilidade: ["contabilidade", "balanço", "dre", "demonstrativo", "escrituração", "livro contábil", "ativo", "passivo", "patrimônio", "lançamentos"],
    obrigacoes_fiscais: ["obrigação fiscal", "declaração", "dctf", "sped", "efd", "guia", "darf", "prazo", "multa", "atraso", "fiscal"],
    departamento_pessoal: ["funcionário", "contratação", "demissão", "folha", "pagamento", "férias", "13º", "salário", "inss", "fgts", "esocial", "trabalhista"],
    consultoria_financeira: ["financeiro", "consultoria", "análise", "investimento", "expansão", "custo", "margem", "lucratividade", "indicadores", "fluxo de caixa"],
    obrigacoes_anuais: ["anual", "defis", "ecf", "declaração anual", "prazo anual", "obrigações anuais", "arquivar", "guardar documentos"],
    processamento_documentos: ["documento", "nota fiscal", "recibo", "extrato", "digitalização", "ocr", "armazenamento", "organização", "classificação"],
    inteligencia_negocio: ["tendência", "previsão", "redução de custo", "simulação", "crescimento", "indicadores", "dashboard", "insights", "projeção"],
    integracao_sistemas: ["integração", "banco", "erp", "api", "conexão", "importação", "exportação", "automação", "sincronização", "open banking"],
    seguranca_compliance: ["segurança", "compliance", "lgpd", "proteção", "criptografia", "backup", "auditoria", "conformidade", "certificado"]
  };
  
  // Determine which category the question belongs to
  let bestCategory = "consultoria_contabil"; // Default
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
      
      // Enhanced similarity check based on word overlap and direct phrase matches
      const questionWords = questionLower.split(' ');
      const inputWords = inputLower.split(' ');
      
      // Check for direct phrases (3+ word sequences)
      let phraseMatchScore = 0;
      for (let i = 0; i < inputWords.length - 2; i++) {
        const phrase = inputWords.slice(i, i+3).join(' ');
        if (questionLower.includes(phrase)) {
          phraseMatchScore += 2; // Give more weight to phrase matches
        }
      }
      
      // Check for individual important words
      const commonWords = questionWords.filter(word => 
        inputWords.includes(word) && word.length > 3 // Only count meaningful words
      );
      
      const similarity = (commonWords.length / Math.max(questionWords.length, inputWords.length)) + phraseMatchScore;
      
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
  
  // Choose most relevant response from the category or random if can't determine
  let response;
  if (bestScore > 0) {
    // Try to pick most relevant from category by finding answer with most keyword matches
    let bestResponseIndex = 0;
    let bestResponseScore = 0;
    
    categoryResponses.forEach((qa, index) => {
      const responseScore = inputLower.split(' ').filter(word => 
        qa.answer.toLowerCase().includes(word) && word.length > 4
      ).length;
      
      if (responseScore > bestResponseScore) {
        bestResponseScore = responseScore;
        bestResponseIndex = index;
      }
    });
    
    response = categoryResponses[bestResponseIndex].answer;
  } else {
    // If no clear relevance, pick random response from category
    response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)].answer;
  }

  // If there's an attachment, add context about it
  if (includeFile) {
    response = `Analisei seu documento e identifiquei as seguintes informações: \n\n${response}\n\nPara uma análise mais detalhada e específica sobre este documento, recomendo agendar uma consultoria com um de nossos especialistas contábeis.`;
  }

  return response;
};

// Nova função para informações sobre as fases do projeto
export const getPhaseInfo = (phaseNumber: number): DevelopmentPhase | undefined => {
  return developmentPlan.find(phase => phase.phase === phaseNumber);
};

// Nova função para informações sobre seções específicas
export const getSectionInfo = (sectionId: string): PhaseSection | undefined => {
  for (const phase of developmentPlan) {
    const section = phase.sections.find(section => section.id === sectionId);
    if (section) {
      return section;
    }
  }
  return undefined;
};

// Nova função para responder perguntas sobre o desenvolvimento
export const getDevelopmentInfo = (userInput: string): string => {
  const inputLower = userInput.toLowerCase();
  
  // Verifica se a pergunta é sobre uma fase específica
  if (inputLower.includes("fase 1") || inputLower.includes("fundações") || inputLower.includes("cadastro")) {
    const phase = getPhaseInfo(1);
    if (phase) {
      return `**${phase.title}**: ${phase.description}\n\nStatus: ${formatStatus(phase.status)}\nProgresso: ${phase.progressPercentage}%\n\nSeções principais:\n${phase.sections.map(s => `- ${s.title}: ${formatStatus(s.status)}`).join('\n')}`;
    }
  }
  
  if (inputLower.includes("fase 2") || inputLower.includes("impostos") || inputLower.includes("obrigações")) {
    const phase = getPhaseInfo(2);
    if (phase) {
      return `**${phase.title}**: ${phase.description}\n\nStatus: ${formatStatus(phase.status)}\nProgresso: ${phase.progressPercentage}%\n\nSeções principais:\n${phase.sections.map(s => `- ${s.title}: ${formatStatus(s.status)}`).join('\n')}`;
    }
  }
  
  if (inputLower.includes("fase 3") || inputLower.includes("folha") || inputLower.includes("análise financeira")) {
    const phase = getPhaseInfo(3);
    if (phase) {
      return `**${phase.title}**: ${phase.description}\n\nStatus: ${formatStatus(phase.status)}\nProgresso: ${phase.progressPercentage}%\n\nSeções principais:\n${phase.sections.map(s => `- ${s.title}: ${formatStatus(s.status)}`).join('\n')}`;
    }
  }
  
  if (inputLower.includes("fase 4") || inputLower.includes("suporte") || inputLower.includes("exportação")) {
    const phase = getPhaseInfo(4);
    if (phase) {
      return `**${phase.title}**: ${phase.description}\n\nStatus: ${formatStatus(phase.status)}\nProgresso: ${phase.progressPercentage}%\n\nSeções principais:\n${phase.sections.map(s => `- ${s.title}: ${formatStatus(s.status)}`).join('\n')}`;
    }
  }
  
  // Resposta geral sobre o plano de desenvolvimento
  return `**Plano de Desenvolvimento da IA Contábil**\n\nO plano está dividido em 4 fases principais:\n\n1. ${developmentPlan[0].title} (${formatStatus(developmentPlan[0].status)}, ${developmentPlan[0].progressPercentage}%)\n2. ${developmentPlan[1].title} (${formatStatus(developmentPlan[1].status)}, ${developmentPlan[1].progressPercentage}%)\n3. ${developmentPlan[2].title} (${formatStatus(developmentPlan[2].status)}, ${developmentPlan[2].progressPercentage}%)\n4. ${developmentPlan[3].title} (${formatStatus(developmentPlan[3].status)}, ${developmentPlan[3].progressPercentage}%)\n\nPergunte sobre uma fase específica para mais detalhes.`;
};

// Função auxiliar para formatar status
const formatStatus = (status: 'not_started' | 'in_progress' | 'completed'): string => {
  switch (status) {
    case 'not_started':
      return '⚪ Não iniciado';
    case 'in_progress':
      return '🟠 Em andamento';
    case 'completed':
      return '🟢 Concluído';
  }
};
