const BASE_URL = "http://localhost:8000";
const User_BASE_URL = `${BASE_URL}/user`;

const userEndpoints = {
  createUser: `${User_BASE_URL}/createUser`,
  updateUser: `${User_BASE_URL}/updateUser`,
  deleteUser: `${User_BASE_URL}/deleteUser`,
  getUser: `${User_BASE_URL}/getUser`,
};

export { userEndpoints };
