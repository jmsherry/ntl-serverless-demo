const messageDisplay = document.getElementById("message");
const hwb = document.getElementById("hwb");
const hnb = document.getElementById("hnb");

const functionsRoot = `.netlify/functions/`;
const targetFunction = `hello-world`;
const functionURL = `${functionsRoot}${targetFunction}`;

const callAPI = async (name) => {
  const endpointURL = new URL(location);
  endpointURL.pathname = functionURL;
  if(name) {
    endpointURL.searchParams.set('name', name);
  }
  try {
    const response = await fetch(endpointURL.toString());
    if (!response.ok) throw response;
    const { message } = await response.json();
    console.log(message);
    messageDisplay.textContent = message;
  } catch (err) {
    alert("Error: Check console");
    console.log(err);
  }
};

hwb.addEventListener("click", (e) => {
  callAPI();
});

hnb.addEventListener("click", (e) => {
  callAPI("james");
});
