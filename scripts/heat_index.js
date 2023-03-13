function calculate() {
    const tempCelsius = document.getElementById("temp").value;
    const humid = document.getElementById("humid").value;
  
    const tempFahrenheit = tempCelsius * 9/5 + 32;

    const c1 = -42.379;
    const c2 = 2.04901523;
    const c3 = 10.14333127;
    const c4 = -0.22475541;
    const c5 = -0.00683783;
    const c6 = -0.05481717;
    const c7 = 0.00122874;
    const c8 = 0.00085282;
    const c9 = -0.00000199;
  
    const heatIndex = c1 + (c2 * temp) + (c3 * humid) + (c4 * temp * humid) + (c5 * temp * temp) + (c6 * humid * humid) + (c7 * temp * temp * humid) + (c8 * temp * humid * humid) + (c9 * temp * temp * humid * humid);
  
    document.getElementById("result").innerHTML = "The Heat Index is: " + heatIndex.toFixed(2) + "°F";
  }
  