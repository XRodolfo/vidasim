# 🎮 VIDASIM - SISTEMA SEXUAL COMPLETO
## Guia Técnico de Implementação

---

## 📦 ARQUIVOS CRIADOS

### Módulos Utilitários (src/utils/)
```
✅ fetchesSystem.js           - Sistema de Fetiches (10 tipos)
✅ reproductionSystem.js       - Gravidez, Contraceptivo, Virgindade
✅ inventorySystem.js          - Carros, Imóveis, Itens
✅ hotelSystem.js              - 5 categorias de hotéis com amenidades
```

### Componentes de Interface
```
✅ Motel.js                    - Totalmente reformulado (215+ linhas)
✅ AppInventario.js            - App de celular com 3 abas
✅ HotelSelector.js            - Seletor visual de hotéis
```

### Arquivos Modificados
```
✅ App.js                      - Adiciona dados reprodutivos + inventário
✅ Celular.js                  - Novo ícone "📦 Assets"
```

---

## 🔥 NOVAS FUNCIONALIDADES

### 1️⃣ SISTEMA DE FETICHES
**Arquivo:** `src/utils/fetchesSystem.js`

10 fetiches com modificadores:
- **Submissa** → +40% prazer em posições de dominação
- **Dominante** → +40% prazer ao dominar
- **Anal** → +60% prazer em penetração anal
- **Squirt** → +30% em ações oral/penetração
- **Oral Viciada** → +50% em sexo oral
- **Creampie** → +20% em penetração vaginal
- **BDSM** → +30% em ações intensas
- **Voyeur** → +para exibicionismo
- **Peituda** → +50% em estimulação de seios
- **Footjob** → +40% em estimulação com pés

**Uso:**
```javascript
import { gerarFetchesAleatorias, calcularModificadorFetiche } from '../utils/fetchesSystem';

// Gerar 1-3 fetiches aleatórios para NPC
npc.fetiches = gerarFetchesAleatorias();

// Calcular modificador de prazer
const mod = calcularModificadorFetiche(npc, tipoAcao, acao);
// Resultado: 1.0 a 2.0x multiplicador
```

---

### 2️⃣ SISTEMA DE REPRODUÇÃO
**Arquivo:** `src/utils/reproductionSystem.js`

**Contraceptivos com Eficácia:**
| Tipo | Risco Gravidez | Eficácia |
|------|---|---|
| Nenhum | 35% | 65% |
| Camisinha | 2% | 98% |
| Pílula | 1% | 99% |
| DIU | 0.2% | 99.8% |
| Implante | 0.5% | 99.5% |
| Injeção | 3% | 97% |

**Status de Gravidez:**
- 0 = Não grávida
- 1 = Trimestre 1 (semanas 1-8)
- 2 = Trimestre 2 (semanas 9-20)
- 3 = Trimestre 3 (semanas 21-40)
- 4 = Pós-parto

**Penalidades de Gravidez Avançada:**
```javascript
Trimestre 1: energia -10%, velocidade 0x
Trimestre 2: energia -25%, velocidade -0.3x
Trimestre 3: energia -40%, velocidade -0.5x
```

**Uso:**
```javascript
import { calcularGravidez, avancarGravidez } from '../utils/reproductionSystem';

// Verificar gravidez após relação
if (calcularGravidez("camisinha")) {
  // Ocorreu gravidez!
  player.dadosReproductivos.statusGravidez = 1;
}

// Avançar gestação a cada dia
player.dadosReproductivos = avancarGravidez(
  player.dadosReproductivos, 
  diasPassados
);
```

---

### 3️⃣ SISTEMA DE INVENTÁRIO
**Arquivo:** `src/utils/inventorySystem.js`

**Imóveis (5 categorias):**
- Apartamento Simples ($50k)
- Apartamento Moderno ($150k)
- Casa Pequena ($200k)
- Casa Grande ($500k)
- Penthouse ($1M)

**Veículos (7 tipos):**
- Bicicleta ($200)
- Moto 125cc ($2k)
- Moto 300cc ($5k)
- Sedan Popular ($15k)
- Sedan Médio ($40k)
- SUV Premium ($80k)
- Carro Esporte ($150k)

**Itens Consumíveis:**
- Preservativo ($5)
- Pílula Anticoncepcional ($30)
- Bebida Alcoólica ($15)
- Chocolate Especial ($20)

