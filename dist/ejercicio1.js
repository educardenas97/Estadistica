"use strict";
const n = 10;
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//random numbers generation
let randomNumbers = [...Array(n)];
randomNumbers.forEach((element, index, array) => {
    array[index] = randomInt(10, 99);
});
//Range
let range;
range = Math.max(...randomNumbers) - Math.min(...randomNumbers);
//Sturges rule
let k;
k = Math.round(1 + 3.322 * Math.log(randomNumbers.length));
//Amplitude
let a = Math.round(range / k);
//Class
let classOfTable = [...Array(k)];
for (let index = 0; index < classOfTable.length; index++) {
    if (index == 0)
        classOfTable[index] = Math.min(...randomNumbers);
    else {
        classOfTable[index] = classOfTable[index - 1] + a;
    }
}
//Class mark
let classMark = [...Array(k)];
classOfTable.forEach((element, index) => classMark[index] = (element + (element + a)) / 2);
//Absolute Frecuency
let absFrecuency = [...Array(k)];
classOfTable.forEach((element, index) => {
    absFrecuency[index] = 0;
    for (let i = 0; i < randomNumbers.length; i++)
        if (randomNumbers[i] >= element && randomNumbers[i] < (element + a))
            absFrecuency[index] += 1;
});
//Relative Frequency
let relFrecuency = [...Array(k)];
absFrecuency.forEach((element, index) => relFrecuency[index] = element / randomNumbers.length);
//Accumulated absolute frequency
let accAbsoluteFrecuency = [...Array(k)];
absFrecuency.forEach((element, index) => {
    if (index == 0)
        accAbsoluteFrecuency[index] = element;
    else
        accAbsoluteFrecuency[index] = accAbsoluteFrecuency[index - 1] + element;
});
//Mean
const findMean = () => {
    let mean = 0;
    for (let index = 0; index < k; index++)
        mean += absFrecuency[index] * classMark[index];
    return mean / randomNumbers.length;
};
//Median
const findMedian = () => {
    let numbers = randomNumbers.slice();
    numbers.sort();
    return (numbers.length % 2) == 0 ?
        numbers[numbers.length / 2] :
        (numbers[Math.floor(numbers.length / 2)] + numbers[Math.ceil(numbers.length / 2)]) / 2;
};
//Trend
const findTrend = () => {
    let trend, pos;
    pos = absFrecuency.indexOf(Math.max(...absFrecuency));
    trend = classOfTable[pos] + (((absFrecuency[pos] - absFrecuency[pos - 1]) /
        ((absFrecuency[pos] - absFrecuency[pos - 1]) + (absFrecuency[pos] - absFrecuency[pos + 1]))) * a);
    return trend;
};
//Numbers greater than the median + 5
const numGreaterMedian = () => {
    const median = findMedian();
    let countNumber = 0;
    randomNumbers.forEach((element) => {
        if (element > median + 5)
            countNumber++;
    });
    return countNumber / randomNumbers.length;
};
//View Table
const viewTable = () => {
    console.log('Table:');
    for (let i = 0; i < k; i++) {
        console.log(`| ${classOfTable[i]} - ${classOfTable[i] + a} | ${classMark[i]} | ${absFrecuency[i]} | ${relFrecuency[i].toFixed(3)} | ${accAbsoluteFrecuency[i]}`);
    }
};
const main = () => {
    console.log(randomNumbers);
    viewTable();
    console.log(`Media: ${findMean().toFixed(2)}`);
    console.log(`Mediana: ${findMedian().toFixed(2)}`);
    console.log(`Moda: ${findTrend().toFixed(2)}`);
    console.log(`Numeros mayores a la mediana + 5: ${(numGreaterMedian() * 100).toFixed(2)}% `);
};
main();
