import React from 'react';
import HUD from '../componentes/HUD';

export default function DistritoComercial({ player, mundo, t, setTelaAtual }) {
  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card" style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>🏢 {t.distritoComercialTitulo || "Distrito Comercial"}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <button onClick={() => setTelaAtual("prefeitura")} style={{ ...btnU, backgroundColor: '#2980b9' }}>🏛️ {t.prefeituraTitulo || "Prefeitura e Concursos"}</button>
          <button onClick={() => setTelaAtual("delegacia")} style={{ ...btnU, backgroundColor: '#c0392b' }}>🚓 {t.delegaciaTitulo || "Delegacia de Polícia"}</button>
          <button onClick={() => setTelaAtual("hospital")} style={{ ...btnU, backgroundColor: '#27ae60' }}>🏥 {t.hospitalTitulo || "Hospital Central"}</button>
          <button onClick={() => setTelaAtual("advocacia")} style={{ ...btnU, backgroundColor: '#8e44ad' }}>⚖️ {t.advocaciaTitulo || "Escritório de Advocacia"}</button>
          <button onClick={() => setTelaAtual("escritorios")} style={{ ...btnU, backgroundColor: '#f1c40f' }}>🏢 {t.escritoriosTitulo || "Prédio de Escritórios"}</button>
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ width: '100%', padding: '15px', backgroundColor: '#ef4444', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>{t.voltarMapa || "Voltar para o Mapa"}</button>
      </div>
    </div>
  );
}

const btnU = { border: 'none', padding: '18px', borderRadius: '8px', color: '#fff', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', backgroundColor: '#1e293b' };
