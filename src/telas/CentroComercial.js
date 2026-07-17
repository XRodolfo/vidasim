import React, { useState } from 'react';
import { todosNegocios } from '../utils/businessSystem';

export default function CentroComercial({ player, setPlayer, setTelaAtual, avancarTempo }) {
  const [aba, setAba] = useState('lojas');

  const comerPracaAlimentacao = (item, preco, ganhoEnergia, ganhoSaude) => {
    if (player.dinheiro < preco) {
      alert("Dinheiro insuficiente!");
      return;
    }
    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - preco,
      energia: Math.min(100, prev.energia + ganhoEnergia),
      saude: Math.min(100, (prev.saude || 100) + ganhoSaude)
    }));
    avancarTempo(30, -ganhoEnergia); // Recupera energia no tempo
    alert(`Consumiste: ${item}. Sentes-te revigorado!`);
  };

  const trabalharVendedor = () => {
    if (player.energia < 30) {
      alert("Estás demasiado cansado para cumprir um turno!");
      return;
    }
    // Atributos influenciam os ganhos
    const carisma = player.carisma || 10;
    const ganho = Math.floor(50 + (carisma * 2.5));

    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro + ganho,
      energia: prev.energia - 30,
      carisma: Math.min(100, prev.carisma + 1)
    }));
    avancarTempo(240, 30); // 4 horas de trabalho
    alert(`Trabalhaste 4 horas no comércio do Shopping. Ganhaste R$ ${ganho} e melhoraste o teu carisma!`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', backgroundColor: '#1e272e', color: '#fff', borderRadius: '10px' }}>
      <h2>🏬 Shopping Center da Metrópole</h2>
      
      {/* NAVEGAÇÃO INTERNA */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
        <button onClick={() => setAba('lojas')} style={aba === 'lojas' ? abaAtiva : abaInativa}>🛍️ Lojas & Departamentos</button>
        <button onClick={() => setAba('alimentacao')} style={aba === 'alimentacao' ? abaAtiva : abaInativa}>🍔 Praça de Alimentação</button>
        <button onClick={() => setAba('empregos')} style={aba === 'empregos' ? abaAtiva : abaInativa}>💼 Empregos no Comércio</button>
        <button onClick={() => setAba('negocios')} style={aba === 'negocios' ? { ...abaAtiva, backgroundColor: '#f1c40f', color: '#000' } : abaInativa}>👑 Negócios</button>
      </div>

      {/* CONTEÚDO: LOJAS */}
      {aba === 'lojas' && (
        <div style={{ display: 'grid', gap: '12px' }}>
          <p>Seleciona um departamento para visitar:</p>
          <button onClick={() => setTelaAtual('lojaRoupas')} style={btnSecundario}>👕 Loja de Roupas & Estilo (Melhorar Aparência)</button>
          <button onClick={() => setTelaAtual('lojaVeiculos')} style={btnSecundario}>🚗 Concessionária de Veículos</button>
          <button onClick={() => setTelaAtual('loja')} style={btnSecundario}>📱 Eletrónicos & Conveniência</button>
        </div>
      )}

      {/* CONTEÚDO: ALIMENTAÇÃO */}
      {aba === 'alimentacao' && (
        <div style={{ display: 'grid', gap: '10px' }}>
          <p>Recupera a tua energia e saúde com uma boa refeição:</p>
          <div style={cardItem}>
            <span>☕ Café Expresso & Croissant (R$ 15)</span>
            <button onClick={() => comerPracaAlimentacao('Café Expresso', 15, 15, 0)} style={btnAcao}>Consumir (+15 Energia)</button>
          </div>
          <div style={cardItem}>
            <span>🍔 Combo Burguer Completo (R$ 35)</span>
            <button onClick={() => comerPracaAlimentacao('Combo Burguer', 35, 40, -2)} style={btnAcao}>Consumir (+40 Energia)</button>
          </div>
          <div style={cardItem}>
            <span>🥗 Salada Executiva & Suco Natural (R$ 45)</span>
            <button onClick={() => comerPracaAlimentacao('Salada Executiva', 45, 35, 5)} style={btnAcao}>Consumir (+35 Energia, +5 Saúde)</button>
          </div>
        </div>
      )}

      {/* CONTEÚDO: EMPREGOS */}
      {aba === 'empregos' && (
        <div style={{ backgroundColor: '#2f3640', padding: '15px', borderRadius: '8px' }}>
          <h3>🤝 Vendedor de Loja (Turno de 4h)</h3>
          <p>Atende clientes e organiza montras. O teu ganho depende diretamente do teu <strong>Carisma</strong> e <strong>Aparência</strong>.</p>
          <p><strong>Salário Base:</strong> R$ 50 + (Bônus de Carisma)</p>
          <button onClick={trabalharVendedor} style={{ ...btnAcao, width: '100%', padding: '12px', fontSize: '16px' }}>
            Trabalhar Turno de 4 Horas (-30 Energia)
          </button>
        </div>
      )}

      {/* CONTEÚDO: NEGÓCIOS DO SHOPPING */}
      {aba === 'negocios' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {todosNegocios.filter(n => n.local === 'centroComercial').map(neg => {
            const meu = player.negocios?.[neg.id];
            return (
              <div key={neg.id} style={{ backgroundColor: '#2f3640', padding: '15px', borderRadius: '8px', border: meu ? '2px solid #f1c40f' : '1px solid #444' }}>
                <h3 style={{ color: meu ? '#f1c40f' : '#fff', margin: '0 0 10px 0' }}>{meu ? '👑 ' : ''}{neg.nome}</h3>
                <p style={{ fontSize: '12px', color: '#ccc', marginBottom: '10px' }}>{neg.desc}</p>
                {meu ? (
                  <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px' }}>
                    ✅ Adquirido! Administre este negócio e recolha seus lucros usando o aplicativo Assets/Negócios do seu Celular.
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      if (player.dinheiro < neg.preco) {
                        alert("Saldo insuficiente!");
                        return;
                      }
                      setPlayer(prev => ({
                        ...prev,
                        dinheiro: prev.dinheiro - neg.preco,
                        negocios: {
                          ...(prev.negocios || {}),
                          [neg.id]: { ...neg, nivel: 1, funcionarios: {}, marketing: 1, cofre: 0 }
                        }
                      }));
                      alert(`🎉 Adquiriste ${neg.nome}!`);
                    }} 
                    style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Adquirir Franquia por R$ {neg.preco.toLocaleString()}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button onClick={() => setTelaAtual('mapa')} style={{ marginTop: '25px', padding: '10px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
        ⬅️ Voltar ao Mapa da Cidade
      </button>
    </div>
  );
}

const abaAtiva = { padding: '10px', backgroundColor: '#e67e22', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const abaInativa = { padding: '10px', backgroundColor: '#353b48', color: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnSecundario = { padding: '15px', backgroundColor: '#353b48', color: '#fff', border: '1px solid #555', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '15px' };
const cardItem = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2f3640', padding: '12px', borderRadius: '6px' };
const btnAcao = { padding: '8px 15px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };