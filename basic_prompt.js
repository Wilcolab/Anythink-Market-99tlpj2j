// PR: minor header — no functional changes
// Basic prompt containing repository metadata
const basicPrompt = `Information about the current repository. You can use this information when you need to calculate diffs or compare changes with the default branch:
Repository name: Anythink-Market-99tlpj2j
Owner: Wilcolab
Current branch: main
Default branch: main
`;

module.exports = basicPrompt;
// Prompt for camelCase conversion function
const camelCasePrompt = `Create a function that converts strings to camelCase format.
The function should:
- Take a string as input
- Convert it to camelCase where the first word is lowercase and subsequent words have their first letter capitalized
- Remove spaces and special characters
- Handle multiple consecutive spaces or special characters

Example:
Input: "hello world example"
Output: "helloWorldExample"

Example:
Input: "convert-this-string"
Output: "convertThisString"
`;

module.exports = { basicPrompt, camelCasePrompt };