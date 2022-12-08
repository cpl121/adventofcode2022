import fs from 'fs';
import { chunkArray } from '../utils/actions';

type visible = 'edge' | 'inside' | 'invisible' | ''

interface IResult {
    name: visible
    count: number
}

function createMatrix(data: string[]): number[][] {
    let result: number[][] = [[]]
    for (let i = 0; i < data.length; i++) {
        const element = data[i].split('');
        result[i] = element.map((number) => parseInt(number))
    }
    return result
}

function initMatrix(data: number[][]): visible[][] {
    let result: visible[][] = [[]]
    for (let i = 0; i < data.length; i++) {
        result[i] = []
        for (let j = 0; j < data[i].length; j++) {
            result[i][j] = ''
        }
    }
    return result
}

function getCol(matrix: number[][], col: number){
    var column: number[] = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
}

function evaluateData(data: number[][]): visible[][] {
    let result: visible[][] = initMatrix(data)
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const tempRow = JSON.stringify(row);
            const column = getCol(data, j);
            if (i === 0 || i === (data.length - 1) || j === 0 || j === (data.length - 1)) {
                result[i][j]= 'edge'
            } else {
                const numberToCheck = data[i][j]
                const newRow = JSON.parse(tempRow)
                const newCol = column
                const left = newRow.slice(0, j)
                const right = newRow.slice(j + 1, row.length)
                const up = newCol.slice(0, i)
                const down = newCol.slice(i + 1, column.length)
                let res: visible = 'invisible'
                if (left.filter((num: number) => num >= numberToCheck).length === 0) {
                    res = 'inside'
                }
                if (right.filter((num: number) => num >= numberToCheck).length === 0) {
                    res = 'inside'
                }
                if (up.filter((num: number) => num >= numberToCheck).length === 0) {
                    res = 'inside'
                }
                if (down.filter((num: number) => num >= numberToCheck).length === 0) {
                    res = 'inside'
                }
                result[i][j] = res
            }
        }
    }
    return result
}

function evaluateData2(data: number[][]): number[][] {
    let result: number[][] = [[]]
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        result[i] = [] 
        for (let j = 0; j < row.length; j++) {
            const tempRow = JSON.stringify(row);
            const column = getCol(data, j);
            const numberToCheck = data[i][j]
            const newRow = JSON.parse(tempRow)
            const newCol = column
            
            const left = newRow.slice(0, j).reverse()
            const right = newRow.slice(j + 1, row.length)
            const up = newCol.slice(0, i).reverse()
            const down = newCol.slice(i + 1, column.length)
            
            let leftScore: number = 0
            for (let i = 0; i < left.length; i++) {
                const element = left[i];
                leftScore++
                if (element >= numberToCheck) {
                    break
                }
            }

            let rightScore: number = 0
            for (let i = 0; i < right.length; i++) {
                const element = right[i];
                rightScore++
                if (element >= numberToCheck) {
                    break
                }
            }

            let upScore: number = 0
            for (let i = 0; i < up.length; i++) {
                const element = up[i];
                upScore++
                if (element >= numberToCheck) {
                    break
                }
            }

            let downScore: number = 0
            for (let i = 0; i < down.length; i++) {
                const element = down[i];
                downScore++
                if (element >= numberToCheck) {
                    break
                }
            }

            let totalScore: number = leftScore * rightScore * upScore * downScore
            result[i][j] = totalScore
            
        }
    }
    return result
}

function countVisibleTrees(data: visible[][]): IResult[] {
    let result: IResult[] = []
    for (let i = 0; i < data.length; i++) {
        const row = data[i]
        for (let j = 0; j < row.length; j++) {
            const visibleToCheck: visible = row[j];
            const res =result.find((res) => res.name === visibleToCheck)
            if (res) {
                res.count = res.count + 1
            } else {
                result.push({name: visibleToCheck, count: 1})
            }
        }        
    }
    return result
}

function sortMatrix(data: number[][]): number[] {
    let result: number[] = []
    for (let i = 0; i < data.length; i++) {
        const element = data[i].sort((a,b) => b - a);
        result.push(...element)
    }
    return result.sort((a,b) => b - a)
}

const data: string = fs.readFileSync('resources/day8data.txt', 'utf8')
const arrayData: string[] = chunkArray(data)
const numberMatrix: number[][] = createMatrix(arrayData)

// Part 1
const finalData: visible[][] = evaluateData(numberMatrix)
export const result1: IResult[] = countVisibleTrees(finalData)

// Part 2
const finalData2: number[][] = evaluateData2(numberMatrix)
export const result2 = sortMatrix(finalData2)[0]
