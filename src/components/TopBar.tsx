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
        className={`relative flex h-full w-full items-center justify-between border-b-2 px-[10px] transition duration-500 sm:hidden ${borderColor} ${backgroundColor}`}
      >
        <Link href="/dashboard" className="text-xl font-bold text-white">
          IKIGAI
        </Link>

        <button
          className="flex items-center gap-2 font-bold text-white"
          onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
          aria-label="Voir votre série"
        >
          <FireSvg /> <span className="text-white">{streak}</span>
        </button>
        
        <MoreOptionsSvg
          onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
          role="button"
          tabIndex={0}
          aria-label="Plus d'options"
        />

        <div
          className={[
            "absolute left-0 right-0 top-full bg-white transition duration-300",
            menu === "HIDDEN" ? "opacity-0" : "opacity-100",
          ].join(" ")}
          aria-hidden={menu === "HIDDEN"}
        >
          {((): null | JSX.Element => {
            switch (menu) {
              case "STREAK":
                return (
                  <div className="flex grow flex-col items-center gap-3 p-5">
                    <h2 className="text-xl font-bold">Série</h2>
                    <p className="text-sm text-gray-400">
                      Pratiquez chaque jour pour maintenir votre série !
                    </p>
                    <div className="self-stretch">
                      <Calendar now={now} setNow={setNow} />
                    </div>
                  </div>
                );

              case "MORE":
                return (
                  <div className="flex grow flex-col">
                    <Link
                      className="flex items-center gap-2 p-2 font-bold text-gray-700"
                      href="/profile"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4EAAF0] text-white">
                        👤
                      </div>
                      Mon profil
                    </Link>
                    <Link
                      className="flex items-center gap-2 border-t-2 border-gray-300 p-2 font-bold text-gray-700"
                      href="/settings"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8747] text-white">
                        ⚙️
                      </div>
                      Paramètres
                    </Link>
                    <Link
                      className="flex items-center gap-2 border-t-2 border-gray-300 p-2 font-bold text-gray-700"
                      href="/help"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B069F8] text-white">
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
          <div
            className={[
              "absolute left-0 top-full h-screen w-screen bg-black opacity-30",
              menu === "HIDDEN" ? "pointer-events-none" : "",
            ].join(" ")}
            onClick={() => setMenu("HIDDEN")}
            aria-label="Masquer le menu"
            role="button"
          ></div>
        </div>
      </div>
    </header>
  );
};