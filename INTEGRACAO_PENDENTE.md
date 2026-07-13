# 🔧 INTEGRAÇÕES PENDENTES - VIDASIM

## ⚡ MODIFICAÇÕES NECESSÁRIAS EM ARQUIVOS EXISTENTES

---

## 1️⃣ **src/App.js** - ✅ PARCIALMENTE FEITO

### Ainda precisa:
```javascript
// Adicione estado para categoria de hotel
const [hotelCategoria, setHotelCategoria] = useState("3");

// Adicione HotelSelector ao render (após importar)
{telaAtual === "hotelSelector" && (
  <HotelSelector 
    player={player} 
    setPlayer={setPlayer}
    setTelaAtual={setTelaAtual}
    setParceiroMotel={setParceiroMotel}
    setHotelCategoria={setHotelCategoria}
  />
)}

// Passe categoriaHotel para Motel
{telaAtual === "motel" && (
  <Motel 
    player={player}
    setPlayer={setPlayer}
    mundo={mundo}
    npc={parceiroMotel}
    avancarTempo={avancarTempo}
    setTelaAtual={setTelaAtual}
    categoriaHotel={hotelCategoria}
  />
)}
```

---

## 2️⃣ **src/telas/Mapa.js** - MODIFICAÇÃO IMPORTANTE

### Adicione verificação antes de ir ao motel:
```javascript
import { temCasaNaCidade } from '../utils/inventorySystem';

// Quando player quer ir para um encontro/motel, ao invés de:
// setTelaAtual("motel");

// Faça:
if (temCasaNaCidade(player.inventario, player.cidade_id)) {
  // Tem casa, vai direto ao motel
  setTelaAtual("motel");
  setHotelCategoria(null); // sem categoria (casa própria)
} else {
  // Não tem casa, precisa alugar hotel
  setTelaAtual("hotelSelector");
}
```

---

## 3️⃣ **src/utils/npcGenerator.js** - ADICIONE FETICHES

### Importar e gerar fetiches:
```javascript
import { gerarFetchesAleatorias } from './fetchesSystem';
import { inicializarDadosReproductivos } from './reproductionSystem';

// No final da função que cria NPC, adicione:
npc.fetiches = gerarFetchesAleatorias();
npc.virgem = Math.random() < 0.15; // 15% de chance
npc.sensibilidade = 30 + Math.random() * 40; // 30-70
npc.dadosReproductivos = inicializarDadosReproductivos();
```

---

## 4️⃣ **src/telas/Criacao.js** - ADICIONE DADOS REPRODUTIVOS

### Se houver criação customizada de NPCs:
```javascript
import { gerarFetchesAleatorias } from '../utils/fetchesSystem';
import { inicializarDadosReproductivos } from '../utils/reproductionSystem';

// Ao finalizar criação de personagem NPC
npc.fetiches = gerarFetchesAleatorias();
npc.virgem = true; // Criado é virgem por padrão
npc.dadosReproductivos = inicializarDadosReproductivos();
```

---

## 5️⃣ **src/componentes/celular/AppChat.js** - MOSTRE FETICHES

### Antes de ir para motel, mostre:
```javascript
// Ao listar contatos ou ao selecionar um para encontro:
{contato.fetiches && contato.fetiches.length > 0 && (
  <div style={{ color: '#ec4899', fontSize: '11px' }}>
    💕 Fetiches: {contato.fetiches.map(f => f.nome).join(", ")}
  </div>
)}

// E mostra status de virgem
{contato.virgem && (
  <div style={{ color: '#fbbf24', fontSize: '11px' }}>
    ✨ Virgem - Primeira vez será especial
  </div>
)}
```

---

## 6️⃣ **src/telas/LojaRoupas.js** - INTEGRE INVENTÁRIO

### Se existir, modifique compra:
```javascript
import { comprarItem } from '../utils/inventorySystem';

// Ao comprar item
const resultado = comprarItem(player.inventario, "preservativo", player);
if (resultado.sucesso) {
  setPlayer(p => ({
    ...p,
    inventario: {
      ...p.inventario,
      itens: [...p.inventario.itens, resultado.item]
    },
    dinheiro: p.dinheiro - resultado.dinheiroPago
  }));
}
```

