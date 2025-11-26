// src/app/layout.tsx
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import Navbar from "./Navbar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});
export const metadata = {
  title: "deskio",
  description: "Custom Desk Setup E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.className}>
      <body>
        <div className="flex justify-center text-gray-700 py-2 items-center bg-white border-b border-gray-200 text-xs ">
          <h1 className="text-sm ">
            Enjoy FREE standard delivery on orders over 2000 Rs.{" "}
            <span className="text-orange-400">Shop now</span>
          </h1>
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
