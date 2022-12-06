import { dataDay6 } from './lib/resources/index'
import { chunkArray } from './lib/actions';

const SEQUENCE_CHARACTERS = 4;
const SEQUENCE_CHARACTERS_2 = 14;

function getStartPacketMarker(data: string[], characters: number): number[] {
    let result: number[] = []

    for (let i = 0; i < data.length; i++) {
        const element: string = data[i];
        for (let j = 0; j < element.length; j++) {
            const fourCharacters = element.slice(j, j + characters).split('')
            
            const hasSameCharacter: boolean = [...new Set(fourCharacters)].length === characters
            if (!hasSameCharacter) {
                continue
            } else {
                const index = element.indexOf(fourCharacters.join(''))
                result.push(index + characters)
                break;
            }
        }
    }
    return result
}

const data: string = dataDay6.default
const arrayData: string[] = chunkArray(data)

// Part 1
export const result1 = getStartPacketMarker(arrayData, SEQUENCE_CHARACTERS)

// Part 2
export const result2 = getStartPacketMarker(arrayData, SEQUENCE_CHARACTERS_2)
