import { chunkArray } from './lib/actions';
import { dataDay2 } from './lib/resources/index'

function battle(opponent: string, own: string): number {
    switch (opponent) {
        case 'A':
            if (own === 'X') return 3;
            if (own === 'Y') return 6;
            if (own === 'Z') return 0;
            break;
        case 'B':
            if (own === 'X') return 0;
            if (own === 'Y') return 3;
            if (own === 'Z') return 6;
            break;
        case 'C':
            if (own === 'X') return 6;
            if (own === 'Y') return 0;
            if (own === 'Z') return 3;
            break;
    
        default:
            return 0;
    }
    return 0;
}

function evaluateData(array: string[]): number[] {
    let arrayOfResults: number[] = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let score: number = battle(element[0], element[2]);
        switch (element[2]) {
            // Own Rock
            case 'X':
                score = score + 1;
                break;
            // Own Paper
            case 'Y':
                score = score + 2;
                break;
            // Own Scissors
            case 'Z':
                score = score + 3;
                break;
        
            default:
                break;
        }
        arrayOfResults.push(score);
    }
    return arrayOfResults
}

function evaluateData2(array: string[]): number[] {
    let arrayOfResults: number[] = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let perfectHand = ''

        switch (element[2]) {
            case 'X':
                if (element[0] === 'A') perfectHand = 'Z';
                if (element[0] === 'B') perfectHand = 'X';
                if (element[0] === 'C') perfectHand = 'Y';
                break;
            case 'Y':
                if (element[0] === 'A') perfectHand = 'X';
                if (element[0] === 'B') perfectHand = 'Y';
                if (element[0] === 'C') perfectHand = 'Z';
                break;
            case 'Z':
                if (element[0] === 'A') perfectHand = 'Y';
                if (element[0] === 'B') perfectHand = 'Z';
                if (element[0] === 'C') perfectHand = 'X';
                break;
        
            default:
                break;
        }
        
        let score: number = battle(element[0], perfectHand);
        switch (perfectHand) {
            // Own Rock
            case 'X':
                score = score + 1;
                break;
            // Own Paper
            case 'Y':
                score = score + 2;
                break;
            // Own Scissors
            case 'Z':
                score = score + 3;
                break;
        
            default:
                break;
        }
        arrayOfResults.push(score);
    }
    return arrayOfResults
}

function sumElements(array: number[]): number {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        sum += element;
    }
    return sum
}


const data: string = dataDay2.default
const arrayData: string[] = chunkArray(data)

// Part 1
const evaluateArrayData: number[] = evaluateData(arrayData)
export const result1: number = sumElements(evaluateArrayData)
// Part 2
const evaluate2ArrayData: number[] = evaluateData2(arrayData)
export const result2: number = sumElements(evaluate2ArrayData)
