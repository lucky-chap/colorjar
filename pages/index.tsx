/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="mx-auto my-14 max-w-5xl p-2 text-left sm:text-center md:my-20 md:p-4">
      <span className="rounded-full bg-accent/20 px-2 py-1 text-xs font-semibold uppercase text-accent">
        introducing colorjar
      </span>
      <h3 className="m-0 mt-5 text-4xl font-extrabold leading-10 tracking-tighter sm:text-5xl md:text-7xl">
        A set of helpful tools for{" "}
        <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          manipulating
        </span>{" "}
        colors
      </h3>
      <section className="mx-auto my-12 max-w-lg">
        <img
          src="/bucket.png"
          alt="Paint bucket"
          className="w-full max-w-full"
        />
      </section>
      <section className="mx-auto box-border grid items-center justify-around gap-5 align-middle sm:grid-cols-2 md:grid-cols-3">
        <div className="mx-3 max-w-sm rounded-xl bg-card p-4 text-left sm:p-7">
          <h3 className="mb-2 font-raleway text-4xl font-bold sm:text-lg">
            Grayscales
          </h3>
          <p className="font-medium text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
          {/* <img src="/bucket.png" alt="Paint bucket" className="mx-auto" /> */}
        </div>
        <div className="mx-3 max-w-sm rounded-xl bg-card p-4 text-left sm:p-7">
          <h3 className="mb-2 font-raleway text-4xl font-bold sm:text-lg">
            Grayscales
          </h3>
          <p className="font-medium text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
          {/* <img src="/bucket.png" alt="Paint bucket" className="mx-auto" /> */}
        </div>
        <div className="mx-3 max-w-sm rounded-xl bg-card p-4 text-left sm:p-7">
          <h3 className="mb-2 font-raleway text-4xl font-bold sm:text-lg">
            Grayscales
          </h3>
          <p className="font-medium text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
          {/* <img src="/bucket.png" alt="Paint bucket" className="mx-auto" /> */}
        </div>
        <h2 className="font-raleway text-3xl font-bold tracking-wider">
          Grayscales
        </h2>
      </section>
    </main>
  );
};

export default Home;
