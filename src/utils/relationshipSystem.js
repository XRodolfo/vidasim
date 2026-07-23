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
        dia_inicio: player.dia || 1,
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

  // Deve estar namorando há pelo menos 8 semanas simuladas (aprox. 2 meses)
  const diaInicio = relacionamento.parceiro.dia_inicio || 1;
  const semanasNamorando = Math.floor((player.dia - diaInicio) / 7);
  if (semanasNamorando < 8) {
    return { 
      erro: `Vocês precisam namorar por mais tempo. Faltam ${8 - semanasNamorando} semanas.` 
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
          dia_casamento: player.dia || 1
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

  const playerFeminina = player.genero === "Mulher";
  const npcFeminina = npc.genero === "Mulher";
  if (!playerFeminina && !npcFeminina) {
    return { erro: "Esta conversa só faz sentido para casais onde há uma mulher biológica." };
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
      mensagem: `${npc.nome}: "Entendido, vamos continuar usando proteção."`,
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

  const riscoPorContraceptivo = {
    "camisinha": 0.02,
    "pilula": 0.01,
    "diu": 0.002,
    "nenhum": 0.35,
    "implante": 0.005,
    "injecao": 0.03
  };
  
  if (relacionamento?.parceiro?.gravidez_intencional) {
    // Gravidez intencional: chance muito maior de sucesso (mesmo com alguma falha/esquecimento)
    const riscoIntencional = {
      "camisinha": 0.20,
      "pilula": 0.15,
      "diu": 0.05,
      "nenhum": 0.75,
      "implante": 0.08,
      "injecao": 0.18
    };
    return Math.random() < (riscoIntencional[contraceptivoUsado] || 0.5);
  }

  // Falha normal / gravidez acidental
  return Math.random() < (riscoPorContraceptivo[contraceptivoUsado] || 0.35);
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

  const diaInicio = relacionamento.parceiro.dia_inicio || 1;
  const semanasNamorando = Math.floor((player.dia - diaInicio) / 7);

  return (
    relacionamento.status === statusRelacionamento.CASADO ||
    (relacionamento.status === statusRelacionamento.NAMORANDO && semanasNamorando > 8)
  );
};
