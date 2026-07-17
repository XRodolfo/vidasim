import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import { gerarNPC } from '../../utils/npcGenerator';

export default function AppLume({ player, setPlayer, mundo, contatosNPCs, setContatosNPCs, avancarTempo, voltarHome }) {
  const [abaLume, setAbaLume] = useState("tinder"); // 'tinder' ou 'filtros'
  const [perfilTinder, setPerfilTinder] = useState(null);

  useEffect(() => {
    if (!perfilTinder) {
      const min = player.prefIdadeMin || 18;
      const max = player.prefIdadeMax || 60;
      let npc = null;
      let tentativas = 0;
      while (tentativas < 50) {
        const candidato = gerarNPC(player, mundo);
        if (candidato.idade >= min && candidato.idade <= max) {
          npc = candidato;
          break;
        }
        tentativas++;
      }
      if (!npc) npc = gerarNPC(player, mundo);
      setPerfilTinder(npc);
    }
  }, [perfilTinder, player, mundo]);

  const acaoTinder = (deuMatch) => {
    if (!avancarTempo(0, 2)) return;
    if (deuMatch) {
      if (Math.random() > 0.6) {
        alert(`🔥 DEU MATCH COM ${perfilTinder.nome}! Adicionado aos contactos.`);
        setContatosNPCs([...contatosNPCs, perfilTinder]);
      } else {
        alert("Deslizou para a direita, mas não deu Match... ainda.");
      }
    }
    setPerfilTinder(null);
  };

  return (
    <div style={{padding: '10px', color: '#fff'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
         <button onClick={voltarHome} style={{backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px', cursor: 'pointer'}}>🔙 Home</button>
         <div>
            <button onClick={() => setAbaLume('tinder')} style={{...btnTab, color: abaLume === 'tinder' ? '#fb7185' : '#64748b'}}>🔥 Lume</button>
            <button onClick={() => setAbaLume('filtros')} style={{...btnTab, color: abaLume === 'filtros' ? '#fb7185' : '#64748b'}}>⚙️ Filtros</button>
         </div>
      </div>

      {abaLume === "tinder" && perfilTinder && (
        <div style={{backgroundColor: '#1e293b', borderRadius: '15px', padding: '15px', boxShadow: '0 10px 15px rgba(0,0,0,0.5)', textAlign: 'center'}}>
           <div style={{width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #fb7185', overflow: 'hidden', margin: '0 auto 10px auto', backgroundColor: '#ececec'}}>
              <div style={{transform: 'scale(1.7)', transformOrigin: 'top center', width: '100%', height: '100%'}}><Avatar player={perfilTinder} mundo={mundo} /></div>
           </div>
           
           <h3 style={{margin: '10px 0 5px 0'}}>{perfilTinder.nome}, {perfilTinder.idade}</h3>
           <p style={{color: '#94a3b8', fontSize: '12px', margin: '0 0 5px 0'}}>{perfilTinder.estadoCivil} | {perfilTinder.profissao}</p>
           <p style={{color: '#fff', fontSize: '13px', margin: '0 0 15px 0', fontStyle: 'italic'}}>"{perfilTinder.bio}"</p>
           
           <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
              <button onClick={() => acaoTinder(false)} style={{width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#334155', fontSize: '24px', cursor: 'pointer', border: 'none'}}>❌</button>
              <button onClick={() => acaoTinder(true)} style={{width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#10b981', fontSize: '24px', cursor: 'pointer', border: 'none'}}>💚</button>
           </div>
         </div>
      )}

      {abaLume === "filtros" && (
        <div style={{backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
           <h3 style={{color: '#fb7185', margin: '0 0 15px 0'}}>Preferências do Lume</h3>
           <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              Quero ver perfis de:
              <select value={player.preferenciaBusca || "Ambos"} onChange={(e) => setPlayer({ ...player, preferenciaBusca: e.target.value })} style={{ padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '5px' }}>
                <option value="Mulheres">Mulheres</option>
                <option value="Homens">Homens</option>
                <option value="Ambos">Ambos</option>
              </select>
            </label>

            <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', flex: 1 }}>
                Idade Mínima:
                <input 
                  type="number" 
                  min="18" 
                  max="80" 
                  value={player.prefIdadeMin || 18} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 18;
                    setPlayer({ ...player, prefIdadeMin: val });
                    setPerfilTinder(null);
                  }} 
                  style={{ padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '5px' }} 
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', flex: 1 }}>
                Idade Máxima:
                <input 
                  type="number" 
                  min="18" 
                  max="80" 
                  value={player.prefIdadeMax || 60} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 60;
                    setPlayer({ ...player, prefIdadeMax: val });
                    setPerfilTinder(null);
                  }} 
                  style={{ padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '5px' }} 
                />
              </label>
            </div>
        </div>
      )}
    </div>
  );
}
const btnTab = { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', margin: '0 5px' };