// Sistema de Casas e Cômodos - Vidasim

export const comotosImovel = {
  apartamento_simples: {
    tipo: "apartamento_simples",
    maxQuartosExtras: 0,
    qualidade: 1,
    comotos: [
      {
        id: "quarto_simples", nome: "Quarto", emoji: "🛏️", descricao: "O teu quarto básico e aconchegante.",
        atividades: [
          { id: "dormir", nome: "Dormir até de Manhã", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "ler_livro", nome: "Ler um Livro", emoji: "📚", efeito: { energia: -10, inteligencia: 2 }, tempo: 2 }
        ]
      },
      {
        id: "cozinha_simples", nome: "Cozinha", emoji: "🍳", descricao: "Uma cozinha compacta com fogão e micro-ondas.",
        atividades: [
          { id: "cozinhar_simples", nome: "Cozinhar Prato Simples", emoji: "🍳", efeito: { energia: 20, culinaria: 2, dinheiro: -10 }, tempo: 1 },
          { id: "lanche_rapido", nome: "Fazer Lanche Rápido", emoji: "🥪", efeito: { energia: 10, dinheiro: -5 }, tempo: 0.5 }
        ]
      },
      {
        id: "sala_simples", nome: "Sala", emoji: "🛋️", descricao: "Um pequeno espaço com sofá e uma TV antiga.",
        atividades: [
          { id: "descansar", nome: "Descansar no Sofá", emoji: "😴", efeito: { energia: 15 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 10, carisma: 1 }, tempo: 2 }
        ]
      },
      {
        id: "banheiro_simples", nome: "Banheiro", emoji: "🚿", descricao: "Banheiro compacto com chuveiro elétrico.",
        atividades: [
          { id: "banho", nome: "Banho Quente", emoji: "🚿", efeito: { energia: 15, carisma: 1 }, tempo: 0.5 },
          { id: "higiene", nome: "Higiene Pessoal", emoji: "🪥", efeito: { energia: 5, carisma: 1 }, tempo: 0.5 }
        ]
      }
    ]
  },
  apartamento_moderno: {
    tipo: "apartamento_moderno",
    maxQuartosExtras: 1,
    qualidade: 2,
    comotos: [
      {
        id: "quarto_moderno", nome: "Quarto Moderno", emoji: "🛌", descricao: "Uma suíte estilosa com cama de casal.",
        atividades: [
          { id: "dormir", nome: "Dormir Confortavelmente", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "ler_tablet", nome: "Estudar no Tablet", emoji: "📱", efeito: { energia: -8, inteligencia: 3 }, tempo: 2 }
        ]
      },
      {
        id: "cozinha_moderna", nome: "Cozinha Americana", emoji: "🍳", descricao: "Cozinha com balcão de mármore e bons eletrodomésticos.",
        atividades: [
          { id: "cozinhar_moderno", nome: "Preparar Massa Italiana", emoji: "🍝", efeito: { energia: 25, culinaria: 4, dinheiro: -20 }, tempo: 1.5 },
          { id: "cafe_gourmet", nome: "Passar Café Expresso", emoji: "☕", efeito: { energia: 15, dinheiro: -8 }, tempo: 0.5 }
        ]
      },
      {
        id: "sala_moderna", nome: "Sala de Estar", emoji: "📺", descricao: "Sala com Smart TV e console de videogame.",
        atividades: [
          { id: "videogame", nome: "Jogar Videogame", emoji: "🎮", efeito: { energia: 20, reflexo: 2 }, tempo: 2 },
          { id: "streaming", nome: "Assistir Séries", emoji: "🎬", efeito: { energia: 15, carisma: 1 }, tempo: 2 }
        ]
      },
      {
        id: "banheiro_moderno", nome: "Banheiro com Banheira", emoji: "🛁", descricao: "Banheiro espaçoso com banheira de imersão.",
        atividades: [
          { id: "banheira", nome: "Banho de Espuma", emoji: "🛁", efeito: { energia: 25, carisma: 2 }, tempo: 1 },
          { id: "higiene", nome: "Higiene Pessoal", emoji: "🪥", efeito: { energia: 5, carisma: 1 }, tempo: 0.5 }
        ]
      }
    ]
  },
  casa_pequena: {
    tipo: "casa_pequena",
    maxQuartosExtras: 2,
    qualidade: 2,
    comotos: [
      {
        id: "quarto_aconchegante", nome: "Quarto Aconchegante", emoji: "🛏️", descricao: "Quarto silencioso com vista para o jardim.",
        atividades: [
          { id: "dormir", nome: "Dormir Profundamente", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "ler_livro", nome: "Ler um Romance", emoji: "📚", efeito: { energia: -10, inteligencia: 2 }, tempo: 2 }
        ]
      },
      {
        id: "cozinha_pratica", nome: "Cozinha Prática", emoji: "🍳", descricao: "Cozinha familiar completa.",
        atividades: [
          { id: "cozinhar_familia", nome: "Preparar Almoço Caseiro", emoji: "🍲", efeito: { energia: 30, culinaria: 3, dinheiro: -15 }, tempo: 1.5 }
        ]
      },
      {
        id: "sala_lareira", nome: "Sala com Lareira", emoji: "🔥", descricao: "Sala acolhedora com lareira de tijolos.",
        atividades: [
          { id: "ler_lareira", nome: "Relaxar na Lareira", emoji: "🔥", efeito: { energia: 20 }, tempo: 1 }
        ]
      },
      {
        id: "banheiro_ducha", nome: "Banheiro com Ducha", emoji: "🚿", descricao: "Banheiro limpo com ducha de alta pressão.",
        atividades: [
          { id: "ducha", nome: "Ducha Rápida", emoji: "🚿", efeito: { energia: 15, carisma: 1 }, tempo: 0.5 }
        ]
      },
      {
        id: "quintal_jardim", nome: "Quintal & Jardim", emoji: "🏡", descricao: "Belo jardim gramado nos fundos.",
        atividades: [
          { id: "cuidar_plantas", nome: "Cuidar do Jardim", emoji: "🪴", efeito: { energia: -15, forca: 1, resistencia: 1 }, tempo: 1.5 }
        ]
      }
    ]
  },
  casa_grande: {
    tipo: "casa_grande",
    maxQuartosExtras: 5,
    qualidade: 3,
    comotos: [
      {
        id: "quarto_master", nome: "Suíte Master", emoji: "🛌", descricao: "Um imenso quarto com cama king size e closet.",
        atividades: [
          { id: "dormir", nome: "Dormir como um Rei/Rainha", emoji: "😴", efeito: { energia: 100 }, tempo: 8 },
          { id: "planejar", nome: "Organizar Finanças", emoji: "📊", efeito: { energia: -10, inteligencia: 4 }, tempo: 2 }
        ]
      },
      {
        id: "cozinha_gourmet", nome: "Cozinha Gourmet", emoji: "🍳", descricao: "Equipamentos profissionais e ilha de cozinha.",
        atividades: [
          { id: "cozinhar_avancado", nome: "Treinar Receitas Gourmet", emoji: "👨‍🍳", efeito: { energia: -20, culinaria: 6, dinheiro: -30 }, tempo: 2 },
          { id: "jantar_fino", nome: "Preparar Jantar Fino", emoji: "🍷", efeito: { energia: 35, culinaria: 4, dinheiro: -40 }, tempo: 1.5 }
        ]
      },
      {
        id: "sala_cinema", nome: "Sala de Cinema", emoji: "🎬", descricao: "Projetor gigante com poltronas reclináveis.",
        atividades: [
          { id: "filme", nome: "Assistir Filme Blockbuster", emoji: "🎬", efeito: { energia: 20, carisma: 2 }, tempo: 2 }
        ]
      },
      {
        id: "banheiro_hidro", nome: "Banheiro com Hidromassagem", emoji: "🛁", descricao: "Banheiro de luxo com jacuzzi interna.",
        atividades: [
          { id: "hidromassagem", nome: "Tomar Banho de Hidro", emoji: "🛁", efeito: { energia: 30, carisma: 3 }, tempo: 1 }
        ]
      },
      {
        id: "academia_particular", nome: "Academia Privada", emoji: "🏋️", descricao: "Equipada com pesos livres e esteira.",
        atividades: [
          { id: "treinar_casa", nome: "Treino Funcional Completo", emoji: "🏋️", efeito: { energia: -25, forca: 3, resistencia: 3 }, tempo: 1.5 }
        ]
      }
    ]
  },
  penthouse: {
    tipo: "penthouse",
    maxQuartosExtras: 10,
    qualidade: 4,
    comotos: [
      {
        id: "suite_luxuosa", nome: "Suíte Presidencial", emoji: "👑", descricao: "Cama giratória com lençóis de seda e vista panorâmica.",
        atividades: [
          { id: "dormir", nome: "Dormir no Luxo Absoluto", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }
        ]
      },
      {
        id: "cozinha_ilha", nome: "Cozinha com Ilha Integrada", emoji: "🍳", descricao: "Equipamentos profissionais de aço inox.",
        atividades: [
          { id: "cozinhar_luxo", nome: "Cozinhar Lagosta", emoji: "🦞", efeito: { energia: 40, culinaria: 8, dinheiro: -75 }, tempo: 2 }
        ]
      },
      {
        id: "sala_festas", nome: "Salão de Festas", emoji: "🍸", descricao: "Bar embutido, sistema de som integrado e piano.",
        atividades: [
          { id: "tocar_piano", nome: "Praticar Piano", emoji: "🎹", efeito: { energia: 15, carisma: 3 }, tempo: 2 }
        ]
      },
      {
        id: "banheiro_spa", nome: "Banheiro SPA de Luxo", emoji: "🛁", descricao: "Chuveiro com cromoterapia e sauna a vapor.",
        atividades: [
          { id: "sauna", nome: "Fazer Sessão de Sauna", emoji: "🧖", efeito: { energia: 35, carisma: 4 }, tempo: 1 }
        ]
      },
      {
        id: "piscina_aquecida", nome: "Piscina com Borda Infinita", emoji: "🏊", descricao: "Piscina aquecida na cobertura com vista de toda a cidade.",
        atividades: [
          { id: "mergulhar", nome: "Nadar na Borda Infinita", emoji: "🏊", efeito: { energia: 40, resistencia: 2, carisma: 1 }, tempo: 2 }
        ]
      }
    ]
  }
};

