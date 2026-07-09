// 1. DICIONÁRIO GLOBAL BILÍNGUE
export const textos = {
  pt: {
    tituloJogo: "Simulador de Vida: Gênese",
    menuNovaVida: "Nova Vida", menuCarregar: "Carregar Jogo", criadoPor: "Criado por",
    tituloCriacao: "Criação de Personagem", nome: "Nome:", idade: "Idade:", genero: "Gênero Biológico:",
    homem: "Homem", mulher: "Mulher", origem: "Cidade de Origem (Etnia):", local: "Onde mora atualmente:",
    iniciar: "Iniciar Vida", criador: "🌍 Criador de Cidades", voltar: "Voltar",
    quarto: "O Seu Quarto", descQuarto: "Este é o seu porto seguro. Planeje seu futuro, acesse o celular ou descanse.",
    dormir: "Dormir (+8h | 100% Energia)", sairRua: "Sair para a Rua", telemovel: "📱 Celular",
    mapa: "Mapa de Metrópole", descMapa: "As ruas da cidade guardam oportunidades e perigos. Para onde quer ir?",
    voltarCasa: "Voltar para o Quarto", dia: "Dia", atributos: "Os Seus Atributos",
    forca: "Força", reflexo: "Reflexo", inteligencia: "Inteligência", carisma: "Carisma", resistencia: "Resistência",
    exaustao: "Exaustão total! Você precisa dormir.", novoDia: "Um novo dia começou! O custo de vida foi cobrado.",
    saveSucesso: "Jogo salvo com sucesso!", loadSucesso: "Jogo carregado!", loadErro: "Nenhum save encontrado.",
    agencia: "💼 Agência de Empregos", academia: "🏋️ Academia", contatos: "👥 Lista de Contatos",
    baterPonto: "Trabalhar Turno (+4h)", treinarCorpo: "Treinar Pesado (-30⚡ | +4h)",
    gerarContato: "Buscar Novos Contatos nas Redes (-10⚡ | +1h)",
    traços: "Traços Únicos", empresaStatus: "Suas Empresas / Investimentos"
  },
  en: {
    tituloJogo: "Life Simulator: Genesis", menuNovaVida: "New Life", menuCarregar: "Load Game", criadoPor: "Created by", 
    tituloCriacao: "Character Creation", nome: "Name:", idade: "Age:", genero: "Biological Gender:", homem: "Male", mulher: "Female", 
    origem: "Birth City:", local: "Current City:", iniciar: "Start Life", criador: "🌍 City Creator", voltar: "Back", 
    quarto: "Your Room", descQuarto: "This is your safe haven. Plan your future, check your phone or rest.", 
    dormir: "Sleep (+8h | 100% Energy)", sairRua: "Go Outside", telemovel: "📱 Cellphone", mapa: "Metropolis Map", 
    descMapa: "The city streets hold opportunities and dangers. Where to go?", voltarCasa: "Return Room", dia: "Day", 
    atributos: "Your Attributes", forca: "Strength", reflexo: "Reflex", inteligencia: "Intelligence", carisma: "Charisma", 
    resistencia: "Endurance", exaustao: "Total exhaustion! You need to sleep.", novoDia: "A new day begun! Cost of living was charged.", 
    saveSucesso: "Game saved successfully!", loadSucesso: "Game loaded!", loadErro: "No save game found.", 
    agencia: "💼 Job Agency", academia: "🏋️ Gym", contatos: "👥 Contact List", baterPonto: "Work Shift (+4h)", 
    treinarCorpo: "Workout Hard (-30⚡ | +4h)", gerarContato: "Find New Contacts (-10⚡ | +1h)"
  }
};

// 2. MUNDO BASE
export const mundoInicial = {
  "SaoPaulo": { nome: "São Paulo", pais: "Brasil", custo_vida: 1.5, etnia: "Latina" },
  "Tokyo": { nome: "Tóquio", pais: "Japão", custo_vida: 2.0, etnia: "Asiática" },
  "Lagos": { nome: "Lagos", pais: "Nigéria", custo_vida: 1.2, etnia: "Negra" },
  "Oslo": { nome: "Oslo", pais: "Noruega", custo_vida: 2.8, etnia: "Branca" }
};

// 3. PROFISSÕES
export const profissoes = [
  { id: "TI", nome: "Programador Júnior", salario: 150, horas: 4, energia: 20, reqAttr: "inteligencia", reqMin: 40 },
  { id: "Mecanico", nome: "Mecânico", salario: 110, horas: 6, reqAttr: "forca", reqMin: 30 },
  { id: "Segurança", nome: "Segurança Noturno", salario: 120, horas: 4, energia: 35, reqAttr: "forca", reqMin: 45 },
  { id: "Vendas", nome: "Promotor de Vendas", salario: 130, horas: 4, energia: 25, reqAttr: "carisma", reqMin: 40 }
];

