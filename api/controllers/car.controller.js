const dbConnect = require("../db");
const Car = require("../models/car.model");

const getIDFromURL = (url = "") => url.split("/").at(-1);

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

exports.getCars = async (event, context) => {
  let query = {};
  const id = getIDFromURL(event.path);
  console.log(id);
  if (id) {
    query._id = id;
  }

  try {
    await dbConnect();
    const cars = await Car.find(query);
    return {
      statusCode: 200,
      body: JSON.stringify(cars),
      headers,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
      headers,
    };
  }
};

exports.addCar = async (event, context) => {
  // const carData = JSON.parse(event.body);
  const carData = event.body;
  console.log("carData", carData);
  if (carData.avatar_url === "") {
    delete carData.avatar_url;
  }
  console.log(carData);
  try {
    await dbConnect();
    const newCar = new Car(carData);
    const result = await newCar.save();
    return {
      statusCode: 201,
      body: JSON.stringify(result),
      headers,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
      headers,
    };
  }
};

exports.updateCar = async (event, context) => {
  const id = getIDFromURL(event.path);
  // const updates = JSON.parse(event.body);
  const updates = event.body;
  console.log("updates", updates);
  try {
    await dbConnect();
    const result = await Car.updateOne({ _id: id }, updates);
    if (result.n === 0) return context.sendStatus(404);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
      headers,
    };
  }
};

exports.removeCar = async (event, context) => {
  const id = getIDFromURL(event.path);
  try {
    await dbConnect();
    const result = await Car.deleteOne({ _id: id });
    if (result.n === 0) {
      return {
        statusCode: 404,
      };
    }
    return {
      statusCode: 204,
      // headers,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
      headers,
    };
  }
};
