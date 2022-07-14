/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { ChromePicker } from "react-color";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import Spinner from "../components/icons/spinner";

const CreateGradients: NextPage = () => {
  const [paletteName, setPaletteName] = useState("");
  const [initialColor, setColor] = useState("#3799A0");
  const [requesting, setRequesting] = useState(false);
  const { data: session } = useSession();

  const [fromValue, setFromValue] = useState("");
  const [viaValue, setViaValue] = useState("");
  const [toValue, setToValue] = useState("");

  const [direction, setDirection] = useState("to right");

  const fileTemplate = `
const palette = {
  type: "gradient",
  name: "${paletteName}",
  css: "background-image: linear-gradient(${direction}, ${fromValue}, ${viaValue}, ${toValue})"
}
    `;

  const handleSave = async () => {
    if (
      fromValue.trim().length !== 0 &&
      viaValue.trim().length !== 0 &&
      toValue.trim().length !== 0
    ) {
      setRequesting(true);
      if (paletteName.trim().length !== 0) {
        try {
          await fetch("/api/palettes/gradient", {
            method: "POST",
            body: JSON.stringify({
              type: "gradient",
              name: paletteName,
              direction,
              fromValue,
              viaValue,
              toValue
            })
          }).then((res) => {
            if (res.ok) {
              setRequesting(false);
              toast.success("Palette saved 👌");
            } else {
              setRequesting(false);
              toast.error("There was an error saving ❌");
            }
          });
        } catch (error: any) {
          toast.error(error?.data.message);
        }
      } else {
        setRequesting(false);
        toast.error("Forgot to name it ❓");
      }
    } else {
      setRequesting(false);
      toast.error("All fields are required ❌");
    }
  };

  const handleDownload = () => {
    if (
      fromValue.trim().length !== 0 &&
      viaValue.trim().length !== 0 &&
      toValue.trim().length !== 0
    ) {
      if (paletteName.trim().length !== 0) {
        const file = new File(
          [fileTemplate],
          `${Date.now()}-colorjar-gradient.js`,
          {
            type: "application/javascript;charset=utf-8"
          }
        );
        toast.success("Download successful 🚀✨");
        saveAs(file);
      } else {
        toast.error("Forgot to name it ❓");
      }
    } else {
      setRequesting(false);
      toast.error("All fields are required ❌");
    }
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
          Create Gradients
        </h2>
        <p className="text-center font-medium text-gray-400">
          Gradients! So much fun{" "}
          <span aria-label="image icon" role="img">
            🌈
          </span>{" "}
        </p>
        <div className="mx-auto mt-10 items-start justify-end">
          <div className="mx-auto max-w-lg">
            <div className="w-full rounded-xl bg-gray-800 p-5 text-left">
              <ChromePicker
                className="w-full"
                color={initialColor}
                onChange={handleColorChange}
              />
            </div>
            <div className="mt-4 flex flex-col flex-wrap items-center justify-between sm:flex-row">
              <input
                type="text"
                className="mb-2 block w-full rounded-md border-2 border-transparent bg-secondary p-2.5 text-sm text-white outline-none transition-all duration-150 ease-linear focus:border-blue-500 focus:ring-blue-500"
                placeholder="From"
                required
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
              />
              <input
                type="text"
                className="mb-2 block w-full rounded-md border-2 border-transparent bg-secondary p-2.5 text-sm text-white outline-none transition-all duration-150 ease-linear focus:border-blue-500 focus:ring-blue-500"
                placeholder="Via"
                required
                value={viaValue}
                onChange={(e) => setViaValue(e.target.value)}
              />
              <input
                type="text"
                className="mb-2 block w-full rounded-md border-2 border-transparent bg-secondary p-2.5 text-sm text-white outline-none transition-all duration-150 ease-linear focus:border-blue-500 focus:ring-blue-500"
                placeholder="To"
                required
                value={toValue}
                onChange={(e) => setToValue(e.target.value)}
              />
            </div>
            {/* <button
              type="button"
              className="my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Add new gradient
            </button> */}

            <div className="mt-2 flex flex-wrap">
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to right top"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to right top
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to right"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to right
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to right bottom"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to right bottom
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to bottom"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to bottom
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to left bottom"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to left bottom
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to left"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to left
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to left top"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to left top
                </label>
              </div>
              <div className="mr-4 mb-3 flex items-center">
                <input
                  type="radio"
                  value="to top"
                  name="inline-radio-group"
                  className="h-4 w-4 text-blue-700 focus:ring-0"
                  onClick={(e) => setDirection(e.currentTarget.value)}
                />
                <label className="ml-2 text-sm font-medium text-gray-400">
                  to top
                </label>
              </div>
            </div>
          </div>

          <div className="my-8 mx-auto max-w-lg">
            <div className="mx-auto mt-7 mb-2 h-52 w-full rounded-md bg-secondary p-3 shadow-md">
              <div className="flex h-full">
                {/* Gradient */}
                <div
                  className="background-animate h-full w-full cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(${direction}, ${fromValue}, ${viaValue}, ${toValue})`
                  }}
                />
                {/* Gradient */}
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
                  disabled={requesting}
                  onClick={() => handleSave()}
                  className={`my-3 mr-2 flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 ${
                    requesting ? "cursor-not-allowed" : ""
                  }`}
                >
                  {requesting ? (
                    <>
                      <Spinner /> <span>Saving</span>
                    </>
                  ) : (
                    <span>Save palette</span>
                  )}
                </button>
                <button
                  type="submit"
                  onClick={() => handleDownload()}
                  className="my-3 mr-2 rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
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

export default CreateGradients;
