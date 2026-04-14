import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Esports Analytics Dashboard",
  description: "Real-time esports analytics — tournaments, matches, players, and teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-900 text-white antialiased">
        <Sidebar />
        <main className="ml-64 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
