import React from 'react';

export default function Avatar({ player, mundo }) {
  // Configurações de Etnia (Cor da Pele)
  const tonsDePele = { 
    "Latina": "#d2a172", "Asiática": "#fbe7a1", 
    "Mista": "#c68642", "Negra": "#5c3317", "Branca": "#ffdbac" 
  };
  const cor = tonsDePele[mundo[player.cidade_origem]?.etnia] || "#ffdbac";

  // Proporções baseadas nos atributos
  const larguraTorso = Math.max(60, Math.min(120, player.peso * 1.5));
  const escalaSeio = player.seios === "Fartos" ? 30 : player.seios === "Médios" ? 20 : 10;
  const raioSeio = Math.min(Math.max((player.seios_cm - 70) / 2, 5), 40);
  // Pênis (se quisermos mostrar no avatar futuramente):
  const escalaPenis = Math.min(Math.max((player.penis_cm - 5) * 2, 5), 50);

  return (
    <svg width="200" height="300" viewBox="0 0 200 300" style={{ filter: "drop-shadow(2px 4px 6px black)" }}>
      {/* Pernas */}
      <rect x="70" y="200" width="20" height="90" fill={cor} />
      <rect x="110" y="200" width="20" height="90" fill={cor} />

      {/* Tronco */}
      <path d={`M70 100 L130 100 L${130 + (larguraTorso/4)} 200 L${70 - (larguraTorso/4)} 200 Z`} fill={cor} />

      {/* Seios (Se Mulher) */}
      {player.genero === "Mulher" && (
        <g>
        <circle cx="85" cy="130" r={raioSeio} fill={cor} />
        <circle cx="115" cy="130" r={raioSeio} fill={cor} />
      </g>
       )}

      {/* Cabeça e Pescoço */}
      <rect x="90" y="80" width="20" height="20" fill={cor} />
      <circle cx="100" cy="60" r="30" fill={cor} />
      
      {/* Cabelo (Estilizado por CSS) */}
      {player.cabelo === "Longos" && <rect x="75" y="30" width="50" height="100" fill="#222" rx="20" />}
      {player.cabelo === "Curtos" && <circle cx="100" cy="50" r="32" fill="#222" />}
    </svg>
  );
}