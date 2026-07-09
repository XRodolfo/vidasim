import React, { useState } from 'react';
import './App.css';
import { textos, mundoInicial, profissoes, eventos, modificadoresIdade, culturas } from './dados';

// Importação das Telas e Módulos
import Criacao from './telas/Criacao';
import Quarto from './telas/Quarto';
import Mapa from './telas/Mapa';
import Celular from './telas/Celular';
import Agencia from './telas/Agencia';
import Academia from './telas/Academia';
import CriadorCidade from './telas/CriadorCidade';
import Motel from './telas/Motel';
import Atributos from './telas/Atributos';
import LojaRoupas from './telas/LojaRoupas';


function App() {
  const [idioma, setIdioma] = useState("pt");
  const t = textos[idioma];

  const [telaAtual, setTelaAtual] = useState("menuPrincipal");
  const [mundo, setMundo] = useState(mundoInicial);
  const [contatosNPCs, setContatosNPCs] = useState([]); 
  const [parceiroMotel, setParceiroMotel] = useState(null);
  
  const [player, setPlayer] = useState({
    nome: "Alex", idade: 18, genero: "Mulher",
    cidade_origem: "SaoPaulo", cidade_id: "SaoPaulo", 
    altura: 165, peso: 60, 
    
    // Configurações Visuais Atualizadas
    cabelo: "Longos", 
    corCabelo: "#2c1b18", // Cor base (Castanho Escuro)
    seios: "Médios", penis: "Médio", bunda: "Redonda",
    seios_cm: 95, penis_cm: 14,
    
    // Sistema de Roupa Inicial
    roupaTop: "Camiseta",    
    roupaBottom: "Calça",    
    roupaIntima: true,       

    dinheiro: 1000, energia: 100, dia: 1, hora: 8,
    pontosDisponiveis: 30, 
    forca: 50, reflexo: 50, inteligencia: 50, carisma: 50, resistencia: 50,
    profissao_id: null, reputacao_trabalho: 0
  });

  const salvarJogo = () => {
    localStorage.setItem('vidasim_savegame', JSON.stringify({ player, mundo, contatosNPCs }));
    alert(t.saveSucesso);
  };

  const carregarJogo = () => {
    const saveCru = localStorage.getItem('vidasim_savegame');
    if (saveCru) {
      const dadosLoad = JSON.parse(saveCru);
      setPlayer(dadosLoad.player); setMundo(dadosLoad.mundo); setContatosNPCs(dadosLoad.contatosNPCs);
      setTelaAtual("quarto"); alert(t.loadSucesso);
    } else { alert(t.loadErro); }
  };

  // Esta função agora calcula o IMC final e quebra o loop, mandando para o quarto!
  const iniciarJogo = () => {
    let baseF = 50; let baseRef = 50; let baseRes = 50;
    const imc = player.peso / ((player.altura / 100) * (player.altura / 100));
    if (imc < 18.5) { baseF -= 15; baseRef += 15; baseRes -= 10; }
    else if (imc < 24.9) { baseF += 10; baseRef += 5; baseRes += 15; }
    else { baseF += 15; baseRef -= 15; baseRes -= 10; }
    
    setPlayer(prev => ({
      ...prev, 
      forca: Math.round(baseF), 
      reflexo: Math.round(baseRef), 
      resistencia: Math.round(baseRes)
    }));
    
    setTelaAtual("quarto");
  };

  const avancarTempo = (horas, custoEnergia) => {
    if (player.energia < custoEnergia && !player.godMode) { 
      alert(t.exaustao); 
      return false; 
    }

    let novaHora = player.hora + horas; 
    let novoDia = player.dia; 
    let novoDinheiro = player.dinheiro;
    
    if (novaHora >= 24) {
      novaHora -= 24; novoDia += 1;
      const custoDiario = Math.round(15 * mundo[player.cidade_id].custo_vida);
      if (!player.godMode) novoDinheiro -= custoDiario; 
      alert(`${t.novoDia} ${player.godMode ? "(O Deus não paga impostos!)" : `(- $ ${custoDiario})`}`);
    }

    setPlayer(prev => ({
      ...prev, 
      hora: novaHora, 
      dia: novoDia, 
      dinheiro: novoDinheiro, 
      energia: prev.godMode ? 100 : prev.energia - custoEnergia 
    }));
    return true;
  };

  const dormir = () => {
    let novaHora = 8;
    let novoDia = player.dia + 1;
    let novaIdade = player.idade;
    
    if (novoDia % 365 === 0) {
      novaIdade += 1;
      aplicarEfeitoIdade(novaIdade);
      alert(`🎉 Feliz aniversário! Agora tens ${novaIdade} anos.`);
    }

    let mensagemEvento = "";
    let novoDinheiro = player.dinheiro;
    if (Math.random() < 0.15) {
      const evento = eventos[Math.floor(Math.random() * eventos.length)];
      mensagemEvento = `\n\n📢 Evento: ${evento.texto}`;
      if (evento.efeito.dinheiro) novoDinheiro += evento.efeito.dinheiro;
    }

    const custoDiario = Math.round(15 * mundo[player.cidade_id].custo_vida);
    
    setPlayer({
      ...player,
      idade: novaIdade,
      dia: novoDia,
      hora: novaHora,
      dinheiro: !player.godMode ? novoDinheiro - custoDiario : novoDinheiro,
      energia: 100
    });

    alert(`Um novo dia começou!${mensagemEvento}`);
  };

  const aplicarEfeitoIdade = (idade) => {
    let mods = {};
    if (idade < 20) mods = modificadoresIdade.jovem;
    else if (idade > 50) mods = modificadoresIdade.idoso;
    else mods = modificadoresIdade.adulto;

    setPlayer(prev => ({
      ...prev,
      forca: Math.max(1, prev.forca + (mods.forca || 0)),
      resistencia: Math.max(1, prev.resistencia + (mods.resistencia || 0)),
      inteligencia: Math.min(100, prev.inteligencia + (mods.inteligencia || 0))
    }));
  };

  const buscarNovoContato = () => {
    if (!avancarTempo(1, 10)) return; // Gasta 1h e 10 de energia

    // 1. SISTEMA DE IMIGRAÇÃO (10% de chance de ser alguém de fora)
    const etnias = ["Latina", "Asiática", "Negra", "Mista", "Branca"];
    const etniaLocal = mundo[player.cidade_id]?.etnia || "Latina";
    const etniaNPC = Math.random() < 0.90 ? etniaLocal : etnias[Math.floor(Math.random() * etnias.length)];
    const dadosCultura = culturas[etniaNPC] || culturas["Latina"];
    
    // 2. IDENTIDADE E GÊNERO
    const generoNPC = Math.random() > 0.5 ? "Mulher" : "Homem";
    const primeiroNome = dadosCultura.primeiros[Math.floor(Math.random() * dadosCultura.primeiros.length)];
    const sobrenome = dadosCultura.sobrenomes[Math.floor(Math.random() * dadosCultura.sobrenomes.length)];
    const nomeCompleto = `${primeiroNome} ${sobrenome}`;
    const idadeAdultaNPC = Math.floor(Math.random() * 40) + 18; // 18 a 57 anos

    // 3. EMPREGO E BIOGRAFIA DINÂMICA
    const profissoesNPC = ["Designer", "Engenheiro(a)", "Artista", "Médico(a)", "Programador(a)", "Atendente", "Chef de Cozinha", "Empresário(a)", "Personal Trainer", "Advogado(a)"];
    const profissao = profissoesNPC[Math.floor(Math.random() * profissoesNPC.length)];
    
    const personalidades = ["Amo uma boa conversa.", "Procurando alguém para aventuras.", "Foco na carreira.", "Caseiro(a) e de boa.", "Me faça rir!"];
    const curiosidades = ["Não vivo sem café ☕", "Amo animais 🐕", "Sempre planejando a próxima viagem ✈️", "Rato de academia 💪", "Viciado em séries 📺"];
    const bio = `${profissao} em ascensão. ${personalidades[Math.floor(Math.random() * personalidades.length)]} ${curiosidades[Math.floor(Math.random() * curiosidades.length)]}`;

    // 4. ATRIBUTOS FÍSICOS E VESTUÁRIO (Nunca nus!)
    const estilosCabelo = ["Curtos", "Longos", "Espetado", "Cacheados", "Careca"];
    const coresCabelo = ["#2c1b18", "#111111", "#e67e22", "#f1c40f", "#9b59b6"];
    const pecasTop = ["Camiseta", "Top"];
    const pecasBottom = ["Calça", "Short"];

    const novoNPC = { 
      id: Math.random(), 
      nome: nomeCompleto, 
      idade: idadeAdultaNPC,
      genero: generoNPC,
      etnia: etniaNPC,
      profissao: profissao,
      bio: bio,
      afeto: 10, 
      fidelidade: Math.floor(Math.random() * 100), 
      
      // Físico Procedural
      altura: 150 + Math.floor(Math.random() * 45), // 150cm a 195cm
      peso: 50 + Math.floor(Math.random() * 50),    // 50kg a 100kg
      seios_cm: generoNPC === "Mulher" ? 75 + Math.floor(Math.random() * 50) : 0,
      penis_cm: generoNPC === "Homem" ? 12 + Math.floor(Math.random() * 10) : 0,
      cabelo: estilosCabelo[Math.floor(Math.random() * estilosCabelo.length)],
      corCabelo: coresCabelo[Math.floor(Math.random() * coresCabelo.length)],

      // Vestuário (Garantindo que venham vestidos)
      roupaIntima: true,
      roupaTop: generoNPC === "Homem" && Math.random() > 0.8 ? "Nenhuma" : pecasTop[Math.floor(Math.random() * pecasTop.length)], // Homem tem 20% de chance de estar sem camisa (ex: foto malhando)
      roupaBottom: pecasBottom[Math.floor(Math.random() * pecasBottom.length)],
      corRoupaTop: ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#ffffff", "#111"][Math.floor(Math.random() * 6)],
      corRoupaBottom: ["#1e3799", "#111111", "#555555", "#bdc3c7"][Math.floor(Math.random() * 4)],
    };

    setContatosNPCs([...contatosNPCs, novoNPC]);
  };

  // ================= ROTEADOR DE ECRÃS =================
  if (telaAtual === "menuPrincipal") {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h1 style={{ fontSize: '3rem', color: '#007bff' }}>{t.tituloJogo}</h1>
        <div className="acoes" style={{ flexDirection: 'column', maxWidth: '300px', margin: '40px auto', gap: '15px' }}>
          <button style={{ padding: '20px' }} onClick={() => setTelaAtual("start")}>▶ {t.menuNovaVida}</button>
          <button style={{ backgroundColor: '#28a745' }} onClick={carregarJogo}>💾 {t.menuCarregar}</button>
          <button style={{ backgroundColor: '#555' }} onClick={() => setTelaAtual("criadorCidade")}>{t.criador}</button>
        </div>
      </div>
    );
  }

  if (telaAtual === "start") return (
    <Criacao 
      player={player} 
      setPlayer={setPlayer} 
      mundo={mundo} 
      t={t} 
      iniciarJogo={() => setTelaAtual("distribuirAtributos")} // Avança para a distribuição de pontos
      setTelaAtual={setTelaAtual} 
    />
  );

  if (telaAtual === "distribuirAtributos") return (
    <Atributos 
      player={player}       
      setPlayer={setPlayer} 
      t={t} 
      setTelaAtual={setTelaAtual} 
      iniciarJogo={iniciarJogo} // <--- CHAVE DA CORREÇÃO: Passando o gatilho final para salvar e ir ao quarto!
    />
  );

  if (telaAtual === "quarto") return <Quarto player={player} mundo={mundo} t={t} salvarJogo={salvarJogo} dormir={dormir} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "mapa") return <Mapa player={player} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "agenciaEmprego") return <Agencia player={player} setPlayer={setPlayer} mundo={mundo} t={t} profissoes={profissoes} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "academia") return <Academia player={player} setPlayer={setPlayer} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "criadorCidade") return <CriadorCidade mundo={mundo} setMundo={setMundo} t={t} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "celular") return <Celular player={player} setPlayer={setPlayer} mundo={mundo} t={t} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} buscarNovoContato={buscarNovoContato} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} setParceiroMotel={setParceiroMotel} />;
  if (telaAtual === "motel") return <Motel player={player} setPlayer={setPlayer} mundo={mundo} npc={parceiroMotel} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} setTelaAtual={setTelaAtual} avancarTempo={avancarTempo} />;
  if (telaAtual === "lojaRoupas") return <LojaRoupas player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} />;
  return null;
}

export default App;