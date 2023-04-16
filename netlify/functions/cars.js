const {
  getCars,
  addCar,
  updateCar,
  removeCar,
} = require("../../api/controllers/car.controller");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  console.log("qs params", event.queryStringParameters);
  switch (event.httpMethod) {
    case "GET":
      return getCars(event, context);
    case "POST":
      return addCar(event, context);
    case "PUT":
      return updateCar(event, context);
    case "DELETE":
      return removeCar(event, context);
  }
  // try {
  //   const subject = event.queryStringParameters.name || 'World'
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: `Hello ${subject}` }),
  //     // // more keys you can return:
  //     // headers: { "headerName": "headerValue", ... },
  //     // isBase64Encoded: true,
  //   }
  // } catch (error) {
  //   return { statusCode: 500, body: error.toString() }
  // }
};

module.exports = { handler };
