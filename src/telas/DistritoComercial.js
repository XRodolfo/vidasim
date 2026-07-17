import React, { useState } from 'react';
import { todosNegocios } from '../utils/businessSystem';

export default function DistritoComercial({ player = {}, setPlayer, setTelaAtual, avancarTempo }) {
  const [aba, setAba] = useState('servicos');

  const usarHospital = (tipo, preco, ganhoSaude) => {
    if ((player.dinheiro || 0) < preco) {
      alert("Sem fundos para cobrir as despesas médicas!");
      return;
    }
    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - preco,
      saude: Math.min(100, (prev.saude || 50) + ganhoSaude)
    }));
    if (avancarTempo) avancarTempo(2, 10);
    alert("Tratamento concluído. A tua saúde foi restaurada!");
  };

  const trabalharCorporativo = (cargo, reqInteligencia, salario, tempoMin, energiaGasta) => {
    if ((player.inteligencia || 10) < reqInteligencia) {
      alert(`O teu nível de Inteligência (${player.inteligencia || 10}) não atende ao requisito mínimo (${reqInteligencia}) para este cargo.`);
      return;
    }
    if ((player.energia || 100) < energiaGasta) {
      alert("Estás exausto! Não aguentarias a pressão de um escritório agora.");
      return;
    }
    setPlayer(prev => ({
      ...prev,
      dinheiro: (prev.dinheiro || 0) + salario,
      energia: prev.energia - energiaGasta,
      inteligencia: Math.min(100, (prev.inteligencia || 50) + 1)
    }));
    if (avancarTempo) avancarTempo(tempoMin / 60, energiaGasta);
    alert(`Concluíste o trabalho como ${cargo}! Recebeste R$ ${salario}.`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', backgroundColor: '#1e272e', color: '#fff', borderRadius: '10px' }}>
      <h2>🏛️ Distrito Comercial & Centro Cívico</h2>
      <p style={{ color: '#2ed573' }}>Carteira: ${player.dinheiro || 0}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
        <button onClick={() => setAba('servicos')} style={aba === 'servicos' ? abaAtiva : abaInativa}>🏥 Serviços & Saúde</button>
        <button onClick={() => setAba('escritorios')} style={aba === 'escritorios' ? abaAtiva : abaInativa}>🏢 Empregos Corporativos</button>
        <button onClick={() => setAba('negocios')} style={aba === 'negocios' ? { ...abaAtiva, backgroundColor: '#f1c40f', color: '#000' } : abaInativa}>👑 Negócios</button>
      </div>

      {aba === 'servicos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={boxServico}>
            <h3>🏥 Hospital Central</h3>
            <p>Cuida do teu corpo e previne doenças.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => usarHospital('Consulta de Rotina', 150, 25)} style={btnAcao}>Consulta (R$ 150 / +25 Saúde)</button>
              <button onClick={() => usarHospital('Tratamento Intensivo', 500, 70)} style={btnAcao}>Tratamento (R$ 500 / +70 Saúde)</button>
            </div>
          </div>

          <div style={boxServico}>
            <h3>🏛️ Prefeitura & Registro Civil</h3>
            <p>Acede aos serviços governamentais e concursos públicos.</p>
            <button onClick={() => setTelaAtual('prefeitura')} style={{ ...btnAcao, backgroundColor: '#2980b9' }}>
              Entrar na Prefeitura
            </button>
          </div>
        </div>
      )}

      {/* CONTEÚDO: EMPREGOS CORPORATIVOS */}
      {aba === 'escritorios' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>O centro financeiro exige alta **Inteligência**:</p>
          <div style={cardEmprego}>
            <div><h4>Estagiário de Contabilidade</h4><small>Requer: 20 Inteligência | Turno: 6 horas</small></div>
            <button onClick={() => trabalharCorporativo('Estagiário de Contabilidade', 20, 180, 360, 40)} style={btnAcao}>Trabalhar (R$ 180)</button>
          </div>
          <div style={cardEmprego}>
            <div><h4>Analista Financeiro Júnior</h4><small>Requer: 45 Inteligência | Turno: 8 horas</small></div>
            <button onClick={() => trabalharCorporativo('Analista Financeiro', 45, 450, 480, 55)} style={btnAcao}>Trabalhar (R$ 450)</button>
          </div>
          <div style={cardEmprego}>
            <div><h4>Gestor Executivo de Projetos</h4><small>Requer: 75 Inteligência | Turno: 8 horas</small></div>
            <button onClick={() => trabalharCorporativo('Gestor Executivo', 75, 1100, 480, 65)} style={btnAcao}>Trabalhar (R$ 1.100)</button>
          </div>
        </div>
      )}

      {/* CONTEÚDO: INVESTIMENTOS EM NEGÓCIOS */}
      {aba === 'negocios' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {todosNegocios.filter(n => n.local === 'distritoComercial').map(neg => {
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
                    Adquirir Empresa por R$ {neg.preco.toLocaleString()}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button onClick={() => setTelaAtual('mapa')} style={{ marginTop: '25px', padding: '12px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
        ⬅️ Voltar ao Mapa da Cidade
      </button>
    </div>
  );
}

const abaAtiva = { padding: '10px', backgroundColor: '#2e86de', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const abaInativa = { padding: '10px', backgroundColor: '#353b48', color: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const boxServico = { backgroundColor: '#2f3640', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #54a0ff' };
const cardEmprego = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2f3640', padding: '15px', borderRadius: '8px', border: '1px solid #444' };
const btnAcao = { padding: '10px 15px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };