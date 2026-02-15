// Example 1: Convert Celsius to Fahrenheit
// function celsiusToFahrenheit(celsius) {
//   return (celsius * 9/5) + 32;
// }
// Example 2: Convert kilometers to miles
// function kilometersToMiles(kilometers) {
//   return kilometers * 0.621371;
// }
// Now, write a function to convert grams to ounces

function gramsToOunces(grams) {
	if (typeof grams !== 'number' || !Number.isFinite(grams)) return NaN;
	// 1 gram = 0.03527396195 ounces
	return grams * 0.03527396195;
}

// Example
console.log(gramsToOunces(100)); // ~3.527396195

// Export for reuse (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { gramsToOunces };
}
