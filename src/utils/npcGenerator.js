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

  const coresCabelo = ["#2c1b18", "#111111", "#e67e22", "#f1c40f", "#9b59b6", "#e74c3c"];
  const estilosCabelo = ["Messy", "Luxurious", "Afro", "Braided", "Bun", "Cornrows", "Curled", "Dreadlocks", "Eary", "Neat", "Ninja", "Ponytail", "Tails", "Up"];
  const comprimentosCabelo = ["Short", "Medium", "Long", "Giant"];
  const coresOlhos = ["#3498db", "#2ecc71", "#784f2f", "#111111", "#e74c3c", "#9b59b6"];
  const coresRoupas = ["#3498db", "#111111", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6", "#ff4757", "#2f3542"];

  const estiloSorteado = Math.random() < 0.05 ? "Careca" : estilosCabelo[Math.floor(Math.random() * estilosCabelo.length)];
  const comprimentoSorteado = comprimentosCabelo[Math.floor(Math.random() * comprimentosCabelo.length)];
  const corOlhosSorteada = coresOlhos[Math.floor(Math.random() * coresOlhos.length)];

  // Cor de pele baseada na etnia
  let corPeleSorteada = "#ffdbac";
  if (etniaNPC === "Negra") {
    corPeleSorteada = Math.random() > 0.5 ? "#583E2F" : "#825633";
  } else if (etniaNPC === "Asiática") {
    corPeleSorteada = "#F4C9AA";
  } else if (etniaNPC === "Branca") {
    corPeleSorteada = Math.random() > 0.5 ? "#F4EAF0" : "#F5D5C9";
  } else {
    corPeleSorteada = Math.random() > 0.5 ? "#E1B585" : "#D58E5F";
  }

  return {
    id: Math.random().toString(),
    nome: `${primeiroNome} ${sobrenome}`,
    idade: idadeNPC,
    genero: generoNPC, etnia: etniaNPC,
    estadoCivil: estadoCivilSorteado, conjuge: nomeConjuge,
    profissao: profissao, bio: bioFinal,
    afeto: 10, fidelidade: Math.floor(Math.random() * 100), libido: 30 + Math.floor(Math.random() * 70), historico: [],
    forca: 10 + Math.floor(Math.random() * 80), // Força física aleatória
    altura: 155 + Math.floor(Math.random() * 35), peso: 50 + Math.floor(Math.random() * 40),
    seios_cm: generoNPC === "Mulher" ? 80 + Math.floor(Math.random() * 40) : 0,
    penis_cm: generoNPC === "Homem" ? 12 + Math.floor(Math.random() * 10) : 0,
    cabelo: estiloSorteado === "Careca" ? "Careca" : (comprimentoSorteado === "Short" ? "Curtos" : "Longos"),
    estiloCabelo: estiloSorteado,
    comprimentoCabelo: comprimentoSorteado,
    corCabelo: coresCabelo[Math.floor(Math.random() * coresCabelo.length)],
    corPele: corPeleSorteada,
    corOlhos: corOlhosSorteada,
    roupaIntima: true, 
    roupaTop: Math.random() > 0.3 ? "Camiseta" : "Top", 
    roupaBottom: Math.random() > 0.3 ? "Calça" : "Short", 
    corRoupaTop: coresRoupas[Math.floor(Math.random() * coresRoupas.length)], 
    corRoupaBottom: coresRoupas[Math.floor(Math.random() * coresRoupas.length)],
    corRoupaIntima: coresRoupas[Math.floor(Math.random() * coresRoupas.length)],
    fetiches: gerarFetchesAleatorias(),
    virgem: eVirgem,
    sensibilidade: 30 + Math.random() * 40,
    dadosReproductivos: inicializarDadosReproductivos()
  };
};