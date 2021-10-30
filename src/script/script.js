import { callingData } from "./API.js";

let allSamples;
let clickedElemet;
let currentElement = null;

const btnGetInfo = document.getElementById("btnGetInfo");
const mainContainer = document.getElementById("container");

btnGetInfo.addEventListener("click", () => {
  callingData().then((res) => {
    allSamples = res;
    const clientName = allSamples.results[0].client_id;
    drawInfo(clientName);
  });
});

function drawInfo(clientName) {
  mainContainer.innerHTML = "";
  mainContainer.classList.replace("container", "newClass");

  const boxTitle = document.createElement("div");
  boxTitle.classList.add("boxTitle");
  const titleData = `
    <h1>${clientName}</h1>
  `;
  boxTitle.insertAdjacentHTML("beforeend", titleData);
  mainContainer.appendChild(boxTitle);

  const container = document.createElement("div");
  container.classList.add("container__box-info");

  const samples = allSamples.results;

  let idNumber = 0;
  samples.forEach((sample) => {
    idNumber++;
    const dataHTML = `
      <li id="${idNumber}" class="sample">${sample.name}</li>
    `;
    container.insertAdjacentHTML("beforeend", dataHTML);
  });

  mainContainer.appendChild(container);

  listenItems();
}

function listenItems() {
  const elements = document.querySelectorAll("li");

  for (let element of elements) {
    element.addEventListener("click", (event) => {
      clickedElemet = event;
      getElementClicked();
    });
  }
}

function getElementClicked() {
  let infoSample;
  const samples = allSamples.results;

  for (let sample of samples) {
    if (sample.name === clickedElemet.target.innerText) {
      infoSample = sample;
    }
  }

  return displayInfoSample(infoSample);
}

function displayInfoSample(infoToDisplay) {
  console.log("ELEME:", currentElement);
  if (currentElement) {
    deleteElement();
  }
  const item = document.getElementById(`${clickedElemet.target.id}`);
  currentElement = item;

  const boxData = document.createElement("div");
  const data = `
    <div onclick="event.stopPropagation()" class="dropdown-content">
      <div class="close" id="close"><span>X</span></div>
      <p><b>Name:</b>${infoToDisplay.name}</p>
      <p><b>Date:</b>${infoToDisplay.date}</p>
      <p><b>Parcel Number:</b>${infoToDisplay.parcel_id}</p>
    </div>
  `;
  boxData.insertAdjacentHTML("beforeend", data);
  item.appendChild(boxData);

  document.getElementById("close").addEventListener("click", () => {
    deleteElement();
    console.log("SEGUNDA");
  });
}

function deleteElement() {
  currentElement.removeChild(currentElement.firstElementChild);
  currentElement = null;
}
