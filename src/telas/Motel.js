import React, { useState } from 'react';
import Avatar from '../componentes/Avatar';
import { calcularModificadorFetiche } from '../utils/fetchesSystem';
import { calcularGravidez, tiposContraceptivos } from '../utils/reproductionSystem';
import { obterBonusIntimacao } from '../utils/hotelSystem';

export default function Motel({ player, setPlayer, mundo, npc, avancarTempo, setTelaAtual, categoriaHotel = "3" }) {
  const [fase, setFase] = useState("preliminares");
  const [excitacaoPlayer, setExcitacaoPlayer] = useState(15);
  const [excitacaoNPC, setExcitacaoNPC] = useState(npc?.libido || 25);
  const [estaminaIntima, setEstaminaIntima] = useState(100);
  const [log, setLog] = useState(["Você trancou a porta. O quarto respira sensualidade com luzes em neon."].concat(
    npc?.fetiches?.length > 0 ? [`💕 ${npc.nome} possui fetiches: ${npc.fetiches.map(f => f.nome).join(", ")}`] : []
  ));
  const contraceptivoUsoAtual = player.dadosReproductivos?.contraceptivoAtivo || "camisinha";
  const [querSair, setQuerSair] = useState(false);
  const bonusIntimacao = obterBonusIntimacao(categoriaHotel);

  if (!npc) {
    return <div className="container"><div className="card"><button onClick={() => setTelaAtual("mapa")}>Voltar</button></div></div>;
  }

  const executarAcaoSexual = (acao) => {
    if (estaminaIntima <= 0) {
      setLog(prev => ["❌ Você está fisicamente esgotado para continuar. É hora de terminar.", ...prev]);
      setQuerSair(true);
      return;
    }

    if (querSair) {
      setLog(prev => ["🚶 Alguém quer terminar. Vocês precisam se despedir.", ...prev]);
      return;
    }

    let ganhoPlayer = 0;
    let ganhoNPC = 0;
    let custoEstamina = 10;
    let textoAcao = "";
    let tipoAcao = "generico";

    const modificadorPericia = Math.max(0.5, (player.periciaSexual || 15) / 40);
    const sensitividadeNpc = (npc.sensibilidade || 50) / 50;
    const modificadorFetiche = calcularModificadorFetiche(npc, tipoAcao, acao);

    switch (acao) {
      // === FASE 1: PRELIMINARES ===
      case "beijo":
        ganhoPlayer = 10;
        ganhoNPC = Math.floor((15 + (player.carisma / 8)) * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao;
        custoEstamina = 5;
        tipoAcao = "preliminar";
        textoAcao = `Você pressiona ${npc.nome} contra a parede, encaixando um beijo úmido e voraz que faz seus corações acelerarem.`;
        break;

      case "massagem_corpo":
        ganhoPlayer = 8;
        ganhoNPC = Math.floor((12 + (player.carisma / 10)) * sensitividadeNpc * modificadorFetiche) + bonusIntimacao;
        custoEstamina = 6;
        tipoAcao = "preliminar";
        textoAcao = `Você desliza as mãos pelo corpo de ${npc.nome}, massageando sensualmente cada curva e músculo.`;
        break;

      case "despir":
        ganhoPlayer = 15;
        ganhoNPC = 10;
        custoEstamina = 2;
        tipoAcao = "preliminar";
        textoAcao = `As roupas vão para o chão. Você admira completamente ${npc.nome} exposto(a) à sua frente.`;
        if (npc.virgem) {
          setLog(prev => [`✨ ${npc.nome} está perdendo sua virgindade com você...`, ...prev]);
          npc.virgem = false;
        }
        setFase("oral");
        break;

      case "massagem_seios":
        ganhoPlayer = 12;
        ganhoNPC = Math.floor((18 + (player.reflexo / 12)) * sensitividadeNpc * modificadorFetiche) + bonusIntimacao;
        custoEstamina = 8;
        tipoAcao = "corporal";
        textoAcao = `Você massageia gentilmente os seios de ${npc.nome}, fazendo círculos com os dedos enquanto beija seu pescoço.`;
        break;

      // === FASE 2: SEXO ORAL ===
      case "oral_enviado":
        ganhoPlayer = 5;
        ganhoNPC = Math.floor((25 + (player.resistencia / 10)) * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao;
        custoEstamina = 12;
        tipoAcao = "oral";
        textoAcao = `Você se ajoelha e foca inteiramente em dar prazer oral para ${npc.nome}, dominando o ritmo com maestria e sensibilidade.`;
        break;

      case "oral_recebido":
        ganhoPlayer = 30;
        ganhoNPC = 12;
        custoEstamina = 5;
        tipoAcao = "oral";
        textoAcao = `${npc.nome} retribui com entusiasmo, trabalhando com os lábios e língua de forma calorosa que faz seus quadris tremularem.`;
        break;

      case "mutuos_oral":
        ganhoPlayer = 20;
        ganhoNPC = 22;
        custoEstamina = 14;
        tipoAcao = "oral";
        textoAcao = `Vocês se posicionam um sobre o outro em 69, estimulando simultaneamente em um ritmo perfeito de prazer mútuo.`;
        break;

      case "ir_penetracao":
        setFase("penetracao");
        custoEstamina = 0;
        textoAcao = "O clima atinge o ponto de não retorno. Vocês se movem para o colchão, prontos para as posições mais intensas.";
        break;

      // === FASE 3: PENETRAÇÃO VAGINAL ===
      case "missionario":
        ganhoPlayer = 20;
        ganhoNPC = Math.floor((20 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 15;
        tipoAcao = "penetracao";
        textoAcao = `Na posição do missionário, você mantém contato visual firme enquanto dita um ritmo cadenciado e profundo. ${npc.nome} geme seu nome.`;
        break;

      case "de_quatro":
        ganhoPlayer = 25;
        ganhoNPC = Math.floor(((30 + (player.forca / 12)) * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 20;
        tipoAcao = "penetracao";
        textoAcao = `Você posiciona ${npc.nome} de quatro, aplicando estocadas intensas e vigorosas com dominação controlada.`;
        break;

      case "por_cima":
        ganhoPlayer = 15;
        ganhoNPC = Math.floor((25 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 10;
        tipoAcao = "penetracao";
        textoAcao = `${npc.nome} monta por cima de você, controlando a descida e rebolando com força total, capturando o controle do ritmo.`;
        break;

      case "cavaleira_reversa":
        ganhoPlayer = 18;
        ganhoNPC = Math.floor((22 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 12;
        tipoAcao = "penetracao";
        textoAcao = `${npc.nome} monta de costas, oferecendo uma vista espetacular enquanto se move sensuosamente para frente e para trás.`;
        break;

      case "parede":
        ganhoPlayer = 22;
        ganhoNPC = Math.floor((24 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 18;
        tipoAcao = "penetracao";
        textoAcao = `Você empurra ${npc.nome} contra a parede, levantando-o(a) enquanto se move com força e paixão incontrolável.`;
        break;

      case "sentado":
        ganhoPlayer = 16;
        ganhoNPC = Math.floor((18 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 9;
        tipoAcao = "penetracao";
        textoAcao = `Você senta na cama e ${npc.nome} se senta em seu colo, gerando um ritmo lento mas profundo e íntimo.`;
        break;

      // === FASE 3B: PENETRAÇÃO ANAL ===
      case "anal_inicio":
        ganhoPlayer = 12;
        ganhoNPC = Math.floor((8 + (player.carisma / 15)) * sensitividadeNpc * modificadorFetiche);
        custoEstamina = 8;
        tipoAcao = "preparo_anal";
        textoAcao = `Você estimula lentamente a entrada anal de ${npc.nome}, preparando-o(a) com paciência e lubrificante. ${npc.nome} relaxa gradualmente.`;
        setLog(prev => [`⚠️ Anal é mais sensível. Comece devagar e aumente progressivamente.`, ...prev]);
        break;

      case "anal":
        ganhoPlayer = 28;
        ganhoNPC = Math.floor((32 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 22;
        tipoAcao = "penetracao_anal";
        textoAcao = `Você penetra lentamente o ânus de ${npc.nome}, começando devagar e aumentando o ritmo conforme ambos se sincronizam em prazer intenso.`;
        break;

      case "anal_de_quatro":
        ganhoPlayer = 30;
        ganhoNPC = Math.floor((35 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 24;
        tipoAcao = "penetracao_anal";
        textoAcao = `${npc.nome} fica de quatro enquanto você penetra analmente com ritmo profundo, gerando espasmos incontroláveis de prazer.`;
        break;

      case "anal_reverso":
        ganhoPlayer = 26;
        ganhoNPC = Math.floor((28 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 20;
        tipoAcao = "penetracao_anal";
        textoAcao = `${npc.nome} senta de costas enquanto penetra analmente, gerando uma sensação dupla de controle e submissão.`;
        break;

      case "anal_parede":
        ganhoPlayer = 32;
        ganhoNPC = Math.floor((30 * sensitividadeNpc * modificadorPericia * modificadorFetiche) + bonusIntimacao);
        custoEstamina = 26;
        tipoAcao = "penetracao_anal";
        textoAcao = `Você empurra ${npc.nome} contra a parede penetrando analmente com estocadas profundas e ritmadas que deixam ambos ofegantes.`;
        break;

      // === OUTROS ===
      case "footjob":
        ganhoPlayer = 20;
        ganhoNPC = 5;
        custoEstamina = 10;
        tipoAcao = "fetiche";
        textoAcao = `${npc.nome} usa os pés de forma experiente, gerando estimulação ousada e criativa com os dedos e sola dos pés.`;
        break;

      case "ir_climax":
        setFase("climax");
        custoEstamina = 0;
        textoAcao = "Ambos sentem o clímax se aproximando inevitavelmente...";
        break;

      default:
        break;
    }

    // Aplica os cálculos de estado
    const novoPlayer = Math.min(100, excitacaoPlayer + ganhoPlayer);
    const novoNPC = Math.min(100, excitacaoNPC + ganhoNPC);

    setExcitacaoPlayer(novoPlayer);
    setExcitacaoNPC(novoNPC);
    setEstaminaIntima(e => Math.max(0, e - custoEstamina));
    setLog(prev => [textoAcao, ...prev]);

    // Ganho de experiência
    if (Math.random() < 0.3) {
      setPlayer(p => ({ ...p, periciaSexual: Math.min(100, (p.periciaSexual || 15) + 1) }));
    }

    // Transição automática para clímax se ambos no máximo
    if (novoPlayer >= 100 && novoNPC >= 100) {
      setFase("climax");
    }

    // Se estamina zerou, forçar encerramento
    if (estaminaIntima - custoEstamina <= 0) {
      setQuerSair(true);
      setLog(prev => ["🛑 A energia se esgotou. É hora de terminar essa sessão.", ...prev]);
    }
  };

  const atingirClimax = () => {
    // Verificar gravidez (APENAS para mulheres em penetração vaginal)
    let gravidezOcorreu = false;
    if (player.genero === "Mulher" && player.dadosReproductivos) {
      if (calcularGravidez(contraceptivoUsoAtual)) {
        gravidezOcorreu = true;
        setPlayer(p => ({
          ...p,
          dadosReproductivos: {
            ...p.dadosReproductivos,
            statusGravidez: 1,
            semanasGravidez: 1
          }
        }));
      }
    }

    avancarTempo(2, 40);

    const ganhoXP = Math.floor(Math.random() * 5) + 3;
    setPlayer(p => ({
      ...p,
      periciaSexual: Math.min(100, (p.periciaSexual || 15) + ganhoXP)
    }));

    setFase("pos");
    const msgGravidez = gravidezOcorreu 
      ? ` 🤰 AVISO: Você pode estar grávida (${tiposContraceptivos[contraceptivoUsoAtual]?.nome} teve ${Math.round((1 - tiposContraceptivos[contraceptivoUsoAtual]?.riscoPrenhez) * 100)}% de eficácia)!`
      : "";

    setLog(prev => [
      `✨ CLÍMAX AVASSALADOR! O quarto é tomado por arrepios e espasmos sincronizados enquanto ambos atingem o pico simultâneo. (Perícia +${ganhoXP}!)${msgGravidez}`,
      ...prev
    ]);
  };

  const encerrarSessao = () => {
    setTelaAtual("mapa");
  };

  const pedirContinuacao = () => {
    if (excitacaoNPC >= 75) {
      setLog(prev => [`${npc.nome}: "Tudo bem, vamos continuar..."`, ...prev]);
      setQuerSair(false);
      // Reset para continuar - volta para fase de penetração e reduz excitação um pouco
      setFase("penetracao");
      setExcitacaoPlayer(Math.max(50, excitacaoPlayer - 20));
      setExcitacaoNPC(Math.max(50, excitacaoNPC - 20));
    } else {
      setLog(prev => [`${npc.nome}: "Não, acho que é melhor terminarmos aqui."`, ...prev]);
      setQuerSair(true);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{
        backgroundColor: '#090514', color: '#fff', borderColor: '#d946ef',
        boxShadow: '0 0 20px rgba(217, 70, 239, 0.2)'
      }}>
        <h1 style={{ color: '#d946ef', textShadow: '0 0 10px #d946ef', textAlign: 'center' }}>
          🏩 {npc.nome} - Suíte Privé {categoriaHotel}⭐
        </h1>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
          {/* PAINEL VISUAL */}
          <div style={{ flex: 1, minWidth: '220px', backgroundColor: '#ececec', borderRadius: '10px', height: '320px', overflow: 'hidden' }}>
            <Avatar player={npc} mundo={mundo} />
          </div>

          {/* PAINEL TÉCNICO */}
          <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>
              {npc.nome} <span style={{ color: '#fb7185' }}>({npc.genero})</span>
            </h3>

            {npc.fetiches && npc.fetiches.length > 0 && (
              <div style={{ fontSize: '11px', color: '#ec4899', backgroundColor: '#1a0e2e', padding: '6px', borderRadius: '4px' }}>
                💕 Fetiches: {npc.fetiches.map(f => f.nome).join(", ")}
              </div>
            )}

            {npc.virgem && (
              <div style={{ fontSize: '11px', color: '#fbbf24', backgroundColor: '#1a1a0a', padding: '6px', borderRadius: '4px' }}>
                ✨ Virgem - Esta será sua primeira vez
              </div>
            )}

            <div style={{ fontSize: '11px', color: '#a21caf' }}>
              ✨ Sua Perícia Sexual: {player.periciaSexual || 15}/100
            </div>

            <div style={{ fontSize: '11px', color: '#34d399' }}>
              🏋️ Estamina: <span style={{ fontWeight: 'bold' }}>{estaminaIntima}%</span>
            </div>

            {/* Contraceptivo */}
            <div style={{ fontSize: '11px', color: '#60a5fa' }}>
              🛡️ Proteção: {tiposContraceptivos[contraceptivoUsoAtual]?.nome}
            </div>

            {/* Barra Excitação Player */}
            <div>
              <label style={{ fontSize: '11px' }}>🔥 Sua: {excitacaoPlayer}%</label>
              <div style={{ width: '100%', backgroundColor: '#221e2f', height: '10px', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${excitacaoPlayer}%`, backgroundColor: '#d946ef', height: '100%', transition: '0.3s' }} />
              </div>
            </div>

            {/* Barra Excitação NPC */}
            <div>
              <label style={{ fontSize: '11px' }}>💓 {npc.nome}: {excitacaoNPC}%</label>
              <div style={{ width: '100%', backgroundColor: '#221e2f', height: '10px', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${excitacaoNPC}%`, backgroundColor: '#ec4899', height: '100%', transition: '0.3s' }} />
              </div>
            </div>

            {/* BOTÕES DE AÇÃO DINÂMICOS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '10px' }}>
              {/* PRELIMINARES */}
              {fase === "preliminares" && (
                <>
                  <button onClick={() => executarAcaoSexual("beijo")} style={btnStyle}>💋 Beijo</button>
                  <button onClick={() => executarAcaoSexual("massagem_corpo")} style={btnStyle}>🤲 Massagem</button>
                  <button onClick={() => executarAcaoSexual("massagem_seios")} style={btnStyle}>🍒 Seios</button>
                  <button onClick={() => executarAcaoSexual("despir")} style={{ ...btnStyle, backgroundColor: '#d946ef' }}>👙 Despir</button>
                </>
              )}

              {/* ORAL */}
              {fase === "oral" && (
                <>
                  <button onClick={() => executarAcaoSexual("oral_enviado")} style={btnStyle}>👅 Dar Oral</button>
                  <button onClick={() => executarAcaoSexual("oral_recebido")} style={btnStyle}>😮 Receber</button>
                  <button onClick={() => executarAcaoSexual("mutuos_oral")} style={btnStyle}>🔄 Mútuo 69</button>
                  <button onClick={() => executarAcaoSexual("ir_penetracao")} style={{ ...btnStyle, backgroundColor: '#be185d', gridColumn: '1/3' }}>🍆 Penetração</button>
                </>
              )}

              {/* PENETRAÇÃO VAGINAL */}
              {fase === "penetracao" && (
                <>
                  <button onClick={() => executarAcaoSexual("missionario")} style={btnStyle}>🛏️ Missionário</button>
                  <button onClick={() => executarAcaoSexual("de_quatro")} style={btnStyle}>🐕 De Quatro</button>
                  <button onClick={() => executarAcaoSexual("por_cima")} style={btnStyle}>🐎 Por Cima</button>
                  <button onClick={() => executarAcaoSexual("cavaleira_reversa")} style={btnStyle}>🔄 Cavaleira</button>
                  <button onClick={() => executarAcaoSexual("parede")} style={btnStyle}>🧱 Parede</button>
                  <button onClick={() => executarAcaoSexual("sentado")} style={btnStyle}>🪑 Sentado</button>
                  <button onClick={() => executarAcaoSexual("anal_inicio")} style={{ ...btnStyle, backgroundColor: '#8b5cf6' }}>🌶️ Anal</button>
                  <button onClick={() => executarAcaoSexual("ir_climax")} style={{ ...btnStyle, backgroundColor: '#e11d48', gridColumn: '1/3' }}>💥 Para o Clímax</button>
                </>
              )}

              {/* ANAL */}
              {fase === "penetracao" && estaminaIntima > 20 && (
                <>
                  <button onClick={() => executarAcaoSexual("anal")} style={{ ...btnStyle, backgroundColor: '#7c3aed' }}>💜 Anal</button>
                  <button onClick={() => executarAcaoSexual("anal_de_quatro")} style={{ ...btnStyle, backgroundColor: '#7c3aed' }}>🍑 Anal 4</button>
                  <button onClick={() => executarAcaoSexual("anal_parede")} style={{ ...btnStyle, backgroundColor: '#7c3aed' }}>🧱 Anal +</button>
                </>
              )}

              {/* CLÍMAX */}
              {fase === "climax" && (
                <button onClick={atingirClimax} style={{ ...btnStyle, gridColumn: '1/3', backgroundColor: '#e11d48', fontSize: '13px', fontWeight: 'black' }}>
                  💥 ATINGIR O CLÍMAX 💥
                </button>
              )}

              {/* PÓS-CLÍMAX */}
              {fase === "pos" && (
                <>
                  {!querSair && (
                    <button onClick={pedirContinuacao} style={{ ...btnStyle, backgroundColor: '#0891b2' }}>🔄 Continuar?</button>
                  )}
                  <button onClick={encerrarSessao} style={{ ...btnStyle, gridColumn: querSair ? '1/3' : 'auto', backgroundColor: '#475569' }}>
                    🚶 Ir Embora
                  </button>
                </>
              )}

              {/* MENSAGEM DE FIM DE ESTAMINA */}
              {querSair && fase !== "pos" && (
                <button onClick={encerrarSessao} style={{ ...btnStyle, gridColumn: '1/3', backgroundColor: '#dc2626' }}>
                  ⚠️ Terminar Encontro
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LOG NARRATIVO */}
        <div style={{
          marginTop: '15px', backgroundColor: '#130d24', border: '1px solid #4a044e',
          padding: '10px', borderRadius: '8px', height: '100px', overflowY: 'auto',
          fontSize: '12px', color: '#f472b6', lineHeight: '1.3'
        }}>
          {log.slice(0, 10).map((line, idx) => (
            <p key={idx} style={{ margin: '0 0 4px 0', borderBottom: idx === 0 ? '1px dashed #4a044e' : 'none', paddingBottom: idx === 0 ? '2px' : 0 }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  backgroundColor: '#2e1065',
  border: 'none',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '11px',
  transition: '0.2s',
  ':hover': { opacity: 0.8 }
};