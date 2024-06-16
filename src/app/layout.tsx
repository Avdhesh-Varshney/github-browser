import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
