import React, { useState } from 'react';

export default function CriadorCidade({ mundo, setMundo, t, setTelaAtual }) {
  const [formCidade, setFormCidade] = useState({ nome: "", pais: "", custo_vida: 1.0 });

  const salvar = () => {
    if(formCidade.nome !== "") {
      // Cria o ID sem espaços e adiciona ao banco de dados do Mundo
      setMundo({...mundo, [formCidade.nome.replace(/\s+/g, '')]: {nome: formCidade.nome, pais: formCidade.pais, custo_vida: parseFloat(formCidade.custo_vida), etnia: "Mista"}});
      setTelaAtual("menuPrincipal");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{t.criador}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nome da Cidade:</label>
            <input type="text" style={{ width: '100%' }} value={formCidade.nome} onChange={(e) => setFormCidade({...formCidade, nome: e.target.value})} placeholder="Ex: Lisboa" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>País:</label>
            <input type="text" style={{ width: '100%' }} value={formCidade.pais} onChange={(e) => setFormCidade({...formCidade, pais: e.target.value})} placeholder="Ex: Portugal" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Custo de Vida:</label>
            <input type="number" step="0.1" style={{ width: '100%' }} value={formCidade.custo_vida} onChange={(e) => setFormCidade({...formCidade, custo_vida: e.target.value})} />
          </div>
        </div>
        <div className="acoes" style={{ marginTop: '20px' }}>
          <button style={{ backgroundColor: '#28a745' }} onClick={salvar}>Salvar Cidade</button>
          <button onClick={() => setTelaAtual("menuPrincipal")} style={{backgroundColor: '#555'}}>{t.voltar}</button>
        </div>
      </div>
    </div>
  );
}