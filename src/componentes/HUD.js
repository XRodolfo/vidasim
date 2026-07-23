import React from 'react';
import { toggleTheme } from '../ui/theme';

// Maps need key to color class and emoji label
const NEED_META = {
  hunger:   { label: '🍽 Fome',    cls: 'hunger' },
  sleep:    { label: '😴 Sono',    cls: 'sleep' },
  hygiene:  { label: '🚿 Higiene', cls: 'hygiene' },
  social:   { label: '💬 Social',  cls: 'social' },
  ambition: { label: '🔥 Ambição', cls: 'ambition' },
};

export default function HUD({ player, mundo, t, needs, telaAtual, abrirFecharCelular }) {
  const renderNeedBar = (key) => {
    const meta = NEED_META[key];
    const value = needs ? Math.round(needs[key] ?? 100) : 100;
    return (
      <div key={key} style={{ marginTop: 4 }}>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', marginBottom: 1 }}>
          {meta.label} <span style={{ float: 'right' }}>{value}%</span>
        </div>
        <div className="need-bar">
          <div
            className={`need-bar-inner ${meta.cls}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="hud glass">
      <div className="hud-info">👤 <strong>{player.nome}</strong> ({player.genero})</div>
      <div className="hud-info">📍 {mundo[player.cidade_id]?.nome}</div>
      <div className="hud-info">🗓 {t?.dia || 'Dia'} {player.dia} &nbsp;⏰ {player.hora}:00</div>
      <div className="hud-info">💰 R$ {player.dinheiro?.toLocaleString('pt-BR')}</div>
      <div className="hud-info">⚡ {player.energia}%</div>

      {needs && (
        <div className="hud-needs">
          {Object.keys(NEED_META).map(renderNeedBar)}
        </div>
      )}

      <button className="btn-theme-toggle" onClick={toggleTheme}>
        🌗 Tema
      </button>
      {abrirFecharCelular && (
        <button 
          className="btn-theme-toggle" 
          onClick={abrirFecharCelular}
          style={{ marginTop: '5px', backgroundColor: telaAtual === 'celular' ? '#e11d48' : '#0284c7', color: '#fff', border: 'none' }}
        >
          {telaAtual === 'celular' ? '❌ Fechar' : '📱 Celular'}
        </button>
      )}
    </div>
  );
}