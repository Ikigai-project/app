import { useBoundStore } from "~/hooks/useBoundStore";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { LoginScreen } from "~/components/LoginScreen";
import { TopBar } from "~/components/TopBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LESSON_TYPES, TILE_STATUS } from "~/utils/types";
import Link from "next/link";
import { composeClasses } from "~/utils/array-utils";
import {
  CheckmarkSvg,
  LockSvg,
  StarSvg,
  GoldenCupSvg,
  TreeSvg,
  DoveSvg,
  BellyEggSvg,
  SunnyEggSvg,
  BookSvg,
  MusicEggSvg,
  FlagSvg,
  WoodenSignSvg,
  WideIslandSvg,
  IslandFlagSvg,
  IslandCastleSvg,
  IslandFarAwayFlagSvg,
  IslandJournalSvg,
  IslandMapSvg,
  IslandPostcardSvg,
  IslandSailyardSvg,
  GoldenTreasureSvg,
  ChallengeStrokeSvg,
  ChallengeSvg,
  TreasureChestSvg,
  BookshelfChestSvg,
  TowerChestSvg,
  BattlegemChestSvg,
  CherryBlossomChestSvg,
  GlobeChestSvg,
  DiscountChestSvg,
  GoldenNoteChestSvg,
  HeartChestSvg,
  PinataChestSvg,
  ParachuteChestSvg,
  ToucanChestSvg,
  ResistanceChestSvg,
  FlagpoleChestSvg,
  CrownChestSvg,
  ChampagneChestSvg,
  TrophyChestSvg,
} from "~/components/Svgs";
import { units } from "~/utils/units";
import { languages } from "~/utils/languages";
import Head from "next/head";
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
    "HIDDEN" | "LOGIN" | "REGISTER"
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

    // Ajoutez l'écouteur d'événement
    window.addEventListener("scroll", handleScroll);

    // Nettoyez l'écouteur d'événement
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Apprendre | IKIGAI</title>
      </Head>
      <div className="flex justify-center bg-[#F1FFEC]">
        <LearnPageTopBar language={selectedLanguage} />
        <LeftBar selectedTab="Learn" />
        <div className="flex w-full max-w-6xl justify-center pt-14">
          <div className="w-full overflow-x-hidden pb-32 lg:max-w-[calc(100%-300px)] lg:pl-16 lg:pt-32">
            {units.map((unit) => (
              <IslandSection island={unit} key={unit.unitNumber} />
            ))}
          </div>
          <RightBar />
        </div>
      </div>

      <div className="pt-[90px]"></div>

      <BottomBar selectedTab="Learn" />
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
    <div className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center justify-between border-b-2 border-[#e5e5e5] bg-white px-5 text-lg font-bold text-gray-400 md:hidden">
      <Link
        href="/learn"
        className="capitalize text-[#41D185]"
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

// Composant pour chaque section d'île
const IslandSection = ({ island }: { island: (typeof units)[number] }) => {
  return (
    <div className="my-5">
      <UnitHeader unit={island} />
      <div className="relative">
        <div className="absolute inset-0 flex justify-center">
          <div className="h-full w-[3px] bg-[#e5e5e5]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-1">
          {island.tiles.map((tile, i) => {
            return <TileComponent key={i} tile={tile} index={i} unit={island} />;
          })}
        </div>
      </div>
    </div>
  );
};

// Composant de titre pour chaque unité
const UnitHeader = ({ unit }: { unit: (typeof units)[number] }) => {
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);
  const isUnitCompleted = useBoundStore((x) => x.isUnitCompleted);
  const completedLessonsInUnit = unit.tiles.filter((_, i) => {
    return getTileStatus(i, unit, lessonsCompleted) === "COMPLETE";
  }).length;
  const totalTilesInUnit = unit.tiles.length;
  
  return (
    <div className="flex flex-col items-center pb-5">
      <div className="relative">
        <WideIslandSvg fillColor={unit.backgroundColor} />
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-end pb-[15%] text-white">
          <div className="flex flex-col items-center gap-1">
            <div className="text-xl font-bold">
              Chapitre {unit.unitNumber}
            </div>
            <div className="text-sm">{unit.description}</div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1 text-gray-400">
        {isUnitCompleted(unit.unitNumber) ? (
          <div className="rounded-xl bg-yellow-400 px-3 py-1 font-bold uppercase text-yellow-800">
            Terminé
          </div>
        ) : (
          <div className="text-sm">
            {completedLessonsInUnit}/{totalTilesInUnit} Terminé
          </div>
        )}
      </div>
    </div>
  );
};

