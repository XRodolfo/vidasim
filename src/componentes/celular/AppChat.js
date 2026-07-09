import React, { useState } from 'react';
import Avatar from '../Avatar';
import ModalEscolhaLugar from './ModalEscolhaLugar';

export default function AppChat({ player, mundo, contatosNPCs, setContatosNPCs, avancarTempo, setParceiroMotel, setTelaAtual, voltarHome }) {
  const [npcAtivoId, setNpcAtivoId] = useState(null);
  const [verPerfil, setVerPerfil] = useState(false);
  const [agendarEncontro, setAgendarEncontro] = useState(false); // Gatilho do novo Modal

  const npcAtivo = contatosNPCs.find(npc => npc.id === npcAtivoId);

  const atualizarNPC = (id, mudancas) => {
    setContatosNPCs(contatosNPCs.map(npc => npc.id === id ? { ...npc, ...mudancas } : npc));
  };

  const interagir = (tipo) => {
    if (!avancarTempo(1, 5)) return;
    
    let historico = npcAtivo.historico || [];
    let afeto = npcAtivo.afeto || 10;
    let resposta = "...";
    let msgPlayer = "";

    const comprometido = npcAtivo.estadoCivil === "Casado(a)" || npcAtivo.estadoCivil === "Numa relação";

    if (tipo === "trabalho") {
        msgPlayer = "Como andam as coisas no trabalho?";
        resposta = `Como ${npcAtivo.profissao}, sempre há muito a fazer. Mas eu gosto!`;
        afeto = Math.min(100, afeto + 5);
    } else if (tipo === "hobbies") {
        msgPlayer = "O que você gosta de fazer no tempo livre?";
        resposta = "Gosto de sair, conhecer lugares novos e relaxar um pouco.";
        afeto = Math.min(100, afeto + 8);
    } else if (tipo === "flerte") {
        msgPlayer = "Você é a pessoa mais interessante com quem falei hoje...";
        if (comprometido && Math.random() > 0.3) {
            resposta = `Olha, eu sou comprometido(a) com ${npcAtivo.conjuge}. Melhor mudarmos de assunto.`;
            afeto -= 15;
        } else {
            resposta = "Você sabe muito bem como deixar alguém com vergonha... 🥰";
            afeto = Math.min(100, afeto + 15);
        }
    }

    atualizarNPC(npcAtivo.id, { afeto, historico: [...historico, { remetente: "player", texto: msgPlayer }, { remetente: "npc", texto: resposta }] });
  };

  if (!npcAtivo) {
    return (
      <div style={{padding: '10px', color: '#fff'}}>
        <button onClick={voltarHome} style={{marginBottom: '15px', backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px'}}>🔙 Home</button>
        <h3 style={{margin: '0 0 15px 0', color: '#38bdf8'}}>💬 Mensagens</h3>
        {contatosNPCs.length === 0 ? <p style={{color: '#64748b'}}>Nenhum contato salvo.</p> : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {contatosNPCs.map(npc => (
              <div key={npc.id} onClick={() => setNpcAtivoId(npc.id)} style={{backgroundColor: '#1e293b', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#ececec', overflow: 'hidden'}}><div style={{transform: 'scale(1.7)', transformOrigin: 'top center'}}><Avatar player={npc} mundo={mundo}/></div></div>
                <div style={{flex: 1}}>
                  <strong>{npc.nome}</strong><br/>
                  <span style={{fontSize: '11px', color: '#94a3b8'}}>{npc.profissao} | Afeto: {npc.afeto}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (verPerfil) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '480px', color: '#fff', backgroundColor: '#0f172a', padding: '15px', borderRadius: '10px'}}>
        <button onClick={() => setVerPerfil(false)} style={{alignSelf: 'flex-start', backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', marginBottom: '15px'}}>Fechar Perfil</button>
        <div style={{width: '120px', height: '120px', borderRadius: '15px', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ececec', border: '3px solid #38bdf8'}}>
           <div style={{transform: 'scale(1.5)', transformOrigin: 'top center', width: '100%', height: '100%'}}><Avatar player={npcAtivo} mundo={mundo} /></div>
        </div>
        <h2 style={{textAlign: 'center', margin: '0 0 5px 0'}}>{npcAtivo.nome}, {npcAtivo.idade}</h2>
        <p style={{textAlign: 'center', margin: '0 0 20px 0', color: '#38bdf8', fontWeight: 'bold'}}>{npcAtivo.profissao}</p>
        <div style={{backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <p style={{margin: '0 0 10px 0', fontStyle: 'italic', borderBottom: '1px solid #334155', paddingBottom: '10px'}}>"{npcAtivo.bio}"</p>
          <span><strong>Estado Civil:</strong> {npcAtivo.estadoCivil} {npcAtivo.conjuge && <span style={{color: '#fb7185'}}>(c/ {npcAtivo.conjuge})</span>}</span>
          <span><strong>Físico:</strong> {npcAtivo.altura}cm, {npcAtivo.peso}kg | {npcAtivo.genero === "Mulher" ? `Seios: ${npcAtivo.seios_cm}cm` : `Pênis: ${npcAtivo.penis_cm}cm`}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '480px', color: '#fff'}}>
      {agendarEncontro && (
        <ModalEscolhaLugar 
          player={player} npc={npcAtivo} 
          setTelaAtual={setTelaAtual} setParceiroMotel={setParceiroMotel} 
          onClose={() => setAgendarEncontro(false)} 
        />
      )}

      <div style={{backgroundColor: '#1e293b', padding: '10px', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '8px 8px 0 0'}}>
        <button onClick={() => setNpcAtivoId(null)} style={{backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer'}}>⬅</button>
        <div onClick={() => setVerPerfil(true)} style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ececec', overflow: 'hidden', cursor: 'pointer', border: '2px solid #38bdf8'}}>
          <div style={{transform: 'scale(1.7)', transformOrigin: 'top center'}}><Avatar player={npcAtivo} mundo={mundo}/></div>
        </div>
        <div style={{flex: 1}}><h4 style={{margin: 0, fontSize: '14px'}}>{npcAtivo.nome}</h4></div>
        <span style={{color: '#ec4899', fontSize: '12px', fontWeight: 'bold'}}>❤️ {npcAtivo.afeto}%</span>
      </div>
      
      <div style={{flex: 1, backgroundColor: '#0b1120', padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {(npcAtivo.historico || []).map((msg, i) => (
          <div key={i} style={{ alignSelf: msg.remetente === "player" ? 'flex-end' : 'flex-start', backgroundColor: msg.remetente === "player" ? '#059669' : '#334155', padding: '8px 12px', borderRadius: '15px', maxWidth: '80%', fontSize: '13px' }}>{msg.texto}</div>
        ))}
      </div>

      <div style={{backgroundColor: '#1e293b', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px'}}>
          <button onClick={() => interagir('trabalho')} style={btnTopico}>💼 Trabalho</button>
          <button onClick={() => interagir('hobbies')} style={btnTopico}>🎮 Hobbies</button>
          <button onClick={() => interagir('flerte')} style={{...btnTopico, color: '#fb7185'}}>😏 Charme</button>
          <button onClick={() => setAgendarEncontro(true)} style={{...btnTopico, backgroundColor: '#ec4899', color: '#fff'}}>🌹 Convidar p/ Sair</button>
        </div>
      </div>
    </div>
  );
}
const btnTopico = { backgroundColor: '#334155', color: '#cbd5e1', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' };