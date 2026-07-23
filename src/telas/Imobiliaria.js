import React, { useState, useEffect } from 'react';
import { tiposImoveis } from '../utils/inventorySystem';

export default function Imobiliaria({ player, setPlayer, setTelaAtual, mundo }) {
  const [msg, setMsg] = useState("Invista no seu teto. Deixe de pagar aluguel e compre ou alugue um imóvel.");
  const [ofertas, setOfertas] = useState([]);

  // Gera ofertas imobiliárias aleatórias na montagem da tela
  useEffect(() => {
    const novasOfertas = [];
    const nomesPorTipo = {
      apartamento_simples: ["Apartamento Conjugado", "Estúdio Loft", "Kitchenette Compacta", "Quarto e Sala de Estudante"],
      apartamento_moderno: ["Apartamento Duplex", "Condomínio Executivo", "Flat Totalmente Decorado", "Apartamento com Varanda Gourmet"],
      casa_pequena: ["Casa de Vila Geminada", "Sobrado Aconchegante", "Chalé Rústico de Madeira", "Casa de Subúrbio Clássica"],
      casa_grande: ["Mansão Contemporânea", "Casa com Piscina Aquecida", "Residência de Alto Padrão", "Casa de Campo Familiar"],
      penthouse: ["Penthouse Luxuosa", "Cobertura Triplex com SPA", "Skyline Loft Premium", "Rooftop com Vista Panorâmica"]
    };

    const cidadeNome = mundo[player.cidade_id]?.nome || "Cidade";
    const custoVida = mundo[player.cidade_id]?.custo_vida || 1.0;

    // Gera 4 ofertas para comprar e 4 ofertas para alugar
    const tipos = Object.keys(tiposImoveis);
    
    // Ofertas de Compra
    for (let i = 0; i < 4; i++) {
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      const baseInfo = tiposImoveis[tipo];
      const nomes = nomesPorTipo[tipo];
      const nomeSorteado = `${nomes[Math.floor(Math.random() * nomes.length)]} em ${cidadeNome}`;
      
      const varFactor = 0.85 + Math.random() * 0.3; // +- 15% variação
      const precoFinal = Math.round(baseInfo.preco * varFactor * custoVida);

      novasOfertas.push({
        id: `compra_${i}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        tipo: tipo,
        nome: nomeSorteado,
        preco: precoFinal,
        aluguel: 0,
        qualidade: baseInfo.qualidade,
        capacidade_pessoas: baseInfo.capacidade_pessoas,
        descricao: baseInfo.descricao,
        alugado: false,
        cidade: player.cidade_id
      });
    }

    // Ofertas de Aluguel
    for (let i = 0; i < 4; i++) {
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      const baseInfo = tiposImoveis[tipo];
      const nomes = nomesPorTipo[tipo];
      const nomeSorteado = `${nomes[Math.floor(Math.random() * nomes.length)]} (Alugado) em ${cidadeNome}`;
      
      const varFactor = 0.85 + Math.random() * 0.3;
      const aluguelMensal = Math.round((baseInfo.preco * 0.005) * varFactor * custoVida); // Aluguel é ~0.5% do valor da casa

      novasOfertas.push({
        id: `aluguel_${i}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        tipo: tipo,
        nome: nomeSorteado,
        preco: 0,
        aluguel: aluguelMensal,
        qualidade: baseInfo.qualidade,
        capacidade_pessoas: baseInfo.capacidade_pessoas,
        descricao: baseInfo.descricao,
        alugado: true,
        cidade: player.cidade_id
      });
    }

    setOfertas(novasOfertas);
  }, [player.cidade_id, mundo]);

  const handleComprar = (imovel) => {
    if (player.dinheiro < imovel.preco) {
      setMsg("❌ Crédito negado por fundos insuficientes.");
      return;
    }

    const novoImovel = {
      ...imovel,
      id: `imovel_${Date.now()}`,
      diaCompra: player.dia || 1
    };

    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - imovel.preco,
      casa: { id: novoImovel.id, tipo: novoImovel.tipo, nome: novoImovel.nome },
      inventario: {
        ...prev.inventario,
        imoveis: [...(prev.inventario?.imoveis || []), novoImovel]
      }
    }));

    setMsg(`🎉 Escritura assinada! Você comprou e mudou-se para: ${imovel.nome}.`);
    // Remove a oferta comprada da lista
    setOfertas(prev => prev.filter(o => o.id !== imovel.id));
  };

  const handleAlugar = (imovel) => {
    // Aluguel requer depósito do primeiro mês
    if (player.dinheiro < imovel.aluguel) {
      setMsg(`❌ Dinheiro insuficiente para o primeiro depósito de aluguel (R$ ${imovel.aluguel.toLocaleString()}).`);
      return;
    }

    const novoImovel = {
      ...imovel,
      id: `imovel_${Date.now()}`,
      diaCompra: player.dia || 1
    };

    setPlayer(prev => ({
      ...prev,
      dinheiro: prev.dinheiro - imovel.aluguel, // Paga primeiro aluguel adiantado
      casa: { id: novoImovel.id, tipo: novoImovel.tipo, nome: novoImovel.nome },
      inventario: {
        ...prev.inventario,
        imoveis: [...(prev.inventario?.imoveis || []), novoImovel]
      }
    }));

    setMsg(`🔑 Contrato de aluguel assinado! Você mudou-se para: ${imovel.nome}.`);
    // Remove a oferta alugada
    setOfertas(prev => prev.filter(o => o.id !== imovel.id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', color: '#fff' }}>
      <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
        <h2>🏢 Imobiliária Global Home</h2>
        <p style={{ color: '#2ed573', fontWeight: 'bold', fontSize: '18px' }}>💰 Carteira Atual: R$ {player.dinheiro?.toLocaleString()}</p>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', margin: '15px 0', borderLeft: '4px solid #3b82f6', fontSize: '13px' }}>
          {msg}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '5px' }}>
          {ofertas.map(i => {
            const labelAcao = i.alugado ? `Alugar [R$ ${i.aluguel.toLocaleString()}/mês]` : `Comprar [R$ ${i.preco.toLocaleString()}]`;
            const corAcao = i.alugado ? '#8b5cf6' : '#3b82f6';
            
            return (
              <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ flex: 1, paddingRight: '15px' }}>
                  <strong style={{ fontSize: '15px', color: i.alugado ? '#c084fc' : '#60a5fa' }}>
                    {i.alugado ? '🔑 [ALUGUEL] ' : '🏡 [COMPRA] '}{i.nome}
                  </strong><br/>
                  <small style={{ color: '#94a3b8' }}>{i.descricao}</small><br/>
                  <small style={{ color: '#a78bfa' }}>Qualidade: {'⭐'.repeat(i.qualidade)} | Cap: {i.capacidade_pessoas} pessoas</small>
                </div>
                <button 
                  onClick={() => i.alugado ? handleAlugar(i) : handleComprar(i)} 
                  style={{ backgroundColor: corAcao, color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', minWidth: '150px', fontSize: '12px' }}
                >
                  {labelAcao}
                </button>
              </div>
            );
          })}
        </div>

        <button onClick={() => setTelaAtual("mapa")} style={{ marginTop: '20px', backgroundColor: '#475569', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
          ⬅️ Voltar ao Mapa
        </button>
      </div>
    </div>
  );
}