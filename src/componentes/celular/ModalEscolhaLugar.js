import React from 'react';

export default function ModalEscolhaLugar({ player, npc, setTelaAtual, setParceiroMotel, onClose }) {
  const locais = [
    { id: 'parque', nome: '🌳 Parque da Cidade', custo: 10, afetoMin: 0, gasto: 15 },
    { id: 'restaurante', nome: '🍝 Restaurante Italiano', custo: 120, afetoMin: 30, gasto: 30 },
    { id: 'cinema', nome: '🎬 Cinema Metrópole', custo: 60, afetoMin: 20, gasto: 20 },
    { id: 'motel', nome: '🏩 Motel Neon (Íntimo)', custo: 250, afetoMin: 60, gasto: 50 }
  ];

  const irAoLugar = (local) => {
    if (player.dinheiro < local.custo) {
      alert("Você não tem dinheiro suficiente para pagar este encontro!");
      return;
    }
    if (npc.afeto < local.afetoMin) {
      alert(`${npc.nome} acha que ainda é muito cedo para ir a um lugar assim com você.`);
      return;
    }

    if (local.id === 'motel') {
      setParceiroMotel(npc);
      setTelaAtual("motel");
    } else {
      // Encontros normais em locais públicos aumentam o afeto de forma drástica!
      npc.afeto = Math.min(100, npc.afeto + local.gasto);
      alert(`Você levou ${npc.nome} ao ${local.nome.split(' ')[1]}. O encontro foi maravilhoso e o nível de afinidade subiu muito!`);
      onClose();
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 }}>
      <div style={{ backgroundColor: '#1e293b', border: '2px solid #ec4899', borderRadius: '15px', padding: '20px', maxWidth: '400px', width: '100%', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ color: '#ec4899', margin: '0 0 10px 0' }}>🌹 Planejar Encontro</h2>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>Escolha para onde deseja levar {npc.nome}:</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {locais.map(loc => {
            const bloqueado = npc.afeto < loc.afetoMin;
            return (
              <button 
                key={loc.id}
                onClick={() => irAoLugar(loc)}
                style={{
                  padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontWeight: 'bold', cursor: 'pointer',
                  backgroundColor: bloqueado ? '#0f172a' : '#27273a',
                  color: bloqueado ? '#475569' : '#fff'
                }}
              >
                {loc.nome} {bloqueado ? `(Requer ${loc.afetoMin}% Afeto)` : `[$${loc.custo}]`}
              </button>
            );
          })}
        </div>
        <button onClick={onClose} style={{ marginTop: '15px', backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
      </div>
    </div>
  );
}