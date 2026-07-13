import React, { useState } from 'react';

export default function DistritoNoturno({ player = {}, setPlayer, setTelaAtual, avancarTempo }) {
  const [aba, setAba] = useState('diversao');
  const [negocioAberto, setNegocioAberto] = useState(null); // Estado para a gestão profunda
  
  const catalogoNegocios = [
    { id: 'bar', nome: 'Bar "O Covil do Blues"', preco: 25000, rendaBase: 800, maxFunc: 5, desc: 'Bar noturno de ótima saída.' },
    { id: 'boate', nome: 'Boate "Neon Pulse"', preco: 120000, rendaBase: 3500, maxFunc: 15, desc: 'Casa eletrônica de alto padrão.' },
    { id: 'strip', nome: 'Strip Lounge "Velvet"', preco: 300000, rendaBase: 9500, maxFunc: 30, desc: 'Entretenimento adulto milionário.' }
  ];

  const comprarNegocio = (neg) => {
    if ((player.dinheiro || 0) < neg.preco) { alert("Saldo insuficiente!"); return; }
    setPlayer(prev => ({
      ...prev, dinheiro: prev.dinheiro - neg.preco,
      negocios: { ...(prev.negocios || {}), [neg.id]: { ...neg, nivel: 1, funcionarios: 1, marketing: 1, cofre: 0 } }
    }));
    alert(`🎉 Adquiriste ${neg.nome}!`);
  };

  const gerirEmpresa = (id, tipo) => {
    const neg = player.negocios?.[id];
    if (!neg) return;

    // Uso de fallback (|| 1) blinda completamente contra o erro NaN
    const funcAtuais = neg.funcionarios || 1;
    const mktAtual = neg.marketing || 1;
    const nivelAtual = neg.nivel || 1;

    if (tipo === "contratar") {
      if ((player.dinheiro || 0) < 2000 || funcAtuais >= neg.maxFunc) { alert("Sem dinheiro ou atingiste o teto de staff!"); return; }
      setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro - 2000, negocios: { ...prev.negocios, [id]: { ...neg, funcionarios: funcAtuais + 1 } } }));
    } else if (tipo === "marketing") {
      if ((player.dinheiro || 0) < 5000) { alert("Sem fundos (R$ 5k)!"); return; }
      setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro - 5000, negocios: { ...prev.negocios, [id]: { ...neg, marketing: mktAtual + 1 } } }));
    } else if (tipo === "reforma") {
      const custo = Math.round(neg.preco * 0.4);
      if ((player.dinheiro || 0) < custo) { alert(`A reforma custa R$ ${custo.toLocaleString()}!`); return; }
      setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro - custo, negocios: { ...prev.negocios, [id]: { ...neg, nivel: nivelAtual + 1, rendaBase: Math.round(neg.rendaBase * 1.5) } } }));
    }
  };

  const recolherLucros = (id) => {
    const neg = player.negocios?.[id];
    const lucro = neg?.cofre || 0;
    if (lucro <= 0) { alert("O cofre está vazio!"); return; }
    setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro + lucro, negocios: { ...prev.negocios, [id]: { ...neg, cofre: 0 } } }));
    alert(`💰 R$ ${lucro.toLocaleString()} transferidos para a carteira!`);
  };

  // Se o jogador clicou para gerir profundamente um negócio, mostramos apenas o painel interno
  if (negocioAberto) {
    const meu = player.negocios?.[negocioAberto.id];
    // Se ocorreu um bug e a pessoa vendeu ou perdeu o negócio, fecha.
    if (!meu) { setNegocioAberto(null); return null; }

    const lucroDia = Math.round((meu.rendaBase * (meu.nivel || 1)) + ((meu.funcionarios || 1) * 150) + ((meu.marketing || 1) * 300));

    return (
      <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff', backgroundColor: '#11041c', borderRadius: '10px', border: '2px solid #f1c40f' }}>
        <button onClick={() => setNegocioAberto(null)} style={{ padding: '8px 15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '15px' }}>🔙 Voltar ao Distrito</button>
        <h2 style={{ color: '#f1c40f', margin: '0 0 5px 0' }}>👑 Gestão: {meu.nome}</h2>
        <p style={{ color: '#2ecc71', fontSize: '18px', fontWeight: 'bold' }}>Rendimento: + R$ {lucroDia.toLocaleString()} / dia</p>
        
        <div style={{ backgroundColor: '#2d0a24', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3 style={{ color: '#fff', borderBottom: '1px solid #ff007f', paddingBottom: '10px' }}>Estatísticas da Empresa</h3>
          <p>Nível Estrutural: <strong>{meu.nivel || 1} ⭐</strong></p>
          <p>Quadro de Staff: <strong>{meu.funcionarios || 1} / {meu.maxFunc}</strong></p>
          <p>Nível de Marketing: <strong>Nvl {meu.marketing || 1}</strong></p>
          <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '8px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>💰 Cofre da Empresa: <strong style={{ color: '#2ecc71', fontSize: '18px' }}>R$ {(meu.cofre || 0).toLocaleString()}</strong></span>
            <button onClick={() => recolherLucros(meu.id)} style={{ padding: '10px 20px', backgroundColor: '#f1c40f', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Esvaziar Cofre</button>
          </div>
        </div>

        <h3 style={{ color: '#fff' }}>Ações Administrativas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button onClick={() => gerirEmpresa(meu.id, "contratar")} style={btnAdmin}>🤝 Contratar Funcionário (R$ 2.000)</button>
          <button onClick={() => gerirEmpresa(meu.id, "marketing")} style={btnAdmin}>📢 Campanha de Marketing (R$ 5.000)</button>
          <button onClick={() => gerirEmpresa(meu.id, "reforma")} style={btnAdmin}>🏗️ Reformar Infraestrutura (R$ {(Math.round(meu.preco * 0.4)).toLocaleString()})</button>
        </div>
      </div>
    );
  }

  // TELA PADRÃO DO DISTRITO
  return (
    <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff', backgroundColor: '#1b0014', borderRadius: '10px', border: '1px solid #ff007f' }}>
      <h2 style={{ color: '#ff007f' }}>🍸 Distrito Noturno</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #833471', paddingBottom: '10px' }}>
        <button onClick={() => setAba('diversao')} style={aba === 'diversao' ? abaAtiva : abaInativa}>💃 Strip Club</button>
        <button onClick={() => setAba('gestao')} style={aba === 'gestao' ? { ...abaAtiva, backgroundColor: '#f1c40f', color: '#000' } : abaInativa}>👑 Negócios</button>
      </div>

      {aba === 'diversao' && (
        <div style={{ backgroundColor: '#2d0a24', padding: '15px', borderRadius: '8px', border: '1px solid #ff007f' }}>
          <h3 style={{ color: '#ff007f' }}>💋 Strip Lounge "Velvet"</h3>
          <p style={{ fontSize: '13px', color: '#ccc' }}>O luxo custa caro, o sorriso das dançarinas também.</p>
          <button onClick={() => { if(avancarTempo(1, 10)) setPlayer(p => ({...p, dinheiro: p.dinheiro - 300, felicidade: Math.min(100, p.felicidade+30)}))}} style={btnRoxo}>🔥 Lap Dance Privada (R$ 300)</button>
        </div>
      )}

      {aba === 'gestao' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {catalogoNegocios.map(neg => {
            const meu = player.negocios?.[neg.id];
            return (
              <div key={neg.id} style={{ backgroundColor: '#2d0a24', padding: '15px', borderRadius: '8px', border: meu ? '2px solid #f1c40f' : '1px solid #444' }}>
                <h3 style={{ color: meu ? '#f1c40f' : '#fff', margin: '0 0 10px 0' }}>{meu ? '👑 ' : ''}{neg.nome}</h3>
                {meu ? (
                  <button onClick={() => setNegocioAberto(neg)} style={{ width: '100%', padding: '12px', backgroundColor: '#f1c40f', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Entrar na Administração
                  </button>
                ) : (
                  <button onClick={() => comprarNegocio(neg)} style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Adquirir por R$ {neg.preco.toLocaleString()}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', padding: '12px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>⬅️ Voltar ao Mapa</button>
    </div>
  );
}
const abaAtiva = { padding: '10px 15px', backgroundColor: '#ff007f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const abaInativa = { padding: '10px 15px', backgroundColor: '#353b48', color: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnRoxo = { width: '100%', padding: '12px', backgroundColor: '#833471', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const btnAdmin = { padding: '12px', backgroundColor: '#34495e', color: '#fff', border: '1px solid #555', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' };