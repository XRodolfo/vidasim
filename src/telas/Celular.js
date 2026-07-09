import React, { useState } from 'react';
import HUD from '../componentes/HUD';
import AppChat from '../componentes/celular/AppChat';
import AppLume from '../componentes/celular/AppLume';
import AppDev from '../componentes/celular/AppDev';

export default function Celular({ player, setPlayer, mundo, t, contatosNPCs, setContatosNPCs, avancarTempo, setTelaAtual, setParceiroMotel }) {
  // O Estado exato que você criou:
  const [appAtivo, setAppAtivo] = useState("home"); 

  const osIcon = { width: '70px', height: '70px', backgroundColor: '#1e293b', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' };

  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      
      {/* O SEU DESIGN ORIGINAL MANTIDO */}
      <div className="card" style={{backgroundColor: '#0f172a', borderColor: '#334155', minHeight: '550px', position: 'relative', padding: '10px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '5px 15px', color: '#94a3b8', fontSize: '12px', borderBottom: '1px solid #1e293b', marginBottom: '15px'}}>
          <span>Operadora Sim</span>
          <span>{player.hora}:00 🔋 100%</span>
        </div>

        {/* --- HOME (SEUS ÍCONES DE OS) --- */}
        {appAtivo === "home" && (
          <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px'}}>
            <div style={osIcon} onClick={() => setAppAtivo("mensagens")}><span style={{fontSize: '24px'}}>💬</span>Chat</div>
            <div style={{...osIcon, backgroundColor: '#fb7185'}} onClick={() => setAppAtivo("tinder")}><span style={{fontSize: '24px'}}>🔥</span>Lume</div>
            <div style={{...osIcon, backgroundColor: '#333'}} onClick={() => setAppAtivo("cheats")}><span style={{fontSize: '24px'}}>⚙️</span>Dev</div>
            
            <button 
               onClick={() => setTelaAtual("quarto")} 
               style={{position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#334155', width: '150px', borderRadius: '20px', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer'}}
            >
               Guardar Telemóvel
            </button>
          </div>
        )}

        {/* --- CARREGAMENTO DOS MÓDULOS --- */}
        {appAtivo === "mensagens" && (
            <AppChat 
                player={player} mundo={mundo} contatosNPCs={contatosNPCs} setContatosNPCs={setContatosNPCs} 
                avancarTempo={avancarTempo} setParceiroMotel={(npc) => { setParceiroMotel(npc); setTelaAtual("motel"); }} 
                voltarHome={() => setAppAtivo("home")} 
            />
        )}
        
        {appAtivo === "tinder" && (
            <AppLume 
                player={player} setPlayer={setPlayer} mundo={mundo} contatosNPCs={contatosNPCs} 
                setContatosNPCs={setContatosNPCs} avancarTempo={avancarTempo} 
                voltarHome={() => setAppAtivo("home")} 
            />
        )}

        {appAtivo === "cheats" && (
            <AppDev 
                player={player} setPlayer={setPlayer} contatosNPCs={contatosNPCs} 
                setContatosNPCs={setContatosNPCs} 
                voltarHome={() => setAppAtivo("home")} 
            />
        )}

      </div>
    </div>
  );
}