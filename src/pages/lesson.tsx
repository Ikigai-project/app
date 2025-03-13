import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { ikigaiProblems, lessonProblems } from "~/utils/lessonProblems";

// SVG Components
import {
  CloseSvg,
  DoneSvg,
  BigCloseSvg,
  LessonTopBarHeart,
  LessonTopBarEmptyHeart,
  LessonFastForwardStartSvg,
  LessonFastForwardEndFailSvg,
  LessonFastForwardEndPassSvg,
} from "~/components/Svgs";

// IKIGAI Lesson Problems
const ikigaiProblem1 = {
  type: "SELECT_MULTIPLE",
  question: "Quelles activités ou hobbies vous font perdre la notion du temps et vous remplissent de joie ?",
  answers: [
    { icon: <div className="text-5xl">📚</div>, name: "Lecture" },
    { icon: <div className="text-5xl">🎵</div>, name: "Musique" },
    { icon: <div className="text-5xl">🏃</div>, name: "Sport" },
    { icon: <div className="text-5xl">✈️</div>, name: "Voyages" },
    { icon: <div className="text-5xl">🎭</div>, name: "Art/Culture" },
    { icon: <div className="text-5xl">🍳</div>, name: "Cuisine" },
    { icon: <div className="text-5xl">✨</div>, name: "Autre" },
  ],
  isPersonalQuestion: true, // Pas de réponse correcte car c'est une question personnelle
  correctAnswer: [], // pas utilisé
};

const ikigaiProblem2 = {
  type: "TEXT_INPUT",
  question: "Qu'est-ce qui vous fait ressentir de la joie, du bien-être ou de l'accomplissement quand vous le faites ?",
  isPersonalQuestion: true, // Pas de réponse correcte car c'est une question personnelle
  correctAnswer: "", // pas utilisé
};

const ikigaiProblem3 = {
  type: "SELECT_1_OF_3",
  question: "Selon la philosophie de l'IKIGAI, que représente le premier cercle?",
  answers: [
    { icon: "💖", name: "Ce que vous aimez" },
    { icon: "💰", name: "Ce pour quoi on peut vous payer" },
    { icon: "🌍", name: "Ce dont le monde a besoin" },
  ],
  correctAnswer: 0,
};

const ikigaiProblem4 = {
  type: "WRITE",
  question: "Complétez cette phrase sur la passion :",
  answerTiles: ["La", "passion", "est", "ce", "qui", "vous", "fait", "vibrer"],
  correctAnswer: [0, 1, 2, 3, 4, 5, 6, 7],
};

const ikigaiProblem5 = {
  type: "TEXT_INPUT_WITH_SUGGESTIONS",
  question: "Décrivez brièvement une activité qui vous passionne et vous fait perdre la notion du temps.",
  isPersonalQuestion: true, // Pas de réponse correcte car c'est une question personnelle
  correctAnswer: "",
  suggestions: [
    "J'adore lire car...",
    "Quand je fais du sport...",
    "La musique me fait ressentir...",
    "J'aime créer des choses car...",
  ],
};

const LESSON_FAST_FORWARD_QUESTION_COUNT = 1;

function numbersEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((a, b) => a - b);
  const sortedB = [...b].sort((a, b) => a - b);
  return sortedA.every((val, i) => val === sortedB[i]);
}

