import React, { useState } from 'react';
import './App.css';
import { textos, mundoInicial, profissoes, eventos, modificadoresIdade, culturas } from './dados';

// Importação das Telas
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
import Prefeitura from './telas/Prefeitura';
import CentroComercial from './telas/CentroComercial';
import Aeroporto from './telas/Aeroporto';

function App() {
  const [idioma, setIdioma] = useState("pt");
  const t = textos[idioma];

  const [telaAtual, setTelaAtual] = useState("menuPrincipal");
  const [mundo, setMundo] = useState(mundoInicial);
  const [contatosNPCs, setContatosNPCs] = useState([]); 
  const [parceiroMotel, setParceiroMotel] = useState(null);
  
  const [player, setPlayer] = useState({
    nome: "Alex", idade: 18, genero: "Mulher",
    
    // --- NOVO: ORIENTAÇÃO E IDENTIDADE DE GÊNERO ---
    orientacao: "Heterossexual",         // Heterossexual, Homossexual, Bissexual, Pansexual, Assexual
    identidadeGenero: "Cisgênero",       // Cisgênero, Transgênero, Não-Binário
    preferenciaBusca: "Homens",          // Quem ele busca no celular: Homens, Mulheres, Ambos
    
    cidade_origem: "SaoPaulo", cidade_id: "SaoPaulo", 
    altura: 165, peso: 60, 
    cabelo: "Longos", corCabelo: "#2c1b18",
    seios: "Médios", penis: "Médio", bunda: "Redonda",
    seios_cm: 95, penis_cm: 14,
    
    roupaTop: "Camiseta",    
    roupaBottom: "Calça",    
    roupaIntima: true,       
    corRoupaTop: "#f1c40f",
    corRoupaBottom: "#1e3799",

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
      
      // --- REGRA DE ÉTICA / SANITIZAÇÃO DE SAVES ANTIGOS ---
      if (!dadosLoad.player.orientacao) dadosLoad.player.orientacao = "Heterossexual";
      if (!dadosLoad.player.identidadeGenero) dadosLoad.player.identidadeGenero = "Cisgênero";
      if (!dadosLoad.player.preferenciaBusca) {
        dadosLoad.player.preferenciaBusca = dadosLoad.player.genero === "Mulher" ? "Homens" : "Mulheres";
      }

      setPlayer(dadosLoad.player); 
      setMundo(dadosLoad.mundo); 
      setContatosNPCs(dadosLoad.contatosNPCs || []);
      setTelaAtual("quarto"); 
      alert(t.loadSucesso);
    } else { alert(t.loadErro); }
  };

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
      alert(`${t.novoDia} ${player.godMode ? "(Modo Deus Ativo)" : `(- $ ${custoDiario})`}`);
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
      let mods = novaIdade < 20 ? modificadoresIdade.jovem : (novaIdade > 50 ? modificadoresIdade.idoso : modificadoresIdade.adulto);
      setPlayer(prev => ({
        ...prev,
        idade: novaIdade,
        forca: Math.max(1, prev.forca + (mods.forca || 0)),
        resistencia: Math.max(1, prev.resistencia + (mods.resistencia || 0)),
        inteligencia: Math.min(100, prev.inteligencia + (mods.inteligencia || 0))
      }));
      alert(`🎉 Feliz aniversário! Agora tens ${novaIdade} anos.`);
    }

    const custoDiario = Math.round(15 * mundo[player.cidade_id].custo_vida);
    
    // O SEGREDO ESTÁ AQUI: trabalhoutHoje volta a ser false!
    setPlayer(prev => ({ 
        ...prev, 
        dia: novoDia, 
        hora: novaHora, 
        dinheiro: prev.godMode ? prev.dinheiro : prev.dinheiro - custoDiario, 
        energia: 100, 
        trabalhouHoje: false 
    }));
    
    alert(`Um novo dia começou!`);
  };

  // ================= ROTEADOR CENTRAL =================
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

  if (telaAtual === "start") return <Criacao player={player} setPlayer={setPlayer} mundo={mundo} t={t} iniciarJogo={() => setTelaAtual("distribuirAtributos")} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "distribuirAtributos") return <Atributos player={player} setPlayer={setPlayer} t={t} setTelaAtual={setTelaAtual} iniciarJogo={iniciarJogo} />;
  if (telaAtual === "quarto") return <Quarto player={player} mundo={mundo} t={t} salvarJogo={salvarJogo} dormir={dormir} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "mapa") return <Mapa player={player} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "agenciaEmprego") return <Agencia player={player} setPlayer={setPlayer} mundo={mundo} t={t} profissoes={profissoes} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "criadorCidade") return <CriadorCidade mundo={mundo} setMundo={setMundo} t={t} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "motel") return <Motel player={player} setPlayer={setPlayer} mundo={mundo} npc={parceiroMotel} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} setTelaAtual={setTelaAtual} avancarTempo={avancarTempo} />;
  if (telaAtual === "academia") return <Academia player={player} setPlayer={setPlayer} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
  if (telaAtual === "lojaRoupas") return <LojaRoupas player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} mundo={mundo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
  if (telaAtual === "prefeitura") return <Prefeitura player={player} setPlayer={setPlayer} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} mundo={mundo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
  if (telaAtual === "centroComercial") return <CentroComercial player={player} setPlayer={setPlayer} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
  if (telaAtual === "aeroporto") return <Aeroporto player={player} setPlayer={setPlayer} mundo={mundo} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;

  if (telaAtual === "celular") return (
    <Celular 
      player={player} setPlayer={setPlayer} 
      mundo={mundo} t={t} 
      contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} 
      avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} setParceiroMotel={setParceiroMotel} 
    />
  );

  return null;
}

export default App;