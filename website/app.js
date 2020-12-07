// Personal API Key for OpenWeatherMap API
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const API_KEY = "da171268743d0eeb217ae96fcb696a6c";
//date object
const dateObj = new Date();
const date = `${
  dateObj.getMonth() + 1
}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
//DOM element
const zipInput = document.getElementById("zip");
const userResponse = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const dateDOM = document.getElementById("date");
const tempDOM = document.getElementById("temp");
const contentDOM = document.getElementById("content");

/* Function to GET Web API Data*/
const getData = async (BASE_URL, ZIP, API_KEY) => {
  const url = `${BASE_URL}${ZIP},us&appid=${API_KEY} `;
  const res = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const newData = {
        date: date,
        temperature: data.main.temp,
        content: userResponse.value,
      };
      console.log(data);
      return newData;
    })
    .then((newData) => {
      postData("/postData", newData);
      updateUI(newData.date, newData.temperature, newData.content);
      resetInput();
    });
};

//event listener for generate button
function generate() {
  if (zipInput.value === "") {
    alert("Type zipcode and your feeling");
  } else {
    getData(BASE_URL, zipInput.value, API_KEY);
    getAll();
  }
}

//reset input value
function resetInput() {
  zipInput.value = "";
  userResponse.value = "";
}
//addEventListner to generate button
generateBtn.addEventListener("click", generate);

//update DOM element
function updateUI(date, temp, content) {
  dateDOM.textContent = date;
  tempDOM.textContent = temp;
  contentDOM.textContent = content;
}

/* Function to POST data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const res = await response.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

/* Function to GET Project Data */
const getAll = async () => {
  const res = await fetch("http://localhost:5000/all")
    .then((res) => res.json())
    .then((data) => console.log(data));
};
