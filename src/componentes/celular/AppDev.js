import React, { useState } from 'react';
import { todasAsFetiches } from '../../utils/fetchesSystem';

export default function AppDev({ player, setPlayer, contatosNPCs, setContatosNPCs, voltarHome }) {
  const [senhaInput, setSenhaInput] = useState("");
  const [cheatLiberado, setCheatLiberado] = useState(false);

  const tentarLoginCheat = () => {
    if (senhaInput === "Rodolfo") {
      if (player.nome === "Rodolfo") {
        setPlayer({
          ...player, 
          godMode: true, dinheiro: 9999999, 
          forca: 100, inteligencia: 100, carisma: 100, reflexo: 100, resistencia: 100, 
          energia: 100, periciaSexual: 100
        });
        alert("⚡ MODO DEUS ATIVADO ⚡\nFicha técnica e perícia íntima maximizadas.");
      } else {
        alert("Acesso Dev Permitido. Modificadores de estúdio liberados.");
      }
      setCheatLiberado(true);
    } else {
      alert("Acesso Negado.");
    }
  };

  const atualizarNPC = (id, mudancas) => {
    setContatosNPCs(contatosNPCs.map(npc => npc.id === id ? { ...npc, ...mudancas } : npc));
  };

  return (
    <div style={{padding: '10px', height: '480px', overflowY: 'auto', color: '#fff'}}>
      <button onClick={voltarHome} style={{marginBottom: '15px', backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px'}}>🔙 Home</button>
      
      <div style={{backgroundColor: '#000', padding: '15px', borderRadius: '8px', border: '1px solid #33f', fontFamily: 'monospace', color: '#33f', fontSize: '12px'}}>
        <h3 style={{margin: '0 0 15px 0'}}>{"// DEV_CONSOLE"}</h3>
        
        {!cheatLiberado ? (
          <div>
            <input type="password" value={senhaInput} onChange={e => setSenhaInput(e.target.value)} placeholder="Senha corporativa..." style={{backgroundColor: '#111', border: '1px solid #33f', color: '#33f', width: '100%', marginBottom: '10px', padding: '8px'}} />
            <button onClick={tentarLoginCheat} style={{backgroundColor: '#33f', color: '#000', width: '100%', fontWeight: 'bold', padding: '8px', cursor: 'pointer'}}>EXECUTE</button>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {player.godMode && <div style={{backgroundColor: '#fff', color: '#000', padding: '5px', textAlign: 'center', fontWeight: 'bold'}}>⚡ MODO DEUS CONECTADO ⚡</div>}
            
            <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>{"// MODIFICAR VOCÊ"}</h4>
            <label>Dinheiro ($)</label> 
            <input type="number" value={player.dinheiro} onChange={e => setPlayer({...player, dinheiro: parseInt(e.target.value) || 0})} style={{backgroundColor: '#111', color: '#33f', padding: '5px', border: '1px solid #33f'}}/>
            
            <label>🔥 Perícia Sexual ({player.periciaSexual || 15})</label>
            <input type="range" min="1" max="100" value={player.periciaSexual || 15} onChange={e => setPlayer({...player, periciaSexual: parseInt(e.target.value)})} style={{width: '100%'}} />

            <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>{"// COMPORTAMENTO DOS NPCs"}</h4>
            {contatosNPCs.length === 0 ? <span style={{color: '#666'}}>Sem contatos salvos na memória.</span> : contatosNPCs.map(npc => (
              <div key={npc.id} style={{backgroundColor: '#111', padding: '8px', borderLeft: '2px solid #33f', marginBottom: '8px'}}>
                <strong style={{color: '#fff'}}>{npc.nome}</strong><br/>
                
                <label>Afeto ({npc.afeto}%)</label> 
                <input type="range" min="0" max="100" value={npc.afeto || 0} onChange={e => atualizarNPC(npc.id, {afeto: parseInt(e.target.value)})} style={{width: '100%'}}/>
                
                <label>💓 Sensibilidade Anatômica ({npc.sensibilidade || 50})</label> 
                <input type="range" min="1" max="100" value={npc.sensibilidade || 50} onChange={e => atualizarNPC(npc.id, {sensibilidade: parseInt(e.target.value)})} style={{width: '100%'}}/>
                
                <label>Libido / Tesão Base ({npc.libido || 30})</label> 
                <input type="range" min="1" max="100" value={npc.libido || 30} onChange={e => atualizarNPC(npc.id, {libido: parseInt(e.target.value)})} style={{width: '100%'}}/>

                <label style={{ marginTop: '8px', display: 'block' }}>Fetiches:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', margin: '5px 0 10px 0' }}>
                  {todasAsFetiches.map(fet => {
                    const temFetiche = npc.fetiches?.some(f => f.id === fet.id);
                    return (
                      <label key={fet.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#38bdf8', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={temFetiche} 
                          onChange={() => {
                            let novosFetiches = npc.fetiches ? [...npc.fetiches] : [];
                            if (temFetiche) {
                              novosFetiches = novosFetiches.filter(f => f.id !== fet.id);
                            } else {
                              novosFetiches.push(fet);
                            }
                            atualizarNPC(npc.id, { fetiches: novosFetiches });
                          }}
                        />
                        {fet.nome}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            <button onClick={() => setPlayer(prev => ({...prev, energia: 100}))} style={{backgroundColor: '#33f', color: '#000', marginTop: '15px', padding: '10px', cursor: 'pointer', fontWeight: 'bold', border: 'none'}}>REGEN ENERGIA MASTER</button>
          </div>
        )}
      </div>
    </div>
  );
}