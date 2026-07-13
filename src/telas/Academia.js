import React, { useState, useEffect } from 'react';
import HUD from '../componentes/HUD';
import ModalEncontro from '../componentes/ModalEncontro';
import { gerarNPC } from '../utils/npcGenerator';

export default function Academia({ player, setPlayer, mundo, t, avancarTempo, setTelaAtual, contatosNPCs, setContatosNPCs }) {
  const [encontroSurpresa, setEncontroSurpresa] = useState(null);

  useEffect(() => {
    if (Math.random() < 0.35) {
      setEncontroSurpresa(gerarNPC(player, mundo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const treinar = (tipo, custoEnergia, ganhoForca, ganhoResistencia, ganhoReflexo, perdaPeso) => {
    const treinosHoje = player.treinosHoje || 0;
    
    if (!player.godMode && treinosHoje >= 2) {
      alert("⚠️ Limite diário atingido! O teu corpo precisa de descanso para evitar lesões musculares. Volta amanhã!");
      return;
    }
    if (!player.godMode && player.energia < custoEnergia) {
      alert("❌ Estás demasiado exausto para este treino pesado! Vai comer ou dormir.");
      return;
    }

    if (avancarTempo(2, custoEnergia)) {
      setPlayer(prev => ({
        ...prev,
        forca: Math.min(100, (prev.forca || 50) + ganhoForca),
        resistencia: Math.min(100, (prev.resistencia || 50) + ganhoResistencia),
        reflexo: Math.min(100, (prev.reflexo || 50) + ganhoReflexo),
        peso: Math.max(45, (prev.peso || 65) - perdaPeso),
        treinosHoje: (prev.treinosHoje || 0) + 1,
        energia: player.godMode ? 100 : Math.max(0, prev.energia - custoEnergia)
      }));
      alert(`💪 Treino de ${tipo} Concluído! (+${ganhoForca} Força, +${ganhoResistencia} Resistência, -${perdaPeso}kg)`);
    }
  };

  return (
    <div className="container" style={{ position: 'relative' }}>
      {encontroSurpresa && (
        <ModalEncontro player={player} npc={encontroSurpresa} mundo={mundo} setContatosNPCs={setContatosNPCs} onClose={() => setEncontroSurpresa(null)} />
      )}

      <HUD player={player} mundo={mundo} t={t} />

      <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', color: '#fff', backgroundColor: '#1e272e', borderRadius: '10px', marginTop: '15px' }}>
        <h2>🏋️ Academia Iron Fitness</h2>
        <p style={{ color: '#00d2d3' }}>Treinos realizados hoje: <strong>{player.treinosHoje || 0} / 2</strong></p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <div style={cardTreino}>
            <div>
              <strong style={{ fontSize: '16px', color: '#ff6b6b' }}>🏋️ Musculação Pesada (Hipertrofia)</strong>
              <div style={{ fontSize: '13px', color: '#ccc' }}>Foco total em ganho de massa muscular.</div>
              <small style={{ color: '#2ed573' }}>Efeitos: +4 Força | -0.5 kg | -35% Energia</small>
            </div>
            <button onClick={() => treinar("Musculação", 35, 4, 1, 0, 0.5)} style={btnTreino}>Treinar [2h]</button>
          </div>

          <div style={cardTreino}>
            <div>
              <strong style={{ fontSize: '16px', color: '#48dbfb' }}>🏃 Cardio & Esteira Intensiva</strong>
              <div style={{ fontSize: '13px', color: '#ccc' }}>Queima rápida de gordura e fôlego.</div>
              <small style={{ color: '#2ed573' }}>Efeitos: +3 Resistência | -1.5 kg | -30% Energia</small>
            </div>
            <button onClick={() => treinar("Cardio", 30, 0, 3, 1, 1.5)} style={btnTreino}>Treinar [2h]</button>
          </div>

          <div style={cardTreino}>
            <div>
              <strong style={{ fontSize: '16px', color: '#feca57' }}>🥊 Boxe & Artes Marciais</strong>
              <div style={{ fontSize: '13px', color: '#ccc' }}>Treino de agilidade, reflexo e combate.</div>
              <small style={{ color: '#2ed573' }}>Efeitos: +3 Reflexo | +2 Força | -40% Energia</small>
            </div>
            <button onClick={() => treinar("Boxe", 40, 2, 1, 3, 1.0)} style={btnTreino}>Treinar [2h]</button>
          </div>
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', padding: '12px', backgroundColor: '#576574', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Mapa
        </button>
      </div>
    </div>
  );
}

const cardTreino = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2f3640', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ff4757' };
const btnTreino = { padding: '10px 18px', backgroundColor: '#ff4757', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };