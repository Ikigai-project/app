import type { NextPage } from "next";
import React, { useState } from "react";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { TopBar } from "~/components/TopBar";
import { SettingsRightNav } from "~/components/SettingsRightNav";
import { useBoundStore } from "~/hooks/useBoundStore";

const Notifications: NextPage = () => {
  // Initialiser les états pour les différentes options de notification
  const [dailyReminders, setDailyReminders] = useState(true);
  const [challengeNotifications, setChallengeNotifications] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);

  // État pour suivre si des modifications ont été apportées
  const [hasChanges, setHasChanges] = useState(false);

  // Fonction pour gérer l'enregistrement des modifications
  const handleSaveChanges = () => {
    // Ici, vous pourriez appeler une fonction dans votre store pour enregistrer ces paramètres
    // Pour l'instant, nous simulons simplement l'enregistrement en réinitialisant l'état des modifications
    setHasChanges(false);
  };

  // Fonction commune pour mettre à jour l'état et indiquer que des modifications ont été apportées
  const updateSetting = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    setter(value);
    setHasChanges(true);
  };

  const notificationOptions = [
    {
      title: "Rappels quotidiens",
      description: "Recevez des rappels pour pratiquer chaque jour",
      value: dailyReminders,
      setValue: (value: boolean) => updateSetting(setDailyReminders, value),
    },
    {
      title: "Notifications des défis",
      description: "Soyez informé des nouveaux défis hebdomadaires",
      value: challengeNotifications,
      setValue: (value: boolean) => updateSetting(setChallengeNotifications, value),
    },
    {
      title: "Mises à jour de progression",
      description: "Recevez des notifications sur votre progression",
      value: progressUpdates,
      setValue: (value: boolean) => updateSetting(setProgressUpdates, value),
    },
    {
      title: "Alertes de série",
      description: "Soyez averti lorsque votre série est sur le point d'être interrompue",
      value: streakAlerts,
      setValue: (value: boolean) => updateSetting(setStreakAlerts, value),
    },
  ];

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab={null} />
      <BottomBar selectedTab={null} />
      <div className="mx-auto flex flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">Notifications</h1>
          <button
            className="rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={handleSaveChanges}
            disabled={!hasChanges}
          >
            Enregistrer
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">
            {notificationOptions.map(({ title, description, value, setValue }) => {
              return (
                <div
                  key={title}
                  className="flex flex-col border-b border-gray-100 pb-4"
                >
                  <div className="flex justify-between sm:justify-between sm:gap-4">
                    <div className="flex flex-col">
                      <div className="font-bold">{title}</div>
                      <div className="text-sm text-gray-500">{description}</div>
                    </div>
                    <label className="pr-5 sm:pr-0">
                      <div
                        className={[
                          "relative h-6 w-12 cursor-pointer rounded-full transition-all duration-300",
                          value ? "bg-[#41D185]" : "bg-gray-200",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "absolute h-10 w-10 rounded-xl border-2 border-b-4 bg-white transition-all duration-300",
                            value ? "border-[#41D185]" : "border-gray-200",
                          ].join(" ")}
                          style={{
                            top: "calc(50% - 20px)",
                            left: value ? "calc(100% - 20px)" : "-20px",
                          }}
                        ></div>
                      </div>
                      <input
                        className="hidden"
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setValue(e.target.checked)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <SettingsRightNav selectedTab="Notifications" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;