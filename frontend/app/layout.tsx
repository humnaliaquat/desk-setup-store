// src/app/layout.tsx
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import Navbar from "./componenets/layout/Navbar";
import Footer from "./componenets/layout/Footer";

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
        <div className="flex justify-center text-WHITE font-medium py-2.5 items-center bg-orange-400  text-xs ">
          <h1 className="text-sm ">
            ENJOY FREE STANDARD DELIVERY ON ORDERS OVER 2000 RUPEES.{" "}
            <span className="underline">SHOP NOW</span>
          </h1>
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
