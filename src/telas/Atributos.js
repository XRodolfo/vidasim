import React from 'react';

export default function Atributos({ player, setPlayer, t, setTelaAtual, iniciarJogo }) {
  // Se o player for null/undefined, ele vai dar erro ao ler 'player.forca'
  if (!player) return <div>Carregando...</div>;
  
  const alterarAttr = (attr, valor) => {
    const diferenca = valor - player[attr];
    
    // Verifica se tem pontos suficientes para aumentar
    if (diferenca > 0 && player.pontosDisponiveis < diferenca) return;
    
    // Impede valores abaixo de 10 ou acima de 100
    if (valor < 10 || valor > 100) return;

    setPlayer(prev => ({
      ...prev,
      [attr]: valor,
      pontosDisponiveis: prev.pontosDisponiveis - diferenca
    }));
  };

  const attrs = [
    { key: 'forca', label: t.forca },
    { key: 'reflexo', label: t.reflexo },
    { key: 'inteligencia', label: t.inteligencia },
    { key: 'carisma', label: t.carisma },
    { key: 'resistencia', label: t.resistencia }
  ];

  return (
    <div className="container">
      <h2>Distribuição de Pontos ({player.pontosDisponiveis} restantes)</h2>
      <div className="card">
        {attrs.map(a => (
          <div key={a.key} style={{ marginBottom: '15px' }}>
            <label>{a.label}: {player[a.key]}</label>
            <input 
              type="range" min="10" max="100" 
              value={player[a.key]} 
              onChange={(e) => alterarAttr(a.key, parseInt(e.target.value))} 
            />
          </div>
        ))}
        <button onClick={iniciarJogo} style={{ backgroundColor: '#28a745' }}>
          Confirmar e Iniciar Vida
        </button>
      </div>
    </div>
  );
}