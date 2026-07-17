// Importar cidades expandidas
import { cidadesExpandidas, culturasExpandidas } from './cidades';

// 1. DICIONÁRIO GLOBAL BILÍNGUE
export const textos = {
  pt: {
    tituloJogo: "Simulador de Vida: Gênese",
    menuNovaVida: "Nova Vida", menuCarregar: "Carregar Jogo", criadoPor: "Criado por",
    tituloCriacao: "Criação de Personagem", nome: "Nome:", idade: "Idade:", genero: "Gênero Biológico:",
    homem: "Homem", mulher: "Mulher", origem: "Cidade de Origem (Etnia):", local: "Onde mora atualmente:",
    iniciar: "Iniciar Vida", criador: "🌍 Criador de Cidades", voltar: "Voltar",
    quarto: "Sua Casa", descQuarto: "Este é o seu porto seguro. Planeje seu futuro, acesse o celular ou descanse.",
    dormir: "Dormir (+8h | 100% Energia)", sairRua: "Sair para a Rua", telemovel: "📱 Celular",
    mapa: "Mapa de Metrópole", descMapa: "As ruas da cidade guardam oportunidades e perigos. Para onde quer ir?",
    voltarCasa: "Voltar para o Quarto", dia: "Dia", atributos: "Os Seus Atributos",
    forca: "Força", reflexo: "Reflexo", inteligencia: "Inteligência", carisma: "Carisma", resistencia: "Resistência",
    exaustao: "Exaustão total! Você precisa dormir.", novoDia: "Um novo dia começou! O custo de vida foi cobrado.",
    saveSucesso: "Jogo salvo com sucesso!", loadSucesso: "Jogo carregado!", loadErro: "Nenhum save encontrado.",
    agencia: "💼 Agência de Empregos", academia: "🏋️ Academia", contatos: "👥 Lista de Contatos",
    baterPonto: "Trabalhar Turno (+4h)", treinarCorpo: "Treinar Pesado (-30⚡ | +4h)",
    gerarContato: "Buscar Novos Contatos nas Redes (-10⚡ | +1h)",
    traços: "Traços Únicos", empresaStatus: "Suas Empresas / Investimentos",
    centroComercialTitulo: "🛍️ Centro Comercial Metrópolis",
    lojaRoupasTitulo: "Boutique Fashion",
    lojaVeiculosTitulo: "Concessionária HighDrive",
    imobiliariaTitulo: "Imobiliária Global Home",
    lojaGeralTitulo: "Loja de Conveniência",
    voltarMapa: "Voltar para o Mapa",
    distritoComercialTitulo: "Distrito Comercial & Corporativo",
    prefeituraTitulo: "Prefeitura e Concursos",
    delegaciaTitulo: "Delegacia de Polícia",
    hospitalTitulo: "Hospital Central",
    advocaciaTitulo: "Escritório de Advocacia",
    escritoriosTitulo: "Prédio de Escritórios"
  },
  en: {
    tituloJogo: "Life Simulator: Genesis", menuNovaVida: "New Life", menuCarregar: "Load Game", criadoPor: "Created by", 
    tituloCriacao: "Character Creation", nome: "Name:", idade: "Age:", genero: "Biological Gender:", homem: "Male", mulher: "Female", 
    origem: "Birth City:", local: "Current City:", iniciar: "Start Life", criador: "🌍 City Creator", voltar: "Back", 
    quarto: "Your Home", descQuarto: "This is your safe haven. Plan your future, check your phone or rest.", 
    dormir: "Sleep (+8h | 100% Energy)", sairRua: "Go Outside", telemovel: "📱 Cellphone", mapa: "Metropolis Map", 
    descMapa: "The city streets hold opportunities and dangers. Where to go?", voltarCasa: "Return Room", dia: "Day", 
    atributos: "Your Attributes", forca: "Strength", reflexo: "Reflex", inteligencia: "Intelligence", carisma: "Charisma", 
    resistencia: "Endurance", exaustao: "Total exhaustion! You need to sleep.", novoDia: "A new day begun! Cost of living was charged.", 
    saveSucesso: "Game saved successfully!", loadSucesso: "Game loaded!", loadErro: "No save game found.", 
    agencia: "💼 Job Agency", academia: "🏋️ Gym", contatos: "👥 Contact List", baterPonto: "Work Shift (+4h)", 
    treinarCorpo: "Workout Hard (-30⚡ | +4h)", gerarContato: "Find New Contacts (-10⚡ | +1h)",
    centroComercialTitulo: "🛍️ Metropolis Shopping Center",
    lojaRoupasTitulo: "Fashion Boutique",
    lojaVeiculosTitulo: "HighDrive Dealership",
    imobiliariaTitulo: "Global Home Real Estate",
    lojaGeralTitulo: "Convenience Store",
    voltarMapa: "Back to Map",
    distritoComercialTitulo: "Commercial & Corporate District",
    prefeituraTitulo: "City Hall and Public Exams",
    delegaciaTitulo: "Police Station",
    hospitalTitulo: "Central Hospital",
    advocaciaTitulo: "Law Office",
    escritoriosTitulo: "Office Building"
  }
};

