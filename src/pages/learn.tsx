import { useBoundStore } from "~/hooks/useBoundStore";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { LoginScreen } from "~/components/LoginScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TILE_STATUS } from "~/utils/types";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import {
  CheckmarkSvg,
  LockSvg,
  StarSvg,
  ActiveBookSvg,
  GoldenBookSvg,
} from "~/components/Svgs";
import { WideIslandSvg } from "~/components/WideIslandSvg";
import {
  TreasureChestSvg,
  TrophyChestSvg,
} from "~/components/IslandSvgs";
import { units } from "~/utils/units";
import { languages } from "~/utils/languages";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { NextPage } from "next";

export const getServerSideProps = (async ({ query }) => {
  if (!query.fast_forward) {
    return { props: { tilesCompleted: null } };
  }

  try {
    const tilesCompleted = Number(query.fast_forward);
    if (Number.isNaN(tilesCompleted)) throw new Error("NaN");
    return { props: { tilesCompleted } };
  } catch (error) {
    return { props: { tilesCompleted: null } };
  }
}) satisfies GetServerSideProps<{
  tilesCompleted: number | null;
}>;

const Learn: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ tilesCompleted }) => {
  const router = useRouter();
  const selectedLanguage = useBoundStore((x) => x.language);
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);
  const [loginScreenState, setLoginScreenState] = useState<
    "HIDDEN" | "LOGIN" | "SIGNUP"
  >("HIDDEN");

  useEffect(() => {
    if (typeof tilesCompleted === "number") {
      const jump = units
        .slice(0, 1)
        .flatMap((unit) => unit.tiles)
        .slice(0, tilesCompleted)
        .reduce((acc, _curr) => acc + 4, 0);
      if (jump > lessonsCompleted) {
        useBoundStore.getState().increaseLessonsCompleted(jump - lessonsCompleted);
      }
    }
  }, [lessonsCompleted, tilesCompleted]);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F5] to-[#f7f3ff] bg-opacity-95">
      <Head>
        <title>Apprendre | IKIGAI</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <div className="flex justify-center">
        <LearnPageTopBar language={selectedLanguage} />
        <LeftBar selectedTab="Apprendre" />
        <div className="flex w-full flex-col lg:flex-row justify-center pt-[58px]">
          <div className="w-full mx-auto max-w-4xl px-4 py-6 sm:py-8 sm:px-6">
            {/* Bannière d'accueil */}
            {lessonsCompleted === 0 && (
              <div className="mb-8 rounded-2xl bg-white p-4 sm:p-6 shadow-md transform transition-all hover:shadow-lg">
                <h2 className="mb-3 text-xl font-bold text-[#58cc02]">Bienvenue dans votre parcours IKIGAI !</h2>
                <p className="text-gray-600">Découvrez votre IKIGAI à travers une série d'exercices interactifs. Ces modules vous aideront à identifier vos passions, talents, valeurs et ce qui donne du sens à votre vie.</p>
              </div>
            )}
            
            {/* Contenu principal */}
            <div className="flex flex-col">
              {/* Section titre avec style Duolingo */}
              <div className="mb-8 flex flex-col sm:flex-row items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#4b4b4b] mb-2 sm:mb-0">Parcours IKIGAI</h1>
                <div className="flex items-center justify-center bg-[#fff1dd] rounded-xl px-4 py-2">
                  <span className="text-[#ff9600] font-bold text-sm sm:text-base">Poursuivez votre aventure !</span>
                </div>
              </div>
              
              {/* Arbre d'apprentissage moderne style Duolingo */}
              <div className="relative">
                {/* Fond décoratif (style path-patterns) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src="/path-patterns.svg" alt="" className="w-full h-full object-cover" />
                </div>
                
                {/* Conteneur principal des modules */}
                <div className="relative pt-2 pb-10">
                  {/* Ligne centrale verticale */}
                  <div className="absolute left-6 top-3 bottom-0 w-1 bg-[#e5e5e5] sm:left-1/4 md:left-[120px] transform -translate-x-1/2"></div>
                  
                  {/* Modules centrés */}
                  <div className="relative z-10 flex justify-start sm:justify-center">
                    <div className="w-full max-w-lg">
                      {units.map((unit, unitIndex) => (
                        <UnitSection 
                          key={unit.unitNumber} 
                          unit={unit} 
                          unitIndex={unitIndex}
                          isFirst={unitIndex === 0}
                          isLast={unitIndex === units.length - 1}
                          lessonsCompleted={lessonsCompleted}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RightBar />
        </div>
      </div>

      <BottomBar selectedTab="Apprendre" />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </div>
  );
};

export default Learn;

const LearnPageTopBar = ({
  language,
}: {
  language: ReturnType<typeof languages.find>;
}) => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-5 text-lg font-bold text-gray-400 md:hidden">
      <Link
        href="/learn"
        className="capitalize text-[#58cc02]"
      >
        Apprendre
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/settings/coach" className="flex h-9 w-9 items-center justify-center">
          <span className="sr-only">Modifier l'objectif</span>
          <XPStarSvg className="h-9 w-9" />
        </Link>
      </div>
    </div>
  );
};

