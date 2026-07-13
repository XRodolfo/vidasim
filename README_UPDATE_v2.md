# 🎮 VIDASIM - GRANDE UPDATE v2.0
## Sistema Sexual Completo com Reprodução, Inventário e Hotéis

![Versão](https://img.shields.io/badge/Vers%C3%A3o-2.0-brightgreen)
![Status](https://img.shields.io/badge/Status-Implementado-green)
![Arquivos](https://img.shields.io/badge/Arquivos%20Criados-7-blue)
![Linhas](https://img.shields.io/badge/Linhas%20de%20C%C3%B3digo-2500%2B-orange)

---

## 📦 CONTEÚDO DO UPDATE

### ✨ Novos Sistemas Criados

| Sistema | Arquivo | Descrição |
|---------|---------|-----------|
| **Fetiches** | `src/utils/fetchesSystem.js` | 10 fetiches que modificam prazer (até 2x) |
| **Reprodução** | `src/utils/reproductionSystem.js` | Gravidez, contraceptivo, virgindade |
| **Inventário** | `src/utils/inventorySystem.js` | Carros, casas, itens, dinheiro |
| **Hotéis** | `src/utils/hotelSystem.js` | 5 categorias de hotel com bônus |

### 🆕 Componentes Criados

| Componente | Tipo | Descrição |
|-----------|------|-----------|
| **Motel.js** | Tela | Completamente reformulado (20+ ações) |
| **AppInventario.js** | App Celular | Gerencia assets e status |
| **HotelSelector.js** | Tela | Seletor visual de hotéis |

### 🔄 Arquivos Modificados

| Arquivo | Mudanças |
|---------|----------|
| **App.js** | +Dados reprodutivos, +Inventário |
| **Celular.js** | +Novo app de inventário |

---

## 🚀 COMO COMEÇAR

### 1. Leia os Documentos (em ordem)

1. **ESTE README** ← Você está aqui
2. [`SISTEMA_SEXUAL_COMPLETO.md`](./SISTEMA_SEXUAL_COMPLETO.md) - Documentação técnica detalhada
3. [`INTEGRACAO_PENDENTE.md`](./INTEGRACAO_PENDENTE.md) - O que ainda precisa ser integrado
4. [`TESTES_VALIDACAO.md`](./TESTES_VALIDACAO.md) - Como testar tudo

### 2. Teste os Novos Sistemas

Sem fazer nenhuma integração, você já pode:
- ✅ Ir ao Celular → 📦 Assets (novo)
- ✅ Ver o novo interface de inventário
- ✅ Acessar Motel (se acessível no seu mapa)
- ✅ Ver novas ações de intimidade

### 3. Integre Gradualmente

Comece por:
1. `Mapa.js` - Adicionar lógica de hotel quando sem casa
2. `npcGenerator.js` - Gerar fetiches para NPCs
3. Outros arquivos conforme necessário

---

## 🎮 O QUE MUDOU NO MOTEL

### Antes (v1.0)
- 3 ações (beijo, despir, oral)
- Sexo acabava ao atingir 100% excitação
- Sem fetiches
- Sem gravidez
- Sem contagem de estamina

### Agora (v2.0)
- **20+ ações** diferentes
- **Penetração vaginal + anal**
- **6 posições principais** + variações
- Sexo continua **enquanto houver estamina**
- **Fetiches modificam prazer** (até 2x)
- **Gravidez calculada** baseado em contraceptivo
- **Virindade reconhecida**
- **Estamina como limitador**
- **Bônus de hotel** aumenta prazer
- **Status de gravidez** progressivo

---

## 🔑 PRINCIPAIS FEATURES

### 🌶️ Penetração Anal (Nova!)
5 variações de penetração anal com progressão:
- Prep Anal (começar devagar)
- Anal básico
- Anal de quatro
- Anal reverso
- Anal parede

### 💓 Sistema de Reprodução (Nova!)
- **Virgindade** - NPCs podem ser virgens
- **Contraceptivos** - 6 tipos com eficácia real
- **Cálculo de Gravidez** - Probabilidade realista
- **Trimestres** - Gestação progride com tempo
- **Penalidades** - Mulher grávida fica mais lenta

### 💕 Sistema de Fetiches (Nova!)
Cada NPC pode ter 1-3 fetiches que aumentam prazer em ações específicas:
- Submissa (adora de quatro)
- Dominante (adora estar por cima)
- Anal (adora penetração anal)
- Squirt (adora orgasmos)
- Oral Viciada (adora sexo oral)
- E mais 5 outros...

### 🏨 Sistema de Hotéis (Nova!)
5 categorias com bônus progressivo:
- 1⭐ - $50/noite - Bônus +10
- 2⭐ - $120/noite - Bônus +15
- 3⭐ - $250/noite - Bônus +20
- 4⭐ - $500/noite - Bônus +30
- 5⭐ - $1.200/noite - Bônus +50

### 📦 Sistema de Inventário (Nova!)
- Compre imóveis (5 categorias)
- Compre veículos (7 tipos)
- Gerencie itens
- Rastreie dinheiro total

### 📱 App de Inventário (Nova!)
Acessível via Celular com 3 abas:
1. **🏠 Assets** - Carros, casas, balanço
2. **📦 Itens** - Inventário de consumíveis
3. **💓 Status** - Gravidez, virgindade, perícia

---

## 📊 ESTATÍSTICAS

| Métrica | Valor |
|---------|-------|
| Linhas de código criadas | 2.500+ |
| Ações sexuais diferentes | 20+ |
| Tipos de fetiches | 10 |
| Categorias de hotéis | 5 |
| Tipos de veículos | 7 |
| Categorias de imóveis | 5 |
| Tipos de contraceptivos | 6 |
| Abas de inventário | 3 |

---

## 🔗 INTEGRAÇÕES RECOMENDADAS

### Prioridade 🔴 ALTA
1. **Mapa.js** - Adicionar lógica de hotel/casa
2. **npcGenerator.js** - Gerar fetiches e dados para NPCs

### Prioridade 🟡 MÉDIA
3. **AppChat.js** - Mostrar fetiches antes de encontro
4. **Criacao.js** - Se criar NPCs manualmente

### Prioridade 🟢 BAIXA
5. **LojaRoupas.js** - Integrar inventário de itens
6. **Imobiliaria.js** - Integrar compra de imóveis
7. **LojaVeiculos.js** - Integrar compra de veículos

> ⏳ Tempo estimado: 30-45 minutos

---

## 🧪 TESTES RÁPIDOS

### Teste 1: Verificar novo App
1. Abra o jogo
2. Clique em 📱 Celular
3. Verifique novo ícone 📦 Assets

✅ Se aparecer = funcionando!

### Teste 2: Novo Motel
1. Vá ao Motel (se acessível)
2. Verifique se aparecem 4+ botões
3. Clique em diferentes ações
4. Verifique se estamina diminui

✅ Se botões funcionam = funcionando!

### Teste 3: Verificar Fetiches (quando integrado)
1. Crie um NPC ou abra um existente
2. Verifique se mostra "💕 Fetiches: ..."
3. Vá ao motel e teste ações relacionadas

✅ Se fetiches aparecem = funcionando!

---

## 📝 CÓDIGO EXEMPLO

### Usar o Sistema de Fetiches
```javascript
import { calcularModificadorFetiche } from '../utils/fetchesSystem';

const npc = {
  nome: "Maria",
  fetiches: [
    { id: "submissa", nome: "Submissa" }
  ]
};

const mod = calcularModificadorFetiche(npc, "penetracao", "de_quatro");
console.log(mod); // 1.4 (40% bônus por ser submissa em de_quatro)
```

### Usar o Sistema de Reprodução
```javascript
import { calcularGravidez, tiposContraceptivos } from '../utils/reproductionSystem';

const contraceptivo = "camisinha";
if (calcularGravidez(contraceptivo)) {
  console.log("Gravidez ocorreu!");
  console.log("Eficácia:", tiposContraceptivos[contraceptivo].riscoPrenhez * 100 + "%");
}
```

### Usar o Sistema de Inventário
```javascript
import { comprarVeiculo, temCasaNaCidade } from '../utils/inventorySystem';

// Verificar casa
if (!temCasaNaCidade(player.inventario, player.cidade_id)) {
  setTelaAtual("hotelSelector");
}

// Comprar carro
const resultado = comprarVeiculo(inventario, "carro_pop", player);
if (resultado.sucesso) {
  player.dinheiro -= resultado.dinheiroPago;
  player.inventario.veiculos.push(resultado.veiculo);
}
```

---

## ⚡ DICAS E TRUQUES

### 💡 Dica 1: Fetiches duplicam prazer
Se um NPC tem fetiche relacionado à ação, o prazer pode ser até 2x maior!

### 💡 Dica 2: Hotel melhora tudo
Mesmo hotel 2⭐ (+15 bônus) melhora significativamente o prazer

### 💡 Dica 3: Estamina é o limitador
Sexo não termina por orgasmo, termina quando estamina zera ou alguém quer sair

### 💡 Dica 4: Perícia Sexual importa
Maior perícia = maior prazer gerado (até 2.5x diferença)

### 💡 Dica 5: Virgem é especial
Primeira vez com um NPC virgem vale mais XP

---

## 🐛 TROUBLESHOOTING

### "Erro: Cannot read property 'fetiches'"
**Causa:** NPC não foi inicializado com fetiches
**Solução:** Integre npcGenerator.js

### "Estamina não diminui"
**Causa:** custoEstamina não está sendo aplicado
**Solução:** Verifique Motel.js linha ~80

### "App Inventário vazio"
**Causa:** player.inventario não foi inicializado
**Solução:** Verifique App.js e certifique que inicializou inventario

### "Hotel selector não funciona"
**Causa:** Não foi integrado ao Mapa.js
**Solução:** Veja INTEGRACAO_PENDENTE.md seção 2

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **[SISTEMA_SEXUAL_COMPLETO.md](./SISTEMA_SEXUAL_COMPLETO.md)** - Documentação técnica 100% detalhada
- **[INTEGRACAO_PENDENTE.md](./INTEGRACAO_PENDENTE.md)** - Exatamente o que modificar em cada arquivo
- **[TESTES_VALIDACAO.md](./TESTES_VALIDACAO.md)** - Como testar cada feature

---

## 🎯 PRÓXIMAS FEATURES SUGERIDAS

1. **Relacionamentos** - NPCs podem virar namorados/as
2. **STDs** - Doenças transmissíveis
3. **Reputação Sexual** - Jogador fica famoso
4. **Aborto** - Opção para encerrar gravidez
5. **Habilidades Desbloqueáveis** - Técnicas especiais conforme perícia aumenta
6. **Histórico de Relações** - Rastrear com quem teve relações
7. **Gênero de Filhos** - Filhos herdam atributos
8. **Sistema de Pensão** - Custo mensal por filhos
9. **Educação Sexual** - Tutorial de técnicas
10. **Ranking** - Competir com outros jogadores

---

## 📞 SUPORTE

Se tiver dúvidas:
1. Verifique se fez a importação correta
2. Veja console (F12) para erros
3. Compare com exemplos em SISTEMA_SEXUAL_COMPLETO.md
4. Teste isoladamente no console

---

## 📜 VERSÃO & CRÉDITOS

**Versão:** 2.0 - Sistema Sexual Completo  
**Data:** 2026-07-08  
**Status:** ✅ Implementado e Testável  
**Linhas de Código:** 2.500+

---

## 🎉 CONCLUSÃO

Você agora tem um **sistema sexual profissional** com:
- ✅ 20+ ações diferentes
- ✅ Sistema de fetiches e preferências
- ✅ Reprodução realista com gravidez
- ✅ Inventário de assets e itens
- ✅ Sistema de hotéis com bônus
- ✅ Estamina como limitador de sessão

**Próximo passo:** Leia `INTEGRACAO_PENDENTE.md` e comece a integrar!

---

*Desenvolvido com 💗 para Vidasim*
