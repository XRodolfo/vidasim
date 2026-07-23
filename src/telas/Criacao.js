import React from 'react';
import Avatar from '../componentes/Avatar';
import { cmParaPol } from '../dados';
import { AVATAR_ASSETS } from '../componentes/avatar_assets';

export default function Criacao({ player, setPlayer, mundo, t, iniciarJogo, setTelaAtual }) {
  
  const tonsDePele = { 
    "Latina": "#d2a172", "Asiática": "#fbe7a1", 
    "Mista": "#c68642", "Negra": "#5c3317", "Branca": "#ffdbac" 
  };

  const cabelosPorGenero = {
    "Mulher": [
      { id: "Messy", nome: "Bagunçado (Messy)" },
      { id: "Luxurious", nome: "Ondulado Luxuoso (Luxurious)" },
      { id: "Afro", nome: "Afro / Black Power" },
      { id: "Braided", nome: "Trançado (Braided)" },
      { id: "Bun", nome: "Coque (Bun)" },
      { id: "Cornrows", nome: "Trancinhas (Cornrows)" },
      { id: "Curled", nome: "Cacheado Curto (Curled)" },
      { id: "Dreadlocks", nome: "Dreadlocks" },
      { id: "Neat", nome: "Liso Arrumado (Neat)" },
      { id: "Ponytail", nome: "Rabo de Cavalo (Ponytail)" },
      { id: "Tails", nome: "Maria-chiquinha (Tails)" },
      { id: "Up", nome: "Coque Alto (Up)" },
      { id: "Careca", nome: "Careca" }
    ],
    "Homem": [
      { id: "Messy", nome: "Bagunçado (Messy)" },
      { id: "Neat", nome: "Liso Arrumado (Neat)" },
      { id: "Undercut", nome: "Undercut (Raspado Lateral)" },
      { id: "Strip", nome: "Moicano (Strip)" },
      { id: "Eary", nome: "Espetado (Eary)" },
      { id: "Ninja", nome: "Estilo Ninja (Ninja)" },
      { id: "Careca", nome: "Careca" }
    ]
  };

  const isEstiloValido = (estilo, length) => {
    if (estilo === "Careca") return true;
    const s = estilo.toLowerCase();
    
    // Undercut / Strip mapeiam para o cabelo frontal Strip
    if (s === "undercut" || s === "strip") {
      return !!AVATAR_ASSETS[`Art_Vector_Hair_Fore_Strip_${length}`];
    }
    
    // Ninja usa a chave Ninja
    if (s === "ninja") {
      return !!AVATAR_ASSETS[`Art_Vector_Hair_Back_Ninja_${length}`];
    }
    
    const capStyle = estilo.charAt(0).toUpperCase() + estilo.slice(1);
    
    // Bun / Neat / Ponytail usam apenas chaves traseiras com comprimento
    if (["bun", "neat", "ponytail"].includes(s)) {
      return !!AVATAR_ASSETS[`Art_Vector_Hair_Back_${capStyle}_${length}`];
    }
    
    return !!AVATAR_ASSETS[`Art_Vector_Hair_Back_${capStyle}_${length}`] || !!AVATAR_ASSETS[`Art_Vector_Hair_Fore_${capStyle}_${length}`];
  };

  const currentLength = player.comprimentoCabelo || "Medium";
  const listCabelos = cabelosPorGenero[player.genero] || cabelosPorGenero["Mulher"];
  const cabelosFiltrados = listCabelos.filter(h => isEstiloValido(h.id, currentLength));

  const handleGeneroChange = (g) => {
    let buscaDefault = g === "Mulher" ? "Homens" : "Mulheres";
    if (player.orientacao === "Homosexual") buscaDefault = g === "Mulher" ? "Mulheres" : "Homens";
    if (player.orientacao === "Bissexual" || player.orientacao === "Pansexual") buscaDefault = "Ambos";
    
    // Filtrar cabelos para o novo gênero
    const length = player.comprimentoCabelo || "Medium";
    const newList = cabelosPorGenero[g] || cabelosPorGenero["Mulher"];
    const validStyles = newList.filter(h => isEstiloValido(h.id, length));
    
    let currentStyle = player.estiloCabelo || "Messy";
    if (!validStyles.some(h => h.id === currentStyle)) {
      currentStyle = validStyles[0]?.id || "Careca";
    }

    setPlayer({ 
      ...player, 
      genero: g, 
      preferenciaBusca: buscaDefault,
      seios_cm: g === "Mulher" ? 95 : 0,
      penis_cm: g === "Homem" ? 14 : 0,
      estiloCabelo: currentStyle
    });
  };

  const handleOrientacaoChange = (o) => {
    let buscaDefault = player.genero === "Mulher" ? "Homens" : "Mulheres";
    if (o === "Homosexual") buscaDefault = player.genero === "Mulher" ? "Mulheres" : "Homens";
    if (o === "Bissexual" || o === "Pansexual" || o === "Assexual") buscaDefault = "Ambos";

    setPlayer({ ...player, orientacao: o, preferenciaBusca: buscaDefault });
  };

  const handleLengthChange = (length) => {
    let currentStyle = player.estiloCabelo || "Messy";
    const newList = cabelosPorGenero[player.genero] || cabelosPorGenero["Mulher"];
    const validStyles = newList.filter(h => isEstiloValido(h.id, length));
    
    if (!validStyles.some(h => h.id === currentStyle)) {
      currentStyle = validStyles[0]?.id || "Careca";
    }
    
    setPlayer({ ...player, comprimentoCabelo: length, estiloCabelo: currentStyle });
  };

  const handleEstiloCabeloChange = (estilo) => {
    let cabeloVal = "Curtos";
    if (estilo === "Careca") cabeloVal = "Careca";
    else if (["Luxurious", "Bun", "Ponytail", "Dreadlocks", "Tails", "Up"].includes(estilo)) cabeloVal = "Longos";

    setPlayer({ 
      ...player, 
      estiloCabelo: estilo, 
      cabelo: cabeloVal 
    });
  };

  return (
    <div className="container">
      <h1>{t.tituloCriacao}</h1>
      <div className="card">
        
        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          
          {/* COLUNA 1: IDENTIDADE E ORIENTAÇÃO */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <h2 style={{color: '#007bff'}}>Identidade</h2>
              
              <label>{t.nome}</label>
              <input type="text" value={player.nome} onChange={(e) => setPlayer({...player, nome: e.target.value})} />
              
              <label>{t.idade} (Mínimo 18 anos)</label>
              <input 
                type="number" min="18" value={player.idade} 
                onChange={(e) => setPlayer({...player, idade: parseInt(e.target.value) || 18})}
                onBlur={() => { if (player.idade < 18) setPlayer({...player, idade: 18}); }} 
              />
              
              <label>{t.genero}</label>
              <select value={player.genero} onChange={(e) => handleGeneroChange(e.target.value)}>
                  <option value="Mulher">{t.mulher}</option>
                  <option value="Homem">{t.homem}</option>
              </select>

              <label>🧬 Identidade de Gênero:</label>
              <select value={player.identidadeGenero || "Cisgênero"} onChange={(e) => setPlayer({...player, identidadeGenero: e.target.value})}>
                <option value="Cisgênero">Cisgênero (Identifica-se com o sexo biológico)</option>
                <option value="Transgênero">Transgênero</option>
                <option value="Não-Binário">Não-Binário</option>
              </select>

              <label>❤️ Orientação Sexual:</label>
              <select value={player.orientacao || "Heterossexual"} onChange={(e) => handleOrientacaoChange(e.target.value)}>
                <option value="Heterossexual">Heterossexual</option>
                <option value="Homosexual">Homossexual / Gay / Lésbica</option>
                <option value="Bissexual">Bissexual</option>
                <option value="Pansexual">Pansexual</option>
                <option value="Assexual">Assexual</option>
              </select>

              <label>🌐 Raça / Origem:</label>
              <select value={player.cidade_origem} onChange={(e) => setPlayer({...player, cidade_origem: e.target.value})}>
                  {Object.keys(mundo).map(id => <option key={`origem-${id}`} value={id}>{mundo[id].nome} ({mundo[id].etnia})</option>)}
              </select>

              <label>📍 Cidade Atual:</label>
              <select value={player.cidade_id} onChange={(e) => setPlayer({...player, cidade_id: e.target.value})}>
                  {Object.keys(mundo).map(id => <option key={`atual-${id}`} value={id}>{mundo[id].nome}</option>)}
              </select>
          </div>

          {/* COLUNA 2: FÍSICA E BIOLOGIA */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <h2 style={{color: '#ff4757'}}>Biologia do Corpo</h2>
              
              <label>Altura (cm)</label>
              <input type="number" value={player.altura} onChange={(e) => setPlayer({...player, altura: parseInt(e.target.value) || 160})} />
              
              <label>Peso (kg)</label>
              <input type="number" value={player.peso} onChange={(e) => setPlayer({...player, peso: parseInt(e.target.value) || 60})} />

              {/* IMC calculado automaticamente — força não é editável na criação */}
              {(() => {
                const imc = player.peso / Math.pow(player.altura / 100, 2);
                let imcLabel = '';
                let imcColor = '#ccc';
                if (imc < 18.5) { imcLabel = '🪶 Abaixo do peso'; imcColor = '#74b9ff'; }
                else if (imc < 25) { imcLabel = '✅ Peso normal'; imcColor = '#55efc4'; }
                else if (imc < 30) { imcLabel = '⚠️ Sobrepeso'; imcColor = '#fdcb6e'; }
                else { imcLabel = '🔴 Obesidade'; imcColor = '#ff6b6b'; }
                return (
                  <div style={{ padding: '8px 10px', backgroundColor: '#1a1a2e', borderRadius: '6px', border: '1px solid #333' }}>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: 2 }}>📊 IMC Calculado</div>
                    <div style={{ fontWeight: 'bold', color: imcColor }}>{imc.toFixed(1)} — {imcLabel}</div>
                    <div style={{ fontSize: '0.7rem', color: '#666', marginTop: 2 }}>A força é desenvolvida treinando na academia.</div>
                  </div>
                );
              })()}

              <label>🎨 Cor de Pele:</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select 
                  value={Object.values(tonsDePele).includes(player.corPele) ? player.corPele : "custom"} 
                  onChange={(e) => {
                    if (e.target.value !== "custom") {
                      setPlayer({...player, corPele: e.target.value});
                    }
                  }}
                  style={{ flex: 1 }}
                >
                  <option value="#ffdbac">Branca Padrão</option>
                  <option value="#F4EAF0">Muito Clara (Ivory)</option>
                  <option value="#F5D5C9">Clara (Pale)</option>
                  <option value="#fbe7a1">Asiática Padrão</option>
                  <option value="#F4C9AA">Bege Claro (Olive)</option>
                  <option value="#d2a172">Latina Padrão</option>
                  <option value="#E1B585">Bronzeada</option>
                  <option value="#c68642">Mista Padrão</option>
                  <option value="#D58E5F">Morena</option>
                  <option value="#825633">Negra Claro</option>
                  <option value="#5c3317">Negra Padrão</option>
                  <option value="#583E2F">Negra Retinta</option>
                  <option value="custom">Personalizada 🎨</option>
                </select>
                <input 
                  type="color" 
                  value={player.corPele || "#ffdbac"} 
                  onChange={(e) => setPlayer({...player, corPele: e.target.value})}
                  style={{ width: '40px', height: '36px', padding: 0, border: 'none', cursor: 'pointer' }}
                />
              </div>

              <label>👁️ Cor dos Olhos:</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select 
                  value={["#3498db", "#2ecc71", "#784f2f", "#111111", "#e74c3c", "#9b59b6"].includes(player.corOlhos) ? player.corOlhos : "custom"} 
                  onChange={(e) => {
                    if (e.target.value !== "custom") {
                      setPlayer({...player, corOlhos: e.target.value});
                    }
                  }}
                  style={{ flex: 1 }}
                >
                  <option value="#3498db">Azul</option>
                  <option value="#2ecc71">Verde</option>
                  <option value="#784f2f">Castanho</option>
                  <option value="#111111">Preto</option>
                  <option value="#e74c3c">Vermelho</option>
                  <option value="#9b59b6">Violeta</option>
                  <option value="custom">Personalizada 🎨</option>
                </select>
                <input 
                  type="color" 
                  value={player.corOlhos || "#3498db"} 
                  onChange={(e) => setPlayer({...player, corOlhos: e.target.value})}
                  style={{ width: '40px', height: '36px', padding: 0, border: 'none', cursor: 'pointer' }}
                />
              </div>

              <label>📏 Comprimento do Cabelo:</label>
              <select 
                value={player.comprimentoCabelo || "Medium"} 
                onChange={(e) => handleLengthChange(e.target.value)}
              >
                <option value="Short">Curto</option>
                <option value="Medium">Médio</option>
                <option value="Long">Longo</option>
                <option value="Giant">Gigante</option>
              </select>

              <label>✂️ Estilo do Cabelo:</label>
              <select 
                value={player.estiloCabelo || "Messy"} 
                onChange={(e) => handleEstiloCabeloChange(e.target.value)}
              >
                {cabelosFiltrados.map(h => (
                  <option key={h.id} value={h.id}>{h.nome}</option>
                ))}
              </select>

              <label>🎨 Cor do Cabelo:</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <select 
                  value={["#2c1b18", "#111111", "#e67e22", "#f1c40f", "#9b59b6"].includes(player.corCabelo) ? player.corCabelo : "custom"} 
                  onChange={(e) => {
                    if (e.target.value !== "custom") {
                      setPlayer({...player, corCabelo: e.target.value});
                    }
                  }}
                  style={{ flex: 1 }}
                >
                  <option value="#2c1b18">Castanho</option>
                  <option value="#111111">Preto</option>
                  <option value="#e67e22">Ruivo</option>
                  <option value="#f1c40f">Loiro</option>
                  <option value="#9b59b6">Roxo</option>
                  <option value="custom">Personalizada 🎨</option>
                </select>
                <input 
                  type="color" 
                  value={player.corCabelo || "#2c1b18"} 
                  onChange={(e) => setPlayer({...player, corCabelo: e.target.value})}
                  style={{ width: '40px', height: '36px', padding: 0, border: 'none', cursor: 'pointer' }}
                />
              </div>

              {player.genero === "Mulher" ? (
                <>
                  <label>Tamanho dos Seios (cm):</label>
                  <input type="range" min="50" max="190" value={player.seios_cm || 95} onChange={(e) => setPlayer({...player, seios_cm: parseInt(e.target.value)})} />
                  <small>{player.seios_cm} cm ({cmParaPol(player.seios_cm)} in)</small>
                </>
              ) : (
                <>
                  <label>Tamanho do Pênis (cm):</label>
                  <input type="number" value={player.penis_cm || 14} onChange={(e) => setPlayer({...player, penis_cm: parseInt(e.target.value)})} />
                  <small>{player.penis_cm} cm ({cmParaPol(player.penis_cm)} in)</small>
                </>
              )}

              <label>Tamanho da Bunda</label>
              <select value={player.bunda} onChange={(e) => setPlayer({...player, bunda: e.target.value})}>
                <option value="Discreta">Discreta</option>
                <option value="Redonda">Redonda e Firme</option>
                <option value="Grande">Grande e Chamativa</option>
              </select>
          </div>

          {/* COLUNA 3: PROVADOR */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'}}>
             <h2 style={{color: '#2ed573'}}>Visualização</h2>
             <div style={{width: '200px', height: '400px'}}>
               <Avatar player={player} mundo={mundo} />
             </div>
             
             {/* CONTROLES RÁPIDOS DE VESTUÁRIO NA CRIAÇÃO */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '200px' }}>
                <button 
                  onClick={() => setPlayer({ ...player, roupaTop: player.roupaTop === "Nenhuma" ? (player.genero === "Mulher" ? "Top" : "Camiseta") : "Nenhuma" })} 
                  style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', width: '100%' }}
                >
                  {player.roupaTop === "Nenhuma" ? "👕 Vestir Top/Camiseta" : "❌ Tirar Top/Camiseta"}
                </button>
                <button 
                  onClick={() => setPlayer({ ...player, roupaBottom: player.roupaBottom === "Nenhuma" ? "Calça" : "Nenhuma" })} 
                  style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', width: '100%' }}
                >
                  {player.roupaBottom === "Nenhuma" ? "👖 Vestir Calça/Short" : "❌ Tirar Calça/Short"}
                </button>
                <button 
                  onClick={() => setPlayer({ ...player, roupaIntima: !player.roupaIntima })} 
                  style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', width: '100%' }}
                >
                  {player.roupaIntima ? "❌ Tirar Roupa Íntima" : "👙 Vestir Roupa Íntima"}
                </button>
             </div>
          </div>

         </div>
        
        <div className="acoes" style={{marginTop: '25px', borderTop: '1px solid #444', paddingTop: '20px', justifyContent: 'space-between'}}>
          <button onClick={() => setTelaAtual("menuPrincipal")} style={{backgroundColor: '#555'}}>{t.voltar}</button>
          <button onClick={iniciarJogo} style={{backgroundColor: '#28a745', padding: '15px 40px', fontSize: '18px'}}>{t.iniciar}</button>
        </div>

      </div>
    </div>
  );
}