export default function Page() {
  type QuestionResult = {
    word: string;
    isCorrect: boolean;
  };

  const router = useRouter();
  const questionNumber = useBoundStore((x) => x.lessonsCompleted);
  const increaseQuestionNumber = useBoundStore((x) => x.increaseLessonsCompleted);

  const selectedAnswer = useBoundStore((x) => x.selectedAnswer);
  const setSelectedAnswer = useBoundStore((x) => x.setSelectedAnswer);
  const selectedAnswers = useBoundStore((x) => x.selectedAnswers);
  const setSelectedAnswers = useBoundStore((x) => x.setSelectedAnswers);
  const textInputValue = useBoundStore((x) => x.textInputValue);
  const setTextInputValue = useBoundStore((x) => x.setTextInputValue);

  const tileNumber = (() => {
    if (typeof router.query.tile === "string") {
      const tile = Number(router.query.tile);
      if (!isNaN(tile)) return tile;
    }
    return 1;
  })();

  const [lessonProblem, setLessonProblem] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);

  // Change this to choose between regular lessons and IKIGAI lessons
  const useIkigaiLesson = true;
  const problems = useIkigaiLesson ? ikigaiProblems : lessonProblems;
  
  const problem = problems[lessonProblem] ?? lessonProblems[0];

  const totalCorrectAnswersNeeded = useIkigaiLesson ? ikigaiProblems.length : 2;

  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const hearts =
    "fast-forward" in router.query &&
    !isNaN(Number(router.query["fast-forward"]))
      ? 3 - incorrectAnswerCount
      : null;

  const isAnswerCorrect = (() => {
    if ('isPersonalQuestion' in problem && problem.isPersonalQuestion) return true;
    
    if (problem.type === "SELECT_1_OF_3") {
      return selectedAnswer === problem.correctAnswer;
    } else if (problem.type === "WRITE") {
      return numbersEqual(selectedAnswers, problem.correctAnswer);
    } else if (problem.type === "SELECT_MULTIPLE" || 
               problem.type === "TEXT_INPUT" ||
               problem.type === "TEXT_INPUT_WITH_SUGGESTIONS") {
      if (problem.isPersonalQuestion) return true;
      return textInputValue.trim().toLowerCase() === problem.correctAnswer.toString().trim().toLowerCase();
    }
    return false;
  })();

  const isAnswerSelected = (() => {
    if (problem.type === "SELECT_1_OF_3") {
      return selectedAnswer !== null;
    } else if (problem.type === "WRITE") {
      return selectedAnswers.length > 0;
    } else if (problem.type === "SELECT_MULTIPLE") {
      return selectedAnswers.length > 0;
    } else if (problem.type === "TEXT_INPUT" || problem.type === "TEXT_INPUT_WITH_SUGGESTIONS") {
      if ('isPersonalQuestion' in problem && problem.isPersonalQuestion) {
        return textInputValue.trim().length > 0;
      }
      return textInputValue.trim() === problem.correctAnswer.toString().trim();
    }
    return false;
  })();

  const correctAnswerCount = lessonProblem;

  useEffect(() => {
    if (hearts !== null && hearts <= 0) {
      router.push({
        pathname: "/learn",
      });
    }
  }, [hearts, router]);

  const restartLesson = () => {
    setLessonProblem(0);
    setIncorrectAnswerCount(0);
    setIsAnswerSubmitted(false);
    startTime.current = Date.now();
    endTime.current = startTime.current + 1000 * 60 * 3 + 1000 * 33;
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setTextInputValue("");
    setIsStartingLesson(true);
  };

  const quitLesson = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setTextInputValue("");
    router.push({
      pathname: "/learn",
    });
  };

  const checkAnswer = () => {
    if (isAnswerSubmitted) {
      if (isAnswerCorrect || hearts === null) {
        if (lessonProblem + 1 < problems.length) {
          setLessonProblem((x) => {
            if (x + 1 === LESSON_FAST_FORWARD_QUESTION_COUNT && hearts !== null) {
              router.push({
                pathname: "/learn",
                query: { fast_forward: tileNumber },
              });
            }
            return x + 1;
          });
          setIsAnswerSubmitted(false);
          setSelectedAnswer(null);
          setSelectedAnswers([]);
          setTextInputValue("");
        } else {
          if (hearts === null) {
            increaseQuestionNumber();
          }
          router.push({
            pathname: "/learn",
            query: hearts !== null ? { fast_forward: tileNumber } : {},
          });
        }
      } else {
        setLessonProblem(0);
        setIsAnswerSubmitted(false);
        setIncorrectAnswerCount((x) => x + 1);
        setSelectedAnswer(null);
        setSelectedAnswers([]);
        setTextInputValue("");
      }
    } else {
      setIsAnswerSubmitted(true);
      setIsAnswerCorrect(isAnswerCorrect);
      
      // Si la réponse est personnelle, l'ajouter aux résultats
      if ('isPersonalQuestion' in problem && problem.isPersonalQuestion) {
        if (problem.type === "SELECT_MULTIPLE") {
          const selectedItems = problem.answers
            .filter((_, i) => selectedAnswers.includes(i))
            .map(item => item.name);
          
          setQuestionResults(prev => [
            ...prev, 
            { 
              word: `Question: ${problem.question}\nRéponse: ${selectedItems.join(", ")}`, 
              isCorrect: true 
            }
          ]);
        } else if (problem.type === "TEXT_INPUT" || problem.type === "TEXT_INPUT_WITH_SUGGESTIONS") {
          setQuestionResults(prev => [
            ...prev, 
            { 
              word: `Question: ${problem.question}\nRéponse: ${textInputValue}`, 
              isCorrect: true 
            }
          ]);
        }
      }
    }
  };

  if (isStartingLesson) {
    return (
      <div className="bg-white">
        <div className="fixed left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between bg-[#41D185] px-4 font-bold text-white">
          <button onClick={quitLesson} className="flex items-center gap-2">
            <CloseSvg />
            <span className="sr-only">Close lesson</span>
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 transform text-2xl">
            IKIGAI
          </div>
          {hearts !== null && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => {
                if (i < hearts) {
                  return <LessonTopBarHeart key={i} />;
                }
                return <LessonTopBarEmptyHeart key={i} />;
              })}
            </div>
          )}
        </div>
        <div className="flex min-h-screen flex-col items-center justify-start pt-[58px]">
          <div className="mt-8 flex w-full max-w-5xl flex-col gap-8 p-4">
            <div className="flex w-full flex-col items-center gap-8">
              <h1 className="text-2xl font-bold">
                {useIkigaiLesson ? "Découvrir son IKIGAI - Ce qui vous passionne" : `Leçon ${tileNumber}`}
              </h1>
              <LessonFastForwardStartSvg />
              <div className="mt-8 flex w-full justify-center">
                <button
                  className="rounded-2xl bg-[#58cc02] px-12 py-3 font-bold uppercase text-white transition hover:bg-[#61E002]"
                  onClick={() => setIsStartingLesson(false)}
                >
                  Commencer
                </button>
              </div>
            </div>
            
            {reviewLessonShown && questionResults.length > 0 && (
              <div className="mt-12 w-full rounded-xl border-2 border-gray-200 p-4">
                <h2 className="mb-4 text-xl font-bold">Vos réponses</h2>
                <div className="flex flex-col gap-4">
                  {questionResults.map((result, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <p className="whitespace-pre-line text-sm">{result.word}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {!reviewLessonShown && questionResults.length > 0 && (
              <div className="mt-4 w-full text-center">
                <button
                  className="font-semibold text-blue-500 hover:underline"
                  onClick={() => setReviewLessonShown(true)}
                >
                  Voir mes réponses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="fixed left-0 right-0 top-0 z-10 flex h-[58px] items-center justify-between bg-[#41D185] px-4 font-bold text-white">
        <button onClick={quitLesson} className="flex items-center gap-2">
          <CloseSvg />
          <span className="sr-only">Close lesson</span>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Progress
            correctAnswerCount={correctAnswerCount}
            totalCorrectNeeded={totalCorrectAnswersNeeded}
          />
        </div>
        {hearts !== null && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => {
              if (i < hearts) {
                return <LessonTopBarHeart key={i} />;
              }
              return <LessonTopBarEmptyHeart key={i} />;
            })}
          </div>
        )}
      </div>

      <div className="flex min-h-screen flex-col items-center justify-between pt-[58px]">
        <div className="w-full p-4 sm:max-w-xl">
          {hearts === null && !isAnswerSubmitted && (
            <div className="mb-4 flex justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="font-bold text-gray-400 transition hover:text-gray-600"
                  onClick={quitLesson}
                >
                  QUITTER
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="font-bold text-gray-400 transition hover:text-gray-600"
                  onClick={restartLesson}
                >
                  RECOMMENCER
                </button>
              </div>
            </div>
          )}

          <div
            className={
              problem.type === "SELECT_1_OF_3"
                ? "rounded-2xl p-8"
                : "mb-8 rounded-2xl p-8"
            }
          >
            {problem.type === "SELECT_1_OF_3" && (
              <ProblemSelect1Of3
                problem={problem}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                isAnswerSubmitted={isAnswerSubmitted}
                isAnswerCorrect={isAnswerCorrect}
              />
            )}
            {problem.type === "WRITE" && (
              <ProblemWrite
                problem={problem}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                isAnswerSubmitted={isAnswerSubmitted}
                isAnswerCorrect={isAnswerCorrect}
              />
            )}
            {problem.type === "SELECT_MULTIPLE" && (
              <ProblemSelectMultiple 
                problem={problem}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                isAnswerSubmitted={isAnswerSubmitted}
                isAnswerCorrect={isAnswerCorrect}
              />
            )}
            {problem.type === "TEXT_INPUT" && (
              <ProblemTextInput
                problem={problem}
                textInputValue={textInputValue}
                setTextInputValue={setTextInputValue}
                isAnswerSubmitted={isAnswerSubmitted}
                isAnswerCorrect={isAnswerCorrect}
              />
            )}
            {problem.type === "TEXT_INPUT_WITH_SUGGESTIONS" && (
              <ProblemTextInputWithSuggestions
                problem={problem}
                textInputValue={textInputValue}
                setTextInputValue={setTextInputValue}
                isAnswerSubmitted={isAnswerSubmitted}
                isAnswerCorrect={isAnswerCorrect}
              />
            )}
          </div>
        </div>

        <div className="sticky bottom-0 w-full bg-white p-4 sm:flex sm:justify-center">
          <div className="flex w-full flex-col gap-2 sm:w-[500px]">
            <div
              className={`${
                isAnswerSubmitted && isAnswerCorrect
                  ? "bg-[#D7FFB8]"
                  : isAnswerSubmitted && !isAnswerCorrect
                  ? "bg-[#FFDFE0]"
                  : ""
              } rounded-xl p-4`}
            >
              {isAnswerSubmitted && isAnswerCorrect && (
                <div className="flex">
                  <div className="mr-4">
                    <DoneSvg />
                  </div>
                  <div>
                    <div className="font-bold">Correct!</div>
                    {!('isPersonalQuestion' in problem && problem.isPersonalQuestion) && (
                      <div>
                        {problem.type === "SELECT_1_OF_3" && (
                          <div>
                            {problem.answers[problem.correctAnswer].name}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isAnswerSubmitted && !isAnswerCorrect && (
                <div className="flex">
                  <div className="mr-4">
                    <BigCloseSvg />
                  </div>
                  <div>
                    <div className="font-bold">
                      {hearts === null ? "Incorrect" : "Try again"}
                    </div>
                    {hearts === null && (
                      <div>
                        {problem.type === "SELECT_1_OF_3" && (
                          <div>
                            {problem.answers[problem.correctAnswer].name}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              disabled={!isAnswerSubmitted && !isAnswerSelected}
              className={`w-full rounded-2xl py-3 uppercase ${
                !isAnswerSubmitted && !isAnswerSelected
                  ? "cursor-not-allowed bg-[#e5e5e5] font-bold text-[#afafaf]"
                  : !isAnswerSubmitted
                  ? "bg-[#58cc02] font-bold text-white transition hover:bg-[#61E002]"
                  : isAnswerCorrect
                  ? "bg-[#58cc02] font-bold text-white transition hover:bg-[#61E002]"
                  : "bg-[#ff4b4b] font-bold text-white"
              }`}
              onClick={checkAnswer}
            >
              {!isAnswerSubmitted
                ? "Vérifier"
                : isAnswerCorrect
                ? "Continuer"
                : hearts === null
                ? "Continuer"
                : "Réessayer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Progress({
  correctAnswerCount,
  totalCorrectNeeded,
}: {
  correctAnswerCount: number;
  totalCorrectNeeded: number;
}) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: totalCorrectNeeded }).map((_, i) => {
        if (i < correctAnswerCount) {
          return (
            <div
              key={i}
              className="h-[10px] w-[10px] rounded-[50%] bg-[#58CC02] transition-all"
            />
          );
        }
        return (
          <div
            key={i}
            className="h-[10px] w-[10px] rounded-[50%] bg-white/40 transition-all"
          />
        );
      })}
    </div>
  );
}

function ProblemSelect1Of3({
  problem,
  selectedAnswer,
  setSelectedAnswer,
  isAnswerSubmitted,
  isAnswerCorrect,
}: {
  problem: {
    type: "SELECT_1_OF_3";
    question: string;
    answers: { name: string; icon: string }[];
    correctAnswer: number;
  };
  selectedAnswer: number | null;
  setSelectedAnswer: (value: number | null) => void;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean;
}) {
  return (
    <>
      <h1 className="mb-4 text-[19px] font-bold text-[#3c3c3c]">
        {problem.question}
      </h1>
      <div className="flex flex-col gap-3">
        {problem.answers.map((answer, i) => {
          return (
            <button
              key={i}
              className={`flex items-center justify-between rounded-xl border-2 border-b-4 p-3 transition hover:bg-[#f7f7f7] ${
                selectedAnswer === i && !isAnswerSubmitted
                  ? "border-[#84d8ff] bg-[#ddf4ff]"
                  : isAnswerSubmitted && i === problem.correctAnswer
                  ? "border-[#a5ed6e] bg-[#d7ffb8]"
                  : isAnswerSubmitted &&
                    i === selectedAnswer &&
                    i !== problem.correctAnswer
                  ? "border-[#ff9090] bg-[#ffdfe0]"
                  : "border-[#e5e5e5]"
              }`}
              onClick={() => {
                if (!isAnswerSubmitted) {
                  setSelectedAnswer(i);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#e5e5e5] text-2xl">
                  {answer.icon}
                </div>
                <div className="font-bold">{answer.name}</div>
              </div>
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedAnswer === i && !isAnswerSubmitted
                    ? "border-[#84d8ff]"
                    : isAnswerSubmitted && i === problem.correctAnswer
                    ? "border-[#a5ed6e]"
                    : isAnswerSubmitted &&
                      i === selectedAnswer &&
                      i !== problem.correctAnswer
                    ? "border-[#ff9090]"
                    : "border-[#e5e5e5]"
                }`}
              >
                {selectedAnswer === i && !isAnswerSubmitted && (
                  <div className="h-3 w-3 rounded-full bg-[#84d8ff]" />
                )}
                {isAnswerSubmitted && i === problem.correctAnswer && (
                  <div className="h-3 w-3 rounded-full bg-[#a5ed6e]" />
                )}
                {isAnswerSubmitted &&
                  i === selectedAnswer &&
                  i !== problem.correctAnswer && (
                    <div className="h-3 w-3 rounded-full bg-[#ff9090]" />
                  )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function ProblemWrite({
  problem,
  selectedAnswers,
  setSelectedAnswers,
  isAnswerSubmitted,
  isAnswerCorrect,
}: {
  problem: typeof ikigaiProblem4;
  selectedAnswers: number[];
  setSelectedAnswers: (value: number[]) => void;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean;
}) {
  const remainingAnswers = problem.answerTiles
    .map((a, i) => (selectedAnswers.includes(i) ? null : i))
    .filter((a) => a !== null) as number[];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-[#4b4b4b]">{problem.question}</h1>
      <div className="mb-3 flex min-h-14 flex-wrap gap-1 rounded-2xl border-2 border-[#e5e5e5] p-2">
        {selectedAnswers.map((tileIndex, i) => {
          return (
            <button
              key={i}
              className={`rounded-xl px-3 py-1 text-[15px] font-medium ${
                isAnswerSubmitted && isAnswerCorrect
                  ? "bg-[#d7ffb8] text-[#58a700]"
                  : isAnswerSubmitted && !isAnswerCorrect
                  ? "bg-[#ffdfe0] text-[#ea2b2b]"
                  : "bg-[#ddf4ff] text-[#1cb0f6]"
              }`}
              onClick={() => {
                if (!isAnswerSubmitted) {
                  setSelectedAnswers([
                    ...selectedAnswers.slice(0, i),
                    ...selectedAnswers.slice(i + 1),
                  ]);
                }
              }}
            >
              {problem.answerTiles[tileIndex]}
            </button>
          );
        })}
      </div>
      <div className="mb-3 flex flex-wrap gap-1">
        {remainingAnswers.map((tileIndex, i) => {
          return (
            <button
              key={i}
              className="rounded-xl border-2 border-b-4 border-[#e5e5e5] px-3 py-1 text-[15px]"
              onClick={() => {
                if (!isAnswerSubmitted) {
                  setSelectedAnswers([...selectedAnswers, tileIndex]);
                }
              }}
            >
              {problem.answerTiles[tileIndex]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProblemSelectMultiple({
  problem,
  selectedAnswers,
  setSelectedAnswers,
  isAnswerSubmitted,
  isAnswerCorrect,
}: {
  problem: {
    type: string;
    question: string;
    answers: { name: string; icon: JSX.Element }[];
    isPersonalQuestion?: boolean;
    correctAnswer: number[];
  };
  selectedAnswers: number[];
  setSelectedAnswers: (value: number[]) => void;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean;
}) {
  return (
    <>
      <h1 className="mb-4 text-[19px] font-bold text-[#3c3c3c]">
        {problem.question}
      </h1>
      <div className="grid grid-cols-2 gap-3">
        {problem.answers.map((answer, i) => {
          const isSelected = selectedAnswers.includes(i);
          return (
            <button
              key={i}
              className={`flex flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 transition hover:bg-[#f7f7f7] ${
                isSelected && !isAnswerSubmitted
                  ? "border-[#84d8ff] bg-[#ddf4ff]"
                  : isAnswerSubmitted && isAnswerCorrect && isSelected
                  ? "border-[#a5ed6e] bg-[#d7ffb8]"
                  : isAnswerSubmitted && !isAnswerCorrect && isSelected
                  ? "border-[#ff9090] bg-[#ffdfe0]"
                  : "border-[#e5e5e5]"
              }`}
              onClick={() => {
                if (!isAnswerSubmitted) {
                  if (isSelected) {
                    setSelectedAnswers(selectedAnswers.filter(id => id !== i));
                  } else {
                    setSelectedAnswers([...selectedAnswers, i]);
                  }
                }
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-lg text-3xl sm:h-20 sm:w-20 sm:text-4xl">
                {answer.icon}
              </div>
              <div className="mt-2 text-sm font-medium">{answer.name}</div>
              <div
                className={`mt-2 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  isSelected && !isAnswerSubmitted
                    ? "border-[#84d8ff]"
                    : isAnswerSubmitted && isAnswerCorrect && isSelected
                    ? "border-[#a5ed6e]"
                    : isAnswerSubmitted && !isAnswerCorrect && isSelected
                    ? "border-[#ff9090]"
                    : "border-[#e5e5e5]"
                }`}
              >
                {isSelected && !isAnswerSubmitted && (
                  <div className="h-3 w-3 rounded-full bg-[#84d8ff]" />
                )}
                {isAnswerSubmitted && isAnswerCorrect && isSelected && (
                  <div className="h-3 w-3 rounded-full bg-[#a5ed6e]" />
                )}
                {isAnswerSubmitted && !isAnswerCorrect && isSelected && (
                  <div className="h-3 w-3 rounded-full bg-[#ff9090]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function ProblemTextInput({
  problem,
  textInputValue,
  setTextInputValue,
  isAnswerSubmitted,
  isAnswerCorrect,
}: {
  problem: {
    type: string;
    question: string;
    isPersonalQuestion?: boolean;
    correctAnswer: string;
  };
  textInputValue: string;
  setTextInputValue: (value: string) => void;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean;
}) {
  return (
    <>
      <h1 className="mb-4 text-[19px] font-bold text-[#3c3c3c]">
        {problem.question}
      </h1>
      <div className="mt-4">
        <textarea
          className={`w-full rounded-xl border-2 p-4 ${
            isAnswerSubmitted && isAnswerCorrect
              ? "border-[#a5ed6e] bg-[#f7f7f7]"
              : isAnswerSubmitted && !isAnswerCorrect
              ? "border-[#ff9090] bg-[#f7f7f7]"
              : "border-[#e5e5e5]"
          }`}
          rows={5}
          placeholder="Votre réponse..."
          value={textInputValue}
          onChange={(e) => {
            if (!isAnswerSubmitted) {
              setTextInputValue(e.target.value);
            }
          }}
          disabled={isAnswerSubmitted}
        ></textarea>
      </div>
    </>
  );
}

function ProblemTextInputWithSuggestions({
  problem,
  textInputValue,
  setTextInputValue,
  isAnswerSubmitted,
  isAnswerCorrect,
}: {
  problem: {
    type: string;
    question: string;
    isPersonalQuestion?: boolean;
    correctAnswer: string;
    suggestions: string[];
  };
  textInputValue: string;
  setTextInputValue: (value: string) => void;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean;
}) {
  return (
    <>
      <h1 className="mb-4 text-[19px] font-bold text-[#3c3c3c]">
        {problem.question}
      </h1>
      <div className="mt-4">
        <textarea
          className={`w-full rounded-xl border-2 p-4 ${
            isAnswerSubmitted && isAnswerCorrect
              ? "border-[#a5ed6e] bg-[#f7f7f7]"
              : isAnswerSubmitted && !isAnswerCorrect
              ? "border-[#ff9090] bg-[#f7f7f7]"
              : "border-[#e5e5e5]"
          }`}
          rows={5}
          placeholder="Votre réponse..."
          value={textInputValue}
          onChange={(e) => {
            if (!isAnswerSubmitted) {
              setTextInputValue(e.target.value);
            }
          }}
          disabled={isAnswerSubmitted}
        ></textarea>
        
        {!isAnswerSubmitted && !textInputValue && (
          <div className="mt-3">
            <p className="mb-2 text-sm text-gray-500">Suggestions pour commencer:</p>
            <div className="flex flex-wrap gap-2">
              {problem.suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  className="rounded-xl border-2 border-[#e5e5e5] px-3 py-1 text-sm text-gray-700 transition hover:bg-[#f7f7f7]"
                  onClick={() => setTextInputValue(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}