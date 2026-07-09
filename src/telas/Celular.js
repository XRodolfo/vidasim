import React, { useState } from 'react';
import Avatar from '../componentes/Avatar';

export default function Celular({ 
  player, 
  setPlayer, 
  mundo, 
  t, 
  contatosNPCs, 
  setContatosNPCs, 
  buscarNovoContato, 
  avancarTempo, 
  setTelaAtual, 
  setParceiroMotel 
}) {
  // Abas do Smartphone: 'lista', 'lume' (tinder), 'chat' (conversa aberta)
  const [abaCelular, setAbaCelular] = useState('lista');
  const [npcAtivo, setNpcAtivo] = useState(null);
  const [historicoChat, setHistoricoChat] = useState([]);

  // Abrir o chat com um NPC específico
  const abrirConversa = (npc) => {
    setNpcAtivo(npc);
    setAbaCelular('chat');
    setHistoricoChat([
      { emissor: 'npc', texto: `Oi ${player.nome}! Tudo bem?` }
    ]);
  };

  // Ações de Interação dentro do Chat
  const interagirComNPC = (tipo) => {
    if (!avancarTempo(1, 5)) return; // Gasta 1 hora e 5 de energia por ação

    setContatosNPCs(prevNPCs => prevNPCs.map(n => {
      if (n.id === npcAtivo.id) {
        let nModificado = { ...n };
        let textoResposta = "";

        if (tipo === 'conversar') {
          nModificado.afeto = Math.min(100, (nModificado.afeto || 10) + 15);
          textoResposta = "Adorei conversar contigo! Senti que nos aproximamos mais.";
        } 
        else if (tipo === 'elogiar') {
          const sucesso = Math.random() * 100 < (player.carisma + 20);
          if (sucesso) {
            nModificado.afeto = Math.min(100, (nModificado.afeto || 10) + 20);
            textoResposta = "Nossa, que fofo(a)! Fiquei até sem graça... Obrigado(a)! 😊";
          } else {
            nModificado.afeto = Math.max(0, (nModificado.afeto || 10) - 10);
            textoResposta = "Achei esse comentário um pouco estranho... Por favor, não força.";
          }
        }
        else if (tipo === 'encontro') {
          if ((nModificado.afeto || 0) >= 40) {
            nModificado.afeto = Math.min(100, nModificado.afeto + 10);
            textoResposta = "Claro! Vamos sair sim! Que tal irmos a um lugar legal?";
          } else {
            textoResposta = "Acho que ainda é cedo para sairmos sozinhos. Precisamos nos conhecer melhor.";
          }
        }

        // Atualiza o NPC na tela ativa de Chat instantaneamente
        setNpcAtivo(nModificado);
        setHistoricoChat(h => [...h, { emissor: 'npc', texto: textoResposta }]);
        return nModificado;
      }
      return n;
    }));
  };

  // Gatilho para levar o NPC selecionado para a tela de Motel externa
  const convidarParaOMotel = () => {
    if ((npcAtivo.afeto || 0) >= 60) {
      setParceiroMotel(npcAtivo);
      setTelaAtual("motel");
    } else {
      alert(`${npcAtivo.nome} achou o convite muito apressado e recusou! Melhore o afeto primeiro.`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#fff' }}>
      
      {/* CABEÇALHO DO TELEFONE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        <h1 style={{ margin: 0, color: '#f1c40f', fontSize: '24px' }}>📱 Smartphone</h1>
        <button onClick={() => setTelaAtual("quarto")} style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }}>
          Fechar Telefone
        </button>
      </div>

      {/* TELA CENTRAL DO SMARTPHONE (DESIGN ESCURO INTEGRADO) */}
      <div style={{ backgroundColor: '#1a1a24', borderRadius: '15px', border: '3px solid #2b2b36', minHeight: '550px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* BARRA DE REDE / STATUS DO SISTEMA */}
        <div style={{ backgroundColor: '#111', padding: '6px 15px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', color: '#888' }}>
          <span>📶 Lume Network</span>
          <span>⚡ Bateria 100%</span>
        </div>

        {/* ================= CONTENEDOR DE APLICATIVOS ================= */}
        <div style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column' }}>
          
          {/* ABA 1: LISTA DE CONTATOS / WHATSAPP */}
          {abaCelular === 'lista' && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '18px', margin: 0, color: '#2ed573' }}>Mensagens Recentes</h2>
                <button onClick={buscarNovoContato} style={{ backgroundColor: '#2ed573', color: '#000', border: 'none', padding: '6px 12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
                  🔍 Buscar Pessoas Próximas (-1h)
                </button>
              </div>

              {/* Lista com Estilo Escuro Linha por Linha original */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {contatosNPCs.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center', marginTop: '40px' }}>Nenhuma conversa ativa no momento.</p>
                ) : (
                  contatosNPCs.map(npc => (
                    <div 
                      key={npc.id} 
                      style={{ display: 'flex', backgroundColor: '#22222b', padding: '10px 15px', borderRadius: '8px', alignItems: 'center', gap: '15px', borderLeft: '4px solid #f1c40f' }}
                    >
                      {/* Avatar Redondo Miniatura */}
                      <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ececec', flexShrink: 0 }}>
                        <div style={{ transform: 'scale(1.7)', transformOrigin: 'top center', marginTop: '-2px', width: '100%', height: '100%' }}>
                          <Avatar player={npc} mundo={mundo} />
                        </div>
                      </div>

                      {/* Informações Compactas Tradicionais */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{npc.nome}</span>
                          <span style={{ color: '#888', fontSize: '12px' }}>({npc.idade} anos)</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', marginTop: '3px' }}>
                          <span style={{ color: '#eccc68' }}>💼 {npc.profissao || "Desempregado(a)"}</span>
                          <span style={{ color: '#7bed9f' }}>❤️ Afeto: {npc.afeto || 10}%</span>
                          <span style={{ color: '#ff7f50' }}>🧬 {npc.etnia || "Mista"}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => abrirConversa(npc)}
                        style={{ backgroundColor: '#3498db', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                      >
                        💬 Abrir Chat
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ABA 2: INTERAÇÃO DE CHAT ATIVO (A antiga mecânica de escolhas de volta!) */}
          {abaCelular === 'chat' && npcAtivo && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              
              {/* Barra de Topo do Contato */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#111', padding: '10px', borderRadius: '6px', marginBottom: '15px' }}>
                <button onClick={() => setAbaCelular('lista')} style={{ backgroundColor: '#444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>⬅ Voltar</button>
                
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ececec' }}>
                  <div style={{ transform: 'scale(1.7)', transformOrigin: 'top center', marginTop: '-2px', width: '100%', height: '100%' }}>
                    <Avatar player={npcAtivo} mundo={mundo} />
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{npcAtivo.nome}</div>
                  <div style={{ fontSize: '11px', color: '#7bed9f' }}>❤️ Nível de Relacionamento: {npcAtivo.afeto || 10}%</div>
                </div>
              </div>

              {/* Corpo da Biografia e Atributos Técnicos Solicitados */}
              <div style={{ backgroundColor: '#22222b', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px', border: '1px solid #333' }}>
                <div style={{ color: '#f1c40f', fontWeight: 'bold', marginBottom: '4px' }}>📋 Ficha Biológica e Perfil:</div>
                <p style={{ margin: '0 0 8px 0', fontStyle: 'italic', color: '#bbb' }}>"{npcAtivo.bio}"</p>
                <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '12px' }}>
                  <span>📏 Altura: {npcAtivo.altura} cm</span>
                  <span>⚖️ Peso: {npcAtivo.peso} kg</span>
                  {npcAtivo.genero === "Mulher" ? <span>🍒 Seios: {npcAtivo.seios_cm} cm</span> : <span>🍆 Atributo: {npcAtivo.penis_cm} cm</span>}
                </div>
              </div>

              {/* Caixa de Histórico de Mensagens Visual */}
              <div style={{ flex: 1, backgroundColor: '#111', borderRadius: '6px', padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '120px', marginBottom: '15px' }}>
                {historicoChat.map((msg, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      alignSelf: msg.emissor === 'player' ? 'flex-end' : 'flex-start',
                      backgroundColor: msg.emissor === 'player' ? '#2ed573' : '#2b2b36',
                      color: msg.emissor === 'player' ? '#000' : '#fff',
                      padding: '8px 12px', borderRadius: '10px', maxWidth: '80%', fontSize: '13px'
                    }}
                  >
                    {msg.texto}
                  </div>
                ))}
              </div>

              {/* PAINEL DE AÇÕES E ENCONTROS (A estrutura antiga resgatada) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => {
                  setHistoricoChat(h => [...h, { emissor: 'player', texto: "E aí, o que está fazendo de bom?" }]);
                  interagirComNPC('conversar');
                }} style={btnAcaoChat}>💬 Conversar (-1h)</button>

                <button onClick={() => {
                  setHistoricoChat(h => [...h, { emissor: 'player', texto: "Você está muito lindo(a) hoje, sabia?" }]);
                  interagirComNPC('elogiar');
                }} style={btnAcaoChat}>✨ Enviar Elogio (-1h)</button>

                <button onClick={() => {
                  setHistoricoChat(h => [...h, { emissor: 'player', texto: "Topa sair comigo para um encontro qualquer dia desses?" }]);
                  interagirComNPC('encontro');
                }} style={btnAcaoChat}>🌹 Convidar para Encontro</button>

                <button 
                  onClick={convidarParaOMotel} 
                  style={{ ...btnAcaoChat, backgroundColor: '#ff4757', color: 'white' }}
                >
                  🔥 Convidar para o Motel (Requer 60% Afeto)
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Estilos de Botão Escuros e limpos para o Smartphone
const btnAcaoChat = {
  backgroundColor: '#2b2b36',
  color: '#fff',
  border: '1px solid #444',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px',
  textAlign: 'center'
};