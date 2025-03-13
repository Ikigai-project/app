import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useLoginScreen, LoginScreen } from "~/components/LoginScreen";

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#3AD278] text-white" style={{ backgroundImage: `url('/bg-pattern.svg')` }}>
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-8 sm:py-12 md:flex-row md:gap-16 lg:gap-36">
        <div className="h-fit w-full max-w-[280px] sm:max-w-[320px] md:w-[360px] flex justify-center">
          {/* Logo IKIGAI - un simple cercle avec le texte pour l'instant */}
          <div className="rounded-full bg-white w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center text-[#41D185] text-4xl sm:text-5xl md:text-6xl font-bold">
            IKIGAI
          </div>
        </div>
        <div className="max-w-md">
          <p className="mb-6 text-center text-xl sm:text-2xl md:text-3xl font-bold md:mb-10">
            L'IA au service de l'équilibre vie pro et vie perso !
          </p>
          <div className="mx-auto mt-4 flex w-full flex-col items-center gap-3">
            <button
              className="w-full rounded-2xl border-b-4 border-green-700 bg-green-600 px-8 sm:px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 sm:max-w-xs"
              onClick={() => setLoginScreenState("SIGNUP")}
            >
              S'inscrire
            </button>
            <button
              className="w-full rounded-2xl border-2 border-b-4 border-[#042c60] bg-[#235390] px-6 sm:px-8 py-3 font-bold uppercase transition hover:bg-[#204b82] sm:max-w-xs"
              onClick={() => setLoginScreenState("LOGIN")}
            >
              J'ai déjà un compte
            </button>
          </div>
        </div>
      </div>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;