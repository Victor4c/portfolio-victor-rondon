/**
 * Base de Dados Completa e Estruturada do Portfólio
 * Victor Gabriel de Sales Rondon — AI Builder & Economia
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Victor Gabriel de Sales Rondon",
    headline: "AI Builder • Automação de Dados & Inteligência Comercial • Ciências Econômicas (UFMT)",
    bio: "Graduando em Economia na UFMT e Gerente Comercial na Fácil Consultoria. Desenvolvo automações, ferramentas de dados e produtos digitais com Inteligência Artificial que reduzem trabalho manual e geram eficiência operacional.",
    location: "Cuiabá, MT — Disponível para atuação Remota",
    linkedin: "https://www.linkedin.com/in/victor-gabriel-rondon-714840310",
    lattes: "http://lattes.cnpq.br/5620235852309381",
    github: "https://github.com",
    metrics: [
      { label: "Projetos", value: "6", sub: "Sistemas e produtos desenvolvidos" },
      { label: "Horas Comprovadas", value: "+600h", sub: "Pesquisa, Extensão e Cursos" },
      { label: "Produção Científica", value: "3", sub: "Artigos publicados e apresentados" },
      { label: "Certificações", value: "25", sub: "Comprovantes oficiais validados" }
    ]
  },

  projects: [
    {
      id: "pipeline-leads",
      title: "Pipeline de Inteligência Comercial & Qualificação de Leads",
      tagline: "Extração na Receita Federal, enriquecimento via Google Maps, scoring preditivo em 3 eixos e integração com CRM.",
      category: "Automação Comercial & IA",
      badge: "Produção & Testes CRM",
      impact: "Redução de +80% no tempo de prospecção manual com qualificação preditiva automática",
      summary: "Automatiza a captura e qualificação de empresas B2B cruzando a base da Receita Federal com dados em tempo real do Google Maps (Apify), classificando a propensão de compra antes de enviar ao EspoCRM.",
      architecture: [
        { step: "1. Ingestão & Filtragem", desc: "Varredura na base pública da Receita Federal armazenada em SQLite local por CNAE, porte e município." },
        { step: "2. Validação Externa (Apify)", desc: "Consulta automatizada no Google Maps via ApifyMapsClient com cache SQLite permanente e rotação inteligente de tokens para checar atividade real, telefone e avaliações." },
        { step: "3. Motor de Scoring Heurístico", desc: "LeadClassifier avalia 3 eixos de propensão: Precificação Estratégica, NPS/Retenção e Viabilidade Econômica, gerando matriz de dores e pitches personalizados." },
        { step: "4. Gateway & CRM Integration", desc: "Backend em FastAPI que expõe endpoints de consulta e automatiza o envio estruturado dos leads para o EspoCRM conectado via Cloudflare Tunnel." }
      ],
      codeSnippet: `class LeadClassifier:
    """Classificador heurístico para priorização B2B por eixo de oferta"""
    def score_lead(self, company_data: dict) -> dict:
        score_precificacao = self._calc_pricing_friction(company_data)
        score_nps = self._calc_reputation_deficit(company_data.get("rating"), company_data.get("reviews"))
        score_viabilidade = self._calc_expansion_fit(company_data.get("capital_social"))
        
        return {
            "prioridade": "Alta" if (score_precificacao + score_nps) > 14 else "Média",
            "pitch_recomendado": self._generate_tailored_pitch(company_data),
            "eixos": {"precificacao": score_precificacao, "nps": score_nps, "viabilidade": score_viabilidade}
        }`,
      techStack: ["Python", "FastAPI", "SQLite", "Apify API", "OpenCNPJ API", "EspoCRM", "Cloudflare Tunnel", "Pandas", "Openpyxl"],
      diagramImage: "assets/diagrama-arquitetura-leads.svg",
      results: [
        "Eliminação de mais de 80% do tempo gasto em prospecção manual fria pela equipe de consultores.",
        "Padronização da abordagem comercial com pitches dinâmicos orientados às dores reais de cada empresa.",
        "Validação de dados em tempo real sem estourar quotas de API graças à arquitetura de cache local."
      ],
      link: null
    },
    {
      id: "gerador-slides",
      title: "Motor de Geração Inteligente de Apresentações Executivas",
      tagline: "Automação determinística e IA generativa para converter roteiros estruturados em slides corporativos (.pptx).",
      category: "Workflows Generativos & IA",
      badge: "Operacional",
      impact: "Geração de apresentações executivas em minutos com até 70% de economia de tokens",
      summary: "Converte roteiros estruturados em JSON diretamente em apresentações PowerPoint (.pptx) padronizadas, combinando renderização local via python-pptx e geração visual via 2Slides API (MCP).",
      architecture: [
        { step: "1. Entrada Estruturada", desc: "Recebe o conteúdo analítico e a hierarquia da apresentação em formato JSON padronizado (deck_data.json)." },
        { step: "2. Orquestração e Prompt Engineering", desc: "Mapeia tópicos conceituais para arquétipos visuais de alta legibilidade (cards comparativos, matrizes de decisão, timelines e grids métricos)." },
        { step: "3. Renderização Híbrida", desc: "Combina a precisão do python-pptx para templates corporativos locais com a flexibilidade da 2Slides API / MCP para layouts complexos." },
        { step: "4. Token-Saving & Reuso", desc: "Executa micro-edits e reuso de motor base, reduzindo o custo de tokens em até 70% comparado a gerações do zero." }
      ],
      codeSnippet: `def render_deck_from_spec(deck_data_path: str, output_pptx: str):
    """Motor determinístico de geração de slides via python-pptx e 2Slides MCP"""
    with open(deck_data_path, "r", encoding="utf-8") as f:
        spec = json.load(f)
    
    prs = Presentation()
    for slide_def in spec["slides"]:
        layout_type = slide_def.get("archetype", "comparison_cards")
        builder = ArchetypeRegistry.get(layout_type)
        builder.render(prs, slide_def)
        
    prs.save(output_pptx)`,
      techStack: ["Python", "python-pptx", "Model Context Protocol (MCP)", "2Slides API", "JSON Schema", "Token-Saving"],
      results: [
        "Capacidade de gerar decks executivos de 10 a 20 slides formatados em minutos.",
        "Eliminação de retrabalho de design por meio de arquétipos estruturados reutilizáveis.",
        "Integração direta com ferramentas de produtividade para geração de relatórios de consultoria."
      ],
      link: null
    },
    {
      id: "site-facil",
      title: "Website Institucional — Fácil Consultoria",
      tagline: "Interface moderna de alta performance criada com design tokens, microinterações a 60fps e prototipação com IA.",
      category: "UI Engineering & Web",
      badge: "No Ar",
      impact: "Canal oficial de captação B2B em produção com carregamento instantâneo e 60fps",
      summary: "Desenvolvimento e publicação do site institucional da Fácil Consultoria (UFMT), estruturado com Design Tokens em CSS, microinterações fluidas em JavaScript Vanilla e alta performance em SEO.",
      architecture: [
        { step: "1. Prototipação com Stitch MCP", desc: "Geração de variantes visuais, fluxos de usuário e hierarquia de componentes diretamente no fluxo assistido por IA." },
        { step: "2. Arquitetura de Design Tokens", desc: "Centralização de variáveis em CSS Custom Properties (cores, elevações, tipografia e espaçamentos simétricos)." },
        { step: "3. Microinterações & Física Magnética", desc: "Implementação em JavaScript Vanilla de botões magnéticos, scroll storytelling e animações suaves mantendo taxa de 60fps." },
        { step: "4. SEO & Acessibilidade", desc: "HTML5 semântico, pontuação máxima em Core Web Vitals e responsividade completa para dispositivos móveis." }
      ],
      codeSnippet: `:root {
  --color-primary: #101828;
  --color-accent: #2563eb;
  --color-surface-translucent: rgba(255, 255, 255, 0.05);
  --easing-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Microinteração magnética nativa */
