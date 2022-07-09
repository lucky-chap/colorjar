/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";

const Extract: NextPage = () => {
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
            <div className="w-full rounded-xl bg-card p-4 text-left">
              <img
                src="/banner.jpg"
                alt="uploaded"
                className="w-full max-w-full object-cover"
              />
            </div>
            <button
              type="button"
              className="my-3 mr-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Upload new image
            </button>
          </div>

          <div className="my-8 mx-auto max-w-lg">
            {/* <h3 className="font-raleway text-2xl font-semibold sm:text-3xl">
              Extracted
            </h3> */}
            <div className="my-7 rounded-md bg-secondary p-3 shadow-md">
              <div className="flex flex-col sm:flex-row">
                <div className="h-10 w-full cursor-pointer bg-primary" />
                <div className="h-10 w-full cursor-pointer bg-green-500" />
                <div className="h-10 w-full cursor-pointer bg-white" />
                <div className="h-10 w-full cursor-pointer bg-blue-500" />
                <div className="h-10 w-full cursor-pointer bg-purple-500" />
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-lg">
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

export default Extract;
