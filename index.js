const fs = require('fs');

const textoEntrada = fs.readFileSync('entrada.txt', 'utf8');
console.log('Texto original:', textoEntrada);

const textoProcesado = textoEntrada.toLowerCase();
console.log('Texto en minúsculas:', textoProcesado);
