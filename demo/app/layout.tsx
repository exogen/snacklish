import React from "react";
import { FaGithub, FaMastodon } from "react-icons/fa";
import localFont from "next/font/local";
import { Bebas_Neue, Roboto_Condensed } from "next/font/google";
import type { Viewport } from "next";
import "./global.css";

const snickersFont = localFont({
  src: "../public/snickers.ttf",
  variable: "--snickers-font",
  fallback: ["Impact", "Arial", "sans-serif"],
  display: "swap",
});

const bebasNeueFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--bebas-neue-font",
  fallback: ["Roboto", "Arial", "sans-serif"],
  display: "swap",
});

const robotoCondensedFont = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--roboto-condensed-font",
  fallback: ["Roboto", "Arial", "sans-serif"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 320,
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${snickersFont.variable} ${bebasNeueFont.variable} ${robotoCondensedFont.variable}`}
    >
      <body>
        <main>{children}</main>
        <footer>
          <nav>
            <ul>
              <li>
                <a
                  href="https://hachyderm.io/@exogen"
                  rel="noopener"
                  aria-label="exogen on Hachyderm"
                  title="exogen on Hachyderm"
                >
                  <FaMastodon className="icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/exogen"
                  rel="noopener"
                  aria-label="exogen on GitHub"
                  title="exogen on GitHub"
                >
                  <FaGithub className="icon" />
                </a>
              </li>
              <li>
                <a href="https://www.buymeacoffee.com/mosswood" target="_blank">
                  <img
                    width={136}
                    height={38}
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                    alt="Buy Me A Coffee"
                  />
                </a>
              </li>
            </ul>
          </nav>
          <small>
            Fan project. Not affiliated with Snickers, Mars Inc., or TBWA NY.
            Read about the original flavor{" "}
            <a
              href="https://www.thiagozanato.com/snickers-snacklish"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            ,{" "}
            <a
              href="https://workingnotworking.com/projects/64208-snickers-snacklish"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            , or{" "}
            <a
              href="https://www.nytimes.com/2009/03/03/business/media/03adco.html?smid=url-share"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            .
          </small>
        </footer>
      </body>
    </html>
  );
}
