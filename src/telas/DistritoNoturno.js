import React, { useState } from 'react';

export default function DistritoNoturno({ player = {}, setPlayer, setTelaAtual, avancarTempo }) {
  const [aba, setAba] = useState('diversao');
  const [msg, setMsg] = useState("A vida noturna brilha em tons de neon, pecado e altas somas de dinheiro vivo.");
  
  // Catálogo de Negócios Aprofundados
  const catalogoNegocios = [
    { id: 'bar', nome: 'Bar "O Covil do Blues"', preco: 25000, rendaBase: 800, maxFunc: 5, desc: 'Bar estudantil com ótima saída de bebidas.' },
    { id: 'boate', nome: 'Boate "Neon Pulse"', preco: 120000, rendaBase: 3500, maxFunc: 15, desc: 'A casa eletrônica mais concorrida da cidade.' },
    { id: 'strip', nome: 'Strip Lounge "Velvet"', preco: 300000, rendaBase: 9500, maxFunc: 30, desc: 'Entretenimento adulto de luxo com clientela milionária.' }
  ];

  // Ações do Strip Club (Difíceis e Caras)
  const interagirStripper = (acao) => {
    const dinheiro = player.dinheiro || 0;
    if (acao === "lapdance") {
      if (dinheiro < 300) { setMsg("❌ O segurança barra-te. Uma Lap Dance privada custa R$ 300."); return; }
      if (avancarTempo(1, 10)) {
        setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro - 300, felicidade: Math.min(100, (prev.felicidade || 50) + 30) }));
        setMsg("💋 Natasha faz uma dança extremamente sensual no teu colo. Tentas pegar o telefone dela, mas ela sorri: 'Aqui é só trabalho, querido.' (-R$ 300)");
      }
    } else if (acao === "champagne") {
      if (dinheiro < 1500) { setMsg("❌ Uma garrafa de Dom Pérignon VIP custa R$ 1.500."); return; }
      const carisma = player.carisma || 50;
      if (avancarTempo(2, 15)) {
        setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro - 1500, felicidade: Math.min(100, (prev.felicidade || 50) + 60) }));
        if (carisma >= 85) {
          setMsg("🍾 Estouraste champanhe no camarote VIP! Impressionada com a tua fortuna e carisma de elite (85+), Natasha sussurra o número pessoal dela no teu ouvido!");
        } else {
          setMsg("🍾 Estouraste champanhe de R$ 1.500! As dançarinas adoraram beber às tuas custas, mas no final da noite foram embora sem te dar trela. O grind na noite é duro!");
        }
      }
    }
  };

  // Gestão de Negócios: Comprar, Contratar, Marketing e Reformar
  const comprarNegocio = (neg) => {
    if ((player.dinheiro || 0) < neg.preco) { alert("Saldo insuficiente!"); return; }
    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - neg.preco,
      negocios: {
        ...(prev.negocios || {}),
        [neg.id]: { ...neg, nivel: 1, funcionarios: 1, marketing: 1, cofre: 0 }
      }
    }));
    alert(`🎉 Adquiriste ${neg.nome}! Contrata funcionários e investe em marketing para bombar os lucros.`);
  };

  const gerirEmpresa = (id, tipo) => {
    const neg = player.negocios?.[id];
    if (!neg) return;

    if (tipo === "contratar") {
      const custo = 2000;
      if ((player.dinheiro || 0) < custo || neg.funcionarios >= neg.maxFunc) { alert("Sem dinheiro ou limite de quadro de funcionários atingido!"); return; }
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - custo,
        negocios: { ...prev.negocios, [id]: { ...neg, funcionarios: neg.funcionarios + 1 } }
      }));
      alert(`🤝 Novo funcionário contratado para ${neg.nome}! (+Renda Diária)`);
    } else if (tipo === "marketing") {
      const custo = 5000;
      if ((player.dinheiro || 0) < custo) { alert("Sem dinheiro para a campanha de rádio e internet (R$ 5.000)!"); return; }
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - custo,
        negocios: { ...prev.negocios, [id]: { ...neg, marketing: neg.marketing + 1 } }
      }));
      alert(`📢 Campanha de Marketing ativa! O prestígio de ${neg.nome} aumentou.`);
    } else if (tipo === "reforma") {
      const custo = Math.round(neg.preco * 0.4);
      if ((player.dinheiro || 0) < custo) { alert(`A reforma geral custa R$ ${custo.toLocaleString()}!`); return; }
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - custo,
        negocios: { ...prev.negocios, [id]: { ...neg, nivel: neg.nivel + 1, rendaBase: Math.round(neg.rendaBase * 1.5) } }
      }));
      alert(`🏗️ Reforma de Luxo Concluída! ${neg.nome} subiu para o Nível ${neg.nivel + 1} e a renda base cresceu 50%!`);
    }
  };

  const recolherLucros = (id) => {
    const neg = player.negocios?.[id];
    const lucro = neg?.cofre || 0;
    if (lucro <= 0) { alert("O cofre está vazio. O lucro acumula ao passar dos dias ou dormir!"); return; }
    setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro + lucro, negocios: { ...prev.negocios, [id]: { ...neg, cofre: 0 } } }));
    alert(`💰 Recolheste R$ ${lucro.toLocaleString()} do cofre de ${neg.nome}!`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff', backgroundColor: '#1b0014', borderRadius: '10px', border: '1px solid #ff007f' }}>
      <h2 style={{ color: '#ff007f' }}>🍸 Distrito Noturno & Gestão de Império</h2>
      <p style={{ color: '#2ed573' }}>Carteira: <strong>R$ {player.dinheiro?.toLocaleString()}</strong></p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #833471', paddingBottom: '10px' }}>
        <button onClick={() => setAba('diversao')} style={aba === 'diversao' ? abaAtiva : abaInativa}>💃 Strip Club & Diversão</button>
        <button onClick={() => setAba('gestao')} style={aba === 'gestao' ? { ...abaAtiva, backgroundColor: '#f1c40f', color: '#000' } : abaInativa}>👑 Gestão de Negócios</button>
      </div>

      <div style={{ backgroundColor: '#2d0a24', padding: '12px', borderRadius: '6px', marginBottom: '20px', borderLeft: '4px solid #ff007f', fontSize: '13px' }}>
        {msg}
      </div>

      {aba === 'diversao' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ backgroundColor: '#2d0a24', padding: '15px', borderRadius: '8px', border: '1px solid #ff007f' }}>
            <h3 style={{ color: '#ff007f', margin: '0 0 8px 0' }}>💋 Strip Lounge "Velvet" (Área Hardcore)</h3>
            <p style={{ fontSize: '13px', color: '#ccc' }}>As dançarinas profissionais daqui estão acostumadas com milionários. Elas vendem a ilusão da intimidade, mas conquistar o coração delas exige uma fortuna e carisma lendário.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button onClick={() => interagirStripper("lapdance")} style={btnRoxo}>🔥 Lap Dance Privada (R$ 300)</button>
              <button onClick={() => interagirStripper("champagne")} style={{ ...btnRoxo, backgroundColor: '#c0392b' }}>🍾 Champanhe VIP (R$ 1.500)</button>
            </div>
          </div>
        </div>
      )}

      {aba === 'gestao' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {catalogoNegocios.map(neg => {
            const meu = player.negocios?.[neg.id];
            const lucroDia = meu ? Math.round((meu.rendaBase * meu.nivel) + (meu.funcionarios * 150) + (meu.marketing * 300)) : neg.rendaBase;
            return (
              <div key={neg.id} style={{ backgroundColor: '#2d0a24', padding: '15px', borderRadius: '8px', border: meu ? '2px solid #f1c40f' : '1px solid #444' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: meu ? '#f1c40f' : '#fff', margin: 0 }}>{meu ? '👑 [TEU IMPÉRIO] ' : ''}{neg.nome}</h3>
                  <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>+ R$ {lucroDia.toLocaleString()}/dia</span>
                </div>
                <p style={{ fontSize: '13px', color: '#aaa', margin: '6px 0' }}>{neg.desc}</p>
                
                {meu ? (
                  <div style={{ marginTop: '10px', backgroundColor: '#11041c', padding: '12px', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px', color: '#f1c40f' }}>
                      <span>Nível: <strong>{meu.nivel}⭐</strong></span>
                      <span>Staff: <strong>{meu.funcionarios}/{meu.maxFunc}</strong></span>
                      <span>Marketing: <strong>Nvl {meu.marketing}</strong></span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                      <button onClick={() => gerirEmpresa(neg.id, "contratar")} style={btnMiniG}>🤝 Contratar (R$ 2k)</button>
                      <button onClick={() => gerirEmpresa(neg.id, "marketing")} style={btnMiniG}>📢 Marketing (R$ 5k)</button>
                      <button onClick={() => gerirEmpresa(neg.id, "reforma")} style={btnMiniG}>🏗️ Reformar (R$ {Math.round(neg.preco * 0.4)/1000}k)</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '8px' }}>
                      <span>💰 Cofre Acumulado: <strong style={{ color: '#2ecc71' }}>R$ {(meu.cofre || 0).toLocaleString()}</strong></span>
                      <button onClick={() => recolherLucros(neg.id)} style={{ padding: '8px 15px', backgroundColor: '#f1c40f', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Recolher</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => comprarNegocio(neg)} style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                    Adquirir Estabelecimento por R$ {neg.preco.toLocaleString()}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', padding: '12px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
        ⬅️ Voltar ao Mapa
      </button>
    </div>
  );
}

const abaAtiva = { padding: '10px 15px', backgroundColor: '#ff007f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const abaInativa = { padding: '10px 15px', backgroundColor: '#353b48', color: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnRoxo = { flex: 1, padding: '12px', backgroundColor: '#833471', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const btnMiniG = { padding: '8px', backgroundColor: '#34495e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' };