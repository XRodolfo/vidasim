import React, { useState } from 'react';

export default function AppDev({ player, setPlayer, contatosNPCs, setContatosNPCs, voltarHome }) {
  const [senhaInput, setSenhaInput] = useState("");
  const [cheatLiberado, setCheatLiberado] = useState(false);

  const tentarLoginCheat = () => {
    if (senhaInput === "Rodolfo") {
      if (player.nome === "Rodolfo") {
        setPlayer({...player, godMode: true, dinheiro: 9999999, forca: 100, inteligencia: 100, carisma: 100, reflexo: 100, resistencia: 100, energia: 100});
        alert("⚡ MODO DEUS ATIVADO ⚡\nBem-vindo, Criador. O universo curva-se perante ti.");
      } else {
        alert("Acesso Dev Permitido. Liberando modificadores...");
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
      <button onClick={voltarHome} style={{marginBottom: '15px', backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px', cursor: 'pointer'}}>🔙 Home</button>
      
      <div style={{backgroundColor: '#000', padding: '15px', borderRadius: '8px', border: '1px solid #33f', fontFamily: 'monospace', color: '#33f', fontSize: '12px'}}>
        <h3 style={{margin: '0 0 15px 0'}}>// DEV_CONSOLE</h3>
        
        {!cheatLiberado ? (
          <div>
            <input type="password" value={senhaInput} onChange={e => setSenhaInput(e.target.value)} placeholder="Senha..." style={{backgroundColor: '#111', border: '1px solid #33f', color: '#33f', width: '100%', marginBottom: '10px', padding: '8px'}} />
            <button onClick={tentarLoginCheat} style={{backgroundColor: '#33f', color: '#000', width: '100%', fontWeight: 'bold', padding: '8px', cursor: 'pointer'}}>EXECUTE</button>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {player.godMode && <div style={{backgroundColor: '#fff', color: '#000', padding: '5px', textAlign: 'center', fontWeight: 'bold'}}>⚡ MODO DEUS ATIVO ⚡</div>}
            
            <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>// STATUS</h4>
            <label>Dinheiro</label> <input type="number" value={player.dinheiro} onChange={e => setPlayer({...player, dinheiro: parseInt(e.target.value)})} style={{backgroundColor: '#111', color: '#33f', padding: '5px'}}/>
            <label>Energia</label> <input type="range" min="0" max="100" value={player.energia} onChange={e => setPlayer({...player, energia: parseInt(e.target.value)})} />
            
            <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>// MANIPULAR NPCs</h4>
            {contatosNPCs.length === 0 ? <span style={{color: '#666'}}>Sem NPCs.</span> : contatosNPCs.map(npc => (
              <div key={npc.id} style={{backgroundColor: '#111', padding: '8px', borderLeft: '2px solid #33f', marginBottom: '5px'}}>
                <strong style={{color: '#fff'}}>{npc.nome}</strong><br/>
                <label>Afeto ({npc.afeto})</label> <input type="range" min="0" max="100" value={npc.afeto || 0} onChange={e => atualizarNPC(npc.id, {afeto: parseInt(e.target.value)})} style={{width: '100%'}}/>
                <label>Libido ({npc.libido})</label> <input type="range" min="0" max="100" value={npc.libido || 0} onChange={e => atualizarNPC(npc.id, {libido: parseInt(e.target.value)})} style={{width: '100%'}}/>
              </div>
            ))}

            <button onClick={() => setPlayer({...player, energia: 100})} style={{backgroundColor: '#33f', color: '#000', marginTop: '15px', padding: '10px', cursor: 'pointer', fontWeight: 'bold'}}>REFILL ENERGY</button>
          </div>
        )}
      </div>
    </div>
  );
}