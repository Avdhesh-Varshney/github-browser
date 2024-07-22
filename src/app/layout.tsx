import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./Context/store";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "GitHub Browser",
  description: "GitHub Browser Application is a web app simplifying discovery of GitHub users and repositories. It enables keyword-based user searches, detailed profiles, repository exploration, issue tracking, and personalized recommendations. With bookmarking, activity feeds, and comparisons, it's a versatile tool for GitHub users.",
  icons: {
    icon: 'github.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.className} h-full flex flex-col`}>
        <GlobalContextProvider>
          <Navbar />

          <div className="flex-1 w-full max-w-7xl mx-auto">
            {children}
          </div>

          <Footer />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
