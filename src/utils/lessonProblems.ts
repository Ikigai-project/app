// Contient les questions et exercices IKIGAI
// Modules et chapitres pour le parcours IKIGAI et bien-être au travail
import type { QuestionType } from "./types";

export type Problem = {
  type: QuestionType;
  question: string;
  answers?: {icon: JSX.Element | string; name: string}[];
  correctAnswer: number | number[];
  answerTiles?: string[];
  options?: {value: string | number; label: string}[];
  minValue?: number;
  maxValue?: number;
  required?: boolean;
};

export type ModuleQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  options?: {id: string; label: string}[];
  correctAnswer?: string | string[];
  minValue?: number;
  maxValue?: number;
  labels?: string[];
  required?: boolean;
  placeholder?: string;
  maxSelect?: number;
};

// ========== MODULE 1: DÉCOUVRIR SON IKIGAI ==========

// Chapitre 1: Ce que j'aime (Passions)
export const ikigaiPassionsQuestions: ModuleQuestion[] = [
  {
    id: 'ikigai_passions_q1',
    type: 'CHECKBOX',
    question: 'Parmi ces activités, lesquelles vous procurent une réelle satisfaction ? (Plusieurs réponses possibles)',
    options: [
      { id: 'creative', label: 'Activités créatives (art, musique, écriture...)' },
      { id: 'intellectual', label: 'Activités intellectuelles (lecture, débats, recherche...)' },
      { id: 'physical', label: 'Activités physiques (sports, danse, yoga...)' },
      { id: 'social', label: 'Activités sociales (rencontrer des gens, aider les autres...)' },
      { id: 'nature', label: 'Activités en plein air (randonnée, jardinage...)' },
      { id: 'tech', label: 'Activités techniques (programmation, bricolage...)' }
    ],
    required: true,
    maxSelect: 3
  },
  {
    id: 'ikigai_passions_q2',
    type: 'TEXT',
    question: 'Quelle activité vous fait perdre la notion du temps lorsque vous la pratiquez ?',
    placeholder: 'Décrivez une activité qui vous absorbe complètement',
    required: true
  },
  {
    id: 'ikigai_passions_q3',
    type: 'MULTIPLE_CHOICE',
    question: 'Si vous aviez une journée entière libre, sans contraintes, que feriez-vous ?',
    options: [
      { id: 'learning', label: 'Apprendre quelque chose de nouveau' },
      { id: 'creating', label: 'Créer quelque chose' },
      { id: 'travelling', label: 'Explorer un nouvel endroit' },
      { id: 'connecting', label: 'Passer du temps avec des proches' },
      { id: 'relaxing', label: 'Prendre soin de vous et vous détendre' },
      { id: 'helping', label: 'Aider les autres' }
    ],
    required: true
  },
  {
    id: 'ikigai_passions_q4',
    type: 'TEXT',
    question: 'Quels sujets ou activités vous passionnent depuis l\'enfance ou l\'adolescence ?',
    placeholder: 'Ex: j\'ai toujours aimé observer les étoiles...',
    required: true
  }
];

// Chapitre 2: Mes talents (Ce en quoi je suis doué)
export const ikigaiTalentsQuestions: ModuleQuestion[] = [
  {
    id: 'ikigai_talents_q1',
    type: 'CHECKBOX',
    question: 'Quelles compétences vous semblent naturelles ou faciles à exercer ? (Plusieurs réponses possibles)',
    options: [
      { id: 'communication', label: 'Communication et expression' },
      { id: 'analysis', label: 'Analyse et résolution de problèmes' },
      { id: 'creativity', label: 'Créativité et innovation' },
      { id: 'organization', label: 'Organisation et planification' },
      { id: 'empathy', label: 'Empathie et écoute' },
      { id: 'technical', label: 'Compétences techniques spécifiques' },
      { id: 'leadership', label: 'Leadership et inspiration' }
    ],
    required: true,
    maxSelect: 3
  },
  {
    id: 'ikigai_talents_q2',
    type: 'TEXT',
    question: 'Pour quoi recevez-vous régulièrement des compliments ou de la reconnaissance ?',
    placeholder: 'Ex: On me dit souvent que je suis doué(e) pour...',
    required: true
  },
  {
    id: 'ikigai_talents_q3',
    type: 'RATING',
    question: 'À quel point utilisez-vous vos talents naturels dans votre vie quotidienne ?',
    minValue: 1,
    maxValue: 5,
    labels: ['Très peu', 'Peu', 'Moyennement', 'Beaucoup', 'Presque tout le temps'],
    required: true
  },
  {
    id: 'ikigai_talents_q4',
    type: 'TEXT',
    question: 'Quelle compétence aimeriez-vous développer davantage pour enrichir vos talents ?',
    placeholder: 'Ex: J\'aimerais approfondir ma capacité à...',
    required: true
  }
];

