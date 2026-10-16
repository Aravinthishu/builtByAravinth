import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--display", axes: ["opsz", "wdth"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--body" });

export const metadata = {
  title: "Aravinth Dev Studio | Freelance web and product developer",
  description: "Websites, web applications, SaaS and AI features, built end to end.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
