const n: number = 70;
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
let k: number;
k = Math.round( 1+3.322 * Math.log(randomNumbers.length));

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
    const point = (randomNumbers.length + 1)/2;
    let position: number = 0, median: number;

    classOfTable.forEach( (element,index) => {
        if (point >= element && point < (element+a)) position = index;
    })

    median = classOfTable[position] + ((
        ( (randomNumbers.length) - accAbsoluteFrecuency[position-1] )
         / accAbsoluteFrecuency[position]) * a);

    return median;
};

//Trend
const findTrend = (): number => {
    let trend: number, pos: number;
        
    pos = absFrecuency.indexOf( Math.max(...absFrecuency) ) ;
       
    trend = classOfTable[pos] + (
        ( ( absFrecuency[pos] - absFrecuency[pos-1]) / 
        ( (absFrecuency[pos] - absFrecuency[pos-1]) + (absFrecuency[pos] - absFrecuency[pos+1]) )
        ) *a );

    return trend;
}

//View Table
const viewTable = () => {
    console.log('Table:');
    for (let i = 0; i < k; i++) {
        console.log(`| ${classOfTable[i]} - ${classOfTable[i] + a} | ${classMark[i]} | ${absFrecuency[i]} | ${relFrecuency[i].toFixed(3)} | ${accAbsoluteFrecuency[i]}`);
    }
}

const main = () => {
    console.log(randomNumbers);
    viewTable();
    console.log(`Media: ${findMean()}`);
    console.log(`Mediana: ${findMedian()}`);
    console.log(`Moda: ${findTrend()}`);
}

main();