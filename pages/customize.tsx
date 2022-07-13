/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";
import type { NextPage } from "next";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { ChromePicker } from "react-color";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

const Customize: NextPage = () => {
  const router = useRouter();
  const [initialColor, setColor] = useState("#3799A0");
  const [colors, setColors] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState("");

  const { data: session } = useSession();

  const fileTemplate = `
const palette = {
  type: "custom",
  "name" "${paletteName}",
  colors: ${JSON.stringify(colors)}
}
`;

  const handleDownload = () => {
    const file = new File([fileTemplate], `${Date.now()}-colorjar-custom.js`, {
      type: "application/javascript;charset=utf-8"
    });
    saveAs(file);
  };

  const handleSave = async () => {
    try {
      await fetch("/api/palettes/customized", {
        method: "POST",
        body: JSON.stringify({
          type: "custom",
          name: paletteName,
          colors
        })
      }).then((res) => {
        if (res.ok) {
          router.push("/palettes/custom");
          alert("Added successfully");
        } else {
          alert("Error adding");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddColor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setColors([e.currentTarget.value, ...colors]);
  };

  const handleColorChange = (color: any) => {
    // always use only the HEX value of the color
    // react-color also allows you to use the rgba or hsla values too
    setColor(color.hex);
  };

  return (
    <main className="">
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-center font-raleway text-4xl font-bold sm:text-5xl">
          Customize Colors
        </h2>
        <p className="text-center font-medium text-gray-400">
          You can also select individual colors for a palette{" "}
          <span aria-label="image icon" role="img">
            👌
          </span>{" "}
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
                onChange={handleColorChange}
              />
            </div>
            <button
              type="button"
              disabled={colors.length === 10}
              value={initialColor}
              onClick={(e) => handleAddColor(e)}
              className={`my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 ${
                colors.length === 10 && "cursor-not-allowed"
              }`}
            >
              Add color to palette
            </button>
            <span className="block text-center text-xs text-gray-400">
              <span>💡</span> Add up to 10 colors
            </span>
          </div>

          <div className="my-8 mx-auto max-w-lg">
            <div
              className={`my-7 ${
                colors.length ? "block" : "hidden"
              } rounded-md bg-secondary p-3 shadow-md`}
            >
              <div className="flex flex-col sm:flex-row">
                {colors?.map((customColor) => (
                  <div
                    key={Math.random() * 34}
                    className="h-10 w-full cursor-pointer bg-primary"
                    style={{
                      backgroundColor: customColor
                    }}
                  />
                ))}
              </div>
            </div>
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
                  disabled={colors.length !== 10}
                  onClick={() => handleSave()}
                  className="my-3 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                  Save palette
                </button>
                <button
                  type="submit"
                  disabled={colors.length !== 10}
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

export default Customize;