// Fonction pour déterminer le statut d'une tuile (terminée, active, verrouillée)
const getTileStatus = (
  index: number,
  unit: (typeof units)[number],
  lessonsCompleted: number,
): TILE_STATUS => {
  const unitsWithTiles = units.slice(0, unit.unitNumber);
  let tilesBeforeThisUnit = 0;
  for (const unit of unitsWithTiles) {
    tilesBeforeThisUnit += unit.tiles.length;
  }

  // Première tuile du premier module toujours active
  if (index === 0 && tilesBeforeThisUnit === 0) {
    return "ACTIVE";
  }

  const tilesCompleted = Math.floor(lessonsCompleted / 4);
  const tilesBeforeThisTile = tilesBeforeThisUnit + index;
  
  // Si la tuile est déjà complétée
  if (tilesCompleted > tilesBeforeThisTile) {
    return "COMPLETE";
  }
  
  // Si c'est exactement la tuile suivante à compléter
  if (tilesCompleted === tilesBeforeThisTile) {
    return "ACTIVE";
  }
  
  // Progression séquentielle: vérifie si la tuile précédente est complète
  if (index > 0) {
    // Vérifier si la tuile précédente dans la même unité est complète
    const previousTileStatus = getTileStatus(index - 1, unit, lessonsCompleted);
    if (previousTileStatus === "COMPLETE") {
      return "ACTIVE";
    }
  } else if (unit.unitNumber > 1) {
    // Si c'est la première tuile d'une unité > 1, vérifier si l'unité précédente est terminée
    const previousUnitIndex = unit.unitNumber - 2; // -2 car unitNumber commence à 1 et les tableaux à 0
    const previousUnit = units[previousUnitIndex];
    
    if (previousUnit) {
      const lastTileIndex = previousUnit.tiles.length - 1;
      const previousLastTileStatus = getTileStatus(lastTileIndex, previousUnit, lessonsCompleted);
      
      if (previousLastTileStatus === "COMPLETE") {
        return "ACTIVE";
      }
    }
  }

  return "LOCKED";
};

// Obtenir les couleurs pour une tuile en fonction de son statut
const getTileColors = (
  status: TILE_STATUS,
  colors: ReturnType<typeof getTileColors>
) => {
  switch (status) {
    case "LOCKED":
      return {
        background: "bg-[#E5E5E5]",
        border: "border-[#D0D0D0]",
        hover: "",
        text: "text-[#B5B5B5]",
      };
    case "ACTIVE":
      return colors.active;
    case "COMPLETE":
      return colors.complete;
  }
};

// Composant pour chaque tuile
const TileComponent = ({
  tile,
  index,
  unit,
}: {
  tile: (typeof units)[number]["tiles"][number];
  index: number;
  unit: (typeof units)[number];
}) => {
  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);
  const status = getTileStatus(index, unit, lessonsCompleted);
  let description = tile.description;
  
  // Ajuster le numéro du cours pour afficher une progression séquentielle
  const calculatedIndex = index + 1;

  const colors = {
    active: {
      background: "bg-[#FFC800]",
      border: "border-[#D1A500]",
      hover: "hover:bg-[#FFCB19]",
      text: "text-[#9F660A]", // texte plus foncé
    },
    complete: {
      background: "bg-[#41D185]", // vert IKIGAI
      border: "border-[#2CA86E]", // vert IKIGAI foncé
      hover: "hover:bg-[#36BE75]", // vert IKIGAI un peu plus clair
      text: "text-white",
    },
  };

  const tileColors = getTileColors(status, colors);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status === "LOCKED") return;

    const unitsBeforeThisUnit = units.slice(0, unit.unitNumber - 1);
    let tilesBeforeThisUnit = 0;
    for (const unit of unitsBeforeThisUnit) {
      tilesBeforeThisUnit += unit.tiles.length;
    }

    const tileNumber = tilesBeforeThisUnit + index + 1;
    if (window.location.pathname === "/learn") {
      window.location.href = `/lesson?tile=${tileNumber}`;
    }
  };

  const getLessonIcon = () => {
    switch (tile.type) {
      case LESSON_TYPES.IKIGAI_PASSION:
        return <StarSvg />;
      case LESSON_TYPES.IKIGAI_TALENT:
        return <DoveSvg />;
      case LESSON_TYPES.IKIGAI_MISSION:
        return <SunnyEggSvg />;
      case LESSON_TYPES.IKIGAI_PROFESSION:
        return <TreeSvg />;
      default:
        return <StarSvg />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {index > 0 && (
        <div
          className={
            status === "LOCKED"
              ? "h-[50px] w-[3px] bg-[#e5e5e5]"
              : "h-[50px] w-[3px] bg-[#41D185]"
          }
        ></div>
      )}
      <Link
        href={status === "LOCKED" ? "#" : `/lesson?tile=${index + 1}`}
        onClick={onClick}
        className={`relative flex h-[90px] w-[90px] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-b-4 text-center transition sm:h-[110px] sm:w-[110px] ${tileColors.background} ${tileColors.border} ${tileColors.hover}`}
      >
        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/30 ${tileColors.text}`}>
          {status === "COMPLETE" ? (
            <CheckmarkSvg />
          ) : status === "LOCKED" ? (
            <LockSvg />
          ) : (
            getLessonIcon()
          )}
        </div>
        <div className={`text-sm font-bold ${tileColors.text}`}>
          {description}
        </div>
        <div className={`text-xs ${tileColors.text}`}>
          Leçon {calculatedIndex}
        </div>
      </Link>
    </div>
  );
};