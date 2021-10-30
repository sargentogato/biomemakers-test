import { callingData } from "./API.js";

let allSamples;
let clickedElemet;
let currentElement = null;

const btnGetInfo = document.getElementById("btnGetInfo");
const mainContainer = document.getElementById("container");

/* 
  Calling the API
*/
btnGetInfo.addEventListener("click", () => {
  callingData().then((res) => {
    allSamples = res;
    const clientName = allSamples.results[0].client_id;
    drawInfo(clientName);
  });
});

/* 
  Display information from back  
*/
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

/*
  Listen all li items and call getElementClicked function
*/
function listenItems() {
  const elements = document.querySelectorAll("li");

  for (let element of elements) {
    element.addEventListener("click", (event) => {
      clickedElemet = event;
      getElementClicked();
    });
  }
}

/* 
  Get the element was clicked and find it its index to asign it to infoSamples, and call displayInfoSample to display the card with the information.
*/
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

/* 
  Delete every card showd. Create the elements to display and this to the DOM. As weel asign an event to the close button. 
*/
function displayInfoSample(infoToDisplay) {
  if (currentElement) {
    deleteElement();
  }
  const item = document.getElementById(`${clickedElemet.target.id}`);
  currentElement = item;

  const boxData = document.createElement("div");
  const data = `
    <div onclick="event.stopPropagation()" class="dropdown-content">
      <div class="close" id="close"><span>X</span></div>
      <p><span>Name:</span>${infoToDisplay.name}</p>
      <p><span>Date:</span>${infoToDisplay.date}</p>
      <p><span>Sample Type ID:</span>${infoToDisplay.sampletype_id}</p>
      <p><span>variety:</span>${infoToDisplay.variety}</p>
      <p><span>Num Stage:</span>${infoToDisplay.analysis_status.num_stages}</p>
      <p><span>Stage IDX:</span>${infoToDisplay.analysis_status.stage_idx}</p>
      <p><span>Stasge Code: </span>${infoToDisplay.analysis_status.stage_code}</p>
    </div>
  `;
  boxData.insertAdjacentHTML("beforeend", data);
  item.appendChild(boxData);

  document.getElementById("close").addEventListener("click", () => {
    deleteElement();
  });
}

/* 
  Delete cards when it is triguer opening another card or clicking on the close button
*/

function deleteElement() {
  currentElement.removeChild(currentElement.firstElementChild);
  currentElement = null;
}
