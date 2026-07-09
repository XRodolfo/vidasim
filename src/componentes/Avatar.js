import React from 'react';

export default function Avatar({ player, mundo }) {
  // 1. Configurações de Cor da Pele (Agora suporta a etnia individual do NPC)
  const tonsDePele = { 
    "Latina": "#d2a172", "Asiática": "#fbe7a1", 
    "Mista": "#c68642", "Negra": "#5c3317", "Branca": "#ffdbac" 
  };
  
  const etniaAvatar = player.etnia || mundo[player.cidade_origem]?.etnia || "Branca";
  const corPele = tonsDePele[etniaAvatar] || "#ffdbac";
  const corPeleEscura = shadeColor(corPele, -20); 
  const corCabelo = player.corCabelo || "#2c1b18";

  // 2. Modificadores Procedurais do Corpo
  const fatorPeso = Math.max(0.7, Math.min(1.5, player.peso / 60)); 
  const larguraOmbros = 40 * fatorPeso;
  const larguraQuadril = player.genero === "Mulher" ? (45 * fatorPeso) : (35 * fatorPeso);
  
  // Garantia de valores para evitar variáveis indefinidas (undefined)
  const raioSeio = player.genero === "Mulher" ? Math.min(Math.max(((player.seios_cm || 95) - 70) / 3, 5), 25) : 0;
  const penisBase = player.penis_cm || 14; 
  const compPenis = player.genero === "Homem" ? Math.min(Math.max(penisBase * 2, 10), 60) : 0;
  const largPenis = player.genero === "Homem" ? Math.min(Math.max(penisBase / 1.5, 5), 15) : 0;

  // 3. Validador Absoluto de Nudez
  const isSemBottom = player.roupaBottom === "Nenhuma" || !player.roupaBottom;
  const isSemIntima = player.roupaIntima === false || player.roupaIntima === "Nenhuma" || !player.roupaIntima;
  const nudezInferior = isSemBottom && isSemIntima;

 return (
    <svg 
      width="100%" height="100%" viewBox="0 0 200 400" 
      style={{ filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.4))", backgroundColor: "#ececec", borderRadius: "10px" }}
    >
      {/* CAMADA 1: CABELO ATRÁS (PERFEITAMENTE ALINHADO) */}
      {player.cabelo === "Longos" && <path d="M 65 45 Q 45 130 55 210 L 145 210 Q 155 130 135 45 Z" fill={corCabelo} />}
      {player.cabelo === "Cacheados" && <path d="M 60 45 Q 40 100 60 160 L 140 160 Q 160 100 140 45 Z" fill={corCabelo} />}

      {/* CAMADA 2: CORPO BASE */}
      <g id="corpo-base" fill={corPele}>
        <path d={`M ${100 - larguraQuadril/2} 220 L ${90 - larguraQuadril/2} 380 L ${110 - larguraQuadril/2} 380 L 95 240 Z`} />
        <path d={`M ${100 + larguraQuadril/2} 220 L ${110 + larguraQuadril/2} 380 L ${90 + larguraQuadril/2} 380 L 105 240 Z`} />
        <path d={`M ${100 - larguraOmbros} 90 Q 100 100 ${100 + larguraOmbros} 90 L ${100 + larguraQuadril/2} 230 Q 100 240 ${100 - larguraQuadril/2} 230 Z`} />
        <path d={`M ${100 - larguraOmbros} 90 L ${70 - larguraOmbros} 200 L ${85 - larguraOmbros} 200 L ${100 - larguraOmbros + 10} 90 Z`} />
        <path d={`M ${100 + larguraOmbros} 90 L ${130 + larguraOmbros} 200 L ${115 + larguraOmbros} 200 L ${100 + larguraOmbros - 10} 90 Z`} />
        <rect x="90" y="60" width="20" height="35" fill={corPeleEscura} />
        <ellipse cx="100" cy="45" rx="28" ry="35" fill={corPele} />
      </g>

      {/* CAMADA 3: ANATOMIA INTERNA */}
      <g id="anatomia">
        {player.genero === "Mulher" && (
          <g fill={corPele} stroke={corPeleEscura} strokeWidth="0.5">
            <circle cx={100 - larguraOmbros/2.5} cy="120" r={raioSeio} />
            <circle cx={100 + larguraOmbros/2.5} cy="120" r={raioSeio} />
            <circle cx={100 - larguraOmbros/2.5} cy="122" r={raioSeio * 0.2} fill="#d87a7a" />
            <circle cx={100 + larguraOmbros/2.5} cy="122" r={raioSeio * 0.2} fill="#d87a7a" />
          </g>
        )}

        {/* Renderização Masculina corrigida com Validador Absoluto */}
        {player.genero === "Homem" && nudezInferior && (
          <g fill={corPeleEscura}>
            {/* Testículos */}
            <circle cx="95" cy="235" r={largPenis * 0.8} />
            <circle cx="105" cy="235" r={largPenis * 0.8} />
            {/* Corpo do Pênis */}
            <rect x={100 - largPenis/2} y="230" width={largPenis} height={compPenis} rx={largPenis/3} fill={corPele} stroke={corPeleEscura} strokeWidth="1" />
            {/* Detalhe da Glande para profundidade visual */}
            <path d={`M ${100 - largPenis/2} ${230 + compPenis - largPenis/1.5} Q 100 ${230 + compPenis} ${100 + largPenis/2} ${230 + compPenis - largPenis/1.5}`} stroke={corPeleEscura} fill="transparent" strokeWidth="1" />
          </g>
        )}
      </g>

      {/* CAMADA 4: ROUPAS */}
      <g id="roupas">
        {(() => {
          const corTop = player.corRoupaTop || "#f1c40f";
          const corBottom = player.corRoupaBottom || "#1e3799";
          const corIntima = player.corRoupaIntima || (player.genero === "Mulher" ? "#ffcccc" : "#ffffff");

          return (
            <>
              {player.roupaIntima && isSemBottom && (
                <path d={`M ${100 - larguraQuadril/2} 210 Q 100 240 ${100 + larguraQuadril/2} 210 L ${100 + larguraQuadril/2.5} 240 Q 100 250 ${100 - larguraQuadril/2.5} 240 Z`} fill={corIntima} stroke="#ccc" strokeWidth="0.5"/>
              )}
              {player.roupaIntima && player.genero === "Mulher" && (player.roupaTop === "Nenhuma") && (
                <path d={`M 70 100 Q 100 140 130 100 L 130 120 Q 100 150 70 120 Z`} fill={corIntima} stroke="#eeaaaa" strokeWidth="0.5" />
              )}
              {player.roupaBottom === "Calça" && (
                <path d={`M ${100 - larguraQuadril/2 - 2} 210 L ${90 - larguraQuadril/2 - 5} 370 L ${110 - larguraQuadril/2} 370 L 98 240 L 102 240 L ${90 + larguraQuadril/2 + 5} 370 L ${110 + larguraQuadril/2 + 2} 370 L ${100 + larguraQuadril/2 + 2} 210 Z`} fill={corBottom} />
              )}
              {player.roupaBottom === "Short" && (
                <path d={`M ${100 - larguraQuadril/2 - 2} 210 L ${90 - larguraQuadril/2 - 2} 280 L ${110 - larguraQuadril/2} 280 L 98 240 L 102 240 L ${90 + larguraQuadril/2 + 2} 280 L ${110 + larguraQuadril/2 + 2} 280 L ${100 + larguraQuadril/2 + 2} 210 Z`} fill={corBottom} />
              )}
              {player.roupaTop === "Camiseta" && (
                <path d={`M ${100 - larguraOmbros - 5} 85 Q 100 95 ${100 + larguraOmbros + 5} 85 L ${100 + larguraOmbros/2} 215 L ${100 - larguraOmbros/2} 215 Z`} fill={corTop} />
              )}
              {player.roupaTop === "Top" && (
                <path d={`M ${100 - larguraOmbros - 5} 85 Q 100 95 ${100 + larguraOmbros + 5} 85 L ${100 + larguraOmbros/2 + 2} 145 Q 100 155 ${100 - larguraOmbros/2 - 2} 145 Z`} fill={corTop} />
              )}
            </>
          );
        })()}
      </g>

     {/* ==================== CAMADA 5: CABELO FRENTE & ROSTO ALINHADOS ==================== */}
      {/* A cabeça está em cx="100" cy="45" rx="28" ry="35" */}
      
      {player.cabelo === "Curtos" && (
        <path d="M 72 45 Q 100 -5 128 45 Q 134 60 126 65 Q 100 25 74 65 Q 66 60 72 45 Z" fill={corCabelo} />
      )}
      
      {player.cabelo === "Longos" && (
        <path d="M 72 45 Q 100 -5 128 45 Q 140 80 135 130 L 122 130 Q 118 60 100 50 Q 82 60 78 130 L 65 130 Q 60 80 72 45 Z" fill={corCabelo} />
      )}
      
      {player.cabelo === "Espetado" && (
        <path d="M 72 45 L 62 20 L 76 25 L 85 0 L 100 15 L 115 0 L 124 25 L 138 20 L 128 45 Q 138 60 126 62 Q 100 42 74 62 Q 62 60 72 45 Z" fill={corCabelo} />
      )}
      
      {player.cabelo === "Cacheados" && (
        <path d="M 72 45 Q 50 15 75 10 Q 100 -20 125 10 Q 150 15 128 45 Q 145 70 125 75 Q 100 55 75 75 Q 55 70 72 45 Z" fill={corCabelo} />
      )}

      {/* Rosto Alinhado */}
      <circle cx="90" cy="40" r="3" fill="#000" />
      <circle cx="110" cy="40" r="3" fill="#000" />
      <path d="M 92 55 Q 100 60 108 55" stroke="#000" fill="transparent" strokeWidth="1.5" />
    </svg>
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