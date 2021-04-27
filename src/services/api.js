const BASE_URL = "https://peaceful-chamber-89886.herokuapp.com/api";

export const getUsersApi = () =>{
   return fetch(`${BASE_URL}/comments`);
}
export const addPostApi = (data) => {
    return fetch(`${BASE_URL}/addComment`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
export const removeComentApi = (id) =>{
    return  fetch(`${BASE_URL}/comments/${id}`, {
            method: "DELETE",
        })
}