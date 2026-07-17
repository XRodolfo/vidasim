import React, { useState } from 'react';
import { categoriasHotel } from '../utils/hotelSystem';

export default function HotelSelector({ player, setPlayer, setTelaAtual, setParceiroMotel, setHotelCategoria, npc }) {
  const [selectedHotel, setSelectedHotel] = useState("3");

  const aluguelHotel = () => {
    const custo = categoriasHotel[selectedHotel].preco_noite;
    
    if (player.dinheiro < custo) {
      alert(`❌ Dinheiro insuficiente! Você precisa de $${custo} mas tem apenas $${player.dinheiro}`);
      return;
    }

    // Deduz dinheiro
    setPlayer(p => ({ ...p, dinheiro: p.dinheiro - custo }));
    
    // Salva categoria do hotel
    if (setHotelCategoria) setHotelCategoria(selectedHotel);
    
    if (npc) {
      // Vai para o diálogo de contraceptivo antes do motel
      setTelaAtual("contraceptivoDialog");
    } else {
      // Hospedagem solo, vai direto para o hotel
      setTelaAtual("motel");
    }
  };

  const hotelAtualsizeSelecionado = categoriasHotel[selectedHotel];

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#090514', color: '#fff', borderColor: '#ec4899', minHeight: '550px' }}>
        <h1 style={{ color: '#ec4899', textShadow: '0 0 10px #ec4899', textAlign: 'center', marginBottom: '20px' }}>
          🏩 Seleção de Hotel/Motel
        </h1>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#cbd5e1', marginBottom: '20px' }}>
          Escolha a categoria de hotel. Quanto melhor a qualidade, mais bônus de intimação você ganha!
        </p>

        {/* GRADE DE HOTÉIS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {Object.entries(categoriasHotel).map(([key, hotel]) => (
            <div
              key={key}
              onClick={() => setSelectedHotel(key)}
              style={{
                padding: '15px',
                backgroundColor: selectedHotel === key ? '#334155' : '#1e293b',
                border: selectedHotel === key ? '2px solid #60a5fa' : '1px solid #475569',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: '0.2s',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>
                {'⭐'.repeat(hotel.qualidade)}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#60a5fa' }}>
                {hotel.nome}
              </div>
              <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '6px' }}>
                ${hotel.preco_noite}/noite
              </div>
              <div style={{ fontSize: '10px', color: '#a78bfa', marginTop: '4px' }}>
                +{hotel.bonusIntimaçãoMaxima} bônus
              </div>
            </div>
          ))}
        </div>

        {/* DETALHES DO HOTEL SELECIONADO */}
        <div style={{
          backgroundColor: '#0f172a',
          border: '2px solid #ec4899',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#ec4899', marginTop: 0, marginBottom: '10px' }}>
            📋 {hotelAtualsizeSelecionado.nome}
          </h3>

          <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '8px 0' }}>
            {hotelAtualsizeSelecionado.descricao}
          </p>

          <div style={{ fontSize: '12px', color: '#94a3b8', margin: '10px 0' }}>
            <strong>🏨 Amenidades:</strong>
            <ul style={{ margin: '6px 0', paddingLeft: '20px', fontSize: '11px' }}>
              {hotelAtualsizeSelecionado.amenidades?.map((am, idx) => (
                <li key={idx}>{am}</li>
              ))}
            </ul>
          </div>

          <div style={{
            backgroundColor: '#1e293b',
            padding: '10px',
            borderRadius: '6px',
            marginTop: '10px',
            fontSize: '12px'
          }}>
            <div style={{ color: '#10b981' }}>
              ✅ Bônus de Intimação: +{hotelAtualsizeSelecionado.bonusIntimaçãoMaxima} ao prazer
            </div>
            <div style={{ color: '#fbbf24', marginTop: '6px' }}>
              💰 Custo: ${hotelAtualsizeSelecionado.preco_noite} por noite
            </div>
          </div>
        </div>

        {/* AVISO DE DINHEIRO */}
        {player.dinheiro < hotelAtualsizeSelecionado.preco_noite && (
          <div style={{
            backgroundColor: '#7f1d1d',
            border: '1px solid #dc2626',
            color: '#fca5a5',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '12px'
          }}>
            ⚠️ Dinheiro insuficiente! Você precisa de ${hotelAtualsizeSelecionado.preco_noite} mas tem apenas ${player.dinheiro}
          </div>
        )}

        {/* BOTÕES */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => setTelaAtual("mapa")}
            style={{
              backgroundColor: '#475569',
              border: 'none',
              color: '#fff',
              padding: '12px 30px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}
          >
            ← Voltar ao Mapa
          </button>

          <button
            onClick={aluguelHotel}
            disabled={player.dinheiro < hotelAtualsizeSelecionado.preco_noite}
            style={{
              backgroundColor: player.dinheiro < hotelAtualsizeSelecionado.preco_noite ? '#64748b' : '#ec4899',
              border: 'none',
              color: '#fff',
              padding: '12px 30px',
              borderRadius: '6px',
              cursor: player.dinheiro < hotelAtualsizeSelecionado.preco_noite ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              opacity: player.dinheiro < hotelAtualsizeSelecionado.preco_noite ? 0.6 : 1
            }}
          >
            🏩 Alugar Suíte
          </button>
        </div>
      </div>
    </div>
  );
}
