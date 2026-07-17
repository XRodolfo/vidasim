import { culturas } from '../dados';
import { gerarFetchesAleatorias } from './fetchesSystem';
import { inicializarDadosReproductivos } from './reproductionSystem';

export const gerarNPC = (player, mundo) => {
  const etnias = ["Latina", "Asiática", "Negra", "Mista", "Branca"];
  const etniaLocal = mundo[player.cidade_id]?.etnia || "Latina";
  const etniaNPC = Math.random() < 0.90 ? etniaLocal : etnias[Math.floor(Math.random() * etnias.length)];
  const dadosCultura = culturas[etniaNPC] || culturas["Latina"];
  
  let generoNPC = "Mulher";
  const preferencia = player.preferenciaBusca || "Ambos";
  if (preferencia === "Homens") generoNPC = "Homem";
  else if (preferencia === "Mulheres") generoNPC = "Mulher";
  else generoNPC = Math.random() > 0.5 ? "Homem" : "Mulher";

  // SISTEMA ANTI-CRASH: Se a lista não existir, ele usa um fallback seguro
  const listaNomes = generoNPC === "Homem" ? (dadosCultura.nomesHomens || ["João"]) : (dadosCultura.nomesMulheres || ["Maria"]);
  const listaSobrenomes = dadosCultura.sobrenomes || ["Silva"];

  const primeiroNome = listaNomes[Math.floor(Math.random() * listaNomes.length)];
  const sobrenome = listaSobrenomes[Math.floor(Math.random() * listaSobrenomes.length)];
  
  const estadosCivis = [
    { status: "Solteiro(a)", chance: 60 }, { status: "Numa relação", chance: 20 },
    { status: "Casado(a)", chance: 10 }, { status: "Relação Aberta", chance: 10 }
  ];
  let estadoCivilSorteado = "Solteiro(a)";
  let rolagem = Math.random() * 100;
  for (let estado of estadosCivis) {
    if (rolagem < estado.chance) { estadoCivilSorteado = estado.status; break; }
    rolagem -= estado.chance;
  }

  let nomeConjuge = null;
  if (["Casado(a)", "Numa relação", "Relação Aberta"].includes(estadoCivilSorteado)) {
      let genParceiro = Math.random() > 0.5 ? "Homem" : "Mulher";
      let listaParceiro = genParceiro === "Homem" ? (dadosCultura.nomesHomens || ["Carlos"]) : (dadosCultura.nomesMulheres || ["Ana"]);
      nomeConjuge = `${listaParceiro[Math.floor(Math.random() * listaParceiro.length)]} ${listaSobrenomes[Math.floor(Math.random() * listaSobrenomes.length)]}`;
  }

  const profissoes = ["Designer", "Médico(a)", "Programador(a)", "Advogado(a)", "Chef", "Artista", "Engenheiro(a)"];
  const profissao = profissoes[Math.floor(Math.random() * profissoes.length)];
  const bioBase = ["Gosto de viajar ✈️", "Focado(a) na carreira 📈", "Amo animais 🐕", "Rato(a) de academia 💪"][Math.floor(Math.random() * 4)];
  
  let bioFinal = `${profissao}. ${bioBase}`;
  if (estadoCivilSorteado === "Casado(a)") bioFinal = "Apenas contatos profissionais. 🤫";
  if (estadoCivilSorteado === "Relação Aberta") bioFinal = `Vivo o amor livremente junto com ${nomeConjuge.split(' ')[0]} ✨`;

  const idadeNPC = Math.floor(Math.random() * 40) + 18;

  let eVirgem = false;
  if (estadoCivilSorteado === "Solteiro(a)") {
    if (generoNPC === "Mulher") {
      if (idadeNPC <= 21) eVirgem = Math.random() < 0.40;
      else if (idadeNPC <= 25) eVirgem = Math.random() < 0.15;
      else if (idadeNPC <= 30) eVirgem = Math.random() < 0.05;
      else eVirgem = Math.random() < 0.01;
    } else {
      if (idadeNPC <= 21) eVirgem = Math.random() < 0.30;
      else if (idadeNPC <= 25) eVirgem = Math.random() < 0.10;
      else eVirgem = Math.random() < 0.02;
    }
  }

  return {
    id: Math.random().toString(),
    nome: `${primeiroNome} ${sobrenome}`,
    idade: idadeNPC,
    genero: generoNPC, etnia: etniaNPC,
    estadoCivil: estadoCivilSorteado, conjuge: nomeConjuge,
    profissao: profissao, bio: bioFinal,
    afeto: 10, fidelidade: Math.floor(Math.random() * 100), libido: 30 + Math.floor(Math.random() * 70), historico: [],
    altura: 155 + Math.floor(Math.random() * 35), peso: 50 + Math.floor(Math.random() * 40),
    seios_cm: generoNPC === "Mulher" ? 80 + Math.floor(Math.random() * 40) : 0,
    penis_cm: generoNPC === "Homem" ? 12 + Math.floor(Math.random() * 10) : 0,
    cabelo: ["Curtos", "Longos", "Cacheados", "Careca"][Math.floor(Math.random() * 4)],
    corCabelo: ["#2c1b18", "#111111", "#e67e22", "#f1c40f"][Math.floor(Math.random() * 4)],
    roupaIntima: true, roupaTop: "Camiseta", roupaBottom: "Calça", corRoupaTop: "#3498db", corRoupaBottom: "#111111",
    fetiches: gerarFetchesAleatorias(),
    virgem: eVirgem,
    sensibilidade: 30 + Math.random() * 40,
    dadosReproductivos: inicializarDadosReproductivos()
  };
};