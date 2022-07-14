/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */

// @ts-nocheck

import React, { useState, useRef } from "react";
import type { NextPage } from "next";
// import { useRouter } from "next/router";
import { prominent, average } from "color.js";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react";

import Spinner from "../components/icons/spinner";

const Extract: NextPage = () => {
  // const router = useRouter();

  const fileRef = useRef();
  const [image, setImage] = useState<null | string | ArrayBuffer>(null);
  const [colors, setColors] = useState<string[]>();
  const [paletteName, setPaletteName] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [averageColor, setAverageColor] = useState<null | boolean>(null);
  const { data: session } = useSession();

  const handleImageChange = () => {
    const file: File = fileRef?.current?.files[0];
    if (file) {
      const reader = new FileReader();
      // eslint-disable-next-line func-names
      reader.addEventListener("load", function () {
        setImage(this.result);
        prominent(this.result, {
          format: "hex",
          amount: 6
        }).then((allColors) => setColors(allColors));
        average(this.result).then((color) =>
          setAverageColor(`rgba(${color.join(",")}, .6)`)
        );
      });
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setAverageColor(false);
      setColors([]);
    }
  };

  const fileTemplate = `
const palette = {
	type: "extracted",
  name: "${paletteName}",
  average: "${averageColor}",
  extracted: ${JSON.stringify(colors)}
}
    `;

  const handleSave = async () => {
    if (colors !== undefined) {
      setRequesting(true);

      if (paletteName.trim().length !== 0) {
        try {
          await fetch("/api/palettes/extracted", {
            method: "POST",
            body: JSON.stringify({
              type: "extracted",
              name: paletteName,
              average: averageColor,
              extracted: colors
            })
          }).then((res) => {
            if (res.ok) {
              setRequesting(false);
              toast.success("Palette saved 👌");
            } else {
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
      toast.error("Select an image 🖼️");
    }
  };

  const handleDownload = () => {
    if (colors !== undefined) {
      setRequesting(false);
      if (paletteName.trim().length !== 0) {
        const file = new File(
          [fileTemplate],
          `${Date.now()}-colorjar-extracted.js`,
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
      toast.error("Select an image 🖼️");
    }
  };

  return (
    <main className="">
      <section className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-center font-raleway text-4xl font-bold sm:text-5xl">
          Extract Colors
        </h2>
        <p className="text-center font-medium text-gray-400">
          Extract colors from uploaded images{" "}
          <span aria-label="image icon" role="img">
            🖼️
          </span>{" "}
          You can see an example with the below image
        </p>
        <div className="mx-auto mt-10 items-start justify-end">
          <div className="mx-auto max-w-lg">
            <div className="w-full rounded-xl bg-gray-800 p-4 text-left">
              {image ? (
                <img
                  src={image ?? (image as string)}
                  alt="uploaded"
                  className="w-full max-w-full object-cover"
                />
              ) : (
                <>
                  <img
                    src="/upload.png"
                    alt="upload mew"
                    className="w-full max-w-full object-cover"
                  />
                  {/* <p className="text-center text-sm">Upload an image</p> */}
                </>
              )}
            </div>
            <button
              type="button"
              className="my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileRef}
                />
                <span>Upload image</span>
              </label>
            </button>
          </div>

          <div className="my-8 mx-auto max-w-lg">
            {/* <h3 className="font-raleway text-2xl font-semibold sm:text-3xl">
              Extracted
            </h3> */}
            <div
              className={`my-7 ${
                image ? "block" : "hidden"
              } rounded-md bg-secondary p-3 shadow-md`}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="h-10 w-full cursor-pointer bg-primary" />
                {colors?.map((extracted) => (
                  <div
                    key={Math.random() * 34}
                    className="h-10 w-full cursor-pointer bg-primary"
                    style={{
                      backgroundColor: extracted
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

export default Extract;
