import React, { useState, useEffect } from 'react';
import Avatar from '../componentes/Avatar';
import HUD from '../componentes/HUD';
import { obterComotos, executarAtividade, calcularCorQualidade } from '../utils/casasSystem';

export default function Quarto({ player = {}, setPlayer, mundo, t, salvarJogo, dormir, setTelaAtual, contatosNPCs = [], setContatosNPCs }) {
  const [imovelAtual] = useState(player.inventario?.imoveis?.[0] || { tipo: "apartamento_simples", nome: t?.quarto || "Meu Quarto" });
  const [comodoAtual, setComodoAtual] = useState(null);
  const [msgDomestica, setMsgDomestica] = useState("");
  const comodosDisponiveis = obterComotos(imovelAtual.tipo);

  // Filtra os NPCs que moram contigo (ou fazem parte do harém construído)
  const moradoresCasa = contatosNPCs.filter(npc => npc.mora_junto === true);

  useEffect(() => {
    if (!comodoAtual || !comodosDisponiveis.some(c => c.id === comodoAtual.id)) {
      setComodoAtual(comodosDisponiveis[0]);
    }
  }, [imovelAtual, comodosDisponiveis, comodoAtual]);

  const handleExecutarAtividade = (atividade) => {
    executarAtividade(atividade, player, setPlayer, dormir);
  };

  const interagirMorador = (npc, acao) => {
    if (acao === "conversar") {
      setMsgDomestica(`💬 Você senta no sofá e conversa sobre o dia com ${npc.nome}. O afeto entre vocês aumenta! (+5% Afeto)`);
      if (setContatosNPCs) {
        setContatosNPCs(prev => prev.map(c => c.id === npc.id ? { ...c, afeto: Math.min(100, (c.afeto || 50) + 5) } : c));
      }
    } else if (acao === "intimidade") {
      if ((player.energia || 100) < 20) {
        alert("Você está cansado demais para momentos íntimos agora!");
        return;
      }
      setPlayer(prev => ({ ...prev, energia: prev.energia - 20, felicidade: Math.min(100, (prev.felicidade || 50) + 25) }));
      setMsgDomestica(`🔥 Você e ${npc.nome} aproveitam a privacidade de morar juntos para um momento íntimo inesquecível! (+25 Felicidade)`);
    }
  };

  const corQualidade = calcularCorQualidade(imovelAtual.qualidade || 1);

  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{imovelAtual.nome} - {comodoAtual?.nome || 'Carregando...'}</h2>
          <button onClick={salvarJogo} style={{ backgroundColor: '#28a745', padding: '8px 15px', fontSize: '14px', borderRadius: '4px', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>💾 Salvar Jogo</button>
        </div>

        {/* NAVEGAÇÃO ENTRE CÔMODOS */}
        <div style={{ display: 'flex', gap: '8px', margin: '15px 0', flexWrap: 'wrap' }}>
          {comodosDisponiveis.map(comodo => (
            <button
              key={comodo.id}
              onClick={() => { setComodoAtual(comodo); setMsgDomestica(""); }}
              style={{
                backgroundColor: comodo.id === comodoAtual?.id ? corQualidade : '#334155',
                padding: '10px 15px', fontSize: '14px', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              {comodo.emoji} {comodo.nome}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1.2, minWidth: '300px', backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: `1px solid ${corQualidade}` }}>
            <h3 style={{ color: corQualidade, margin: '0 0 8px 0' }}>{comodoAtual?.nome || 'Detalhes'}</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 15px 0' }}>{comodoAtual?.descricao}</p>

            {/* SEÇÃO DE MORADORES / HARÉM DOMÉSTICO */}
            {moradoresCasa.length > 0 && (
              <div style={{ backgroundColor: '#1e1b4b', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #6366f1' }}>
                <h4 style={{ color: '#a5b4fc', margin: '0 0 10px 0' }}>💑 Pessoas Morando Contigo (Harém Doméstico)</h4>
                {msgDomestica && <div style={{ fontSize: '13px', color: '#f472b6', marginBottom: '10px', fontStyle: 'italic' }}>{msgDomestica}</div>}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {moradoresCasa.map(npc => (
                    <div key={npc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#312e81', padding: '8px 12px', borderRadius: '6px' }}>
                      <div>
                        <strong style={{ fontSize: '14px', color: '#fff' }}>{npc.nome}</strong> <small style={{ color: '#c7d2fe' }}>({npc.afeto}% afeto)</small>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => interagirMorador(npc, "conversar")} style={btnMiniDom}>💬 Conversar</button>
                        <button onClick={() => interagirMorador(npc, "intimidade")} style={{ ...btnMiniDom, backgroundColor: '#ec4899' }}>🔥 Intimidade</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h4 style={{ color: '#38bdf8', margin: '15px 0 10px 0' }}>Atividades em {comodoAtual?.nome}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {comodoAtual?.atividades.map(atividade => (
                <button
                  key={atividade.id}
                  onClick={() => handleExecutarAtividade(atividade)}
                  style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', border: '1px solid #334155', color: '#fff', textAlign: 'left', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  {atividade.emoji} {atividade.nome} <br/>
                  <small style={{ color: '#94a3b8', fontWeight: 'normal' }}>Duração: {atividade.tempo}h</small>
                </button>
              )) || <p style={{ color: '#aaa' }}>Nenhuma atividade disponível.</p>}
            </div>

            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px' }}>
              <Avatar player={player} mundo={mundo} />
            </div>
          </div>

          {/* PAINEL DE ATRIBUTOS E SAÍDA */}
          <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
              <h3 style={{ color: '#38bdf8', margin: '0 0 12px 0' }}>📊 Atributos Físicos</h3>
              {[
                { n: "Força", v: player.forca || 50, c: '#ff4757' },
                { n: "Reflexo", v: player.reflexo || 50, c: '#2ed573' },
                { n: "Inteligência", v: player.inteligencia || 50, c: '#1e90ff' },
                { n: "Carisma", v: player.carisma || 50, c: '#ffa502' },
                { n: "Resistência", v: player.resistencia || 50, c: '#9b59b6' },
                { n: "Culinária 🍳", v: player.culinaria || 0, c: '#e67e22' }
              ].map(a => (
                <div key={a.n} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '3px' }}>
                    <label style={{ color: '#cbd5e1' }}>{a.n}</label>
                    <span style={{ fontWeight: 'bold' }}>{a.v}/100</span>
                  </div>
                  <div style={{ backgroundColor: '#1e293b', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${a.v}%`, backgroundColor: a.c, height: '100%', transition: '0.3s' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setTelaAtual("celular")} style={{ padding: '14px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              📱 Abrir Telemóvel
            </button>
            <button onClick={() => setTelaAtual("mapa")} style={{ padding: '14px', backgroundColor: '#f1c40f', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              🚪 Sair para a Cidade (Mapa)
            </button>
            <button onClick={() => setTelaAtual("menuPrincipal")} style={{ padding: '12px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              Sair do Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnMiniDom = { padding: '6px 10px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' };