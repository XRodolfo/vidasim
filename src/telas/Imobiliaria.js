import React, { useState } from 'react';
import { comprarImovel, tiposImoveis } from '../utils/inventorySystem';

export default function Imobiliaria({ player, setPlayer, setTelaAtual }) {
  const [msg, setMsg] = useState("Invista no seu teto. Deixe de pagar aluguel e melhore o seu conforto.");

  const comprar = (chaveImovel, imovel) => {
    const imoveisExistentes = player.inventario?.imoveis || [];
    if (imoveisExistentes.some(im => im.nome === imovel.nome)) { 
      setMsg("⚠️ Este imóvel já consta nas suas escrituras imobiliárias!"); 
      return; 
    }
    if (player.dinheiro < imovel.preco) { 
      setMsg("❌ Crédito negado por fundos insuficientes."); 
      return; 
    }

    // Passamos a CHAVE exata do dicionário (ex: 'casa_pequena')
    const resultado = comprarImovel(player.inventario, chaveImovel, player);
    
    if (resultado.erro) {
      setMsg(`Erro: ${resultado.erro}`);
    } else {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - resultado.dinheiroPago,
        inventario: {
          ...prev.inventario,
          imoveis: [...(prev.inventario?.imoveis || []), resultado.imovel]
        }
      }));
      setMsg(`🎉 Escritura assinada! Você é o dono oficial de: ${imovel.nome}.`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
        <h2>🏢 Imobiliária Global Home</h2>
        <p style={{ color: '#2ed573', fontWeight: 'bold', fontSize: '18px' }}>💰 Carteira Atual: ${player.dinheiro?.toLocaleString()}</p>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', margin: '15px 0', borderLeft: '4px solid #3b82f6' }}>
          {msg}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
          {Object.keys(tiposImoveis).map(chave => {
            const i = tiposImoveis[chave];
            const jaTenho = (player.inventario?.imoveis || []).some(im => im.nome === i.nome);
            return (
              <div key={chave} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', border: jaTenho ? '1px solid #10b981' : '1px solid #334155' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: jaTenho ? '#10b981' : '#fff' }}>
                    {jaTenho ? '✅ [ADQUIRIDO] ' : '🏡 '}{i.nome}
                  </strong><br/>
                  <small style={{ color: '#94a3b8' }}>{i.descricao}</small><br/>
                  <small style={{ color: '#60a5fa' }}>Qualidade: {'⭐'.repeat(i.qualidade)} | Cap: {i.capacidade_pessoas} pessoas</small>
                </div>
                {!jaTenho && (
                  <button onClick={() => comprar(chave, i)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', minWidth: '130px' }}>
                    Comprar [${i.preco.toLocaleString()}]
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