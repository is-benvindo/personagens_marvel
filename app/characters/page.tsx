"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCharacters } from "../../lib/marvelApi";
import { useFavorites } from "../context/FavoritesContext";
import { motion } from "framer-motion"; // Importa Framer Motion

export default function CharactersPage() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const offset = (page - 1) * limit;

    const loadCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacters(offset, limit);
        setCharacters(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch characters.");
        setLoading(false);
      }
    };

    loadCharacters();
  }, [page]);

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Marvel Characters</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {characters.map((character) => {
          const isFavorite = favorites.some((fav) => fav.id === character.id);

          return (
            <motion.div
              key={character.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => router.push(`/characters/${character.id}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">{character.name}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evita navegação ao clicar no botão
                    toggleFavorite(character);
                  }}
                  className={`p-2 rounded-full transition ${
                    isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controles de Paginação */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50 transition hover:bg-gray-700"
        >
          Previous
        </button>
        <span className="text-gray-800">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-800 text-white px-4 py-2 rounded transition hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}