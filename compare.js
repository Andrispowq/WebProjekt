
var id1;
var id2;

function init()
{
    initialisePage()
}

function initialisePage()
{
    const params = new URLSearchParams(window.location.search)
    id1 = params.get("car_id1")
    id2 = params.get("car_id2")
    if (!id1 || !id2)
    {
        document.getElementById("content").innerHTML = "No car ID found!"
        return
    }

    if(id1 == id2)
    {
        document.getElementById("content").innerHTML = "Car can't be compared with itself!"
        return
    }

    var car1 = null
    var car2 = null
    for (var i = 0; i < cars_data.length && (!car1 || !car2); i++)
    {
        var c = cars_data[i]
        if(c["id"] == id1)
        {
            car1 = c
        }
        else if(c["id"] == id2)
        {
            car2 = c
        }
    }

    if (!car1 || !car2)
    {
        document.getElementById("content").innerHTML = "No car with car ID found!"
        return
    }

    document.getElementById("img1").innerHTML = "<img class='image' src=" + car1["index"] + " alt='Image of the first car'>"
    document.getElementById("img2").innerHTML = "<img class='image' src=" + car2["index"] + " alt='Image of the second car'>"

    const type1 = car1["manufacturer"] + " " + car1["model"] + " " + car1["year"]
    const type2 = car2["manufacturer"] + " " + car2["model"] + " " + car2["year"]
    document.getElementById("type1").innerHTML = "<p>" + type1 + "</p>"
    document.getElementById("type2").innerHTML = "<p>" + type2 + "</p>"

    const desc1 = car1["description"]
    const desc2 = car2["description"]
    document.getElementById("desc1").innerHTML = "<p>" + (desc1 ? desc1 : "No description") + "</p>"
    document.getElementById("desc2").innerHTML = "<p>" + (desc2 ? desc2 : "No description") + "</p>"

    document.getElementById("price1").innerHTML = "<p>" + car1["price"] / 100 + " euros</p>"
    document.getElementById("price2").innerHTML = "<p>" + car2["price"] / 100 + " euros</p>"

    document.getElementById("drive1").innerHTML = "<p>" + getDrive(car1["drive"]) + "</p>"
    document.getElementById("drive2").innerHTML = "<p>" + getDrive(car2["drive"]) + "</p>"

    document.getElementById("fuel1").innerHTML = "<p>" + getFuelType(car1["fuel"]) + "</p>"
    document.getElementById("fuel2").innerHTML = "<p>" + getFuelType(car2["fuel"]) + "</p>"

    document.getElementById("cons1").innerHTML = "<p>" + car1["fuelConsumption"] + " l/100km</p>"
    document.getElementById("cons2").innerHTML = "<p>" + car2["fuelConsumption"] + " l/100km</p>"

    document.getElementById("mil1").innerHTML = "<p>" + car1["mileage"] + " km</p>"
    document.getElementById("mil2").innerHTML = "<p>" + car2["mileage"] + " km</p>"

    document.getElementById("neg1").innerHTML = "<p>" + (car1["negotiable"] ? "yes" : "no") + "</p>"
    document.getElementById("neg2").innerHTML = "<p>" + (car2["negotiable"] ? "yes" : "no") + "</p>"
}

function car1()
{
    window.location.href = "details.html?car_id=" + id1
}

function car2()
{
    window.location.href = "details.html?car_id=" + id2
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
