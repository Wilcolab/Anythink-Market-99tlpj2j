// Write an optimized JavaScript function to calculate the factorial of a number using recursion. Ensure that the solution handles edge cases like negative inputs gracefully.

function factorial(n) {
	if (typeof n !== 'number' || !Number.isFinite(n)) return null;
	if (!Number.isInteger(n)) return null; // factorial defined for integers
	if (n < 0) return null; // handle negative inputs gracefully
	if (n === 0) return 1;
	return n * factorial(n - 1);
}

// Examples
console.log(factorial(5));   // 120
console.log(factorial(0));   // 1
console.log(factorial(-1));  // null (negative input)
console.log(factorial(3.5)); // null (non-integer)

// Export for reuse (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { factorial };
}
