// PR: minor header — no functional changes
function toSnakeCase(text) {
    return text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
}

module.exports = toSnakeCase;