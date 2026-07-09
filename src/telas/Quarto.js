import React from 'react';
import Avatar from '../componentes/Avatar';
import HUD from '../componentes/HUD';

export default function Quarto({ player, mundo, t, salvarJogo, dormir, setTelaAtual }) {
  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>{t.quarto}</h2>
          <button onClick={salvarJogo} style={{backgroundColor: '#28a745', padding: '8px 15px', fontSize: '14px'}}>💾 Salvar Progresso</button>
        </div>
        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          <div style={{flex: 1, backgroundColor: '#111', padding: '15px', borderRadius: '8px'}}>
               <h3 style={{color: '#007bff'}}>{t.atributos}</h3>
               {[{n: t.forca, v: player.forca, c: '#ff4757'}, {n: t.reflexo, v: player.reflexo, c: '#2ed573'}, {n: t.inteligencia, v: player.inteligencia, c: '#1e90ff'}, {n: t.carisma, v: player.carisma, c: '#ffa502'}].map(a => (
                 <div key={a.n} style={{marginBottom: '8px'}}><div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px'}}><label>{a.n}</label><span>{a.v}/100</span></div><div style={{backgroundColor: '#333', height: '6px'}}><div style={{width: `${a.v}%`, backgroundColor: a.c, height: '100%'}}></div></div></div>
               ))}
               <div style={{marginTop: '15px', transform: 'scale(0.85)'}}><Avatar player={player} mundo={mundo} /></div>
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '12px'}}>
             <button onClick={dormir} style={{backgroundColor: '#3742fa'}}>🛏️ {t.dormir}</button>
             <button onClick={() => setTelaAtual("celular")} style={{backgroundColor: '#2f3542'}}>📱 {t.telemovel}</button>
             <button onClick={() => setTelaAtual("mapa")} style={{backgroundColor: '#eccc68', color: '#111'}}>🚪 {t.sairRua}</button>
             <button onClick={() => setTelaAtual("menuPrincipal")} style={{backgroundColor: '#555'}}>Sair do Jogo</button>
          </div>
        </div>
      </div>
    </div>
  );
}