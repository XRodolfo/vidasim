import React, { useState } from 'react';

export default function Restaurante({ player, setPlayer, setTelaAtual, avancarTempo }) {
  const [msg, setMsg] = useState("O aroma de temperos e molhos frescos invade a cozinha. Onde desejas trabalhar ou jantar hoje?");

  const restaurantes = [
    { id: 'fast', nome: '🍔 Lanchonete Popular "Burguer Kingo"', reqCulinaria: 0, salario: 90, cargo: 'Chapeiro / Garçom Sênior', tempo: 4, energia: 25 },
    { id: 'bistro', nome: '🍝 Bistrô Italiano "La Trattoria"', reqCulinaria: 35, salario: 240, cargo: 'Sous Chef / Gerente de Salão', tempo: 6, energia: 35 },
    { id: 'gourmet', nome: '🍷 Restaurante 3 Estrelas "Le Grand Chef"', reqCulinaria: 70, salario: 650, cargo: 'Chef Executivo / Maître Principal', tempo: 8, energia: 45 }
  ];

  const trabalharRestaurante = (local) => {
    if ((player.culinaria || 0) < local.reqCulinaria) {
      setMsg(`❌ O teu nível de Culinária (${player.culinaria || 0}) é insuficiente. O estabelecimento exige pelo menos ${local.reqCulinaria} de Culinária para este cargo.`);
      return;
    }
    if ((player.energia || 100) < local.energia) {
      setMsg("❌ Estás exausto! A pressão e o calor de uma cozinha profissional desmaiariam-te agora.");
      return;
    }

    if (avancarTempo(local.tempo, local.energia)) {
      setPlayer(prev => ({
        ...prev,
        dinheiro: (prev.dinheiro || 0) + local.salario,
        culinaria: Math.min(100, (prev.culinaria || 10) + 2),
        carisma: Math.min(100, (prev.carisma || 50) + 1),
        tituloProfissao: local.cargo,
        salario: local.salario
      }));
      setMsg(`👨‍🍳 Excelente trabalho no ${local.nome}! Como ${local.cargo}, ganhaste R$ ${local.salario} e +2 pontos de Culinária!`);
    }
  };

  const fazerCursoGastronomia = () => {
    if ((player.dinheiro || 0) < 200) {
      setMsg("Sem fundos para pagar a aula de culinária (R$ 200).");
      return;
    }
    if (avancarTempo(3, 20)) {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - 200,
        culinaria: Math.min(100, (prev.culinaria || 10) + 6)
      }));
      setMsg("🍳 Concluíste o Workshop com um Chef Francês! A tua habilidade de Culinária aumentou significativamente (+6 Culinária)!");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#1e272e', padding: '20px', borderRadius: '10px', border: '1px solid #e67e22' }}>
        <h2 style={{ color: '#e67e22' }}>👨‍🍳 Polo Gastronômico & Carreira de Chef</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#2f3640', padding: '12px', borderRadius: '6px', marginBottom: '15px' }}>
          <span>Habilidade Culinária: <strong style={{ color: '#f39c12', fontSize: '16px' }}>{player.culinaria || 0} / 100 🍳</strong></span>
          <span>Carteira: <strong style={{ color: '#2ed573' }}>R$ {player.dinheiro?.toLocaleString()}</strong></span>
        </div>

        <div style={{ backgroundColor: '#111', padding: '12px', borderRadius: '6px', marginBottom: '20px', borderLeft: '4px solid #e67e22', fontSize: '14px' }}>
          {msg}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={fazerCursoGastronomia} style={{ width: '100%', padding: '14px', backgroundColor: '#d35400', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            📚 Aula Prática de Alta Gastronomia (R$ 200 | +6 Culinária | -3h)
          </button>
        </div>

        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '8px', color: '#e67e22' }}>🏢 Oportunidades de Emprego em Restaurantes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {restaurantes.map((rest, idx) => {
            const liberado = (player.culinaria || 0) >= rest.reqCulinaria;
            return (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2f3640', padding: '15px', borderRadius: '8px', borderLeft: liberado ? '4px solid #2ed573' : '4px solid #c0392b' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: '#fff' }}>{rest.nome}</strong><br/>
                  <small style={{ color: '#aaa' }}>Cargo: <strong>{rest.cargo}</strong> ({rest.tempo}h / -{rest.energia}⚡)</small><br/>
                  <small style={{ color: liberado ? '#2ed573' : '#ff5252' }}>Requisito: {rest.reqCulinaria} de Culinária | Salário: R$ {rest.salario}</small>
                </div>
                <button onClick={() => trabalharRestaurante(rest)} style={{ padding: '10px 15px', backgroundColor: liberado ? '#27ae60' : '#555', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Trabalhar
                </button>
              </div>
            );
          })}
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '25px', padding: '12px', backgroundColor: '#576574', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Mapa
        </button>
      </div>
    </div>
  );
}