//4 - Nomes e Sobrenomes
export const culturas = {
  Latina: {
    nomesHomens: ["Carlos", "Miguel", "João", "Pedro", "Lucas", "Mateus", "Gabriel", "Rafael"],
    nomesMulheres: ["Ana", "Maria", "Julia", "Sofia", "Camila", "Mariana", "Beatriz", "Larissa"],
    sobrenomes: ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves"]
  },
  Asiática: {
    nomesHomens: ["Hiroshi", "Kenji", "Ren", "Sora", "Haruto", "Yuto", "Akira"],
    nomesMulheres: ["Yuki", "Sakura", "Hina", "Aoi", "Rin", "Mei", "Mio"],
    sobrenomes: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Nakamura"]
  },
  Negra: {
    nomesHomens: ["Kwame", "Tariq", "Malik", "Jamal", "Kofi", "DeAndre", "Terrence"],
    nomesMulheres: ["Amina", "Zuri", "Nia", "Aisha", "Keisha", "Imani", "Jada"],
    sobrenomes: ["Okafor", "Mensah", "Diallo", "Washington", "Jefferson", "Jackson"]
  },
  Mista: {
    nomesHomens: ["Alex", "Jordan", "Taylor", "Ryan", "Chris", "Sam", "Tyler"],
    nomesMulheres: ["Alex", "Jordan", "Taylor", "Riley", "Casey", "Morgan", "Sam"],
    sobrenomes: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis"]
  },
  Branca: {
    nomesHomens: ["Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin"],
    nomesMulheres: ["Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte"],
    sobrenomes: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer"]
  }
};
// 1. Catálogo de Veículos
export const veiculos = {
  bicicleta: { nome: "Bicicleta Usada", preco: 200, velocidade: 1.2 },
  moto: { nome: "Moto 125cc", preco: 2000, velocidade: 2.0 },
  carro: { nome: "Sedan Popular", preco: 15000, velocidade: 3.5 }
};

// 2. Catálogo de Lojas e Itens
export const lojas = {
  boutique: {
    nome: "Boutique Fashion",
    itens: [
      { id: "terno", nome: "Terno Elegante", preco: 500, tipo: "roupa", bonusCarisma: 10 },
      { id: "vestido", nome: "Vestido de Gala", preco: 600, tipo: "roupa", bonusCarisma: 12 }
    ]
  },
  concessionaria: {
    nome: "Garage Auto",
    veiculos: veiculos
  }
};
// 1. Banco de Eventos Aleatórios
export const eventos = [
  { id: "demissao", texto: "Você foi demitido devido a cortes de gastos na empresa!", efeito: { dinheiro: -200, reputacao: -10 } },
  { id: "achado", texto: "Achou uma nota de $100 na rua!", efeito: { dinheiro: 100 } },
  { id: "saude", texto: "Pegou uma gripe forte. Ficou de cama.", efeito: { energia: -50 } },
  { id: "heranca", texto: "Um parente distante deixou uma herança!", efeito: { dinheiro: 500 } },
  { id: "encontro", texto: "Conheceu alguém interessante no café...", efeito: { carisma: 1 } }
];

// 2. Modificadores por Idade (Para o motor de envelhecimento)
export const modificadoresIdade = {
  jovem: { forca: -5, resistencia: -5, inteligencia: +5 }, // < 20 anos
  adulto: { forca: 0, resistencia: 0, inteligencia: 0 },    // 20-50 anos
  idoso: { forca: -10, resistencia: -15, inteligencia: +5 } // > 50 anos
};

//##VALORES dos seios em CM e Polegadas.

// Medidas base (em cm)
export const medidasBase = {
  seios: { pequenos: 80, medios: 95, fartos: 115 },
  penis: { pequeno: 10, medio: 14, grande: 18, extraordinario: 22 }
};

// Função de conversão utilitária
export const cmParaPol = (cm) => (cm / 2.54).toFixed(1);

// Adicione isso no final do seu src/dados.js

export const catalogoRoupas = {
  comuns: [
    { id: "cam_branca", nome: "Camiseta Básica Branca", preco: 50, tipo: "roupaTop", valor: "Camiseta", cor: "#ffffff" },
    { id: "cam_preta", nome: "Camiseta Preta", preco: 55, tipo: "roupaTop", valor: "Camiseta", cor: "#222222" },
    { id: "calca_jeans", nome: "Calça Jeans Clássica", preco: 120, tipo: "roupaBottom", valor: "Calça", cor: "#1e3799" },
    { id: "calca_escura", nome: "Calça Sarja Escura", preco: 130, tipo: "roupaBottom", valor: "Calça", cor: "#111111" }
  ],
  academia: [
    { id: "top_treino", nome: "Top de Treino", preco: 80, tipo: "roupaTop", valor: "Top", cor: "#ff4757", genero: "Mulher" },
    { id: "regata_treino", nome: "Regata Cavada", preco: 60, tipo: "roupaTop", valor: "Camiseta", cor: "#34495e" },
    { id: "short_treino", nome: "Short de Corrida", preco: 70, tipo: "roupaBottom", valor: "Short", cor: "#2d3436" }
  ],
  intimasGerais: [
    { id: "intima_branca", nome: "Conjunto Algodão Branco", preco: 40, tipo: "roupaIntima", valor: true, cor: "#ffffff" },
    { id: "intima_preta", nome: "Conjunto Algodão Preto", preco: 45, tipo: "roupaIntima", valor: true, cor: "#222222" }
  ],
  intimasSensuais: [
    { id: "lingerie_vermelha", nome: "Lingerie de Renda Vermelha", preco: 150, tipo: "roupaIntima", valor: true, cor: "#c23616", genero: "Mulher" },
    { id: "lingerie_preta", nome: "Sutiã e Calcinha Noir", preco: 180, tipo: "roupaIntima", valor: true, cor: "#111", genero: "Mulher" },
    { id: "sunga_boxer", nome: "Sunga Boxer Seda", preco: 90, tipo: "roupaIntima", valor: true, cor: "#8c7ae6", genero: "Homem" }
  ]
};
