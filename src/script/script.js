import { API_TOKEN } from "./token.js";

let CLIENT_ID = {};
const URL_BASE =
  "https://api-sandbox.biomemakers.com/v1/clients/CHA/products/becrop/samples";

const getInfo = document.getElementById("btnGetInfo");
const mainContainer = document.getElementById("main");
const myHeader = new Headers();

window.addEventListener("load", getClientParcels);
getInfo.addEventListener("click", () => {
  console.log(CLIENT_ID.results);
});

function getClientParcels() {
  callingData(URL_BASE);
}

function callingData(DATA_API) {
  myHeader.append(
    "Authorization",
    `Bearer ${API_TOKEN}`,
    "Content-Type",
    "Access-Control-Allow-Origin",
    "*"
  );

  const data = fetch(DATA_API, {
    headers: myHeader,
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      //switch para códigos de error
      console.log("RESPUESTA:", response);
      CLIENT_ID = response;
    });
}
