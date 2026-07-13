import React, { useState } from 'react';

export default function Banco({ player = {}, setPlayer, setTelaAtual, avancarTempo }) {
  const [msg, setMsg] = useState("Bem-vindo ao Banco Global. Protegemos o seu patrimônio e financiamos os seus sonhos.");
  const [valorInput, setValorInput] = useState("");

  const saldoPoupanca = player.poupanca || 0;
  const dividaAtual = player.dividaBancaria || 0;
  const saldoCorrente = player.dinheiro || 0;

  const depositar = () => {
    const valor = parseInt(valorInput);
    if (!valor || valor <= 0) { setMsg("❌ Digite um valor válido para depósito."); return; }
    if (saldoCorrente < valor) { setMsg("❌ Você não tem todo esse dinheiro em mãos!"); return; }

    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - valor,
      poupanca: (prev.poupanca || 0) + valor
    }));
    setValorInput("");
    setMsg(`✅ Depósito de R$ ${valor.toLocaleString()} realizado! Sua poupança rende 0,5% ao dia.`);
  };

  const sacar = () => {
    const valor = parseInt(valorInput);
    if (!valor || valor <= 0) { setMsg("❌ Digite um valor válido para saque."); return; }
    if (saldoPoupanca < valor) { setMsg("❌ Você não possui esse valor na sua conta poupança!"); return; }

    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro + valor,
      poupanca: prev.poupanca - valor
    }));
    setValorInput("");
    setMsg(`💵 Saque de R$ ${valor.toLocaleString()} realizado com sucesso!`);
  };

  const pegarEmprestimo = (valorEmprestimo) => {
    if (dividaAtual > 100000) {
      setMsg("❌ Seu limite de crédito estourou! Pague sua dívida atual antes de solicitar novo empréstimo.");
      return;
    }
    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro + valorEmprestimo,
      dividaBancaria: (prev.dividaBancaria || 0) + Math.round(valorEmprestimo * 1.25) // 25% de juros fixos
    }));
    setMsg(`🤝 Empréstimo de R$ ${valorEmprestimo.toLocaleString()} aprovado! Uma dívida com juros foi adicionada ao seu nome.`);
  };

  const pagarDivida = () => {
    const valor = parseInt(valorInput);
    if (!valor || valor <= 0) { setMsg("❌ Digite um valor válido para amortizar a dívida."); return; }
    if (saldoCorrente < valor) { setMsg("❌ Dinheiro insuficiente em mãos para esse pagamento."); return; }
    if (dividaAtual <= 0) { setMsg("🎉 Você não possui nenhuma dívida bancária ativa!"); return; }

    const valorPago = Math.min(valor, dividaAtual);
    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - valorPago,
      dividaBancaria: prev.dividaBancaria - valorPago
    }));
    setValorInput("");
    setMsg(`💳 Dívida amortizada em R$ ${valorPago.toLocaleString()}!`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #3b82f6' }}>
        <h2 style={{ color: '#3b82f6', margin: '0 0 15px 0' }}>🏦 Banco Global & Investimentos</h2>
        
        {/* PAINEL DE SALDOS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          <div style={cardSaldo}>
            <small style={{ color: '#94a3b8' }}>Dinheiro em Mãos</small>
            <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '16px' }}>R$ {saldoCorrente.toLocaleString()}</div>
          </div>
          <div style={cardSaldo}>
            <small style={{ color: '#94a3b8' }}>Conta Poupança</small>
            <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '16px' }}>R$ {saldoPoupanca.toLocaleString()}</div>
          </div>
          <div style={cardSaldo}>
            <small style={{ color: '#94a3b8' }}>Dívida Bancária</small>
            <div style={{ color: '#f43f5e', fontWeight: 'bold', fontSize: '16px' }}>R$ {dividaAtual.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '20px', borderLeft: '4px solid #3b82f6', fontSize: '14px' }}>
          {msg}
        </div>

        {/* INPUT DE VALORES */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="number" 
            placeholder="Digite o valor ($)..." 
            value={valorInput} 
            onChange={e => setValorInput(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', fontSize: '16px' }}
          />
          <button onClick={depositar} style={btnVerde}>📥 Depositar</button>
          <button onClick={sacar} style={btnAzul}>📤 Sacar</button>
          <button onClick={pagarDivida} style={btnVermelho}>💳 Pagar Dívida</button>
        </div>

        <h3 style={{ color: '#60a5fa', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>🤝 Linhas de Crédito Rápido (Empréstimos)</h3>
        <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Use empréstimos para comprar estabelecimentos no Distrito Noturno ou casas na Imobiliária!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '25px' }}>
          <button onClick={() => pegarEmprestimo(10000)} style={btnEmprestimo}>💰 Pegar R$ 10.000 (Dívida R$ 12.500)</button>
          <button onClick={() => pegarEmprestimo(50000)} style={btnEmprestimo}>💰 Pegar R$ 50.000 (Dívida R$ 62.500)</button>
          <button onClick={() => pegarEmprestimo(150000)} style={{ ...btnEmprestimo, gridColumn: '1/3', backgroundColor: '#8b5cf6' }}>👑 Financiamento VIP: R$ 150.000 (Dívida R$ 187.500)</button>
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ padding: '12px', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Mapa da Cidade
        </button>
      </div>
    </div>
  );
}

const cardSaldo = { backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' };
const btnVerde = { padding: '10px 15px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const btnAzul = { padding: '10px 15px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const btnVermelho = { padding: '10px 15px', backgroundColor: '#f43f5e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };
const btnEmprestimo = { padding: '14px', backgroundColor: '#1e293b', color: '#f1c40f', border: '1px solid #f1c40f', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' };