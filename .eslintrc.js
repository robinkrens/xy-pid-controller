module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"block-spacing": [
			"error",
			"never"
		],
		"array-bracket-newline": [
			"error",
			"never"
		],
		"array-element-newline": [
			"error",
			"never"
		],
		"space-in-parens": [
			"error",
			"never"
		],
		"array-bracket-spacing": [
			"error",
			"never"
		],
		"object-curly-spacing": [
			"error",
			"never"
		],
		"newline-per-chained-call": [
			"error",
			{"ignoreChainWithDepth": 1}
		],
		"no-multi-spaces": [
			"error"
		],
		"dot-location": [
			"error",
			"object"
		]
	}
};
