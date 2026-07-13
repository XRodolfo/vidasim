import React from 'react';

export default function Mapa({ player, setTelaAtual, avancarTempo }) {
  const irPara = (tela, tempo = 15, energia = 5) => {
    if (player.energia < energia && !player.godMode) {
      alert("Estás demasiado exausto para te deslocares! Vai dormir ou descansar.");
      return;
    }
    if (avancarTempo) avancarTempo(tempo, energia);
    setTelaAtual(tela);
  };

  return (
    <div className="mapa-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
      <h2 style={{ borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>🗺️ Mapa da Cidade: {player.config?.nome || "Metrópole"}</h2>
      <p style={{ fontStyle: 'italic', color: '#ccc' }}>Seleciona o teu destino. Deslocações consomem tempo e um pouco de energia.</p>

      {/* ZONA RESIDENCIAL */}
      <div className="setor-mapa" style={{ backgroundColor: '#1e272e', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#00d2d3' }}>🏡 Zona Residencial & Pessoal</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button onClick={() => irPara('quarto', 10, 2)} style={btnStyle}>🏠 A Minha Casa</button>
          <button onClick={() => irPara('imobiliaria', 20, 5)} style={btnStyle}>🏢 Imobiliária (Comprar Casas)</button>
          <button onClick={() => irPara('academia', 15, 5)} style={btnStyle}>🏋️ Academia de Treino</button>
          <button onClick={() => irPara('motel', 20, 5)} style={btnStyle}>🏩 Motel (Encontros)</button>
        </div>
      </div>

      {/* SHOPPING CENTER */}
      <div className="setor-mapa" style={{ backgroundColor: '#1e272e', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#ff9f43' }}>🛍️ Shopping Center (Centro Comercial)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button onClick={() => irPara('centroComercial', 15, 5)} style={{ ...btnStyle, backgroundColor: '#e67e22', fontWeight: 'bold' }}>
            🏬 Entrar no Shopping (Lojas, Alimentação & Empregos)
          </button>
        </div>
      </div>

      {/* DISTRITO COMERCIAL */}
      <div className="setor-mapa" style={{ backgroundColor: '#1e272e', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#54a0ff' }}>🏢 Distrito Comercial & Cívico</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button onClick={() => irPara('distritoComercial', 20, 5)} style={{ ...btnStyle, backgroundColor: '#2e86de', fontWeight: 'bold' }}>
            🏛️ Aceder ao Centro Cívico (Hospital, Advocacia, Prefeitura & Corporativo)
          </button>
        </div>
      </div>

      {/* VIDA NOTURNA E RED LIGHT */}
      <div className="setor-mapa" style={{ backgroundColor: '#2c001e', padding: '15px', borderRadius: '10px', border: '1px solid #ff007f' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#ff007f' }}>🍸 Distrito Noturno & Área de Diversão (Red Light)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button onClick={() => irPara('distritoNoturno', 20, 5)} style={{ ...btnStyle, backgroundColor: '#833471', fontWeight: 'bold', color: '#fff' }}>
            💋 Entrar na Vida Noturna (Boates, Strip Club, Negócios & Mercado Paralelo)
          </button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '12px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#353b48',
  color: 'white',
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '14px',
  transition: '0.2s'
};