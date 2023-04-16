const headers = {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

const functionsRoot = `/.netlify/functions`;

const createCar = async (data) => {
  return fetch(`${functionsRoot}/create-car`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const readCar = async (id) => {
  return fetch(`${functionsRoot}/read-car`).then((response) => {
    return response.json();
  });
};

const readAllCars = async () => {
  return fetch(`${functionsRoot}/read-all-cars`).then((response) => {
    return response.json();
  });
};

const updateCar = async (carId, data) => {
  return fetch(`${functionsRoot}/update-car/${carId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

const deleteCar = async (carId) => {
  return fetch(`${functionsRoot}/delete-car/${carId}`, {
    method: "DELETE",
  }).then((response) => {
    return response.json();
  });
};

export {
  createCar,
  readCar,
  readAllCars,
  updateCar,
  deleteCar,
};
