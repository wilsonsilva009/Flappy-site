var numeros = [1,2,3,4,5,6];

var soma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);

let soma2 = 0;

for (num of numeros){
    soma2 += num;
}

console.log(`A soma é ${soma}`);
console.log(`A soma é ${soma2}`);