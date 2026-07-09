import React, { useState } from 'react';
import './App.css';
import { textos, mundoInicial, profissoes, eventos, modificadoresIdade } from './dados';

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
    altura: 165, peso: 60, cabelo: "Longos", seios: "Médios", penis: "Médio", bunda: "Redonda",
    dinheiro: 1000, energia: 100, dia: 1, hora: 8,
    pontosDisponiveis: 30, // PONTOS INICIAIS
    forca: 5, // Começa com um mínimo de 5
    reflexo: 5,
    inteligencia: 5,
    carisma: 5,
    resistencia: 5,
    inventario: [],      // Lista de itens comprados
    veiculos: [],        // Lista de IDs de veículos possuídos
    veiculoAtivo: null,  // Veículo que está a usar para transporte
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

  const iniciarJogo = () => {
    let baseF = 50; let baseRef = 50; let baseRes = 50;
    const imc = player.peso / ((player.altura / 100) * (player.altura / 100));
    if (imc < 18.5) { baseF -= 15; baseRef += 15; baseRes -= 10; }
    else if (imc < 24.9) { baseF += 10; baseRef += 5; baseRes += 15; }
    else { baseF += 15; baseRef -= 15; baseRes -= 10; }
    setPlayer({...player, forca: Math.round(baseF), reflexo: Math.round(baseRef), resistencia: Math.round(baseRes)});
    setTelaAtual("quarto");
  };

  const avancarTempo = (horas, custoEnergia) => {
    // Se não for o Deus Rodolfo e não tiver energia, bloqueia!
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
      // O Modo Deus não paga contas
      if (!player.godMode) novoDinheiro -= custoDiario; 
      alert(`${t.novoDia} ${player.godMode ? "(O Deus não paga impostos!)" : `(- $ ${custoDiario})`}`);
    }

    setPlayer(prev => ({
      ...prev, 
      hora: novaHora, 
      dia: novoDia, 
      dinheiro: novoDinheiro, 
      // Modo Deus mantém energia infinita
      energia: prev.godMode ? 100 : prev.energia - custoEnergia 
    }));
    return true;
  };

  const dormir = () => {
    // 1. Avançar Tempo
    let novaHora = 8;
    let novoDia = player.dia + 1;
    let novaIdade = player.idade;
    
    // 2. Cálculo de Envelhecimento (A cada 365 dias, +1 ano)
    if (novoDia % 365 === 0) {
      novaIdade += 1;
      aplicarEfeitoIdade(novaIdade);
      alert(`🎉 Feliz aniversário! Agora tens ${novaIdade} anos.`);
    }

    // 3. Evento Aleatório ao acordar (15% de chance)
    let mensagemEvento = "";
    let novoDinheiro = player.dinheiro;
    if (Math.random() < 0.15) {
      const evento = eventos[Math.floor(Math.random() * eventos.length)];
      mensagemEvento = `\n\n📢 Evento: ${evento.texto}`;
      if (evento.efeito.dinheiro) novoDinheiro += evento.efeito.dinheiro;
    }

    // 4. Cobrar Custo de Vida
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
    if (!avancarTempo(1, 10)) return;
    const etniaLocal = mundo[player.cidade_id].etnia || "Mista";
    const listas = { "Latina": ["Mariana", "Camila", "Rodrigo"], "Asiática": ["Yuki", "Sakura", "Hiroshi"], "Negra": ["Amina", "Zuri", "Tunde"], "Mista": ["Alex", "Jordan", "Taylor"] };
    const lista = listas[etniaLocal];
    setContatosNPCs([...contatosNPCs, { id: Math.random(), nome: lista[Math.floor(Math.random() * lista.length)] + " " + Math.floor(Math.random() * 100), afeto: 10, fidelidade: Math.floor(Math.random() * 100), familia: Math.random() > 0.5 ? "Mãe/Irmão" : "Pai Solteiro" }]);
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

  // No Roteador do App.js:
if (telaAtual === "start") return (
  <Criacao 
    player={player} 
    setPlayer={setPlayer} 
    mundo={mundo} 
    t={t} // <--- ISTO É O QUE ESTAVA A FALTAR!
    iniciarJogo={() => setTelaAtual("distribuirAtributos")} // <--- MUDANÇA: vai para Atributos
    setTelaAtual={setTelaAtual} 
  />
);
  if (telaAtual === "distribuirAtributos") return (
  <Atributos 
    player={player}       // <--- O ERRO ESTAVA AQUI: Se isto faltar, o 'player' é undefined!
    setPlayer={setPlayer} // <--- O ERRO ESTAVA AQUI: Precisa de passar o setter
    t={t} 
    setTelaAtual={setTelaAtual} 
  />
);
  if (telaAtual === "quarto") return <Quarto player={player} mundo={mundo} t={t} salvarJogo={salvarJogo} dormir={dormir} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "mapa") return <Mapa player={player} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "agenciaEmprego") return <Agencia player={player} setPlayer={setPlayer} mundo={mundo} t={t} profissoes={profissoes} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "academia") return <Academia player={player} setPlayer={setPlayer} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "criadorCidade") return <CriadorCidade mundo={mundo} setMundo={setMundo} t={t} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "celular") return <Celular player={player} setPlayer={setPlayer} mundo={mundo} t={t} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} buscarNovoContato={buscarNovoContato} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} setParceiroMotel={setParceiroMotel} />;
  if (telaAtual === "motel") return <Motel player={player} setPlayer={setPlayer} mundo={mundo} npc={parceiroMotel} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} setTelaAtual={setTelaAtual} avancarTempo={avancarTempo} />;

  return null;
}

export default App;