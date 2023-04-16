import {
  // createCar,
  // readCar,
  readAllCars,
  // updateCar,
  // deleteCar,
} from "./api/index.js";

const listNode = document.getElementById("list");

const renderCars = (cars = [], DOMNode = listNode) => {
  const frag = document.createDocumentFragment();
  for (const car of cars) {
    const li = document.createElement("li");
    const avatar = document.createElement("img");
    avatar.width = 100;
    avatar.height = 100;
    avatar.src = car.avatar_url;
    li.append(avatar);
    const span = document.createElement("span");
    span.textContent = `${car.name} (${car.bhp})`;
    li.append(span);
    frag.append(li);
  }
  listNode.replaceChildren(frag);
};

const callAPI = async () => {
  try {
    const cars = await readAllCars();
    renderCars(cars);
  } catch (err) {
    alert("Error: Check console");
    console.log(err);
  }
};

callAPI();
