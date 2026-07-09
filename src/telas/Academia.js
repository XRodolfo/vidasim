import React, { useState, useEffect } from 'react';
import HUD from '../componentes/HUD';
import ModalEncontro from '../componentes/ModalEncontro';
import { gerarNPC } from '../utils/npcGenerator'; 

export default function Academia({ player, setPlayer, mundo, t, avancarTempo, setTelaAtual, contatosNPCs, setContatosNPCs }) {
  
  const [encontroSurpresa, setEncontroSurpresa] = useState(null);
  
  useEffect(() => {
    // 30% de chance de aparecer alguém quando você entra na Academia!
    if (Math.random() < 0.3) {
      setEncontroSurpresa(gerarNPC(player, mundo));
    }
  }, []); // Os colchetes vazios garantem que roda só ao abrir a tela

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
  
  // Tudo o que é visual DEVE ficar dentro deste return:
  return (
    <div className="container" style={{ position: 'relative' }}>
      
      {/* 1. O MODAL DE ENCONTRO FICA AQUI NO TOPO */}
      {encontroSurpresa && (
        <ModalEncontro 
           player={player} npc={encontroSurpresa} mundo={mundo} 
           setContatosNPCs={setContatosNPCs} 
           onClose={() => setEncontroSurpresa(null)} 
        />
      )}

      {/* 2. O HUD E O RESTO DA TELA DA ACADEMIA VÊM LOGO ABAIXO */}
      <HUD player={player} mundo={mundo} t={t} />
      
      <div className="card">
        <h2>{t.academia}</h2>
        <button onClick={treinar} style={{padding: '20px', backgroundColor: '#ff4757'}}>
          {t.treinarCorpo}
        </button>
      
        <button onClick={() => setTelaAtual("mapa")} style={{marginTop: '20px', backgroundColor: '#555'}}>
          {t.voltar}
        </button>
      </div>

    </div>
  );
}