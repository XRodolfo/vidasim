import React, { useState } from 'react';
import { tiposContraceptivos } from '../utils/reproductionSystem';

export default function ContraceptivoDialog({ 
  player, 
  setPlayer, 
  npc, 
  setTelaAtual, 
  setContraceptivoSelecionado, 
  setShowQuerGravidez 
}) {
  const [faseDialog, setFaseDialog] = useState("escolher"); // escolher, conversar_gravidez, confirmado
  const [contraceptivoTemp, setContraceptivoTemp] = useState(player.dadosReproductivos?.contraceptivoAtivo || "camisinha");
  const [respotaNPC, setRespostaNPC] = useState("");

  const handleEscolherContraceptivo = (tipo) => {
    setContraceptivoTemp(tipo);
    setFaseDialog("conversar_gravidez");
  };

  const handleConversaGravidez = (quer_gravidez) => {
    if (quer_gravidez) {
      setRespostaNPC(`${npc.nome}: "Quer dizer que quer que eu saia de você? Tudo bem... mas então preciso parar a proteção."`);
      setContraceptivoTemp("nenhum");
    } else {
      setRespostaNPC(`${npc.nome}: "Claro, sem problemas! Com a proteção mesmo assim é melhor."`);
    }
    setFaseDialog("confirmado");
  };

  const handleConfirmar = () => {
    setContraceptivoSelecionado(contraceptivoTemp);
    setPlayer(prev => ({
      ...prev,
      dadosReproductivos: {
        ...prev.dadosReproductivos,
        contraceptivoAtivo: contraceptivoTemp
      }
    }));
    setTelaAtual("motel");
  };

  return (
    <div className="container">
      <div className="card" style={{
        backgroundColor: '#1a1a2e',
        color: '#fff',
        borderColor: '#d946ef',
        boxShadow: '0 0 20px rgba(217, 70, 239, 0.2)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#d946ef', textAlign: 'center', marginBottom: '20px' }}>
          💭 Preparação Íntima
        </h2>

        {/* FASE 1: Escolher Contraceptivo */}
        {faseDialog === "escolher" && (
          <div>
            <p style={{ fontSize: '14px', marginBottom: '15px', color: '#cbd5e1' }}>
              Antes de entrar no quarto com {npc.nome}, qual proteção você gostaria de usar?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              {Object.entries(tiposContraceptivos).map(([key, contracep]) => (
                <button
                  key={key}
                  onClick={() => handleEscolherContraceptivo(key)}
                  style={{
                    backgroundColor: contraceptivoTemp === key ? '#d946ef' : '#2e1065',
                    border: contraceptivoTemp === key ? '2px solid #a21caf' : '1px solid #4a044e',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    transition: '0.3s',
                    textAlign: 'left'
                  }}
                >
                  <div>{contracep.nome}</div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>
                    Eficácia: {Math.round((1 - contracep.riscoPrenhez) * 100)}%
                  </div>
                </button>
              ))}
            </div>

            <div style={{
              backgroundColor: '#0f172a',
              border: '1px solid #4a044e',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '12px',
              color: '#94a3b8',
              marginBottom: '15px'
            }}>
              <strong style={{ color: '#ec4899' }}>ℹ️ Info:</strong> Quanto melhor a eficácia, menor o risco de gravidez.
            </div>

            <button
              onClick={() => handleEscolherContraceptivo(contraceptivoTemp)}
              style={{
                backgroundColor: '#10b981',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              ✓ Continuar
            </button>
          </div>
        )}

        {/* FASE 2: Conversa sobre Gravidez */}
        {faseDialog === "conversar_gravidez" && (
          <div>
            <p style={{ fontSize: '14px', marginBottom: '20px', color: '#cbd5e1' }}>
              Você gostaria de falar com {npc.nome} sobre <strong>engravidar</strong>?
            </p>

            <div style={{
              backgroundColor: '#0f172a',
              border: '1px dashed #ec4899',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '15px',
              fontSize: '13px',
              color: '#cbd5e1'
            }}>
              Se disser "sim", {npc.nome} saberá que você quer uma relação sem proteção e poderá engravidar.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => handleConversaGravidez(false)}
                style={{
                  backgroundColor: '#475569',
                  border: 'none',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🚫 Não, sem gravidez
              </button>

              <button
                onClick={() => handleConversaGravidez(true)}
                style={{
                  backgroundColor: '#ec4899',
                  border: 'none',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🤰 Sim, quero engravidar
              </button>
            </div>
          </div>
        )}

        {/* FASE 3: Confirmação */}
        {faseDialog === "confirmado" && (
          <div>
            <div style={{
              backgroundColor: '#1e3a2f',
              border: '2px solid #10b981',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              fontSize: '13px',
              color: '#cbd5e1'
            }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong style={{ color: '#10b981' }}>✓ Tudo pronto!</strong>
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                Proteção: <strong>{tiposContraceptivos[contraceptivoTemp]?.nome}</strong>
              </p>
              <p style={{ margin: '0' }}>
                Risco de gravidez: <strong>{Math.round(tiposContraceptivos[contraceptivoTemp]?.riscoPrenhez * 100)}%</strong>
              </p>
            </div>

            <div style={{
              backgroundColor: '#2e1a3f',
              border: '1px dashed #d946ef',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '15px',
              fontSize: '13px',
              color: '#cbd5e1',
              fontStyle: 'italic'
            }}>
              <strong style={{ color: '#d946ef' }}>💬 {npc.nome}:</strong> "{respotaNPC}"
            </div>

            <button
              onClick={handleConfirmar}
              style={{
                backgroundColor: '#d946ef',
                border: 'none',
                color: '#fff',
                padding: '14px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              🔥 Entrar no Quarto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
