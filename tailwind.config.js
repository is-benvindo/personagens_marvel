/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Diretório App Router
    "./components/**/*.{js,ts,jsx,tsx}", // Diretório para componentes reutilizáveis (se criado)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};