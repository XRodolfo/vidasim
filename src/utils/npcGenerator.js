import { culturas } from '../dados';

export const gerarNPC = (etnia) => {
  const cultura = culturas[etnia] || culturas.Latina;
  const p = cultura.primeiros[Math.floor(Math.random() * cultura.primeiros.length)];
  const s = cultura.sobrenomes[Math.floor(Math.random() * cultura.sobrenomes.length)];
  
  return {
    id: Math.random().toString(),
    nome: `${p} ${s}`,
    etnia: etnia,
    afeto: 10,
    fidelidade: Math.floor(Math.random() * 100),
    libido: 30 + Math.floor(Math.random() * 70),
    sensibilidade: 40 + Math.floor(Math.random() * 60),
    // Geração de Família
    familia: {
      mae: cultura.primeiros[Math.floor(Math.random() * cultura.primeiros.length)] + " " + s,
      pai: cultura.primeiros[Math.floor(Math.random() * cultura.primeiros.length)] + " " + s,
      irmaos: Math.floor(Math.random() * 3)
    },
    // Agenda inicial
    agenda: ["Trabalho", "Academia", "Casa"][Math.floor(Math.random() * 3)],
    historico: []
  };
};