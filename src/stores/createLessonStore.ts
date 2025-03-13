import { units } from "~/utils/units";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LessonSlice = {
  lessonsCompleted: number;
  increaseLessonsCompleted: (by?: number) => void;
  jumpToUnit: (unitNumber: number) => void;
  isUnitCompleted: (unitNumber: number) => boolean;
};

export const createLessonSlice: BoundStateCreator<LessonSlice> = (set, get) => ({
  lessonsCompleted: 0,
  increaseLessonsCompleted: (by = 1) =>
    set(({ lessonsCompleted }) => ({
      lessonsCompleted: lessonsCompleted + by,
    })),
  jumpToUnit: (unitNumber: number) =>
    set(({ lessonsCompleted }) => {
      const lessonsPerTile = 4;
      const totalLessonsToJumpToUnit = units
        .filter((unit) => unit.unitNumber < unitNumber)
        .map((unit) => unit.tiles.length * lessonsPerTile)
        .reduce((a, b) => a + b, 0);
      return {
        lessonsCompleted: Math.max(lessonsCompleted, totalLessonsToJumpToUnit),
      };
    }),
  isUnitCompleted: (unitNumber: number) => {
    const lessonsCompleted = get().lessonsCompleted;
    const unit = units.find(u => u.unitNumber === unitNumber);
    
    if (!unit) return false;
    
    // Calculer le nombre total de leçons avant cette unité
    const lessonsBeforeThisUnit = units
      .filter(u => u.unitNumber < unitNumber)
      .map(u => u.tiles.length * 4)
      .reduce((a, b) => a + b, 0);
    
    // Calculer le nombre total de leçons dans cette unité
    const lessonsInThisUnit = unit.tiles.length * 4;
    
    // L'unité est complétée si toutes ses leçons sont terminées
    return lessonsCompleted >= lessonsBeforeThisUnit + lessonsInThisUnit;
  },
});