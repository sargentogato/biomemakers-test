import { API_TOKEN } from "./token.js";

const URL_BASE =
  "https://api-sandbox.biomemakers.com/v1/clients/CHA/products/becrop/samples";

const myHeader = new Headers();

function callingData() {
  myHeader.append(
    "Authorization",
    `Bearer ${API_TOKEN}`,
    "Content-Type",
    "Access-Control-Allow-Origin",
    "*"
  );

  return fetch(URL_BASE, {
    headers: myHeader,
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      //switch para códigos de error
      console.log("RESPUESTA:", response);
      return response;
    });
}

export { callingData };