**Uso:**
```javascript
import { comprarImovel, comprarVeiculo, temCasaNaCidade } from '../utils/inventorySystem';

// Comprar imóvel
const resultado = comprarImovel(inventario, "casa_grande", player);
if (resultado.sucesso) {
  player.inventario.imoveis.push(resultado.imovel);
  player.dinheiro -= resultado.dinheiroPago;
}

// Verificar se tem casa na cidade
if (!temCasaNaCidade(player.inventario, "SaoPaulo")) {
  // Redirecionar para hotel
  setTelaAtual("hotelSelector");
}
```

---

### 4️⃣ SISTEMA DE HOTÉIS
**Arquivo:** `src/utils/hotelSystem.js`

**5 Categorias com Bônus:**
| ⭐ | Nome | Preço | Bônus | Amenidades |
|---|---|---|---|---|
| 1 | Hotel Básico | $50/noite | +10 | Cama, Banheiro |
| 2 | Hotel Conforto | $120/noite | +15 | +TV, A/C |
| 3 | Hotel 3⭐ | $250/noite | +20 | +Minibar, Espelhos |
| 4 | Hotel 4⭐ | $500/noite | +30 | +Jacuzzi, Luz ambiente |
| 5 | Penthouse | $1.200/noite | +50 | +Cama redonda, Champanhe |

**Bônus:** Aumenta prazer máximo em até 50 pontos!

**Uso:**
```javascript
import { obterHotel, calcularCustoHotel, podeAlugarHotel } from '../utils/hotelSystem';

// Verificar disponibilidade
if (podeAlugarHotel("4", player.dinheiro)) {
  const custo = calcularCustoHotel("4");
  setTelaAtual("motel");
  setCategoriaHotel("4");
}
```

---

## 🛏️ MOTEL.JS - NOVA ESTRUTURA

### Fases do Encontro
```
preliminares → oral → penetracao → climax → pos
```

### Ações Disponíveis por Fase

**PRELIMINARES (5 ações):**
- 💋 Beijo → 10 excit. player, 15-40 NPC
- 🤲 Massagem → 8 excit. player, 12-36 NPC
- 🍒 Seios → 12 excit. player, 18-54 NPC
- 👙 Despir → 15 excit. player, 10 NPC (transição)

**ORAL (4 ações):**
- 👅 Dar Oral → 5 excit. player, 25-75 NPC
- 😮 Receber → 30 excit. player, 12-36 NPC
- 🔄 69 Mútuo → 20 excit. player, 22-66 NPC
- 🍆 Penetração (transição)

**PENETRAÇÃO VAGINAL (7 ações):**
- 🛏️ Missionário → 20 excit. player, 20-60 NPC
- 🐕 De Quatro → 25 excit. player, 30-90 NPC
- 🐎 Por Cima → 15 excit. player, 25-75 NPC
- 🔄 Cavaleira Reversa → 18 excit. player, 22-66 NPC
- 🧱 Parede → 22 excit. player, 24-72 NPC
- 🪑 Sentado → 16 excit. player, 18-54 NPC

**PENETRAÇÃO ANAL (5 ações):**
- 🌶️ Prep Anal → 12 excit. player, 8-24 NPC
- 💜 Anal → 28 excit. player, 32-96 NPC
- 🍑 Anal De Quatro → 30 excit. player, 35-105 NPC
- 🔄 Anal Reverso → 26 excit. player, 28-84 NPC
- 🧱 Anal + Parede → 32 excit. player, 30-90 NPC

**CLÍMAX:**
- Quando ambos atingem 100% excitação
- XP de Perícia Sexual: +3 a +8
- Gravidez calculada (apenas para mulheres)

### Cálculo de Prazer (Fórmula)
```javascript
ganho = basePrazer × modificadorPericia × sensitividadeNPC × modificadorFetiche + bonusHotel

Onde:
- basePrazer = valor da ação (5-32)
- modificadorPericia = Math.max(0.5, periciaSexual / 40)
- sensitividadeNPC = (npc.sensibilidade || 50) / 50
- modificadorFetiche = 1.0 a 2.0x (baseado nas fetiches)
- bonusHotel = 10 a 50 (baseado na categoria)
```

