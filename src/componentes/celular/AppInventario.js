import React, { useState } from 'react';
import { descricaoGravidez } from '../../utils/reproductionSystem';

export default function AppInventario({ player, mundo, voltarHome }) {
  const [abaAtiva, setAbaAtiva] = useState("assets");

  const tabStyle = { padding: '8px', backgroundColor: '#1e293b', border: 'none', color: '#fff', cursor: 'pointer', flex: 1, marginRight: '4px', borderRadius: '6px' };
  const tabAtivaStyle = { ...tabStyle, backgroundColor: '#3b82f6' };

  const itemStyle = { backgroundColor: '#0f172a', padding: '10px', marginBottom: '8px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ABAS */}
      <div style={{ display: 'flex', gap: '4px', padding: '10px', borderBottom: '1px solid #1e293b' }}>
        <button onClick={() => setAbaAtiva("assets")} style={abaAtiva === "assets" ? tabAtivaStyle : tabStyle}>
          🏠 Assets
        </button>
        <button onClick={() => setAbaAtiva("items")} style={abaAtiva === "items" ? tabAtivaStyle : tabStyle}>
          📦 Itens
        </button>
        <button onClick={() => setAbaAtiva("status")} style={abaAtiva === "status" ? tabAtivaStyle : tabStyle}>
          💓 Status
        </button>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
        {/* ABA ASSETS */}
        {abaAtiva === "assets" && (
          <div>
            <h3 style={{ color: '#60a5fa', marginTop: 0 }}>🏡 Imóveis</h3>
            {player.inventario?.imoveis && player.inventario.imoveis.length > 0 ? (
              player.inventario.imoveis.map((imovel, idx) => (
                <div key={idx} style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>{imovel.nome}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Qualidade: {'⭐'.repeat(imovel.qualidade)} | Valor: ${imovel.preco.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                ❌ Nenhum imóvel. Procure uma imobiliária para comprar uma casa ou apartamento.
              </div>
            )}

            <h3 style={{ color: '#60a5fa', marginTop: '20px' }}>🚗 Veículos</h3>
            {player.inventario?.veiculos && player.inventario.veiculos.length > 0 ? (
              player.inventario.veiculos.map((veiculo, idx) => (
                <div key={idx} style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>{veiculo.nome}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Velocidade: {veiculo.velocidade}x | Combustível: {veiculo.combustivel_atual}% | Valor: ${veiculo.preco.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                ❌ Nenhum veículo. Procure uma concessionária para comprar um carro ou moto.
              </div>
            )}

            <h3 style={{ color: '#60a5fa', marginTop: '20px' }}>💰 Balanço Financeiro</h3>
            <div style={itemStyle}>
              <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px' }}>
                Dinheiro em mãos: ${player.dinheiro.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                Total em Ativos: ${(player.inventario?.imoveis?.reduce((sum, i) => sum + i.preco, 0) || 0) + 
                  (player.inventario?.veiculos?.reduce((sum, v) => sum + v.preco, 0) || 0).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* ABA ITENS */}
        {abaAtiva === "items" && (
          <div>
            <h3 style={{ color: '#60a5fa', marginTop: 0 }}>📦 Inventário de Itens</h3>
            {player.inventario?.itens && player.inventario.itens.length > 0 ? (
              player.inventario.itens.map((item, idx) => (
                <div key={idx} style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>
                    {item.nome} {item.quantidade ? `(x${item.quantidade})` : ''}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Preço: ${item.preco} | Tipo: {item.tipo}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                📭 Inventário vazio. Visite lojas para comprar itens (preservativos, roupas, etc).
              </div>
            )}
          </div>
        )}

        {/* ABA STATUS */}
        {abaAtiva === "status" && (
          <div>
            <h3 style={{ color: '#60a5fa', marginTop: 0 }}>💓 Status de Reprodução</h3>
            
            {player.genero === "Mulher" ? (
              <>
                <div style={itemStyle}>
                  <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                    Status: {descricaoGravidez(player.dadosReproductivos)}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>Virgindade</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {player.dadosReproductivos?.virgem ? '✨ Ainda virgem' : '✅ Já iniciou atividade sexual'}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>Contraceptivo Ativo</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {player.dadosReproductivos?.contraceptivoAtivo || 'Nenhum'}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>Filhos</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Total: {player.dadosReproductivos?.numeroFilhos || 0}
                  </div>
                </div>

                {player.dadosReproductivos?.statusGravidez !== 0 && (
                  <div style={{ ...itemStyle, borderLeftColor: '#ec4899' }}>
                    <div style={{ color: '#ec4899', fontWeight: 'bold' }}>⚠️ Gravidez Ativa</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      Semanas: {Math.floor(player.dadosReproductivos.semanasGravidez)} | Data estimada do parto: em breve
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ color: '#64748b', fontSize: '13px' }}>
                ℹ️ Você não é mulher. Status de gravidez não se aplica.
              </div>
            )}

            <h3 style={{ color: '#60a5fa', marginTop: '20px' }}>📊 Habilidades Sexuais</h3>
            <div style={itemStyle}>
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>
                Perícia Sexual: {player.periciaSexual || 15}/100
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0f172a', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${((player.periciaSexual || 15) / 100) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#ec4899',
                  transition: '0.3s'
                }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={voltarHome}
        style={{
          backgroundColor: '#334155',
          border: 'none',
          color: '#fff',
          padding: '12px',
          borderRadius: '6px',
          cursor: 'pointer',
          margin: '10px',
          fontWeight: 'bold'
        }}
      >
        ← Voltar ao Home
      </button>
    </div>
  );
}