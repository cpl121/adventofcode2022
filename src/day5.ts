import fs from 'fs';
import { chunkArray } from '../utils/actions';

const CHARACTER_INDEX = 4;

function orderStacks(data: string[]): string[][] {
    const index = data.indexOf('')
    const stacks = data.slice(0, index);
    const instructions: number[][] = data.slice(index + 1).map(instruction => {
        return instruction.split('').map((e) => e.match(/[0-9]/) ? Number(e) : null).filter((e) => e !== null)
    }).map((e) => e.length === 4 ? [Number(e[0].toString() + e[1].toString()), e[2], e[3]] : e);
    
    let orderStacks: string[][] = [[]];
    const stackLength = stacks.length;
    for (let i = 0; i < stacks.length; i++) {
        const element = stacks[i].split('');        
        for (let j = 0; j < element.length; j++) {
            if (element[j].match(/[A-Z]/)) {
                let newPosition = (Number((j / CHARACTER_INDEX) + 0.75)) - 1 === -1 ? stackLength - 1 : (Number((j / CHARACTER_INDEX) + 0.75)) - 1;                
                orderStacks[newPosition] ? orderStacks[newPosition].push(element[j]) : orderStacks[newPosition] = [element[j]];
            }
        }
    }
    

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        for (let quantity = 0; quantity < instruction[0]; quantity++) {
            const temp = orderStacks[instruction[1] - 1][0]
            orderStacks[instruction[1] - 1].shift()
            orderStacks[instruction[2] - 1].reverse().push(temp)
            orderStacks[instruction[2] - 1].reverse()
        }
    }
    return orderStacks
}

function orderStacks2(data: string[]): string[][] {
    const index = data.indexOf('')
    const stacks = data.slice(0, index);
    const instructions: number[][] = data.slice(index + 1).map(instruction => {
        return instruction.split('').map((e) => e.match(/[0-9]/) ? Number(e) : null).filter((e) => e !== null)
    }).map((e) => e.length === 4 ? [Number(e[0].toString() + e[1].toString()), e[2], e[3]] : e);
    
    let orderStacks: string[][] = [[]];
    const stackLength = stacks.length;
    for (let i = 0; i < stacks.length; i++) {
        const element = stacks[i].split('');        
        for (let j = 0; j < element.length; j++) {
            if (element[j].match(/[A-Z]/)) {
                let newPosition = (Number((j / 4) + 0.75)) - 1 === -1 ? stackLength - 1 : (Number((j / 4) + 0.75)) - 1;
                orderStacks[newPosition] ? orderStacks[newPosition].push(element[j]) : orderStacks[newPosition] = [element[j]];
            }
        }
    }
    

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        const temp = orderStacks[instruction[1] - 1].slice(0, instruction[0]).reverse()
        orderStacks[instruction[2] - 1].reverse().push(...temp)
        orderStacks[instruction[2] - 1].reverse()
        
        for (let quantity = 0; quantity < instruction[0]; quantity++) {
            orderStacks[instruction[1] - 1].shift()
        }
    }
    return orderStacks
}

const data: string = fs.readFileSync('resources/day5data.txt', 'utf8')
const arrayData: string[] = chunkArray(data)

// Part 1
const orderData1: string[][] = orderStacks(arrayData)
export const result1: string = orderData1.map((e) => e[0]).join('')

// Part 2
const orderData2: string[][] = orderStacks2(arrayData)
export const result2: string = orderData2.map((e) => e[0]).join('')
