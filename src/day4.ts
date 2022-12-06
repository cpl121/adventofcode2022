import { dataDay4 } from './lib/resources/index'
import { chunkArray } from './lib/actions';

function generateAllNumbersInList(list: string): number[] {
    const listSplitted = list.split('-');
    const number1 = parseInt(listSplitted[0])
    const number2 = parseInt(listSplitted[1])
    let result: number[] = []
    for (let i = number1; i <= ((number2-number1) + number1); i++) {
        result.push(i)
    }
    return result
}

function evaluateData(array: string[]): number {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i].split(',');
        const firstElf = generateAllNumbersInList(element[0])
        const secondElf = generateAllNumbersInList(element[1])
        const isCompletelyIncludes: boolean = secondElf.filter(sec => firstElf.includes(sec)).length === secondElf.length || firstElf.filter(sec => secondElf.includes(sec)).length === firstElf.length
        isCompletelyIncludes && count++
    }
    return count;
}

function evaluateData2(array: string[]): number {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i].split(',');
        const firstElf = generateAllNumbersInList(element[0])
        const secondElf = generateAllNumbersInList(element[1])
        const isCompletelyIncludes: boolean = secondElf.filter(sec => firstElf.includes(sec)).length !== 0 || firstElf.filter(sec => secondElf.includes(sec)).length !== 0
        isCompletelyIncludes && count++
    }
    return count;
}

const data: string = dataDay4.default
const arrayData: string[] = chunkArray(data)

// Part 1
export const result1: number = evaluateData(arrayData)

// Part 2
export const result2: number = evaluateData2(arrayData)
