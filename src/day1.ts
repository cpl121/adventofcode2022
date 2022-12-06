import { chunkArray } from './lib/actions';
import { dataDay1 } from './lib/resources/index'

function sumElements(array: string[]): number[] {
    let sum = 0;
    let count = 0;
    let arrayOfResults: number[] = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.length !== 0) {
            sum += parseInt(element);
        } else {
            arrayOfResults[count] = sum;
            sum = 0;
            count++;
        }
    }
    return arrayOfResults
}

const data: string = dataDay1.default
const arrayData: string[] = chunkArray(data)
const arraySumData: number[] = sumElements(arrayData)
const result: number[] = arraySumData.sort((a: number, b: number) => b - a)
export const result1 = result[0]
export const result2 = result[0] + result[1] + result[2]