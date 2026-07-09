import React from 'react';
import Avatar from '../componentes/Avatar';
import { cmParaPol } from '../dados';

export default function Criacao({ player, setPlayer, mundo, t, iniciarJogo, setTelaAtual }) {
  return (
    <div className="container">
      <h1>{t.tituloCriacao}</h1>
      <div className="card">
        
        <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
          
          {/* COLUNA 1: IDENTIDADE E CIDADES */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <h2 style={{color: '#007bff'}}>Identidade</h2>
              
              <label>{t.nome}</label>
              <input type="text" value={player.nome} onChange={(e) => setPlayer({...player, nome: e.target.value})} />
              
              <label>{t.idade} (Mínimo 18 anos)</label>
              <input 
                type="number" 
                min="18"
                value={player.idade} 
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  setPlayer({...player, idade: val});
                }}
                onBlur={(e) => {
                  // Proteção extra: se ele digitar "5" e clicar fora, o jogo corrige para 18
                  if (!player.idade || player.idade < 18) {
                     setPlayer({...player, idade: 18});
                  }
                }} 
              />
              
              <label>{t.genero}</label>
              <select value={player.genero} onChange={(e) => setPlayer({...player, genero: e.target.value})}>
                  <option value="Mulher">{t.mulher}</option>
                  <option value="Homem">{t.homem}</option>
              </select>

              <label>🌐 Raça / Cidade de Nascimento:</label>
              <select value={player.cidade_origem} onChange={(e) => setPlayer({...player, cidade_origem: e.target.value})}>
                  {Object.keys(mundo).map(id => <option key={`origem-${id}`} value={id}>{mundo[id].nome} (Etnia: {mundo[id].etnia})</option>)}
              </select>

              <label>📍 Onde você mora atualmente:</label>
              <select value={player.cidade_id} onChange={(e) => setPlayer({...player, cidade_id: e.target.value})}>
                  {Object.keys(mundo).map(id => <option key={`atual-${id}`} value={id}>{mundo[id].nome} - Custo de Vida: {mundo[id].custo_vida}x</option>)}
              </select>
          </div>

          {/* COLUNA 2: FÍSICA, BIOLOGIA E CABELO */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <h2 style={{color: '#ff4757'}}>Biologia do Corpo</h2>
              
              <label>Altura (cm)</label>
              <input type="number" value={player.altura} onChange={(e) => setPlayer({...player, altura: parseInt(e.target.value) || 160})} />
              
              <label>Peso (kg)</label>
              <input type="number" value={player.peso} onChange={(e) => setPlayer({...player, peso: parseInt(e.target.value) || 60})} />

              {/* CONTROLES DE CABELO ADICIONADOS */}
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
                  <input 
                    type="range" 
                    min="50" max="190" 
                    value={player.seios_cm || 95} 
                    onChange={(e) => setPlayer({...player, seios_cm: parseInt(e.target.value)})} 
                  />
                  <small>{player.seios_cm} cm ({cmParaPol(player.seios_cm)} in)</small>
                </>
              ) : (
                <>
                  <label>Tamanho do Pênis (cm):</label>
                  <input 
                    type="number" 
                    value={player.penis_cm || 14} 
                    onChange={(e) => setPlayer({...player, penis_cm: parseInt(e.target.value)})} 
                  />
                  <small style={{color: '#888'}}>
                    {player.penis_cm} cm ({cmParaPol(player.penis_cm)} in)
                  </small>
                </>
              )}

              <label>Tamanho da Bunda</label>
              <select value={player.bunda} onChange={(e) => setPlayer({...player, bunda: e.target.value})}>
                <option value="Discreta">Discreta</option>
                <option value="Redonda">Redonda e Firme</option>
                <option value="Grande">Grande e Chamativa</option>
              </select>
          </div>

          {/* COLUNA 3: AVATAR VISUAL E ROUPAS */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px'}}>
             <h2 style={{color: '#2ed573'}}>Visualização</h2>
             
             <div style={{width: '200px', height: '400px'}}>
               <Avatar player={player} mundo={mundo} />
             </div>

             <div style={{display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '8px'}}>
               <h4 style={{margin: '0 0 5px 0', textAlign: 'center'}}>Roupeiro de Testes</h4>
               
               <label style={{fontSize: '12px', display: 'flex', justifyContent: 'space-between'}}>
                 Peça Superior:
                 <select value={player.roupaTop} onChange={(e) => setPlayer({...player, roupaTop: e.target.value})}>
                   <option value="Camiseta">Camiseta</option>
                   <option value="Nenhuma">Nenhuma (Nu)</option>
                 </select>
               </label>

               <label style={{fontSize: '12px', display: 'flex', justifyContent: 'space-between'}}>
                 Peça Inferior:
                 <select value={player.roupaBottom} onChange={(e) => setPlayer({...player, roupaBottom: e.target.value})}>
                   <option value="Calça">Calça Jeans</option>
                   <option value="Nenhuma">Nenhuma (Nu)</option>
                 </select>
               </label>

               <label style={{fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px'}}>
                 <input 
                    type="checkbox" 
                    checked={player.roupaIntima} 
                    onChange={(e) => setPlayer({...player, roupaIntima: e.target.checked})}
                 />
                 Usar Roupa Íntima
               </label>
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