# 🧪 TESTES DE VALIDAÇÃO - VIDASIM

## ✅ COMO TESTAR OS NOVOS SISTEMAS

---

## 1️⃣ TESTE: Sistema de Fetiches

### Arquivo a Testar:
`src/utils/fetchesSystem.js`

### Teste no Console (Ctrl+Shift+J):
```javascript
// Copie e cole no console
import('/src/utils/fetchesSystem.js').then(mod => {
  const fetiche = mod.gerarFetchesAleatorias();
  console.table(fetiche);
  console.log("Total:", fetiche.length); // Deve ser 1-3
});
```

### Resultado Esperado:
```
Array(2) [
  { id: "submissa", nome: "Submissa", ... },
  { id: "anal", nome: "Amante de Anal", ... }
]
Total: 2
```

---

## 2️⃣ TESTE: Sistema de Reprodução

### Arquivo a Testar:
`src/utils/reproductionSystem.js`

### Teste Rápido:
```javascript
// Teste 1: Gerar dados reprodutivos
const dados = {
  virgem: true,
  contraceptivoAtivo: "camisinha",
  statusGravidez: 0,
  semanasGravidez: 0,
  numeroFilhos: 0
};
console.log("Dados iniciais:", dados);

// Teste 2: Calcular gravidez com camisinha (muito baixa chance)
let grávidas = 0;
for (let i = 0; i < 100; i++) {
  if (Math.random() < 0.02) grávidas++; // 2% camisinha
}
console.log("Gestações em 100 tentativas com camisinha:", grávidas); // Deve ser 0-3

// Teste 3: Calcular gravidez sem proteção (alta chance)
let grávidas2 = 0;
for (let i = 0; i < 100; i++) {
  if (Math.random() < 0.35) grávidas2++; // 35% sem proteção
}
console.log("Gestações em 100 tentativas SEM proteção:", grávidas2); // Deve ser 30-40
```

### Resultado Esperado:
- Camisinha: 0-3 gestações em 100 tentativas
- Sem proteção: 30-40 gestações em 100 tentativas

---

## 3️⃣ TESTE: Sistema de Inventário

### Arquivo a Testar:
`src/utils/inventorySystem.js`

### Teste de Compra:
```javascript
// Teste: Comprar carro
const player = { dinheiro: 100000 };
const inventario = { imoveis: [], veiculos: [], itens: [] };

// Simular compra
const resultado = comprarVeiculo(inventario, "carro_pop", player);
console.log("Compra bem-sucedida?", resultado.sucesso); // true
console.log("Carro:", resultado.veiculo.nome); // "Sedan Popular"
console.log("Preço:", resultado.dinheiroPago); // 15000
console.log("Novo saldo:", player.dinheiro - resultado.dinheiroPago); // 85000
```

### Resultado Esperado:
```
Compra bem-sucedida? true
Carro: Sedan Popular
Preço: 15000
Novo saldo: 85000
```

---

## 4️⃣ TESTE: Sistema de Hotéis

### Arquivo a Testar:
`src/utils/hotelSystem.js`

### Teste de Categoria:
```javascript
const { obterHotel, calcularCustoHotel, obterBonusIntimacao } = require('./hotelSystem');

// Teste 1: Obter hotel 5 estrelas
const hotel5 = obterHotel("5");
console.log("Hotel 5 estrelas:", hotel5.nome); // "Hotel 5 Estrelas - Suíte Presidencial"
console.log("Preço:", hotel5.preco_noite); // 1200
console.log("Bônus:", obterBonusIntimacao("5")); // 50

// Teste 2: Calcular custo
const custo = calcularCustoHotel("3"); // 3 estrelas
console.log("Custo de 1 noite no hotel 3⭐:", custo); // 250

// Teste 3: Custo múltiplas noites
const custoPlurinoites = calcularCustoHotel("4", 3); // 3 noites
console.log("Custo de 3 noites no 4⭐:", custoPlurinoites); // 1500
```

### Resultado Esperado:
```
Hotel 5 estrelas: Hotel 5 Estrelas - Suíte Presidencial
Preço: 1200
Bônus: 50
Custo de 1 noite no hotel 3⭐: 250
Custo de 3 noites no 4⭐: 1500
```

---

## 5️⃣ TESTE: Motel.js Renderização

### Como Testar:
1. Abra o jogo
2. Vá até o Motel (ou integre para testar)
3. Verifique:
   - [ ] 5 botões de ação preliminares aparecem
   - [ ] Barras de excitação mostram valor correto
   - [ ] Estamina reduz conforme clica em ações
   - [ ] Log narrativo aparece abaixo
   - [ ] Transição para "oral" após "despir"
   - [ ] Mais botões aparecem para penetração
   - [ ] Fase muda para "climax" quando excitação >= 100%

### Checklist de Componentes:
- [ ] Avatar do NPC renderiza
- [ ] Fetiches mostram em rosa se existem
- [ ] Virgem mostra ⭐ se for virgem
- [ ] Perícia Sexual exibe corretamente
- [ ] Contraceptivo mostra com 🛡️
- [ ] Botões respondem aos clicks
- [ ] Texto narrativo atualiza em tempo real

