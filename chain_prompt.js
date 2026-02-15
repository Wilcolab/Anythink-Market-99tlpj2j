// Step 1: Write a function that generates a random integer between two values.
// Step 2: Use the generated integer to create an array of random integers of that length.
// Step 3: Find the average of the numbers in the array.

function randomIntBetween(min, max) {
	if (typeof min !== 'number' || typeof max !== 'number') return NaN;
	if (!Number.isFinite(min) || !Number.isFinite(max)) return NaN;
	const lo = Math.ceil(Math.min(min, max));
	const hi = Math.floor(Math.max(min, max));
	if (lo > hi) return NaN;
	return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

// Example
console.log('randomIntBetween(1, 6):', randomIntBetween(1, 6));

// Export for reuse (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { randomIntBetween };
}

function randomArrayWithRandomLength(minLen, maxLen, minVal, maxVal) {
	const len = randomIntBetween(minLen, maxLen);
	if (!Number.isInteger(len) || len < 0) return [];
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(randomIntBetween(minVal, maxVal));
	}
	return arr;
}

// Example: pick a random length between 3 and 8, values between 0 and 100
const exampleArray = randomArrayWithRandomLength(3, 8, 0, 100);
console.log('randomArrayWithRandomLength:', exampleArray);

function averageArray(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return NaN;
	let sum = 0;
	for (const v of arr) {
		if (typeof v !== 'number' || !Number.isFinite(v)) return NaN;
		sum += v;
	}
	return sum / arr.length;
}

// Example: average of the generated array
console.log('average of exampleArray:', averageArray(exampleArray));

// Export updated API
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { randomIntBetween, randomArrayWithRandomLength, averageArray };
}
