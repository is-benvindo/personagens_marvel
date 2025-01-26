import { fetchCharacterDetails } from "@/lib/marvelApi";

export default async function CharacterDetailsPage({ params }: { params: { id: string } }) {
  try {
    const character = await fetchCharacterDetails(params.id);

    if (!character) {
      return <div className="text-center mt-6 text-red-500">Character not found</div>;
    }

    return (
      <div className="max-w-4xl mx-auto mt-6 bg-white shadow-lg p-6 rounded-lg">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h1 className="text-4xl font-bold mt-4 text-gray-800">{character.name}</h1>
        <p className="mt-2 text-gray-600">
          {character.description || "No description available."}
        </p>
        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Series</h2>
        {character.series.items.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-700">
            {character.series.items.map((series: { resourceURI: string; name: string }) => (
              <li key={series.resourceURI}>{series.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No series available for this character.</p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center mt-6 text-red-500">
        An error occurred while fetching character details.
      </div>
    );
  }
}