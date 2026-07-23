import React, { useState, useEffect, useMemo } from 'react';
import Avatar from '../componentes/Avatar';
import { obterComotos, executarAtividade, calcularCorQualidade } from '../utils/casasSystem';

export default function Quarto({ player, setPlayer, mundo, t, salvarJogo, dormir, avancarTempo, setTelaAtual, contatosNPCs = [], setContatosNPCs, needs, setNeeds, needSystemRef }) {
  const imovelAtual = useMemo(() => {
    return player.inventario?.imoveis?.find(im => im.id === player.casa?.id && im.cidade === player.cidade_id)
           || player.inventario?.imoveis?.find(im => im.cidade === player.cidade_id)
           || { tipo: "apartamento_simples", nome: "Albergue Municipal (Hostel)", qualidade: 1, cidade: player.cidade_id };
  }, [player.inventario?.imoveis, player.casa, player.cidade_id]);
  const [comodoAtual, setComodoAtual] = useState(null);
  const [msgDomestica, setMsgDomestica] = useState("");
  const comodosDisponiveis = obterComotos(imovelAtual.tipo);

  const moradoresCasa = contatosNPCs.filter(npc => npc.mora_junto === true);

  useEffect(() => {
    if (!comodoAtual || !comodosDisponiveis.some(c => c.id === comodoAtual.id)) {
      setComodoAtual(comodosDisponiveis[0]);
    }
  }, [imovelAtual, comodosDisponiveis, comodoAtual]);

  const handleExecutarAtividade = (atividade) => {
    // Callback que aplica deltas de necessidades via o sistema de necessidades
    const onNeedsEffect = (needsEffect) => {
      if (!needSystemRef?.current || !setNeeds) return;
      // Se godMode, "set" direto para 100 em vez de somar delta
      if (player.godMode) {
        needSystemRef.current.fillAll();
      } else {
        needSystemRef.current.applyEffects(needsEffect);
      }
      setNeeds(needSystemRef.current.getNeeds());
    };
    executarAtividade(atividade, player, setPlayer, dormir, avancarTempo, onNeedsEffect);
  };

  const interagirMorador = (npc, acao) => {
    if (acao === "conversar") {
      setMsgDomestica(`💬 Conversas animadamente com ${npc.nome}. (+5% Afeto)`);
      if (setContatosNPCs) setContatosNPCs(prev => prev.map(c => c.id === npc.id ? { ...c, afeto: Math.min(100, (c.afeto || 50) + 5) } : c));
    } else if (acao === "intimidade") {
      if ((player.energia || 100) < 20) { alert("Estás exausto demais!"); return; }
      setPlayer(prev => ({ ...prev, energia: prev.energia - 20, felicidade: Math.min(100, (prev.felicidade || 50) + 25) }));
      setMsgDomestica(`🔥 Partilhaste um momento íntimo intenso com ${npc.nome} no conforto do lar! (+25 Felicidade)`);
    }
  };

  const corQualidade = calcularCorQualidade(imovelAtual.qualidade || 1);

  return (
    <div className="container">
      <div className="card" style={{ marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{imovelAtual.nome} - {comodoAtual?.nome || 'Carregando...'}</h2>
          <button onClick={salvarJogo} style={{ backgroundColor: '#28a745', padding: '8px 15px', borderRadius: '4px', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>💾 Salvar Progresso</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', margin: '15px 0', flexWrap: 'wrap' }}>
          {comodosDisponiveis.map(comodo => (
            <button key={comodo.id} onClick={() => { setComodoAtual(comodo); setMsgDomestica(""); }} style={{ backgroundColor: comodo.id === comodoAtual?.id ? corQualidade : '#334155', padding: '10px 15px', fontSize: '14px', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              {comodo.emoji} {comodo.nome}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1.2, minWidth: '300px', backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: `1px solid ${corQualidade}` }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 15px 0' }}>{comodoAtual?.descricao}</p>

            {moradoresCasa.length > 0 && (
              <div style={{ backgroundColor: '#1e1b4b', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #6366f1' }}>
                <h4 style={{ color: '#a5b4fc', margin: '0 0 10px 0' }}>💑 Harém / Residentes da Casa</h4>
                {msgDomestica && <div style={{ fontSize: '13px', color: '#f472b6', marginBottom: '10px', fontStyle: 'italic' }}>{msgDomestica}</div>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {moradoresCasa.map(npc => (
                    <div key={npc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#312e81', padding: '8px 12px', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '14px', color: '#fff' }}>{npc.nome} <small>({npc.afeto}%)</small></strong>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => interagirMorador(npc, "conversar")} style={btnMiniDom}>💬 Falar</button>
                        <button onClick={() => interagirMorador(npc, "intimidade")} style={{ ...btnMiniDom, backgroundColor: '#ec4899' }}>🔥 Intimidade</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h4 style={{ color: '#38bdf8', margin: '15px 0 10px 0' }}>Ações:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {comodoAtual?.atividades.map(atividade => (
                <button key={atividade.id} onClick={() => handleExecutarAtividade(atividade)} style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', border: '1px solid #334155', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
                  {atividade.emoji} {atividade.nome} ({atividade.tempo}h)
                </button>
              ))}
            </div>
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px' }}><Avatar player={player} mundo={mundo} /></div>
          </div>

          <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => setTelaAtual("celular")} style={{ padding: '14px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>📱 Abrir Telemóvel</button>
            <button onClick={() => setTelaAtual("hotelSelector")} style={{ padding: '14px', backgroundColor: '#ec4899', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>🏩 Procurar Hotel/Motel</button>
            <button onClick={() => setTelaAtual("mapa")} style={{ padding: '14px', backgroundColor: '#f1c40f', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>🚪 Sair para a Cidade</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const btnMiniDom = { padding: '6px 10px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' };