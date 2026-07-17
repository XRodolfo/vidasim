// Sistema de Negócios e Empreendimentos - Vidasim

export const posicoesPorNegocio = {
  // Distrito Noturno
  bar: [
    { id: 'barmen', nome: 'Barman/Bargirl', custo: 1500, max: 2, renda: 120 },
    { id: 'seguranca', nome: 'Segurança', custo: 2000, max: 1, renda: 180 },
    { id: 'musico', nome: 'Músico de Blues', custo: 3000, max: 1, renda: 350 },
    { id: 'gerente', nome: 'Gerente', custo: 5000, max: 1, renda: 600 }
  ],
  boate: [
    { id: 'barmen', nome: 'Barman/Bargirl', custo: 1500, max: 5, renda: 120 },
    { id: 'seguranca', nome: 'Segurança', custo: 2000, max: 4, renda: 180 },
    { id: 'dj', nome: 'DJ Residente', custo: 4000, max: 3, renda: 450 },
    { id: 'promoter', nome: 'Promoter', custo: 3000, max: 2, renda: 300 },
    { id: 'gerente', nome: 'Gerente Geral', custo: 8000, max: 1, renda: 900 }
  ],
  strip: [
    { id: 'barmen', nome: 'Barman/Bargirl', custo: 1500, max: 6, renda: 120 },
    { id: 'seguranca', nome: 'Segurança', custo: 2000, max: 6, renda: 180 },
    { id: 'dancer', nome: 'Dançarina(o)', custo: 5000, max: 15, renda: 650 },
    { id: 'promoter', nome: 'Promoter', custo: 3000, max: 2, renda: 300 },
    { id: 'gerente', nome: 'Gerente Executivo', custo: 10000, max: 1, renda: 1200 }
  ],
  cassino: [
    { id: 'croupier', nome: 'Croupier', custo: 3000, max: 10, renda: 400 },
    { id: 'seguranca', nome: 'Segurança Executivo', custo: 2500, max: 8, renda: 220 },
    { id: 'musico', nome: 'Cantor(a) de Jazz', custo: 5000, max: 2, renda: 600 },
    { id: 'pitboss', nome: 'Pit Boss', custo: 8000, max: 4, renda: 1000 },
    { id: 'gerente', nome: 'Gerente Geral', custo: 15000, max: 1, renda: 2000 }
  ],
  // Shopping (Centro Comercial)
  cafe: [
    { id: 'atendente', nome: 'Atendente de Café', custo: 1000, max: 3, renda: 80 },
    { id: 'barista', nome: 'Barista Profissional', custo: 2000, max: 2, renda: 180 },
    { id: 'gerente', nome: 'Gerente de Turno', custo: 4000, max: 1, renda: 400 }
  ],
  cinema: [
    { id: 'bilheteiro', nome: 'Atendente de Bilheteria', custo: 1000, max: 4, renda: 80 },
    { id: 'projecionista', nome: 'Projecionista 3D', custo: 3000, max: 2, renda: 300 },
    { id: 'gerente', nome: 'Gerente de Cinema', custo: 6000, max: 1, renda: 700 }
  ],
  // Distrito Comercial
  advocacia: [
    { id: 'secretaria', nome: 'Secretária/Recepção', custo: 1200, max: 2, renda: 100 },
    { id: 'associado', nome: 'Advogado Associado', custo: 5000, max: 5, renda: 550 },
    { id: 'socio', nome: 'Sócio Executivo', custo: 12000, max: 2, renda: 1500 }
  ],
  clinica: [
    { id: 'recepcionista', nome: 'Recepcionista Clínica', custo: 1200, max: 3, renda: 100 },
    { id: 'enfermeiro', nome: 'Enfermeiro(a)', custo: 3000, max: 6, renda: 320 },
    { id: 'medico', nome: 'Médico Residente', custo: 10000, max: 4, renda: 1300 }
  ]
};

export const todosNegocios = [
  // Distrito Noturno
  { id: 'bar', nome: 'Bar "O Covil do Blues"', preco: 25000, rendaBase: 800, maxFunc: 5, desc: 'Bar noturno com música ao vivo e ótimos drinks.', local: 'distritoNoturno' },
  { id: 'boate', nome: 'Boate "Neon Pulse"', preco: 120000, rendaBase: 3500, maxFunc: 15, desc: 'Clube eletrônico com iluminação neon de alta energia.', local: 'distritoNoturno' },
  { id: 'strip', nome: 'Strip Lounge "Velvet"', preco: 300000, rendaBase: 9500, maxFunc: 30, desc: 'Entretenimento adulto milionário com suítes exclusivas.', local: 'distritoNoturno' },
  { id: 'cassino', nome: 'Cassino "Golden Palace"', preco: 500000, rendaBase: 15000, maxFunc: 26, desc: 'Mesas de pôquer, roleta e apostas de alta classe.', local: 'distritoNoturno' },
  
  // Shopping (Centro Comercial)
  { id: 'cafe', nome: 'Café Gourmet "Aroma Real"', preco: 40000, rendaBase: 1200, maxFunc: 6, desc: 'Uma cafeteria gourmet com doces finos e grãos especiais.', local: 'centroComercial' },
  { id: 'cinema', nome: 'Cinema 3D Metrópole', preco: 180000, rendaBase: 5000, maxFunc: 7, desc: 'Complexo de salas de cinema exibindo lançamentos mundiais.', local: 'centroComercial' },

  // Distrito Comercial
  { id: 'advocacia', nome: 'Escritório de Advocacia "Parceria Real"', preco: 350000, rendaBase: 11000, maxFunc: 9, desc: 'Prestação de serviços advocatícios e assessoria corporativa.', local: 'distritoComercial' },
  { id: 'clinica', nome: 'Clínica Médica "Saúde Total"', preco: 600000, rendaBase: 20000, maxFunc: 13, desc: 'Clínica de consultas especializadas e reabilitação.', local: 'distritoComercial' }
];

export const calcularLucroDia = (meu) => {
  const posicoes = posicoesPorNegocio[meu.id] || [];
  let rendaFuncionarios = 0;
  
  const funcContratados = meu.funcionarios || {};
  posicoes.forEach(pos => {
    const qty = funcContratados[pos.id] || 0;
    rendaFuncionarios += qty * pos.renda;
  });

  return Math.round((meu.rendaBase * (meu.nivel || 1)) + rendaFuncionarios + ((meu.marketing || 1) * 300));
};

export const processarRendimentoNegocios = (negocios, dias) => {
  if (!negocios) return {};
  const novosNegocios = {};
  
  Object.keys(negocios).forEach(id => {
    const meu = { ...negocios[id] };
    const lucroDia = calcularLucroDia(meu);
    meu.cofre = (meu.cofre || 0) + (lucroDia * dias);
    novosNegocios[id] = meu;
  });
  
  return novosNegocios;
};
