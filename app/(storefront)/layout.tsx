import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Navbar />
      <main className=" px-4 sm:px-6 lg:px-8 bg-[#E0E0E0] pt-[80px] h-full w-full flex-grow">
        {children}
      </main>
      <Footer />
    </main>
  );
}
