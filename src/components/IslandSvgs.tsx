import React from "react";

export const IslandFlagSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M20 38a2 2 0 0 0 2-2V4a2 2 0 0 0-4 0v32a2 2 0 0 0 2 2z" fill="#8E724F" />
      <path d="M32 8H22V20h10L28 14l4-6z" fill="#FF4B4B" />
    </svg>
  );
};

export const IslandCastleSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 38h24V18H8v20z" fill="#CCC" />
      <path d="M6 18h28v-4H6v4z" fill="#AAA" />
      <path d="M10 14h4V8h-4v6zM26 14h4V8h-4v6z" fill="#CCC" />
      <path d="M18 14h4V4h-4v10z" fill="#CCC" />
      <path d="M14 38h4v-8h-4v8zM22 38h4v-8h-4v8z" fill="#555" />
    </svg>
  );
};

export const IslandFarAwayFlagSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M15 38a2 2 0 0 0 2-2V4a2 2 0 0 0-4 0v32a2 2 0 0 0 2 2z" fill="#8E724F" />
      <path d="M27 6H17V18h10L23 12l4-6z" fill="#3AD278" />
    </svg>
  );
};

export const IslandJournalSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 6v28h24V6H8z" fill="#F4D03F" />
      <path d="M10 8h20v24H10V8z" fill="#FFF" />
      <path d="M14 14h12v2H14v-2zM14 18h12v2H14v-2zM14 22h12v2H14v-2zM14 26h6v2h-6v-2z" fill="#555" />
    </svg>
  );
};

export const IslandMapSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M34 8H6v24h28V8z" fill="#F5DEB3" />
      <path d="M14 10s4 4 8 0" stroke="#3AD278" strokeWidth="2" fill="none" />
      <path d="M18 14s2 6 8 4M22 20s-4 6-2 10" stroke="#3AD278" strokeWidth="2" fill="none" />
      <circle cx="14" cy="10" r="2" fill="#FF0000" />
      <circle cx="18" cy="14" r="2" fill="#FF0000" />
      <circle cx="30" cy="26" r="2" fill="#FF0000" />
    </svg>
  );
};

export const IslandPostcardSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M6 10v20h28V10H6z" fill="#FFF" />
      <path d="M6 10v20h28V10H6z" stroke="#555" strokeWidth="1" fill="none" />
      <path d="M10 14h8v2h-8v-2zM10 18h8v2h-8v-2zM10 22h8v2h-8v-2z" fill="#555" />
      <circle cx="26" cy="20" r="6" fill="#3AD278" />
      <path d="M28 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="#FFF" />
    </svg>
  );
};

export const IslandSailyardSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M20 6v30" stroke="#8E724F" strokeWidth="2" fill="none" />
      <path d="M20 8l16 10H20V8z" fill="#FFF" />
      <path d="M20 16h-4c0 8 4 12 4 12V16z" fill="#FFF" />
      <path d="M12 36h16v2H12v-2z" fill="#8E724F" />
    </svg>
  );
};

export const GoldenTreasureSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 16v16h24V16H8z" fill="#8E724F" />
      <path d="M6 16h28v-4H6v4z" fill="#6D563C" />
      <path d="M10 20h20v8H10v-8z" fill="#F4D03F" />
      <path d="M15 24a5 4 0 1 0 10 0 5 4 0 0 0-10 0z" fill="#FFD700" />
    </svg>
  );
};

export const ChallengeStrokeSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <circle cx="20" cy="20" r="16" stroke="#3AD278" strokeWidth="2" fill="none" />
      <path d="M14 20l4 4 8-8" stroke="#3AD278" strokeWidth="2" fill="none" />
    </svg>
  );
};

export const ChallengeSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <circle cx="20" cy="20" r="16" fill="#3AD278" />
      <path d="M14 20l4 4 8-8" stroke="#FFF" strokeWidth="2" fill="none" />
    </svg>
  );
};

// Ajout des composants de coffres au trésor
export const TreasureChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M18 14v18h4V14h-4z" fill="#6D563C" />
      <path d="M16 20h8v6h-8v-6z" fill="#F4D03F" />
    </svg>
  );
};

export const BookshelfChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M6 10v24h28V10H6z" fill="#8E724F" />
      <path d="M8 12h24v4H8v-4zM8 18h24v4H8v-4zM8 24h24v4H8v-4z" fill="#6D563C" />
      <path d="M10 13h4v2h-4v-2zM16 13h4v2h-4v-2zM22 13h8v2h-8v-2zM10 19h8v2h-8v-2zM20 19h10v2H20v-2zM10 25h6v2h-6v-2zM18 25h4v2h-4v-2zM24 25h6v2h-6v-2z" fill="#F4D03F" />
    </svg>
  );
};

