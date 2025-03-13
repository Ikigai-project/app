import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { GoalXpSlice } from "~/stores/createGoalXpStore";
import { createGoalXpSlice } from "~/stores/createGoalXpStore";
import type { LanguageSlice } from "~/stores/createLanguageStore";
import { createLanguageSlice } from "~/stores/createLanguageStore";
import type { LessonSlice } from "~/stores/createLessonStore";
import { createLessonSlice } from "~/stores/createLessonStore";
import type { LingotSlice } from "~/stores/createLingotStore";
import { createLingotSlice } from "~/stores/createLingotStore";
import type { SoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import { createSoundSettingsSlice } from "~/stores/createSoundSettingsStore";
import type { StreakSlice } from "~/stores/createStreakStore";
import { createStreakSlice } from "~/stores/createStreakStore";
import type { UserSlice } from "~/stores/createUserStore";
import { createUserSlice } from "~/stores/createUserStore";
import type { XpSlice } from "~/stores/createXpStore";
import { createXpSlice } from "~/stores/createXpStore";

// IKIGAI/QVCT imports
import type { WellnessSlice } from "~/stores/createWellnessStore";
import { createWellnessSlice } from "~/stores/createWellnessStore";
import type { ModuleSlice } from "~/stores/createModuleStore";
import { createModuleSlice } from "~/stores/createModuleStore";
import type { BadgeSlice } from "~/stores/createBadgeStore";
import { createBadgeSlice } from "~/stores/createBadgeStore";
import type { ChallengeSlice } from "~/stores/createChallengeStore";
import { createChallengeSlice } from "~/stores/createChallengeStore";
import type { IslandSlice } from "~/stores/createIslandStore";
import { createIslandSlice } from "~/stores/createIslandStore";

// Type pour la langue IKIGAI
export type IkigaiLanguage = {
  id: string;
  name: string;
  flag: string; // emoji ou code
};

// Langue française par défaut pour IKIGAI
export const frenchLanguage: IkigaiLanguage = {
  id: 'fr',
  name: 'Français',
  flag: '🧠' // Emoji cerveau pour IKIGAI
};

type BoundState = GoalXpSlice &
  LanguageSlice &
  LessonSlice &
  LingotSlice &
  SoundSettingsSlice &
  StreakSlice &
  UserSlice &
  XpSlice &
  WellnessSlice &
  ModuleSlice &
  BadgeSlice &
  ChallengeSlice &
  IslandSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((set, get) => ({
  ...createGoalXpSlice(set, get, {}), // Added empty object as third argument
  ...createLanguageSlice(set, get, {}), // Added empty object as third argument
  ...createLessonSlice(set, get, {}), // Added empty object as third argument
  ...createLingotSlice(set, get, {}), // Added empty object as third argument
  ...createSoundSettingsSlice(set, get, {}), // Added empty object as third argument
  ...createStreakSlice(set, get, {}), // Added empty object as third argument
  ...createUserSlice(set, get, {}), // Added empty object as third argument
  ...createXpSlice(set, get, {}), // Added empty object as third argument
  ...createWellnessSlice(set, get, {}), // Added empty object as third argument
  ...createModuleSlice(set, get, {}), // Added empty object as third argument
  ...createBadgeSlice(set, get, {}), // Added empty object as third argument
  ...createChallengeSlice(set, get, {}), // Added empty object as third argument
  ...createIslandSlice(set, get, {}), // Added empty object as third argument
}));