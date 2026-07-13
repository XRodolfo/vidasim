export const comotosImovel = {
  apartamento_simples: {
    tipo: "apartamento_simples",
    maxQuartosExtras: 0,
    comotos: [
      {
        id: "sala_simples", nome: "Sala", emoji: "🛋️", descricao: "Um pequeno espaço de convivência",
        atividades: [
          { id: "descansar", nome: "Descansar no Sofá", emoji: "😴", efeito: { energia: 25 }, tempo: 2 },
          { id: "tv", nome: "Assistir TV", emoji: "📺", efeito: { energia: 10, carisma: 1 }, tempo: 2 }
        ]
      },
      {
        // ADICIONADO O QUARTO BÁSICO
        id: "quarto_simples", nome: "Quarto", emoji: "🛏️", descricao: "O teu local de descanso",
        atividades: [{ id: "dormir", nome: "Dormir até de Manhã", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }]
      }
    ]
  },
  casa_pequena: {
    tipo: "casa_pequena",
    maxQuartosExtras: 2,
    comotos: [
      { id: "sala_pequena", nome: "Sala", emoji: "🛋️", descricao: "Sala aconchegante", atividades: [{ id: "descansar", nome: "Descansar", emoji: "😴", efeito: { energia: 35 }, tempo: 2 }] },
      { id: "quarto_simples", nome: "Quarto Principal", emoji: "🛏️", descricao: "Confortável", atividades: [{ id: "dormir", nome: "Dormir", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }] },
      { id: "cozinha_pequena", nome: "Cozinha", emoji: "🍳", descricao: "Cozinha funcional", atividades: [{ id: "cozinhar", nome: "Treinar Culinária", emoji: "👨‍🍳", efeito: { energia: -15, culinaria: 3 }, tempo: 1 }] }
    ]
  },
  casa_grande: {
    tipo: "casa_grande", maxQuartosExtras: 5,
    comotos: [
      { id: "quarto_master", nome: "Suíte Master", emoji: "🛏️", descricao: "O teu quarto principal", atividades: [{ id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }] },
      { id: "cozinha_grande", nome: "Cozinha Equipada", emoji: "🍳", descricao: "Perfeita para treinar receitas", atividades: [{ id: "cozinhar_avancado", nome: "Treinar Receitas Gourmet", emoji: "👨‍🍳", efeito: { energia: -20, culinaria: 6 }, tempo: 2 }] }
    ]
  },
  penthouse: {
    tipo: "penthouse", maxQuartosExtras: 10,
    comotos: [
      { id: "suite_luxuosa", nome: "Suíte Presidencial", emoji: "👑", descricao: "Suíte com vista para o mar", atividades: [{ id: "dormir", nome: "Dormir (+8h)", emoji: "😴", efeito: { energia: 100 }, tempo: 8 }] },
      { id: "piscina_aquecida", nome: "Piscina & Spa", emoji: "🏊", descricao: "Para relaxar", atividades: [{ id: "mergulhar", nome: "Mergulhar e Nadar", emoji: "🏊", efeito: { energia: 40, resistencia: 2, carisma: 1 }, tempo: 2 }] }
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

// Agora a função recebe avançarTempo para corrigir o congelamento do dia
export const executarAtividade = (atividade, player, setPlayer, dormir, avancarTempo) => {
  const efeito = atividade.efeito || {};
  if (atividade.id === "dormir") { dormir(); return; }

  // Avança o tempo sem cobrar energia extra (a própria atividade define a energia no 'efeito')
  if (avancarTempo && !avancarTempo(atividade.tempo || 1, 0)) return; 

  setPlayer(prev => ({
    ...prev,
    energia: Math.min(100, Math.max(0, (prev.energia || 100) + (efeito.energia || 0))),
    culinaria: Math.min(100, Math.max(0, (prev.culinaria || 0) + (efeito.culinaria || 0))),
    forca: Math.min(100, Math.max(0, (prev.forca || 50) + (efeito.forca || 0))),
    resistencia: Math.min(100, Math.max(0, (prev.resistencia || 50) + (efeito.resistencia || 0))),
    carisma: Math.min(100, Math.max(0, (prev.carisma || 50) + (efeito.carisma || 0))),
    inteligencia: Math.min(100, Math.max(0, (prev.inteligencia || 50) + (efeito.inteligencia || 0)))
  }));
};

export const calcularCorQualidade = (q) => {
  const cores = {1: '#aaa', 2: '#4CAF50', 3: '#3498db', 4: '#9b59b6', 5: '#f1c40f'};
  return cores[q] || '#aaa';
};