const XPStarSvg = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" {...props}>
      <circle cx="18" cy="18" r="18" fill="#58CC02" />
      <path
        d="M18.1094 8.67188L20.5703 13.8906L26.2266 14.5781C26.25 14.5781 26.4141 14.8594 26.25 15.0234L22.125 19.1016L23.1328 24.7344C23.1562 24.875 22.9922 25.0625 22.8281 24.9688L18 22.3906L13.1953 24.9688C13.0312 25.0625 12.8438 24.875 12.8906 24.7344L13.875 19.1016L9.77344 15.0234C9.63281 14.8594 9.75 14.5781 9.82031 14.5781L15.4766 13.8906L17.9141 8.69531C18 8.55469 18.0469 8.55469 18.1094 8.67188Z"
        fill="white"
      />
    </svg>
  );
};

// Fonction pour déterminer le statut d'une tuile (terminée, active, verrouillée)
const getTileStatus = (
  index: number,
  unit: (typeof units)[number],
  lessonsCompleted: number,
): TILE_STATUS => {
  const tilesCompleted = Math.floor(lessonsCompleted / 4);
  
  // Calcul du nombre total de tuiles avant cette unité
  const unitsBeforeThisUnit = units.slice(0, unit.unitNumber - 1);
  let tilesBeforeThisUnit = 0;
  for (const u of unitsBeforeThisUnit) {
    tilesBeforeThisUnit += u.tiles.length;
  }
  
  const absoluteTileIndex = tilesBeforeThisUnit + index;
  
  // Vérifier si la tuile est complète
  if (tilesCompleted > absoluteTileIndex) {
    return "COMPLETE";
  }
  
  // Pour le premier module, le premier exercice est toujours actif
  if (unit.unitNumber === 1) {
    // Si c'est la première tuile ou exactement la prochaine tuile à compléter
    if (index === 0 || tilesCompleted === absoluteTileIndex) {
      return "ACTIVE";
    }
    
    // Si la tuile précédente est complète, cette tuile est active
    if (index > 0) {
      const prevAbsoluteIndex = absoluteTileIndex - 1;
      if (tilesCompleted > prevAbsoluteIndex) {
        return "ACTIVE";
      }
    }
  } else {
    // Pour les autres modules
    
    // Si c'est exactement la prochaine tuile à compléter
    if (tilesCompleted === absoluteTileIndex) {
      return "ACTIVE";
    }
    
    // Si c'est la première tuile de l'unité et que la dernière tuile de l'unité précédente est complétée
    if (index === 0) {
      const previousUnitIndex = unit.unitNumber - 2; // -2 car unitNumber commence à 1 et les tableaux à 0
      const previousUnit = units[previousUnitIndex];
      
      if (previousUnit) {
        const lastTileOfPrevUnit = tilesBeforeThisUnit - 1;
        if (tilesCompleted > lastTileOfPrevUnit) {
          return "ACTIVE";
        }
      }
    } else {
      // Si la tuile précédente dans la même unité est complétée
      const prevTileInSameUnit = absoluteTileIndex - 1;
      if (tilesCompleted > prevTileInSameUnit) {
        return "ACTIVE";
      }
    }
  }

  return "LOCKED";
};

