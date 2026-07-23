// Sistema de Reprodução - Gravidez, Contraceptivo, Virgindade

export const tiposContraceptivos = {
  nenhum: { nome: "Nenhum", riscoPrenhez: 0.35 },
  camisinha: { nome: "Camisinha", riscoPrenhez: 0.02 },
  pilula: { nome: "Pílula Anticoncepcional", riscoPrenhez: 0.01 },
  diu: { nome: "DIU", riscoPrenhez: 0.002 },
  implante: { nome: "Implante Hormonal", riscoPrenhez: 0.005 },
  injecao: { nome: "Injeção Hormonal", riscoPrenhez: 0.03 }
};

// Calcula se houve gravidez baseado no contraceptivo
export const calcularGravidez = (contraceptivoUsado = "camisinha") => {
  const risco = tiposContraceptivos[contraceptivoUsado]?.riscoPrenhez || 0.35;
  return Math.random() < risco;
};

// Status de gravidez para o player
export const statusGravidez = {
  nao_gravida: 0,
  gravidez_inicial: 1,      // Semanas 1-8
  gravidez_segundo_trimestre: 2, // Semanas 9-20
  gravidez_terceiro_trimestre: 3, // Semanas 21+
  apos_parto: 4
};

// Inicializa dados reprodutivos para um personagem
export const inicializarDadosReproductivos = () => {
  return {
    virgem: true,
    contraceptivoAtivo: "camisinha",
    statusGravidez: statusGravidez.nao_gravida,
    semanasGravidez: 0,
    numeroFilhos: 0,
    filhos: []
  };
};

// Avança estado de gravidez
export const avancarGravidez = (dados, diasPassados, playerGenero = "Mulher") => {
  if (dados.statusGravidez === statusGravidez.nao_gravida) return dados;
  
  const semanasPorDia = 1 / 7;
  dados.semanasGravidez += diasPassados * semanasPorDia;
  
  // Verificar mudanças de trimestre
  if (dados.semanasGravidez < 8) {
    dados.statusGravidez = statusGravidez.gravidez_inicial;
  } else if (dados.semanasGravidez < 20) {
    dados.statusGravidez = statusGravidez.gravidez_segundo_trimestre;
  } else if (dados.semanasGravidez < 40) {
    dados.statusGravidez = statusGravidez.gravidez_terceiro_trimestre;
  } else {
    // Parto ocorreu
    dados.filhos.push({ data_nascimento: Date.now() });
    dados.numeroFilhos += 1;
    dados.statusGravidez = statusGravidez.apos_parto;
    dados.semanasGravidez = 0;
    const msgParto = playerGenero === "Mulher"
      ? `🍼 Parabéns! Você deu à luz seu filho(a) número ${dados.numeroFilhos}!`
      : `🍼 Parabéns! Sua parceira deu à luz seu filho(a) número ${dados.numeroFilhos}!`;
    return {
      ...dados,
      mensagem: msgParto
    };
  }
  
  return dados;
};

// Descrição visual do progresso de gravidez
export const descricaoGravidez = (dados, playerGenero = "Mulher") => {
  if (dados.statusGravidez === statusGravidez.nao_gravida) return "Não grávida";
  const prefix = playerGenero === "Mulher" ? "Grávida" : "Parceira Grávida";
  if (dados.statusGravidez === statusGravidez.gravidez_inicial) return `🤰 ${prefix} (Semana ${Math.floor(dados.semanasGravidez)} - Trimestre 1)`;
  if (dados.statusGravidez === statusGravidez.gravidez_segundo_trimestre) return `🤰 ${prefix} (Semana ${Math.floor(dados.semanasGravidez)} - Trimestre 2)`;
  if (dados.statusGravidez === statusGravidez.gravidez_terceiro_trimestre) return `🤰 ${prefix} (Semana ${Math.floor(dados.semanasGravidez)} - Trimestre 3)`;
  if (dados.statusGravidez === statusGravidez.apos_parto) return playerGenero === "Mulher" ? "Pós-parto (recuperação)" : "Pós-parto da parceira";
};

// Penalidades de gravidez avançada (movimento, energia, etc)
export const calcularPenalidadesGravidez = (dados) => {
  const semanas = dados.semanasGravidez;
  if (semanas < 8) return { energia: 0, velocidade: 0 };
  if (semanas < 20) return { energia: -10, velocidade: 0 };
  if (semanas < 40) return { energia: -25, velocidade: -0.3 };
  return { energia: -40, velocidade: -0.5 };
};

// Monta descrição de fetiche de reprodução
export const podeEngravidar = (dados) => {
  return dados.statusGravidez === statusGravidez.nao_gravida;
};
