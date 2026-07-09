import React from 'react';
import HUD from '../componentes/HUD';

export default function Mapa({ player, mundo, t, avancarTempo, setTelaAtual }) {
  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card">
        <h2>{t.mapa}</h2>
        <p>{t.descMapa}</p>
        <div className="acoes" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
          <button onClick={() => setTelaAtual("agenciaEmprego")}>{t.agencia}</button>
          <button onClick={() => setTelaAtual("academia")}>{t.academia}</button>
          <button onClick={() => { if(avancarTempo(2, 20)) alert("Explorou e encontrou uma empresa local que faliu. Oportunidade futura!"); }} style={{backgroundColor: '#555'}}>🕵️ Explorar Ecossistema</button>
          <button onClick={() => setTelaAtual("quarto")} style={{gridColumn: 'span 2', backgroundColor: '#ff4757'}}>{t.voltarCasa}</button>
        </div>
      </div>
    </div>
  );
}