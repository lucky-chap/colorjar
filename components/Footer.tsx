import Link from "next/link";
import Image from "next/image";

const navigation = {
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/hunchodotdev",
      icon: (props: any) => (
        <svg
          className={`h-7 w-7 transform transition hover:rotate-[-4deg] ${props.classess}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.31 18.25C14.7819 18.25 17.7744 13.4403 17.7744 9.26994C17.7744 9.03682 17.9396 8.83015 18.152 8.73398C18.8803 8.40413 19.8249 7.49943 18.8494 5.97828C18.2031 6.32576 17.6719 6.51562 16.9603 6.74448C15.834 5.47393 13.9495 5.41269 12.7514 6.60761C11.9785 7.37819 11.651 8.52686 11.8907 9.62304C9.49851 9.49618 6.69788 7.73566 5.1875 5.76391C4.39814 7.20632 4.80107 9.05121 6.10822 9.97802C5.63461 9.96302 5.1716 9.82741 4.75807 9.58305V9.62304C4.75807 11.1255 5.75654 12.4191 7.1444 12.7166C6.70672 12.8435 6.24724 12.8622 5.80131 12.771C6.19128 14.0565 7.87974 15.4989 9.15272 15.5245C8.09887 16.4026 6.79761 16.8795 5.45806 16.8782C5.22126 16.8776 4.98504 16.8626 4.75 16.8326C6.11076 17.7588 7.69359 18.25 9.31 18.2475V18.25Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      name: "GitHub",
      href: "https://github.com/lucky-chap/colorjar",
      icon: (props: any) => (
        <svg
          className={`h-7 w-7 transform transition hover:rotate-[-4deg] ${props.classess}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.75 12C4.75 10.7811 5.05079 9.63249 5.58219 8.62429L4.80156 6.0539C4.53964 5.19151 5.46262 4.44997 6.24833 4.89154L8.06273 5.91125C9.1965 5.17659 10.5484 4.75 12 4.75C13.4526 4.75 14.8054 5.17719 15.9396 5.91278L17.7624 4.8911C18.549 4.45014 19.4715 5.19384 19.2075 6.05617L18.42 8.62837C18.95 9.63558 19.25 10.7828 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ]
};

const Footer = () => {
  return (
    <header className="mt-40">
      <nav className="mx-auto max-w-7xl">
        <ul className="flex flex-col justify-between sm:flex-row sm:items-center">
          <li className="flex cursor-pointer items-center justify-between transition-all duration-100 ease-linear hover:rotate-[-4deg]">
            <Link href="/">
              <Image src="/colorjar.svg" width={70} height={70} />
            </Link>
          </li>
          <li className="flex cursor-pointer items-center justify-between font-raleway text-sm text-gray-600 transition-all duration-100 ease-linear hover:rotate-[-4deg] dark:text-gray-400">
            Created by{" "}
            <span className="mx-1 inline-block underline">
              <a
                href="https://hashnode.com/@quavo"
                target="_blank"
                rel="noreferrer"
              >
                Quavo
              </a>
            </span>
            for the
            <span className="mx-1 inline-block underline">
              <a
                href="https://hashnode.com/@quavo"
                target="_blank"
                rel="noreferrer"
              >
                Hashnode and Planetscalse Hackathon
              </a>
            </span>
          </li>
          <li className="flex items-center">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-gray-600 dark:text-gray-400"
                rel="noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" />
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Footer;
