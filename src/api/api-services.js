const BASE_URL = "https://peaceful-chamber-89886.herokuapp.com/api";

export function getAllusers() {
  return fetch(`${BASE_URL}/users`).then((response) => {
    return response.json();
  });
}
