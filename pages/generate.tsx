/* eslint-disable no-console */
import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { ChromePicker } from "react-color";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

import { createTintsAndShades } from "../utils/createTintsAndShades";

const Generate: NextPage = () => {
  const router = useRouter();
  const [initialColor, setColor] = useState("#18A2D5");
  const [notify, setNotify] = useState<string | null>(null);
  const [paletteName, setPaletteName] = useState("");
  const generated = createTintsAndShades(initialColor);
  const { data: session } = useSession();

  // const notification = () => toast(notify);

  const newTints: string[] = [];
  const newShades: string[] = [];

  generated?.calculatedTints?.forEach((tint) => {
    tint = `#${tint}`;
    newTints.push(tint);
  });

  generated?.calculatedShades?.forEach((shade) => {
    shade = `#${shade}`;
    newShades.push(shade);
  });

  const fileTemplate = `
const palette = {
  type: "generated",
  origin: "${initialColor}",
  paletteName: "${paletteName}",
  shades: ${JSON.stringify(newShades)},
  tints: ${JSON.stringify(newTints)}
}
    `;

  const handleSave = async () => {
    setNotify("Palette saved 🎉.");
    if (paletteName.trim().length !== 0) {
      try {
        await fetch("/api/palettes/generated", {
          method: "POST",
          body: JSON.stringify({
            type: "generated",
            name: paletteName,
            origin: initialColor,
            shades: newShades,
            tints: newTints
          })
        }).then((res) => {
          if (res.ok) {
            router.push("/palettes/generated");
            toast.success(notify);
          } else {
            setNotify("There was an error saving ❌");
            toast.error(notify);
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setNotify("Forgot to name it ❓");
      toast.error(notify);
    }
  };

  const handleDownload = () => {
    if (paletteName.trim().length !== 0) {
      const file = new File(
        [fileTemplate],
        `${Date.now()}-colorjar-generated.js`,
        {
          type: "application/javascript;charset=utf-8"
        }
      );
      setNotify("Download successful 🚀✨");
      toast.success(notify);
      saveAs(file);
    } else {
      setNotify("Forgot to name it ❓");
      toast.error(notify);
    }
  };

  const handleColorChangeComplete = (color: any) => {
    // always use only the HEX value of the color
    // react-color also allows you to use the rgba or hsla values too
    setColor(color.hex);
  };

  return (
    <main className="">
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-center font-raleway text-4xl font-bold sm:text-5xl">
          Generate Colors
        </h2>
        <p className="text-center font-medium text-gray-400">
          Get the tints and shades for a color{" "}
          <span aria-label="image icon" role="img">
            🕶️
          </span>{" "}
          Cool right?
        </p>
        <div className="mx-auto mt-10 items-start justify-end">
          <div className="mx-auto max-w-lg">
            <div className="w-full rounded-xl bg-gray-800 p-5 text-left">
              <ChromePicker
                styles={{
                  default: {
                    body: {
                      width: "100%",
                      margin: "0 auto"
                    }
                  }
                }}
                className="w-full"
                color={initialColor}
                onChange={handleColorChangeComplete}
              />
            </div>
          </div>

          <div className="my-8 mx-auto max-w-lg">
            <div className="mt-7 mb-2 rounded-md bg-secondary p-3 shadow-md">
              <div className="flex flex-col sm:flex-row">
                {newShades.map((shade) => (
                  <div
                    key={Math.random() * 34}
                    className="h-10 w-full cursor-pointer bg-primary"
                    style={{
                      backgroundColor: shade
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="font-raleway text-sm font-bold uppercase text-gray-600">
              shades
            </p>
            <div className="mt-7 mb-2 rounded-md bg-secondary p-3 shadow-md">
              <div className="flex flex-col sm:flex-row">
                {newTints.map((tint) => (
                  <div
                    key={Math.random() * 34}
                    className="h-10 w-full cursor-pointer bg-primary"
                    style={{
                      backgroundColor: tint
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="font-raleway text-sm font-bold uppercase text-gray-600">
              tints
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-lg">
            {session ? (
              <>
                <input
                  type="text"
                  className="block w-full rounded-md border-2 border-transparent bg-secondary p-2.5 text-sm text-white outline-none transition-all duration-150 ease-linear focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Name your palette ✨"
                  required
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={() => handleSave()}
                  className="my-3 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  Save palette
                </button>
                <button
                  type="submit"
                  onClick={() => handleDownload()}
                  className="my-3 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  Download
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  Sign in with Google
                </button>
                <button
                  type="button"
                  onClick={() => signIn("github")}
                  className="my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  Sign in with GitHub
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Generate;