---

## 7️⃣ **src/telas/Imobiliaria.js** - INTEGRE IMÓVEIS

### Se existir, modifique compra:
```javascript
import { comprarImovel } from '../utils/inventorySystem';

// Ao comprar imóvel
const resultado = comprarImovel(player.inventario, "casa_grande", player);
if (resultado.sucesso) {
  setPlayer(p => ({
    ...p,
    inventario: {
      ...p.inventario,
      imoveis: [...p.inventario.imoveis, resultado.imovel]
    },
    dinheiro: p.dinheiro - resultado.dinheiroPago
  }));
}
```

---

## 8️⃣ **src/telas/LojaVeiculos.js** - INTEGRE VEÍCULOS

### Se existir, modifique compra:
```javascript
import { comprarVeiculo } from '../utils/inventorySystem';

// Ao comprar veículo
const resultado = comprarVeiculo(player.inventario, "carro_pop", player);
if (resultado.sucesso) {
  setPlayer(p => ({
    ...p,
    inventario: {
      ...p.inventario,
      veiculos: [...p.inventario.veiculos, resultado.veiculo]
    },
    dinheiro: p.dinheiro - resultado.dinheiroPago
  }));
}
```

---

## 9️⃣ **src/telas/Quarto.js** - ADICIONE BOTÃO DE HOTEL

### Opcional - botão para alugar hotel direto:
```javascript
<button onClick={() => setTelaAtual("hotelSelector")}>
  🏩 Procurar Hotel/Motel
</button>
```

---

## 🔟 **src/telas/Atributos.js** - MOSTRE PERÍCIA SEXUAL

### Se listar atributos do player:
```javascript
<div>
  <h3>Habilidades Sexuais</h3>
  <div>Perícia Sexual: {player.periciaSexual || 15}/100</div>
  <div style={{ width: '100%', height: '8px', backgroundColor: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
    <div style={{ 
      width: `${((player.periciaSexual || 15) / 100) * 100}%`, 
      height: '100%', 
      backgroundColor: '#ec4899'
    }} />
  </div>
</div>
```

---

## 📋 CHECKLIST DE INTEGRAÇÃO

- [ ] App.js - Importar HotelSelector e reproductionSystem
- [ ] App.js - Adicionar estado hotelCategoria
- [ ] App.js - Render HotelSelector e passar categoriaHotel ao Motel
- [ ] Mapa.js - Adicionar lógica temCasaNaCidade antes do motel
- [ ] npcGenerator.js - Gerar fetiches e virgindade
- [ ] Criacao.js - Se tiver, adicione dados reprodutivos
- [ ] AppChat.js - Mostre fetiches e virgindade
- [ ] LojaRoupas.js - Se tiver, integre inventário
- [ ] Imobiliaria.js - Se tiver, integre compra de imóveis
- [ ] LojaVeiculos.js - Se tiver, integre compra de veículos
- [ ] Quarto.js - Se tiver, adicione botão hotel
- [ ] Atributos.js - Se tiver, mostre perícia sexual

---

## 🧪 TESTE RÁPIDO SEM INTEGRAÇÃO

Você pode testar os novos sistemas sem integrar com Mapa, apenas:

1. Clicar em Celular → Assets
2. Ver inventário vazio (esperado)
3. Tentar ir ao Motel (vai carregar com dados básicos)
4. Testar diferentes ações
5. Ver App Inventário atualizado após sexo

---

## 📞 DÚVIDAS FREQUENTES

**P: Preciso mudar tudo?**  
R: Não. Os sistemas novos funcionam independentes. Você só precisa fazer as integrações quando quiser que apareçam.

**P: Qual é a prioridade?**  
R: 1) Mapa.js, 2) npcGenerator.js, 3) AppChat.js

**P: E se não integrar Imobiliária/LojaVeiculos?**  
R: Vai ficar como exemplo no código, mas player pode usar o inventário com dados manuais.

---

**Última Atualização:** 2026-07-08  
**Tempo Estimado de Integração:** 30-45 minutos