export const construirQuartoHarem = (player, setPlayer) => {
  const casaTipo = player.casa?.tipo || "apartamento_simples";
  const imovelConfig = comotosImovel[casaTipo];
  const quartosAtuais = player.casa?.quartosConstruidos || 0;
  const custoObra = 15000;

  if (quartosAtuais >= (imovelConfig?.maxQuartosExtras || 0)) { alert("❌ Imóvel sem espaço para ampliação!"); return false; }
  if ((player.dinheiro || 0) < custoObra) { alert("❌ Fundos insuficientes para a Empreiteira!"); return false; }

  setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro - custoObra, casa: { ...prev.casa, quartosConstruidos: quartosAtuais + 1 } }));
  alert(`🎉 Obra Concluída! Suíte de Harém #${quartosAtuais + 1} pronta.`);
  return true;
};

export const obterComotos = (tipoImovel) => {
  return comotosImovel[tipoImovel]?.comotos || comotosImovel.apartamento_simples.comotos;
};

export const executarAtividade = (atividade, player, setPlayer, dormir, avancarTempo) => {
  const efeito = atividade.efeito || {};
  
  if (efeito.dinheiro && player.dinheiro + efeito.dinheiro < 0) {
    alert("❌ Você não tem dinheiro suficiente para os custos desta atividade!");
    return;
  }

  if (atividade.id === "dormir") { dormir(); return; }

  // Avança o tempo
  if (avancarTempo && !avancarTempo(atividade.tempo || 1, 0)) return; 

  setPlayer(prev => ({
    ...prev,
    energia: Math.min(100, Math.max(0, (prev.energia || 100) + (efeito.energia || 0))),
    culinaria: Math.min(100, Math.max(0, (prev.culinaria || 0) + (efeito.culinaria || 0))),
    forca: Math.min(100, Math.max(0, (prev.forca || 50) + (efeito.forca || 0))),
    resistencia: Math.min(100, Math.max(0, (prev.resistencia || 50) + (efeito.resistencia || 0))),
    carisma: Math.min(100, Math.max(0, (prev.carisma || 50) + (efeito.carisma || 0))),
    inteligencia: Math.min(100, Math.max(0, (prev.inteligencia || 50) + (efeito.inteligencia || 0))),
    dinheiro: prev.dinheiro + (efeito.dinheiro || 0)
  }));
};

export const calcularCorQualidade = (q) => {
  const cores = {1: '#aaa', 2: '#4CAF50', 3: '#3498db', 4: '#9b59b6', 5: '#f1c40f'};
  return cores[q] || '#aaa';
};