// Chapitre 3: Ce dont le Monde a besoin (Mission)
export const ikigaiMissionQuestions: ModuleQuestion[] = [
  {
    id: 'ikigai_mission_q1',
    type: 'MULTIPLE_CHOICE',
    question: 'Quel enjeu de société vous touche le plus personnellement ?',
    options: [
      { id: 'environment', label: 'Environnement et développement durable' },
      { id: 'education', label: 'Éducation et partage de connaissances' },
      { id: 'health', label: 'Santé et bien-être' },
      { id: 'equality', label: 'Égalité et justice sociale' },
      { id: 'tech', label: 'Technologie et innovation' },
      { id: 'community', label: 'Cohésion sociale et communauté' }
    ],
    required: true
  },
  {
    id: 'ikigai_mission_q2',
    type: 'TEXT',
    question: 'Comment aimeriez-vous contribuer positivement à la société ou à votre communauté ?',
    placeholder: 'Ex: J\'aimerais aider les autres à...',
    required: true
  },
  {
    id: 'ikigai_mission_q3',
    type: 'CHECKBOX',
    question: 'Quelles valeurs sont les plus importantes pour vous ? (Sélectionnez-en 3 maximum)',
    options: [
      { id: 'authenticity', label: 'Authenticité' },
      { id: 'compassion', label: 'Compassion' },
      { id: 'courage', label: 'Courage' },
      { id: 'creativity', label: 'Créativité' },
      { id: 'freedom', label: 'Liberté' },
      { id: 'growth', label: 'Croissance' },
      { id: 'honesty', label: 'Honnêteté' },
      { id: 'justice', label: 'Justice' },
      { id: 'respect', label: 'Respect' }
    ],
    required: true,
    maxSelect: 3
  },
  {
    id: 'ikigai_mission_q4',
    type: 'TEXT',
    question: 'Quelle phrase résumerait la mission ou l\'impact que vous aimeriez avoir dans le monde ?',
    placeholder: 'Ex: Je veux contribuer à un monde où...',
    required: true
  }
];

// Chapitre 4: Ce pour quoi je peux être payé(e) (Profession)
export const ikigaiProfessionQuestions: ModuleQuestion[] = [
  {
    id: 'ikigai_profession_q1',
    type: 'CHECKBOX',
    question: 'Quels secteurs professionnels vous intéressent le plus ? (Plusieurs réponses possibles)',
    options: [
      { id: 'art', label: 'Arts, culture et médias' },
      { id: 'science', label: 'Sciences et recherche' },
      { id: 'education', label: 'Éducation et formation' },
      { id: 'health', label: 'Santé et bien-être' },
      { id: 'business', label: 'Business et entrepreneuriat' },
      { id: 'tech', label: 'Technologie et innovation' },
      { id: 'environment', label: 'Environnement et développement durable' },
      { id: 'social', label: 'Action sociale et communautaire' }
    ],
    required: true,
    maxSelect: 3
  },
  {
    id: 'ikigai_profession_q2',
    type: 'MULTIPLE_CHOICE',
    question: 'Quel mode de travail vous correspond le mieux ?',
    options: [
      { id: 'employee', label: 'Employé dans une organisation' },
      { id: 'freelance', label: 'Indépendant/Freelance' },
      { id: 'entrepreneur', label: 'Entrepreneur/Créateur d\'entreprise' },
      { id: 'mix', label: 'Un mélange de plusieurs modes' },
      { id: 'unsure', label: 'Je ne suis pas encore sûr(e)' }
    ],
    required: true
  },
  {
    id: 'ikigai_profession_q3',
    type: 'TEXT',
    question: 'Quelle compétence ou expertise pourriez-vous offrir qui a de la valeur pour les autres ?',
    placeholder: 'Ex: Je pourrais aider les gens à...',
    required: true
  },
  {
    id: 'ikigai_profession_q4',
    type: 'TEXT',
    question: 'Imaginez votre activité professionnelle idéale dans 5 ans. À quoi ressemblerait-elle ?',
    placeholder: 'Décrivez votre vision professionnelle idéale',
    required: true
  }
];

