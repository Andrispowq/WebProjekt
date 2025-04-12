
function init()
{
    generateTable()
}

function generateTable() {
    const cars = query(cars_data, selectCar)
    const rows = Math.ceil(cars.length / 3.0)
    const cols = 3

    var table = document.getElementById("car-container")

    var html = ""
    for (var row = 0; row < rows; row++)
    {
        for (var col = 0; col < cols; col++)
        {
            const idx = row * cols + col
            if(idx >= cars.length)
            {
                html += "<div>\n"
                html += "</div>\n"
            } 
            else
            {
                html += "<div>\n"
                html += getCarHTML(cars[idx])
                html += "</div>\n"
            }
        }
    }

    console.log(html)
    table.innerHTML = html
}

function selectCar(car, idx) 
{
    //Search query
    const searched = document.getElementById("searchbar").value.toLowerCase()
    if(searched != "")
    {
        const manufacturer = car["manufacturer"]
        const make = car["model"]
        const description = car["description"]
        const ownerEmail = car["owner"]["email"]
        const ownerPhone = car["owner"]["phone"]
        const textToSearch = (manufacturer + make + description
                            + ownerEmail + ownerPhone).toLowerCase()
        if(!textToSearch.match(searched))
        {
            return false
        }
    }

    const petrolChecked = document.getElementById("petrol").checked
    const dieselChecked = document.getElementById("diesel").checked
    const hybridChecked = document.getElementById("hybrid").checked
    const electricChecked = document.getElementById("electric").checked

    const oneChecked = petrolChecked || dieselChecked || hybridChecked || electricChecked
    if(oneChecked)
    {
        var canStay = false
        if(petrolChecked && (car["fuel"] == 0)) canStay = true
        else if(dieselChecked && (car["fuel"] == 1)) canStay = true
        else if(hybridChecked && (car["fuel"] == 2)) canStay = true
        else if(electricChecked && (car["fuel"] == 3)) canStay = true

        if(!canStay)
        {
            return false;
        }
    }

    const selectedRadio = document.querySelector("input[name='drive']:checked")
    if (selectedRadio)
    {
        const value = selectedRadio.value
        if(car["drive"] != value)
        {
            return false
        }
    }

    const minValue = document.getElementById("min_val").value
    const maxValue = document.getElementById("max_val").value
    const carValue = car["price"] / 100.0
    if(carValue < minValue || carValue > maxValue)
    {
        return false
    }

    return true;
}

function getCarHTML(car)
{
    const car_id = car["id"]

    var html = "";
    html += "<div class='car-card' style='width: 300px; height: 250px;'>\n"
    html += "<img src='" + car["index"] + "' alt='Car, type is " + car["manufacturer"] + "' style='width: 300px; height: auto;' onclick='carClicked(" + car_id + ");'>\n"
    html += "</div>\n"
    html += "<div class='car-details' style='width: 300px;'>\n"
    html += "<p>" + (car["price"] / 100) + " euros</p>\n"
    html += "<p>" + ((car["description"] == null) ? "No description" : car["description"]) + "</p>\n"
    html += "<p>" + car["owner"]["email"] + "</p>\n"
    html += "<p>" + car["owner"]["phone"] + "</p>\n"
    html += "</div>\n"

    return html
}

function carClicked(id)
{

    window.location.href = "details.html?car_id=" + id
}

function query(cars_data, lambda)
{
    let queried = []

    for (let i = 0; i < cars_data.length; i++)
    {
        if (lambda(cars_data[i], i))
        {
            queried.push(cars_data[i])
        }
    }

    return queried
}
