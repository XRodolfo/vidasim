// Sistema de Casas e Cômodos - Casa customizável com múltiplos ambientes

// Definição de cômodos por tipo de imóvel
export const comotosImovel = {
  apartamento_simples: {
    tipo: "apartamento_simples",
    maxQuartosExtras: 0,
    comotos: [
      {
        id: "sala_simples", nome: "Sala", emoji: "🛋️", descricao: "Um pequeno espaço de convivência",
        atividades: [
          { id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 25 }, tempo: 1 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 20, carisma: 5 }, tempo: 2 }
        ]
      }
    ]
  },
  casa_pequena: {
    tipo: "casa_pequena",
    maxQuartosExtras: 2, // Pode construir 2 quartos para Harém
    comotos: [
      {
        id: "sala_pequena", nome: "Sala", emoji: "🛋️", descricao: "Sala aconchegante",
        atividades: [{ id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 35 }, tempo: 1 }]
      },
      {
        id: "cozinha_pequena", nome: "Cozinha", emoji: "🍳", descricao: "Cozinha funcional",
        atividades: [
          { id: "cozinhar", nome: "Treinar Culinária", emoji: "👨‍🍳", efeito: { energia: -10, culinaria: 3 }, tempo: 1 },
          { id: "comer", nome: "Fazer Refeição", emoji: "🍽️", efeito: { energia: 45 }, tempo: 1 }
        ]
      }
    ]
  },
  casa_grande: {
    tipo: "casa_grande",
    maxQuartosExtras: 5, // Pode construir até 5 quartos
    comotos: [
      {
        id: "quarto_master", nome: "Suíte Master", emoji: "🛏️", descricao: "O teu quarto principal",
        atividades: [{ id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }]
      },
      {
        id: "cozinha_grande", nome: "Cozinha Equipada", emoji: "🍳", descricao: "Perfeita para treinar receitas",
        atividades: [
          { id: "cozinhar_avancado", nome: "Treinar Receitas Gourmet", emoji: "👨‍🍳", efeito: { energia: -15, culinaria: 5 }, tempo: 2 }
        ]
      }
    ]
  },
  penthouse: {
    tipo: "penthouse",
    maxQuartosExtras: 10, // Mansão Harém! Até 10 quartos extras
    comotos: [
      {
        id: "suite_luxuosa", nome: "Suíte Presidencial", emoji: "👑", descricao: "Suíte com vista para o mar",
        atividades: [{ id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }]
      },
      {
        id: "piscina_aquecida", nome: "Piscina & Spa Privado", emoji: "🏊", descricao: "Para festas e mergulhos",
        atividades: [
          { id: "mergulhar", nome: "Mergulhar e Nadar", emoji: "🏊", efeito: { energia: 40, resistencia: 8, carisma: 5 }, tempo: 2 }
        ]
      }
    ]
  }
};

// Função da EMPREITEIRA: Constrói um novo quarto no imóvel
export const construirQuartoHarem = (player, setPlayer) => {
  const casaTipo = player.casa?.tipo || "apartamento_simples";
  const imovelConfig = comotosImovel[casaTipo];
  const quartosAtuais = player.casa?.quartosConstruidos || 0;
  const custoObra = 15000;

  if (quartosAtuais >= (imovelConfig?.maxQuartosExtras || 0)) {
    alert(`❌ O teu imóvel (${casaTipo}) já atingiu o limite máximo de ampliação de cômodos! Compra uma mansão ou penthouse na Imobiliária para expandir o teu Harém.`);
    return false;
  }
  if ((player.dinheiro || 0) < custoObra) {
    alert(`❌ Sem fundos! A Empreiteira cobra R$ ${custoObra.toLocaleString()} para construir e decorar uma nova suíte de hóspede/harém.`);
    return false;
  }

  setPlayer(prev => ({
    ...prev,
    dinheiro: prev.dinheiro - custoObra,
    casa: {
      ...prev.casa,
      quartosConstruidos: (prev.casa?.quartosConstruidos || 0) + 1
    }
  }));
  alert(`🎉 Obra Concluída! A Empreiteira construiu a Suíte de Harém #${quartosAtuais + 1}. Agora podes alocar mais parceiros a morar contigo!`);
  return true;
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
    culinaria: Math.min(100, Math.max(0, (prev.culinaria || 0) + (efeito.culinaria || 0))),
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
