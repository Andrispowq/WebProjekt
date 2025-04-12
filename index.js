
let currentIndex = 0;
        
function nextImage() {
    currentIndex = (currentIndex + 1) % (cars_data.length - 3);
    document.getElementById('discover1').src = cars_data[currentIndex]["index"];
    document.getElementById('discover2').src = cars_data[currentIndex + 1]["index"];
    document.getElementById('discover3').src = cars_data[currentIndex + 2]["index"];
}

function init()
{
    setInterval(nextImage, 5000);
    updateSliderValue(document.getElementById("price").value)
}

function handleSubmit() {
    const email = document.getElementById('mail').value;
    const maxPrice = document.getElementById('price').value;
    const extra = document.getElementById('extra').value;
    const dailyNews = document.querySelector("input[name='news']:checked").value;
    var interests = [];
    const boxes = ["sports", "family", "suv"];
    const checkboxes = boxes.map(box => document.getElementById(box)?.checked ?? false)
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i]) {
            interests.push(boxes[i]);
        }
    }
    const subject = encodeURIComponent('Car Inquiry');
    const body = encodeURIComponent('Max Price: ' + maxPrice + ' euros\n' +
                                 'Receive Daily News: ' + dailyNews + '\n' +
                                 'Looking for: ' + interests.join(', ') + '\n' + 
                                 'Extra: ' + extra + '\n');
    
    const target = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
    console.log(target)
    window.location.href = target;
}

function navigate(target) {
    window.location.href = target
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function updateSliderValue(value) {
    document.getElementById('sliderValue').textContent = value;
}