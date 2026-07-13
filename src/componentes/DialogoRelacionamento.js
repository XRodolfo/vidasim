import React, { useState } from 'react';
import { proporNameoro, proporCasamento, conversoGravidez } from '../utils/relationshipSystem';

export default function DialogoRelacionamento({
  npc,
  player,
  setPlayer,
  relacionamento,
  tipo, // "propor_namoro", "propor_casamento", "conversa_gravidez"
  onClose
}) {
  const [faseDialog, setFaseDialog] = useState("confirmacao");
  const [resultado, setResultado] = useState(null);

  const handlePropor = () => {
    let res;

    if (tipo === "propor_namoro") {
      res = proporNameoro(npc, player);
    } else if (tipo === "propor_casamento") {
      res = proporCasamento(npc, player, relacionamento);
    }

    setResultado(res);
    if (res.sucesso) {
      setFaseDialog("sucesso");
      
      // Atualiza estado do player
      if (res.novoParceiro) {
        setPlayer(prev => ({
          ...prev,
          relacionamento: {
            status: "namorando",
            parceiro: res.novoParceiro,
            dataCasamento: null,
            filhos: [],
            historicoRelacionamentos: prev.relacionamento?.historicoRelacionamentos || []
          }
        }));
      } else if (res.novoRelacionamento) {
        setPlayer(prev => ({
          ...prev,
          relacionamento: res.novoRelacionamento
        }));
      }
    } else {
      setFaseDialog("fracasso");
      
      // Se recusou namoro, diminui afeto
      if (tipo === "propor_namoro" && res.novoAfetoNPC) {
        npc.afeto = res.novoAfetoNPC;
      }
    }
  };

  const handleConversaGravidez = (quer) => {
    const res = conversoGravidez(npc, player, relacionamento, quer);
    
    if (res.sucesso) {
      setResultado(res);
      setFaseDialog("sucesso");
      
      setPlayer(prev => ({
        ...prev,
        relacionamento: res.novoRelacionamento
      }));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        borderColor: '#d946ef',
        border: '2px solid',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        color: '#fff',
        boxShadow: '0 0 30px rgba(217, 70, 239, 0.3)'
      }}>
        {/* FASE: Confirmação antes de propor */}
        {faseDialog === "confirmacao" && (
          <div>
            <h2 style={{ color: '#d946ef', marginTop: '0' }}>
              {tipo === "propor_namoro" && "💕 Propor Namoro"}
              {tipo === "propor_casamento" && "💍 Propor Casamento"}
              {tipo === "conversa_gravidez" && "🤰 Conversa sobre Bebê"}
            </h2>

            {tipo === "propor_namoro" && (
              <>
                <p style={{ marginBottom: '15px' }}>
                  Você vai propor namoro para <strong>{npc.nome}</strong>.
                </p>
                <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '15px' }}>
                  Afeição atual: <strong>{npc.afeto}/100</strong> (Necessário: 75)
                </p>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
                  <strong style={{ color: '#60a5fa' }}>ℹ️</strong> Se {npc.nome} aceitar, vocês começarão um relacionamento. Se recusar, o afeição pode diminuir.
                </div>
              </>
            )}

            {tipo === "propor_casamento" && (
              <>
                <p style={{ marginBottom: '15px' }}>
                  Você vai pedir <strong>{npc.nome}</strong> em casamento.
                </p>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
                  <strong style={{ color: '#60a5fa' }}>ℹ️</strong> Vocês precisam estar namorando há pelo menos 5 meses para isso.
                </div>
              </>
            )}

            {tipo === "conversa_gravidez" && (
              <>
                <p style={{ marginBottom: '15px' }}>
                  Qual é sua intenção em relação a filhos com {npc.nome}?
                </p>
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
                    🚫 Sem filhos
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
                    🤰 Quero ter filhos
                  </button>
                </div>
              </>
            )}

            {tipo !== "conversa_gravidez" && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                <button
                  onClick={onClose}
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
                  ❌ Cancelar
                </button>
                <button
                  onClick={handlePropor}
                  style={{
                    backgroundColor: '#d946ef',
                    border: 'none',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ✓ Propor
                </button>
              </div>
            )}
          </div>
        )}

        {/* FASE: Sucesso */}
        {faseDialog === "sucesso" && (
          <div>
            <h2 style={{ color: '#10b981', marginTop: '0' }}>✨ Sucesso!</h2>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              {resultado?.mensagem}
            </p>
            <div style={{
              backgroundColor: '#1e3a2f',
              border: '2px solid #10b981',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '15px',
              fontSize: '13px',
              color: '#cbd5e1'
            }}>
              {tipo === "propor_namoro" && (
                <>
                  <p style={{ margin: '0 0 8px 0' }}>Vocês agora estão namorando! 💕</p>
                  <p style={{ margin: '0' }}>Afeição com {npc.nome}: {npc.afeto}/100</p>
                </>
              )}
              {tipo === "propor_casamento" && (
                <p style={{ margin: '0' }}>Vocês agora estão casados! 💍</p>
              )}
              {tipo === "conversa_gravidez" && (
                <p style={{ margin: '0' }}>Conversa realizada com sucesso.</p>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#d946ef',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              ✓ Fechar
            </button>
          </div>
        )}

        {/* FASE: Fracasso */}
        {faseDialog === "fracasso" && (
          <div>
            <h2 style={{ color: '#ef4444', marginTop: '0' }}>😢 Recusado</h2>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              {resultado?.mensagem}
            </p>
            <div style={{
              backgroundColor: '#3f1f1f',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '15px',
              fontSize: '13px',
              color: '#cbd5e1'
            }}>
              <p style={{ margin: '0' }}>
                Afeição com {npc.nome}: {npc.afeto}/100
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#d946ef',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              ✓ Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
