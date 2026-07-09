import React, { useState, useEffect } from 'react';
import { gerarNPC } from '../utils/npcGenerator';
import ModalEncontro from '../componentes/ModalEncontro';

export default function CentroComercial({ player, setPlayer, mundo, contatosNPCs, setContatosNPCs, avancarTempo, setTelaAtual }) {
  const [mensagem, setMensagem] = useState("O coração corporativo de Metrópole.");
  
  // Sistema de Encontros Aleatórios
  const [encontroSurpresa, setEncontroSurpresa] = useState(null);

  // Assim que a tela carrega, joga os dados (30% de chance de esbarrar em alguém)
  useEffect(() => {
    if (Math.random() < 0.3) {
      setEncontroSurpresa(gerarNPC(player, mundo));
    }
  }, []);

  const vagasCorporativas = [
    { id: "atendente", titulo: "Atendente de Call Center", reqCarisma: 20, salarioMensal: 1800 },
    { id: "vendedor", titulo: "Vendedor B2B", reqCarisma: 50, salarioMensal: 3500 },
    { id: "gerente", titulo: "Gerente de Projetos", reqCarisma: 80, salarioMensal: 8000 }
  ];

  const fazerEntrevista = (vaga) => {
    if (!avancarTempo(2, 15)) { setMensagem("Você está exausto."); return; }
    const chanceAprovacao = Math.min(95, Math.max(5, 40 + ((player.carisma - vaga.reqCarisma) * 1.5))); 
    
    if (Math.random() * 100 <= chanceAprovacao) {
      setMensagem(`🎉 CONTRATADO para a vaga de ${vaga.titulo}!`);
      setPlayer({ ...player, profissao_id: vaga.id, tituloProfissao: vaga.titulo, salario: vaga.salarioMensal, trabalhouHoje: false });
    } else {
      setMensagem(`❌ REJEITADO. O RH achou que o seu perfil não se encaixa.`);
    }
  };

  const baterPonto = () => {
    if (player.trabalhouHoje) { setMensagem("Você já trabalhou hoje!"); return; }
    if (!avancarTempo(8, 50)) { setMensagem("Você precisa de 50 de Energia."); return; }

    const ganhoDiario = Math.floor(player.salario / 20);
    setPlayer(prev => ({ ...prev, dinheiro: prev.dinheiro + ganhoDiario, trabalhouHoje: true }));
    setMensagem(`💼 Expediente concluído! Ganhou a diária de $${ganhoDiario}.`);
  };

  // NOVO: Criar Colega de Trabalho
  const conhecerColega = () => {
    if (!avancarTempo(1, 10)) return;
    
    // Gera um NPC forçando a mesma profissão do jogador
    let colega = gerarNPC(player, mundo);
    colega.profissao = player.tituloProfissao;
    colega.bio = "Trabalhamos na mesma empresa. O café da copa é horrível.";
    
    setContatosNPCs([...contatosNPCs, colega]);
    setMensagem(`🤝 Você foi tomar um café na copa e conheceu ${colega.nome}. O contato foi salvo no seu celular!`);
  };

  const pedirDemissao = () => {
    if(window.confirm("Pedir demissão?")) {
       setPlayer({ ...player, profissao_id: null, tituloProfissao: null, salario: 0, trabalhouHoje: false });
    }
  };

  return (
    <div className="container" style={{ position: 'relative' }}>
      
      {/* RENDERIZA O MODAL SE HOUVER UM ENCONTRO */}
      {encontroSurpresa && (
        <ModalEncontro 
           player={player} npc={encontroSurpresa} mundo={mundo} 
           setContatosNPCs={setContatosNPCs} 
           onClose={() => setEncontroSurpresa(null)} 
        />
      )}

      <div className="card" style={{ backgroundColor: '#0f172a', color: '#ecf0f1', border: '1px solid #334155' }}>
        <h1 style={{ borderBottom: '2px solid #f1c40f', paddingBottom: '10px' }}>🏢 Centro Comercial</h1>
        
        <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '5px solid #f1c40f' }}>
          <p style={{ margin: 0, fontSize: '15px' }}>{mensagem}</p>
        </div>

        {player.profissao_id ? (
          <div style={{ backgroundColor: '#064e3b', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{color: '#34d399'}}>Emprego: {player.tituloProfissao}</h2>
            <p>Salário: ${player.salario}/mês</p>
            <p style={{ color: player.trabalhouHoje ? '#f1c40f' : '#fff' }}>
              {player.trabalhouHoje ? "✅ Ponto Batido hoje." : "❌ Expediente Pendente"}
            </p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
              <button onClick={baterPonto} disabled={player.trabalhouHoje} style={{ backgroundColor: player.trabalhouHoje ? '#475569' : '#f1c40f', color: '#000', border: 'none', padding: '12px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: player.trabalhouHoje ? 'not-allowed' : 'pointer' }}>
                💼 Bater Ponto (8h)
              </button>
              
              <button onClick={conhecerColega} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                ☕ Networking c/ Colegas (1h)
              </button>

              <button onClick={pedirDemissao} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                Demissão
              </button>
            </div>
          </div>
        ) : (
          <div>
             <h3 style={{ color: '#f1c40f' }}>Vagas Abertas (Requer Carisma)</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {vagasCorporativas.map(vaga => (
                 <div key={vaga.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px' }}>
                   <div>
                     <strong style={{ fontSize: '18px', color: '#38bdf8' }}>{vaga.titulo}</strong>
                     <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '5px' }}>💰 ${vaga.salarioMensal}/mês | 🗣️ Carisma: {vaga.reqCarisma}</div>
                   </div>
                   <button onClick={() => fazerEntrevista(vaga)} style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                     Entrevista (2h)
                   </button>
                 </div>
               ))}
             </div>
          </div>
        )}

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '30px', backgroundColor: '#475569', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Voltar para a Rua
        </button>
      </div>
    </div>
  );
}