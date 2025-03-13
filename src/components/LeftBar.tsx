import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import type { Tab } from "./BottomBar";
import { useBottomBarItems } from "./BottomBar";
import type { LoginScreenState } from "./LoginScreen";
import { LoginScreen } from "./LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";

const LeftBarMoreMenuSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
      <circle
        cx="23"
        cy="23"
        r="19"
        fill="#41D185"
        stroke="#41D185"
        strokeWidth="2"
      />
      <circle cx="15" cy="23" r="2" fill="white" />
      <circle cx="23" cy="23" r="2" fill="white" />
      <circle cx="31" cy="23" r="2" fill="white" />
    </svg>
  );
};

// Icônes personnalisées pour IKIGAI
const SupportIconSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
      <circle cx="23" cy="23" r="19" fill="#4EAAF0" stroke="#4EAAF0" strokeWidth="2" />
      <path d="M23 14C19.13 14 16 17.13 16 21H19C19 18.79 20.79 17 23 17C25.21 17 27 18.79 27 21C27 22.15 26.37 23.59 25.23 24.74L24.71 25.25C23.64 26.33 23 27.63 23 29V30H26V29C26 28.36 26.32 27.77 26.88 27.21L27.41 26.67C29.07 25.01 30 22.85 30 21C30 17.13 26.87 14 23 14ZM22 31V34H26V31H22Z" fill="white"/>
    </svg>
  );
};

const InfoIconSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" {...props}>
      <circle cx="23" cy="23" r="19" fill="#FF8747" stroke="#FF8747" strokeWidth="2" />
      <path d="M23 14C18.58 14 15 17.58 15 22C15 26.42 18.58 30 23 30C27.42 30 31 26.42 31 22C31 17.58 27.42 14 23 14ZM24 26H22V22H24V26ZM24 20H22V18H24V20Z" fill="white"/>
    </svg>
  );
};

export const LeftBar = ({ selectedTab }: { selectedTab: Tab | null }) => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logOut = useBoundStore((x) => x.logOut);

  const [moreMenuShown, setMoreMenuShown] = useState(false);
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");

  const bottomBarItems = useBottomBarItems();

  return (
    <>
      <nav className="fixed bottom-0 left-0 top-0 hidden flex-col gap-5 border-r-2 border-[#e5e5e5] bg-white p-3 
                     shadow-lg transition-all duration-300 md:flex md:w-16 lg:w-64 lg:p-5">
        <Link
          href="/dashboard"
          className="mb-5 ml-2 mt-5 flex items-center justify-center lg:justify-start gap-2 text-2xl sm:text-3xl font-bold text-[#41D185]"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="text-[#41D185]">
            <path d="M16,2C8.268,2,2,8.268,2,16s6.268,14,14,14s14-6.268,14-14S23.732,2,16,2z M16,28C9.383,28,4,22.617,4,16 S9.383,4,16,4s12,5.383,12,12S22.617,28,16,28z"/>
            <path d="M17 9L15 9 15 15 9 15 9 17 15 17 15 23 17 23 17 17 23 17 23 15 17 15z"/>
          </svg>
          <span className="hidden lg:block">IKIGAI</span>
        </Link>
        
        <ul className="flex flex-col items-stretch gap-4 mt-2">
          {bottomBarItems.map((item) => {
            const isActive = item.name === selectedTab;
            return (
              <li key={item.href} className="flex flex-1">
                <Link
                  href={item.href}
                  className={`flex grow items-center gap-3 rounded-xl border-2 px-2 py-3 lg:py-2 text-sm font-bold uppercase
                            transition-all duration-300 ${
                    isActive 
                      ? "border-[#84d8ff] bg-[#ddf4ff] text-[#1cb0f6]" 
                      : "border-transparent text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-center w-full lg:w-auto">
                    {item.icon}
                    {isActive && (
                      <div className="absolute w-2 h-2 bg-[#ff4b4b] rounded-full -mt-1 -mr-1"></div>
                    )}
                  </div>
                  <span className="sr-only lg:not-sr-only">{item.name}</span>
                </Link>
              </li>
            );
          })}
          
          <div
            className="relative flex grow cursor-pointer items-center gap-3 rounded-xl px-2 py-3 lg:py-2 font-bold uppercase 
                     text-gray-400 hover:bg-gray-100 transition-all duration-300"
            onClick={() => setMoreMenuShown((x) => !x)}
            onMouseEnter={() => setMoreMenuShown(true)}
            onMouseLeave={() => setMoreMenuShown(false)}
            role="button"
            tabIndex={0}
          >
            <div className="flex justify-center w-full lg:w-auto">
              <LeftBarMoreMenuSvg />
            </div>
            <span className="sr-only lg:not-sr-only">Plus</span>
            
            <div
              className={`absolute left-full top-0 min-w-[300px] rounded-xl border-2 border-gray-300 bg-white 
                        text-left text-gray-500 shadow-lg transition-opacity duration-200 z-10
                        ${moreMenuShown ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              style={{ transform: 'translateX(8px)' }}
            >
              <div className="flex flex-col py-2">
                <Link
                  className="flex items-center gap-4 px-5 py-3 text-left hover:bg-gray-100 transition-colors"
                  href="/about"
                >
                  <InfoIconSvg className="h-8 w-8" />
                  <span className="font-medium">À propos d'IKIGAI</span>
                </Link>
                <Link
                  className="flex items-center gap-4 px-5 py-3 text-left hover:bg-gray-100 transition-colors"
                  href="/support"
                >
                  <SupportIconSvg className="h-8 w-8" />
                  <span className="font-medium">Support</span>
                </Link>
              </div>
              
              <div className="flex flex-col border-t border-gray-200 py-2">
                {!loggedIn && (
                  <button
                    className="px-5 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center"
                    onClick={() => setLoginScreenState("SIGNUP")}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#58cc02] text-white mr-4">
                      👤
                    </span>
                    Créer un profil
                  </button>
                )}
                <Link
                  className="px-5 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center"
                  href={loggedIn ? "/settings/account" : "/settings/preferences"}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff9600] text-white mr-4">
                    ⚙️
                  </span>
                  Paramètres
                </Link>
                <Link
                  className="px-5 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center"
                  href="/help"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1cb0f6] text-white mr-4">
                    ❓
                  </span>
                  Aide
                </Link>
                
                {!loggedIn && (
                  <button
                    className="px-5 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center"
                    onClick={() => setLoginScreenState("LOGIN")}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1cb0f6] text-white mr-4">
                      🔑
                    </span>
                    Se connecter
                  </button>
                )}
                {loggedIn && (
                  <button
                    className="px-5 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center"
                    onClick={logOut}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff4b4b] text-white mr-4">
                      🚪
                    </span>
                    Se déconnecter
                  </button>
                )}
              </div>
            </div>
          </div>
        </ul>
      </nav>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};