// 2. MUNDO BASE - Importado de cidades.js
export const mundoInicial = cidadesExpandidas;

// 3. PROFISSÕES EXPANDIDAS - Carreira + Atributos
export const profissoes = [
  // === INTELIGÊNCIA ===
  { id: "prog_junior", nome: "Programador Júnior", salario: 150, horas: 4, energia: 20, reqAttr: "inteligencia", reqMin: 40, nivel: "junior" },
  { id: "prog_pleno", nome: "Programador Pleno", salario: 250, horas: 4, energia: 15, reqAttr: "inteligencia", reqMin: 60, nivel: "pleno" },
  { id: "prog_senior", nome: "Desenvolvedor Sênior", salario: 400, horas: 4, energia: 10, reqAttr: "inteligencia", reqMin: 80, nivel: "senior" },
  { id: "analista", nome: "Analista de Sistemas", salario: 200, horas: 4, energia: 18, reqAttr: "inteligencia", reqMin: 50, nivel: "pleno" },
  { id: "cientista", nome: "Cientista de Dados", salario: 300, horas: 4, energia: 20, reqAttr: "inteligencia", reqMin: 70, nivel: "senior" },
  { id: "professor", nome: "Professor Universitário", salario: 180, horas: 5, energia: 15, reqAttr: "inteligencia", reqMin: 60, nivel: "pleno" },
  { id: "pesquisador", nome: "Pesquisador", salario: 220, horas: 6, energia: 25, reqAttr: "inteligencia", reqMin: 65, nivel: "senior" },

  // === FORÇA ===
  { id: "mecanico", nome: "Mecânico", salario: 110, horas: 6, energia: 30, reqAttr: "forca", reqMin: 30, nivel: "junior" },
  { id: "mecanico_senior", nome: "Mecânico Especialista", salario: 200, horas: 5, energia: 25, reqAttr: "forca", reqMin: 50, nivel: "senior" },
  { id: "soldador", nome: "Soldador", salario: 140, horas: 6, energia: 35, reqAttr: "forca", reqMin: 45, nivel: "pleno" },
  { id: "construtor", nome: "Construtor Civil", salario: 130, horas: 8, energia: 40, reqAttr: "forca", reqMin: 35, nivel: "pleno" },
  { id: "carpinteiro", nome: "Carpinteiro", salario: 120, horas: 6, energia: 30, reqAttr: "forca", reqMin: 40, nivel: "pleno" },
  { id: "movedor", nome: "Movedor de Cargas", salario: 85, horas: 6, energia: 45, reqAttr: "forca", reqMin: 25, nivel: "junior" },
  { id: "lutador", nome: "Lutador Profissional", salario: 500, horas: 3, energia: 50, reqAttr: "forca", reqMin: 75, nivel: "senior" },

  // === CARISMA ===
  { id: "vendas_junior", nome: "Vendedor Júnior", salario: 100, horas: 4, energia: 20, reqAttr: "carisma", reqMin: 30, nivel: "junior" },
  { id: "vendas_senior", nome: "Gerente de Vendas", salario: 250, horas: 4, energia: 15, reqAttr: "carisma", reqMin: 60, nivel: "senior" },
  { id: "ator", nome: "Ator/Atriz", salario: 400, horas: 3, energia: 25, reqAttr: "carisma", reqMin: 70, nivel: "senior" },
  { id: "modelo", nome: "Modelo Profissional", salario: 350, horas: 2, energia: 20, reqAttr: "carisma", reqMin: 65, nivel: "senior" },
  { id: "animador", nome: "Animador de Eventos", salario: 150, horas: 4, energia: 30, reqAttr: "carisma", reqMin: 45, nivel: "pleno" },
  { id: "atendente", nome: "Atendente de Loja", salario: 90, horas: 4, energia: 25, reqAttr: "carisma", reqMin: 25, nivel: "junior" },
  { id: "consultor", nome: "Consultor de Negócios", salario: 300, horas: 4, energia: 15, reqAttr: "carisma", reqMin: 55, nivel: "senior" },
  { id: "influencer", nome: "Influenciador Digital", salario: 450, horas: 2, energia: 15, reqAttr: "carisma", reqMin: 70, nivel: "senior" },
  { id: "policia", nome: "Policial", salario: 130, horas: 6, energia: 35, reqAttr: "carisma", reqMin: 40, nivel: "pleno" },

  // === REFLEXO ===
  { id: "piloto", nome: "Piloto de Fórmula", salario: 600, horas: 3, energia: 40, reqAttr: "reflexo", reqMin: 75, nivel: "senior" },
  { id: "cirurgiao", nome: "Cirurgião", salario: 350, horas: 5, energia: 35, reqAttr: "reflexo", reqMin: 70, nivel: "senior" },
  { id: "dentista", nome: "Dentista", salario: 250, horas: 4, energia: 20, reqAttr: "reflexo", reqMin: 55, nivel: "pleno" },
  { id: "archer", nome: "Atleta Olímpico", salario: 500, horas: 3, energia: 45, reqAttr: "reflexo", reqMin: 75, nivel: "senior" },
  { id: "segurador", nome: "Segurador Profissional", salario: 200, horas: 4, energia: 25, reqAttr: "reflexo", reqMin: 50, nivel: "pleno" },
  { id: "jogador_esports", nome: "Jogador de eSports", salario: 400, horas: 4, energia: 30, reqAttr: "reflexo", reqMin: 70, nivel: "senior" },

  // === RESISTÊNCIA ===
  { id: "seguranca", nome: "Segurança Noturno", salario: 120, horas: 4, energia: 35, reqAttr: "forca", reqMin: 45, nivel: "pleno" },
  { id: "maratonista", nome: "Maratonista Profissional", salario: 300, horas: 2, energia: 50, reqAttr: "resistencia", reqMin: 70, nivel: "senior" },
  { id: "bombeiro", nome: "Bombeiro", salario: 160, horas: 6, energia: 40, reqAttr: "resistencia", reqMin: 55, nivel: "pleno" },
  { id: "enfermeiro", nome: "Enfermeiro", salario: 140, horas: 6, energia: 30, reqAttr: "resistencia", reqMin: 45, nivel: "pleno" },
  { id: "militar", nome: "Militar", salario: 180, horas: 8, energia: 45, reqAttr: "resistencia", reqMin: 60, nivel: "pleno" },

  // === MISTA ===
  { id: "designer", nome: "Designer Gráfico", salario: 200, horas: 4, energia: 20, reqAttr: "inteligencia", reqMin: 45, attrSecundario: "carisma", nivel: "pleno" },
  { id: "jornalista", nome: "Jornalista", salario: 220, horas: 5, energia: 20, reqAttr: "inteligencia", reqMin: 50, attrSecundario: "carisma", nivel: "pleno" },
  { id: "advogado", nome: "Advogado", salario: 350, horas: 5, energia: 25, reqAttr: "inteligencia", reqMin: 65, attrSecundario: "carisma", nivel: "senior" },
  { id: "medico", nome: "Médico", salario: 400, horas: 6, energia: 35, reqAttr: "inteligencia", reqMin: 75, attrSecundario: "reflexo", nivel: "senior" },
  { id: "chef", nome: "Chef de Cozinha", salario: 250, horas: 5, energia: 30, reqAttr: "inteligencia", reqMin: 55, attrSecundario: "carisma", nivel: "senior" }
];

