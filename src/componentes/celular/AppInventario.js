import React, { useState } from 'react';
import { descricaoGravidez } from '../../utils/reproductionSystem';
import { posicoesPorNegocio, calcularLucroDia } from '../../utils/businessSystem';
import EntrevistaDialog from './EntrevistaDialog';

export default function AppInventario({ player, setPlayer, mundo, voltarHome, needs, setNeeds, needSystemRef }) {
  const [abaAtiva, setAbaAtiva] = useState("assets");
  const [negocioSobGestao, setNegocioSobGestao] = useState(null); // id do negócio aberto para gestão
  const [cargoEntrevista, setCargoEntrevista] = useState(null); // cargo que está sendo entrevistado

  const tabStyle = { padding: '8px', backgroundColor: '#1e293b', border: 'none', color: '#fff', cursor: 'pointer', flex: 1, marginRight: '4px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
  const tabAtivaStyle = { ...tabStyle, backgroundColor: '#3b82f6' };

  const itemStyle = { backgroundColor: '#0f172a', padding: '10px', marginBottom: '8px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' };

  const usarItem = (itemId) => {
    const item = player.inventario?.itens?.find(i => i.id === itemId);
    if (!item || (item.quantidade || 0) <= 0) {
      alert("Você não possui este item!");
      return;
    }

    setPlayer(prev => {
      const novosItens = prev.inventario.itens.map(i => {
        if (i.id === itemId) {
          return { ...i, quantidade: i.quantidade - 1 };
        }
        return i;
      }).filter(i => i.quantidade > 0);

      const dadosReprod = { ...prev.dadosReproductivos };
      let novosAtributos = {};

      if (itemId === "pilula") {
        dadosReprod.contraceptivoAtivo = "pilula";
      } else if (itemId === "preservativo") {
        dadosReprod.contraceptivoAtivo = "camisinha";
      } else if (itemId === "alcool") {
        novosAtributos.carisma = Math.min(100, (prev.carisma || 50) + 12);
      } else if (itemId === "chocolate") {
        novosAtributos.energia = Math.min(100, (prev.energia || 100) + 15);
      } else if (itemId === "perfume") {
        novosAtributos.carisma = Math.min(100, (prev.carisma || 50) + 15);
      } else if (itemId === "lingerie") {
        dadosReprod.roupaIntimaEquipada = true;
      }

      return {
        ...prev,
        energia: novosAtributos.energia !== undefined ? novosAtributos.energia : prev.energia,
        carisma: novosAtributos.carisma !== undefined ? novosAtributos.carisma : prev.carisma,
        dadosReproductivos: dadosReprod,
        inventario: {
          ...prev.inventario,
          itens: novosItens
        }
      };
    });

    // Apply needs updates to needSystemRef and state
    if (needSystemRef?.current && setNeeds) {
      if (itemId === "alcool") {
        needSystemRef.current.addNeed("social", 25);
        needSystemRef.current.addNeed("ambition", 5);
        needSystemRef.current.addNeed("sleep", -5); // Alcohol drains sleep
      } else if (itemId === "chocolate") {
        needSystemRef.current.addNeed("hunger", 30);
        needSystemRef.current.addNeed("ambition", 15);
      } else if (itemId === "perfume") {
        needSystemRef.current.addNeed("ambition", 10);
      } else if (itemId === "lingerie") {
        needSystemRef.current.addNeed("ambition", 15);
      }
      setNeeds(needSystemRef.current.getNeeds());
    }

    if (itemId === "pilula") {
      alert("💊 Pílula anticoncepcional ingerida. Contraceptivo ativo alterado para Pílula.");
    } else if (itemId === "preservativo") {
      alert("👉 Você ativou a Camisinha como seu contraceptivo ativo principal.");
    } else if (itemId === "alcool") {
      alert("🍺 Você tomou a bebida alcoólica. Sente-se desinibido! (+25 Social, +12 Carisma, -5% Sono)");
    } else if (itemId === "chocolate") {
      alert("🍫 Você comeu o chocolate especial. Delicioso! (+30 Fome, +15 Ambição, +15% Energia)");
    } else if (itemId === "perfume") {
      alert("✨ Você passou o perfume premium. Sente-se mais atraente! (+15 Carisma, +10 Ambição)");
    } else if (itemId === "lingerie") {
      alert("👗 Você vestiu a lingerie sensual. Aumentou sua confiança! (+15 Ambição)");
    }
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
      const negMarketing = neg.marketing || 1;
      if (negMarketing >= 10) {
        alert("O marketing já atingiu o nível máximo (10)!");
        return;
      }
      if (player.dinheiro < 5000) {
        alert("Sem fundos suficientes (R$ 5.000)!");
        return;
      }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        meu.marketing = negMarketing + 1;
        negocios[id] = meu;
        return {
          ...prev,
          dinheiro: prev.dinheiro - 5000,
          negocios
        };
      });
      alert("Campanha de marketing lançada com sucesso!");
    } else if (tipo === "reforma") {
      const negNivel = neg.nivel || 1;
      if (negNivel >= 5) {
        alert("O estabelecimento já atingiu o nível estrutural máximo (5⭐)!");
        return;
      }
      const custo = Math.round(neg.preco * 0.4);
      if (player.dinheiro < custo) {
        alert(`A reforma de infraestrutura custa R$ ${custo.toLocaleString()}!`);
        return;
      }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        meu.nivel = negNivel + 1;
        meu.rendaBase = Math.round(meu.rendaBase * 1.5);
        negocios[id] = meu;
        return {
          ...prev,
          dinheiro: prev.dinheiro - custo,
          negocios
        };
      });
      alert(`🎉 Reforma concluída! Estabelecimento melhorado para Nível ${negNivel + 1}.`);
    }
  };

  const recolherLucros = (id) => {
    const neg = player.negocios?.[id];
    const lucro = neg?.cofre || 0;
    if (lucro <= 0) {
      alert("O cofre está vazio!");
      return;
    }
    setPlayer(prev => {
      const negocios = { ...prev.negocios };
      const meu = { ...negocios[id] };
      meu.cofre = 0;
      negocios[id] = meu;
      return {
        ...prev,
        dinheiro: prev.dinheiro + lucro,
        negocios
      };
    });
    alert(`💰 R$ ${lucro.toLocaleString()} transferidos para sua conta!`);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* MINIJOGO DE ENTREVISTA */}
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

      {/* ABAS */}
      <div style={{ display: 'flex', gap: '2px', padding: '5px', borderBottom: '1px solid #1e293b' }}>
        <button onClick={() => setAbaAtiva("assets")} style={abaAtiva === "assets" ? tabAtivaStyle : tabStyle}>
          🏠 Assets
        </button>
        <button onClick={() => setAbaAtiva("items")} style={abaAtiva === "items" ? tabAtivaStyle : tabStyle}>
          📦 Itens
        </button>
        <button onClick={() => setAbaAtiva("negocios")} style={abaAtiva === "negocios" ? tabAtivaStyle : tabStyle}>
          🏢 Negócios
        </button>
        <button onClick={() => setAbaAtiva("status")} style={abaAtiva === "status" ? tabAtivaStyle : tabStyle}>
          💓 Status
        </button>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {/* ABA ASSETS */}
        {abaAtiva === "assets" && (
          <div>
            <h3 style={{ color: '#60a5fa', marginTop: 0, fontSize: '14px' }}>🏡 Moradias</h3>
            
            {player.inventario?.imoveis && player.inventario.imoveis.length > 0 ? (
              player.inventario.imoveis.map((imovel, idx) => {
                const eMoradiaPrincipal = player.casa?.id === imovel.id;
                const naCidadeAtual = imovel.cidade === player.cidade_id;
                const cidadeNome = mundo[imovel.cidade]?.nome || "Outra Cidade";
                const diasDePosse = player.dia - (imovel.diaCompra || 1);
                const precoVenda = imovel.preco ? Math.round(imovel.preco * (0.8 + (diasDePosse * 0.015))) : 0;
                return (
                  <div key={imovel.id || idx} style={itemStyle}>
                    <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>
                      {imovel.nome} {eMoradiaPrincipal && " (Principal)"}
                      {imovel.alugadoParaInquilino && <span style={{ color: '#10b981', fontSize: '11px', marginLeft: '6px' }}>[ALUGADO A INQUILINO]</span>}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Cidade: <strong>{cidadeNome}</strong> | Qualidade: {'⭐'.repeat(imovel.qualidade)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>
                      {imovel.alugado ? (
                        <span style={{ color: '#c084fc' }}>🔑 Você paga: R$ {imovel.aluguel.toLocaleString()}/mês</span>
                      ) : (
                        <span>💰 Comprado por: R$ {imovel.preco.toLocaleString()}</span>
                      )}
                    </div>
                    {imovel.alugadoParaInquilino && (
                      <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold', marginTop: '2px' }}>
                        📈 Rendimento passivo: +R$ {imovel.rendimentoAluguel.toLocaleString()}/mês (+R$ {Math.round(imovel.rendimentoAluguel / 30)}/dia)
                      </div>
                    )}
                    {!imovel.alugado && !imovel.alugadoParaInquilino && (
                      <div style={{ fontSize: '11px', color: '#fb7185' }}>
                        Valor de Venda: R$ {precoVenda.toLocaleString()} (Possuído há {diasDePosse} dias)
                      </div>
                    )}
                    <div style={{ marginTop: '5px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {eMoradiaPrincipal ? (
                        <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '11px' }}>🏡 Residência Principal</span>
                      ) : (
                        <>
                          {naCidadeAtual && !imovel.alugadoParaInquilino ? (
                            <button
                              onClick={() => {
                                if (setPlayer) {
                                  setPlayer(prev => ({
                                    ...prev,
                                    casa: { id: imovel.id, tipo: imovel.tipo, nome: imovel.nome }
                                  }));
                                }
                                alert(`Você mudou sua residência principal para: ${imovel.nome}`);
                              }}
                              style={btnMiniAction}
                            >
                              Mudar para esta casa
                            </button>
                          ) : (
                            naCidadeAtual && imovel.alugadoParaInquilino ? null : (
                              <span style={{ color: '#94a3b8', fontSize: '11px', fontStyle: 'italic' }}>
                                📍 Disponível apenas em {cidadeNome}
                              </span>
                            )
                          )}

                          {imovel.alugado ? (
                            <button
                              onClick={() => {
                                if (!window.confirm(`Tem certeza que deseja cancelar o aluguel de ${imovel.nome}?`)) return;
                                setPlayer(prev => {
                                  const novosImoveis = prev.inventario?.imoveis?.filter(im => im.id !== imovel.id) || [];
                                  const novaCasa = prev.casa?.id === imovel.id
                                    ? { id: "albergue", tipo: "apartamento_simples", nome: "Albergue Municipal" }
                                    : prev.casa;
                                  return {
                                    ...prev,
                                    casa: novaCasa,
                                    inventario: {
                                      ...prev.inventario,
                                      imoveis: novosImoveis
                                    }
                                  };
                                });
                                alert(`🔑 Aluguel de ${imovel.nome} cancelado.`);
                              }}
                              style={{ ...btnMiniAction, backgroundColor: '#f97316' }}
                            >
                              Cancelar Aluguel
                            </button>
                          ) : (
                            <>
                              {imovel.alugadoParaInquilino ? (
                                <button
                                  onClick={() => {
                                    if (!window.confirm(`Tem certeza que deseja despejar o inquilino de ${imovel.nome}?`)) return;
                                    setPlayer(prev => {
                                      const novosImoveis = prev.inventario?.imoveis?.map(im => {
                                        if (im.id === imovel.id) {
                                          return { ...im, alugadoParaInquilino: false, rendimentoAluguel: 0 };
                                        }
                                        return im;
                                      }) || [];
                                      return {
                                        ...prev,
                                        inventario: {
                                          ...prev.inventario,
                                          imoveis: novosImoveis
                                        }
                                      };
                                    });
                                    alert(`🚫 Você despejou o inquilino de ${imovel.nome}. O imóvel agora está disponível.`);
                                  }}
                                  style={{ ...btnMiniAction, backgroundColor: '#f97316' }}
                                >
                                  Despejar Inquilino
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      const rentValue = Math.round(imovel.preco * 0.0055);
                                      if (!window.confirm(`Gostaria de alugar ${imovel.nome} para um inquilino por R$ ${rentValue.toLocaleString()}/mês?`)) return;
                                      setPlayer(prev => {
                                        const novosImoveis = prev.inventario?.imoveis?.map(im => {
                                          if (im.id === imovel.id) {
                                            return { ...im, alugadoParaInquilino: true, rendimentoAluguel: rentValue };
                                          }
                                          return im;
                                        }) || [];
                                        return {
                                          ...prev,
                                          inventario: {
                                            ...prev.inventario,
                                            imoveis: novosImoveis
                                          }
                                        };
                                      });
                                      alert(`📈 Imóvel alugado com sucesso! Você receberá R$ ${rentValue.toLocaleString()}/mês passivamente.`);
                                    }}
                                    style={{ ...btnMiniAction, backgroundColor: '#10b981' }}
                                  >
                                    Alugar para Inquilino
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (!window.confirm(`Tem certeza que deseja vender ${imovel.nome} por R$ ${precoVenda.toLocaleString()}?`)) return;
                                      setPlayer(prev => {
                                        const novosImoveis = prev.inventario?.imoveis?.filter(im => im.id !== imovel.id) || [];
                                        const novaCasa = prev.casa?.id === imovel.id
                                          ? { id: "albergue", tipo: "apartamento_simples", nome: "Albergue Municipal" }
                                          : prev.casa;
                                        return {
                                          ...prev,
                                          dinheiro: prev.dinheiro + precoVenda,
                                          casa: novaCasa,
                                          inventario: {
                                            ...prev.inventario,
                                            imoveis: novosImoveis
                                          }
                                        };
                                      });
                                      alert(`💰 Você vendeu ${imovel.nome} por R$ ${precoVenda.toLocaleString()}!`);
                                    }}
                                    style={{ ...btnMiniAction, backgroundColor: '#ef4444' }}
                                  >
                                    Vender
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            ) : null}

            <h3 style={{ color: '#60a5fa', marginTop: '15px', fontSize: '14px' }}>🚗 Garagem</h3>
            {player.inventario?.veiculos && player.inventario.veiculos.length > 0 ? (
              player.inventario.veiculos.map((veiculo, idx) => {
                const precoVenda = Math.round(veiculo.preco * 0.7);
                return (
                  <div key={idx} style={itemStyle}>
                    <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>{veiculo.nome}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Deslocamento: {veiculo.velocidade}x | Gasolina: {veiculo.combustivel_atual}%
                    </div>
                    <div style={{ fontSize: '11px', color: '#fb7185' }}>
                      Valor de Venda: R$ {precoVenda.toLocaleString()} (Depreciação de 30%)
                    </div>
                    <div style={{ marginTop: '5px' }}>
                      <button
                        onClick={() => {
                          if (!window.confirm(`Tem certeza que deseja vender seu/sua ${veiculo.nome} por R$ ${precoVenda.toLocaleString()}?`)) return;
                          setPlayer(prev => {
                            const novosVeiculos = prev.inventario?.veiculos?.filter(v => v.id !== veiculo.id) || [];
                            return {
                              ...prev,
                              dinheiro: prev.dinheiro + precoVenda,
                              inventario: {
                                ...prev.inventario,
                                veiculos: novosVeiculos
                              }
                            };
                          });
                          alert(`💰 Você vendeu seu/sua ${veiculo.nome} por R$ ${precoVenda.toLocaleString()}!`);
                        }}
                        style={{ ...btnMiniAction, backgroundColor: '#ef4444' }}
                      >
                        Vender Veículo
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: '#64748b', fontSize: '12px' }}>
                Garagem vazia. Compre veículos na concessionária.
              </div>
            )}

            <h3 style={{ color: '#60a5fa', marginTop: '15px', fontSize: '14px' }}>💰 Balanço Financeiro</h3>
            <div style={itemStyle}>
              <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px' }}>
                Disponível: R$ {player.dinheiro?.toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                Patrimônio estimado: R$ {((player.inventario?.imoveis?.reduce((sum, i) => sum + i.preco, 0) || 0) + 
                  (player.inventario?.veiculos?.reduce((sum, v) => sum + v.preco, 0) || 0)).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* ABA ITENS */}
        {abaAtiva === "items" && (
          <div>
            <h3 style={{ color: '#60a5fa', marginTop: 0, fontSize: '14px' }}>📦 Itens em Mãos</h3>
            {player.inventario?.itens && player.inventario.itens.length > 0 ? (
              player.inventario.itens.map((item, idx) => {
                const podeUsar = ["preservativo", "pilula", "alcool", "chocolate", "lingerie", "perfume"].includes(item.id);
                return (
                  <div key={idx} style={itemStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>
                          {item.nome} {item.quantidade ? `(x${item.quantidade})` : ''}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          Tipo: {item.tipo} | Efeito: {item.efeito}
                        </div>
                      </div>
                      {podeUsar && (
                        <button
                          onClick={() => usarItem(item.id)}
                          style={{
                            ...btnMiniAction,
                            backgroundColor: '#10b981',
                            padding: '6px 12px',
                            borderRadius: '4px'
                          }}
                        >
                          Usar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: '#64748b', fontSize: '12px' }}>
                Nenhum consumível ou roupa íntima sensual em inventário.
              </div>
            )}
          </div>
        )}

        {/* ABA NEGÓCIOS */}
        {abaAtiva === "negocios" && (
          <div>
            {!negocioSobGestao ? (
              <div>
                <h3 style={{ color: '#60a5fa', marginTop: 0, fontSize: '14px' }}>💼 Suas Franquias & Negócios</h3>
                {player.negocios && Object.keys(player.negocios).length > 0 ? (
                  Object.keys(player.negocios).map(id => {
                    const meu = player.negocios[id];
                    const receita = calcularLucroDia(meu);
                    return (
                      <div key={id} style={itemStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: '#a78bfa', fontSize: '13px' }}>{meu.nome}</strong>
                          <span style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '11px' }}>+R$ {receita}/dia</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#cbd5e1', margin: '4px 0' }}>
                          Cofre: <strong style={{ color: '#10b981' }}>R$ {(meu.cofre || 0).toLocaleString()}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
                          <button onClick={() => setNegocioSobGestao(meu)} style={{ ...btnMiniAction, backgroundColor: '#c084fc' }}>⚙️ Administrar</button>
                          <button onClick={() => recolherLucros(meu.id)} disabled={(meu.cofre || 0) <= 0} style={{ ...btnMiniAction, backgroundColor: '#10b981', opacity: (meu.cofre || 0) <= 0 ? 0.5 : 1 }}>💰 Sacar</button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ color: '#64748b', fontSize: '12px' }}>
                    Você não possui negócios. Compre bares, cassinos ou lojas para gerar renda diária.
                  </div>
                )}
              </div>
            ) : (
              // ADMINISTRAÇÃO PROFUNDA DO NEGÓCIO
              <div style={{ backgroundColor: '#11041c', padding: '10px', borderRadius: '8px', border: '1px solid #c084fc' }}>
                <button onClick={() => setNegocioSobGestao(null)} style={{ ...btnMiniAction, backgroundColor: '#475569', marginBottom: '10px' }}>← Voltar</button>
                <h4 style={{ color: '#f1c40f', margin: '0 0 5px 0', fontSize: '13px' }}>⚙️ Gestão: {negocioSobGestao.nome}</h4>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>
                  Nível Estrutural: <strong>{player.negocios[negocioSobGestao.id]?.nivel || 1}⭐</strong> | Marketing: <strong>Nvl {player.negocios[negocioSobGestao.id]?.marketing || 1}</strong>
                </div>

                <div style={{ backgroundColor: '#000', padding: '8px', borderRadius: '6px', marginBottom: '10px', fontSize: '11px' }}>
                  💰 Cofre acumulado: <strong style={{ color: '#10b981' }}>R$ {(player.negocios[negocioSobGestao.id]?.cofre || 0).toLocaleString()}</strong>
                  <button onClick={() => recolherLucros(negocioSobGestao.id)} style={{ float: 'right', padding: '3px 6px', backgroundColor: '#f1c40f', color: '#000', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px', fontWeight: 'bold' }}>Sacar</button>
                </div>

                {/* LISTAGEM DE CARGOS DISPONÍVEIS */}
                <h5 style={{ color: '#c084fc', margin: '10px 0 5px 0', fontSize: '11px' }}>👥 Funcionários por Cargo:</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '180px', overflowY: 'auto', marginBottom: '10px', paddingRight: '2px' }}>
                  {posicoesPorNegocio[negocioSobGestao.id]?.map(pos => {
                    const contratados = player.negocios[negocioSobGestao.id]?.funcionarios?.[pos.id] || 0;
                    return (
                      <div key={pos.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e1b4b', padding: '6px', borderRadius: '4px', fontSize: '11px', border: '1px solid #3b3b4f' }}>
                        <div>
                          <strong>{pos.nome}</strong><br/>
                          <span style={{ color: '#94a3b8', fontSize: '10px' }}>Staff: {contratados}/{pos.max} | +R$ {pos.renda}/dia</span>
                        </div>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          <button 
                            onClick={() => setCargoEntrevista({ cargo: pos, negId: negocioSobGestao.id, negNome: negocioSobGestao.nome })}
                            disabled={contratados >= pos.max} 
                            style={{ padding: '4px 6px', backgroundColor: '#c084fc', border: 'none', borderRadius: '3px', color: '#fff', cursor: 'pointer', fontSize: '9px', fontWeight: 'bold' }}
                          >
                            Entrevistar
                          </button>
                          <button 
                            onClick={() => gerirEmpresa(negocioSobGestao.id, "demitir", pos.id)} 
                            disabled={contratados <= 0} 
                            style={{ padding: '4px 6px', backgroundColor: '#ef4444', border: 'none', borderRadius: '3px', color: '#fff', cursor: 'pointer', fontSize: '9px', fontWeight: 'bold' }}
                          >
                            Demitir
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* MELHORIAS GERAIS */}
                <h5 style={{ color: '#c084fc', margin: '10px 0 5px 0', fontSize: '11px' }}>🏗️ Melhorias do Estabelecimento:</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <button onClick={() => gerirEmpresa(negocioSobGestao.id, "marketing")} style={btnManageAction}>📢 Campanha de Marketing (R$ 5.000)</button>
                  <button onClick={() => gerirEmpresa(negocioSobGestao.id, "reforma")} style={btnManageAction}>🏗️ Reforma de Infraestrutura (R$ {Math.round(negocioSobGestao.preco * 0.4).toLocaleString()})</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABA STATUS */}
        {abaAtiva === "status" && (
          <div>
            <h3 style={{ color: '#60a5fa', marginTop: 0, fontSize: '14px' }}>💓 Status de Reprodução</h3>
            
            {player.dadosReproductivos ? (
              <>
                <div style={itemStyle}>
                  <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '13px' }}>
                    Status: {descricaoGravidez(player.dadosReproductivos, player.genero)}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>Virgindade</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {player.dadosReproductivos?.virgem ? '✨ Ainda virgem' : '✅ Já iniciou atividade sexual'}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>
                    {player.genero === "Mulher" ? "Contraceptivo Ativo" : "Contraceptivo do Casal"}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {player.dadosReproductivos?.contraceptivoAtivo || 'Nenhum'}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>Filhos</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Total: {player.dadosReproductivos?.numeroFilhos || 0}
                  </div>
                </div>

                {player.dadosReproductivos?.statusGravidez !== 0 && (
                  <div style={{ ...itemStyle, borderLeftColor: '#ec4899' }}>
                    <div style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '13px' }}>
                      {player.genero === "Mulher" ? "⚠️ Gravidez Ativa" : "⚠️ Parceira Grávida"}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Semanas: {Math.floor(player.dadosReproductivos.semanasGravidez)}
                    </div>
                  </div>
                )}
              </>
            ) : null}

            <h3 style={{ color: '#60a5fa', marginTop: '15px', fontSize: '14px' }}>📊 Habilidades Sexuais</h3>
            <div style={itemStyle}>
              <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px' }}>
                Perícia Sexual: {player.periciaSexual || 15}/100
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#0f172a', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${((player.periciaSexual || 15) / 100) * 100}%`, 
                  height: '100%', 
                  backgroundColor: '#ec4899',
                  transition: '0.3s'
                }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={voltarHome}
        style={{
          backgroundColor: '#334155',
          border: 'none',
          color: '#fff',
          padding: '10px',
          borderRadius: '6px',
          cursor: 'pointer',
          margin: '5px 10px 10px 10px',
          fontWeight: 'bold',
          fontSize: '13px'
        }}
      >
        ← Voltar ao Home
      </button>
    </div>
  );
}

const btnMiniAction = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '4px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '11px',
  fontWeight: 'bold'
};

const btnManageAction = {
  width: '100%',
  padding: '8px',
  backgroundColor: '#34495e',
  color: '#fff',
  border: '1px solid #555',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '10px',
  textAlign: 'left'
};