import React, { useState } from 'react';
import { comprarVeiculo } from '../utils/inventorySystem';

export default function LojaVeiculos({ player, setPlayer, setTelaAtual }) {
  const [msg, setMsg] = useState("Motores brilhando sob os refletores. Escolha sua máquina.");
  
  const carros = [
    { id: 'scooter', nome: '🛵 Scooter Elétrica 125cc', preco: 4500, velocidade: 1.8 },
    { id: 'sedan', nome: '🚗 Sedan Executivo Importado', preco: 48000, velocidade: 3.0 },
    { id: 'esportivo', nome: '🏎️ Hiperesportivo V8 Turbo', preco: 250000, velocidade: 5.0 }
  ];

  const comprar = (c) => {
    const veiculosExistentes = player.inventario?.veiculos || [];
    if (veiculosExistentes.some(v => v.nome === c.nome)) { setMsg("Você já possui as chaves deste modelo!"); return; }
    if (player.dinheiro < c.preco) { setMsg("Saldo bancário insuficiente!"); return; }

    const resultado = comprarVeiculo(player.inventario, c.id, player);
    if (resultado.erro) {
      setMsg(resultado.erro);
    } else {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - resultado.dinheiroPago,
        inventario: {
          ...prev.inventario,
          veiculos: [...(prev.inventario?.veiculos || []), resultado.veiculo]
        }
      }));
      setMsg(`🎉 Parabéns! Comprou o ${c.nome}. Ele agora está na sua garagem.`);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#0f172a', color: '#fff' }}>
        <h2>🏎️ Concessionária HighDrive</h2>
        <p style={{ color: '#f1c40f' }}>Seu saldo: ${player.dinheiro}</p>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', margin: '15px 0' }}>{msg}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {carros.map(c => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px' }}>
              <div><strong>{c.nome}</strong><br/><small style={{ color: '#94a3b8' }}>Performance: Velocidade {c.vel}</small></div>
              <button onClick={() => comprar(c)} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Comprar [${c.preco}]</button>
            </div>
          ))}
        </div>
        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', backgroundColor: '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Voltar ao Mapa</button>
      </div>
    </div>
  );
}