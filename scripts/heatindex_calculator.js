// heatindex.js
const heatIndex = calculateHeatIndex(temperature, humidity);

function calculateHeatIndex(temperature, humidity) {

    // Check if temperature or humidity is not a number
    if (isNaN(temperature) || isNaN(humidity)) {
        return "Invalid input";
    }

    // Convert temperature to Fahrenheit
    const tempF = temperature * 1.8 + 32;
    console.log("tempF is " + tempF);
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