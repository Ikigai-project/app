import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import Head from "next/head";

// SVG Components
import {
  CloseSvg,
  DoneSvg,
  BigCloseSvg,
  LessonTopBarHeart,
  LessonTopBarEmptyHeart,
} from "~/components/Svgs";

// Les problèmes des leçons IKIGAI
const ikigaiProblems = [
  {
    type: "SELECT_1_OF_3",
    question: "Selon la philosophie de l'IKIGAI, que représente le premier cercle?",
    answers: [
      { icon: "💖", name: "Ce que vous aimez" },
      { icon: "💰", name: "Ce pour quoi on peut vous payer" },
      { icon: "🌍", name: "Ce dont le monde a besoin" },
    ],
    correctAnswer: 0,
  },
  {
    type: "TEXT_INPUT",
    question: "Qu'est-ce qui vous fait ressentir de la joie ou du bien-être quand vous le faites ?",
    placeholder: "Décrivez ce qui vous procure un sentiment de satisfaction...",
    isPersonalQuestion: true,
  },
  {
    type: "SELECT_MULTIPLE",
    question: "Sélectionnez les activités qui vous passionnent :",
    answers: [
      { icon: "📚", name: "Lecture" },
      { icon: "🎵", name: "Musique" },
      { icon: "🏃", name: "Sport" },
      { icon: "✏️", name: "Écriture" },
      { icon: "🎨", name: "Art" },
      { icon: "🌱", name: "Nature" },
    ],
    isPersonalQuestion: true,
  }
];

// Problèmes pour le module de pleine conscience
const mindfullnessProblems = [
  {
    type: "SELECT_1_OF_3",
    question: "Quelle est la définition la plus précise de la pleine conscience ?",
    answers: [
      { icon: "🧠", name: "Porter attention au moment présent sans jugement" },
      { icon: "🎯", name: "Ne pas avoir de pensées" },
      { icon: "💭", name: "Penser au futur positivement" },
    ],
    correctAnswer: 0,
  },
  {
    type: "SELECT_MULTIPLE",
    question: "Quelles pratiques contribuent à développer la pleine conscience ?",
    answers: [
      { icon: "🧘", name: "Méditation" },
      { icon: "🚶", name: "Marche attentive" },
      { icon: "🍽️", name: "Manger en conscience" },
      { icon: "📱", name: "Réseaux sociaux" },
    ],
    correctAnswer: [0, 1, 2],
  }
];

function numbersEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((a, b) => a - b);
  const sortedB = [...b].sort((a, b) => a - b);
  return sortedA.every((val, i) => val === sortedB[i]);
}

