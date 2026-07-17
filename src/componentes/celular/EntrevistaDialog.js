import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import { gerarNPC } from '../../utils/npcGenerator';

export default function EntrevistaDialog({ player, setPlayer, cargo, negId, negNome, onClose, onContratado, mundo }) {
  const [candidato, setCandidato] = useState(null);
  const [fase, setFase] = useState("inicio"); // inicio, resultado, processo
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [custoContratacao, setCustoContratacao] = useState(cargo.custo);
  const [contratavel, setContratavel] = useState(false);
  const [afetoInicial, setAfetoInicial] = useState(10);

  useEffect(() => {
    if (!candidato) {
      const npc = gerarNPC(player, mundo);
      npc.profissao = cargo.nome;
      npc.afeto = 10;
      setCandidato(npc);
      setCustoContratacao(cargo.custo);
      setContratavel(false);
    }
  }, [candidato, player, cargo, mundo]);

  const handleAbordagem = (tipo) => {
    if (!candidato) return;

    if (tipo === "profissional") {
      // Entrevista profissional padrão. Chance baseada em inteligência/carisma
      const chanceSucesso = (player.carisma + player.inteligencia) / 2;
      const rolagem = Math.random() * 100;
      
      if (rolagem < chanceSucesso + 20) {
        setFeedbackMsg(`📋 ${candidato.nome} demonstrou excelentes qualificações técnicas para a vaga. O contrato está pronto no valor padrão de R$ ${cargo.custo.toLocaleString()}.`);
        setContratavel(true);
        setAfetoInicial(15);
      } else {
        setFeedbackMsg(`📋 ${candidato.nome} pareceu um pouco inseguro durante a sabatina técnica, mas atende aos requisitos básicos.`);
        setContratavel(true);
        setAfetoInicial(10);
      }
      setFase("resultado");
    } 
    else if (tipo === "ousada") {
      // Flerte Ousado. Libido ou fetiches influenciam
      const gostaDeFlerte = candidato.libido > 50 || (candidato.fetiches && candidato.fetiches.length > 0);
      
      if (gostaDeFlerte) {
        const desconto = Math.round(cargo.custo * 0.3);
        const novoCusto = cargo.custo - desconto;
        setCustoContratacao(novoCusto);
        setFeedbackMsg(`😏 Você elogiou o estilo e o charme de ${candidato.nome}. Flertando discretamente, ${candidato.nome} deu um sorriso cúmplice e aceitou reduzir sua taxa de contratação para R$ ${novoCusto.toLocaleString()}!`);
        setContratavel(true);
        setAfetoInicial(40);
      } else {
        setCustoContratacao(Math.round(cargo.custo * 1.2)); // Fica mais caro
        setFeedbackMsg(`😐 Você tentou flertar com ${candidato.nome}, mas ele(a) achou a postura pouco profissional. O clima ficou tenso e ele(a) só aceita a vaga se você pagar R$ ${(Math.round(cargo.custo * 1.2)).toLocaleString()}.`);
        setContratavel(true);
        setAfetoInicial(0);
      }
      setFase("resultado");
    } 
    else if (tipo === "indecente") {
      // Proposta Indecente
      // Candidatos com fetiches de submissão/dominação/anal/oral ou libido altíssima aceitam
      const fetichesAceitaveis = ["submissa", "dominante", "anal", "oral_obsessed"];
      const temFeticheSafado = candidato.fetiches?.some(f => fetichesAceitaveis.includes(f.id));
      const aceitaProposta = temFeticheSafado || candidato.libido > 80;

      if (aceitaProposta) {
        setCustoContratacao(0); // Trabalha de graça (custo de contratação zerado)
        setFeedbackMsg(`🔥 PROPOSTA INDECENTE ACEITA! ${candidato.nome} te olhou de cima a baixo com desejo e disse baixinho: "Se for para trabalhar bem pertinho de você desse jeito... eu topo! E nem precisa me pagar bônus de contratação."`);
        setContratavel(true);
        setAfetoInicial(70);
        setFase("resultado");
      } else {
        // Se for sério/baixa libido/virgem, risco de 50% de processo por assédio
        const processado = Math.random() < 0.5;
        if (processado) {
          setFase("processo");
        } else {
          setFeedbackMsg(`❌ REJEIÇÃO COMPLETA! ${candidato.nome} ficou extremamente ofendido(a) com a proposta indecente, rasgou o currículo na sua cara e saiu batendo a porta da sala!`);
          setContratavel(false);
          setFase("resultado");
        }
      }
    }
  };

  const processarContratacao = () => {
    if (player.dinheiro < custoContratacao) {
      alert("❌ Você não tem dinheiro suficiente!");
      return;
    }
    
    // Contrata o NPC
    candidato.afeto = afetoInicial;
    candidato.profissao = cargo.nome;
    
    // Atualiza dinheiro do player e contrata no negócio
    setPlayer(prev => {
      const negocios = { ...prev.negocios };
      const neg = { ...negocios[negId] };
      const func = { ...neg.funcionarios };
      func[cargo.id] = (func[cargo.id] || 0) + 1;
      neg.funcionarios = func;
      negocios[negId] = neg;

      // Adiciona o candidato aos contatos se houve flerte/proposta bem sucedida
      let novosContatos = prev.contatosNPCs || [];
      if (afetoInicial >= 40) {
        if (!novosContatos.some(c => c.nome === candidato.nome)) {
          novosContatos = [...novosContatos, candidato];
        }
      }

      return {
        ...prev,
        dinheiro: prev.dinheiro - custoContratacao,
        negocios,
        contatosNPCs: novosContatos
      };
    });

    alert(`🎉 ${candidato.nome} foi contratado(a) como ${cargo.nome}!`);
    if (onContratado) onContratado();
    onClose();
  };

  const sofrerProcesso = () => {
    // Player perde R$ 10.000 em processos judiciais
    setPlayer(prev => ({
      ...prev,
      dinheiro: Math.max(0, prev.dinheiro - 10000)
    }));
    alert("⚖️ CASO JUDICIAL: Seu advogado recomendou fazer um acordo extrajudicial rápido para evitar a prisão. Você pagou R$ 10.000 em indenizações e custas processuais.");
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20000, padding: '15px' }}>
      <div style={{ backgroundColor: '#1e1b4b', border: '2px solid #a855f7', borderRadius: '15px', padding: '20px', maxWidth: '450px', width: '100%', color: '#fff', textAlign: 'center', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
        
        {fase === "inicio" && candidato && (
          <div>
            <h2 style={{ color: '#c084fc', margin: '0 0 10px 0' }}>📋 Entrevista de Emprego</h2>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '20px' }}>
              Selecionando candidato para o cargo de <strong>{cargo.nome}</strong> no estabelecimento <strong>{negNome}</strong>.
            </p>

            {/* CARD CANDIDATO */}
            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '20px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #c084fc', overflow: 'hidden', margin: '0 auto 10px auto', backgroundColor: '#334155' }}>
                <div style={{ transform: 'scale(1.5)', transformOrigin: 'top center', width: '100%', height: '100%' }}>
                  <Avatar player={candidato} mundo={mundo} />
                </div>
              </div>
              <h4 style={{ margin: '5px 0' }}>{candidato.nome}, {candidato.idade} anos</h4>
              <p style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', margin: '5px 0' }}>"{candidato.bio}"</p>
              <div style={{ fontSize: '11px', color: '#fb7185', marginTop: '6px' }}>
                Libido aparente: {candidato.libido > 75 ? "Alta 🔥" : candidato.libido > 40 ? "Moderada" : "Fria"}
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '15px' }}>Como você deseja conduzir a entrevista?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => handleAbordagem("profissional")} style={btnStyle}>💼 Abordagem Profissional (Seguro)</button>
              <button onClick={() => handleAbordagem("ousada")} style={{ ...btnStyle, backgroundColor: '#c084fc' }}>😏 Flerte & Charme (Ousado)</button>
              <button onClick={() => handleAbordagem("indecente")} style={{ ...btnStyle, backgroundColor: '#db2777' }}>🔥 Proposta Indecente (Extremo/Perigoso)</button>
            </div>
            
            <button onClick={onClose} style={{ marginTop: '15px', backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}>Dispensar Vaga</button>
          </div>
        )}

        {fase === "resultado" && (
          <div>
            <h2 style={{ color: '#c084fc', margin: '0 0 15px 0' }}>📢 Resultado da Entrevista</h2>
            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', fontSize: '13px', color: '#e2e8f0', borderLeft: '4px solid #c084fc', marginBottom: '20px', textAlign: 'left', lineHeight: '1.4' }}>
              {feedbackMsg}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {contratavel && (
                <button 
                  onClick={processarContratacao} 
                  disabled={player.dinheiro < custoContratacao}
                  style={{
                    padding: '12px 25px', backgroundColor: player.dinheiro < custoContratacao ? '#475569' : '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: player.dinheiro < custoContratacao ? 'not-allowed' : 'pointer'
                  }}
                >
                  Contratar [R$ {custoContratacao.toLocaleString()}]
                </button>
              )}
              
              <button 
                onClick={() => setCandidato(null) || setFase("inicio")} 
                style={{ padding: '12px 20px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Entrevistar Outro
              </button>
            </div>

            <button onClick={onClose} style={{ marginTop: '15px', backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 'bold' }}>Fechar</button>
          </div>
        )}

        {fase === "processo" && candidato && (
          <div>
            <h2 style={{ color: '#ef4444', margin: '0 0 15px 0' }}>⚠️ DENÚNCIA DE ASSÉDIO</h2>
            
            <div style={{ backgroundColor: '#7f1d1d', border: '1px solid #dc2626', color: '#fca5a5', padding: '15px', borderRadius: '8px', textAlign: 'left', fontSize: '13px', lineHeight: '1.4', marginBottom: '20px' }}>
              <strong>Grave!</strong> {candidato.nome} ficou extremamente furioso(a) com sua proposta indecente. Ele(a) tirou o celular do bolso, gravou a conversa e te denunciou imediatamente para a polícia e o sindicato!
              <br/><br/>
              Você foi formalmente acusado(a) de <strong>Assédio Sexual</strong> em ambiente corporativo.
            </div>

            <button 
              onClick={sofrerProcesso} 
              style={{
                width: '100%', padding: '15px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer'
              }}
            >
              Fazer Acordo e Pagar Indenização (Perder R$ 10.000)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const btnStyle = {
  width: '100%',
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#475569',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '13px',
  transition: '0.2s'
};
