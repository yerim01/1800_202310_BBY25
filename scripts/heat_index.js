const quotes = [{
    range: [20, 30],
   
    quote: "It's a beautiful day outside!"
},
{
    range: [30, 40],
    quote: "It's getting pretty warm. Drink plenty of water!"
},
{
    range: [40, 50],
    quote: "It's dangerously hot outside. Please stay indoors!"
}
];

function displayHeatIndex() {
    const humidi = localStorage.getItem('humidity');
    const tempera = localStorage.getItem('temperature');
    console.log("temperature is: " + tempera);
    let humd = parseFloat(humidi);
    let temp = parseFloat(tempera);


    const heatIndexNumber = calculateHeatIndex(temp, humd);
    console.log("heatindex is " + heatIndexNumber);
    const heatIndexResultElement = document.getElementById("heatIndexResult");
    // heatIndexResultElement.innerHTML = `${heatIndexNumber}`;
    
    
    // Find the quote that matches the heat index result
    let quote = "";
    for (let i = 0; i < quotes.length; i++) {
        if (heatIndexNumber >= quotes[i].range[0] && heatIndexNumber < quotes[i].range[1]) {
            quote = quotes[i].quote;
            break;
        }
    }

    // Display the quote
    const quoteElement = document.getElementById("quote");
    quoteElement.innerHTML = quote;
   
   //display the gauge
    var gauge = new JustGage({
        id: "heatIndexResult",
        value: heatIndexNumber, // replace with the current heat index value
        min: 20,
        max: 50,
        // title: "Heat Index Number based on your choosen temperature",
        label: "°C",
        decimals: 2,
        gaugeWidthScale: 0.6,
        levelColorsGradient: true,
        // pointer: true,
        pointer: {
            color: "#FF0000" //red color
        },
        pointerOptions: {
            update: function (value) {
                var pin = document.querySelector('.pin');
                var gauge = document.querySelector('.gauge');
                var percent = (value - gauge.getAttribute('data-min')) / (gauge.getAttribute('data-max') - gauge.getAttribute('data-min'));
                var angle = percent * 180;
                pin.style.left = (gauge.offsetWidth / 2) + (Math.sin(angle * Math.PI / 180) * (gauge.offsetHeight / 2 - pin.offsetHeight / 2)) + 'px';
                pin.style.top = (gauge.offsetHeight / 2) - (Math.cos(angle * Math.PI / 180) * (gauge.offsetHeight / 2 - pin.offsetHeight / 2)) + 'px';
            }
        },
        gaugeColor: "#F8F8FF", //white background
        customSectors: [
            {
                color: "#00FF00",
                lo: 20,
                hi: 30,
                label: "Low"
            }, {
                color: "#FFFF00",
                lo: 30,
                hi: 40,
                label: "Medium"
            }, {
                color: "#FF0000",
                lo: 40,
                hi: 50,
                label: "High"
            }],
        showCustomSectorsLabels: true, // display the labels for custom sectors
        // labelFontSize: 20,
        gaugeRadius: 400, // Set the overall size of the gauge
        gaugeWidthScale: 1, // Set the width of the gauge relative to its radius
    });
}


function calculateHeatIndex(temperature, humidity) {

    // Check if temperature or humidity is not a number
    if (isNaN(temperature) || isNaN(humidity)) {
        return "Invalid input";
    }

    // Convert temperature to Fahrenheit
    const tempF = temperature * 1.8 + 32;
    // console.log("tempF is " + tempF);
    // Convert humidity to a decimal
    const relHumidity = humidity / 100;

    // Calculate the heat index
    const hi1 = -42.379;
    const hi2 = 2.04901523 * tempF;
    const hi3 = 10.14333127 * relHumidity;
    const hi4 = -0.22475541 * tempF * relHumidity;
    const hi5 = -0.00683783 * tempF * tempF;
    const hi6 = -0.05481717 * relHumidity * relHumidity;
    const hi7 = 0.00122874 * tempF * tempF * relHumidity;
    const hi8 = 0.00085282 * tempF * relHumidity * relHumidity;
    const hi9 = -0.00000199 * tempF * tempF * relHumidity * relHumidity;

    const heatIndex = hi1 + hi2 + hi3 + hi4 + hi5 + hi6 + hi7 + hi8 + hi9;

    // Convert the heat index to Celsius
    const heatIndexC = (heatIndex - 32) / 1.8;

    // Return the heat index in Celsius
    return heatIndexC.toFixed(2);

}







