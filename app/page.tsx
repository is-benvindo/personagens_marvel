export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Welcome to the Marvel App
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore Marvel characters and discover your favorites!
      </p>
      <div>
        <a
          href="/characters"
          className="px-6 py-3 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition"
        >
          Explore Characters
        </a>
      </div>
    </div>
  );
}