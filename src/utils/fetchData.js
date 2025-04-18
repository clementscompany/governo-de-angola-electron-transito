import { API_URL } from "../env.js";

export default function fetchApi({ uri, data, method}) {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${uri}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return reject(new Error("Erro na requisição http"));
        }
        return response.json();
      })
      .then((data)=>{
        resolve(data);
      })
      .catch((error)=>{
        reject(error);
      });
  });
}
