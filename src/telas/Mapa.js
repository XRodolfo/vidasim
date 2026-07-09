import React from 'react';
import HUD from '../componentes/HUD';

export default function Mapa({ player, mundo, t, setTelaAtual }) {
  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card" style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>📍 Mapa Urbano de {mundo[player.cidade_id]?.nome || "Metrópole"}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <button onClick={() => setTelaAtual("quarto")} style={btnU}>🏠 Seu Quarto / Apartamento</button>
          <button onClick={() => setTelaAtual("academia")} style={{ ...btnU, backgroundColor: '#ff4757' }}>🏋️ Academia IronGym</button>
          <button onClick={() => setTelaAtual("lojaRoupas")} style={{ ...btnU, backgroundColor: '#9b59b6' }}>🛍️ Boutique Fashion Mall</button>
          <button onClick={() => setTelaAtual("centroComercial")} style={{ ...btnU, backgroundColor: '#2c3e50' }}>🏢 Distrito Comercial & Corporativo</button>
          <button onClick={() => setTelaAtual("prefeitura")} style={{ ...btnU, backgroundColor: '#2980b9' }}>🏛️ Prefeitura e Concursos</button>
          <button onClick={() => setTelaAtual("aeroporto")} style={{ ...btnU, backgroundColor: '#0ea5e9' }}>✈️ Aeroporto Internacional</button>
          <button onClick={() => setTelaAtual("lojaVeiculos")} style={{ ...btnU, backgroundColor: '#10b981' }}>🏎️ Concessionária HighDrive</button>
          <button onClick={() => setTelaAtual("imobiliaria")} style={{ ...btnU, backgroundColor: '#f59e0b' }}>🏢 Imobiliária Global Home</button>
        </div>

        <button onClick={() => setTelaAtual("celular")} style={{ width: '100%', padding: '15px', backgroundColor: '#334155', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>📱 Abrir Smartphone</button>
      </div>
    </div>
  );
}
const btnU = { border: 'none', padding: '18px', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', backgroundColor: '#1e293b' };