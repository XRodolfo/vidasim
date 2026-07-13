import React, { useState } from 'react';

export default function Trabalho({ player, setPlayer, setTelaAtual, avancarTempo }) {
  const [msg, setMsg] = useState("O ambiente corporativo está agitado. O que desejas fazer no turno de hoje?");
  
  // Lista de colegas gerados dinamicamente para interagir no trabalho
  const colegas = [
    { nome: "Carlos (Supervisor)", cargo: "Chefe Direto", afeto: 50, humor: "Sério" },
    { nome: "Mariana", cargo: "Colega de Setor", afeto: 60, humor: "Amigável" },
    { nome: "Roberto", cargo: "Recursos Humanos", afeto: 40, humor: "Estrito" }
  ];

  const trabalharTurno = () => {
    if ((player.energia || 100) < 30) {
      setMsg("❌ Estás exausto demais para produzir alguma coisa hoje!");
      return;
    }
    const salario = player.salario || 150;
    if (avancarTempo(6, 30)) {
      setPlayer(prev => ({
        ...prev,
        dinheiro: (prev.dinheiro || 0) + salario,
        reconhecimento: Math.min(100, (prev.reconhecimento || 10) + 5)
      }));
      setMsg(`💼 Cumpriste um turno excelente de 6 horas! Recebeste R$ ${salario} e ganhaste +5% de reconhecimento na empresa.`);
    }
  };

  const interagirColega = (colega, acao) => {
    if ((player.energia || 100) < 10) {
      setMsg("Estás sem energia para socializar agora.");
      return;
    }
    let ganhoReconhecimento = 0;
    let texto = "";

    if (acao === "ajudar") {
      ganhoReconhecimento = 4;
      texto = `Ajudaste ${colega.nome} com um relatório complexo. Ele(a) ficou muito grato(a)! (+4% Reconhecimento)`;
    } else if (acao === "flertar") {
      ganhoReconhecimento = -2;
      texto = `Tentaste flertar com ${colega.nome} no café. O clima ficou um pouco desconfortável na sala... (-2% Reconhecimento)`;
    } else if (acao === "fofocar") {
      ganhoReconhecimento = 2;
      texto = `Fofocaste sobre a diretoria com ${colega.nome}. Vocês riram bastante no corredor! (+2% Reconhecimento)`;
    }

    if (avancarTempo(1, 10)) {
      setPlayer(prev => ({
        ...prev,
        carisma: Math.min(100, (prev.carisma || 50) + 1),
        reconhecimento: Math.max(0, Math.min(100, (prev.reconhecimento || 10) + ganhoReconhecimento))
      }));
      setMsg(texto);
    }
  };

  const pedirPromocao = () => {
    const rec = player.reconhecimento || 10;
    if (rec < 70) {
      setMsg(`⚠️ O teu reconhecimento corporativo atual (${rec}%) é baixo. Exige-se pelo menos 70%.`);
      return;
    }
    
    // Tratamento Inteligente de Títulos
    let novoTitulo = player.tituloProfissao || "Funcionário";
    let multiplicador = 1.35;

    if (!novoTitulo.includes("Sênior") && !novoTitulo.includes("Diretor") && !novoTitulo.includes("CEO")) {
        novoTitulo += " Sênior";
    } else if (novoTitulo.includes("Sênior")) {
        novoTitulo = novoTitulo.replace("Sênior", "Diretor");
        multiplicador = 1.60;
    } else if (novoTitulo.includes("Diretor")) {
        novoTitulo = novoTitulo.replace("Diretor", "CEO");
        multiplicador = 2.0;
    } else {
        setMsg("👑 Já alcançaste o topo da pirâmide corporativa (CEO)!");
        return;
    }

    const novoSalario = Math.round((player.salario || 150) * multiplicador);
    setPlayer(prev => ({
      ...prev,
      salario: novoSalario,
      reconhecimento: 20, // Reseta
      tituloProfissao: novoTitulo
    }));
    setMsg(`🎉 PROMOVIDO PARA ${novoTitulo.toUpperCase()}! O teu novo salário base é de R$ ${novoSalario}/turno!`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#1e272e', padding: '20px', borderRadius: '10px', border: '1px solid #353b48' }}>
        <h2>🏢 O Teu Ambiente de Trabalho</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#2f3640', padding: '12px', borderRadius: '6px', marginBottom: '15px' }}>
          <span>Cargo: <strong style={{ color: '#00d2d3' }}>{player.tituloProfissao || "Trabalhador Geral"}</strong></span>
          <span>Salário/Turno: <strong style={{ color: '#2ed573' }}>R$ {player.salario || 150}</strong></span>
          <span>Reconhecimento: <strong style={{ color: '#feca57' }}>{player.reconhecimento || 10}%</strong></span>
        </div>

        <div style={{ backgroundColor: '#111', padding: '12px', borderRadius: '6px', marginBottom: '20px', borderLeft: '4px solid #00d2d3', fontSize: '14px', minHeight: '40px' }}>
          {msg}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
          <button onClick={trabalharTurno} style={{ padding: '15px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            💼 Trabalhar Turno Completo (6h | -30⚡)
          </button>
          <button onClick={pedirPromocao} style={{ padding: '15px', backgroundColor: '#f39c12', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            📈 Pedir Promoção de Cargo
          </button>
        </div>

        <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '8px', color: '#00d2d3' }}>👥 Colegas de Trabalho (Socialização & Networking)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {colegas.map((col, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2f3640', padding: '12px', borderRadius: '6px' }}>
              <div>
                <strong>{col.nome}</strong> <small style={{ color: '#aaa' }}>({col.cargo})</small><br/>
                <span style={{ fontSize: '12px', color: '#ccc' }}>Humor atual: {col.humor}</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => interagirColega(col, "ajudar")} style={btnMini}>🤝 Ajudar</button>
                <button onClick={() => interagirColega(col, "fofocar")} style={{ ...btnMini, backgroundColor: '#8e44ad' }}>☕ Fofocar</button>
                <button onClick={() => interagirColega(col, "flertar")} style={{ ...btnMini, backgroundColor: '#c0392b' }}>💋 Flertar</button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '25px', padding: '12px', backgroundColor: '#576574', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Mapa
        </button>
      </div>
    </div>
  );
}

const btnMini = { padding: '8px 12px', backgroundColor: '#2980b9', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' };