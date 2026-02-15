// PR: minor header — no functional changes
// Chain prompt for Copilot to create `toKebabCase`
function toKebabCase(input, options = {}) {
    // Step 1: Validate & normalize
    if (input === null || input === undefined) {
        return '';
    }

    if (typeof input !== 'string' && typeof input !== 'number') {
        if (options.strict === true) {
            throw new TypeError('input must be a string or number');
        }
        input = String(input);
    } else {
        input = String(input);
    }

    // Normalize unicode (NFKC) and trim whitespace
    input = input.normalize('NFKC').trim();

    // Step 2: Tokenize words
    // Split by separators and camelCase/PascalCase boundaries in a single pass
    // Regex: separators + camelCase boundaries (lowercase followed by uppercase)
    const tokens = input
        .replace(/[\s\-_.\/+]+/gu, ' ') // Collapse common separators to spaces
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase boundary (e.g., camelCase -> camel Case)
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // PascalCase boundary (e.g., XMLHttp -> XML Http)
        .split(/\s+/) // Split by whitespace
        .filter(token => token.length > 0);

    // Step 3: Sanitize tokens
    // Remove non-letter/non-digit characters (preserves Unicode letters), convert to lowercase
    const sanitized = tokens
        .map(token => token.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase())
        .filter(token => token.length > 0);

    // Step 4: Build output
    // Join with hyphen and ensure no leading/trailing hyphens or consecutive hyphens
    const result = sanitized.join('-').replace(/-+/g, '-');

    return result === '' ? '' : result;
}

// Step 5: Export (CommonJS)
module.exports = toKebabCase;

// ES module export (commented):
// export default toKebabCase;

// Step 6: Jest tests
describe('toKebabCase', () => {
    it('converts "Hello World" to "hello-world"', () => {
        expect(toKebabCase('Hello World')).toBe('hello-world');
    });

    it('converts "convert THIS_string-to kebab case!" to "convert-this-string-to-kebab-case"', () => {
        expect(toKebabCase('convert THIS_string-to kebab case!')).toBe('convert-this-string-to-kebab-case');
    });

    it('converts "  --FOO_bar" to "foo-bar"', () => {
        expect(toKebabCase('  --FOO_bar')).toBe('foo-bar');
    });

    it('converts "XMLHttpRequest" to "xml-http-request"', () => {
        expect(toKebabCase('XMLHttpRequest')).toBe('xml-http-request');
    });

    it('converts "emoji 🙂 test" to "emoji-test"', () => {
        expect(toKebabCase('emoji 🙂 test')).toBe('emoji-test');
    });

    it('returns empty string for null/undefined', () => {
        expect(toKebabCase(null)).toBe('');
        expect(toKebabCase(undefined)).toBe('');
    });

    it('strict mode throws TypeError for non-string/number input', () => {
        expect(() => toKebabCase({}, { strict: true })).toThrow(TypeError);
    });
});
const chainPrompt = `You are Copilot. Produce a JavaScript module that exports a function toKebabCase(input, options) that converts arbitrary input to normalized kebab-case. Follow these sequential steps and implement each before moving to the next:

1. Validate & normalize:
- If input is null or undefined, return ''.
- If options.strict === true, throw TypeError('input must be a string or number') for other non-string/number types; otherwise coerce via String(input).
- Normalize unicode with String.prototype.normalize('NFKC') and trim().

2. Tokenize words:
- Split by common separators (spaces, underscores, dashes, periods, slashes, plus signs) and any Unicode separator.
- Also split camelCase and PascalCase boundaries (e.g., XMLHttpRequest -> XML Http Request) using a Unicode-aware regex.
- Collapse consecutive separators into a single boundary.

3. Sanitize tokens:
- Remove characters that are not Unicode letters or digits (use \p{L} and \p{N} with the u flag) so letters in non-Latin scripts are preserved and emoji/punctuation are stripped.
- Convert tokens to lower case; preserve digits inside tokens.

4. Build output:
- Join non-empty tokens with '-', ensure no leading/trailing hyphens, and collapse multiple hyphens.
- If the resulting string is empty, return ''.

5. API & export:
- Support options with at least { strict?: boolean }.
- Provide both CommonJS (module.exports = toKebabCase) and an ES module example (commented).

6. Tests & examples:
- Include a small Jest test list (>=5 cases) covering:
  - "Hello World" -> "hello-world"
  - "convert THIS_string-to kebab case!" -> "convert-this-string-to-kebab-case"
  - "  --FOO_bar" -> "foo-bar"
  - "XMLHttpRequest" -> "xml-http-request"
  - "emoji 🙂 test" -> "emoji-test"

7. Documentation & comments:
- Add concise inline comments explaining key regexes and choices.
- Note a short performance consideration: use a single pass where possible and avoid quadratic concatenation for very long strings.

Return only the code-ready prompt (no implementation).`;

module.exports = chainPrompt;
