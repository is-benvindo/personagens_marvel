"use client";

import React from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-center mt-10 text-gray-700">No favorites yet.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((character) => (
          <div
            key={character.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">{character.name}</h2>
              <button
                onClick={() => toggleFavorite(character)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}