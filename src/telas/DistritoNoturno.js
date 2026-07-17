import React, { useState } from 'react';
import { todosNegocios, posicoesPorNegocio, calcularLucroDia } from '../utils/businessSystem';
import { gerarNPC } from '../utils/npcGenerator';
import EntrevistaDialog from '../componentes/celular/EntrevistaDialog';

export default function DistritoNoturno({ player = {}, setPlayer, setTelaAtual, avancarTempo, contatosNPCs = [], setContatosNPCs, mundo }) {
  const [aba, setAba] = useState('diversao');
  const [negocioAberto, setNegocioAberto] = useState(null); // negócio selecionado para gestão
  const [cargoEntrevista, setCargoEntrevista] = useState(null); // cargo sendo entrevistado

  const catalogoNegocios = todosNegocios.filter(neg => neg.local === 'distritoNoturno');

  const comprarNegocio = (neg) => {
    if ((player.dinheiro || 0) < neg.preco) { alert("Saldo insuficiente!"); return; }
    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - neg.preco,
      negocios: { 
        ...(prev.negocios || {}), 
        [neg.id]: { ...neg, nivel: 1, funcionarios: {}, marketing: 1, cofre: 0 } 
      }
    }));
    alert(`🎉 Adquiriste ${neg.nome}!`);
  };

  const gerirEmpresa = (id, tipo, posId = null) => {
    const neg = player.negocios?.[id];
    if (!neg) return;

    if (tipo === "demitir") {
      const qty = neg.funcionarios?.[posId] || 0;
      if (qty <= 0) {
        alert("Ninguém contratado nesta posição!");
        return;
      }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        const func = { ...meu.funcionarios };
        func[posId] = Math.max(0, func[posId] - 1);
        meu.funcionarios = func;
        negocios[id] = meu;
        return { ...prev, negocios };
      });
      alert("Funcionário demitido!");
    } else if (tipo === "marketing") {
      if ((player.dinheiro || 0) < 5000) { alert("Sem fundos (R$ 5k)!"); return; }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        meu.marketing = (meu.marketing || 1) + 1;
        negocios[id] = meu;
        return { ...prev, dinheiro: prev.dinheiro - 5000, negocios };
      });
      alert("Campanha de marketing lançada com sucesso!");
    } else if (tipo === "reforma") {
      const custo = Math.round(neg.preco * 0.4);
      if ((player.dinheiro || 0) < custo) { alert(`A reforma custa R$ ${custo.toLocaleString()}!`); return; }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        meu.nivel = (meu.nivel || 1) + 1;
        meu.rendaBase = Math.round(meu.rendaBase * 1.5);
        negocios[id] = meu;
        return { ...prev, dinheiro: prev.dinheiro - custo, negocios };
      });
      alert(`🎉 Reforma concluída! Estabelecimento melhorado.`);
    }
  };

  const recolherLucros = (id) => {
    const neg = player.negocios?.[id];
    const lucro = neg?.cofre || 0;
    if (lucro <= 0) { alert("O cofre está vazio!"); return; }
    setPlayer(prev => {
      const negocios = { ...prev.negocios };
      const meu = { ...negocios[id] };
      meu.cofre = 0;
      negocios[id] = meu;
      return { ...prev, dinheiro: prev.dinheiro + lucro, negocios };
    });
    alert(`💰 R$ ${lucro.toLocaleString()} transferidos para a carteira!`);
  };

  const comprarLapDance = () => {
    if (player.dinheiro < 300) {
      alert("❌ Dinheiro insuficiente! A Lap Dance Privada custa R$ 300.");
      return;
    }
    if (!avancarTempo(1, 10)) return;

    setPlayer(p => ({
      ...p,
      dinheiro: p.dinheiro - 300,
      energia: Math.max(0, p.energia - 10),
      felicidade: Math.min(100, (p.felicidade || 50) + 30)
    }));

    if (Math.random() < 0.6) {
      const novoNPC = gerarNPC(player, mundo);
      novoNPC.profissao = "Dançarina(o) de Elite";
      novoNPC.afeto = 45;
      novoNPC.bio = "Me assista no palco privado. 🤫💋";
      
      if (setContatosNPCs) {
        setContatosNPCs(prev => {
          if (prev.some(c => c.nome === novoNPC.nome)) return prev;
          return [...prev, novoNPC];
        });
      }

      alert(`🔥 A dança privada com ${novoNPC.nome} foi extremamente quente! No final, vocês trocaram contatos. "${novoNPC.nome}" foi adicionado ao seu telemóvel.`);
    } else {
      alert("🔥 A dança privada foi incrível e te deixou extremamente relaxado!");
    }
  };

  // PAINEL DE GESTÃO DO NEGÓCIO
  if (negocioAberto) {
    const meu = player.negocios?.[negocioAberto.id];
    if (!meu) { setNegocioAberto(null); return null; }

    const lucroDia = calcularLucroDia(meu);

    return (
      <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff', backgroundColor: '#11041c', borderRadius: '10px', border: '2px solid #f1c40f' }}>
        {cargoEntrevista && (
          <EntrevistaDialog
            player={player}
            setPlayer={setPlayer}
            cargo={cargoEntrevista.cargo}
            negId={cargoEntrevista.negId}
            negNome={cargoEntrevista.negNome}
            mundo={mundo}
            onClose={() => setCargoEntrevista(null)}
            onContratado={() => setCargoEntrevista(null)}
          />
        )}

        <button onClick={() => setNegocioAberto(null)} style={{ padding: '8px 15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '15px' }}>🔙 Voltar ao Distrito</button>
        <h2 style={{ color: '#f1c40f', margin: '0 0 5px 0' }}>👑 Gestão: {meu.nome}</h2>
        <p style={{ color: '#2ecc71', fontSize: '18px', fontWeight: 'bold' }}>Rendimento: + R$ {lucroDia.toLocaleString()} / dia</p>
        
        <div style={{ backgroundColor: '#2d0a24', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3 style={{ color: '#fff', borderBottom: '1px solid #ff007f', paddingBottom: '10px' }}>Estatísticas da Empresa</h3>
          <p>Nível Estrutural: <strong>{meu.nivel || 1} ⭐</strong> | Marketing: <strong>Nvl {meu.marketing || 1}</strong></p>
          
          <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '8px', marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>💰 Cofre da Empresa: <strong style={{ color: '#2ecc71', fontSize: '18px' }}>R$ {(meu.cofre || 0).toLocaleString()}</strong></span>
            <button onClick={() => recolherLucros(meu.id)} style={{ padding: '10px 20px', backgroundColor: '#f1c40f', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Esvaziar Cofre</button>
          </div>
        </div>

        <h3 style={{ color: '#fff' }}>👥 Contratar / Demitir Funcionários:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {posicoesPorNegocio[meu.id]?.map(pos => {
            const contratados = meu.funcionarios?.[pos.id] || 0;
            return (
              <div key={pos.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2d0a24', padding: '12px', borderRadius: '8px', border: '1px solid #ff007f' }}>
                <div>
                  <strong>{pos.nome}</strong><br/>
                  <small style={{ color: '#94a3b8' }}>Staff: {contratados}/{pos.max} | Bônus: +R$ {pos.renda}/dia</small>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setCargoEntrevista({ cargo: pos, negId: meu.id, negNome: meu.nome })}
                    disabled={contratados >= pos.max}
                    style={{ padding: '8px 12px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Entrevistar
                  </button>
                  <button 
                    onClick={() => gerirEmpresa(meu.id, "demitir", pos.id)}
                    disabled={contratados <= 0}
                    style={{ padding: '8px 12px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Demitir
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <h3 style={{ color: '#fff' }}>🏗️ Melhorias Gerais</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button onClick={() => gerirEmpresa(meu.id, "marketing")} style={btnAdmin}>📢 Campanha de Marketing (R$ 5.000)</button>
          <button onClick={() => gerirEmpresa(meu.id, "reforma")} style={btnAdmin}>🏗️ Reformar Infraestrutura (R$ {(Math.round(meu.preco * 0.4)).toLocaleString()})</button>
        </div>
      </div>
    );
  }

  // TELA PADRÃO DO DISTRITO
  return (
    <div style={{ padding: '20px', maxWidth: '680px', margin: '0 auto', color: '#fff', backgroundColor: '#1b0014', borderRadius: '10px', border: '1px solid #ff007f' }}>
      <h2 style={{ color: '#ff007f' }}>🍸 Distrito Noturno</h2>
      <p style={{ color: '#2ecc71', fontWeight: 'bold' }}>💰 Saldo: R$ {player.dinheiro?.toLocaleString()}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #833471', paddingBottom: '10px' }}>
        <button onClick={() => setAba('diversao')} style={aba === 'diversao' ? abaAtiva : abaInativa}>💃 Strip Club</button>
        <button onClick={() => setAba('gestao')} style={aba === 'gestao' ? { ...abaAtiva, backgroundColor: '#f1c40f', color: '#000' } : abaInativa}>👑 Negócios</button>
      </div>

      {aba === 'diversao' && (
        <div style={{ backgroundColor: '#2d0a24', padding: '15px', borderRadius: '8px', border: '1px solid #ff007f' }}>
          <h3 style={{ color: '#ff007f' }}>💋 Strip Lounge "Velvet"</h3>
          <p style={{ fontSize: '13px', color: '#ccc' }}>O luxo custa caro, o sorriso das dançarinas também.</p>
          <button onClick={comprarLapDance} style={btnRoxo}>🔥 Lap Dance Privada (R$ 300)</button>
        </div>
      )}

      {aba === 'gestao' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {catalogoNegocios.map(neg => {
            const meu = player.negocios?.[neg.id];
            return (
              <div key={neg.id} style={{ backgroundColor: '#2d0a24', padding: '15px', borderRadius: '8px', border: meu ? '2px solid #f1c40f' : '1px solid #444' }}>
                <h3 style={{ color: meu ? '#f1c40f' : '#fff', margin: '0 0 10px 0' }}>{meu ? '👑 ' : ''}{neg.nome}</h3>
                <p style={{ fontSize: '12px', color: '#ccc', marginBottom: '10px' }}>{neg.desc}</p>
                {meu ? (
                  <button onClick={() => setNegocioAberto(neg)} style={{ width: '100%', padding: '12px', backgroundColor: '#f1c40f', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Entrar na Administração
                  </button>
                ) : (
                  <button onClick={() => comprarNegocio(neg)} style={{ width: '100%', padding: '10px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Adquirir por R$ {neg.preco.toLocaleString()}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', padding: '12px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>⬅️ Voltar ao Mapa</button>
    </div>
  );
}

const abaAtiva = { padding: '10px 15px', backgroundColor: '#ff007f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const abaInativa = { padding: '10px 15px', backgroundColor: '#353b48', color: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnRoxo = { width: '100%', padding: '12px', backgroundColor: '#833471', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const btnAdmin = { padding: '12px', backgroundColor: '#34495e', color: '#fff', border: '1px solid #555', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' };