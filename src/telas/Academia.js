import React from 'react';
import HUD from '../componentes/HUD';

export default function Academia({ player, setPlayer, mundo, t, avancarTempo, setTelaAtual }) {
  
  const treinar = () => {
    // Verifica energia apenas se NÃO for Modo Deus
    if (!player.godMode && player.energia < 30) {
      alert("Exausto! Precisa de energia.");
      return;
    }

    if(avancarTempo(4, 30)) {
      setPlayer(prev => ({
        ...prev, 
        forca: Math.min(100, prev.forca + 2), 
        peso: Math.max(45, prev.peso - 1),
        // Se for Modo Deus, a energia não diminui, caso contrário avançaTempo já trata
        energia: player.godMode ? 100 : Math.max(0, prev.energia - 30)
      }));
      alert("Treino Concluído! Força +2 e -1kg.");
    }
  };

  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card">
        <h2>{t.academia}</h2>
        <button onClick={treinar} style={{padding: '20px', backgroundColor: '#ff4757'}}>
          {t.treinarCorpo}
        </button>
        <button onClick={() => setTelaAtual("mapa")} style={{marginTop: '20px', backgroundColor: '#555'}}>{t.voltar}</button>
      </div>
    </div>
  );
}