.magnetic-btn {
  transition: transform 0.2s var(--easing-smooth);
  will-change: transform;
}`,
      techStack: ["HTML5 Semântico", "CSS3 Moderno", "Design Tokens", "JavaScript Vanilla", "Stitch MCP", "Git / Deploy Web"],
      results: [
        "Site oficial no ar transmitindo autoridade e posicionamento institucional premium.",
        "Performance extrema sem dependências pesadas de frameworks, garantindo carregamento instantâneo.",
        "Canal direto de captação de clientes integrado à estratégia comercial da empresa júnior."
      ],
      link: "https://facilconsultoria.com"
    },
    {
      id: "contabilidade-social-web",
      title: "Plataforma Interativa de Contabilidade Social",
      tagline: "Guia web interativo de referência do Sistema de Contas Nacionais com cálculo de PIB, identidades e glossário dinâmico.",
      category: "EdTech & Economia Aplicada",
      badge: "No Ar",
      impact: "Ferramenta pedagógica ativa na monitoria da UFMT com +20 siglas e identidades do PIB",
      summary: "Aplicação web interativa criada para apoiar os alunos na monitoria de Contabilidade Social da UFMT, reunindo todas as fórmulas do PIB (Produto, Renda e Despesa), poupança e glossário dinâmico.",
      architecture: [
        { step: "1. Mapeamento Didático de Fórmulas", desc: "Sistematização de todas as equações macroeconômicas oficiais (PIBpm, PIBcf, PIL, PNB, VAB = VBP - CI, S = I)." },
        { step: "2. Arquitetura Modular em Seções", desc: "Divisão lógica por blocos: Identidades Fundamentais, Agregados do Produto, Óticas de Cálculo, Renda Nacional e Setor Externo." },
        { step: "3. Painel Retrátil de Glossário", desc: "Componente interativo em JavaScript Vanilla para consulta rápida de siglas e conceitos econômicos sem perder o foco de leitura." },
        { step: "4. Deploy & CI/CD no Netlify", desc: "Hospedagem estática de alta velocidade com entrega instantânea e disponibilidade contínua." }
      ],
      codeSnippet: `<!-- Identidade Fundamental do PIB pela ótica da despesa -->