//4 - Nomes e Sobrenomes (Expandido de cidades.js)
export const culturas = culturasExpandidas;
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
    { id: "calca_escura", nome: "Calça Sarja Escura", preco: 130, tipo: "roupaBottom", valor: "Calça", cor: "#111111" },
    { id: "sweater_casual", nome: "Suéter Casual de Lã", preco: 140, tipo: "roupaTop", valor: "Suéter", cor: "#e67e22" },
    { id: "minidress_festa", nome: "Mini Vestido de Festa", preco: 250, tipo: "roupaTop", valor: "Vestido Curto", cor: "#e74c3c", genero: "Mulher" },
    { id: "minidress_legs", nome: "Meias do Mini Vestido", preco: 80, tipo: "roupaBottom", valor: "Meia Curta", cor: "#111111", genero: "Mulher" }
  ],
  academia: [
    { id: "top_treino", nome: "Top de Treino", preco: 80, tipo: "roupaTop", valor: "Top", cor: "#ff4757", genero: "Mulher" },
    { id: "regata_treino", nome: "Regata Cavada", preco: 60, tipo: "roupaTop", valor: "Camiseta", cor: "#34495e" },
    { id: "short_treino", nome: "Short de Corrida", preco: 70, tipo: "roupaBottom", valor: "Short", cor: "#2d3436" },
    { id: "leotard_fit", nome: "Collant de Ginástica", preco: 120, tipo: "roupaTop", valor: "Collant (Leotard)", cor: "#222222" }
  ],
  especiais: [ // Nova categoria de roupas especiais/cosplays!
    { id: "school_top", nome: "Uniforme Escolar (Top)", preco: 180, tipo: "roupaTop", valor: "Uniforme Escolar", cor: "#3498db", genero: "Mulher" },
    { id: "school_bottom", nome: "Saia Escolar", preco: 150, tipo: "roupaBottom", valor: "Saia Escolar", cor: "#1e3799", genero: "Mulher" },
    { id: "bunny_top", nome: "Colete de Coelhinha (Bunny)", preco: 400, tipo: "roupaTop", valor: "Colete Bunny", cor: "#111111", genero: "Mulher" },
    { id: "bunny_bottom", nome: "Meia-calça de Coelhinha", preco: 150, tipo: "roupaBottom", valor: "Meia Bunny", cor: "#111111", genero: "Mulher" },
    { id: "police_top", nome: "Camisa de Polícia", preco: 220, tipo: "roupaTop", valor: "Uniforme Policial", cor: "#1e272e" },
    { id: "police_bottom", nome: "Calça Tática de Polícia", preco: 180, tipo: "roupaBottom", valor: "Calça Policial", cor: "#1e272e" }
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
