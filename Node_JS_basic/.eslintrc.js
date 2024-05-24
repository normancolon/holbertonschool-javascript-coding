module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true // This ensures that Node.js global variables are recognized
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        // Add any custom rules here
    }
};
