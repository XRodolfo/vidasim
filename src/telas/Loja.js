import React from 'react';

export default function Loja({ player, setPlayer, lojaId, t, setTelaAtual }) {
  const lojaDados = { /* lógica para buscar a loja pelo ID no dados.js */ };
  
  const comprarItem = (item) => {
    if (player.dinheiro >= item.preco) {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - item.preco,
        inventario: [...prev.inventario, item]
      }));
      alert(`Você comprou: ${item.nome}`);
    } else {
      alert("Dinheiro insuficiente!");
    }
  };

  return (
    <div className="container">
      <h2>Loja</h2>
      {/* Listagem de itens da loja aqui */}
      <button onClick={() => setTelaAtual("mapa")}>Voltar ao Mapa</button>
    </div>
  );
}