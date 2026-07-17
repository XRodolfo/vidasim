import React, { useState } from 'react';
import { comprarItem, tiposItens } from '../utils/inventorySystem';

export default function Loja({ player, setPlayer, setTelaAtual }) {
  const [msg, setMsg] = useState("Bem-vindo à Loja de Conveniência. Abasteça-se de itens essenciais.");

  const efetuarCompra = (chaveItem) => {
    const resultado = comprarItem(player.inventario, chaveItem, player);
    
    if (resultado.erro) {
      setMsg(`❌ ${resultado.erro}`);
    } else {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - resultado.dinheiroPago,
        inventario: {
          ...prev.inventario,
          itens: [...prev.inventario.itens]
        }
      }));
      setMsg(`🎉 Compra efetuada: ${resultado.item.nome}!`);
    }
  };

  const todasSecoes = [
    { titulo: "🧴 Consumíveis", itens: tiposItens.consumiveis },
    { titulo: "👗 Roupas & Acessórios", itens: tiposItens.roupas }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
        <h2 style={{ color: '#60a5fa', textShadow: '0 0 8px rgba(96,165,250,0.5)', marginTop: 0 }}>🏪 Loja de Conveniência & Variedades</h2>
        <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>💰 Seu dinheiro: ${player.dinheiro?.toLocaleString()}</p>
        
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', margin: '15px 0', borderLeft: '4px solid #10b981', fontSize: '13px' }}>
          {msg}
        </div>

        {todasSecoes.map(secao => (
          <div key={secao.titulo} style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#60a5fa', borderBottom: '1px solid #334155', paddingBottom: '5px' }}>{secao.titulo}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(secao.itens).map(([chave, item]) => {
                const itemNoInventario = player.inventario?.itens?.find(i => i.id === item.id);
                const quantidade = itemNoInventario ? itemNoInventario.quantidade : 0;
                
                return (
                  <div key={chave} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div>
                      <strong style={{ fontSize: '15px' }}>{item.nome}</strong>
                      <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '10px' }}>
                        {quantidade > 0 ? `(Possui: ${quantidade})` : '(Nenhum)'}
                      </span>
                      <br />
                      <small style={{ color: '#a78bfa', fontSize: '11px' }}>Efeito: {item.efeito}</small>
                    </div>
                    <button 
                      onClick={() => efetuarCompra(chave)} 
                      disabled={player.dinheiro < item.preco}
                      style={{ 
                        backgroundColor: player.dinheiro < item.preco ? '#475569' : '#10b981', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '8px 15px', 
                        borderRadius: '5px', 
                        fontWeight: 'bold', 
                        cursor: player.dinheiro < item.preco ? 'not-allowed' : 'pointer',
                        minWidth: '100px',
                        opacity: player.dinheiro < item.preco ? 0.6 : 1
                      }}
                    >
                      Comprar [${item.preco}]
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button onClick={() => setTelaAtual("centroComercial")} style={{ marginTop: '10px', backgroundColor: '#475569', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Shopping
        </button>
      </div>
    </div>
  );
}