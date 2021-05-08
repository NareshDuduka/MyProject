import { API } from "../config";

export const createVegetable = (userId, token, vegetable) => {
    return fetch(`${API}/vegetables/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: vegetable
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};