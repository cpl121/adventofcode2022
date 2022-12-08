import fs from 'fs';
import { chunkArray } from '../utils/actions';

interface directory {
    name: string
    directories?: directory[]
    files?: files[]
}

interface files {
    name: string
    size: number
}

interface sizeByDirectory {
    name: string
    size: number
}

let systemFiles: directory[] = [{ name: '/', directories: [], files: []}]

function findDirectoryFromRoute(directory: directory, route: string): directory {    
    let splitPath = route.split('/')
    splitPath.pop()

    if (splitPath[splitPath.length - 1] === '') splitPath[splitPath.length - 1] = '/' // System root
    if (directory.name === splitPath[splitPath.length - 1]) {
        return directory
    } else {
        if (directory.directories) {
            for (let index = 0; index < directory.directories.length; index++) {
                const element = directory.directories[index];
                const newRoute = splitPath.join('/') + '/'   
                const result = findDirectoryFromRoute(element, newRoute)
                if (result) {
                    return result
                }
            }
        }
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
                    actualDirectory.directories[0] = { name: lineData, directories: [], files: []}
                } else {
                    actualDirectory.directories.push({ name: lineData, directories: [], files: []})
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
            const lineData = line.split('cd')[1].trim()
            if (lineData.includes('/')) {
                // System root, dont create new directory
                path = '/'
            } else {
                path = path + lineData + '/'
            }
        }

        // Get actual directory
        actualDirectory = findDirectoryFromRoute(systemFiles[0], path)
        console.log(actualDirectory);
        
    })
    return systemFiles
}

const data: string = fs.readFileSync('resources/day7data.txt', 'utf8')
const arrayData: string[] = chunkArray(data)
createSystemFiles(arrayData)
console.log(systemFiles);


// Part 1

// Part 2
