import React from 'react';
import { AVATAR_ASSETS } from './avatar_assets';

export default function Avatar({ player, mundo }) {
  // 1. Configurações de Cor da Pele (Suporta a etnia individual do jogador/NPC)
  const tonsDePele = { 
    "Latina": "#d2a172", "Asiática": "#fbe7a1", 
    "Mista": "#c68642", "Negra": "#5c3317", "Branca": "#ffdbac" 
  };
  
  const etniaAvatar = player.etnia || (mundo && mundo[player.cidade_origem]?.etnia) || "Branca";
  const corPele = player.corPele || tonsDePele[etniaAvatar] || "#ffdbac";
  const corPeleEscura = shadeColor(corPele, -20); 
  const corCabelo = player.corCabelo || "#2c1b18";

  // Cores de Roupas
  const corTop = player.corRoupaTop || "#f1c40f";
  const corBottom = player.corRoupaBottom || "#1e3799";
  const corIntima = player.corRoupaIntima || (player.genero === "Mulher" ? "#ffcccc" : "#ffffff");

  // 2. Mapeamento Procedural para Tamanhos da Arte Vetorial (Normal, Chubby, Fat, Obese, Hourglass)
  let torsoSize = "Normal";
  if (player.peso < 55 && player.genero === "Mulher") {
    torsoSize = "Hourglass";
  } else if (player.peso < 75) {
    torsoSize = "Normal";
  } else if (player.peso < 90) {
    torsoSize = "Chubby";
  } else if (player.peso < 105) {
    torsoSize = "Fat";
  } else {
    torsoSize = "Obese";
  }

  let legSize = "Normal";
  if (player.peso < 55) {
    legSize = "Narrow";
  } else if (player.peso < 85) {
    legSize = "Normal";
  } else {
    legSize = "Wide";
  }

  // Escalonamento da bunda (0 a 6)
  let buttSize = Math.min(6, Math.max(0, Math.floor((player.peso - 45) / 10)));
  if (player.genero === "Mulher") {
    buttSize = Math.min(6, buttSize + 1);
  }
  if (player.bunda === "Discreta") {
    buttSize = Math.max(0, buttSize - 1);
  } else if (player.bunda === "Grande") {
    buttSize = Math.min(6, buttSize + 2);
  }

  // Braços gordinhos ou normais
  const armPrefix = (torsoSize === "Chubby" || torsoSize === "Fat" || torsoSize === "Obese") ? "ArmFat" : "Arm";

  // Mapeamento do Cabelo
  let tempStyle = player.estiloCabelo;
  let tempLength = player.comprimentoCabelo;

  if (!tempStyle || !tempLength) {
    if (player.cabelo === "Curtos") {
      tempStyle = "Messy";
      tempLength = "Short";
    } else if (player.cabelo === "Longos") {
      tempStyle = "Luxurious";
      tempLength = "Long";
    } else if (player.cabelo === "Espetado") {
      tempStyle = "Messy";
      tempLength = "Medium";
    } else if (player.cabelo === "Cacheados") {
      tempStyle = "Afro";
      tempLength = "Medium";
    } else if (player.cabelo === "Careca") {
      tempStyle = "Careca";
      tempLength = "Short";
    } else {
      tempStyle = "Messy";
      tempLength = "Medium";
    }
  }

  // Obter chaves de cabelo através da tabela de tradução
  const getHairKeys = (style, length) => {
    const s = style.toLowerCase();
    if (s === "careca" || s === "buzzcut" || s === "shaved" || s === "bald" || player.cabelo === "Careca") {
      return { back: null, fore: null };
    }
    const capStyle = style.charAt(0).toUpperCase() + style.slice(1);
    if (s === "undercut" || s === "strip") {
      return { back: null, fore: `Art_Vector_Hair_Fore_Strip_${length}` };
    } else if (s === "messy bun") {
      return { back: `Art_Vector_Hair_Back_Ninja_${length}`, fore: `Art_Vector_Hair_Fore_Ninja_${length}` };
    } else if (["bun", "neat", "ponytail"].includes(s)) {
      return { back: `Art_Vector_Hair_Back_${capStyle}_${length}`, fore: `Art_Vector_Hair_Fore_${capStyle}` };
    } else {
      return { back: `Art_Vector_Hair_Back_${capStyle}_${length}`, fore: `Art_Vector_Hair_Fore_${capStyle}_${length}` };
    }
  };

  const { back: hairBackKey, fore: hairForeKey } = getHairKeys(tempStyle, tempLength);
  const hasHair = hairBackKey !== null || hairForeKey !== null;

  // Tradução do Vestuário para os prefixos dos arquivos SVG originais
  const topTranslation = {
    "Camiseta": "Tshirt",
    "Top": "SportsBra",
    "Suéter": "Sweater",
    "Colete Bunny": "Bunny",
    "Uniforme Escolar": "Schoolgirl",
    "Collant (Leotard)": "Leotard",
    "Vestido Curto": "MiniDress",
    "Uniforme Policial": "PoliceUniform",
    "Vestido Maternidade": "MaternityDress"
  };

  const bottomTranslation = {
    "Calça": "Jeans",
    "Short": "SportShorts",
    "Saia Escolar": "Schoolgirl",
    "Meia Bunny": "Bunny",
    "Meia Curta": "MiniDress",
    "Calça Policial": "PoliceUniform"
  };

  const topSuffix = topTranslation[player.roupaTop] || "Tshirt";
  const bottomSuffix = bottomTranslation[player.roupaBottom] || "Jeans";

  // 3. Validador de Nudez
  const isSemBottom = player.roupaBottom === "Nenhuma" || !player.roupaBottom;
  const isSemTop = player.roupaTop === "Nenhuma" || !player.roupaTop;
  const isSemIntima = player.roupaIntima === false || player.roupaIntima === "Nenhuma" || !player.roupaIntima;
  
  const nudezInferior = isSemBottom && isSemIntima;

  // 4. Transformações Dinâmicas (Mapeamento de Escala dos Seios, Barriga e Testículos)
  // Escala dos seios (boobs) baseada em player.seios_cm (Padrão 95cm)
  let boobTransform = null;
  if (player.genero === "Mulher") {
    const seiosCm = player.seios_cm || 95;
    // Traduz cm para cc (volume)
    const volumecc = 300 * Math.pow(1.13, seiosCm - 80);
    let boobScaleFactor = 1.0;
    let translationX = 22;
    let translationY = 0;
    
    if (volumecc >= 300) {
      boobScaleFactor = 0.383433 * Math.log(0.0452403 * volumecc);
      boobScaleFactor = Math.min(2.5, Math.max(0.8, boobScaleFactor));
      translationX = -282.841 * boobScaleFactor + 292.349;
      translationY = -225.438 * boobScaleFactor + 216.274;
    }
    boobTransform = `matrix(${boobScaleFactor},0,0,${boobScaleFactor},${translationX},${translationY})`;
  }

  // Escala da barriga grávida ou gorda
  let bellyTransform = null;
  if (player.peso > 75) {
    const bellyValue = (player.peso - 75) * 150 + 2000;
    const bellyScaleFactor = Math.min(2.2, 0.300 * Math.log(0.011 * bellyValue));
    const translationX = -262 * (bellyScaleFactor - 1);
    const translationY = -284 * (bellyScaleFactor - 1);
    bellyTransform = `matrix(${bellyScaleFactor},0,0,${bellyScaleFactor},${translationX},${translationY})`;
  }

  // Escala dos testículos (balls)
  let ballsTransform = null;
  if (player.genero === "Homem") {
    const ballsScaleFactor = 1.0;
    const translationX = -271 * (ballsScaleFactor - 1);
    const translationY = -453 * (ballsScaleFactor - 1);
    ballsTransform = `matrix(${ballsScaleFactor},0,0,${ballsScaleFactor},${translationX},${translationY})`;
  }

  // Tamanho do Pênis (0 a 10)
  const penisIndex = Math.min(10, Math.max(0, Math.floor((player.penis_cm || 14) - 8)));

  // 5. Função Utilitária para Renderizar Camadas SVG do Dicionário
  const renderLayer = (layerName, transform = null) => {
    const svgContent = AVATAR_ASSETS[layerName];
    if (!svgContent) return null;
    return (
      <g 
        key={layerName}
        data-layer={layerName}
        transform={transform}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    );
  };

  // Renderiza sobreposição muscular se player.forca for alto
  const renderMuscles = (layerPrefix) => {
    const forca = player.forca || 20;
    if (forca >= 80) return renderLayer(`${layerPrefix}_MHeavy`);
    if (forca >= 55) return renderLayer(`${layerPrefix}_MMedium`);
    if (forca >= 30) return renderLayer(`${layerPrefix}_MLight`);
    return null;
  };

  // 6. Injeção de Estilo CSS Customizado por Metas de Classe
  const idUnico = `avatar-${player.nome ? player.nome.replace(/\s+/g, '-') : 'player'}`;
  const styleCss = `
    #${idUnico} .skin { fill: ${corPele} !important; }
    #${idUnico} .head { fill: ${corPele} !important; }
    #${idUnico} .torso { fill: ${corPele} !important; }
    #${idUnico} .boob { fill: ${corPele} !important; }
    #${idUnico} .penis { fill: ${corPele} !important; }
    #${idUnico} .scrotum { fill: ${corPele} !important; }
    #${idUnico} .belly { fill: ${corPele} !important; }
    #${idUnico} .labia { fill: ${corPele} !important; }
    
    #${idUnico} .shadow { fill: ${corPeleEscura} !important; }
    #${idUnico} .bellybutton { fill: ${corPeleEscura} !important; }

    #${idUnico} .hair { fill: ${corCabelo} !important; }
    #${idUnico} .eyebrow_hair { fill: ${corCabelo} !important; }
    #${idUnico} .pubic_hair { fill: ${corCabelo} !important; }
    #${idUnico} .underarm_hair { fill: ${corCabelo} !important; }

    #${idUnico} .eye { fill: ${player.corOlhos || "#3498db"} !important; }
    #${idUnico} .sclera { fill: #ffffff !important; }
    #${idUnico} .lip { fill: #e74c3c !important; }

    /* Customização dinâmica de cores das Roupas via assinaturas de cores do SVG */
    
    /* 1. Roupas do Torso (Cor do Top): Substitui branco (#ffffff) */
    #${idUnico} [data-layer*="Outfit_Tshirt"] path[fill="#ffffff"],
    #${idUnico} [data-layer*="Outfit_Tshirt"] path[fill="#fff"],
    #${idUnico} [data-layer*="Outfit_Tshirt"] path[style*="fill:#ffffff"],
    #${idUnico} [data-layer*="Outfit_Tshirt"] path[style*="fill:#fff"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[fill="#ffffff"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[fill="#fff"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[style*="fill:#ffffff"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[style*="fill:#fff"],
    #${idUnico} [data-layer*="Outfit_Sweater"] path[fill="#ffffff"],
    #${idUnico} [data-layer*="Outfit_Sweater"] path[fill="#fff"],
    #${idUnico} [data-layer*="Outfit_Sweater"] path[style*="fill:#ffffff"],
    #${idUnico} [data-layer*="Outfit_Sweater"] path[style*="fill:#fff"],
    #${idUnico} [data-layer*="Outfit_ButtonupShirt"] path[fill="#ffffff"],
    #${idUnico} [data-layer*="Outfit_ButtonupShirt"] path[fill="#fff"],
    #${idUnico} [data-layer*="Outfit_ButtonupShirt"] path[style*="fill:#ffffff"],
    #${idUnico} [data-layer*="Outfit_ButtonupShirt"] path[style*="fill:#fff"] {
      fill: ${corTop} !important;
    }

    #${idUnico} [data-layer*="Outfit_SportsBra"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_SportsBra"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_SportsBra"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_SportsBra"] path[style*="fill:#333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[style*="fill:#333"],
    #${idUnico} [data-layer*="Outfit_Leotard"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_Leotard"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_Leotard"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_Leotard"] path[style*="fill:#333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[style*="fill:#333"] {
      fill: ${corTop} !important;
    }

    /* 2. Calças Jeans / Shorts / Saias (Cor do Bottom) */
    #${idUnico} [data-layer*="Outfit_Jeans"] path[fill="#517cd3"],
    #${idUnico} [data-layer*="Outfit_Jeans"] path[style*="fill:#517cd3"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[fill="#517cd3"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[style*="fill:#517cd3"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[fill="#517cd3"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[style*="fill:#517cd3"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[fill="#517cd3"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[style*="fill:#517cd3"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[fill="#517cd3"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[style*="fill:#517cd3"] {
      fill: ${corBottom} !important;
    }

    #${idUnico} [data-layer*="Outfit_Jeans"] path[fill="#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_Jeans"] path[style*="fill:#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[fill="#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[style*="fill:#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[fill="#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[style*="fill:#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[fill="#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[style*="fill:#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[fill="#8aa7ff"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[style*="fill:#8aa7ff"] {
      fill: ${shadeColor(corBottom, 20)} !important;
    }

    /* Shorts e saias também usam cinza #333 para a base */
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_SportShorts"] path[style*="fill:#333"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_Schoolgirl"] path[style*="fill:#333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_Bunny"] path[style*="fill:#333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[fill="#333333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[fill="#333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[style*="fill:#333333"],
    #${idUnico} [data-layer*="Outfit_MiniDress"] path[style*="fill:#333"] {
      fill: ${corBottom} !important;
    }

    /* 4. Roupas Íntimas - Sutiã/Calcinha/Thong (Cor Íntima): Substitui rosa (#ffaaee / #fae) */
    #${idUnico} path[fill="#ffaaee"],
    #${idUnico} path[fill="#fae"],
    #${idUnico} path[style*="fill:#ffaaee"],
    #${idUnico} path[style*="fill:#fae"] {
      fill: ${corIntima} !important;
    }
  `;

  return (
    <div 
      id={idUnico}
      style={{ 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#ececec', 
        borderRadius: '10px', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styleCss }} />
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 560 1000"
        style={{ filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.3))" }}
      >
        {/* Camada 1: Cabelo Atrás */}
        {hairBackKey && renderLayer(hairBackKey)}

        {/* Camada 2: Braço Direito (Base + Músculos) */}
        {renderLayer(`Art_Vector_${armPrefix}_Right_Low`)}
        {renderMuscles(`Art_Vector_${armPrefix}_Right_Low`)}

        {/* Camada 3: Braço Esquerdo (Base + Músculos) */}
        {renderLayer(`Art_Vector_${armPrefix}_Left_Low`)}
        {renderMuscles(`Art_Vector_${armPrefix}_Left_Low`)}

        {/* Camada 4: Bunda (Base e Roupas) */}
        {renderLayer(`Art_Vector_Butt_${buttSize}`)}
        {player.roupaBottom !== "Nenhuma" && renderLayer(`Art_Vector_Butt_Outfit_${bottomSuffix}_${buttSize}`)}
        {player.roupaIntima && isSemBottom && renderLayer(`Art_Vector_Butt_Outfit_Panties_${buttSize}`)}

        {/* Camada 5: Pernas (Base + Músculos + Roupas) */}
        {renderLayer(`Art_Vector_Leg_${legSize}`)}
        {renderMuscles(`Art_Vector_Leg_${legSize}`)}
        {player.roupaBottom !== "Nenhuma" && renderLayer(`Art_Vector_Leg_Outfit_${bottomSuffix}_${legSize}`)}

        {/* Camada 6: Pés */}
        {renderLayer(`Art_Vector_Feet_Normal`)}

        {/* Camada 7: Torso (Base + Músculos) */}
        {renderLayer(`Art_Vector_Torso_${torsoSize}`)}
        {renderMuscles(`Art_Vector_Torso_${torsoSize}`)}

        {/* Camada 8: Genitália Feminina */}
        {player.genero === "Mulher" && nudezInferior && renderLayer("Art_Vector_Pussy")}

        {/* Camada 9: Pelos Pubianos */}
        {nudezInferior && hasHair && renderLayer("Art_Vector_Pubic_Hair_Wispy")}

        {/* Camada 10: Roupas do Torso (Top) */}
        {(() => {
          if (player.roupaTop !== "Nenhuma") {
            let combinedKey = `Art_Vector_Torso_Outfit_${topSuffix}And${bottomSuffix}_${torsoSize}`;
            if (topSuffix === "Tshirt" && bottomSuffix === "SportShorts") {
              combinedKey = `Art_Vector_Torso_Outfit_SportShortsAndATshirt_${torsoSize}`;
            }
            return renderLayer(combinedKey) || renderLayer(`Art_Vector_Torso_Outfit_${topSuffix}_${torsoSize}`);
          }
          return null;
        })()}
        {player.roupaIntima && isSemTop && player.genero === "Mulher" && (
          renderLayer(`Art_Vector_Torso_Outfit_Bra_${torsoSize}`)
        )}

        {/* Camada 11: Mangas da Camiseta nos Braços */}
        {player.roupaTop !== "Nenhuma" && renderLayer(`Art_Vector_Arm_Outfit_${topSuffix}_Left_Low`)}
        {player.roupaTop !== "Nenhuma" && renderLayer(`Art_Vector_Arm_Outfit_${topSuffix}_Right_Low`)}

        {/* Camada 12: Testículos */}
        {player.genero === "Homem" && nudezInferior && renderLayer("Art_Vector_Balls", ballsTransform)}

        {/* Camada 13: Pênis */}
        {player.genero === "Homem" && nudezInferior && renderLayer(`Art_Vector_Flaccid_${penisIndex}`)}

        {/* Camada 14: Barriga (Pele e Transformação) */}
        {renderLayer("Art_Vector_Belly", bellyTransform)}

        {/* Camada 15: Seios (Mulheres - Base e Roupa Top/Íntima) */}
        {player.genero === "Mulher" && (
          <>
            {renderLayer("Art_Vector_Boob_Alt", boobTransform)}
            {player.roupaTop !== "Nenhuma" && renderLayer(`Art_Vector_Boob_Outfit_${topSuffix}`, boobTransform)}
            {player.roupaIntima && isSemTop && renderLayer("Art_Vector_Boob_Outfit_Bra", boobTransform)}
          </>
        )}

        {/* Camada 16: Clavícula */}
        {renderLayer("Art_Vector_Clavicle")}

        {/* Camada 17: Cabeça */}
        {renderLayer("Art_Vector_Head")}

        {/* Camada 18: Elementos do Rosto */}
        {renderLayer("Art_Vector_Eyes_TypeA")}
        {renderLayer("Art_Vector_Mouth_TypeA")}
        {renderLayer("Art_Vector_Nose_TypeA")}
        {renderLayer("Art_Vector_Eyebrow_TypeA_Natural")}

        {/* Camada 19: Cabelo Frente */}
        {hairForeKey && renderLayer(hairForeKey)}
      </svg>
    </div>
  );
}

function shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R<255)?R:255; G = (G<255)?G:255; B = (B<255)?B:255;
  let RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  let GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  let BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
  return "#"+RR+GG+BB;
}