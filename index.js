
var cars_data = null;

const database = "./cars.json";
loadFile(database).then(data => {
    cars_data = data

    /*document.getElementById("discover1").src = getRandomElement(cars_data)["index"]
    document.getElementById("discover2").src = getRandomElement(cars_data)["index"]
    document.getElementById("discover3").src = getRandomElement(cars_data)["index"]*/
});

updateSliderValue(document.getElementById("price").value)

function navigate(target) {
    window.location.href = target
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

async function loadFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not load the JSON file:", error);
    }
}

function updateSliderValue(value) {
    document.getElementById('sliderValue').textContent = value;
}