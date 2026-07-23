// src/utils/npcLifeSystem.js
// Motor de simulação de vida autônoma dos NPCs
// Roda a cada avancarTempo() / dormir() no App.js

// ─── Tabelas de profissões com salário diário ────────────────────────────────
export const PROFISSAO_DADOS = {
  'Designer':        { salarioDia: 120, turno: 'manhã',   humor_trabalho: 10 },
  'Médico(a)':       { salarioDia: 350, turno: 'manhã',   humor_trabalho: -5 },
  'Programador(a)':  { salarioDia: 280, turno: 'noite',   humor_trabalho: 5  },
  'Advogado(a)':     { salarioDia: 300, turno: 'manhã',   humor_trabalho: -8 },
  'Chef':            { salarioDia: 180, turno: 'noite',   humor_trabalho: 15 },
  'Artista':         { salarioDia: 80,  turno: 'tarde',   humor_trabalho: 20 },
  'Engenheiro(a)':   { salarioDia: 260, turno: 'manhã',   humor_trabalho: 2  },
  'Modelo':          { salarioDia: 200, turno: 'tarde',   humor_trabalho: 15 },
  'Estudante':       { salarioDia: 20,  turno: 'manhã',   humor_trabalho: 5  },
  'Desempregado(a)': { salarioDia: 0,   turno: 'livre',   humor_trabalho: -20 },
};

// ─── Gera rotina inicial para um NPC ─────────────────────────────────────────
export function gerarRotinaNPC(npc) {
  const dados = PROFISSAO_DADOS[npc.profissao] || PROFISSAO_DADOS['Artista'];
  return {
    turno: dados.turno,
    atividades_favoritas: sortearAtividades(npc),
    meta: sortearMeta(npc),
  };
}

function sortearAtividades(npc) {
  const opcoes = ['academia', 'leitura', 'redes_sociais', 'culinaria', 'musica', 'viagens', 'trabalho_extra'];
  return opcoes.sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));
}

function sortearMeta(npc) {
  const metas = ['poupar', 'encontrar_parceiro', 'mudar_emprego', 'aprender_algo', 'viajar', 'ficar_em_forma'];
  if (npc.estadoCivil === 'Solteiro(a)' && Math.random() < 0.5) return 'encontrar_parceiro';
  return metas[Math.floor(Math.random() * metas.length)];
}

// ─── Simula 1 NPC por N dias ──────────────────────────────────────────────────
export function simularDia(npc, diasPassados, mundo, eParceiroDoPlayer = false) {
  if (!npc || diasPassados <= 0) return npc;

  const dados = PROFISSAO_DADOS[npc.profissao] || PROFISSAO_DADOS['Artista'];
  
  // 1. TRABALHO — ganho de dinheiro proporcional aos dias
  const ganho = dados.salarioDia * diasPassados * (0.8 + Math.random() * 0.4); // ±20% variação
  const novoDinheiro = Math.round((npc.dinheiro || 0) + ganho);

  // 2. HUMOR — influenciado por trabalho, meta e tempo
  let deltaHumor = dados.humor_trabalho * diasPassados;
  if (npc.rotina?.meta === 'poupar' && novoDinheiro > (npc.dinheiro || 0)) deltaHumor += 3;
  if (npc.rotina?.meta === 'encontrar_parceiro' && !npc.parceiro_id && !eParceiroDoPlayer) deltaHumor -= 2;
  const humorAtual = npc.humor ?? 60;
  const novoHumor = Math.min(100, Math.max(0,
    humorAtual + deltaHumor + (50 - humorAtual) * 0.05 * diasPassados
  ));

  // 3. AFETO COM O PLAYER — decai ligeiramente sem contato
  const diasDesdeContato = (npc.diasDesdeContato || 0) + diasPassados;
  let deltaAfeto = 0;
  if (diasDesdeContato > 7)  deltaAfeto -= 0.5 * diasPassados;  // distância faz esquecer
  if (diasDesdeContato > 30) deltaAfeto -= 1.0 * diasPassados;  // muito tempo longe
  const novoAfeto = Math.min(100, Math.max(0, (npc.afeto || 10) + deltaAfeto));

  // 4. ATRIBUTOS — evolução lenta por atividades favoritas
  const novoNpc = { ...npc };
  if (npc.rotina?.atividades_favoritas?.includes('academia')) {
    novoNpc.forca = Math.min(100, (npc.forca || 30) + 0.2 * diasPassados);
  }
  if (npc.rotina?.atividades_favoritas?.includes('leitura')) {
    novoNpc.inteligencia = Math.min(100, (npc.inteligencia || 30) + 0.15 * diasPassados);
  }
  if (npc.rotina?.atividades_favoritas?.includes('redes_sociais')) {
    novoNpc.carisma = Math.min(100, (npc.carisma || 30) + 0.1 * diasPassados);
  }

  // 5. ESTADO CIVIL (Apenas se não for parceiro do player e não estiver namorando outro NPC real)
  let estadoCivil = npc.estadoCivil;
  let parceiro_id = npc.parceiro_id;
  let parceiro_nome = npc.parceiro_nome;
  let eventos = [...(npc.eventos_recentes || [])];

  if (eParceiroDoPlayer) {
    estadoCivil = 'Numa relação';
    parceiro_nome = 'Jogador(a)';
    parceiro_id = 'player';
  } else if (parceiro_id === 'player') {
    // Se era parceiro do player mas player não está mais namorando ele/ela
    estadoCivil = 'Solteiro(a)';
    parceiro_id = null;
    parceiro_nome = null;
  } else if (npc.rotina?.meta === 'encontrar_parceiro' && estadoCivil === 'Solteiro(a)') {
    // Se for solteiro, cria um parceiro fictício por padrão (a menos que dê match com contato real na lista)
    const chanceNamoro = 0.01 * diasPassados; // ~1% por dia
    if (Math.random() < chanceNamoro) {
      estadoCivil = 'Numa relação';
      parceiro_nome = gerarNomeParceiro();
      eventos.push({ tipo: 'relacionamento', msg: `${npc.nome} começou a namorar ${parceiro_nome}! 💕`, dia: Date.now() });
    }
  }

  // 6. EVENTOS DE VIDA — manter só os últimos 5
  if (eventos.length > 5) eventos = eventos.slice(-5);

  // Status de contato (badge no chat)
  const statusContato = diasDesdeContato > 30 ? 'sumido' :
                        diasDesdeContato > 14 ? 'distante' :
                        diasDesdeContato > 7  ? 'ausente' : 'ativo';

  return {
    ...novoNpc,
    dinheiro: novoDinheiro,
    humor: Math.round(novoHumor),
    afeto: Math.round(novoAfeto * 10) / 10,
    diasDesdeContato,
    statusContato,
    estadoCivil,
    parceiro_id,
    parceiro_nome,
    eventos_recentes: eventos,
  };
}