// ========== MODULE 2: ÉQUILIBRE VIE PRO-PERSO ==========

// Chapitre 1: Comprendre son équilibre
export const equilibreModule1Questions: ModuleQuestion[] = [
  {
    id: 'equilibre_module1_q1',
    type: 'RATING',
    question: 'Comment évaluez-vous votre équilibre actuel entre vie professionnelle et personnelle ?',
    minValue: 1,
    maxValue: 5,
    labels: ['Très déséquilibré', 'Plutôt déséquilibré', 'Neutre', 'Plutôt équilibré', 'Très équilibré'],
    required: true
  },
  {
    id: 'equilibre_module1_q2',
    type: 'MULTIPLE_CHOICE',
    question: 'Combien d\'heures travaillez-vous en moyenne par semaine ?',
    options: [
      { id: 'less_35', label: 'Moins de 35 heures' },
      { id: '35_40', label: '35 à 40 heures' },
      { id: '40_45', label: '40 à 45 heures' },
      { id: '45_50', label: '45 à 50 heures' },
      { id: 'more_50', label: 'Plus de 50 heures' }
    ],
    required: true
  },
  {
    id: 'equilibre_module1_q3',
    type: 'CHECKBOX',
    question: 'Quels signes de déséquilibre ressentez-vous actuellement ? (Plusieurs réponses possibles)',
    options: [
      { id: 'fatigue', label: 'Fatigue persistante' },
      { id: 'deconnexion', label: 'Difficulté à déconnecter du travail' },
      { id: 'depasse', label: 'Sentiment d\'être dépassé(e)' },
      { id: 'reduction', label: 'Réduction du temps pour les loisirs et relations' },
      { id: 'stress', label: 'Stress chronique' },
      { id: 'sommeil', label: 'Troubles du sommeil' },
      { id: 'aucun', label: 'Aucun signe particulier' }
    ],
    required: true
  },
  {
    id: 'equilibre_module1_q4',
    type: 'TEXT',
    question: 'Quelle action concrète pourriez-vous mettre en place dès cette semaine pour améliorer votre équilibre ?',
    placeholder: 'Par exemple : bloquer 30 minutes par jour pour une activité personnelle',
    required: true
  }
];

// Module 2: Gérer son temps efficacement
export const equilibreModule2Questions: ModuleQuestion[] = [
  {
    id: 'equilibre_module2_q1',
    type: 'MULTIPLE_CHOICE',
    question: 'Quelle technique de gestion du temps vous semble la plus adaptée à votre situation ?',
    options: [
      { id: 'pomodoro', label: 'La technique Pomodoro (25 min de travail, 5 min de pause)' },
      { id: 'eisenhower', label: 'La matrice d\'Eisenhower (Urgent/Important)' },
      { id: 'timeblocking', label: 'Le time-blocking (bloquer des plages horaires dédiées)' },
      { id: 'rule2min', label: 'La règle des 2 minutes' },
      { id: 'other', label: 'Une autre technique' }
    ],
    required: true
  },
  {
    id: 'equilibre_module2_q2',
    type: 'RATING',
    question: 'À quel point arrivez-vous à établir des frontières claires entre votre vie professionnelle et personnelle ?',
    minValue: 1,
    maxValue: 5,
    labels: ['Pas du tout', 'Difficilement', 'Moyennement', 'Plutôt bien', 'Très bien'],
    required: true
  },
  {
    id: 'equilibre_module2_q3',
    type: 'CHECKBOX',
    question: 'Quelles frontières saines allez-vous mettre en place ? (Plusieurs réponses possibles)',
    options: [
      { id: 'horaires', label: 'Définir des heures précises de début et fin de travail' },
      { id: 'espace', label: 'Créer un espace de travail séparé' },
      { id: 'rituel', label: 'Établir un rituel de transition entre travail et vie perso' },
      { id: 'notif', label: 'Désactiver les notifications professionnelles hors travail' },
      { id: 'pause', label: 'Planifier des pauses régulières' },
      { id: 'agenda', label: 'Bloquer du temps dans l\'agenda pour la vie personnelle' }
    ],
    required: true
  },
  {
    id: 'equilibre_module2_q4',
    type: 'TEXT',
    question: 'Décrivez votre planning idéal pour une journée équilibrée',
    placeholder: 'Par exemple : 8h-9h: préparation, 9h-12h: travail concentré...',
    required: true
  }
];

