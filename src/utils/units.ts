import type { TileType } from "./types";

// Renommé pour plus de clarté mais conservant la compatibilité
export type Unit = {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
  textColor: `text-${string}`;
  tiles: Tile[];
};

// Alias de type pour utiliser le terme "Module" à la place de "Unit"
export type Module = Unit;

export type Tile = {
  type: TileType;
  description: string;
  badgeId?: string;
};

// Structure inspirée de l'île IKIGAI - renommé en "Modules"
export const units: Module[] = [
  {
    unitNumber: 1,
    description: "Découvrir son IKIGAI",
    backgroundColor: "bg-[#41D185]",
    borderColor: "border-[#2F9D00]",
    textColor: "text-[#41D185]",
    tiles: [
      {
        type: "book",
        description: "Ce que j'aime (Passions)",
        badgeId: "ikigai_passions"
      },
      {
        type: "dumbbell",
        description: "Mes talents (Ce en quoi je suis doué)",
        badgeId: "ikigai_talents"
      },
      {
        type: "book",
        description: "Ce dont le Monde a besoin (Mission)",
        badgeId: "ikigai_mission"
      },
      {
        type: "treasure",
        description: "Ce pour quoi je peux être payé(e)",
        badgeId: "ikigai_profession"
      },
      {
        type: "trophy",
        description: "Mon IKIGAI",
        badgeId: "ikigai_complet"
      }
    ]
  },
  {
    unitNumber: 2,
    description: "Pleine Conscience",
    backgroundColor: "bg-[#4EAAF0]",
    borderColor: "border-[#1CB0F6]",
    textColor: "text-[#4EAAF0]",
    tiles: [
      {
        type: "book",
        description: "Initiation à la pleine conscience",
        badgeId: "meditant"
      },
      {
        type: "dumbbell",
        description: "Observation sans jugement",
        badgeId: "observateur"
      },
      {
        type: "book",
        description: "Pleine conscience au quotidien",
        badgeId: "present"
      },
      {
        type: "treasure",
        description: "Récompense"
      },
      {
        type: "trophy",
        description: "Maîtrise de la Pleine Conscience"
      }
    ]
  },
  {
    unitNumber: 3,
    description: "Résilience & Stress",
    backgroundColor: "bg-[#FF8747]",
    borderColor: "border-[#F49000]",
    textColor: "text-[#FF8747]",
    tiles: [
      {
        type: "book",
        description: "Comprendre le stress",
        badgeId: "zen"
      },
      {
        type: "dumbbell",
        description: "Développer sa résilience",
        badgeId: "resilient"
      },
      {
        type: "book",
        description: "Équilibre émotionnel",
        badgeId: "equilibre"
      },
      {
        type: "treasure",
        description: "Récompense"
      },
      {
        type: "trophy",
        description: "Maîtrise de la Résilience"
      }
    ]
  },
  {
    unitNumber: 4,
    description: "Relations Saines",
    backgroundColor: "bg-[#B069F8]",
    borderColor: "border-[#A560E8]",
    textColor: "text-[#B069F8]",
    tiles: [
      {
        type: "book",
        description: "Communication authentique",
        badgeId: "communicateur"
      },
      {
        type: "dumbbell",
        description: "Développer l'empathie",
        badgeId: "empathique"
      },
      {
        type: "book",
        description: "Collaboration positive",
        badgeId: "collaborateur"
      },
      {
        type: "treasure",
        description: "Récompense"
      },
      {
        type: "trophy",
        description: "Maîtrise des Relations Saines"
      }
    ]
  },
  {
    unitNumber: 5,
    description: "Vitalité & Énergie",
    backgroundColor: "bg-[#FF5252]",
    borderColor: "border-[#E53535]",
    textColor: "text-[#FF5252]",
    tiles: [
      {
        type: "book",
        description: "Gérer son énergie",
        badgeId: "energique"
      },
      {
        type: "dumbbell",
        description: "Habitudes de vitalité",
        badgeId: "vitalite"
      },
      {
        type: "book",
        description: "Équilibre corps-esprit",
        badgeId: "equilibre_global"
      },
      {
        type: "treasure",
        description: "Récompense"
      },
      {
        type: "trophy",
        description: "Maîtrise de la Vitalité"
      }
    ]
  }
];