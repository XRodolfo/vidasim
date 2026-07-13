import React from 'react';
import { comprarItem } from '../utils/inventorySystem';

export default function Loja({ player, setPlayer, lojaId, t, setTelaAtual }) {
  const lojaDados = { /* lógica para buscar a loja pelo ID no dados.js */ };
  
  const efetuarCompra = (tipoItem) => {
    const resultado = comprarItem(player.inventario, tipoItem, player);
    
    if (resultado.erro) {
      alert(resultado.erro);
    } else {
      setPlayer(prev => ({
        ...prev,
        dinheiro: prev.dinheiro - resultado.dinheiroPago,
        inventario: { ...prev.inventario }
      }));
      alert(`Você comprou: ${resultado.item.nome}`);
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