import React, { useState } from 'react';
import Avatar from '../componentes/Avatar';

export default function Motel({ player, setPlayer, mundo, npc, avancarTempo, setTelaAtual }) {
  const [fase, setFase] = useState("preliminares"); // preliminares, acao, climax, pos
  const [excitacaoPlayer, setExcitacaoPlayer] = useState(20);
  const [excitacaoNPC, setExcitacaoNPC] = useState(npc?.libido || 30);
  const [log, setLog] = useState(["Você fechou a porta da suíte master. O clima está fervendo."]);

  if (!npc) {
    return <div className="container"><div className="card"><button onClick={() => setTelaAtual("mapa")}>Voltar</button></div></div>;
  }

  const executarTurno = (acao) => {
    let addPlayer = 0;
    let addNPC = 0;
    let txt = "";

    if (acao === "beijar") {
      addPlayer = 15 + Math.floor(player.carisma / 10);
      addNPC = 20 + Math.floor(npc.sensibilidade / 10);
      txt = `Você puxou ${npc.nome} pela cintura e encaixou um beijo ardente e profundo.`;
    } 
    else if (acao === "despir") {
      addPlayer = 20; addNPC = 25;
      txt = `As roupas caem no chão. Você admira o corpo de ${npc.nome} (${npc.genero === 'Mulher' ? `${npc.seios_cm}cm de seios` : `${npc.penis_cm}cm de dotação`}).`;
      setFase("acao");
    }
    else if (acao === "estimular") {
      addPlayer = 25;
      addNPC = 30 + Math.floor(player.forca / 10);
      txt = `Você estimula as zonas mais sensíveis do parceiro, arrancando gemidos ecoando pela suíte.`;
    }
    const nPlayer = Math.min(100, excitacaoPlayer + addPlayer);
    const nNPC = Math.min(100, excitacaoNPC + addNPC);

    setExcitacaoPlayer(nPlayer);
    setExcitacaoNPC(nNPC);
    setLog(prev => [txt, ...prev]);

    if (nPlayer >= 100 || nNPC >= 100) {
      setFase("climax");
    }
  };

  const gozar = () => {
    avancarTempo(2, 40); // Consome 2 horas e 40 estamina
    setFase("pos");
    setLog(prev => ["✨ O ápice chega como uma explosão. Uma onda de espasmos e prazer absoluto toma conta de ambos na cama desarrumada.", ...prev]);
  };

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#090514', color: '#fff', borderColor: '#d946ef' }}>
        <h1 style={{ color: '#d946ef', textShadow: '0 0 10px #d946ef' }}>🏩 Suíte Suave - Neon Motel</h1>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
          <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#ececec', borderRadius: '10px', height: '300px', overflow: 'hidden' }}>
             <Avatar player={npc} mundo={mundo} />
          </div>

          <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3>Parceiro: {npc.nome}</h3>
            
            {/* Barras de Excitação */}
            <div>
              <label>🔥 Sua Excitação: {excitacaoPlayer}%</label>
              <div style={{ width: '100%', backgroundColor: '#221e2f', height: '15px', borderRadius: '5px', overflow: 'hidden', marginTop: '5px' }}>
                <div style={{ width: `${excitacaoPlayer}%`, backgroundColor: '#d946ef', height: '100%', transition: '0.3s' }}></div>
              </div>
            </div>

            <div>
              <label>💓 Excitação de {npc.nome}: {excitacaoNPC}%</label>
              <div style={{ width: '100%', backgroundColor: '#221e2f', height: '15px', borderRadius: '5px', overflow: 'hidden', marginTop: '5px' }}>
                <div style={{ width: `${excitacaoNPC}%`, backgroundColor: '#ec4899', height: '100%', transition: '0.3s' }}></div>
              </div>
            </div>

            {/* Painel Interativo de Comandos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
              {fase === "preliminares" && (
                <>
                  <button onClick={() => executarTurno("beijar")} style={btnM}>💋 Beijo Ardente</button>
                  <button onClick={() => executarTurno("despir")} style={{ ...btnM, backgroundColor: '#d946ef' }}>👙 Remover Roupas</button>
                </>
              )}
              {fase === "acao" && (
                <>
                  <button onClick={() => executarTurno("estimular")} style={btnM}>👅 Estimular Cama</button>
                  <button onClick={() => executarTurno("beijar")} style={btnM}>🍒 Provocar</button>
                </>
              )}
              {fase === "climax" && (
                <button onClick={gozar} style={{ ...btnM, gridColumn: '1/3', backgroundColor: '#e11d48', animation: 'pulse 1s infinite' }}>💥 ATINGIR O CLÍMAX MULTIPLO</button>
              )}
              {fase === "pos" && (
                <button onClick={() => setTelaAtual("mapa")} style={{ ...btnM, gridColumn: '1/3', backgroundColor: '#475569' }}>🚶 Vestir-se e Sair</button>
              )}
            </div>
          </div>
        </div>

        {/* Console de Relatos Históricos */}
        <div style={{ marginTop: '20px', backgroundColor: '#130d24', border: '1px solid #3b0764', padding: '15px', borderRadius: '8px', height: '100px', overflowY: 'auto', fontSize: '13px', color: '#f472b6' }}>
          {log.map((l, idx) => <p key={idx} style={{ margin: '0 0 5px 0' }}>{l}</p>)}
        </div>
      </div>
    </div>
  );
}
const btnM = { backgroundColor: '#2e1065', border: 'none', color: '#fff', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };