const postcssNested = require("postcss-nested");
const tailwindcss = require("tailwindcss");

const config = {
    plugins: [
        postcssNested,
        tailwindcss
    ]
};

module.exports = config;