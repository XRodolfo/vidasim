// Sistema de Hotéis - Diferentes categorias e preços

export const categoriasHotel = {
  "1": {
    id: "1",
    nome: "Hotel 1 Estrela",
    preco_noite: 50,
    qualidade: 1,
    descricao: "Hotel básico, sem luxo",
    amenidades: ["Cama", "Banheiro"],
    bonusIntimaçãoMaxima: 10
  },
  "2": {
    id: "2",
    nome: "Hotel 2 Estrelas",
    preco_noite: 120,
    qualidade: 2,
    descricao: "Hotel com conforto básico",
    amenidades: ["Cama confortável", "Banheiro", "TV", "Ar condicionado"],
    bonusIntimaçãoMaxima: 15
  },
  "3": {
    id: "3",
    nome: "Hotel 3 Estrelas",
    preco_noite: 250,
    qualidade: 3,
    descricao: "Hotel confortável e bem equipado",
    amenidades: ["Cama queen", "Banheiro espaçoso", "TV premium", "Frigobar", "Espelhos especiais"],
    bonusIntimaçãoMaxima: 20
  },
  "4": {
    id: "4",
    nome: "Hotel 4 Estrelas",
    preco_noite: 500,
    qualidade: 4,
    descricao: "Hotel luxuoso com excelente atendimento",
    amenidades: ["Cama king-size", "Banheiro de luxo", "Jacuzzi", "Espelhos no teto", "Luz ambiente", "Minibar premium"],
    bonusIntimaçãoMaxima: 30
  },
  "5": {
    id: "5",
    nome: "Hotel 5 Estrelas - Suíte Presidencial",
    preco_noite: 1200,
    qualidade: 5,
    descricao: "Suíte ultra-luxuosa para casais apaixonados",
    amenidade: ["Cama redonda", "Banheira com vista", "Espelhos panorâmicos", "Iluminação dinâmica", "Som ambiente", "Champanhe grátis"],
    bonusIntimaçãoMaxima: 50
  }
};

// Encontra categoria de hotel por ID
export const obterHotel = (categoriaId) => {
  return categoriasHotel[categoriaId] || null;
};

// Lista todos os hotéis disponíveis
export const listarHoteis = () => {
  return Object.values(categoriasHotel);
};

// Calcula custo de hospedagem
export const calcularCustoHotel = (categoriaId, noites = 1) => {
  const hotel = obterHotel(categoriaId);
  if (!hotel) return 0;
  return hotel.preco_noite * noites;
};

// Verifica se jogador pode pagar hotel
export const podeAlugarHotel = (categoriaId, dinheiro) => {
  const custo = calcularCustoHotel(categoriaId);
  return dinheiro >= custo;
};

// Gera nome atraente para motel baseado em categoria
export const nomeMoteluario = (categoria) => {
  const nomes = {
    "1": ["Motel das Flores", "Repouso Amigável", "Motel Recanto"],
    "2": ["Hotel Encontro", "Motel Aconchego", "Refúgio do Casal"],
    "3": ["Suíte Neon", "Motel Paradise", "Oásis do Casal"],
    "4": ["Palácio da Intimidade", "Motel Premium Class", "Templo do Prazer"],
    "5": ["Suíte Presidencial Luxor", "Motel Emperatriz", "Ápice da Sedução"]
  };
  
  const opções = nomes[categoria] || nomes["3"];
  return opções[Math.floor(Math.random() * opções.length)];
};

// Descrição visual completa do hotel
export const descricaoHotelCompleta = (categoriaId) => {
  const hotel = obterHotel(categoriaId);
  if (!hotel) return "Hotel não encontrado";
  
  const estrelas = '⭐'.repeat(hotel.qualidade);
  return `${hotel.nome} ${estrelas}\n${hotel.descricao}\nAmenidades: ${hotel.amenidades.join(", ")}\nPreço: $${hotel.preco_noite}/noite`;
};

// Bônus de intimação baseado em categoria
export const obterBonusIntimacao = (categoriaId) => {
  const hotel = obterHotel(categoriaId);
  return hotel?.bonusIntimaçãoMaxima || 0;
};
