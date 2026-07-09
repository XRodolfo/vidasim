import React, { useState } from 'react';

export default function Aeroporto({ player, setPlayer, mundo, avancarTempo, setTelaAtual }) {
  const [mensagem, setMensagem] = useState("Bem-vindo ao Aeroporto Internacional. Prepare o seu passaporte.");

  const comprarPassagem = (idDestino) => {
    // Cálculo do preço: Base de 300 + multiplicador de custo de vida da cidade de destino
    const precoPassagem = Math.floor(300 + (200 * mundo[idDestino].custo_vida));

    if (player.dinheiro < precoPassagem) {
      setMensagem(`❌ Você não tem $${precoPassagem} para viajar para ${mundo[idDestino].nome}.`);
      return;
    }

    if (!avancarTempo(6, 20)) {
      setMensagem("❌ Você está cansado demais para uma viagem longa. Vá dormir.");
      return;
    }

    // Processa a Viagem
    setPlayer({ 
       ...player, 
       cidade_id: idDestino, 
       dinheiro: player.dinheiro - precoPassagem 
    });
    
    setMensagem(`✈️ EMBARQUE CONFIRMADO! Você voou por 6 horas e acaba de desembarcar em ${mundo[idDestino].nome}!`);
  };

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
        <h1 style={{ borderBottom: '2px solid #0ea5e9', paddingBottom: '10px' }}>✈️ Aeroporto Internacional</h1>
        
        <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '5px solid #0ea5e9' }}>
          <p style={{ margin: 0, fontSize: '15px' }}>{mensagem}</p>
        </div>

        <h3 style={{ color: '#38bdf8' }}>Destinos Disponíveis (Voos Diretos)</h3>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>A viagem consome 6 horas do seu dia e 20 de energia.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {Object.keys(mundo).map(idDestino => {
            // Esconde a cidade onde o jogador já está
            if (idDestino === player.cidade_id) return null;

            const custoDestino = mundo[idDestino].custo_vida;
            const preco = Math.floor(300 + (200 * custoDestino));

            return (
              <div key={idDestino} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div>
                  <strong style={{ fontSize: '18px', color: '#f1c40f' }}>{mundo[idDestino].nome}</strong>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '5px' }}>
                    🌍 Cultura local: {mundo[idDestino].etnia} | 💵 Custo de Vida: {custoDestino}x
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#2ed573', fontWeight: 'bold', marginBottom: '8px' }}>Passagem: ${preco}</div>
                  <button 
                    onClick={() => comprarPassagem(idDestino)} 
                    style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Comprar Passagem
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '30px', backgroundColor: '#475569', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sair do Aeroporto
        </button>
      </div>
    </div>
  );
}