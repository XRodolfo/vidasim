import React, { useState } from 'react';
import Avatar from '../componentes/Avatar';
import { catalogoRoupas } from '../dados';

export default function LojaRoupas({ player, setPlayer, setTelaAtual }) {
  const [abaAtiva, setAbaAtiva] = useState('comuns');

  const abas = [
    { id: 'comuns', titulo: '👕 Roupas Comuns' },
    { id: 'academia', titulo: '🏋️ Academia' },
    { id: 'especiais', titulo: '🎭 Especiais / Cosplays' },
    { id: 'intimasGerais', titulo: '👙 Íntimas Gerais' },
    { id: 'intimasSensuais', titulo: '💋 Íntimas Sensuais' }
  ];

  const comprarEEquipar = (item) => {
    // Verifica restrição de gênero da roupa
    if (item.genero && item.genero !== player.genero) {
      alert(`Esta peça é desenhada para o corpo ${item.genero === 'Mulher' ? 'Feminino' : 'Masculino'}.`);
      return;
    }

    if (player.dinheiro >= item.preco) {
      setPlayer(prev => {
        const novoPlayer = { ...prev, dinheiro: prev.dinheiro - item.preco };
        
        // Aplica a roupa instantaneamente no avatar
        if (item.tipo === "roupaTop") {
          novoPlayer.roupaTop = item.valor;
          novoPlayer.corRoupaTop = item.cor;
        } else if (item.tipo === "roupaBottom") {
          novoPlayer.roupaBottom = item.valor;
          novoPlayer.corRoupaBottom = item.cor;
        } else if (item.tipo === "roupaIntima") {
          novoPlayer.roupaIntima = item.valor;
          novoPlayer.corRoupaIntima = item.cor;
          // Se comprou roupa íntima, tira o resto para ver no espelho
          novoPlayer.roupaTop = "Nenhuma";
          novoPlayer.roupaBottom = "Nenhuma";
        }
        return novoPlayer;
      });
    } else {
      alert("Dinheiro insuficiente para comprar esta peça!");
    }
  };

  const tirarRoupa = (tipo) => {
    setPlayer(prev => ({ ...prev, [tipo]: tipo === 'roupaIntima' ? false : "Nenhuma" }));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1e1e24', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* PAINEL ESQUERDO: ESPELHO / AVATAR */}
      <div style={{ width: '350px', backgroundColor: '#2b2b36', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '2px solid #f1c40f' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#f1c40f' }}>PRÉVIA DE VESTUÁRIO</h3>
          <span style={{ backgroundColor: '#1e1e24', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}>
            💰 ${player.dinheiro}
          </span>
        </div>
        
        <div style={{ flex: 1, backgroundColor: '#ececec', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          <Avatar player={player} mundo={{}} /> {/* Passamos mundo vazio só para não quebrar a etnia que já está salva na corPele */}
        </div>

        {/* CONTROLES RÁPIDOS DO PROVADOR */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => tirarRoupa('roupaTop')} style={btnProvador}>Tirar Camiseta/Top</button>
          <button onClick={() => tirarRoupa('roupaBottom')} style={btnProvador}>Tirar Calça/Short</button>
          <button onClick={() => tirarRoupa('roupaIntima')} style={btnProvador}>Tirar Roupa Íntima</button>
        </div>
      </div>

      {/* PAINEL DIREITO: LOJA E CATÁLOGO */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Fashion Mall Metrópole</h2>
          <button onClick={() => setTelaAtual("mapa")} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sair da Loja</button>
        </div>

        {/* ABAS */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>
          {abas.map(aba => (
            <button 
              key={aba.id} 
              onClick={() => setAbaAtiva(aba.id)}
              style={{
                backgroundColor: abaAtiva === aba.id ? '#f1c40f' : 'transparent',
                color: abaAtiva === aba.id ? '#000' : '#aaa',
                border: 'none', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer'
              }}
            >
              {aba.titulo}
            </button>
          ))}
        </div>

        {/* GRID DE PRODUTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {catalogoRoupas[abaAtiva].map(item => (
            <div key={item.id} style={{ backgroundColor: '#2b2b36', padding: '15px', borderRadius: '10px', textAlign: 'center', border: '1px solid #444' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: item.cor, margin: '0 auto 15px auto', borderRadius: '5px', border: '2px solid #1e1e24' }}></div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', height: '40px' }}>{item.nome}</h4>
              <p style={{ color: '#2ecc71', fontSize: '18px', fontWeight: 'bold', margin: '0 0 15px 0' }}>${item.preco}</p>
              <button 
                onClick={() => comprarEEquipar(item)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                COMPRAR E VESTIR
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const btnProvador = {
  backgroundColor: '#444', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer'
};