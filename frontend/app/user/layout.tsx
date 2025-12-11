// app/user/layout.tsx
import "@/app/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/app/componenets/userLayout/Navbar";
import Footer from "@/app/componenets/userLayout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={jakarta.className}>
      <div>
        {/* Optional top banner */}
        <div className="flex justify-center text-white font-medium py-2.5 items-center bg-orange-400 text-xs">
          <h1 className="text-sm">
            ENJOY FREE STANDARD DELIVERY ON ORDERS OVER 2000 RUPEES.{" "}
            <span className="underline">SHOP NOW</span>
          </h1>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        {children}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
