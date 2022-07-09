import Link from "next/link";
import Image from "next/image";
import { useKBar } from "kbar";

const Header = () => {
  const { query } = useKBar();
  return (
    <header className="my-8">
      <nav className="mx-auto max-w-7xl">
        <ul className="flex items-center justify-between">
          <li className="flex cursor-pointer items-center justify-between transition-all duration-100 ease-linear hover:rotate-[-4deg]">
            <Link href="/">
              <Image src="/colorjar.svg" width={70} height={70} />
            </Link>
          </li>
          <li className="flex items-center">
            <div className="hidden md:block">
              <p>
                <span className="rounded-md bg-card p-1 font-monospace">
                  ctrl
                </span>{" "}
                /{" "}
                <span className="rounded-md bg-card p-1 font-monospace">
                  cmd
                </span>{" "}
                +{" "}
                <span className="rounded-md bg-card p-1 font-monospace">k</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => query.toggle()}
              className="mx-3 max-w-sm rounded-xl bg-card p-4 text-left transition-all duration-100 ease-linear hover:rotate-[-4deg] hover:scale-105 hover:bg-gray-800"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
              >
                <path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
