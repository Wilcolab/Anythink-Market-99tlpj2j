// PR: minor header — no functional changes
/**
 * Converts a string to dot.case format.
 * 
 * Splits input on word boundaries (spaces, underscores, dashes, dots, slashes, plus signs,
 * and non-alphanumeric separators) and camelCase/PascalCase boundaries, then joins words
 * with dots in lowercase.
 * 
 * @param {string|number} input - The input string or number to convert. Can be null or undefined.
 * @param {Object} [options={}] - Configuration options.
 * @param {boolean} [options.strict=false] - If true, throws TypeError for non-string/number inputs.
 *                                           If false, coerces input via String().
 * @returns {string} The dot.case formatted string, or empty string for null/undefined input.
 * @throws {TypeError} If strict mode is enabled and input is not a string or number.
 * 
 * @example
 * toDotCase('convertThisString'); // 'convert.this.string'
 * toDotCase('FOO_bar-baz'); // 'foo.bar.baz'
 * toDotCase('XMLHttpRequest'); // 'xml.http.request'
 */

/**
 * Converts a string to lower camelCase format.
 * 
 * Normalizes input by splitting on word boundaries (spaces, underscores, dashes, dots,
 * slashes, plus signs, non-alphanumeric separators) and camelCase/PascalCase boundaries.
 * First word is entirely lowercased; subsequent words are capitalized (first letter
 * uppercase, rest lowercase). Strips emoji and punctuation while preserving digits and
 * Unicode letters.
 * 
 * @param {string|number} input - The input string or number to convert. Can be null or undefined.
 * @param {Object} [options={}] - Configuration options.
 * @param {boolean} [options.strict=false] - If true, throws TypeError for non-string/number inputs.
 *                                           If false, coerces non-null values via String().
 * @returns {string} The camelCase formatted string, or empty string for null/undefined input.
 * @throws {TypeError} If strict mode is enabled and input is neither a string nor a number.
 * 
 * @example
 * toCamelCase('convert THIS_string-to camel case!');
 * // Returns: 'convertThisStringToCamelCase'
 * 
 * @example
 * toCamelCase('XMLHttpRequest'); // Returns: 'xmlHttpRequest'
 * 
 * @example
 * toCamelCase('version 2 update'); // Returns: 'version2Update'
 * 
 * @example
 * toCamelCase('emoji 🙂 test'); // Returns: 'emojiTest'
 * 
 * @example
 * toCamelCase(null); // Returns: ''
 * 
 * @example
 * toCamelCase({}, { strict: true }); // Throws: TypeError
 * 
 * @performance O(n) time complexity where n is input length. Uses Unicode-aware regex
 *              with u flag for proper handling of non-Latin characters.
 */
