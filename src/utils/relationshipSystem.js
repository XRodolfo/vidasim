// Sistema de Relacionamentos - Namoro, Casamento, Parceria

export const statusRelacionamento = {
  SOLTEIRO: "solteiro",
  NAMORANDO: "namorando",
  NOIVO: "noivo",
  CASADO: "casado",
  SEPARADO: "separado",
  DIVORCIADO: "divorciado"
};

export const tiposEncontro = {
  CASUAL: { id: "casual", nome: "Encontro Casual", afetoNecessario: 40, duracao: 2 },
  ENCONTRO: { id: "encontro", nome: "Encontro Romântico", afetoNecessario: 60, duracao: 4 },
  PROPOSTA: { id: "proposta", nome: "Proposta de Namoro", afetoNecessario: 75, duracao: 6 }
};

// Inicializa dados de relacionamento no player
export const inicializarRelacionamento = () => {
  return {
    status: statusRelacionamento.SOLTEIRO,  // solteiro, namorando, casado, etc
    parceiro: null,                         // { npc_id, nome, afeto, data_inicio }
    dataCasamento: null,
    filhos: [],
    historicoRelacionamentos: []
  };
};

// Propõe namoro ao NPC
export const proporNameoro = (npc, player) => {
  if (!npc) return { erro: "NPC não encontrado" };
  if (npc.afeto < tiposEncontro.PROPOSTA.afetoNecessario) {
    return { 
      erro: `${npc.nome} ainda não confia o suficiente em você (${npc.afeto}/75)` 
    };
  }

  // Chance de aceitar baseada em atibutos do player
  const chanceCrítíca = Math.random();
  const modificadorCarisma = player.carisma / 100;
  const chanceAceitar = 0.7 + modificadorCarisma * 0.2;

  const aceita = chanceCrítíca < chanceAceitar;

  if (aceita) {
    return {
      sucesso: true,
      status: "aceito",
      mensagem: `${npc.nome}: "Sim! Quero ser seu(a) namorado(a)!" ❤️`,
      novoParceiro: {
        npc_id: npc.id,
        nome: npc.nome,
        afeto: npc.afeto,
        genero: npc.genero,
        data_inicio: Date.now(),
        gravidez_intencional: false
      }
    };
  } else {
    return {
      sucesso: false,
      status: "recusado",
      mensagem: `${npc.nome}: "Acho que ainda não estamos prontos para isso..."`,
      novoAfetoNPC: Math.max(0, npc.afeto - 10)
    };
  }
};

// Propõe casamento
export const proporCasamento = (npc, player, relacionamento) => {
  if (!relacionamento?.parceiro || relacionamento.parceiro.npc_id !== npc.id) {
    return { erro: "Você não está namorando este(a) NPC" };
  }

  // Deve estar namorando há pelo menos 20 semanas (aproximadamente 5 meses)
  const semanasNamorando = Math.floor((Date.now() - relacionamento.parceiro.data_inicio) / (1000 * 60 * 60 * 24 * 7));
  if (semanasNamorando < 20) {
    return { 
      erro: `Vocês precisam namorar por mais tempo. Faltam ${20 - semanasNamorando} semanas.` 
    };
  }

  const chanceCrítica = Math.random();
  const modificadorCarisma = player.carisma / 100;
  const chanceAceitar = 0.85 + modificadorCarisma * 0.15;

  const aceita = chanceCrítica < chanceAceitar;

  if (aceita) {
    return {
      sucesso: true,
      status: "aceito",
      mensagem: `${npc.nome}: "Sim, quero casar com você!" 💍✨`,
      novoRelacionamento: {
        status: statusRelacionamento.CASADO,
        parceiro: {
          ...relacionamento.parceiro,
          data_casamento: Date.now()
        }
      }
    };
  } else {
    return {
      sucesso: false,
      status: "recusado",
      mensagem: `${npc.nome}: "Ainda não estou pronto(a) para casar..."`
    };
  }
};

