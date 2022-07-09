/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { useRouter } from "next/router";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  Action,
  useMatches
} from "kbar";

import {
  GitbubIcon,
  LinkedinIcon,
  DiscordIcon,
  TwitterIcon,
  HomeIcon,
  BookmarkIcon,
  GenerateIcon,
  ExtractIcon,
  CustomizeIcon,
  GradientIcon,
  RedditIcon,
  CopyIcon
} from "./icons";

export interface CommandBarProps {
  children?: React.ReactNode;
}

const RenderResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="bg-tertiary px-3 py-1">
            <span className="text-xs font-medium uppercase tracking-widest text-white">
              {item}
            </span>
          </div>
        ) : (
          <div
            className={`flex cursor-pointer items-center justify-between p-5 ${
              active
                ? "border-l-2 border-blue-600 bg-secondary text-white"
                : "bg-tertiary text-white"
            }`}
          >
            <span className="flex items-center gap-3 font-medium leading-none">
              {item && item?.icon}
              {item.name}
            </span>
            {Boolean(item.shortcut?.length) && (
              <div className="space-x-2">
                {item.shortcut?.map((key: string, index) => (
                  <span
                    className="rounded-md bg-card py-1 px-2 text-xs font-medium uppercase"
                    key={index}
                  >
                    {key}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      }
    />
  );
};

const CommandPalette = ({ children }: CommandBarProps) => {
  const router = useRouter();

  const actions: Action[] = [
    {
      id: "copy",
      name: "Copy URL",
      shortcut: ["u"],
      keywords: "copy-url",
      section: "General",
      perform: () => navigator.clipboard.writeText(window.location.href),
      icon: <CopyIcon />
    },
    {
      id: "home",
      name: "Home",
      shortcut: ["g", "i"],
      keywords: "go home",
      section: "Pages",
      perform: () => router.push("/"),
      icon: <HomeIcon />
    },
    {
      id: "bookmarks",
      name: "Bookmarks",
      shortcut: ["g", "b"],
      keywords: "go to bookmarks",
      section: "Pages",
      perform: () => router.push("/bookmarks"),
      icon: <BookmarkIcon />
    },
    {
      id: "generate",
      name: "Generate Colors",
      shortcut: ["g", "c"],
      keywords: "generate colors",
      section: "Pages",
      perform: () => router.push("/generate"),
      icon: <GenerateIcon />
    },
    {
      id: "extract",
      name: "Extract Colors",
      shortcut: ["e", "c"],
      keywords: "extract colors",
      section: "Pages",
      perform: () => router.push("/extract"),
      icon: <ExtractIcon />
    },
    {
      id: "customize",
      name: "Customize Colors",
      shortcut: ["c", "c"],
      keywords: "customize colors",
      section: "Pages",
      perform: () => router.push("/customize"),
      icon: <CustomizeIcon />
    },
    {
      id: "gradient",
      name: "Create Gradients",
      shortcut: ["c", "g"],
      keywords: "create gradients",
      section: "Pages",
      perform: () => router.push("/create-gradients"),
      icon: <GradientIcon />
    },
    {
      id: "github",
      name: "GitHub",
      shortcut: ["f", "g"],
      keywords: "follow-github",
      section: "Links",
      perform: () =>
        window.open("https://github.com/lucky-chap/colorjar", "_blank"),
      icon: <GitbubIcon />
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["f", "t"],
      keywords: "follow-twitter",
      section: "Links",
      perform: () => window.open("https://twitter.com/hunchodotdev", "_blank"),
      icon: <TwitterIcon />
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["f", "l"],
      keywords: "follow-linkedin",
      section: "Links",
      perform: () =>
        window.open("https://linkedin.com/in/obedboakyedanquah", "_blank"),
      icon: <LinkedinIcon />
    },
    {
      id: "reddit",
      name: "Reddit",
      shortcut: ["f", "r"],
      keywords: "text-reddit",
      section: "Links",
      perform: () =>
        window.open("https://www.reddit.com/user/huncho_dot_dev/", "_blank"),
      icon: <RedditIcon />
    },
    {
      id: "discord",
      name: "Discord",
      shortcut: ["f", "d"],
      keywords: "text-discord",
      section: "Links",
      perform: () =>
        window.open(
          "https://discordapp.com/users/FatKidOnFiree#1355",
          "_blank"
        ),
      icon: <DiscordIcon />
    }
  ];
  return (
    <KBarProvider
      actions={actions}
      options={{
        enableHistory: true
      }}
    >
      <KBarPortal>
        <KBarPositioner className="animate-overlayShow fixed inset-0 z-50 bg-secondary bg-opacity-60 backdrop-blur-sm backdrop-filter">
          <KBarAnimator className="w-full max-w-2xl overflow-hidden rounded-md">
            <KBarSearch
              className="w-full border-transparent bg-secondary p-4 text-white outline-none"
              placeholder="🥺 try GitHub?"
            />

            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default CommandPalette;