---

## 6️⃣ TESTE: AppInventario

### Como Testar:
1. Abra o jogo
2. Clique em 📱 Celular
3. Clique em 📦 Assets (novo ícone verde)
4. Verifique as 3 abas:

**Aba 1 - Assets:**
- [ ] Mensagem "Nenhum imóvel" aparece (esperado)
- [ ] Mensagem "Nenhum veículo" aparece (esperado)
- [ ] Balanço financeiro mostra dinheiro correto

**Aba 2 - Itens:**
- [ ] Mensagem "Inventário vazio" (esperado)
- [ ] Layout está correto

**Aba 3 - Status:**
- [ ] Status de gravidez aparece
- [ ] Virgem ou "já iniciou atividade"
- [ ] Contraceptivo ativo mostra
- [ ] Perícia Sexual exibe com barra azul/rosa
- [ ] Número de filhos = 0

---

## 7️⃣ TESTE: HotelSelector Renderização

### Como Testar (quando integrado):
1. Tenha certeza que não tem casa na cidade
2. Clique para ir ao Motel
3. Deve abrir HotelSelector
4. Verifique:
   - [ ] 5 cards de hotel aparecem com ⭐
   - [ ] Selecionar categoria muda highlight para azul
   - [ ] Detalhes mudam conforme seleciona
   - [ ] Amenidades listam corretamente
   - [ ] Bônus exibe em verde
   - [ ] Se dinheiro insuficiente, botão fica cinza e desabilitado
   - [ ] Clicar "Alugar" deduz dinheiro

---

## 🔍 TESTES MANUAIS - PASSO A PASSO

### Cenário 1: Teste de Fetiches
```
1. Crie um NPC com teste manual
2. Atribua fetiche "submissa"
3. Vá para motel com este NPC
4. Execute "de quatro" (posição de submissão)
5. Verifique se prazer é MAIOR que normal
6. Dica: Compare com "missionário" (não afeta)
```

### Cenário 2: Teste de Gravidez
```
1. Selecione contraceptivo "nenhum" no Motel
2. Realize vários encontros
3. Pelo menos um deve resultar em gravidez
4. Verifique no App Inventário → Status
5. Deve mostrar 🤰 Grávida (Semana 1)
```

### Cenário 3: Teste de Estamina
```
1. Vá ao motel
2. Execute ações até estamina chegar a 0
3. Deve mostrar mensagem: "❌ Você está fisicamente esgotado..."
4. Botões devem sumir
5. Deve aparecer botão vermelho "⚠️ Terminar Encontro"
6. Clicar deve voltar ao mapa
```

### Cenário 4: Teste de Hotel Bônus
```
1. Vá ao motel com hotel 5⭐ (bônus +50)
2. Faça "oral_enviado" - note o prazer do NPC
3. Repita com hotel 1⭐ (bônus +10)
4. Prazer deve ser significativamente MAIOR no hotel 5⭐
```

---

## 📊 TABELA DE TESTES

| Feature | Arquivo | Status | Teste |
|---------|---------|--------|-------|
| Fetiches | fetchesSystem.js | ✅ | Console |
| Reprodução | reproductionSystem.js | ✅ | Console |
| Inventário | inventorySystem.js | ✅ | Console |
| Hotéis | hotelSystem.js | ✅ | Console |
| Motel UI | Motel.js | ✅ | Manual |
| App Inventário | AppInventario.js | ✅ | Manual |
| Hotel Selector | HotelSelector.js | ⏳ | Pendente integração |

---

## 🐛 POSSÍVEIS BUGS E SOLUÇÕES

### Bug 1: "Cannot read property 'fetiches' of undefined"
**Solução:** Verifique se npc está sendo passado corretamente ao Motel

### Bug 2: Estamina não diminui
**Solução:** Verifique se custoEstamina está sendo atualizado no switch

### Bug 3: AppInventario mostra "undefined"
**Solução:** Verifique se player.inventario foi inicializado em App.js

### Bug 4: Hotel não deduz dinheiro
**Solução:** Verifique se setHotelCategoria está sendo chamado

### Bug 5: Fetiches não modificam prazer
**Solução:** Verifique se calcularModificadorFetiche retorna valor > 1

---

## 🎯 RESULTADO ESPERADO FINAL

Após todos os testes, você deve ter:

✅ **4 módulos funcionais** sem erros no console  
✅ **Motel.js com 20+ ações** funcionando  
✅ **App Inventário** mostrando dados corretamente  
✅ **Sistema de fetiches** modificando prazer  
✅ **Sistema de gravidez** calculando probabilidades  
✅ **Sistema de estamina** forçando término quando 0  
✅ **Sistema de hotéis** com bônus visuais  

---

**Tempo Estimado:** 30 minutos para testar tudo  
**Dificuldade:** Fácil (apenas cliques e verificação visual)
