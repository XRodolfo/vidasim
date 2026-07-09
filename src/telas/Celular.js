import React, { useState } from 'react';
import HUD from '../componentes/HUD';
import Avatar from '../componentes/Avatar';
import { gerarNPC } from '../utils/npcGenerator';

export default function Celular({ player, setPlayer, mundo, t, contatosNPCs, setContatosNPCs, avancarTempo, setTelaAtual, setParceiroMotel }) {
  const [appAtivo, setAppAtivo] = useState("home"); 
  
  const [npcAtivoId, setNpcAtivoId] = useState(null);
  const npcAtivo = contatosNPCs.find(npc => npc.id === npcAtivoId);

  const [perfilTinder, setPerfilTinder] = useState(null);

  const [senhaInput, setSenhaInput] = useState("");
  const [cheatLiberado, setCheatLiberado] = useState(false);

  // ================= LÓGICAS DO APP MENSAGENS E RELACIONAMENTOS =================
  const atualizarNPC = (id, mudancas) => {
    setContatosNPCs(contatosNPCs.map(npc => npc.id === id ? { ...npc, ...mudancas } : npc));
  };

  const enviarMensagem = () => {
    if (!avancarTempo(1, 5)) return;
    const ganhoAfeto = Math.floor(Math.random() * 5) + 1;
    const novoAfeto = Math.min(100, npcAtivo.afeto + ganhoAfeto);
    
    let resposta = novoAfeto < 20 ? "Hmm, ok." : novoAfeto < 50 ? "Legal! Como foi o seu dia?" : novoAfeto < 80 ? "Adorei falar contigo 😘" : "Estava mesmo a pensar em ti! ❤️";
    const historicoAtual = npcAtivo.historico || [];
    atualizarNPC(npcAtivo.id, { afeto: novoAfeto, historico: [...historicoAtual, { remetente: "player", texto: "Olá, tudo bem?" }, { remetente: "npc", texto: resposta }] });
  };

  const convidarEncontro = () => {
    if (npcAtivo.afeto < 40) { alert(`${npcAtivo.nome} recusou o convite. "Acho que ainda não nos conhecemos bem..."`); return; }
    if (!avancarTempo(3, 20)) return;
    atualizarNPC(npcAtivo.id, { afeto: Math.min(100, npcAtivo.afeto + 15), historico: [...(npcAtivo.historico || []), { remetente: "player", texto: "Vamos tomar um café?" }, { remetente: "npc", texto: "O encontro foi incrível! Adorei." }] });
    alert(`Encontro fantástico com ${npcAtivo.nome}! (+15 Afeto)`);
  };

  // BOTÃO DO MOTEL - PREPARA O NPC E ABRE A TELA
  const conviteIntimo = () => {
    if (npcAtivo.afeto < 70) {
      alert(`${npcAtivo.nome} ri de forma nervosa. "Acho que estamos indo muito rápido..." (Requer 70+ de Afeto)`);
      return;
    }
    // Manda o NPC ativo para o Motor Principal e abre o Minigame!
    setParceiroMotel(npcAtivo);
    setTelaAtual("motel");
  };

  // GERADOR PROCEDURAL DESCOMPACTADO E COM STATUS SEXUAIS
  const buscarNovoContato = () => {
    if (!avancarTempo(1, 10)) return;
    const etniaLocal = mundo[player.cidade_id]?.etnia || "Latina";
    const novoNPC = gerarNPC(etniaLocal);
    setContatosNPCs([...contatosNPCs, novoNPC]);
  };
    
   


  // ================= LÓGICAS DO APP LUME (TINDER) =================
  const gerarPerfilTinder = () => {
    const etniaLocal = mundo[player.cidade_id]?.etnia || "Mista";
    const listas = { "Latina": ["Mariana", "Camila", "Rodrigo", "Lucas"], "Asiática": ["Yuki", "Sakura", "Hiroshi", "Kenji"], "Negra": ["Amina", "Zuri", "Tunde", "Chidi"], "Mista": ["Alex", "Jordan", "Taylor", "Morgan"] };
    const listaNomes = listas[etniaLocal];
    
    const isMulher = Math.random() > 0.5;
    const novoPerfil = {
      id: Math.random().toString(),
      nome: listaNomes[Math.floor(Math.random() * listaNomes.length)] + " " + Math.floor(Math.random() * 100),
      afeto: 10,
      fidelidade: Math.floor(Math.random() * 100),
      familia: Math.random() > 0.5 ? "Mãe/Irmão" : "Pai Solteiro",
      genero: isMulher ? "Mulher" : "Homem",
      peso: 50 + Math.floor(Math.random() * 40),
      altura: 155 + Math.floor(Math.random() * 35),
      cidade_origem: player.cidade_id,
      cabelo: ["Curtos", "Longos", "Cacheados", "Careca"][Math.floor(Math.random() * 4)],
      seios: isMulher ? ["Pequenos", "Médios", "Fartos"][Math.floor(Math.random() * 3)] : "Nenhum",
      bio: ["Gosto de viajar ✈️", "Procurando algo sério 💍", "Apenas diversão 🍻", "Amante de gatos 🐈"][Math.floor(Math.random() * 4)],
      libido: 30 + Math.floor(Math.random() * 70),
      sensibilidade: 40 + Math.floor(Math.random() * 60),
      orgasmos_dados: 0
    };
    setPerfilTinder(novoPerfil);
  };

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
    gerarPerfilTinder();
  };

  const abrirTinder = () => {
    if (!perfilTinder) gerarPerfilTinder();
    setAppAtivo("tinder");
  };

  // ================= LÓGICAS DO APP CHEATS =================
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

  const osIcon = { width: '70px', height: '70px', backgroundColor: '#1e293b', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' };

  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      
      <div className="card" style={{backgroundColor: '#0f172a', borderColor: '#334155', minHeight: '550px', position: 'relative', padding: '10px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '5px 15px', color: '#94a3b8', fontSize: '12px', borderBottom: '1px solid #1e293b', marginBottom: '15px'}}>
          <span>Operadora Sim</span>
          <span>{player.hora}:00 🔋 100%</span>
        </div>

        {/* --- HOME --- */}
        {appAtivo === "home" && (
          <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px'}}>
            <div style={osIcon} onClick={() => setAppAtivo("mensagens")}><span style={{fontSize: '24px'}}>💬</span>Chat</div>
            <div style={{...osIcon, backgroundColor: '#fb7185'}} onClick={abrirTinder}><span style={{fontSize: '24px'}}>🔥</span>Lume</div>
            <div style={{...osIcon, backgroundColor: '#333'}} onClick={() => setAppAtivo("cheats")}><span style={{fontSize: '24px'}}>⚙️</span>Dev</div>
            <button onClick={() => setTelaAtual("quarto")} style={{position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#334155', width: '150px', borderRadius: '20px'}}>Guardar Telemóvel</button>
          </div>
        )}

        {/* --- MENSAGENS --- */}
        {appAtivo === "mensagens" && (
          <div style={{padding: '10px'}}>
            <button onClick={() => setAppAtivo("home")} style={{marginBottom: '15px', backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px'}}>🔙 Home</button>
            <h3 style={{margin: '0 0 15px 0'}}>💬 Contactos Salvos</h3>
            {contatosNPCs.length === 0 ? <p style={{color: '#64748b'}}>Use a app Lume para conhecer pessoas!</p> : (
              <div style={{maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {contatosNPCs.map(npc => (
                  <div key={npc.id} onClick={() => { setNpcAtivoId(npc.id); setAppAtivo("chat"); }} style={{backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', cursor: 'pointer'}}>
                    <strong>{npc.nome}</strong> <span style={{float: 'right', color: '#ec4899'}}>❤️ {npc.afeto}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- CHAT ATIVO --- */}
        {appAtivo === "chat" && npcAtivo && (
          <div style={{display: 'flex', flexDirection: 'column', height: '480px'}}>
            <div style={{backgroundColor: '#1e293b', padding: '10px', display: 'flex', justifyContent: 'space-between', borderRadius: '8px 8px 0 0'}}>
              <h4 style={{margin: 0}}>{npcAtivo.nome} <span style={{fontSize:'12px', color:'#ec4899'}}>(Afeto: {npcAtivo.afeto})</span></h4>
              <div style={{fontSize: '12px', color: '#94a3b8'}}>
                👨‍👩‍👧 Família: Pai ({npcAtivo.familia.pai}), Mãe ({npcAtivo.familia.mae})<br/>
                📅 Rotina: {npcAtivo.agenda}
              </div>
              <button onClick={() => setAppAtivo("mensagens")} style={{padding: '2px 8px', fontSize: '12px'}}>Voltar</button>
            </div>
            
            <div style={{flex: 1, backgroundColor: '#0b1120', padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {(npcAtivo.historico || []).map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.remetente === "player" ? 'flex-end' : 'flex-start', backgroundColor: msg.remetente === "player" ? '#059669' : '#334155', padding: '8px 12px', borderRadius: '15px', maxWidth: '80%', fontSize: '13px' }}>{msg.texto}</div>
              ))}
            </div>

            <div style={{backgroundColor: '#1e293b', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <div style={{display: 'flex', gap: '5px'}}>
                <button onClick={enviarMensagem} style={{flex: 1, backgroundColor: '#0ea5e9', padding: '10px'}}>💬 Enviar</button>
                <button onClick={convidarEncontro} style={{flex: 1, backgroundColor: npcAtivo.afeto >= 40 ? '#ec4899' : '#64748b', padding: '10px'}}>☕ Encontro</button>
              </div>
              <button onClick={conviteIntimo} style={{width: '100%', backgroundColor: npcAtivo.afeto >= 70 ? '#8b5cf6' : '#4c1d95', padding: '10px'}}>🏩 Convite Íntimo</button>
            </div>
          </div>
        )}

        {/* --- LUME (TINDER) --- */}
        {appAtivo === "tinder" && perfilTinder && (
          <div style={{padding: '10px', textAlign: 'center'}}>
            <button onClick={() => setAppAtivo("home")} style={{marginBottom: '10px', backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px'}}>🔙 Home</button>
            <div style={{backgroundColor: '#1e293b', borderRadius: '15px', padding: '15px', boxShadow: '0 10px 15px rgba(0,0,0,0.5)'}}>
               <div style={{transform: 'scale(0.8)', transformOrigin: 'top center', height: '220px'}}><Avatar player={perfilTinder} mundo={mundo} /></div>
               <h3 style={{margin: '10px 0 5px 0'}}>{perfilTinder.nome}, {Math.floor(perfilTinder.peso)}kg</h3>
               <p style={{color: '#94a3b8', fontSize: '13px', margin: '0 0 15px 0'}}>"{perfilTinder.bio}"</p>
               <div style={{display: 'flex', justifyContent: 'center', gap: '30px'}}>
                  <button onClick={() => acaoTinder(false)} style={{width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#334155', fontSize: '24px'}}>❌</button>
                  <button onClick={() => acaoTinder(true)} style={{width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#10b981', fontSize: '24px'}}>💚</button>
               </div>
            </div>
          </div>
        )}

        {/* --- CHEATS (DEV MENU EXPANDIDO) --- */}
        {appAtivo === "cheats" && (
          <div style={{padding: '10px', height: '480px', overflowY: 'auto'}}>
            <button onClick={() => setAppAtivo("home")} style={{marginBottom: '15px', backgroundColor: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '5px 10px'}}>🔙 Home</button>
            <div style={{backgroundColor: '#000', padding: '15px', borderRadius: '8px', border: '1px solid #33f', fontFamily: 'monospace', color: '#33f', fontSize: '12px'}}>
              <h3 style={{margin: '0 0 15px 0'}}>// DEV_CONSOLE</h3>
              
              {!cheatLiberado ? (
                <div>
                  <input type="password" value={senhaInput} onChange={e => setSenhaInput(e.target.value)} placeholder="Senha..." style={{backgroundColor: '#111', border: '1px solid #33f', color: '#33f', width: '100%', marginBottom: '10px', padding: '8px'}} />
                  <button onClick={tentarLoginCheat} style={{backgroundColor: '#33f', color: '#000', width: '100%', fontWeight: 'bold'}}>EXECUTE</button>
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {player.godMode && <div style={{backgroundColor: '#fff', color: '#000', padding: '5px', textAlign: 'center', fontWeight: 'bold', animation: 'pulse 1.5s infinite'}}>⚡ MODO DEUS ATIVO ⚡</div>}
                  
                  {/* ATRIBUTOS DO JOGADOR */}
                  <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>// STATUS</h4>
                  <label>Dinheiro</label> <input type="number" value={player.dinheiro} onChange={e => setPlayer({...player, dinheiro: parseInt(e.target.value)})} style={{backgroundColor: '#111', color: '#33f', padding: '5px'}}/>
                  <label>Energia</label> <input type="range" min="0" max="100" value={player.energia} onChange={e => setPlayer({...player, energia: parseInt(e.target.value)})} />
                  
                  <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>// ATRIBUTOS RPG</h4>
                  <label>Força ({player.forca})</label> <input type="range" min="0" max="100" value={player.forca} onChange={e => setPlayer({...player, forca: parseInt(e.target.value)})} />
                  <label>Inteligência ({player.inteligencia})</label> <input type="range" min="0" max="100" value={player.inteligencia} onChange={e => setPlayer({...player, inteligencia: parseInt(e.target.value)})} />
                  <label>Carisma ({player.carisma})</label> <input type="range" min="0" max="100" value={player.carisma} onChange={e => setPlayer({...player, carisma: parseInt(e.target.value)})} />
                  <label>Reflexo ({player.reflexo})</label> <input type="range" min="0" max="100" value={player.reflexo} onChange={e => setPlayer({...player, reflexo: parseInt(e.target.value)})} />
                  <label>Resistência ({player.resistencia})</label> <input type="range" min="0" max="100" value={player.resistencia} onChange={e => setPlayer({...player, resistencia: parseInt(e.target.value)})} />

                  {/* MODIFICADOR DE NPCs */}
                  <h4 style={{borderBottom: '1px solid #33f', margin: '10px 0 5px 0'}}>// MANIPULAR ATRIBUTOS DE NPCs</h4>
                  {contatosNPCs.length === 0 ? <span style={{color: '#666'}}>Sem NPCs.</span> : contatosNPCs.map(npc => (
                    <div key={npc.id} style={{backgroundColor: '#111', padding: '8px', borderLeft: '2px solid #33f', marginBottom: '5px'}}>
                      <strong style={{color: '#fff'}}>{npc.nome}</strong><br/>
                      
                      <label>Afeto ({npc.afeto})</label>
                      <input type="range" min="0" max="100" value={npc.afeto} onChange={e => atualizarNPC(npc.id, {afeto: parseInt(e.target.value)})} style={{width: '100%'}}/>
                      
                      <label>Libido ({npc.libido})</label>
                      <input type="range" min="0" max="100" value={npc.libido} onChange={e => atualizarNPC(npc.id, {libido: parseInt(e.target.value)})} style={{width: '100%'}}/>
                      
                      <label>Sensibilidade ({npc.sensibilidade})</label>
                      <input type="range" min="0" max="100" value={npc.sensibilidade} onChange={e => atualizarNPC(npc.id, {sensibilidade: parseInt(e.target.value)})} style={{width: '100%'}}/>
                    </div>
                  ))}

                  <button onClick={() => setPlayer({...player, energia: 100})} style={{backgroundColor: '#33f', color: '#000', marginTop: '15px', padding: '10px'}}>REFILL ENERGY</button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}