// Conversa sobre intenção de gravidez
export const conversoGravidez = (npc, player, relacionamento, querGravidez) => {
  if (!relacionamento?.parceiro || relacionamento.parceiro.npc_id !== npc.id) {
    return { erro: "Você não está em um relacionamento com este(a) NPC" };
  }

  if (player.genero !== "Mulher") {
    return { erro: "Apenas mulheres podem engravidar" };
  }

  if (querGravidez) {
    return {
      sucesso: true,
      mensagem: `${npc.nome}: "Tudo bem, vamos tentar ter um bebê juntos!" 💕`,
      novoRelacionamento: {
        ...relacionamento,
        parceiro: {
          ...relacionamento.parceiro,
          gravidez_intencional: true
        }
      }
    };
  } else {
    return {
      sucesso: true,
      mensagem: `${npc.nome}: "Claro, ainda não é hora para bebês."`,
      novoRelacionamento: {
        ...relacionamento,
        parceiro: {
          ...relacionamento.parceiro,
          gravidez_intencional: false
        }
      }
    };
  }
};

// Termina relacionamento
export const terminarRelacionamento = (player, relacionamento, razao = "desentendimento") => {
  if (!relacionamento?.parceiro) {
    return { erro: "Você não está em um relacionamento" };
  }

  return {
    sucesso: true,
    mensagem: `Você e ${relacionamento.parceiro.nome} terminaram.`,
    novoRelacionamento: {
      status: statusRelacionamento.SOLTEIRO,
      parceiro: null,
      historicoRelacionamentos: [
        ...relacionamento.historicoRelacionamentos,
        {
          npc_id: relacionamento.parceiro.npc_id,
          nome: relacionamento.parceiro.nome,
          status: statusRelacionamento.SEPARADO,
          data_inicio: relacionamento.parceiro.data_inicio,
          data_fim: Date.now(),
          razao: razao
        }
      ]
    }
  };
};

// Calcula se deve haver gravidez em Motel
export const calcularGravidezComParceiro = (player, contraceptivoUsado, relacionamento) => {
  // Se não tem parceiro, usa lógica padrão
  if (!relacionamento?.parceiro) {
    return false;
  }

  // Se parceiro quer gravidez intencional, chance muito maior
  if (relacionamento.parceiro.gravidez_intencional) {
    // Lógica: com intenção, mesmo com proteção há chance (5-30% conforme proteção)
    const riscoPorContraceptivo = {
      "camisinha": 0.05,
      "pilula": 0.02,
      "diu": 0.005,
      "nenhum": 0.35,
      "implante": 0.01,
      "injecao": 0.05
    };
    return Math.random() < (riscoPorContraceptivo[contraceptivoUsado] || 0.1);
  }

  // Senão, usa lógica de proteção normal
  return false;
};

// Calcula afeto ganho em encontro
export const calcularAfetoGanho = (tipo, atributos = {}) => {
  const baseAfeto = {
    casual: 5,
    encontro: 15,
    proposta: 30
  };

  let afetoGanho = baseAfeto[tipo] || 5;

  // Modificadores por atributos
  if (atributos.carisma) afetoGanho += Math.floor(atributos.carisma / 20);
  if (atributos.inteligencia) afetoGanho += Math.floor(atributos.inteligencia / 30);
  if (atributos.resistencia) afetoGanho += Math.floor(atributos.resistencia / 40);

  return afetoGanho;
};

// Obtém lista de histórico de relacionamentos
export const obterHistoricoRelacionamentos = (relacionamento) => {
  return relacionamento.historicoRelacionamentos || [];
};

// Verifica se pode ter filhos com parceiro
export const podeTeFilho = (player, relacionamento) => {
  if (player.genero !== "Mulher") return false;
  if (!relacionamento?.parceiro) return false;
  if (!player.dadosReproductivos) return false;

  // Só pode ter filho se está casado (ou em namoro muito longo)
  const semanasNamorando = Math.floor(
    (Date.now() - relacionamento.parceiro.data_inicio) / (1000 * 60 * 60 * 24 * 7)
  );

  return (
    relacionamento.status === statusRelacionamento.CASADO ||
    (relacionamento.status === statusRelacionamento.NAMORANDO && semanasNamorando > 30)
  );
};
