import React, { useState } from 'react';
import { comprarVeiculo, tiposVeiculos } from '../utils/inventorySystem';

export default function LojaVeiculos({ player, setPlayer, setTelaAtual }) {
  const [msg, setMsg] = useState("Motores brilhando sob os refletores. Escolha a sua máquina.");

  const comprar = (chaveVeiculo, veiculo) => {
    const veiculosExistentes = player.inventario?.veiculos || [];
    if (veiculosExistentes.some(v => v.nome === veiculo.nome)) { 
      setMsg("⚠️ Você já possui as chaves deste modelo na sua garagem!"); 
      return; 
    }
    if (player.dinheiro < veiculo.preco) { 
      setMsg("❌ Saldo bancário insuficiente!"); 
      return; 
    }

    // Passamos a CHAVE exata do dicionário (ex: 'carro_esporte')
    const resultado = comprarVeiculo(player.inventario, chaveVeiculo, player);
    
    if (resultado.erro) {
      setMsg(`Erro: ${resultado.erro}`);
    } else {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - resultado.dinheiroPago,
        inventario: {
          ...prev.inventario,
          veiculos: [...(prev.inventario?.veiculos || []), resultado.veiculo]
        }
      }));
      setMsg(`🎉 Parabéns! Comprou o ${veiculo.nome}. Ele já está na sua garagem.`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
        <h2>🏎️ Concessionária HighDrive</h2>
        <p style={{ color: '#f1c40f', fontWeight: 'bold', fontSize: '18px' }}>💰 Seu saldo: ${player.dinheiro?.toLocaleString()}</p>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', margin: '15px 0', borderLeft: '4px solid #f1c40f' }}>
          {msg}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
          {Object.keys(tiposVeiculos).map(chave => {
            const v = tiposVeiculos[chave];
            const jaTenho = (player.inventario?.veiculos || []).some(veic => veic.nome === v.nome);
            return (
              <div key={chave} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', border: jaTenho ? '1px solid #10b981' : '1px solid #334155' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: jaTenho ? '#10b981' : '#fff' }}>
                    {jaTenho ? '✅ [GARAGEM] ' : '🚗 '}{v.nome}
                  </strong><br/>
                  <small style={{ color: '#94a3b8' }}>Combustível: {v.combustivel.toUpperCase()}</small><br/>
                  <small style={{ color: '#10b981' }}>Velocidade de Deslocamento: {v.velocidade}x</small>
                </div>
                {!jaTenho && (
                  <button onClick={() => comprar(chave, v)} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', minWidth: '130px' }}>
                    Comprar [${v.preco.toLocaleString()}]
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', backgroundColor: '#475569', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Mapa
        </button>
      </div>
    </div>
  );
}