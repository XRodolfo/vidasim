import React from 'react';
import Avatar from '../componentes/Avatar';
import { cmParaPol } from '../dados';

export default function Criacao({ player, setPlayer, mundo, t, iniciarJogo, setTelaAtual }) {
  
  const handleGeneroChange = (g) => {
    // Configura uma busca coerente padrão baseada no gênero e orientação
    let buscaDefault = g === "Mulher" ? "Homens" : "Mulheres";
    if (player.orientacao === "Homosexual") buscaDefault = g === "Mulher" ? "Mulheres" : "Homens";
    if (player.orientacao === "Bissexual" || player.orientacao === "Pansexual") buscaDefault = "Ambos";
    
    setPlayer({ ...player, genero: g, preferenciaBusca: buscaDefault });
  };

  const handleOrientacaoChange = (o) => {
    let buscaDefault = player.genero === "Mulher" ? "Homens" : "Mulheres";
    if (o === "Homosexual") buscaDefault = player.genero === "Mulher" ? "Mulheres" : "Homens";
    if (o === "Bissexual" || o === "Pansexual" || o === "Assexual") buscaDefault = "Ambos";

    setPlayer({ ...player, orientacao: o, preferenciaBusca: buscaDefault });
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

              {/* NOVOS SELETORES EM CRIACAO */}
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

              <label>✂️ Estilo do Cabelo:</label>
              <select value={player.cabelo} onChange={(e) => setPlayer({...player, cabelo: e.target.value})}>
                <option value="Careca">Careca</option>
                <option value="Curtos">Curto Casual</option>
                <option value="Longos">Longo Volumoso</option>
                <option value="Espetado">Espetado Anime</option>
                <option value="Cacheados">Cacheado / Afro</option>
              </select>

              <label>🎨 Cor do Cabelo:</label>
              <select value={player.corCabelo} onChange={(e) => setPlayer({...player, corCabelo: e.target.value})}>
                <option value="#2c1b18">Castanho Escuro</option>
                <option value="#111111">Preto Absoluto</option>
                <option value="#e67e22">Ruivo Fogo</option>
                <option value="#f1c40f">Loiro Claro</option>
                <option value="#9b59b6">Roxo Neon</option>
              </select>

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
               <Avatar player={player} mundo={{}} />
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