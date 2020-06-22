module.exports = {
  preset: "jest-puppeteer",
  verbose: true,
  testRegex: "/__tests__/.*",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  }
};