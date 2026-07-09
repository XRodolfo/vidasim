import React from 'react';
import HUD from '../componentes/HUD';

export default function Agencia({ player, setPlayer, mundo, t, profissoes, avancarTempo, setTelaAtual }) {
  return (
    <div className="container">
      <HUD player={player} mundo={mundo} t={t} />
      <div className="card">
        <h2>{t.agencia}</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {profissoes.map(prof => {
            const apto = player[prof.reqAttr] >= prof.reqMin;
            return (
              <div key={prof.id} style={{backgroundColor: '#2d2d2d', padding: '15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <strong>{prof.nome}</strong><br/>
                  <span style={{color: '#2ed573'}}>Salário/Turno: $ {prof.salario}</span> | Requisito: {prof.reqAttr} &gt; {prof.reqMin}
                </div>
                <button 
                  disabled={!apto} 
                  style={{backgroundColor: apto ? '#007bff' : '#444', padding: '10px'}}
                  onClick={() => {
                    if(avancarTempo(prof.horas, prof.energia)) {
                      setPlayer(prev => ({...prev, dinheiro: prev.dinheiro + prof.salario, reputacao_trabalho: prev.reputacao_trabalho + 5}));
                      alert(`Trabalhou no duro! Ganhou $ ${prof.salario} e a sua reputação subiu!`);
                    }
                  }}
                >
                  {apto ? t.baterPonto : "Bloqueado"}
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={() => setTelaAtual("mapa")} style={{marginTop: '20px', backgroundColor: '#555'}}>{t.voltar}</button>
      </div>
    </div>
  );
}