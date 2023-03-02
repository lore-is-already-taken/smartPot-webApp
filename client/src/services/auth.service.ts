const baseURL = "https://rickandmortyapi.com/api/";
const characterURL = baseURL + "character/";

const getMorty = () => {
  return fetch(characterURL + "?name=morty")
    .then((res) => res.json())
    .then((res) => res.results[0]);
};

export default getMorty;
