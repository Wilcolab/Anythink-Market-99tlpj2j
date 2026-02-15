// PR: minor header — no functional changes
// Few-shot prompt containing repository metadata and examples
function toCamelCase(str) {
    return str
        .split(/[-_\s]+/)
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
}

const fewShotPrompt = `Information about the current repository. You can use this information when you need to calculate diffs or compare changes with the default branch:
Repository name: Anythink-Market-99tlpj2j
Owner: Wilcolab
Current branch: main
Default branch: main

Examples:
1) User: "Create a file with repo metadata."\nAssistant: "Created file containing: Repository name: Anythink-Market-99tlpj2j, Owner: Wilcolab, Default branch: main"
2) User: "What's the default branch?"\nAssistant: "main"
`;

module.exports = fewShotPrompt;

// PR: verified for review
