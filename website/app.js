// Personal API Key for OpenWeatherMap API

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

//event listener for generate button
function generate() {
  if (zipInput.value === "") {
    alert("Type zipcode and your feeling");
  } else {
    const newData = {
      date: date,
      content: userResponse.value,
      zip: zipInput.value,
    };
    postData("http://localhost:5000/postData", newData);
    getAll(newData.date, newData.content);
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
const getAll = async (date, content) => {
  const res = await fetch("http://localhost:5000/all")
    .then((res) => res.json())
    .then((data) => {
      updateUI(date, data.main.temp, content);
      resetInput();
    });
};