// UnitSection - Composant pour section de module (style Duolingo moderne)
const UnitSection = ({ 
  unit, 
  unitIndex,
  isFirst, 
  isLast,
  lessonsCompleted 
}: { 
  unit: (typeof units)[number];
  unitIndex: number;
  isFirst: boolean;
  isLast: boolean;
  lessonsCompleted: number;
}) => {
  const isUnitCompleted = useBoundStore((x) => x.isUnitCompleted);
  const unitCompleted = isUnitCompleted(unit.unitNumber);
  
  // Extraire les couleurs de l'unité pour le style
  const bgColorClass = unit.backgroundColor;
  const bgColor = bgColorClass.replace('bg-', '');
  const borderColor = unit.borderColor.replace('border-', '');
  
  return (
    <div className="mb-12 sm:mb-14">
      {/* Titre de la section avec badge */}
      <div className="flex items-center gap-2 pl-10 sm:pl-12 md:pl-16 mb-4 sm:mb-5">
        {unitCompleted ? (
          <div className="flex items-center bg-[#f7ffef] px-3 py-1 rounded-xl border border-[#d7ffb8] shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-[#58cc02] mr-2">{unit.description}</h2>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#58cc02] text-white">
              <CheckmarkSvg className="h-4 w-4" />
            </div>
          </div>
        ) : (
          <div className={`flex items-center px-3 py-1 rounded-xl bg-opacity-10 ${bgColorClass} border ${unit.borderColor} shadow-sm`}>
            <h2 className={`text-lg sm:text-xl font-bold ${bgColorClass.replace('bg-', 'text-')}`}>
              {unit.description}
            </h2>
          </div>
        )}
      </div>
      
      {/* Carte décorative de l'unité */}
      <div className="hidden md:block absolute right-0 sm:right-4 -mt-12 w-24 h-24 md:w-32 md:h-32 opacity-10 pointer-events-none">
        <WideIslandSvg color={bgColor} />
      </div>
      
      {/* Leçons du module */}
      <div className="relative">
        {unit.tiles.map((tile, tileIndex) => (
          <LessonItem
            key={tileIndex}
            unit={unit}
            tile={tile}
            tileIndex={tileIndex}
            isFirst={tileIndex === 0 && isFirst}
            isLast={tileIndex === unit.tiles.length - 1 && isLast}
            lessonsCompleted={lessonsCompleted}
          />
        ))}
      </div>
    </div>
  );
};

