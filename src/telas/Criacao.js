import React from 'react';
import Avatar from '../componentes/Avatar';
import { cmParaPol } from '../dados';
import Atributos from './Atributos';


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
              
              <label>{t.idade}</label>
              <input type="number" value={player.idade} onChange={(e) => setPlayer({...player, idade: parseInt(e.target.value) || 18})} />
              
              <label>{t.genero}</label>
              <select value={player.genero} onChange={(e) => setPlayer({...player, genero: e.target.value})}>
                  <option value="Mulher">{t.mulher}</option>
                  <option value="Homem">{t.homem}</option>
              </select>

              {/* RESTAURAÇÃO: ORIGEM vs MORADIA */}
              <label>🌐 Raça / Cidade de Nascimento:</label>
              <select value={player.cidade_origem} onChange={(e) => setPlayer({...player, cidade_origem: e.target.value})}>
                  {Object.keys(mundo).map(id => <option key={`origem-${id}`} value={id}>{mundo[id].nome} (Etnia: {mundo[id].etnia})</option>)}
              </select>

              <label>📍 Onde você mora atualmente:</label>
              <select value={player.cidade_id} onChange={(e) => setPlayer({...player, cidade_id: e.target.value})}>
                  {Object.keys(mundo).map(id => <option key={`atual-${id}`} value={id}>{mundo[id].nome} - Custo de Vida: {mundo[id].custo_vida}x</option>)}
              </select>
          </div>

          {/* COLUNA 2: FÍSICA E BIOLOGIA */}
          <div style={{flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <h2 style={{color: '#ff4757'}}>Biologia do Corpo</h2>
              
              <label>Altura (cm)</label>
              <input type="number" value={player.altura} onChange={(e) => setPlayer({...player, altura: parseInt(e.target.value) || 160})} />
              
              <label>Peso (kg)</label>
              <input type="number" value={player.peso} onChange={(e) => setPlayer({...player, peso: parseInt(e.target.value) || 60})} />

              {/* RESTAURAÇÃO: ATRIBUTOS SEXUAIS BASEADOS NO GÊNERO */}
              {player.genero === "Mulher" ? (
                <>
                  // Exemplo para os Seios:
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
                  <label>Tamanho do Pênis (Comprimento em cm):</label>
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

          {/* COLUNA 3: AVATAR VISUAL */}
          <div style={{flex: 1, minWidth: '200px'}}>
             <h2 style={{color: '#2ed573'}}>Visualização</h2>
             <Avatar player={player} mundo={mundo} />
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