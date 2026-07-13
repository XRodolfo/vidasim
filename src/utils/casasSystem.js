// Sistema de Casas e Cômodos - Casa customizável com múltiplos ambientes

// Definição de cômodos por tipo de imóvel
export const comotosImovel = {
  apartamento_simples: {
    tipo: "apartamento_simples",
    comotos: [
      {
        id: "sala_simples",
        nome: "Sala",
        emoji: "🛋️",
        descricao: "Um pequeno espaço de convivência",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 25 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 20, carisma: 5 }, tempo: 2 }
        ]
      }
    ]
  },
  apartamento_moderno: {
    tipo: "apartamento_moderno",
    comotos: [
      {
        id: "sala_moderna",
        nome: "Sala",
        emoji: "🛋️",
        descricao: "Sala moderna com varanda",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 30 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 25, carisma: 8 }, tempo: 2 },
          { id: "vitrola", nome: "Ouvir Música", emoji: "🎵", efeito: { energia: 20 }, tempo: 1 }
        ]
      },
      {
        id: "quarto_moderno",
        nome: "Quarto",
        emoji: "🛏️",
        descricao: "Quarto confortável e bem decorado",
        atividades: [
          { id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "descansar_cama", nome: "Descansar na Cama", emoji: "🛏️", efeito: { energia: 40 }, tempo: 2 }
        ]
      }
    ]
  },
  casa_pequena: {
    tipo: "casa_pequena",
    comotos: [
      {
        id: "sala_pequena",
        nome: "Sala",
        emoji: "🛋️",
        descricao: "Sala aconchegante",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 35 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 30, carisma: 10 }, tempo: 2 },
          { id: "vitrola", nome: "Ouvir Música", emoji: "🎵", efeito: { energia: 25 }, tempo: 1 }
        ]
      },
      {
        id: "quarto_pequeno",
        nome: "Quarto",
        emoji: "🛏️",
        descricao: "Quarto principal",
        atividades: [
          { id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "descansar_cama", nome: "Descansar na Cama", emoji: "🛏️", efeito: { energia: 45 }, tempo: 2 },
          { id: "intimidade", nome: "Atividades Íntimas", emoji: "💑", efeito: { carisma: 15, resistencia: 10 }, tempo: 2 }
        ]
      },
      {
        id: "cozinha_pequena",
        nome: "Cozinha",
        emoji: "🍳",
        descricao: "Cozinha funcional",
        atividades: [
          { id: "cozinhar", nome: "Cozinhar", emoji: "👨‍🍳", efeito: { energia: -10, carisma: 5 }, tempo: 1 },
          { id: "comer", nome: "Comer", emoji: "🍽️", efeito: { energia: 40 }, tempo: 1 }
        ]
      },
      {
        id: "banheiro_pequeno",
        nome: "Banheiro",
        emoji: "🚿",
        descricao: "Banheiro básico",
        atividades: [
          { id: "banho", nome: "Tomar Banho", emoji: "🚿", efeito: { energia: 20, carisma: 5 }, tempo: 1 },
          { id: "higiene", nome: "Higiêne Pessoal", emoji: "🧴", efeito: { carisma: 10 }, tempo: 1 }
        ]
      }
    ]
  },
  casa_grande: {
    tipo: "casa_grande",
    comotos: [
      {
        id: "sala_grande",
        nome: "Sala de Estar",
        emoji: "🛋️",
        descricao: "Grande sala espaçosa",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 40 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 35, carisma: 12 }, tempo: 2 },
          { id: "vitrola", nome: "Ouvir Música", emoji: "🎵", efeito: { energia: 30 }, tempo: 1 },
          { id: "ler", nome: "Ler um Livro", emoji: "📚", efeito: { inteligencia: 15 }, tempo: 2 }
        ]
      },
      {
        id: "quarto_master",
        nome: "Quarto Master",
        emoji: "🛏️",
        descricao: "Suíte luxuosa",
        atividades: [
          { id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "descansar_cama", nome: "Descansar na Cama", emoji: "🛏️", efeito: { energia: 50 }, tempo: 2 },
          { id: "intimidade", nome: "Atividades Íntimas", emoji: "💑", efeito: { carisma: 20, resistencia: 15 }, tempo: 2 }
        ]
      },
      {
        id: "quarto_hospede",
        nome: "Quarto de Hóspede",
        emoji: "🛏️",
        descricao: "Quarto secundário para visitas",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 45 }, tempo: 1 }
        ]
      },
      {
        id: "cozinha_grande",
        nome: "Cozinha",
        emoji: "🍳",
        descricao: "Cozinha espaçosa com equipamentos",
        atividades: [
          { id: "cozinhar", nome: "Cozinhar", emoji: "👨‍🍳", efeito: { energia: -5, carisma: 10 }, tempo: 1 },
          { id: "comer", nome: "Comer", emoji: "🍽️", efeito: { energia: 50 }, tempo: 1 }
        ]
      },
      {
        id: "banheiro_grande",
        nome: "Banheiro",
        emoji: "🚿",
        descricao: "Banheiro completo com banheira",
        atividades: [
          { id: "banho", nome: "Tomar Banho", emoji: "🚿", efeito: { energia: 25, carisma: 8 }, tempo: 1 },
          { id: "banheira", nome: "Banho na Banheira", emoji: "🛁", efeito: { energia: 35, carisma: 12 }, tempo: 2 },
          { id: "higiene", nome: "Higiêne Pessoal", emoji: "🧴", efeito: { carisma: 15 }, tempo: 1 }
        ]
      },
      {
        id: "escritorio",
        nome: "Escritório",
        emoji: "🖊️",
        descricao: "Espaço de trabalho e estudo",
        atividades: [
          { id: "trabalhar", nome: "Trabalhar em Projetos", emoji: "💼", efeito: { inteligencia: 20, dinheiro: 50 }, tempo: 2 },
          { id: "estudar", nome: "Estudar", emoji: "📚", efeito: { inteligencia: 25 }, tempo: 3 }
        ]
      }
    ]
  },
  penthouse: {
    tipo: "penthouse",
    comotos: [
      {
        id: "sala_penthouse",
        nome: "Sala Luxuosa",
        emoji: "✨",
        descricao: "Sala com vista panorâmica da cidade",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 45 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV na Sala Premium", emoji: "📺", efeito: { energia: 40, carisma: 15 }, tempo: 2 },
          { id: "vitrola", nome: "Ouvir Música Premium", emoji: "🎵", efeito: { energia: 35 }, tempo: 1 },
          { id: "contemplar", nome: "Contemplar a Vista", emoji: "🌃", efeito: { energia: 30, inteligencia: 10 }, tempo: 1 }
        ]
      },
      {
        id: "suite_luxuosa",
        nome: "Suíte Luxuosa",
        emoji: "👑",
        descricao: "Suíte penthouse com jacuzzi privado",
        atividades: [
          { id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "descansar_cama", nome: "Descansar na Cama Luxuosa", emoji: "🛏️", efeito: { energia: 55 }, tempo: 2 },
          { id: "intimidade", nome: "Noite Especial", emoji: "💑", efeito: { carisma: 25, resistencia: 20 }, tempo: 2 }
        ]
      },
      {
        id: "cozinha_gourmet",
        nome: "Cozinha Gourmet",
        emoji: "👨‍🍳",
        descricao: "Cozinha de chef profissional",
        atividades: [
          { id: "cozinhar_gourmet", nome: "Preparar Refeição Gourmet", emoji: "🍽️", efeito: { energia: -10, carisma: 15, inteligencia: 5 }, tempo: 2 },
          { id: "comer_gourmet", nome: "Comer Deliciosamente", emoji: "🍾", efeito: { energia: 60, carisma: 10 }, tempo: 1 }
        ]
      },
      {
        id: "spa_privado",
        nome: "Spa Privado",
        emoji: "🧖",
        descricao: "Spa completo com sauna e piscina",
        atividades: [
          { id: "sauna", nome: "Usar Sauna", emoji: "🔥", efeito: { energia: 50, resistencia: 15 }, tempo: 2 },
          { id: "piscina", nome: "Nadar na Piscina", emoji: "🏊", efeito: { energia: 30, forca: 10, resistencia: 10 }, tempo: 2 },
          { id: "massagem", nome: "Massagem Relaxante", emoji: "💆", efeito: { energia: 40, carisma: 20 }, tempo: 2 },
          { id: "meditacao", nome: "Meditação", emoji: "🧘", efeito: { energia: 35, inteligencia: 15 }, tempo: 2 }
        ]
      }
    ]
  }
};