// LessonItem - Composant pour chaque leçon (style Duolingo moderne)
const LessonItem = ({
  unit,
  tile,
  tileIndex,
  isFirst,
  isLast,
  lessonsCompleted
}: {
  unit: (typeof units)[number];
  tile: (typeof units)[number]["tiles"][number];
  tileIndex: number;
  isFirst: boolean;
  isLast: boolean;
  lessonsCompleted: number;
}) => {
  const router = useRouter();
  const status = getTileStatus(tileIndex, unit, lessonsCompleted);
  
  // Calcul de l'index absolu pour la requête d'URL
  const unitsBeforeThisUnit = units.slice(0, unit.unitNumber - 1);
  let tilesBeforeThisUnit = 0;
  for (const u of unitsBeforeThisUnit) {
    tilesBeforeThisUnit += u.tiles.length;
  }
  const absoluteTileIndex = tilesBeforeThisUnit + tileIndex + 1;
  
  // Extraction des couleurs pour le style
  const bgColorClass = unit.backgroundColor;
  const bgColor = bgColorClass.replace('bg-', '');
  const borderColor = unit.borderColor.replace('border-', '');
  
  // Configuration des couleurs selon le statut (terminé, actif, verrouillé)
  const nodeColors = {
    COMPLETE: {
      bg: bgColor,
      border: borderColor,
      icon: "text-white",
      path: bgColor,
      text: "text-[#4b4b4b]",
      status: "text-[#58cc02]",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      hoverEffect: "hover:shadow-lg hover:scale-105",
      cardBg: "bg-[#f7ffef]",
      cardBorder: "border-[#d7ffb8]"
    },
    ACTIVE: {
      bg: "white",
      border: borderColor,
      icon: `text-[${bgColor}]`,
      path: "#e5e5e5",
      text: "text-[#4b4b4b]",
      status: "text-[#1cb0f6]",
      boxShadow: "0 6px 12px rgba(88, 204, 2, 0.2)",
      hoverEffect: "hover:shadow-lg hover:scale-105",
      cardBg: "bg-[#ddf4ff]",
      cardBorder: "border-[#84d8ff]"
    },
    LOCKED: {
      bg: "#e5e5e5",
      border: "#d1d1d1",
      icon: "text-[#afafaf]",
      path: "#e5e5e5",
      text: "text-[#afafaf]",
      status: "text-[#afafaf]",
      boxShadow: "none",
      hoverEffect: "",
      cardBg: "bg-[#f5f5f5]",
      cardBorder: "border-[#e5e5e5]"
    }
  };
  
  const colors = nodeColors[status];
  
  // Gestion du clic sur les leçons verrouillées
  const onClick = (e: React.MouseEvent) => {
    if (status === "LOCKED") {
      e.preventDefault();
    }
  };
  
  // Sélection de l'icône selon le type de leçon
  const getLessonIcon = () => {
    switch (tile.type) {
      case "book":
        return <BookSvg className={`h-7 w-7 ${colors.icon}`} />;
      case "dumbbell":
        return <DumbbellSvg className={`h-7 w-7 ${colors.icon}`} />;
      case "trophy":
        return <TrophySvg className={`h-7 w-7 ${colors.icon}`} />;
      case "treasure":
        return <TreasureSvg className={`h-7 w-7 ${colors.icon}`} />;
      case "star":
      default:
        return <StarSvg className={`h-7 w-7 ${colors.icon}`} />;
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-4 relative">
      <div className="flex items-center">
        {/* Ligne connectrice verticale avant le nœud */}
        {!isFirst && (
          <div 
            className="absolute left-6 top-[-16px] w-1 h-4 sm:left-6"
            style={{ 
              background: tileIndex === 0 ? "#e5e5e5" : 
                          status === "COMPLETE" || 
                          getTileStatus(tileIndex - 1, unit, lessonsCompleted) === "COMPLETE" 
                          ? colors.path : "#e5e5e5" 
            }}
          />
        )}
        
        {/* Ligne connectrice verticale après le nœud */}
        {!isLast && (
          <div 
            className="absolute left-6 bottom-[-16px] w-1 h-4 sm:left-6"
            style={{ 
              background: status === "COMPLETE" ? colors.path : "#e5e5e5" 
            }}
          />
        )}
        
        {/* Nœud/cercle de la leçon */}
        <Link
          href={status === "LOCKED" ? "#" : `/lesson?tile=${absoluteTileIndex}`}
          onClick={onClick}
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center 
            rounded-full transition sm:h-16 sm:w-16 md:h-18 md:w-18
            ${status === "LOCKED" ? "cursor-not-allowed" : `cursor-pointer ${colors.hoverEffect}`}
            transform transition-all duration-300`}
          style={{
            backgroundColor: colors.bg,
            border: `2px solid ${colors.border}`,
            boxShadow: colors.boxShadow
          }}
        >
          {status === "COMPLETE" ? (
            <CheckmarkSvg className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          ) : status === "LOCKED" ? (
            <LockSvg className="h-5 w-5 sm:h-6 sm:w-6 text-[#afafaf]" />
          ) : (
            getLessonIcon()
          )}
          
          {/* Badge "!" pour les leçons actives */}
          {status === "ACTIVE" && (
            <div className="absolute -right-1 -top-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#ff4b4b] text-xs font-bold text-white animate-pulse">
              !
            </div>
          )}
        </Link>
      </div>
      
      {/* Description de la leçon - version carte plus moderne */}
      <div className="ml-4 mt-2 sm:mt-0 flex-1 flex flex-col">
        <div className={`text-sm sm:text-base font-bold ${colors.text}`}>
          {tile.description}
        </div>
        
        {/* Bouton d'action selon le statut */}
        <div className="flex items-center mt-1">
          <div className={`
            ${status === "ACTIVE" ? "bg-[#1cb0f6] text-white" : 
              status === "COMPLETE" ? "bg-[#58cc02] text-white" : 
              "bg-[#f0f0f0] text-[#afafaf]"}
            rounded-full px-3 py-1 text-xs font-bold transition-all ${status !== "LOCKED" ? "hover:opacity-90" : ""}
          `}>
            {status === "COMPLETE" ? "Terminé" : 
             status === "ACTIVE" ? "Commencer" : 
             "Verrouillé"}
          </div>
          
          {/* Badge XP pour leçons complétées/actives */}
          {status !== "LOCKED" && (
            <div className="ml-2 flex items-center bg-[#fff4db] text-[#ff9600] rounded-full px-2 py-0.5 text-xs font-bold">
              <span>+5 XP</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Infobulle pour les écrans larges au survol */}
      <div className="hidden lg:block absolute right-4 transform translate-y-0 w-40 opacity-0 
          transition-all duration-300 pointer-events-none hover:opacity-100 group-hover:opacity-100">
        <div className={`p-2 rounded-lg ${colors.cardBg} border ${colors.cardBorder} shadow-md`}>
          <p className="text-xs">{tile.description}</p>
        </div>
      </div>
    </div>
  );
};

// Composants SVG pour les icônes de type de leçon
const BookSvg = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21,4H3C2.447,4,2,4.447,2,5v14c0,0.553,0.447,1,1,1h18c0.553,0,1-0.447,1-1V5C22,4.447,21.553,4,21,4z M20,18H4V6h16V18z"/>
    <path d="M9.5,8h5C14.776,8,15,7.776,15,7.5S14.776,7,14.5,7h-5C9.224,7,9,7.224,9,7.5S9.224,8,9.5,8z"/>
    <path d="M9.5,11h5c0.276,0,0.5-0.224,0.5-0.5S14.776,10,14.5,10h-5C9.224,10,9,10.224,9,10.5S9.224,11,9.5,11z"/>
    <path d="M9.5,14h5c0.276,0,0.5-0.224,0.5-0.5S14.776,13,14.5,13h-5C9.224,13,9,13.224,9,13.5S9.224,14,9.5,14z"/>
  </svg>
);

const DumbbellSvg = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.57,14.86L22,13.43L20.57,12,17,15.57V8.43L20.57,12,22,10.57,20.57,9.14,17,12.71V5.57L18.57,7.14,20,5.71l-1.43-1.43L17,5.71V4a1,1,0,0,0-2,0V17a1,1,0,0,0,2,0V15.71L20.57,19.14,22,17.71Z"/>
    <path d="M13.57,14.86,15,13.43,13.57,12,10,15.57V8.43L13.57,12,15,10.57,13.57,9.14,10,12.71V5.57L11.57,7.14,13,5.71,11.57,4.28,10,5.71V4A1,1,0,0,0,8,4V17a1,1,0,0,0,2,0V15.71L13.57,19.14,15,17.71Z"/>
    <path d="M6.57,14.86,8,13.43,6.57,12,3,15.57V8.43L6.57,12,8,10.57,6.57,9.14,3,12.71V5.57L4.57,7.14,6,5.71,4.57,4.28,3,5.71V4A1,1,0,0,0,1,4V17a1,1,0,0,0,2,0V15.71L6.57,19.14,8,17.71Z"/>
  </svg>
);

const TrophySvg = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18,5h-2V3H8v2H6C4.897,5,4,5.897,4,7v2c0,2.206,1.794,4,4,4h1c0,1.103,0.897,2,2,2h2c1.103,0,2-0.897,2-2h1c2.206,0,4-1.794,4-4V7C20,5.897,19.103,5,18,5z M6,7h2v4c-1.103,0-2-0.897-2-2V7z M18,9c0,1.103-0.897,2-2,2V7h2V9z"/>
    <path d="M8 18H16V20H8z"/>
  </svg>
);

const TreasureSvg = (props: React.SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21,4h-8V3c0-0.553-0.447-1-1-1h-0.5C10.12,2,10,2.12,10,2.5v0.547C10,3.57,9.57,4,9.047,4H3C2.447,4,2,4.447,2,5v14c0,0.553,0.447,1,1,1h18c0.553,0,1-0.447,1-1V5C22,4.447,21.553,4,21,4z M20,18H4V6h16V18z"/>
    <path d="M12,15c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S9.794,15,12,15z M12,9c1.103,0,2,0.897,2,2s-0.897,2-2,2s-2-0.897-2-2S10.897,9,12,9z"/>
  </svg>
);