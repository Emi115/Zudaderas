// Importa el archivo app.js
import app from '../src/components/App.js';

// Describe el grupo de pruebas
describe('App', () => {
  // Prueba si el archivo app.js se carga correctamente
  it('should load app.js', () => {
    // Verifica si app.js se ha cargado correctamente
    expect(app).toBeDefined();
  });
});
