import fs from 'fs';
import { chunkArray } from '../utils/actions';

const INDEX_CHARACTER_IN_ASCII = 96;
const EXTRA_PRIORITY_BY_UPPERCASE = 26;

function splitArray(array: string[]): string[][] {
    let arrayOfArrays: string[][] = [];
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const prueba = Math.floor(element.length / 2);
        arrayOfArrays[i] = [element.slice(0, prueba), element.slice(prueba)];
    }
    return arrayOfArrays;
}

function similarCharacter(data: string[][]): string[] {
    let result: string[] = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.length === 2) {
            const rucksack1 = data[i][0].split('');
            const rucksack2 = data[i][1].split('');
            const similar = rucksack1.filter((value) => rucksack2.includes(value));
            const similarWithoutDuplicates = [...new Set(similar)];
            result.push(...similarWithoutDuplicates)
        } else if (element.length === 3) {
            const rucksack1 = data[i][0].split('');
            const rucksack2 = data[i][1].split('');
            const rucksack3 = data[i][2].split('');
            const similar = rucksack1.filter((value) => rucksack2.includes(value));
            const similar2 = similar.filter((value) => rucksack3.includes(value));
            const similarWithoutDuplicates = [...new Set(similar2)];
            result.push(...similarWithoutDuplicates)
        }
    }
    return result
}

function calculateScore(data: string[]): number {
    let score = 0;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];        
        const isLowerCase = element.match(/[a-z]/)
        const isUpperCase = element.match(/[A-Z]/)
        const priority = element.toLocaleLowerCase().charCodeAt(0) - INDEX_CHARACTER_IN_ASCII;
        if (isLowerCase) {
            score += priority;
        } else if (isUpperCase) {
            score += (priority + EXTRA_PRIORITY_BY_UPPERCASE);
        } else {
            // Not a character
            score += 0;
        }
    }
    return score;
}

function splitArrayIntoChunks(array: string[]): string[][] {
	const chunkSize = 3
	const chunks: string[][] = [[]]
	for (let i = 0; i < array.length; i += chunkSize) {
		const chunk = array.slice(i, i + chunkSize)
		chunks.push(chunk)
	}
	return chunks
}


const data: string = fs.readFileSync('resources/day3data.txt', 'utf8')
const arrayData: string[] = chunkArray(data)

// Part 1
const splitData: string[][] = splitArray(arrayData)
const characters: string[] = similarCharacter(splitData)
export const result1: number = calculateScore(characters)

// Part 2
const splitChunkData: string[][] = splitArrayIntoChunks(arrayData)
const characters2: string[] = similarCharacter(splitChunkData)
export const result2: number = calculateScore(characters2)