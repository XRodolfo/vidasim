import React, { useState } from 'react';
import { proporNameoro, proporCasamento, conversoGravidez } from '../utils/relationshipSystem';

export default function DialogoRelacionamento({
  npc,
  player,
  setPlayer,
  contatosNPCs, // Adicionado para gerenciar o "Morar Junto"
  setContatosNPCs, // Adicionado para gerenciar o "Morar Junto"
  tipo, // "propor_namoro", "propor_casamento", "conversa_gravidez", "morar_junto"
  onClose
}) {
  const [faseDialog, setFaseDialog] = useState("confirmacao");
  const [resultado, setResultado] = useState(null);

  // Extrai o relacionamento diretamente do player para não dar erro
  const relacionamento = player.relacionamento;

  const handlePropor = () => {
    let res;

    if (tipo === "propor_namoro") {
      res = proporNameoro(npc, player);
    } else if (tipo === "propor_casamento") {
      res = proporCasamento(npc, player, relacionamento);
    } else if (tipo === "morar_junto") {
      // Nova Lógica: Morar Junto
      if ((npc.afeto || 0) >= 80) {
        res = { sucesso: true, mensagem: `${npc.nome} adorou a ideia! Fez as malas e já está indo para a sua casa.` };
      } else {
        res = { sucesso: false, mensagem: `"Acho que estamos indo rápido demais... preciso de mais tempo (Requer 80+ de Afeto)."` };
      }
    }

    setResultado(res);

    if (res.sucesso) {
      setFaseDialog("sucesso");
      
      if (tipo === "morar_junto") {
        // Atualiza a flag mora_junto no contato do NPC
        if (setContatosNPCs) {
          setContatosNPCs(prev => prev.map(c => c.id === npc.id ? { ...c, mora_junto: true } : c));
        }
      } else if (res.novoParceiro) {
        // Atualiza estado do player (Namoro)
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
        // Atualiza estado do player (Casamento)
        setPlayer(prev => ({
          ...prev,
          relacionamento: res.novoRelacionamento
        }));
      }
    } else {
      setFaseDialog("fracasso");
      
      // Se recusou namoro, diminui afeto
      if (tipo === "propor_namoro" && res.novoAfetoNPC) {
        if (setContatosNPCs) {
          setContatosNPCs(prev => prev.map(c => c.id === npc.id ? { ...c, afeto: res.novoAfetoNPC } : c));
        }
      }
    }
  };

  const handleConversaGravidez = (quer) => {
    // Roda a sua função original de relacionamento
    const res = typeof conversoGravidez === "function" ? conversoGravidez(npc, player, relacionamento, quer) : { sucesso: true, novoRelacionamento: relacionamento };
    
    if (res.sucesso) {
      setResultado({ mensagem: quer ? "A partir de agora, não usaremos mais proteção!" : "Entendido, vamos manter as coisas seguras."});
      setFaseDialog("sucesso");
      
      setPlayer(prev => ({
        ...prev,
        relacionamento: res.novoRelacionamento || prev.relacionamento,
        // CORREÇÃO CRÍTICA: Atualiza o sistema biológico para o Motel funcionar!
        dadosReproductivos: {
          ...(prev.dadosReproductivos || {}),
          tentandoEngravidar: quer,
          contraceptivoAtivo: quer ? "nenhum" : (prev.dadosReproductivos?.contraceptivoAtivo || "camisinha")
        }
      }));
    } else {
      setResultado(res);
      setFaseDialog("fracasso");
    }
  };

  return (
    <div style={{
      position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: '1000'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e', borderColor: '#d946ef', border: '2px solid',
        borderRadius: '12px', padding: '30px', maxWidth: '500px', color: '#fff',
        boxShadow: '0 0 30px rgba(217, 70, 239, 0.3)'
      }}>
        {/* FASE: Confirmação antes de propor */}
        {faseDialog === "confirmacao" && (
          <div>
            <h2 style={{ color: '#d946ef', marginTop: '0' }}>
              {tipo === "propor_namoro" && "💕 Propor Namoro"}
              {tipo === "propor_casamento" && "💍 Propor Casamento"}
              {tipo === "conversa_gravidez" && "🤰 Conversa sobre Bebê"}
              {tipo === "morar_junto" && "🔑 Convite para Morar Junto"}
            </h2>

            {tipo === "propor_namoro" && (
              <>
                <p style={{ marginBottom: '15px' }}>Você vai propor namoro para <strong>{npc.nome}</strong>.</p>
                <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '15px' }}>Afeição atual: <strong>{npc.afeto}/100</strong> (Necessário: 75)</p>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
                  <strong style={{ color: '#60a5fa' }}>ℹ️</strong> Se {npc.nome} aceitar, vocês começarão um relacionamento oficial.
                </div>
              </>
            )}

            {tipo === "propor_casamento" && (
              <>
                <p style={{ marginBottom: '15px' }}>Você vai pedir <strong>{npc.nome}</strong> em casamento.</p>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
                  <strong style={{ color: '#60a5fa' }}>ℹ️</strong> Vocês precisam estar namorando há pelo menos 5 meses para isso.
                </div>
              </>
            )}

            {tipo === "morar_junto" && (
              <>
                <p style={{ marginBottom: '15px' }}>Gostarias de pedir a <strong>{npc.nome}</strong> para vir morar na tua casa (adicionar ao seu Quarto/Harém)?</p>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
                  <strong style={{ color: '#60a5fa' }}>ℹ️</strong> Se aceitar, vocês poderão interagir diretamente na sua Casa, sem precisar ir ao Motel. (Requer alta afeição).
                </div>
              </>
            )}

            {tipo === "conversa_gravidez" && (
              <>
                <p style={{ marginBottom: '15px' }}>Qual é a sua intenção em relação a formar uma família com {npc.nome}?</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button onClick={() => handleConversaGravidez(false)} style={btnCinza}>🚫 Sem filhos</button>
                  <button onClick={() => handleConversaGravidez(true)} style={btnRosa}>🤰 Quero ter filhos</button>
                </div>
              </>
            )}

            {tipo !== "conversa_gravidez" && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                <button onClick={onClose} style={btnCinza}>❌ Cancelar</button>
                <button onClick={handlePropor} style={btnRosa}>✓ Propor</button>
              </div>
            )}
          </div>
        )}

        {/* FASE: Sucesso */}
        {faseDialog === "sucesso" && (
          <div>
            <h2 style={{ color: '#10b981', marginTop: '0' }}>✨ Sucesso!</h2>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>{resultado?.mensagem}</p>
            <div style={{ backgroundColor: '#1e3a2f', border: '2px solid #10b981', borderRadius: '8px', padding: '12px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
              {tipo === "propor_namoro" && <p style={{ margin: '0' }}>Vocês agora estão namorando! 💕</p>}
              {tipo === "propor_casamento" && <p style={{ margin: '0' }}>Vocês agora estão casados! 💍</p>}
              {tipo === "morar_junto" && <p style={{ margin: '0' }}>Vá até o seu Quarto e veja quem está lá à sua espera! 🏠</p>}
              {tipo === "conversa_gravidez" && <p style={{ margin: '0' }}>Decisão íntima confirmada no sistema.</p>}
            </div>
            <button onClick={onClose} style={{...btnRosa, width: '100%'}}>✓ Fechar</button>
          </div>
        )}

        {/* FASE: Fracasso */}
        {faseDialog === "fracasso" && (
          <div>
            <h2 style={{ color: '#ef4444', marginTop: '0' }}>😢 Recusado</h2>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>{resultado?.mensagem}</p>
            <div style={{ backgroundColor: '#3f1f1f', border: '2px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '15px', fontSize: '13px', color: '#cbd5e1' }}>
              <p style={{ margin: '0' }}>Afeição com {npc.nome}: {npc.afeto || 0}/100</p>
            </div>
            <button onClick={onClose} style={{...btnRosa, width: '100%'}}>✓ Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}

const btnCinza = { backgroundColor: '#475569', border: 'none', color: '#fff', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const btnRosa = { backgroundColor: '#d946ef', border: 'none', color: '#fff', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };