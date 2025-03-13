import dayjs from "dayjs";
import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { Calendar } from "./Calendar";

// Icônes IKIGAI
const FireSvg = (props: ComponentProps<"svg">) => (
  <svg width="25" height="30" viewBox="0 0 25 30" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9697 2.91035C13.2187 1.96348 11.7813 1.96348 11.0303 2.91035L7.26148 7.66176L4.83362 6.36218C4.61346 6.24433 4.1221 6.09629 3.88966 6.05712C2.72329 5.86056 2.04098 6.78497 2.04447 8.03807L2.06814 16.5554C2.02313 16.9355 2 17.322 2 17.7137C2 23.2979 6.70101 27.8248 12.5 27.8248C18.299 27.8248 23 23.2979 23 17.7137C23 15.3518 22.1591 13.1791 20.7498 11.4581L13.9697 2.91035Z"
      fill="white"
    />
  </svg>
);

const MoreOptionsSvg = (props: ComponentProps<"svg">) => (
  <svg width="24" height="30" viewBox="0 0 24 30" fill="none" {...props}>
    <path
      d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z"
      fill="white"
    />
    <path
      d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
      fill="white"
    />
    <path
      d="M12 24C13.1046 24 14 23.1046 14 22C14 20.8954 13.1046 20 12 20C10.8954 20 10 20.8954 10 22C10 23.1046 10.8954 24 12 24Z"
      fill="white"
    />
  </svg>
);

type MenuState = "HIDDEN" | "LANGUAGES" | "STREAK" | "MORE";

export const TopBar = ({
  backgroundColor = "bg-[#41D185]", // Couleur IKIGAI
  borderColor = "border-[#2CA86E]", // Bordure plus foncée
}: {
  backgroundColor?: `bg-${string}`;
  borderColor?: `border-${string}`;
}) => {
  const [menu, setMenu] = useState<MenuState>("HIDDEN");
  const [now, setNow] = useState(dayjs());
  const streak = useBoundStore((x) => x.streak);
  const language = useBoundStore((x) => x.language);
  
  return (
    <header className="fixed z-20 h-[58px] w-full">
      <div
        className={`relative flex h-full w-full items-center justify-between border-b-2 px-3 sm:px-4 transition duration-500 
                   shadow-md lg:shadow-lg ${borderColor} bg-gradient-to-r from-[#41D185] to-[#4dd891] md:hidden`}
      >
        <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"/>
            <path d="M13 7L11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11z"/>
          </svg>
          <span className="hidden sm:inline-block">IKIGAI</span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 font-bold text-white transition hover:opacity-80"
            onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
            aria-label="Voir votre série"
          >
            <FireSvg /> <span className="text-white">{streak}</span>
          </button>
          
          <button
            className="flex items-center justify-center transition hover:opacity-80"
            onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
            aria-label="Plus d'options"
          >
            <MoreOptionsSvg role="img" tabIndex={-1} />
          </button>
        </div>

        <div
          className={`absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg z-30
                    transition-all duration-300 transform ${menu === "HIDDEN" ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}`}
          aria-hidden={menu === "HIDDEN"}
        >
          {((): null | JSX.Element => {
            switch (menu) {
              case "STREAK":
                return (
                  <div className="flex grow flex-col items-center gap-3 p-5">
                    <h2 className="text-xl font-bold text-[#ff9600]">Série</h2>
                    <p className="text-sm text-gray-500 text-center">
                      Pratiquez chaque jour pour maintenir votre série !
                    </p>
                    <div className="self-stretch mt-2">
                      <Calendar now={now} setNow={setNow} />
                    </div>
                  </div>
                );

              case "MORE":
                return (
                  <div className="flex grow flex-col rounded-b-lg overflow-hidden">
                    <Link
                      className="flex items-center gap-3 p-3 font-bold text-gray-700 hover:bg-gray-50 transition"
                      href="/profile"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4EAAF0] text-white shadow-sm">
                        👤
                      </div>
                      Mon profil
                    </Link>
                    <Link
                      className="flex items-center gap-3 border-t border-gray-200 p-3 font-bold text-gray-700 hover:bg-gray-50 transition"
                      href="/settings"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8747] text-white shadow-sm">
                        ⚙️
                      </div>
                      Paramètres
                    </Link>
                    <Link
                      className="flex items-center gap-3 border-t border-gray-200 p-3 font-bold text-gray-700 hover:bg-gray-50 transition"
                      href="/help"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B069F8] text-white shadow-sm">
                        ❓
                      </div>
                      Aide
                    </Link>
                  </div>
                );

              default:
                return null;
            }
          })()}
          
          {/* Overlay pour fermer le menu */}
          {menu !== "HIDDEN" && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-[-1]"
              onClick={() => setMenu("HIDDEN")}
              aria-label="Masquer le menu"
              role="button"
            ></div>
          )}
        </div>
      </div>
    </header>
  );
};