<div class="formula-card">
  <div class="formula">Y = C + I + G + (X - M)</div>
  <div class="formula-description">Identidade básica do PIB pela ótica da despesa</div>
</div>

<!-- Painel interativo de glossário -->
<aside class="glossary-panel" id="glossary">
  <h3>GLOSSÁRIO DE SIGLAS</h3>
  <div class="glossary-grid">...</div>
</aside>`,
      techStack: ["HTML5 Semântico", "CSS3 Grid / Flexbox", "JavaScript Vanilla", "Netlify CI/CD", "Contabilidade Social"],
      results: [
        "Plataforma no ar e acessível publicamente em victorgsr.netlify.app como material de apoio aos estudantes da UFMT.",
        "Redução de dúvidas recorrentes durante as sessões de monitoria de Contabilidade Social.",
        "Demonstração prática de capacidade de criar produtos digitais educacionais focados em economia."
      ],
      link: "https://victorgsr.netlify.app"
    },
    {
      id: "livro-diario-automacao",
      title: "Automação de Livros Diários & Conciliação Multicliente",
      tagline: "Pipeline em Python para parsing, normalização e conversão de extratos bancários brutos em livros diários contábeis.",
      category: "Automação Financeira & Dados",
      badge: "Operacional",
      impact: "Economia de +30h mensais padronizando extratos para 5 instituições com zero erro de digitação",
      summary: "Processa extratos bancários heterogêneos (Stone, Sicoob, TXT, PDF e Excel) e gera automaticamente planilhas financeiras e livros diários auditáveis de 7 colunas para 5 instituições clientes.",
      architecture: [
        { step: "1. Ingestão Heterogênea Multiformato", desc: "Mecanismo auto-detect que ingere extratos brutos em TXT, CSV, PDF ou Excel sem necessidade de pré-conversão manual." },
        { step: "2. Motor de Parsing & Regex Inteligente", desc: "Expressões regulares customizadas para extração cirúrgica de datas, contrapartes, CPF/CNPJ de favorecidos e valores de débito/crédito." },
        { step: "3. Categorização & Regras de Negócio", desc: "Classificador que padroniza categorias financeiras (Pix, Boletos, Tarifas, Faturas, Aplicações) e sinaliza operações de reserva." },
        { step: "4. Saída Canônica & Auditoria", desc: "Geração de planilhas Excel formatadas no layout estrito de 7 colunas contábeis prontas para fechamento e conciliação." }
      ],
      codeSnippet: `def categorize_description(desc: str) -> tuple[str, str]:
    """Mapeamento canônico e classificação automática de transações financeiras"""
    rules = [
        ("Transf Pix recebida", "Pix Recebida"),
        ("Transf Pix enviada", "Pix Enviada"),
        ("Pagamento da fatura", "Pagamento da Fatura"),
        ("Boleto pago", "Pagamento de Boleto"),
        ("Reserva Stone", "Reserva Stone"),
        ("Investimento", "Investimento / Aplicação")
    ]
    for pattern, label in rules:
        if pattern.lower() in desc.lower():
            return label, desc.strip()
    return "Outros", desc.strip()`,
      techStack: ["Python", "Pandas", "NumPy", "Regex", "Openpyxl", "Engenharia Contábil", "Single-Engine Reuse"],
      results: [
        "Economia de mais de 30 horas mensais em conciliação contábil manual da equipe de consultoria.",
        "Padronização contábil canônica aplicada com sucesso a 5 empresas juniores e instituições clientes.",
        "Zero erro humano de digitação em valores monetários e documentos fiscais (CPF/CNPJ)."
      ],
      link: null
    },
    {
      id: "viabilidade-advocacia",
      title: "Modelagem de Viabilidade Econômico-Financeira",
      tagline: "Estruturação financeira completa com VPL, TIR, Payback e projeção de cenários de expansão para escritório de advocacia.",
      category: "Análise Econômico-Financeira",
      badge: "Concluído",
      impact: "Diagnóstico completo de VPL, TIR, TMA e Payback embasando decisão de investimento societário",
      summary: "Modelagem financeira completa para avaliação de retorno e expansão de escritório jurídico, projetando fluxos de caixa incrementais e matriz de sensibilidade em múltiplos cenários.",
      architecture: [
        { step: "1. Levantamento Contábil e Financeiro", desc: "Mapeamento minucioso de custos fixos, variáveis, regime tributário e receitas históricas por área de atuação jurídica." },
        { step: "2. Modelagem de Fluxo de Caixa Incremental", desc: "Estruturação de demonstrações financeiras em Excel com segregação de receitas operacionais e despesas de expansão." },
        { step: "3. Cálculo de Indicadores de Atratividade", desc: "Apuração precisa de Valor Presente Líquido (VPL), Taxa Interna de Retorno (TIR), Taxa Mínima de Atratividade (TMA) e Payback Descontado." },
        { step: "4. Simulação de Cenários e Sensibilidade", desc: "Elaboração de matriz de cenários (otimista, realista e pessimista) para embasar decisões do corpo societário." }
      ],
      codeSnippet: `VPL = \\sum_{t=1}^{n} \\frac{FC_t}{(1 + TMA)^t} - Investimento\\_Inicial

