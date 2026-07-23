import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './ui/theme.css';
import { createNeedSystem, defaultNeeds } from './needs/needSystem';
import { initTheme } from './ui/theme';

import { textos, mundoInicial, profissoes } from './dados';
import { inicializarDadosReproductivos, avancarGravidez } from './utils/reproductionSystem';
import { processarRendimentoNegocios } from './utils/businessSystem';
import { inicializarRelacionamento } from './utils/relationshipSystem';
import { simularVidaNPCs } from './utils/npcLifeSystem';

import DistritoComercial from './telas/DistritoComercial';
import DistritoNoturno from './telas/DistritoNoturno';
import Criacao from './telas/Criacao';
import Quarto from './telas/Quarto';
import Mapa from './telas/Mapa';
import Celular from './telas/Celular';
import Agencia from './telas/Agencia';
import Academia from './telas/Academia';
import CriadorCidade from './telas/CriadorCidade';
import Motel from './telas/Motel';
import Atributos from './telas/Atributos';
import CentroComercial from './telas/CentroComercial';
import Prefeitura from './telas/Prefeitura';
import Aeroporto from './telas/Aeroporto';
import LojaVeiculos from './telas/LojaVeiculos';
import Imobiliaria from './telas/Imobiliaria';
import LojaRoupas from './telas/LojaRoupas';
import ContraceptivoDialog from './componentes/ContraceptivoDialog';
import Trabalho from './telas/Trabalho';
import Restaurante from './telas/Restaurante';
import Banco from './telas/Banco';
import HUD from './componentes/HUD';
import HotelSelector from './telas/HotelSelector';
import Loja from './telas/Loja';

