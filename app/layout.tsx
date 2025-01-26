import React from "react";
import Link from "next/link";
import "./globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";

export const metadata = {
  title: "Marvel App",
  description: "Explore Marvel characters and more!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <FavoritesProvider>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}

const Header = () => (
  <header className="bg-gray-800 text-white py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Marvel App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="hover:underline">
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 text-center">
    <p>© 2025 Marvel App - All rights reserved.</p>
  </footer>
);