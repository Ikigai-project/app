import Link from "next/link";
import React from "react";
import { useBoundStore } from "~/hooks/useBoundStore";

type SettingsTitle = ReturnType<typeof useSettingsPages>[number]["title"];

const useSettingsPages = () => {
  const loggedIn = useBoundStore((x) => x.loggedIn);
  return loggedIn
    ? ([
        { title: "Compte", href: "/settings/account" },
        { title: "Son", href: "/settings/sound" },
        { title: "Objectif quotidien", href: "/settings/coach" },
        { title: "Notifications", href: "/settings/notifications" },
      ] as const)
    : ([
        { title: "Son", href: "/settings/sound" },
        { title: "Objectif quotidien", href: "/settings/coach" },
        { title: "Notifications", href: "/settings/notifications" },
      ] as const);
};

export const SettingsRightNav = ({
  selectedTab,
}: {
  selectedTab: SettingsTitle;
}) => {
  const settingsPages = useSettingsPages();
  return (
    <div className="hidden h-fit w-80 flex-col gap-1 rounded-2xl border-2 border-gray-200 p-5 lg:flex">
      {settingsPages.map(({ title, href }) => {
        return (
          <Link
            key={title}
            href={href}
            className={[
              "rounded-2xl p-4 font-bold hover:bg-gray-300",
              title === selectedTab ? "bg-gray-300" : "",
            ].join(" ")}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};