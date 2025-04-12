
var cars_data = null;
load();

function load() {
    const database = "cars.json";
    if(cars_data == null) {
        loadFile(database).then(data => {
            cars_data = data
            init();
        })
        .catch(error => console.error('Error:', error));
    }
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

function getDrive(drive)
{
    switch(drive)
    {
        case 0: return "Front Wheel";
        case 1: return "Rear Wheel";
        case 2: return "All Wheel";
        case 3: return "Four Wheel";
        default: return "Unknown";
    }
}

function getFuelType(fuel)
{
    switch(fuel)
    {
        case 0: return "Petrol";
        case 1: return "Diesel";
        case 2: return "Hybrid";
        case 3: return "Electric";
        default: return "Unknown";
    }
}