### Integração de Sistemas
```javascript
// Motel.js props
<Motel 
  player={player}
  setPlayer={setPlayer}
  mundo={mundo}
  npc={npc}
  avancarTempo={avancarTempo}
  setTelaAtual={setTelaAtual}
  categoriaHotel="3"  // ← Novo
/>
```

---

## 📱 CELULAR - APP INVENTÁRIO

### Abas
1. **🏠 Assets**
   - Lista de imóveis com qualidade ⭐
   - Lista de veículos com velocidade
   - Balanço financeiro (dinheiro + ativos)

2. **📦 Itens**
   - Itens consumíveis com quantidade
   - Roupas e acessórios
   - Preço de cada item

3. **💓 Status**
   - Status de reprodução
   - Virgindade
   - Contraceptivo ativo
   - Número de filhos
   - Aviso se grávida
   - Perícia Sexual com barra visual

---

## 🏨 HOTEL SELECTOR

Nova tela em `src/telas/HotelSelector.js`

**Features:**
- Grade visual de 5 hotéis
- Seleção com destaque azul
- Mostra amenidades e bônus
- Verifica dinheiro (desabilita botão se insuficiente)
- Deduz valor automaticamente
- Passa categoria para Motel.js

---

## 🔗 COMO INTEGRAR

### 1. Atualizar Mapa.js
```javascript
// Quando player quer ir para motel e não tem casa
if (!temCasaNaCidade(player.inventario, player.cidade_id)) {
  setTelaAtual("hotelSelector");
  // Em vez de setTelaAtual("motel")
}
```

### 2. Adicionar NPC fetiches em npcGenerator.js
```javascript
import { gerarFetchesAleatorias } from '../utils/fetchesSystem';

// Ao gerar NPC
npc.fetiches = gerarFetchesAleatorias();
npc.virgem = Math.random() < 0.2; // 20% de chance
```

### 3. Adicionar HotelSelector ao App.js
```javascript
import HotelSelector from './telas/HotelSelector';

// No render
{telaAtual === "hotelSelector" && (
  <HotelSelector 
    player={player} 
    setPlayer={setPlayer}
    setTelaAtual={setTelaAtual}
    setParceiroMotel={setParceiroMotel}
    setHotelCategoria={setHotelCategoria}
  />
)}
```

### 4. Criar estado para categoria de hotel
```javascript
const [hotelCategoria, setHotelCategoria] = useState("3");

// Passar para Motel
<Motel 
  {...props}
  categoriaHotel={hotelCategoria}
/>
```

---

## ✅ CHECKLIST DE TESTES

- [ ] Gerar NPC com fetiches aleatórios
- [ ] Testar cada ação de preliminar
- [ ] Testar cada ação de oral
- [ ] Testar cada ação de penetração vaginal
- [ ] Testar cada ação de penetração anal
- [ ] Verificar se modificadores de fetiche estão aplicando (até 2x)
- [ ] Testar cálculo de gravidez (camisinha vs nenhum)
- [ ] Verificar se estamina esgotada força término
- [ ] Testar se alguém pode "pedir para sair"
- [ ] Verificar bônus de hotel (categoria afeta prazer)
- [ ] Testar App Inventário no celular
- [ ] Verificar se carros/casas aparecem no App
- [ ] Testar HotelSelector visual
- [ ] Verificar se dinheiro é deduzido corretamente

---

## 📊 PRÓXIMAS FEATURES SUGERIDAS

1. **Sistema de Reputação Sexual** - Quanto melhor, mais opções em encontros
2. **Educação Sexual** - Tutorials de posições/técnicas
3. **Histórico de Relações** - Registrar com quem teve relações
4. **Relacionamentos** - Alguns NPCs podem virar namorados/as
5. **Gênero de Filhos** - Filhos herdam alguns atributos do player
6. **Clínicas de Aborto** - Opção para encerrar gravidez
7. **STDs** - Sistema de doenças (transmissíveis)
8. **Amamentação** - Após parto, mulher não pode fazer certos movimentos
9. **Pensão de Filhos** - Custo mensal para filhos
10. **Habilidades Sexuais** - Desbloquear técnicas especiais

---

**Versão:** 2.0 - Sistema Sexual Completo  
**Data:** 2026-07-08  
**Status:** ✅ Implementado e Testável