export default function Lesson() {
  const router = useRouter();
  const increaseLessonsCompleted = useBoundStore((x) => x.increaseLessonsCompleted);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [textInputValue, setTextInputValue] = useState("");

  // Récupération du numéro de tuile depuis l'URL
  const tileNumber = (() => {
    if (typeof router.query.tile === "string") {
      const tile = Number(router.query.tile);
      if (!isNaN(tile)) return tile;
    }
    return 1;
  })();

  // Déterminer quel module utiliser en fonction du numéro de tuile
  const moduleNumber = Math.ceil(tileNumber / 5); // Supposer 5 leçons par module
  
  // Sélection des problèmes appropriés
  const problems = moduleNumber === 1 ? ikigaiProblems : mindfullnessProblems;
  
  const [lessonProblem, setLessonProblem] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  // Si nous sommes à la fin des problèmes
  const allProblemsCompleted = lessonProblem >= problems.length;

  // Problème actuel
  const problem = problems[lessonProblem];
  
  // Vérifier si la réponse actuelle est correcte
  const checkIsAnswerCorrect = () => {
    if (!problem) return false;
    
    if ('isPersonalQuestion' in problem && problem.isPersonalQuestion) {
      // Les questions personnelles sont toujours considérées comme correctes
      return true;
    }
    
    if (problem.type === "SELECT_1_OF_3") {
      return selectedAnswer === problem.correctAnswer;
    } else if (problem.type === "SELECT_MULTIPLE" && 'correctAnswer' in problem) {
      return numbersEqual(selectedAnswers, problem.correctAnswer);
    } else if (problem.type === "TEXT_INPUT") {
      return textInputValue.trim().length > 0;
    }
    
    return false;
  };
  
  // Vérifier si une réponse a été sélectionnée
  const hasAnswerSelected = () => {
    if (!problem) return false;
    
    if (problem.type === "SELECT_1_OF_3") {
      return selectedAnswer !== null;
    } else if (problem.type === "SELECT_MULTIPLE") {
      return selectedAnswers.length > 0;
    } else if (problem.type === "TEXT_INPUT") {
      return textInputValue.trim().length > 0;
    }
    
    return false;
  };

  const resetAnswers = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setTextInputValue("");
  };

  // Gérer la vérification de la réponse
  const handleCheckAnswer = () => {
    if (isAnswerSubmitted) {
      // Passer à la question suivante
      if (lessonProblem + 1 < problems.length) {
        setLessonProblem(lessonProblem + 1);
        setIsAnswerSubmitted(false);
        resetAnswers();
      } else {
        // Fin de la leçon
        increaseLessonsCompleted();
        setIsLessonCompleted(true);
      }
    } else {
      // Vérifier la réponse
      const correct = checkIsAnswerCorrect();
      setIsAnswerCorrect(correct);
      setIsAnswerSubmitted(true);
    }
  };

  // Quitter la leçon
  const quitLesson = () => {
    router.push('/learn');
  };

  // Affichage de l'écran de démarrage
  if (isStartingLesson) {
    return (
      <div className="bg-gradient-to-b from-white to-[#f7f7f7] min-h-screen">
        <Head>
          <title>Leçon IKIGAI</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <div className="fixed left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between bg-[#58cc02] px-4 font-bold text-white shadow-md">
          <button onClick={quitLesson} className="flex items-center hover:opacity-80 transition">
            <CloseSvg />
            <span className="sr-only">Fermer</span>
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 transform text-lg sm:text-xl">
            {moduleNumber === 1 ? "IKIGAI" : "Pleine Conscience"}
          </div>
        </div>
        
        {/* Conteneur principal avec fond décoratif */}
        <div className="flex flex-col items-center justify-center pt-[58px] p-4 sm:p-6 min-h-screen relative">
          {/* Fond décoratif */}
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
            <img src="/bg-pattern.svg" alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="max-w-md mx-auto text-center bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#4b4b4b]">
              {moduleNumber === 1 ? "Découvrir son IKIGAI" : "Module Pleine Conscience"}
            </h1>
            <p className="text-gray-700 mb-8 text-base sm:text-lg">
              {moduleNumber === 1 
                ? "Dans ce module, vous allez explorer vos passions et ce qui vous apporte de la joie." 
                : "Ce module vous aidera à pratiquer la pleine conscience dans votre quotidien."}
            </p>
            
            {/* Illustration avec animation */}
            <div className="mb-10 flex justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#58cc02] to-[#76e322] 
                   flex items-center justify-center text-white text-5xl sm:text-6xl
                   shadow-lg transform transition-all duration-500 hover:scale-105">
                {moduleNumber === 1 ? "🔍" : "🧘"}
              </div>
            </div>
            
            {/* Badge XP */}
            <div className="mb-6 flex justify-center">
              <div className="bg-[#fff4db] text-[#ff9600] px-4 py-2 rounded-full font-bold text-sm sm:text-base">
                + 5 XP par leçon terminée
              </div>
            </div>
            
            {/* Bouton commencer avec animation */}
            <button 
              className="w-full rounded-2xl bg-[#58cc02] py-3 sm:py-4 px-6 font-bold uppercase text-lg text-white
                       shadow-md transition-all duration-300 hover:bg-[#61e002] hover:shadow-lg transform hover:-translate-y-1"
              onClick={() => setIsStartingLesson(false)}
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Affichage de l'écran de fin avec animation et style moderne
  if (isLessonCompleted) {
    return (
      <div className="bg-gradient-to-b from-[#f7ffef] to-[#e8ffce] min-h-screen">
        <Head>
          <title>Leçon terminée</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        </Head>
        <div className="fixed left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between bg-gradient-to-r from-[#58cc02] to-[#65d40d] px-4 font-bold text-white shadow-md">
          <div className="absolute left-1/2 -translate-x-1/2 transform text-lg sm:text-xl">
            Leçon terminée
          </div>
        </div>
        
        {/* Conteneur principal avec fond décoratif */}
        <div className="flex flex-col items-center justify-center pt-[58px] p-4 sm:p-6 min-h-screen relative">
          {/* Fond décoratif avec confettis */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img src="/bg-pattern.svg" alt="" className="w-full h-full object-cover" />
            </div>
            {/* Éléments décoratifs supplémentaires pourraient être ajoutés ici */}
          </div>
          
          <div className="max-w-md mx-auto text-center bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative z-10">
            {/* Badge XP */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#ff9600] text-white px-4 py-2 rounded-full font-bold text-lg shadow-md">
              +5 XP
            </div>
            
            {/* Icône de succès avec animation */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#58cc02] to-[#76e322] 
                   flex items-center justify-center text-white text-6xl sm:text-7xl
                   shadow-lg transform transition-all duration-500 hover:scale-105 animate-pulse">
                ✓
              </div>
            </div>
            
            {/* Message de félicitations */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-[#4b4b4b]">Félicitations !</h1>
            <p className="text-gray-700 mb-4 text-base sm:text-lg">
              Vous avez terminé cette leçon avec succès.
            </p>
            
            {/* Prochaines étapes */}
            <div className="mb-8 p-4 rounded-xl bg-[#f7ffef] border border-[#d7ffb8]">
              <h2 className="font-bold text-[#58cc02] mb-2">Réflexions pour aller plus loin</h2>
              <p className="text-sm sm:text-base text-gray-700">
                Continuez votre parcours pour découvrir davantage sur votre IKIGAI et comment l'appliquer dans votre vie quotidienne.
              </p>
            </div>
            
            {/* Streaks */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center bg-[#fff4db] px-4 py-2 rounded-lg">
                <span className="text-[#ff9600] mr-2">🔥</span>
                <span className="text-[#ff9600] font-bold">Série maintenue !</span>
              </div>
            </div>
            
            {/* Bouton continuer avec animation */}
            <button 
              className="w-full rounded-2xl bg-[#58cc02] py-3 sm:py-4 px-6 font-bold uppercase text-lg text-white
                       shadow-md transition-all duration-300 hover:bg-[#61e002] hover:shadow-lg transform hover:-translate-y-1"
              onClick={quitLesson}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Affichage de la leçon
  return (
    <div className="bg-gradient-to-b from-white to-[#f7f7f7] min-h-screen">
      <Head>
        <title>Leçon IKIGAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <div className="fixed left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between bg-gradient-to-r from-[#58cc02] to-[#65d40d] px-4 font-bold text-white shadow-md">
        <button onClick={quitLesson} className="flex items-center hover:opacity-80 transition">
          <CloseSvg />
          <span className="sr-only">Fermer</span>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Progress 
            currentStep={lessonProblem} 
            totalSteps={problems.length} 
          />
        </div>
      </div>
      
      <div className="pt-[58px] pb-28 sm:pb-32 relative">
        {/* Fond décoratif */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <img src="/bg-pattern.svg" alt="" className="w-full h-full object-cover" />
        </div>
        
        {problem && (
          <div className="max-w-xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Indicateur de progression */}
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm font-bold text-gray-500">
                Question {lessonProblem + 1}/{problems.length}
              </div>
              <div className="flex items-center gap-2">
                {Array.from({length: Math.min(3, problems.length)}).map((_, i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${
                    i <= lessonProblem % 3 ? 'bg-[#58cc02]' : 'bg-gray-200'
                  }`}></div>
                ))}
              </div>
            </div>
            
            {/* Carte de contenu principale */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 mb-6 transform transition-all duration-300 hover:shadow-lg">
              {problem.type === "SELECT_1_OF_3" && (
                <Select1Of3Problem 
                  problem={problem}
                  selectedAnswer={selectedAnswer} 
                  setSelectedAnswer={setSelectedAnswer} 
                  isSubmitted={isAnswerSubmitted} 
                  isCorrect={isAnswerCorrect} 
                />
              )}
              
              {problem.type === "SELECT_MULTIPLE" && (
                <SelectMultipleProblem 
                  problem={problem}
                  selectedAnswers={selectedAnswers} 
                  setSelectedAnswers={setSelectedAnswers} 
                  isSubmitted={isAnswerSubmitted} 
                  isCorrect={isAnswerCorrect} 
                />
              )}
              
              {problem.type === "TEXT_INPUT" && (
                <TextInputProblem 
                  problem={problem}
                  textValue={textInputValue} 
                  setTextValue={setTextInputValue} 
                  isSubmitted={isAnswerSubmitted} 
                  isCorrect={isAnswerCorrect} 
                />
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Barre de boutons en bas avec animation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:p-6 shadow-lg">
        <div className="max-w-xl mx-auto">
          {isAnswerSubmitted && (
            <div 
              className={`mb-4 p-4 rounded-xl ${isAnswerCorrect ? 'bg-[#d7ffb8]' : 'bg-[#ffdfe0]'}
                         animate-fadeIn transform transition-all duration-300`}
            >
              <div className="flex">
                <div className="mr-4">
                  {isAnswerCorrect ? <DoneSvg className="h-6 w-6 sm:h-8 sm:w-8" /> : <BigCloseSvg className="h-6 w-6 sm:h-8 sm:w-8" />}
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg">
                    {isAnswerCorrect ? 'Excellent !' : 'Incorrect'}
                  </div>
                  {!isAnswerCorrect && problem.type === "SELECT_1_OF_3" && 'correctAnswer' in problem && (
                    <div className="text-sm sm:text-base">
                      La bonne réponse est : {problem.answers[problem.correctAnswer].name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <button
            disabled={!isAnswerSubmitted && !hasAnswerSelected()}
            className={`w-full py-3 sm:py-4 rounded-2xl font-bold uppercase text-base sm:text-lg
                       transform transition-all duration-300 ${
              !isAnswerSubmitted && !hasAnswerSelected()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : isAnswerSubmitted
                ? 'bg-[#58cc02] text-white hover:bg-[#61e002] hover:shadow-lg hover:-translate-y-1'
                : 'bg-[#58cc02] text-white hover:bg-[#61e002] hover:shadow-lg hover:-translate-y-1'
            }`}
            onClick={handleCheckAnswer}
          >
            {isAnswerSubmitted ? 'Continuer' : 'Vérifier'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Barre de progression
function Progress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-[10px] w-[10px] rounded-full transition-all ${
            i <= currentStep ? 'bg-white' : 'bg-white/40'
          }`}
        />
      ))}
    </div>
  );
}

// Problème à choix unique
function Select1Of3Problem({ 
  problem, 
  selectedAnswer, 
  setSelectedAnswer, 
  isSubmitted, 
  isCorrect 
}: { 
  problem: any;
  selectedAnswer: number | null;
  setSelectedAnswer: (index: number | null) => void;
  isSubmitted: boolean;
  isCorrect: boolean;
}) {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-[#4b4b4b]">{problem.question}</h1>
      <div className="flex flex-col gap-3 md:gap-4">
        {problem.answers.map((answer: any, index: number) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = isSubmitted && index === problem.correctAnswer;
          const isWrongSelection = isSubmitted && isSelected && index !== problem.correctAnswer;
          
          return (
            <button
              key={index}
              className={`flex items-center justify-between p-4 sm:p-5 border-2 rounded-xl shadow-sm
                transform transition-all duration-300 ${
                isSelected && !isSubmitted
                  ? 'border-[#84d8ff] bg-[#ddf4ff] scale-[1.02]'
                  : isCorrectAnswer
                  ? 'border-[#a5ed6e] bg-[#d7ffb8] scale-[1.02]'
                  : isWrongSelection
                  ? 'border-[#ff9090] bg-[#ffdfe0]'
                  : 'border-gray-200 hover:border-[#84d8ff] hover:shadow-md'
              }`}
              onClick={() => !isSubmitted && setSelectedAnswer(index)}
              disabled={isSubmitted}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg 
                  border-2 text-2xl sm:text-3xl shadow-sm ${
                  isSelected && !isSubmitted
                    ? 'border-[#84d8ff] bg-white'
                    : isCorrectAnswer
                    ? 'border-[#a5ed6e] bg-white'
                    : isWrongSelection
                    ? 'border-[#ff9090] bg-white'
                    : 'border-gray-200 bg-white'
                }`}>
                  {answer.icon}
                </div>
                <span className="font-bold text-base sm:text-lg text-left">{answer.name}</span>
              </div>
              
              <div className={`h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center rounded-full border-2 
                transition-all duration-300 ${
                isSelected && !isSubmitted
                  ? 'border-[#84d8ff] scale-110'
                  : isCorrectAnswer
                  ? 'border-[#a5ed6e] scale-110'
                  : isWrongSelection
                  ? 'border-[#ff9090] scale-110'
                  : 'border-gray-200'
              }`}>
                {isSelected && !isSubmitted && (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#84d8ff]" />
                )}
                {isCorrectAnswer && (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#a5ed6e]" />
                )}
                {isWrongSelection && (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#ff9090]" />
                )}
              </div>
              
              {/* Badge correct/incorrect pour accessibilité */}
              {isCorrectAnswer && (
                <div className="absolute right-0 -top-2 bg-[#58cc02] text-white text-xs font-bold rounded-full py-1 px-2 shadow-md">
                  Correct
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Problème à choix multiples
function SelectMultipleProblem({ 
  problem, 
  selectedAnswers, 
  setSelectedAnswers, 
  isSubmitted, 
  isCorrect 
}: { 
  problem: any;
  selectedAnswers: number[];
  setSelectedAnswers: (indexes: number[]) => void;
  isSubmitted: boolean;
  isCorrect: boolean;
}) {
  const toggleAnswer = (index: number) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter(i => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };
  
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-[#4b4b4b]">{problem.question}</h1>
      <p className="text-sm text-gray-500 mb-4">Sélectionnez toutes les réponses qui s'appliquent</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {problem.answers.map((answer: any, index: number) => {
          const isSelected = selectedAnswers.includes(index);
          const isCorrectInAnswer = 'correctAnswer' in problem && 
                                    Array.isArray(problem.correctAnswer) && 
                                    problem.correctAnswer.includes(index);
          
          return (
            <button
              key={index}
              className={`flex flex-col items-center p-4 sm:p-5 border-2 rounded-xl 
                         shadow-sm transform transition-all duration-300 ${
                isSelected && !isSubmitted
                  ? 'border-[#84d8ff] bg-[#ddf4ff] scale-[1.02]'
                  : isSubmitted && isCorrect && isSelected
                  ? 'border-[#a5ed6e] bg-[#d7ffb8] scale-[1.02]'
                  : isSubmitted && !isCorrect && isSelected
                  ? 'border-[#ff9090] bg-[#ffdfe0]'
                  : isSubmitted && isCorrectInAnswer && !isSelected
                  ? 'border-[#a5ed6e] bg-[#f7ffef]'
                  : 'border-gray-200 hover:border-[#84d8ff] hover:shadow-md'
              }`}
              onClick={() => !isSubmitted && toggleAnswer(index)}
              disabled={isSubmitted}
            >
              <div className="text-4xl sm:text-5xl mb-3">{answer.icon}</div>
              <div className="font-medium text-center text-base sm:text-lg">{answer.name}</div>
              
              <div className={`mt-3 h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center 
                              rounded-full border-2 transition-all duration-300 ${
                isSelected && !isSubmitted
                  ? 'border-[#84d8ff]'
                  : isSubmitted && isCorrect && isSelected
                  ? 'border-[#a5ed6e]'
                  : isSubmitted && !isCorrect && isSelected
                  ? 'border-[#ff9090]'
                  : isSubmitted && isCorrectInAnswer && !isSelected
                  ? 'border-[#a5ed6e]'
                  : 'border-gray-200'
              }`}>
                {isSelected && (
                  <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full ${
                    !isSubmitted
                      ? 'bg-[#84d8ff]'
                      : isCorrect
                      ? 'bg-[#a5ed6e]'
                      : 'bg-[#ff9090]'
                  }`} />
                )}
                {isSubmitted && isCorrectInAnswer && !isSelected && (
                  <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-[#a5ed6e]" />
                )}
              </div>
              
              {/* Indicateurs visuels supplémentaires pour l'accessibilité */}
              {isSubmitted && isCorrectInAnswer && (
                <div className="mt-2 text-xs font-bold text-[#58cc02]">
                  {isSelected ? 'Correct ✓' : 'À sélectionner ✓'}
                </div>
              )}
              {isSubmitted && !isCorrectInAnswer && isSelected && (
                <div className="mt-2 text-xs font-bold text-[#ff4b4b]">
                  Incorrect ✗
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Problème à saisie de texte
function TextInputProblem({ 
  problem, 
  textValue, 
  setTextValue, 
  isSubmitted, 
  isCorrect 
}: { 
  problem: any;
  textValue: string;
  setTextValue: (text: string) => void;
  isSubmitted: boolean;
  isCorrect: boolean;
}) {
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#4b4b4b]">{problem.question}</h1>
      
      {/* Indication pour les questions personnelles */}
      {'isPersonalQuestion' in problem && problem.isPersonalQuestion && (
        <div className="flex items-center p-2 mb-4 bg-[#fff4db] text-[#ff9600] rounded-lg">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          <p className="text-sm">Cette question est personnelle et n'a pas de réponse incorrecte.</p>
        </div>
      )}
      
      <div className="relative">
        <textarea
          className={`w-full p-4 sm:p-5 border-2 rounded-xl min-h-[150px] sm:min-h-[180px] font-medium
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-[#84d8ff] transition-all duration-300 ${
            isSubmitted
              ? isCorrect
                ? 'border-[#a5ed6e] bg-[#f7f7f7]'
                : 'border-[#ff9090] bg-[#f7f7f7]'
              : 'border-gray-200 hover:border-[#84d8ff]'
          }`}
          placeholder={problem.placeholder || "Votre réponse..."}
          value={textValue}
          onChange={(e) => !isSubmitted && setTextValue(e.target.value)}
          disabled={isSubmitted}
        />
        
        {/* Badge d'état */}
        {isSubmitted && (
          <div className={`absolute -top-3 -right-2 px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
            isCorrect ? 'bg-[#58cc02] text-white' : 'bg-[#ff4b4b] text-white'
          }`}>
            {isCorrect ? 'Sauvegardé' : 'Incomplet'}
          </div>
        )}
      </div>
      
      {/* Compteur de caractères avec une barre de progression */}
      {problem.maxLength && (
        <div className="mt-3 flex flex-col">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Longueur de réponse</span>
            <span className={`font-medium ${
              textValue.length > problem.maxLength * 0.9 ? 'text-[#ff9600]' : 'text-gray-500'
            }`}>
              {textValue.length}/{problem.maxLength}
            </span>
          </div>
          <div className="mt-1 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                textValue.length > problem.maxLength ? 'bg-[#ff4b4b]' : 
                textValue.length > problem.maxLength * 0.9 ? 'bg-[#ff9600]' :
                'bg-[#58cc02]'
              }`}
              style={{ width: `${Math.min((textValue.length / problem.maxLength) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}