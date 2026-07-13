import React, { useState, useEffect } from 'react';
import Avatar from '../componentes/Avatar';
import HUD from '../componentes/HUD';
import { obterComotos, executarAtividade, calcularCorQualidade } from '../utils/casasSystem';

export default function Quarto({ player, setPlayer, mundo, t, salvarJogo, dormir, setTelaAtual }) {
  const [imovelAtual, setImovelAtual] = useState(player.inventario.imoveis[0] || { tipo: "apartamento_simples", nome: t.quarto });
  const [comodoAtual, setComodoAtual] = useState(null);
  const comodosDisponiveis = obterComotos(imovelAtual.tipo);

  useEffect(() => {
    // Se não houver cômodo atual selecionado, ou o cômodo atual não existir mais no imóvel, selecione o primeiro
    if (!comodoAtual || !comodosDisponiveis.some(c => c.id === comodoAtual.id)) {
      setComodoAtual(comodosDisponiveis[0]);
    }
  }, [imovelAtual, comodosDisponiveis, comodoAtual]);

  const handleExecutarAtividade = (atividade) => {
    executarAtividade(atividade, player, setPlayer, dormir);
  };

  const corQualidade = calcularCorQualidade(imovelAtual.qualidade || 1);

  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{imovelAtual.nome} - {comodoAtual?.nome || 'Carregando...'}</h2>
          <button onClick={salvarJogo} style={{ backgroundColor: '#28a745', padding: '8px 15px', fontSize: '14px' }}>💾 {t.saveSucesso}</button>
        </div>

        {/* Navegação entre cômodos */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {comodosDisponiveis.map(comodo => (
            <button
              key={comodo.id}
              onClick={() => setComodoAtual(comodo)}
              style={{
                backgroundColor: comodo.id === comodoAtual?.id ? corQualidade : '#444',
                padding: '8px 15px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {comodo.emoji} {comodo.nome}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, backgroundColor: '#111', padding: '15px', borderRadius: '8px', border: `1px solid ${corQualidade}` }}>
            <h3 style={{ color: corQualidade }}>{comodoAtual?.nome || 'Detalhes do Cômodo'}</h3>
            <p style={{ fontSize: '14px', color: '#ccc' }}>{comodoAtual?.descricao || 'Selecione um cômodo para ver os detalhes.'}</p>

            <h4 style={{ color: '#007bff', marginTop: '20px' }}>Atividades em {comodoAtual?.nome}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comodoAtual?.atividades.map(atividade => (
                <button
                  key={atividade.id}
                  onClick={() => handleExecutarAtividade(atividade)}
                  style={{ backgroundColor: '#34495e', padding: '10px', borderRadius: '5px', textAlign: 'left' }}
                >
                  {atividade.emoji} {atividade.nome} (Dura: {atividade.tempo}h)
                </button>
              )) || <p style={{ color: '#aaa' }}>Nenhuma atividade disponível.</p>}
            </div>

            <div style={{ marginTop: '15px', transform: 'scale(0.85)' }}><Avatar player={player} mundo={mundo} /></div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ color: '#007bff' }}>{t.atributos}</h3>
            {[{ n: t.forca, v: player.forca, c: '#ff4757' }, { n: t.reflexo, v: player.reflexo, c: '#2ed573' }, { n: t.inteligencia, v: player.inteligencia, c: '#1e90ff' }, { n: t.carisma, v: player.carisma, c: '#ffa502' }, { n: t.resistencia, v: player.resistencia, c: '#9b59b6' }].map(a => (
              <div key={a.n} style={{ marginBottom: '8px' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><label>{a.n}</label><span>{a.v}/100</span></div><div style={{ backgroundColor: '#333', height: '6px' }}><div style={{ width: `${a.v}%`, backgroundColor: a.c, height: '100%' }}></div></div></div>
            ))}
            <button onClick={() => setTelaAtual("celular")} style={{ backgroundColor: '#2f3542' }}>📱 {t.telemovel}</button>
            <button onClick={() => setTelaAtual("mapa")} style={{ backgroundColor: '#eccc68', color: '#111' }}>🚪 {t.sairRua}</button>
            <button onClick={() => setTelaAtual("menuPrincipal")} style={{ backgroundColor: '#555' }}>Sair do Jogo</button>
          </div>
        </div>
      </div>
    </div>
  );
}