import 'zone.js'; // Solo importa zone.js
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Descartar la declaración de `__karma__` si no es necesario
declare const __karma__: any;

// Evitar que Karma se ejecute prematuramente.
if (typeof __karma__ !== 'undefined') {
  __karma__.loaded = function () {};
}

// Inicializar el entorno de pruebas de Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Finalmente, inicia Karma para ejecutar las pruebas.
if (typeof __karma__ !== 'undefined') {
  __karma__.start();
}
