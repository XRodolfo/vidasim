import React, { useState } from 'react';

export default function Prefeitura({ player, setPlayer, avancarTempo, setTelaAtual }) {
  const [mensagem, setMensagem] = useState("Bem-vindo à Prefeitura Municipal. O que deseja fazer?");

  const concursosDisponiveis = [
    { id: "gari", titulo: "Gari Municipal", requisitoInt: 20, salario: 1500, taxa: 20 },
    { id: "admin", titulo: "Assistente Administrativo", requisitoInt: 50, salario: 3200, taxa: 50 },
    { id: "auditor", titulo: "Auditor Fiscal", requisitoInt: 85, salario: 12000, taxa: 150 }
  ];

  const prestarConcurso = (concurso) => {
    if (player.dinheiro < concurso.taxa) {
      setMensagem(`Você não tem $${concurso.taxa} para pagar a taxa de inscrição.`);
      return;
    }

    if (!avancarTempo(4, 30)) { // Gastar 4 horas e 30 de energia fazendo a prova
      setMensagem("Você está muito cansado para fazer uma prova de 4 horas.");
      return;
    }

    // Paga a taxa
    let novoDinheiro = player.dinheiro - concurso.taxa;

    // Lógica da Prova: Sorteio influenciado pela Inteligência do jogador
    // Se a Int do jogador for maior que o requisito, a chance de passar beira 90%. Se for menor, cai muito.
    const margem = player.inteligencia - concurso.requisitoInt;
    const chanceAprovacao = Math.min(95, Math.max(5, 50 + (margem * 2))); 
    const rolagem = Math.random() * 100;

    if (rolagem <= chanceAprovacao) {
      setMensagem(`🎉 APROVADO! Você gabaritou a prova para ${concurso.titulo}! Você começará a receber o salário em breve (Futuro Sistema de Trabalho).`);
      setPlayer({ ...player, dinheiro: novoDinheiro, profissao_id: concurso.id, tituloProfissao: concurso.titulo, salario: concurso.salario });
    } else {
      setMensagem(`❌ REPROVADO. A prova para ${concurso.titulo} estava muito difícil. Estude na Biblioteca para aumentar sua Inteligência e tente novamente.`);
      setPlayer({ ...player, dinheiro: novoDinheiro });
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: '#f8f9fa', color: '#333' }}>
        <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>🏛️ Prefeitura Municipal</h1>
        
        <div style={{ backgroundColor: '#e8f4f8', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '5px solid #3498db' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{mensagem}</p>
        </div>

        <h3 style={{ color: '#2c3e50' }}>Edital de Concursos Públicos Abertos:</h3>
        <p style={{ fontSize: '13px', color: '#666' }}>A aprovação depende estritamente do seu nível de <strong>Inteligência</strong>. As provas duram 4 horas.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {concursosDisponiveis.map(conc => (
            <div key={conc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div>
                <strong style={{ fontSize: '18px', color: '#2980b9' }}>{conc.titulo}</strong>
                <div style={{ fontSize: '13px', color: '#555', marginTop: '5px' }}>
                  <span>💰 Salário Base: ${conc.salario}/mês</span> | 
                  <span> 🧠 Inteligência Recomendada: {conc.requisitoInt}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                <span style={{ fontSize: '12px', color: '#e74c3c', fontWeight: 'bold' }}>Taxa: ${conc.taxa}</span>
                <button 
                  onClick={() => prestarConcurso(conc)} 
                  style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Fazer Prova
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '30px', backgroundColor: '#95a5a6', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sair da Prefeitura
        </button>
      </div>
    </div>
  );
}