import fs from 'fs';
import { chunkArray } from '../utils/actions';

const TOTAL_SYSTEM_SIZE = 70000000
const SIZE_TO_UPDATE = 30000000

interface directory {
    name: string
    directories?: directory[]
    files?: files[]
    totalSize: number
}

interface files {
    name: string
    size: number
}

interface Result1 {
    name: string
    totalSize: number
}

let systemFiles: directory[] = [{ name: '/', directories: [], files: [], totalSize: 0}]

function findDirectoryFromRoute(route: string): directory {
    
    let splitPath = route.split('/')
    splitPath.pop()
    splitPath.shift() // Root file
    let result: directory = systemFiles[0]
    
    for (let i = 0; i< splitPath.length; i++) {
        const path = splitPath[i];
        result = result.directories.find((dir) => dir.name === path)
    }
    return result
}

function sumSize(route: string, size: number) {
    let splitPath = route.split('/')
    splitPath.pop()
    
    // Root file
    splitPath.shift()
    let result: directory = systemFiles[0]
    result.totalSize += size
    
    for (let i = 0; i< splitPath.length; i++) {
        const path = splitPath[i];
        result = result.directories.find((dir) => dir.name === path)
        result.totalSize += size
    }
}

function createSystemFiles(data: string[]): directory[] {
    let actualDirectory: directory = systemFiles[0]
    let path = '/'
    
    data.forEach(line => {
        if (!line.includes('$')) {
            // Create files
            if (line.includes('dir')) {
                // Create directory if not exists
                const lineData = line.split('dir')[1].trim()
                if (!actualDirectory.directories) {
                    actualDirectory.directories[0] = { name: lineData, directories: [], files: [], totalSize: 0}
                } else {
                    actualDirectory.directories.push({ name: lineData, directories: [], files: [], totalSize: 0})
                }
            } 
            else {
                // Create file if not exists
                const lineData = line.split(' ')
                if (!actualDirectory.files) {
                    actualDirectory.files[0] = { name: lineData[1], size: parseInt(lineData[0]) }
                } else {
                    actualDirectory.files.push({ name: lineData[1], size: parseInt(lineData[0])})
                }
                // Add size in the directory
                /* findDirectoryFromRoute(path).totalSize +=  parseInt(lineData[0]) */
                sumSize(path, parseInt(lineData[0]))
            }
        }
        
        if (line.includes('$') && line.includes('cd') && line.includes('..')) {
            // Exit directory
            const previousPath = path.split('/')
            previousPath.pop()
            previousPath.pop()
            path = previousPath.join('/') + '/'

        } else if (line.includes('$') && line.includes('cd')) {
            // Enter in new directory
            const lineData = line.split(/cd(.*)/s)[1].trim()
            if (lineData.includes('/')) {
                // System root, dont create new directory
                path = '/'
            } else {
                path = path + lineData + '/'
            }
        }

        // Get actual directory
        /* actualDirectory = findDirectoryFromRoute(systemFiles[0], path) */
        actualDirectory = findDirectoryFromRoute(path)
    })
    return systemFiles
}

function mapResult1(dir: directory, result: Result1[]): Result1[] {
    result.push({name: dir.name, totalSize: dir.totalSize})
    if (dir.directories.length === 0) {
        return result
    } else {
        dir.directories.forEach((dir2) => {
            mapResult1(dir2, result)
        })
        return result
    }
}

function sumElements(data: number[]): number {
    let result: number = 0;
    for (let i = 0; i < data.length; i++) {
        result+=data[i]
    }
    return result
}

function compareSizes(data: number[]): number {
    const dataSorted = data.sort((a, b) => a - b)
    const systemFileSize = dataSorted[dataSorted.length - 1] // Size of the root
    const unusedSize = TOTAL_SYSTEM_SIZE - systemFileSize
    const sizeToDelete = SIZE_TO_UPDATE - unusedSize
    
    for (let i = 0; i < dataSorted.length; i++) {
        const sizeToCompare = dataSorted[i];
        if (sizeToCompare >= sizeToDelete) {
            return sizeToCompare
        }
    }
    
    return 0
}

const data: string = fs.readFileSync('resources/day7data.txt', 'utf8')
const arrayData: string[] = chunkArray(data)
createSystemFiles(arrayData)

// Part 1
const result1Mapped: Result1[] = mapResult1(systemFiles[0], [])
const result1Sizes: number[] = result1Mapped.filter((res) => res.totalSize <= 100000).map((res2) => res2.totalSize)
export const result1: number = sumElements(result1Sizes)

// Part 2
export const result2 = compareSizes(result1Mapped.map((res)=> res.totalSize))
