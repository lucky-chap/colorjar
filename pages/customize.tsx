/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";
import type { NextPage } from "next";
import { ChromePicker } from "react-color";
// import { saveAs } from "file-saver";

const Customize: NextPage = () => {
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
            <div className="w-full rounded-xl bg-gray-800 p-7 text-left">
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
              />
            </div>
            <button
              type="button"
              className="my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Add color to palette
            </button>
          </div>

          <div className="my-8 mx-auto max-w-lg">
            <div className="mt-7 mb-2 rounded-md bg-secondary p-3 shadow-md">
              <div className="flex flex-col sm:flex-row">
                <div className="h-10 w-full cursor-pointer bg-primary" />
                <div className="h-10 w-full cursor-pointer bg-green-500" />
                <div className="h-10 w-full cursor-pointer bg-white" />
                <div className="h-10 w-full cursor-pointer bg-blue-500" />
                <div className="h-10 w-full cursor-pointer bg-purple-500" />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-lg">
            <input
              type="text"
              className="block w-full rounded-md border-2 border-transparent bg-secondary p-2.5 text-sm text-white outline-none transition-all duration-150 ease-linear focus:border-blue-500 focus:ring-blue-500"
              placeholder="Name your palette ✨"
              required
            />
            <button
              type="button"
              className="my-3 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Save palette
            </button>
            <button
              type="button"
              className="my-3 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Customize;