// Contenu pour les démonstrations de leçons IKIGAI

// Leçon 1: Ce que j'aime (Passions)
export const ikigaiPassionProblem1 = {
  type: "SELECT_1_OF_3",
  question: `Qu'est-ce que l'IKIGAI ?`,
  answers: [
    { icon: "🧠", name: "Un concept japonais désignant sa raison d'être" },
    { icon: "📱", name: "Une technique de méditation" },
    { icon: "🏃", name: "Un programme d'exercice physique" },
  ],
  correctAnswer: 0,
} as const;

export const ikigaiPassionProblem2 = {
  type: "TEXT",
  question: "Complétez cette phrase sur la passion :",
  answerTiles: ["La", "passion", "est", "ce", "qui", "vous", "fait", "vibrer"],
  correctAnswer: [0, 1, 2, 3, 4, 5, 6, 7],
} as const;

// Leçon 2: Mes talents
export const ikigaiTalentProblem1 = {
  type: "SELECT_1_OF_3",
  question: `Qu'est-ce qui caractérise un talent naturel ?`,
  answers: [
    { icon: "🎯", name: "Une aptitude qui vous semble facile et naturelle" },
    { icon: "📚", name: "Quelque chose que vous avez étudié pendant des années" },
    { icon: "💼", name: "Ce pour quoi vous êtes payé actuellement" },
  ],
  correctAnswer: 0,
} as const;

export const ikigaiTalentProblem2 = {
  type: "TEXT",
  question: "Complétez cette phrase sur les talents :",
  answerTiles: ["Vos", "talents", "sont", "vos", "points", "forts", "naturels"],
  correctAnswer: [0, 1, 2, 3, 4, 5, 6],
} as const;

// Leçon 3: Ce dont le Monde a besoin
export const ikigaiMissionProblem1 = {
  type: "SELECT_1_OF_3",
  question: `Qu'est-ce qui définit votre mission ?`,
  answers: [
    { icon: "🌍", name: "La façon dont vous contribuez positivement au monde" },
    { icon: "💰", name: "L'argent que vous gagnez" },
    { icon: "🏆", name: "La reconnaissance que vous recevez" },
  ],
  correctAnswer: 0,
} as const;

export const ikigaiMissionProblem2 = {
  type: "TEXT",
  question: "Complétez cette phrase sur la mission :",
  answerTiles: ["Votre", "mission", "est", "liée", "aux", "besoins", "du", "monde"],
  correctAnswer: [0, 1, 2, 3, 4, 5, 6, 7],
} as const;

// Leçon 4: Ce pour quoi je peux être payé
export const ikigaiProfessionProblem1 = {
  type: "SELECT_1_OF_3",
  question: `Qu'est-ce qui rend une compétence professionnelle précieuse ?`,
  answers: [
    { icon: "💎", name: "Elle répond à un besoin que les autres sont prêts à rémunérer" },
    { icon: "🎨", name: "Elle est unique et personne d'autre ne la possède" },
    { icon: "📊", name: "Elle est difficile à maîtriser" },
  ],
  correctAnswer: 0,
} as const;

export const ikigaiProfessionProblem2 = {
  type: "TEXT",
  question: "Complétez cette phrase sur la profession :",
  answerTiles: ["Votre", "profession", "idéale", "vous", "apporte", "une", "rémunération", "équitable"],
  correctAnswer: [0, 1, 2, 3, 4, 5, 6, 7],
} as const;

// Ensemble de problèmes pour les leçons IKIGAI
export const ikigaiProblems = [
  ikigaiPassionProblem1, ikigaiPassionProblem2,
  ikigaiTalentProblem1, ikigaiTalentProblem2,
  ikigaiMissionProblem1, ikigaiMissionProblem2,
  ikigaiProfessionProblem1, ikigaiProfessionProblem2
];

// Pour la compatibilité avec le système existant
export const lessonProblems = ikigaiProblems;