export const TowerChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M12 32h16V8H12v24z" fill="#CCC" />
      <path d="M10 8h20v-2H10v2z" fill="#AAA" />
      <path d="M10 32h20v2H10v-2z" fill="#AAA" />
      <path d="M16 14h8v2h-8v-2zM16 20h8v2h-8v-2zM16 26h8v2h-8v-2z" fill="#555" />
    </svg>
  );
};

export const BattlegemChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M18 14v18h4V14h-4z" fill="#6D563C" />
      <path d="M20 18l-6 8h12l-6-8z" fill="#F4D03F" />
    </svg>
  );
};

export const CherryBlossomChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M14 18a6 6 0 1 0 12 0 6 6 0 0 0-12 0z" fill="#FFB6C1" />
      <path d="M20 15l1 3 3-1-1 3 3 1-3 1 1 3-3-1-1 3-1-3-3 1 1-3-3-1 3-1-1-3 3 1 1-3z" fill="#FF69B4" />
    </svg>
  );
};

export const GlobeChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <circle cx="20" cy="23" r="6" fill="#4EAAF0" />
      <path d="M14 23h12M20 17v12" stroke="#FFF" strokeWidth="1" fill="none" />
      <path d="M16 19a10 8 0 1 0 8 0" stroke="#FFF" strokeWidth="1" fill="none" />
    </svg>
  );
};

export const DiscountChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <circle cx="20" cy="23" r="6" fill="#FF4B4B" />
      <path d="M16 19l8 8M24 19l-8 8" stroke="#FFF" strokeWidth="2" fill="none" />
    </svg>
  );
};

export const GoldenNoteChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M24 17v8c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.4 0 .7.1 1 .3V19h-4v4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.4 0 .7.1 1 .3V17h6z" fill="#F4D03F" />
    </svg>
  );
};

export const HeartChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M20 28l-6-6c-1.65-1.65-1.65-4.35 0-6s4.35-1.65 6 0c1.65-1.65 4.35-1.65 6 0s1.65 4.35 0 6l-6 6z" fill="#FF4B4B" />
    </svg>
  );
};

export const PinataChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M16 18s-2 2-2 5 2 5 6 5 6-2 6-5-2-5-2-5" stroke="#FF4B4B" strokeWidth="2" fill="none" />
      <path d="M16 18c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" stroke="#4EAAF0" strokeWidth="2" fill="none" />
      <path d="M20 21v7M16 23h8" stroke="#F4D03F" strokeWidth="2" fill="none" />
    </svg>
  );
};

export const ParachuteChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M20 28c-2.21 0-4-1.79-4-4v-4h8v4c0 2.21-1.79 4-4 4z" fill="#FF4B4B" />
      <path d="M12 18c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="#4EAAF0" strokeWidth="1" fill="none" />
      <path d="M12 18l4 2M28 18l-4 2" stroke="#4EAAF0" strokeWidth="1" fill="none" />
    </svg>
  );
};

export const ToucanChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <ellipse cx="18" cy="21" rx="6" ry="4" fill="#333" />
      <path d="M22 19c3.31 0 6 1.34 6 3s-2.69 3-6 3h-2v-6h2z" fill="#FF8C00" />
      <circle cx="16" cy="20" r="1" fill="#FFF" />
    </svg>
  );
};

export const ResistanceChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M14 18h12v10H14V18z" fill="#333" />
      <path d="M17 21h6v4h-6v-4z" fill="#FF4B4B" />
      <path d="M15 19h10M15 27h10" stroke="#FFF" strokeWidth="1" fill="none" />
    </svg>
  );
};

export const FlagpoleChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M20 17v12" stroke="#AAA" strokeWidth="2" fill="none" />
      <path d="M20 18l6 3-6 3" fill="#FF4B4B" />
    </svg>
  );
};

export const CrownChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M14 24h12v3H14v-3z" fill="#F4D03F" />
      <path d="M14 24l3-6 3 4 3-4 3 6H14z" fill="#F4D03F" />
    </svg>
  );
};

export const ChampagneChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M18 18v8c0 1.1.9 2 2 2s2-.9 2-2v-8h-4z" fill="#F4D03F" />
      <path d="M17 18h6v-2h-6v2z" fill="#CCC" />
      <path d="M24 20c1 0 2-1 3-3M16 20c-1 0-2-1-3-3" stroke="#FFF" strokeWidth="1" fill="none" />
    </svg>
  );
};

export const TrophyChestSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
      <path d="M8 14v18h24V14H8z" fill="#8E724F" />
      <path d="M6 14h28v-4H6v4z" fill="#6D563C" />
      <path d="M16 18h8v2h-8v-2z" fill="#F4D03F" />
      <path d="M18 20v6h4v-6h-4z" fill="#F4D03F" />
      <path d="M14 18c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2" stroke="#F4D03F" strokeWidth="1" fill="none" />
    </svg>
  );
};