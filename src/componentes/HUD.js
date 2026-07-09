import React from 'react';

export default function HUD({ player, mundo, t }) {
  return (
    <div className="hud">
      <div className="hud-info">👤 {player.nome} ({player.genero})</div>
      <div className="hud-info">📍 {mundo[player.cidade_id].nome}</div>
      <div className="hud-info">🗓️ {t.dia} {player.dia} | ⏰ {player.hora}:00</div>
      <div className="hud-info">💰 $ {player.dinheiro}</div>
      <div className="hud-info">⚡ {player.energia}%</div>
    </div>
  );
}