// Obter cômodos de um imóvel
export const obterComotos = (tipoImovel) => {
  return comotosImovel[tipoImovel]?.comotos || comotosImovel.apartamento_simples.comotos;
};

// Executar atividade no cômodo
export const executarAtividade = (atividade, player, setPlayer, dormir) => {
  const efeito = atividade.efeito;
  
  // Se for dormir, chamar função especial
  if (atividade.id === "dormir") {
    dormir();
    return;
  }
  
  // Aplicar efeitos
  setPlayer(prev => ({
    ...prev,
    energia: Math.min(100, Math.max(0, (prev.energia || 100) + (efeito.energia || 0))),
    forca: Math.min(100, Math.max(0, (prev.forca || 50) + (efeito.forca || 0))),
    reflexo: Math.min(100, Math.max(0, (prev.reflexo || 50) + (efeito.reflexo || 0))),
    inteligencia: Math.min(100, Math.max(0, (prev.inteligencia || 50) + (efeito.inteligencia || 0))),
    carisma: Math.min(100, Math.max(0, (prev.carisma || 50) + (efeito.carisma || 0))),
    resistencia: Math.min(100, Math.max(0, (prev.resistencia || 50) + (efeito.resistencia || 0))),
    dinheiro: Math.max(0, (prev.dinheiro || 0) + (efeito.dinheiro || 0)),
    hora: Math.min(23, (prev.hora || 8) + (atividade.tempo || 1))
  }));
};

// Calcular cor de qualidade do imóvel
export const calcularCorQualidade = (qualidade) => {
  const cores = {
    1: "#95a5a6", // Cinzento (simples)
    2: "#3498db", // Azul (moderno/pequeno)
    3: "#2ecc71", // Verde (grande)
    4: "#f39c12"  // Ouro (penthouse/luxo)
  };
  return cores[qualidade] || "#95a5a6";
};
