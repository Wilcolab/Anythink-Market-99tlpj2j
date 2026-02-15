// Write a function in JavaScript that takes a string and reverses it.

function reverseString(s) {
	if (typeof s !== 'string') return '';
	return s.split('').reverse().join('');
}

// Example
console.log(reverseString('hello')); // "olleh"
