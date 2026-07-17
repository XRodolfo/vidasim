import React, { useState } from 'react';
import { descricaoGravidez } from '../../utils/reproductionSystem';
import { posicoesPorNegocio, calcularLucroDia } from '../../utils/businessSystem';
import EntrevistaDialog from './EntrevistaDialog';

export default function AppInventario({ player, setPlayer, mundo, voltarHome }) {
  const [abaAtiva, setAbaAtiva] = useState("assets");
  const [negocioSobGestao, setNegocioSobGestao] = useState(null); // id do negócio aberto para gestão
  const [cargoEntrevista, setCargoEntrevista] = useState(null); // cargo que está sendo entrevistado

  const tabStyle = { padding: '8px', backgroundColor: '#1e293b', border: 'none', color: '#fff', cursor: 'pointer', flex: 1, marginRight: '4px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
  const tabAtivaStyle = { ...tabStyle, backgroundColor: '#3b82f6' };

  const itemStyle = { backgroundColor: '#0f172a', padding: '10px', marginBottom: '8px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' };

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
      if (player.dinheiro < 5000) {
        alert("Sem fundos suficientes (R$ 5.000)!");
        return;
      }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        meu.marketing = (meu.marketing || 1) + 1;
        negocios[id] = meu;
        return {
          ...prev,
          dinheiro: prev.dinheiro - 5000,
          negocios
        };
      });
      alert("Campanha de marketing lançada com sucesso!");
    } else if (tipo === "reforma") {
      const custo = Math.round(neg.preco * 0.4);
      if (player.dinheiro < custo) {
        alert(`A reforma de infraestrutura custa R$ ${custo.toLocaleString()}!`);
        return;
      }
      setPlayer(prev => {
        const negocios = { ...prev.negocios };
        const meu = { ...negocios[id] };
        meu.nivel = (meu.nivel || 1) + 1;
        meu.rendaBase = Math.round(meu.rendaBase * 1.5);
        negocios[id] = meu;
        return {
          ...prev,
          dinheiro: prev.dinheiro - custo,
          negocios
        };
      });
      alert(`🎉 Reforma concluída! Estabelecimento melhorado para Nível ${neg.nivel + 1 || 2}.`);
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
            
            {/* Harém / Apartamento de Origem */}
            <div style={itemStyle}>
              <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>Apartamento Simples (Início)</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Qualidade: ⭐ | Valor: Inicial</div>
              <div style={{ marginTop: '5px' }}>
                {player.casa?.tipo === "apartamento_simples" ? (
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '11px' }}>🏡 Residência Principal</span>
                ) : (
                  <button
                    onClick={() => {
                      if (setPlayer) {
                        setPlayer(prev => ({
                          ...prev,
                          casa: { ...prev.casa, tipo: "apartamento_simples", nome: "Apartamento Simples" }
                        }));
                      }
                      alert("Residência principal alterada para: Apartamento Simples!");
                    }}
                    style={btnMiniAction}
                  >
                    Mudar para esta casa
                  </button>
                )}
              </div>
            </div>

            {player.inventario?.imoveis && player.inventario.imoveis.length > 0 ? (
              player.inventario.imoveis.map((imovel, idx) => {
                const eMoradiaPrincipal = player.casa?.tipo === imovel.tipo;
                const diasDePosse = player.dia - (imovel.diaCompra || 1);
                const precoVenda = Math.round(imovel.preco * (0.8 + (diasDePosse * 0.015)));
                return (
                  <div key={idx} style={itemStyle}>
                    <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>{imovel.nome}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Qualidade: {'⭐'.repeat(imovel.qualidade)} | Valor Pago: R$ {imovel.preco.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: '#fb7185' }}>
                      Valor de Venda: R$ {precoVenda.toLocaleString()} (Possuído há {diasDePosse} dias)
                    </div>
                    <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
                      {eMoradiaPrincipal ? (
                        <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '11px' }}>🏡 Residência Principal</span>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              if (setPlayer) {
                                setPlayer(prev => ({
                                  ...prev,
                                  casa: { ...prev.casa, tipo: imovel.tipo, nome: imovel.nome }
                                }));
                              }
                              alert(`Você mudou sua residência principal para: ${imovel.nome}`);
                            }}
                            style={btnMiniAction}
                          >
                            Mudar para esta casa
                          </button>
                          <button
                            onClick={() => {
                              if (!window.confirm(`Tem certeza que deseja vender ${imovel.nome} por R$ ${precoVenda.toLocaleString()}?`)) return;
                              setPlayer(prev => {
                                const novosImoveis = prev.inventario?.imoveis?.filter(im => im.id !== imovel.id) || [];
                                return {
                                  ...prev,
                                  dinheiro: prev.dinheiro + precoVenda,
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
              player.inventario.itens.map((item, idx) => (
                <div key={idx} style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>
                    {item.nome} {item.quantidade ? `(x${item.quantidade})` : ''}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Tipo: {item.tipo} | Efeito: {item.efeito}
                  </div>
                </div>
              ))
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
            
            {player.genero === "Mulher" ? (
              <>
                <div style={itemStyle}>
                  <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '13px' }}>
                    Status: {descricaoGravidez(player.dadosReproductivos)}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>Virgindade</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {player.dadosReproductivos?.virgem ? '✨ Ainda virgem' : '✅ Já iniciou atividade sexual'}
                  </div>
                </div>

                <div style={itemStyle}>
                  <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>Contraceptivo Ativo</div>
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
                    <div style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '13px' }}>⚠️ Gravidez Ativa</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Semanas: {Math.floor(player.dadosReproductivos.semanasGravidez)}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ color: '#64748b', fontSize: '12px' }}>
                ℹ️ Você não é mulher biológica. Status de gravidez não se aplica.
              </div>
            )}

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