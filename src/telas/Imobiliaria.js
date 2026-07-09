import React, { useState } from 'react';

export default function Imobiliaria({ player, setPlayer, setTelaAtual }) {
  const [msg, setMsg] = useState("Invista no seu teto. Deixe de pagar aluguel.");

  const imoveis = [
    { id: 'kitnet', nome: '🏢 Loft Studio Centro', preco: 65000, luxo: 'Simples' },
    { id: 'casa', nome: '🏡 Casa em Condomínio Fechado', preco: 180000, luxo: 'Alto' },
    { id: 'mansao', nome: '🏰 Mansão Vista Mar Premium', preco: 850000, luxo: 'Extremo' }
  ];

  const comprar = (i) => {
    const casas = player.propriedades || [];
    if (casas.includes(i.id)) { setMsg("Este imóvel já consta em suas escrituras imobiliárias!"); return; }
    if (player.dinheiro < i.preco) { setMsg("Crédito negado por fundos insuficientes."); return; }

    setPlayer({
      ...player,
      dinheiro: player.dinheiro - i.preco,
      propriedades: [...casas, i.id]
    });
    setMsg(`🎉 Escritura assinada! Você é o dono oficial de: ${i.nome}.`);
  };

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#0f172a', color: '#fff' }}>
        <h2>🏢 Imobiliária Global Home</h2>
        <p style={{ color: '#2ed573' }}>Carteira: ${player.dinheiro}</p>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', margin: '15px 0' }}>{msg}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {imoveis.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px' }}>
              <div><strong>{i.nome}</strong><br/><small style={{ color: '#94a3b8' }}>Padrão: Nível de Luxo {i.luxo}</small></div>
              <button onClick={() => comprar(i)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Adquirir [${i.preco}]</button>
            </div>
          ))}
        </div>
        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', backgroundColor: '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Voltar ao Mapa</button>
      </div>
    </div>
  );
}