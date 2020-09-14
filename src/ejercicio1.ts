const n: number = 77;

const randomInt = (min:number, max:number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//random numbers generation
let randomNumbers: number[] = [...Array(n)];
randomNumbers.forEach( (element,index,array) => {
    array[index] = randomInt(10,99);
});


//Range
let range: number;
range = Math.max(...randomNumbers) - Math.min(...randomNumbers);

//Sturges rule
const getBaseLog = (x: number, y: number):number => {
    return Math.log(y) / Math.log(x);
}

let k: number;
k = Math.trunc(1 + (3.322 * getBaseLog(10, randomNumbers.length)));

//Amplitude
let a: number = Math.round( range/k ) ;

//Class
    let classOfTable: number[] = [...Array(k)];
    for (let index = 0; index < classOfTable.length; index++) {
        if(index == 0) classOfTable[index] = Math.min(...randomNumbers);
        else{
            classOfTable[index] = classOfTable[index-1] + a;
        }
    }

//Class mark
    let classMark: number[] = [...Array(k)];
    classOfTable.forEach( (element,index) => classMark[index] = (element + (element+a))/2 );

//Absolute Frecuency
    let absFrecuency: number[] = [...Array(k)];
    classOfTable.forEach( (element,index) => {
        absFrecuency[index] = 0;
        for(let i = 0; i < randomNumbers.length;i++)
            if( randomNumbers[i] >= element && randomNumbers[i] < (element+a) ) 
                absFrecuency[index] += 1;
    })

//Relative Frequency
    let relFrecuency: number[] = [...Array(k)];
    absFrecuency.forEach( (element,index) => relFrecuency[index] = element/randomNumbers.length );

//Accumulated absolute frequency
    let accAbsoluteFrecuency: number[] = [...Array(k)];
    absFrecuency.forEach( (element,index) => {
        if(index == 0) accAbsoluteFrecuency[index] = element;
        else accAbsoluteFrecuency[index] = accAbsoluteFrecuency[index - 1] + element;
    });

//Mean
const findMean = (): number =>{
    let mean: number = 0;
    for (let index = 0; index < k; index++) mean += absFrecuency[index] * classMark[index];
    return mean / randomNumbers.length;
}

//Median
const findMedian = (): number => {
    let numbers: number[] = randomNumbers.slice();   
    numbers.sort();

    return (numbers.length%2) == 0 ?
        numbers[numbers.length / 2] : 
        (numbers[Math.floor(numbers.length / 2)] + numbers[Math.ceil(numbers.length / 2)]) / 2;
};

//Trend
const findTrend = (): number => {
    let trend: number, pos: number;
    pos = absFrecuency.indexOf( Math.max(...absFrecuency) ) ;
    let num = absFrecuency[pos] - absFrecuency[pos - 1], num2 = absFrecuency[pos] - absFrecuency[pos+1];
    let den = (num) / (num + num2)
    trend = classOfTable[pos] + ( den * a );

    return trend;
}

//Numbers greater than the median + 5
const numGreaterMedian = (): number => {
    const median: number = findMedian();
    let countNumber: number = 0;
    randomNumbers.forEach( (element) => {
        if(element >= median+5 ) countNumber++
    });
    
    return countNumber/randomNumbers.length;
}

//Sum
const sum = () => {
    let sum: number = 0;
    randomNumbers.forEach( (element) => {
        sum += element;
    })
    return sum;
}

//Varianza
const varianza = () => {
    let suma: number = 0, promedio: number = sum()/randomNumbers.length;
    randomNumbers.forEach( (element) => {
        suma += Math.pow((element-promedio),2);
    })
    return suma/randomNumbers.length
}

//Esperanza
const esperanza = ():number => {
    let esperanza: number = 0;
    for (let i = 0; i < k; i++) {
        esperanza += absFrecuency[i]*relFrecuency[i];
    }
    return esperanza;
}

//View Table
const createTable = ():any[][] => {
    let table: any[][] = [...Array([...Array(k)])];
    console.log('\nTable:');
    table[0] = [
        `Intervalo`,
        `Marca de clase`,
        `Frecuencia absoluta`,
        `Frecuencia relativa`,
        `Frecuencia acumulada`
    ];

    for (let i = 1; i <= k; i++) {
        table[i] = [
            ` ${classOfTable[i]} - ${ classOfTable[i] + a } `,
            classMark[i],
            absFrecuency[i],
            relFrecuency[i],
            accAbsoluteFrecuency[i]
        ];
    }
    return table;
}

const main = () => {
    console.log("Cantidad de elementos: " + randomNumbers.length);
    console.log(`\nMin: ${Math.min(...randomNumbers)} Max: ${Math.max(...randomNumbers)} Sum: ${sum()}`);
    console.log(`\nMedia: ${findMean().toFixed(2)}`);
    console.log(`Mediana: ${findMedian().toFixed(2)}`);
    console.log(`Moda: ${findTrend().toFixed(2)}`);
    console.log(`Numeros mayores a la mediana + 5: ${(numGreaterMedian() * 100).toFixed(2)}% `);
    console.log(`Varianza: ${varianza().toFixed(2)}`);
    console.log(`Desviación tipica: ${Math.sqrt(varianza()).toFixed(2)}`);
    console.log(`Esperanza: ${esperanza().toFixed(2)}`);
}

main();

/* @educardenas97 */