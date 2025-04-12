
var id;

function init()
{
    initialisePage()
}

function search(query)
{
    var cars = query_cars(cars_data, selectCar, query.toLowerCase())

    var html = ""
    for(let i = 0; i < cars.length; i++)
    {
        const text = cars[i]["manufacturer"] + " "
        + cars[i]["model"] + " " + cars[i]["year"]
        html += "<div class='button-container'>"
        html += "<button onclick='compare(" + cars[i]["id"] + ");'>" + text + "</button>"
        html += "</div>"
    }

    document.getElementById("matching").innerHTML = html
}

function compare(comparison)
{
    window.location.href = "compare.html?car_id1=" + id + "&car_id2=" + comparison
}

function selectCar(car, query) 
{
    if(query == "" || query == null)
    {
        return true;
    }

    const manufacturer = car["manufacturer"]
    const make = car["model"]
    const description = car["description"]
    const ownerEmail = car["owner"]["email"]
    const ownerPhone = car["owner"]["phone"]
    const textToSearch = (manufacturer + make + description
                        + ownerEmail + ownerPhone).toLowerCase()
    if(!textToSearch.match(query))
    {
        return false
    }

    return true
}

function query_cars(cars_data, lambda, query)
{
    let queried = []

    for (let i = 0; i < cars_data.length; i++)
    {
        if (lambda(cars_data[i], query) && cars_data[i]["id"] != id)
        {
            queried.push(cars_data[i])
        }
    }

    return queried
}

function initialisePage()
{
    const params = new URLSearchParams(window.location.search)
    id = params.get("car_id")
    if (!id)
    {
        document.getElementById("content").innerHTML = "No car ID found!"
        return
    }

    var car = null
    for (var i = 0; i < cars_data.length; i++)
    {
        var c = cars_data[i]
        if(c["id"] == id)
        {
            car = c
            break
        }
    }

    if (!car)
    {
        document.getElementById("content").innerHTML = "No car with car ID found!"
        return
    }

    document.getElementById("car").innerHTML = getPage(car)

    search("");
}

function getPage(car)
{
    var html = "<div>"
    html += "<img class='index' src=" + car["index"] + " alt='Image of the car'>"
    html += "</div>"
    html += "<div id='extras'>"

    const extras = car["extras"]
    console.log(extras)
    for (let idx = 0; idx < 2; idx++)
    {
        if(extras != null && idx < extras.length)
        {
            html += "<div class='extra'>"
            const extra = extras[idx]
            console.log(extra)
            if(extra["type"] == "image")
            {
                html += "<img src=" + extra["link"] + " alt='Extra image of the car'>"
            }
            else if(extra["type"] == "video")
            {
                html += "<video width='640' height='auto' controls poster='" + extra["poster"] + "'>"
                html += "<source src='" + extra["link"] + "' type='video/mp4'>"
                html += "Your browser does not support the video tag."
                html += "</video>"
                html += "<p>Click <a href='" + extra["transcript"] + "' target='_blank'>here</a> to view the transcript</p>"
            }
            html += "</div>"
        }
        else
        {
            html += "<div class='extra'>"
            html += "</div>"
        }
    }

    html += "</div>"
    html += "<div>"
    html += "<p>Description: " + (car["description"] == null ? "no description" : car["description"]) + "</p>"
    html += "</div>"
    html += "<div>"
    html += "<p>Price: <strong>" + car["price"] / 100 + " euros</strong></p>"
    html += "<p>Manufacturer: " + car["manufacturer"] + "</p>"
    html += "<p>Model: " + car["model"] + "</p>"
    html += "<p>Year: " + car["year"] + "</p>"
    html += "<p>Drive: " + getDrive(car["drive"]) + "</p>"
    html += "<p>Fuel type: " + getFuelType(car["fuel"]) + "</p>"
    html += "<p>Consumption: " + car["fuelConsumption"] + " liters/100km</p>"
    html += "<p>Mileage: " + car["mileage"] + " miles</p>"
    html += "<p>Negotiable: <strong>" + (car["negotiable"] ? "yes" : "no") + "</strong></p>"
    html += "<p>Phone number: " + car["owner"]["phone"] + "</p>"
    html += "<p>E-mail: " + car["owner"]["email"] + "</p>"
    html += "</div>"

    return html;
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