function App() {
  const [idioma] = useState("pt");
  const t = textos[idioma];

  const [telaAtual, setTelaAtual] = useState("menuPrincipal");
  const [mundo, setMundo] = useState(mundoInicial);
  const [contatosNPCs, setContatosNPCs] = useState([]); 
  const [parceiroMotel, setParceiroMotel] = useState(null);
  const [hotelCategoria, setHotelCategoria] = useState("3");
  const [lastScreen, setLastScreen] = useState("quarto");
  
  const [player, setPlayer] = useState({
    nome: "Alex", idade: 18, genero: "Mulher",
    orientacao: "Heterossexual", identidadeGenero: "Cisgênero", preferenciaBusca: "Homens",
    periciaSexual: 15,
    cidade_origem: "SaoPaulo", cidade_id: "SaoPaulo", 
    altura: 165, peso: 60, cabelo: "Longos", corCabelo: "#2c1b18",
    corPele: "#ffdbac", corOlhos: "#3498db", estiloCabelo: "Messy", comprimentoCabelo: "Medium",
    seios: "Médios", penis: "Médio", bunda: "Redonda", seios_cm: 95, penis_cm: 14,
    roupaTop: "Camiseta", roupaBottom: "Calça", roupaIntima: true,       
    corRoupaTop: "#f1c40f", corRoupaBottom: "#1e3799",
    dinheiro: 1000, energia: 100, dia: 1, hora: 8, pontosDisponiveis: 30, 
    forca: 50, reflexo: 50, inteligencia: 50, carisma: 50, resistencia: 50, culinaria: 0,
    profissao_id: null, tituloProfissao: null, salario: 0, trabalhouHoje: false,
    veiculos: [], propriedades: [], negocios: {}, poupanca: 0, dividaBancaria: 0,
    dadosReproductivos: inicializarDadosReproductivos(),
    inventario: { imoveis: [], veiculos: [], itens: [], dinheiro: 0 },
    relacionamento: inicializarRelacionamento(),
    casa: { tipo: "apartamento_simples", comodoAtual: "sala_simples" }
  });

  // Need system ref and state (must be outside the player useState object)
  const needSystemRef = useRef(createNeedSystem());
  const [needs, setNeeds] = useState(defaultNeeds);

  // Save game now includes needs
  const salvarJogo = () => {
    localStorage.setItem(
      'vidasim_savegame',
      JSON.stringify({ player, mundo, contatosNPCs, needs })
    );
    alert(t.saveSucesso);
  };

  // Load game restores needs as well
  const carregarJogo = () => {
    const saveCru = localStorage.getItem('vidasim_savegame');
    if (saveCru) {
      const dadosLoad = JSON.parse(saveCru);
      setPlayer(dadosLoad.player);
      setMundo(dadosLoad.mundo);
      setContatosNPCs(dadosLoad.contatosNPCs || []);
      if (dadosLoad.needs) setNeeds(dadosLoad.needs);
      setTelaAtual('quarto');
      alert(t.loadSucesso);
    } else {
      alert(t.loadErro);
    }
  };

  // Apply stored theme on first load
  useEffect(() => {
    initTheme();
  }, []);

  // Update day/night visual based on hour
  useEffect(() => {
    const hour = player.hora;
    const timeOfDay = hour >= 6 && hour < 18 ? 'day' : 'night';
    document.documentElement.setAttribute('data-time', timeOfDay);
  }, [player.hora]);


  const iniciarJogo = () => {
    let baseF = 50; let baseRef = 50; let baseRes = 50;
    const imc = player.peso / ((player.altura / 100) * (player.altura / 100));
    if (imc < 18.5) { baseF -= 15; baseRef += 15; baseRes -= 10; }
    else if (imc < 24.9) { baseF += 10; baseRef += 5; baseRes += 15; }
    else { baseF += 15; baseRef -= 15; baseRes -= 10; }

    const startingHomeId = `imovel_${Date.now()}`;
    const startingHome = {
      id: startingHomeId,
      tipo: "apartamento_simples",
      nome: "Apartamento Simples (Início)",
      preco: 0,
      aluguel: 0,
      qualidade: 1,
      capacidade_pessoas: 1,
      descricao: "O seu primeiro lar básico",
      cidade: player.cidade_id || "SaoPaulo",
      alugado: false
    };

    setPlayer(prev => ({ 
      ...prev, 
      forca: Math.round(baseF), 
      reflexo: Math.round(baseRef), 
      resistencia: Math.round(baseRes),
      casa: { id: startingHomeId, tipo: "apartamento_simples", nome: "Apartamento Simples (Início)" },
      inventario: {
        ...prev.inventario,
        imoveis: [startingHome]
      }
    }));
    setTelaAtual("quarto");
  };

  const avancarTempo = (horas, custoEnergia) => {
    if (player.energia < custoEnergia && !player.godMode) { alert(t.exaustao); return false; }
    let novaHora = player.hora + horas; 
    let novoDia = player.dia; 
    let novoDinheiro = player.dinheiro;
    let diasPassados = 0;
    
    while (novaHora >= 24) {
      novaHora -= 24; 
      novoDia += 1;
      diasPassados += 1;
      const custoDiario = Math.round(15 * mundo[player.cidade_id].custo_vida);
      // Somar aluguel diário (aluguel mensal / 30) de todos os imóveis alugados na cidade atual
      const alugueis = player.inventario?.imoveis?.filter(im => im.alugado && im.cidade === player.cidade_id) || [];
      const totalAluguelDia = alugueis.reduce((sum, im) => sum + Math.round((im.aluguel || 0) / 30), 0);
      
      // Receber aluguéis dos seus inquilinos (de qualquer cidade)
      const alugadosParaInquilino = player.inventario?.imoveis?.filter(im => im.alugadoParaInquilino) || [];
      const totalGanhoAluguelDia = alugadosParaInquilino.reduce((sum, im) => sum + Math.round((im.rendimentoAluguel || 0) / 30), 0);

      if (!player.godMode) novoDinheiro -= (custoDiario + totalAluguelDia); 
      novoDinheiro += totalGanhoAluguelDia;
    }
    
    const totalHoras = horas + diasPassados * 24;
    needSystemRef.current.decay(totalHoras, player.godMode);
    setNeeds(needSystemRef.current.getNeeds());

    // Simula vida dos NPCs quando pelo menos 1 dia passa
    if (diasPassados > 0) {
      setContatosNPCs(prev => simularVidaNPCs(prev, diasPassados, mundo, player));
    }

    setPlayer(prev => {
      let novosDadosReprod = prev.dadosReproductivos;
      if (diasPassados > 0 && novosDadosReprod) {
        novosDadosReprod = avancarGravidez({ ...novosDadosReprod }, diasPassados, prev.genero);
        if (novosDadosReprod.mensagem) {
          alert(novosDadosReprod.mensagem);
          delete novosDadosReprod.mensagem;
        }
      }
      let novosNegocios = prev.negocios;
      if (diasPassados > 0) {
        novosNegocios = processarRendimentoNegocios(prev.negocios, diasPassados);
      }
      return { 
        ...prev, 
        hora: novaHora, 
        dia: novoDia, 
        dinheiro: novoDinheiro, 
        energia: prev.godMode ? 100 : Math.max(0, prev.energia - custoEnergia),
        dadosReproductivos: novosDadosReprod,
        negocios: novosNegocios
      };
    });
    return true;
  };

  const dormir = () => {
    const custoDiario = Math.round(15 * mundo[player.cidade_id].custo_vida);
    const alugueis = player.inventario?.imoveis?.filter(im => im.alugado && im.cidade === player.cidade_id) || [];
    const totalAluguelDia = alugueis.reduce((sum, im) => sum + Math.round((im.aluguel || 0) / 30), 0);
    const custoTotal = custoDiario + totalAluguelDia;

    const alugadosParaInquilino = player.inventario?.imoveis?.filter(im => im.alugadoParaInquilino) || [];
    const totalGanhoAluguelDia = alugadosParaInquilino.reduce((sum, im) => sum + Math.round((im.rendimentoAluguel || 0) / 30), 0);

    // Dormir: decai necessdades do dia, restaura sono
    needSystemRef.current.decay(24, player.godMode);
    needSystemRef.current.setNeed('sleep', 100);
    setNeeds(needSystemRef.current.getNeeds());
    // Simula 1 dia de vida dos NPCs
    setContatosNPCs(prev => simularVidaNPCs(prev, 1, mundo, player));
    setPlayer(prev => {
      let novosDadosReprod = prev.dadosReproductivos;
      if (novosDadosReprod) {
        novosDadosReprod = avancarGravidez({ ...novosDadosReprod }, 1, prev.genero);
        if (novosDadosReprod.mensagem) {
          alert(novosDadosReprod.mensagem);
          delete novosDadosReprod.mensagem;
        }
      }
      const novosNegocios = processarRendimentoNegocios(prev.negocios, 1);
      return { 
        ...prev, 
        dia: prev.dia + 1, 
        hora: 8, 
        dinheiro: prev.godMode ? prev.dinheiro + totalGanhoAluguelDia : prev.dinheiro - custoTotal + totalGanhoAluguelDia, 
        energia: 100, trabalhouHoje: false, treinosHoje: 0,
        poupanca: prev.poupanca ? Math.round(prev.poupanca * 1.005) : 0,
        dadosReproductivos: novosDadosReprod,
        negocios: novosNegocios
      };
    });
    alert('Um novo dia começou!');
  };

  const renderTelaAtual = () => {
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
    if (telaAtual === "criadorCidade") return <CriadorCidade mundo={mundo} setMundo={setMundo} t={t} setTelaAtual={setTelaAtual} />;

    if (telaAtual === "quarto") return <Quarto player={player} setPlayer={setPlayer} mundo={mundo} t={t} salvarJogo={salvarJogo} dormir={dormir} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} needs={needs} setNeeds={setNeeds} needSystemRef={needSystemRef} />;
    if (telaAtual === "mapa") return <Mapa player={player} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} setHotelCategoria={setHotelCategoria} />;
    if (telaAtual === "agenciaEmprego") return <Agencia player={player} setPlayer={setPlayer} mundo={mundo} t={t} profissoes={profissoes} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
    if (telaAtual === "aeroporto") return <Aeroporto player={player} setPlayer={setPlayer} mundo={mundo} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
    if (telaAtual === "lojaVeiculos") return <LojaVeiculos player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} />;
    if (telaAtual === "imobiliaria") return <Imobiliaria player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} mundo={mundo} />;
    if (telaAtual === "distritoComercial") return <DistritoComercial player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} avancarTempo={avancarTempo} />;
    if (telaAtual === "distritoNoturno") return <DistritoNoturno player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} avancarTempo={avancarTempo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} mundo={mundo} />;
    if (telaAtual === "motel") return <Motel player={player} setPlayer={setPlayer} mundo={mundo} npc={parceiroMotel} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} categoriaHotel={hotelCategoria} setParceiroMotel={setParceiroMotel} setContatosNPCs={setContatosNPCs} />;
    if (telaAtual === "hotelSelector") return (
      <HotelSelector 
        player={player} 
        setPlayer={setPlayer}
        setTelaAtual={setTelaAtual}
        setParceiroMotel={setParceiroMotel}
        setHotelCategoria={setHotelCategoria}
        npc={parceiroMotel}
      />
    );
    if (telaAtual === "loja") return <Loja player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} />;
    if (telaAtual === "contraceptivoDialog") return <ContraceptivoDialog player={player} setPlayer={setPlayer} npc={parceiroMotel} setTelaAtual={setTelaAtual} />;
    if (telaAtual === "lojaRoupas") return <LojaRoupas player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} mundo={mundo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
    if (telaAtual === "prefeitura") return <Prefeitura player={player} setPlayer={setPlayer} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} mundo={mundo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
    if (telaAtual === "academia") return <Academia player={player} setPlayer={setPlayer} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
    if (telaAtual === "centroComercial") return <CentroComercial player={player} setPlayer={setPlayer} mundo={mundo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} />;
    if (telaAtual === "celular") return <Celular player={player} setPlayer={setPlayer} mundo={mundo} t={t} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} setParceiroMotel={setParceiroMotel} needs={needs} setNeeds={setNeeds} needSystemRef={needSystemRef} />;
    if (telaAtual === "trabalho") return <Trabalho player={player} setPlayer={setPlayer} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
    if (telaAtual === "restaurante") return <Restaurante player={player} setPlayer={setPlayer} mundo={mundo} t={t} avancarTempo={avancarTempo} setTelaAtual={setTelaAtual} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} />;
    if (telaAtual === "banco") return <Banco player={player} setPlayer={setPlayer} setTelaAtual={setTelaAtual} avancarTempo={avancarTempo} />;
    return null;
  };

  const isMenuMode = ["menuPrincipal", "start", "distribuirAtributos", "criadorCidade"].includes(telaAtual);

  return (
    <div className="App">
      {!isMenuMode && (
        <HUD 
          player={player} 
          mundo={mundo} 
          t={t} 
          needs={needs} 
          telaAtual={telaAtual} 
          abrirFecharCelular={() => {
            if (telaAtual === "celular") {
              setTelaAtual(lastScreen);
            } else {
              setLastScreen(telaAtual);
              setTelaAtual("celular");
            }
          }}
        />
      )}
      {renderTelaAtual()}
    </div>
  );
}

export default App;