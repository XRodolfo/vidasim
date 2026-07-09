import React, { useState } from 'react';
import Avatar from './Avatar';

export default function ModalEncontro({ player, npc, mundo, setContatosNPCs, onClose }) {
  const [etapa, setEtapa] = useState("inicio"); // inicio, sucesso, rejeicao
  const [mensagem, setMensagem] = useState("");

  const tentarAproximacao = (tipo) => {
    let sucesso = false;
    let textoResultado = "";
    
    // Matemática do Charme
    const rolagemCarisma = player.carisma + Math.floor(Math.random() * 40); // Carisma + Fator Sorte (0 a 40)
    
    if (tipo === "amigavel") {
       // Abordagem amigável é mais fácil
       sucesso = rolagemCarisma > 30;
       textoResultado = sucesso 
         ? `Você se apresentou educadamente. ${npc.nome} foi super simpático(a) e te passou o contato do Lume!` 
         : `${npc.nome} estava com pressa e mal olhou na sua cara.`;
    } 
    else if (tipo === "flerte") {
       // Abordagem romântica/ousada
       const comprometido = ["Casado(a)", "Numa relação"].includes(npc.estadoCivil);
       
       if (comprometido) {
          // Se for comprometido, a fidelidade age como um escudo gigante
          const escudoFidelidade = (npc.fidelidade || 50) + 40; // Muito difícil
          if (rolagemCarisma >= escudoFidelidade) {
             sucesso = true;
             textoResultado = `Inacreditável! Seu charme quebrou as defesas de ${npc.nome}. "Eu sou ${npc.estadoCivil}, mas... você tem um jeito especial. Pega meu número."`;
          } else {
             sucesso = false;
             textoResultado = `"Você está louco(a)? Eu sou ${npc.estadoCivil}! Me deixa em paz!" - Você tomou um fora monumental.`;
          }
       } else {
          // Se for solteiro, é mais fácil, mas ainda exige algum carisma
          if (rolagemCarisma > 50) {
             sucesso = true;
             textoResultado = `${npc.nome} corou com o seu xaveco. "Gostei da sua atitude. Me chama no Lume depois."`;
          } else {
             sucesso = false;
             textoResultado = `"Acho que não fazemos o tipo um do outro..." - Que constrangedor.`;
          }
       }
    }

    setMensagem(textoResultado);
    setEtapa(sucesso ? "sucesso" : "rejeicao");

    // Se teve sucesso, adiciona aos contatos
    if (sucesso) {
       setContatosNPCs(prev => [...prev, npc]);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '20px' }}>
      <div style={{ backgroundColor: '#1e293b', border: '2px solid #38bdf8', borderRadius: '15px', padding: '20px', maxWidth: '400px', width: '100%', color: '#fff', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
        
        {etapa === "inicio" ? (
          <>
            <h2 style={{ color: '#f1c40f', margin: '0 0 15px 0' }}>Surpresa! 🚶‍♂️</h2>
            <p style={{ fontSize: '14px', marginBottom: '20px', color: '#cbd5e1' }}>Enquanto andava por aqui, você esbarrou em alguém interessante...</p>
            
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #38bdf8', overflow: 'hidden', margin: '0 auto 15px auto', backgroundColor: '#ececec' }}>
               <div style={{ transform: 'scale(1.5)', transformOrigin: 'top center', width: '100%', height: '100%' }}><Avatar player={npc} mundo={mundo} /></div>
            </div>
            
            <h3 style={{ margin: '0 0 5px 0' }}>{npc.nome}, {npc.idade}</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Parece ser {npc.profissao}. Status Oculto: {npc.estadoCivil}.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               <button onClick={() => tentarAproximacao("amigavel")} style={{ ...btnAcao, backgroundColor: '#0ea5e9' }}>👋 Puxar Papo Amigável</button>
               <button onClick={() => tentarAproximacao("flerte")} style={{ ...btnAcao, backgroundColor: '#fb7185' }}>😏 Dar em cima (Usar Carisma)</button>
               <button onClick={onClose} style={{ ...btnAcao, backgroundColor: '#475569' }}>🚶 Ignorar e seguir em frente</button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: etapa === "sucesso" ? '#2ed573' : '#ff4757' }}>{etapa === "sucesso" ? "Sucesso!" : "Rejeição..."}</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.5', margin: '20px 0' }}>{mensagem}</p>
            <button onClick={onClose} style={{ ...btnAcao, backgroundColor: '#38bdf8' }}>Continuar</button>
          </>
        )}

      </div>
    </div>
  );
}

const btnAcao = { color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' };