// ─── Simula toda a lista de NPCs ─────────────────────────────────────────────
/**
 * @param {Array}  lista        - contatosNPCs
 * @param {number} diasPassados - quantos dias passaram
 * @param {object} mundo        - dados do mundo
 * @param {object} player       - dados do player para saber do parceiro
 * @returns {Array} nova lista atualizada
 */
export function simularVidaNPCs(lista, diasPassados, mundo, player) {
  if (!lista || lista.length === 0 || diasPassados <= 0) return lista;

  const playerParceiroId = player?.relacionamento?.parceiro?.npc_id;

  // Primeiro passo: simula cada NPC individualmente
  let novaLista = lista.map(npc => {
    const npcComRotina = npc.rotina ? npc : { ...npc, rotina: gerarRotinaNPC(npc) };
    const eParceiroDoPlayer = (npc.id === playerParceiroId);
    return simularDia(npcComRotina, diasPassados, mundo, eParceiroDoPlayer);
  });

  // Segundo passo: simula interações entre os NPCs reais da lista
  for (let i = 0; i < novaLista.length; i++) {
    let npc = novaLista[i];
    if (npc.id === playerParceiroId) continue; // Pula se namora o player

    // 1. Terminar namoro entre dois NPCs da lista
    if (npc.estadoCivil === "Numa relação" && npc.parceiro_id && npc.parceiro_id !== 'player') {
      const partnerIdx = novaLista.findIndex(n => n.id === npc.parceiro_id);
      if (partnerIdx !== -1) {
        const partner = novaLista[partnerIdx];
        
        // Chance de término influenciada pela baixa fidelidade dos envolvidos
        const baseBreakupChance = 0.015; // ~1.5% chance diária
        const fidelityFactor = (200 - (npc.fidelidade || 50) - (partner.fidelidade || 50)) / 100;
        const totalChance = baseBreakupChance * fidelityFactor * diasPassados;

        if (Math.random() < totalChance) {
          npc.estadoCivil = "Solteiro(a)";
          npc.parceiro_id = null;
          npc.parceiro_nome = null;
          npc.eventos_recentes = npc.eventos_recentes || [];
          npc.eventos_recentes.push({
            tipo: 'separacao',
            msg: `${npc.nome} e ${partner.nome} terminaram o namoro. 💔`,
            dia: Date.now()
          });

          partner.estadoCivil = "Solteiro(a)";
          partner.parceiro_id = null;
          partner.parceiro_nome = null;
          partner.eventos_recentes = partner.eventos_recentes || [];
          partner.eventos_recentes.push({
            tipo: 'separacao',
            msg: `${partner.nome} e ${npc.nome} terminaram o namoro. 💔`,
            dia: Date.now()
          });
        }
      }
    }

    // 2. Iniciar namoro entre dois NPCs solteiros reais da lista de contatos
    if (npc.estadoCivil === "Solteiro(a)" && npc.rotina?.meta === 'encontrar_parceiro') {
      const baseMatchChance = 0.02 * diasPassados; // ~2% de chance diária
      if (Math.random() < baseMatchChance) {
        // Acha outro solteiro na lista que não seja o player ou o parceiro dele
        const outroNpcIdx = novaLista.findIndex(n => 
          n.id !== npc.id && 
          n.id !== playerParceiroId && 
          n.estadoCivil === "Solteiro(a)"
        );

        if (outroNpcIdx !== -1) {
          const outro = novaLista[outroNpcIdx];
          
          npc.estadoCivil = "Numa relação";
          npc.parceiro_id = outro.id;
          npc.parceiro_nome = outro.nome;
          npc.eventos_recentes = npc.eventos_recentes || [];
          npc.eventos_recentes.push({
            tipo: 'relacionamento',
            msg: `${npc.nome} e ${outro.nome} começaram a namorar! 💕`,
            dia: Date.now()
          });

          outro.estadoCivil = "Numa relação";
          outro.parceiro_id = npc.id;
          outro.parceiro_nome = npc.nome;
          outro.eventos_recentes = outro.eventos_recentes || [];
          outro.eventos_recentes.push({
            tipo: 'relacionamento',
            msg: `${outro.nome} e ${npc.nome} começaram a namorar! 💕`,
            dia: Date.now()
          });
        }
      }
    }

    // 3. NPC envia mensagens automáticas de rotina e interesse para o Player
    if (npc.afeto > 25) {
      const chanceMsg = 0.05 * diasPassados; // 5% chance diária de puxar assunto
      if (Math.random() < chanceMsg) {
        npc.historico = npc.historico || [];
        let textoMsg = "";

        if (npc.id === playerParceiroId) {
          const msgsParceiro = [
            "Pensando em você... 🥰 Quando vamos nos ver?",
            "Espero que o seu dia esteja sendo maravilhoso! Te amo ❤️",
            "Oi amor! Me liga ou me manda mensagem quando estiver livre.",
            "Tive um dia corrido hoje, mas lembrei de você! 😘"
          ];
          textoMsg = msgsParceiro[Math.floor(Math.random() * msgsParceiro.length)];
        } else if (npc.diasDesdeContato > 10) {
          textoMsg = `Oi, ${player?.nome || 'você'}! Sumiu do mapa... Tudo bem? 📵`;
        } else if (npc.humor < 30) {
          textoMsg = "Hoje o dia está super cansativo e cheio de estresse no trabalho... 😤";
        } else {
          const msgsAmigo = [
            "Olá! Como estão as coisas?",
            "Vi algo engraçado hoje e lembrei de ti! 😄",
            "Tudo bem? Depois vamos tomar um café para atualizar as fofocas!",
            "E aí! Como vai a vida?"
          ];
          textoMsg = msgsAmigo[Math.floor(Math.random() * msgsAmigo.length)];
        }

        const lastMsg = npc.historico[npc.historico.length - 1];
        if (!lastMsg || lastMsg.texto !== textoMsg) {
          npc.historico.push({ remetente: "npc", texto: textoMsg });
          npc.temMensagemNaoLida = true;
        }
      }
    }

    // 4. Mudança de emprego autônoma
    const chanceCarreira = 0.005 * diasPassados; // 0.5% chance diária
    if (Math.random() < chanceCarreira && npc.profissao !== 'Médico(a)' && npc.profissao !== 'Desempregado(a)') {
      const listaProfissoes = Object.keys(PROFISSAO_DADOS).filter(p => p !== npc.profissao && p !== 'Desempregado(a)');
      const novaProf = listaProfissoes[Math.floor(Math.random() * listaProfissoes.length)];
      
      npc.profissao = novaProf;
      npc.eventos_recentes = npc.eventos_recentes || [];
      npc.eventos_recentes.push({
        tipo: 'carreira',
        msg: `${npc.nome} mudou de profissão e agora trabalha como ${novaProf}! 💼`,
        dia: Date.now()
      });

      // Se o afeto for alto, notifica no chat do jogador
      if (npc.afeto > 40) {
        npc.historico = npc.historico || [];
        npc.historico.push({
          remetente: "npc",
          texto: `Consegui uma vaga incrível como ${novaProf}! Estou muito feliz! 🎉`
        });
        npc.temMensagemNaoLida = true;
      }
    }
  }

  return novaLista;
}

// ─── Ao registrar contato com NPC (resetar diasDesdeContato) ─────────────────
export function registrarContatoNPC(npc) {
  return { ...npc, diasDesdeContato: 0, statusContato: 'ativo', temMensagemNaoLida: false };
}

// ─── Helpers internos ─────────────────────────────────────────────────────────
function gerarNomeParceiro() {
  const nomes = [
    'Camila', 'Beatriz', 'Juliana', 'Fernanda', 'Larissa', 'Aline',
    'Carlos', 'Rafael', 'Gustavo', 'Felipe', 'Eduardo', 'Leonardo',
  ];
  const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Lima'];
  return `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;
}
