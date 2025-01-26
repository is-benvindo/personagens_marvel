import md5 from "md5";

const BASE_URL = "https://gateway.marvel.com/v1/public";
const PUBLIC_KEY = "7d5bbf75938b1dc25e95385f22474ad2";
const PRIVATE_KEY = "3279838234e83a57cc012bb5ee24dffdbafa819d";

/**
 * Gera os parâmetros necessários de autenticação para a API da Marvel.
 * @returns Um objeto contendo ts, apikey e hash.
 */
const generateAuthParams = () => {
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

  return {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash,
  };
};

/**
 * Busca personagens da API da Marvel.
 * @param offset - A posição inicial para buscar os personagens.
 * @param limit - O número máximo de personagens a serem buscados.
 * @returns Uma lista de personagens.
 */
export const fetchCharacters = async (offset = 0, limit = 20) => {
  const { ts, apikey, hash } = generateAuthParams();
  const url = `${BASE_URL}/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data = await response.json();
  return data.data.results; 
};

/**
 * Busca os detalhes de um personagem específico pelo ID.
 * @param id - O ID do personagem a ser buscado.
 * @returns Os detalhes do personagem.
 */
export const fetchCharacterDetails = async (id: string) => {
  const { ts, apikey, hash } = generateAuthParams();
  const url = `${BASE_URL}/characters/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for character with ID ${id}`);
  }

  const data = await response.json();
  return data.data.results[0];
};