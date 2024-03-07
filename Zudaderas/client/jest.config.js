module.exports = {
  testMatch: [
    "<rootDir>/Tests/**/*.test.js",
  ],
  transform: {
    "^.+\\.js$": "babel-jest", // Transforma archivos JS con Babel
    "^.+\\.css$": "jest-transform-css" // Transforma archivos CSS con un módulo específico
  },
  // Otras opciones de configuración...
};
