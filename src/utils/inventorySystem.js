// Sistema de Inventário e Assets - Carros, Imóveis, Itens

export const tiposImoveis = {
  apartamento_simples: {
    id: "apt_simples",
    nome: "Apartamento Simples",
    preco: 50000,
    qualidade: 1,
    capacidade_pessoas: 1,
    descricao: "Um pequeno apartamento sem luxo mas confortável"
  },
  apartamento_moderno: {
    id: "apt_moderno",
    nome: "Apartamento Moderno",
    preco: 150000,
    qualidade: 2,
    capacidade_pessoas: 2,
    descricao: "Apartamento bem decorado com varanda"
  },
  casa_pequena: {
    id: "casa_pequena",
    nome: "Casa Pequena",
    preco: 200000,
    qualidade: 2,
    capacidade_pessoas: 4,
    descricao: "Casa aconchegante com quintal"
  },
  casa_grande: {
    id: "casa_grande",
    nome: "Casa Grande",
    preco: 500000,
    qualidade: 3,
    capacidade_pessoas: 6,
    descricao: "Mansão espaçosa com piscina"
  },
  penthouse: {
    id: "penthouse",
    nome: "Penthouse",
    preco: 1000000,
    qualidade: 4,
    capacidade_pessoas: 4,
    descricao: "Luxuoso penthouse com vista panorâmica"
  }
};

export const tiposVeiculos = {
  bicicleta: { id: "bicicleta", nome: "Bicicleta Usada", preco: 200, velocidade: 1.0, combustivel: "energia" },
  moto_125: { id: "moto_125", nome: "Moto 125cc", preco: 2000, velocidade: 2.5, combustivel: "gasolina" },
  moto_300: { id: "moto_300", nome: "Moto 300cc", preco: 5000, velocidade: 3.0, combustivel: "gasolina" },
  carro_popular: { id: "carro_pop", nome: "Sedan Popular", preco: 15000, velocidade: 3.5, combustivel: "gasolina" },
  carro_medio: { id: "carro_med", nome: "Sedan Médio", preco: 40000, velocidade: 4.0, combustivel: "gasolina" },
  suv: { id: "suv", nome: "SUV Premium", preco: 80000, velocidade: 3.8, combustivel: "gasolina" },
  carro_esporte: { id: "carro_esp", nome: "Carro Esporte", preco: 150000, velocidade: 5.0, combustivel: "gasolina" }
};

export const tiposItens = {
  consumiveis: {
    preservativo: { id: "preservativo", nome: "Camisinha", preco: 5, tipo: "consumivel", quantidade: 1, efeito: "contraceptivo" },
    pilula: { id: "pilula", nome: "Pílula Anticoncepcional", preco: 30, tipo: "consumivel", quantidade: 1, efeito: "contraceptivo" },
    alcool: { id: "alcool", nome: "Bebida Alcoólica", preco: 15, tipo: "consumivel", quantidade: 1, efeito: "carisma_temp" },
    chocolate: { id: "chocolate", nome: "Chocolate Especial", preco: 20, tipo: "consumivel", quantidade: 1, efeito: "humor" }
  },
  roupas: {
    lingerie: { id: "lingerie", nome: "Lingerie Sensual", preco: 80, tipo: "roupa", efeito: "atração" },
    perfume: { id: "perfume", nome: "Perfume Premium", preco: 60, tipo: "acessorio", efeito: "carisma_temp" }
  }
};

// Inicializa inventário
export const inicializarInventario = () => {
  return {
    imoveis: [],
    veiculos: [],
    itens: [],
    dinheiro: 1000
  };
};

// Adiciona imóvel ao inventário
export const comprarImovel = (inventario, tipoImovel, player) => {
  const imovel = tiposImoveis[tipoImovel];
  if (!imovel) return { erro: "Imóvel não encontrado" };
  if (player.dinheiro < imovel.preco) return { erro: "Dinheiro insuficiente" };
  
  const novoImovel = { 
    ...imovel, 
    tipo: tipoImovel, 
    data_compra: Date.now(), 
    id: `imovel_${Date.now()}`, 
    cidade: player.cidade_id,
    diaCompra: player.dia || 1
  };
  return {
    sucesso: true,
    imovel: novoImovel,
    dinheiroPago: imovel.preco
  };
};

// Adiciona veículo ao inventário
export const comprarVeiculo = (inventario, tipoVeiculo, player) => {
  const veiculo = tiposVeiculos[tipoVeiculo];
  if (!veiculo) return { erro: "Veículo não encontrado" };
  if (player.dinheiro < veiculo.preco) return { erro: "Dinheiro insuficiente" };
  
  const novoVeiculo = { ...veiculo, data_compra: Date.now(), id: `veiculo_${Date.now()}`, combustivel_atual: 100 };
  return {
    sucesso: true,
    veiculo: novoVeiculo,
    dinheiroPago: veiculo.preco
  };
};

// Adiciona item ao inventário
export const comprarItem = (inventario, tipoItem, player) => {
  const item = tiposItens.consumiveis[tipoItem] || tiposItens.roupas[tipoItem];
  if (!item) return { erro: "Item não encontrado" };
  if (player.dinheiro < item.preco) return { erro: "Dinheiro insuficiente" };
  
  const itemExistente = inventario.itens.find(i => i.id === item.id);
  if (itemExistente) {
    itemExistente.quantidade += item.quantidade;
  } else {
    inventario.itens.push({ ...item });
  }
  
  return {
    sucesso: true,
    item: item,
    dinheiroPago: item.preco
  };
};

// Lista de imóveis do jogador
export const listarImoveis = (inventario) => {
  return inventario.imoveis || [];
};

// Verifica se tem casa na cidade
export const temCasaNaCidade = (inventario, cidade_id) => {
  const imoveis = inventario.imoveis || [];
  return imoveis.some(i => i.cidade === cidade_id);
};

// Monta descrição para exibição
export const descricaoImovel = (imovel) => {
  return `${imovel.nome} - Qualidade: ${'⭐'.repeat(imovel.qualidade)}`;
};

export const descricaoVeiculo = (veiculo) => {
  return `${veiculo.nome} - Velocidade: ${veiculo.velocidade}x`;
};
