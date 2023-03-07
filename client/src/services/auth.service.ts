import axios from "axios";
import { userEndpoints } from "../utilities/enspoints.utility";

const baseURL = "https://rickandmortyapi.com/api/";
const characterURL = baseURL + "character/";

const getMorty = () => {
  return fetch(characterURL + "?name=morty")
    .then((res) => res.json())
    .then((res) => res.results[0]);
};

// given an email and password make a get request to the backend to get the user
// if the user exists return the user
// if the user does not exist return null
const getUser = async (user) => {
  console.log(user);
  const response = await axios.post(userEndpoints.getUser, user);
  return response.data;
};

export { getMorty, getUser };