TIR: Taxa que torna o VPL = 0
Payback Descontado: Tempo de recuperação do capital investido considerando o custo de oportunidade.`,
      techStack: ["Microsoft Excel", "Modelagem Financeira", "Matemática Financeira", "Análise de Sensibilidade", "Consultoria Empresarial"],
      results: [
        "Entrega de relatório executivo com recomendações claras de precificação de honorários e controle de custos.",
        "Definição da capacidade de endividamento e prazo seguro de retorno para investimentos em infraestrutura.",
        "Subsídio técnico baseado em dados para o plano estratégico dos sócios."
      ],
      link: null
    }
  ],

  certificates: [
    // 1. Artigos & Produção Científica
    {
      id: "art-1",
      title: "Apresentação de Artigo no V ENJP / ABEIN",
      subtitle: "Comportamento das importações nos setores industriais de baixa intensidade tecnológica: uma Análise Insumo-Produto (1995-2020)",
      category: "artigos",
      institution: "ABEIN — Associação Brasileira de Economia Industrial e Inovação",
      hours: "20 horas",
      date: "11 a 13/08/2025",
      file: "assets/certificados/artigo-venjp-insumo-produto-2025.pdf",
      fileType: "pdf",
      tags: ["Insumo-Produto", "Economia Industrial", "Importações", "Comércio Internacional"]
    },
    {
      id: "art-2",
      title: "Coautoria ENECOMAT 2025 — Quantum-Inspired Carbon Policy",
      subtitle: "Quantum-Inspired Mechanism Design for Carbon Policy Coordination: How Bell Inequality Violations Reveal Hidden Efficiency Gains in International Climate Agreements",
      category: "artigos",
      institution: "Faculdade de Economia - UFMT (XVIII ENECOMAT)",
      hours: "Publicação nos Anais",
      date: "23/09/2025",
      file: "assets/certificados/artigo-enecomat-quantum-carbon-policy-2025.pdf",
      fileType: "pdf",
      tags: ["Teoria dos Jogos Quânticos", "Carbon Policy", "Mechanism Design", "Economia Ambiental"]
    },
    {
      id: "art-3",
      title: "Coautoria ENECOMAT 2025 — Digital Inclusion Gap Analysis",
      subtitle: "Digital Inclusion Coordination Failures: A Quantum-Classical Gap Analysis of Multi-Stakeholder Technology Access Mechanisms",
      category: "artigos",
      institution: "Faculdade de Economia - UFMT (XVIII ENECOMAT)",
      hours: "Publicação nos Anais",
      date: "23/09/2025",
      file: "assets/certificados/artigo-enecomat-digital-inclusion-quantum-gap-2025.pdf",
      fileType: "pdf",
      tags: ["Inclusão Digital", "Coordination Failures", "Technology Access", "Microeconomia"]
    },

    // 2. Pesquisa e Iniciação Científica
    {
      id: "pesq-1",
      title: "Termo de Aceite — Iniciação Científica Voluntária (VIC/PROPESQ/UFMT)",
      subtitle: "Programa Institucional de Voluntariado em Iniciação Científica (2025-2026)",
      category: "pesquisa",
      institution: "PROPESQ / Universidade Federal de Mato Grosso",
      hours: "Vigência Anual",
      date: "01/09/2025 a 31/08/2026",
      file: "assets/certificados/iniciacao-cientifica-vic-propesq-ufmt-2025-2026.pdf",
      fileType: "pdf",
      tags: ["Iniciação Científica", "PROPESQ", "Pesquisa Empírica", "UFMT"]
    },
    {
      id: "pesq-2",
      title: "Projeto de Pesquisa: Levantamento de Preços de Terras em MT",
      subtitle: "PROPeq 75/2024 — Coleta, sistematização de dados primários e secundários rurais (Financiamento R$ 320.000)",
      category: "pesquisa",
      institution: "NuPES / Faculdade de Economia - UFMT",
      hours: "20h semanais",
      date: "12/2024 – Atual",
      file: "assets/certificados/projeto-pesquisa-precos-terras-mt-propeq-75-2024.pdf",
      fileType: "pdf",
      tags: ["Mercado de Terras", "Pesquisa Primária", "Economia Agrícola", "NuPES"]
    },
    {
      id: "pesq-3",
      title: "Projeto de Pesquisa: Análise Insumo-Produto Inter-regional",
      subtitle: "PROPeq 74/2025 — Explorando interdependências intra e inter-regionais nas estruturas produtivas",
      category: "pesquisa",
      institution: "NuPES / Faculdade de Economia - UFMT",
      hours: "5h semanais",
      date: "04/2025 – Atual",
      file: "assets/certificados/projeto-pesquisa-insumo-produto-propeq-74-2025.pdf",
      fileType: "pdf",
      tags: ["Insumo-Produto", "Estrutura Produtiva", "Economia Regional", "Valor Adicionado"]
    },
    {
      id: "pesq-4",
      title: "Declaração Consolidada SEI/UFMT de Pesquisa e Extensão",
      subtitle: "Comprovação oficial de atuação nos projetos de pesquisa e projetos de extensão universitária",
      category: "pesquisa",
      institution: "Universidade Federal de Mato Grosso (Processo SEI)",
      hours: "Consolidada",
      date: "16/09/2025",
      file: "assets/certificados/declaracao-sei-ufmt-projetos-pesquisa-extensao.pdf",
      fileType: "pdf",
      tags: ["Certidão Oficial", "SEI/UFMT", "Pesquisa", "Extensão"]
    },

    // 3. Extensão & Organização de Eventos
    {
      id: "ext-1",
      title: "Projeto de Extensão: Diálogos de Conjuntura Econômica",
      subtitle: "Co-Executor discente em 7 blocos temáticos: COPOM, dívida pública, sustentabilidade e Plano Real",
      category: "extensao",
      institution: "Faculdade de Economia - UFMT (SIEx)",
      hours: "195 horas",
      date: "09/09/2024 – 01/02/2026",
      file: "assets/certificados/extensao-dialogos-conjuntura-economica-195h.pdf",
      fileType: "pdf",
      tags: ["Conjuntura Econômica", "Política Monetária", "COPOM", "Dívida Pública"]
    },
    {
      id: "ext-2",
      title: "Projeto de Extensão: Fácil Consultoria — Facil Summit 2025",
      subtitle: "Comissão Organizadora do evento e membro atuante na Empresa Júnior de Economia",
      category: "extensao",
      institution: "Faculdade de Economia - UFMT (SIEx)",
      hours: "120 horas",
      date: "19/08/2024 – 19/08/2025",
      file: "assets/certificados/extensao-facil-consultoria-facil-summit-120h.pdf",
      fileType: "pdf",
      tags: ["Empresa Júnior", "Facil Summit", "Gestão de Eventos", "Inovação"]
    },
    {
      id: "ext-3",
      title: "Organização dos Eventos dos 60 Anos da Faculdade de Economia",
      subtitle: "Comissão organizadora das celebrações de 60 anos e encontro com trajetórias de egressos",
      category: "extensao",
      institution: "Faculdade de Economia - UFMT (SIEx)",
      hours: "100 horas",
      date: "13/08 e 17/09/2025",
      file: "assets/certificados/organizacao-eventos-60-anos-economia-ufmt-100h.pdf",
      fileType: "pdf",
      tags: ["Liderança", "Organização", "História Institucional", "UFMT"]
    },
    {
      id: "ext-4",
      title: "Organização e Extensão: XVIII ENECOMAT 2025",
      subtitle: "Colaborador na organização do Encontro sobre Economia Mato-grossense e projeto de extensão vinculado",
      category: "extensao",
      institution: "Faculdade de Economia - UFMT",
      hours: "Carga de Extensão",
      date: "Setembro de 2025",
      file: "assets/certificados/organizacao-extensao-xviii-enecomat-2025.pdf",
      fileType: "pdf",
      tags: ["ENECOMAT", "Tecnologia Quântica", "Organização de Congressos"]
    },

    // 4. Cursos: IA, Economia, Finanças e Dados
    {
      id: "cur-1",
      title: "Inteligência Artificial Aplicada à Regressão e Economia",
      subtitle: "Aplicações práticas de algoritmos de aprendizado de máquina e IA em modelos econométricos",
      category: "cursos",
      institution: "Faculdade de Economia - UFMT",
      hours: "Curso de Curta Duração",
      date: "23/09/2025",
      file: "assets/certificados/curso-ia-aplicada-regressao-economia.pdf",
      fileType: "pdf",
      tags: ["Inteligência Artificial", "Regressão", "Econometria", "Machine Learning"]
    },
    {
      id: "cur-2",
      title: "4ª Escola de Verão em Análise Insumo-Produto",
      subtitle: "Capacitação avançada em modelagem de matrizes intersetoriais e estruturas industriais",
      category: "cursos",
      institution: "GTAE-GIC / UFRJ e ABEIN",
      hours: "40 horas",
      date: "10 a 14/03/2025",
      file: "assets/certificados/escola-verao-analise-insumo-produto-ufrj-abein-40h.pdf",
      fileType: "pdf",
      tags: ["Insumo-Produto", "UFRJ", "ABEIN", "Estrutura Industrial"]
    },
    {
      id: "cur-3",
      title: "Investimento e Mercado Financeiro",
      subtitle: "Análise de investimentos, Teoria dos Jogos (Nash), CAPM/APM, Renda Fixa e Mercado de Derivativos",
      category: "cursos",
      institution: "Faculdade de Economia - UFMT",
      hours: "36 horas",
      date: "01/02 a 26/04/2025",
      file: "assets/certificados/curso-investimento-mercado-financeiro-ufmt-36h.pdf",
      fileType: "pdf",
      tags: ["Mercado Financeiro", "CAPM", "Derivativos", "Teoria dos Jogos"]
    },
    {
      id: "cur-4",
      title: "Modelagem Macroeconômica em Excel e R",
      subtitle: "Formalização matemática de modelos: Keynes, IS-LM, 3-Equações e Restrição de Balanço de Pagamentos",
      category: "cursos",
      institution: "Faculdade de Economia - UFMT",
      hours: "15 horas",
      date: "03/05 a 06/06/2025",
      file: "assets/certificados/curso-modelagem-macroeconomica-excel-r-ufmt-15h.pdf",
      fileType: "pdf",
      tags: ["Macroeconomia", "R", "Excel", "Modelagem Quantitativa"]
    },
    {
      id: "cur-5",
      title: "Oficina de Estatística Econômica",
      subtitle: "Análise exploratória, números índices, análise multidimensional e regressão linear múltipla",
      category: "cursos",
      institution: "Faculdade de Economia - UFMT",
      hours: "15 horas",
      date: "26 a 30/05/2025",
      file: "assets/certificados/oficina-estatistica-economica-ufmt-15h.pdf",
      fileType: "pdf",
      tags: ["Estatística", "Regressão Linear", "Análise de Dados", "Índices"]
    },
    {
      id: "cur-6",
      title: "Teoria dos Jogos: Clássicos e Quânticos",
      subtitle: "Análise comparativa entre equilíbrios em jogos clássicos e protocolos quânticos",
      category: "cursos",
      institution: "Faculdade de Economia - UFMT (XVIII ENECOMAT)",
      hours: "10 horas",
      date: "23/09/2025",
      file: "assets/certificados/curso-teoria-dos-jogos-classicos-quanticos-10h.pdf",
      fileType: "pdf",
      tags: ["Teoria dos Jogos", "Computação Quântica", "Equilíbrio Estratégico"]
    },
    {
      id: "cur-7",
      title: "Microsoft Word 2016 - Básico",
      subtitle: "Edição, diagramação de documentos e padronização corporativa",
      category: "cursos",
      institution: "Fundação Bradesco — Escola Virtual",
      hours: "9 horas",
      date: "27/05/2024",
      file: "assets/certificados/curso-microsoft-word-fundacao-bradesco-9h.pdf",
      fileType: "pdf",
      tags: ["Office", "Documentação", "Fundação Bradesco"]
    },

    // 5. Congressos, Seminários e Workshops
    {
      id: "eve-1",
      title: "4ª Edição do Evento Cidades Inovadoras",
      subtitle: "Debates sobre ecossistemas municipais de inovação, ciência e tecnologia no setor público",
      category: "eventos",
      institution: "SECITECI-MT e Associação Mato-grossense dos Municípios",
      hours: "20 horas",
      date: "01 a 03/07/2025",
      file: "assets/certificados/evento-cidades-inovadoras-seciteci-mt-20h.pdf",
      fileType: "pdf",
      tags: ["Inovação Pública", "Smart Cities", "SECITECI-MT", "Tecnologia"]
    },
    {
      id: "eve-2",
      title: "Semana do Economista da UEG",
      subtitle: "Desigualdade, Território e o Papel do Economista no Século XXI",
      category: "eventos",
      institution: "Universidade Estadual de Goiás (UEG)",
      hours: "12 horas",
      date: "11 a 15/08/2025",
      file: "assets/certificados/semana-economista-ueg-12h.pdf",
      fileType: "pdf",
      tags: ["Desenvolvimento Regional", "Desigualdade", "Economia Social"]
    },
    {
      id: "eve-3",
      title: "VI Semana de Economia da UFR",
      subtitle: "Ciências Econômicas e as Novas Perspectivas da Profissão",
      category: "eventos",
      institution: "FACAP / Universidade Federal de Rondonópolis (UFR)",
      hours: "11 horas",
      date: "05 a 07/11/2024",
      file: "assets/certificados/semana-economia-ufr-11h.pdf",
      fileType: "pdf",
      tags: ["Carreira Econômica", "UFR", "Tendências de Mercado"]
    },
    {
      id: "eve-4",
      title: "IV Seminário do NuPES / UFMT",
      subtitle: "Impactos da 1ª Ferrovia Estadual de MT via Insumo-Produto e Simulação de Cenários Tributários",
      category: "eventos",
      institution: "Faculdade de Economia - UFMT",
      hours: "6 horas",
      date: "21 e 22/08/2024",
      file: "assets/certificados/seminario-nupes-ufmt-ferrovia-tributacao-6h.pdf",
      fileType: "pdf",
      tags: ["Infraestrutura", "Ferrovia Estadual", "NuPES", "Tributação"]
    },
    {
      id: "eve-5",
      title: "Workshop Recrutamento e Seleção: Processos Eficientes",
      subtitle: "Capacitação em atração de talentos, triagem comportamental e estruturação de dinâmicas",
      category: "eventos",
      institution: "FACC / Faculdade de Economia - UFMT",
      hours: "6 horas",
      date: "16/08/2024",
      file: "assets/certificados/workshop-recrutamento-selecao-facc-ufmt-6h.png",
      fileType: "image",
      tags: ["Gestão de Pessoas", "Recrutamento", "RH Ágil", "FACC"]
    },
    {
      id: "eve-6",
      title: "Rumo ao Emprego: Uma Perspectiva Galega",
      subtitle: "Vida acadêmica e futuro profissional dos economistas no cenário europeu e global",
      category: "eventos",
      institution: "Faculdade de Economia - UFMT",
      hours: "4 horas",
      date: "26/02/2025",
      file: "assets/certificados/palestra-rumo-ao-emprego-perspectiva-galega-ufmt-4h.pdf",
      fileType: "pdf",
      tags: ["Mercado Global", "Inserção Profissional", "Economia Internacional"]
    },
    {
      id: "eve-7",
      title: "Palestra de Educação Financeira — Semana ENEF",
      subtitle: "Fundamentos de planejamento financeiro pessoal, cidadania econômica e cooperativismo",
      category: "eventos",
      institution: "Sicoob Integração e UFMT",
      hours: "1 hora",
      date: "13/05/2024",
      file: "assets/certificados/palestra-educacao-financeira-enef-sicoob-ufmt-1h.pdf",
      fileType: "pdf",
      tags: ["Educação Financeira", "ENEF", "Sicoob"]
    }
  ],

  categories: [
    { key: "todos", label: "Todos", count: 25 },
    { key: "artigos", label: "Artigos", count: 3 },
    { key: "pesquisa", label: "Pesquisa", count: 4 },
    { key: "extensao", label: "Extensão", count: 4 },
    { key: "cursos", label: "Cursos", count: 7 },
    { key: "eventos", label: "Congressos & Eventos", count: 7 }
  ],

  experience: [
    {
      role: "Gerente Comercial",
      org: "Fácil Consultoria (Empresa Júnior da UFMT)",
      period: "Fevereiro de 2026 – Atual",
      highlight: "Liderança de prospecção e arquitetura do motor autônomo de inteligência de dados.",
      bullets: [
        "Conduziu prospecção B2B (SDR/BDR) e gerenciou inovação em consultoria financeira e viabilidade.",
        "Idealizou e implementou o pipeline com Python, SQLite e Apify para captura e qualificação preditiva de leads.",
        "Desenvolveu o site institucional oficial (facilconsultoria.com) com microinterações e padrão editorial."
      ]
    },
    {
      role: "Vice-Presidente",
      org: "Centro Acadêmico da Faculdade de Economia (UFMT)",
      period: "05/2025 – 05/2026",
      highlight: "Representação estudantil e participação ativa em órgãos colegiados da universidade.",
      bullets: [
        "Atuação em conselhos deliberativos e comissões acadêmicas em prol do corpo discente.",
        "Articulação de semanas acadêmicas e integração entre discentes, docentes e mercado profissional."
      ]
    },
    {
      role: "Monitor Bolsista de Contabilidade Social",
      org: "Universidade Federal de Mato Grosso (UFMT)",
      period: "2025 – 2026",
      highlight: "Didática e reforço técnico em Contas Nacionais e identidades macroeconômicas.",
      bullets: [
        "Atendimento extraclasse para discentes na compreensão de agregados do PIB, fluxo de renda e balanço de pagamentos.",
        "Elaboração de listas comentadas e exercícios práticos para redução da retenção acadêmica."
      ]
    }
  ]
};

