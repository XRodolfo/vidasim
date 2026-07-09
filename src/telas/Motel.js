import React, { useState } from 'react';
import Avatar from '../componentes/Avatar';

export default function Motel({ player, setPlayer, mundo, npc, contatosNPCs, setContatosNPCs, setTelaAtual, avancarTempo }) {
  const [prazerNPC, setPrazerNPC] = useState(0);
  const [orgasmos, setOrgasmos] = useState(0);
  const [logAcoes, setLogAcoes] = useState([`Você e ${npc.nome} entram no quarto. O clima está quente...`]);
  const [eventoFinalizado, setEventoFinalizado] = useState(false);

  // Atributos sexuais padrão caso o NPC seja antigo
  const npcAtivo = { 
    ...npc, 
    libido: npc.libido || 50, 
    sensibilidade: npc.sensibilidade || 50 
  };

  const realizarAcao = (tipo) => {
    if (!player.godMode && player.energia < 10) {
      setLogAcoes(["⚠️ Exausto! Precisa finalizar.", ...logAcoes]);
      return;
    }
    if (!player.godMode) setPlayer(prev => ({ ...prev, energia: prev.energia - 10 }));

    let ganhoPrazer = 0;
    let mensagem = "";

    // Lógica de Performance baseada em atributos
    if (tipo === "preliminares") {
      ganhoPrazer = 10 + (player.carisma * 0.1) + (npcAtivo.sensibilidade * 0.15);
      mensagem = `Você beija e acaricia ${npc.nome}.`;
    } else if (tipo === "oral") {
      ganhoPrazer = 15 + (player.inteligencia * 0.2);
      mensagem = `Você usa a técnica... ${npc.nome} reage intensamente.`;
    } else if (tipo === "principal") {
      let bonusFisico = player.genero === "Homem" 
        ? (player.penis === "Grande" ? 15 : player.penis === "Extraordinário" ? 30 : 5)
        : (player.seios === "Fartos" || player.bunda === "Grande" ? 25 : 10);
      ganhoPrazer = 10 + (player.forca * 0.1) + (player.resistencia * 0.15) + (bonusFisico * 0.5) + (npcAtivo.libido * 0.1);
      mensagem = `O ritmo acelera!`;
    }

    let novoPrazer = prazerNPC + ganhoPrazer;
    if (novoPrazer >= 100) {
      mensagem += ` 🔥 CLÍMAX! ${npc.nome} atinge o orgasmo!`;
      novoPrazer -= 100;
      setOrgasmos(orgasmos + 1);
    }

    setPrazerNPC(novoPrazer);
    setLogAcoes([mensagem, ...logAcoes]);
  };

  const finalizarEncontro = () => {
    if (!avancarTempo(3, 10)) { setTelaAtual("quarto"); return; }
    const ganhoAfeto = orgasmos === 0 ? -10 : orgasmos * 20;
    const npcsAtualizados = contatosNPCs.map(n => n.id === npc.id ? { ...n, afeto: Math.min(100, n.afeto + ganhoAfeto) } : n);
    setContatosNPCs(npcsAtualizados);
    setEventoFinalizado(true);
  };

  if (eventoFinalizado) return (
    <div className="container">
      <div className="card">
        <h2>Noite Concluída</h2>
        <p>Orgasmos: {orgasmos}</p>
        <button onClick={() => setTelaAtual("quarto")}>Retornar</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="card">
        <h2>{npc.nome}</h2>
        <div style={{height: '25px', backgroundColor: '#333', borderRadius: '12px', overflow: 'hidden'}}>
          <div style={{width: `${Math.min(100, prazerNPC)}%`, backgroundColor: '#ec4899', height: '100%'}}></div>
        </div>
        <div style={{height: '150px', overflowY: 'auto', background: '#000', padding: '10px', marginTop: '10px'}}>
          {logAcoes.map((m, i) => <div key={i}>{m}</div>)}
        </div>
        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <button onClick={() => realizarAcao("preliminares")}>👄</button>
          <button onClick={() => realizarAcao("oral")}>👅</button>
          <button onClick={() => realizarAcao("principal")}>🔥</button>
        </div>
        <button onClick={finalizarEncontro} style={{marginTop: '10px'}}>Finalizar</button>
      </div>
    </div>
  );
}