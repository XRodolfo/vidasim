import React, { useState } from 'react';
import { tiposContraceptivos } from '../utils/reproductionSystem';

export default function ContraceptivoDialog({ 
  player = {}, 
  setPlayer, 
  npc = {}, 
  setTelaAtual, 
  setContraceptivoSelecionado, 
  setShowQuerGravidez 
}) {
  const [faseDialog, setFaseDialog] = useState("escolher");
  const [contraceptivoTemp, setContraceptivoTemp] = useState(player.dadosReproductivos?.contraceptivoAtivo || "camisinha");
  const [respostaNPC, setRespostaNPC] = useState("");
  const [querGravidez, setQuerGravidez] = useState(false);

  const handleEscolherContraceptivo = (tipo) => {
    setContraceptivoTemp(tipo);
    setFaseDialog("conversar_gravidez");
  };

  const handleConversaGravidez = (desejaEngravidar) => {
    setQuerGravidez(desejaEngravidar);
    if (desejaEngravidar) {
      setRespostaNPC(`${npc.nome}: "Sério?! Sem proteção nenhuma? Se é isso que queres... vamos fazer um bebé!"`);
      setContraceptivoTemp("nenhum");
    } else {
      setRespostaNPC(`${npc.nome}: "Perfeito, vamos manter a proteção por enquanto. O importante é aproveitarmos!"`);
    }
    setFaseDialog("confirmado");
  };

  const handleConfirmar = () => {
    // Blindagem de segurança: só chama se a função existir no pai
    if (typeof setContraceptivoSelecionado === 'function') {
      setContraceptivoSelecionado(contraceptivoTemp);
    }
    if (typeof setShowQuerGravidez === 'function') {
      setShowQuerGravidez(querGravidez);
    }

    // Atualiza o estado real do jogador no motor de reprodução
    setPlayer(prev => ({
      ...prev,
      dadosReproductivos: {
        ...(prev.dadosReproductivos || {}),
        contraceptivoAtivo: contraceptivoTemp,
        tentandoEngravidar: querGravidez
      }
    }));
    setTelaAtual("motel");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '12px', border: '2px solid #d946ef', boxShadow: '0 0 20px rgba(217, 70, 239, 0.3)' }}>
        <h2 style={{ color: '#d946ef', textAlign: 'center', margin: '0 0 20px 0' }}>💭 Preparação Íntima com {npc.nome || "Parceiro(a)"}</h2>

        {faseDialog === "escolher" && (
          <div>
            <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '15px' }}>Escolha o método de proteção antes de entrar no quarto:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {Object.entries(tiposContraceptivos).map(([key, contracep]) => (
                <button
                  key={key}
                  onClick={() => handleEscolherContraceptivo(key)}
                  style={{
                    backgroundColor: contraceptivoTemp === key ? '#d946ef' : '#2e1065',
                    border: contraceptivoTemp === key ? '2px solid #fff' : '1px solid #4a044e',
                    color: '#fff', padding: '12px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{contracep.nome}</div>
                  <div style={{ fontSize: '12px', color: '#e2e8f0', marginTop: '4px' }}>Eficácia: {Math.round((1 - contracep.riscoPrenhez) * 100)}%</div>
                </button>
              ))}
            </div>
            <button onClick={() => handleEscolherContraceptivo(contraceptivoTemp)} style={btnVerde}>✓ Continuar</button>
          </div>
        )}

        {faseDialog === "conversar_gravidez" && (
          <div>
            <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '15px' }}>Gostaria de propor a {npc.nome} tentarem ter um filho?</p>
            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ec4899', marginBottom: '20px', fontSize: '13px', color: '#cbd5e1' }}>
              ⚠️ Se escolher <strong>"Sim"</strong>, o contraceptivo será removido e a probabilidade de gravidez será máxima!
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button onClick={() => handleConversaGravidez(false)} style={{ padding: '15px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                🚫 Sem Filhos (Usar Proteção)
              </button>
              <button onClick={() => handleConversaGravidez(true)} style={{ padding: '15px', backgroundColor: '#ec4899', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                🤰 Quero Ter Filhos! (Sem Proteção)
              </button>
            </div>
          </div>
        )}

        {faseDialog === "confirmado" && (
          <div>
            <div style={{ backgroundColor: '#1e3a2f', padding: '15px', borderRadius: '8px', border: '1px solid #10b981', marginBottom: '15px' }}>
              <strong style={{ color: '#10b981' }}>✅ Decisão Tomada!</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Proteção: <strong>{tiposContraceptivos[contraceptivoTemp]?.nome || "Nenhuma"}</strong> | Objetivo: <strong>{querGravidez ? "Engravidar 👶" : "Apenas Prazer 🔥"}</strong></p>
            </div>
            <div style={{ backgroundColor: '#2e1a3f', padding: '15px', borderRadius: '8px', fontStyle: 'italic', marginBottom: '20px', borderLeft: '4px solid #d946ef' }}>
              💬 {respostaNPC}
            </div>
            <button onClick={handleConfirmar} style={{ width: '100%', padding: '15px', backgroundColor: '#d946ef', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              🔥 Entrar na Suíte do Motel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const btnVerde = { width: '100%', padding: '14px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' };