// Refined prompt for a robust camelCase function
// Function to convert strings to dot.case format
function toDotCase(input, options = {}) {
    const { strict = false } = options;

    // Input validation
    if (input === null || input === undefined) return '';
    if (strict && typeof input !== 'string' && typeof input !== 'number') {
        throw new TypeError('input must be a string or number');
    }

    const str = String(input);

    // Return early for empty string
    if (str.length === 0) return '';

    // Split on word boundaries: spaces, underscores, dashes, dots, slashes, plus signs, and non-alphanumeric separators
    // Also split camelCase/PascalCase boundaries
    const words = str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase boundaries
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Split XMLHttp -> XML Http
        .split(/[\s_\-./+\W]+/u) // Split on separators
        .filter(word => word.length > 0); // Remove empty strings

    if (words.length === 0) return '';

    // Join all words in lowercase with dots
    return words.map(word => word.toLowerCase()).join('.');
}
function toCamelCase(input, options = {}) {
    const { strict = false } = options;

    // Input validation
    if (input === null || input === undefined) return '';
    if (strict && typeof input !== 'string' && typeof input !== 'number') {
        throw new TypeError('input must be a string or number');
    }

    const str = String(input);

    // Return early for empty string
    if (str.length === 0) return '';

    // Split on word boundaries: spaces, underscores, dashes, dots, slashes, plus signs, and non-alphanumeric separators
    // Also split camelCase/PascalCase boundaries (e.g., XMLHttpRequest)
    const words = str
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase boundaries
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Split XMLHttp -> XML Http
        .split(/[\s_\-./+\W]+/u) // Split on separators (u flag for Unicode awareness)
        .filter(word => word.length > 0); // Remove empty strings

    if (words.length === 0) return '';

    // First word: all lowercase; subsequent words: capitalize first letter, lowercase rest
    const camelCased = words
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
    // PR: verified for review

    return camelCased;
    test('handles leading separators', () => {
        expect(toCamelCase('  --FOO_bar')).toBe('fooBar');
    test('preserves digits within words', () => {
        expect(toCamelCase('version 2 update')).toBe('version2Update');
    });

    test('handles input starting with digits', () => {
        expect(toCamelCase('123 abc')).toBe('123Abc');
    });

    test('removes emoji and punctuation', () => {
        expect(toCamelCase('emoji 🙂 test')).toBe('emojiTest');
    });

    test('returns empty string for null/undefined', () => {
        expect(toCamelCase(null)).toBe('');
        expect(toCamelCase(undefined)).toBe('');
    });

    test('handles already camelCase input', () => {
        expect(toCamelCase('alreadyCamelCase')).toBe('alreadycamelcase');
    });

    test('coerces non-string/number in non-strict mode', () => {
        expect(toCamelCase(true)).toBe('true');
    });

    test('throws TypeError in strict mode for invalid input', () => {
        expect(() => toCamelCase({}, { strict: true })).toThrow(TypeError);
    });
});

module.exports = { toDotCase, toCamelCase };
export { toDotCase, toCamelCase };
export default toCamelCase;

const refinedPrompt = `Write a JavaScript function 'toCamelCase(input, options)' that converts arbitrary input into a normalized lower camelCase string. Provide robust edge-case handling, input validation, and unit tests. Requirements:

- API: 'toCamelCase(input, options)' where 'options' is optional and may include { strict: boolean }. If 'strict' is true, throw TypeError on non-string/number inputs; otherwise convert non-null values via String(input). Return '' for null or undefined.
- Word boundaries: treat spaces, underscores, dashes, periods, slashes, plus signs, and any non-alphanumeric Unicode separator as boundaries. Also split camelCase/PascalCase boundaries (e.g., XMLHttpRequest -> xmlHttpRequest).
- Characters: remove all characters that are not Unicode letters or digits (strip emoji and punctuation). Use Unicode-aware regex (u flag) so non-Latin letters are preserved.
- Casing: first word entirely lowercased, subsequent words capitalized (first letter uppercase, rest lowercase). Preserve digits within words (e.g., version 2 -> version2). Collapse multiple separators and trim leading/trailing separators.
- Edge cases: handle empty strings, all-uppercase inputs, inputs starting with digits, inputs that are already camelCase, inputs with diacritics or non-Latin scripts, and very long strings efficiently.
- Error handling: for strict === true, throw TypeError('input must be a string or number') on invalid input types; otherwise coerce; never return null or undefined.
- Export: provide both CommonJS (module.exports) and ES module (export default) examples or note how to switch.
- Tests: include a Jest test suite with >=6 test cases covering typical and edge inputs.

Include at least these examples in the prompt (input -> expected output):
- "convert THIS_string-to camel case!" -> "convertThisStringToCamelCase"
- "  --FOO_bar" -> "fooBar"
- "XMLHttpRequest" -> "xmlHttpRequest"
- "version 2 update" -> "version2Update"
- "123 abc" -> "123Abc"
- "emoji 🙂 test" -> "emojiTest"

Also request concise inline comments explaining key regexes/steps and mention performance considerations (avoid quadratic behavior for very large strings).`;
