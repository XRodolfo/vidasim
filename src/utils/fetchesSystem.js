// Sistema de Fetiches - Modifica prazer baseado em preferências
// Cada NPC pode ter fetiches que aumentam ou diminuem prazer em certas ações

export const todasAsFetiches = [
  { id: "submissa", nome: "Submissa", descricao: "Ganha mais prazer em posições de dominação", tipo: "submissao" },
  { id: "dominante", nome: "Dominante", descricao: "Ganha mais prazer ao dominar", tipo: "dominacao" },
  { id: "voyeur", nome: "Voyeur", descricao: "Gosta de exibicionismo", tipo: "exibicionismo" },
  { id: "bdsm", nome: "BDSM", descricao: "Aprecia práticas consensuais de restrição/dor leve", tipo: "intensidade" },
  { id: "peituda", nome: "Apaixonada por Peitos", descricao: "Ganha prazer com estímulo nos seios", tipo: "corporal" },
  { id: "anal", nome: "Amante de Anal", descricao: "Ganha prazer com penetração anal", tipo: "penetracao" },
  { id: "squirt", nome: "Squirt", descricao: "Consegue e gosta muito de squirt", tipo: "corporal" },
  { id: "creampie", nome: "Creampie", descricao: "Gosta de receber ejaculação dentro", tipo: "penetracao" },
  { id: "footjob", nome: "Footjob", descricao: "Gosta de estimulação com os pés", tipo: "corporal" },
  { id: "oral_obsessed", nome: "Oral Viciada", descricao: "Adora sexo oral e ganha muito mais prazer", tipo: "oral" },
];

// Gera fetiches aleatórios para um NPC (1-3 fetiches)
export const gerarFetchesAleatorias = () => {
  const quantidade = Math.floor(Math.random() * 3) + 1; // 1 a 3 fetiches
  const fetichesEscolhidas = [];
  const fetichesCopia = [...todasAsFetiches];
  
  for (let i = 0; i < quantidade; i++) {
    const idx = Math.floor(Math.random() * fetichesCopia.length);
    fetichesEscolhidas.push(fetichesCopia[idx]);
    fetichesCopia.splice(idx, 1);
  }
  
  return fetichesEscolhidas;
};

// Calcula modificador de prazer baseado nas fetiches do NPC
export const calcularModificadorFetiche = (npc, tipoAcao, acao) => {
  if (!npc.fetiches || npc.fetiches.length === 0) return 1.0;
  
  let modificador = 1.0;
  
  npc.fetiches.forEach(fetiche => {
    switch (fetiche.id) {
      case "submissa":
        if (["de_quatro", "missionario"].includes(acao)) modificador *= 1.4;
        break;
      case "dominante":
        if (["por_cima"].includes(acao)) modificador *= 1.4;
        break;
      case "bdsm":
        if (tipoAcao === "intensidade") modificador *= 1.3;
        break;
      case "peituda":
        if (["massagem_seios"].includes(acao)) modificador *= 1.5;
        break;
      case "anal":
        if (acao === "anal") modificador *= 1.6;
        break;
      case "squirt":
        if (["oral_enviado", "penetracao"].includes(tipoAcao)) modificador *= 1.3;
        break;
      case "creampie":
        if (["missionario", "de_quatro"].includes(acao)) modificador *= 1.2;
        break;
      case "oral_obsessed":
        if (["oral_enviado", "oral_recebido"].includes(acao)) modificador *= 1.5;
        break;
      case "footjob":
        if (acao === "footjob") modificador *= 1.4;
        break;
      default:
        break;
    }
  });
  
  return Math.min(2.0, modificador); // Cap em 2x
};

// Gera descrição narrativa das fetiches
export const descricaoFetiche = (fetiche) => {
  return `💕 ${fetiche.nome}: ${fetiche.descricao}`;
};
