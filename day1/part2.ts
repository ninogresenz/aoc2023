import { log } from 'console'
import fs from 'fs'
import { exit } from 'process'

function parse(file: string): string[] {
    const inputRaw = fs.readFileSync(file, {encoding: 'utf-8'})
    return inputRaw.split('\n')
}

const digitWords = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

function replaceWords(s: string): string {
    let n = ''
    for (let i = 0; i < s.length; i++) {
        for (const [key, value] of Object.entries(digitWords)) {
            const word = s.substring(i, i+key.length)
            if (word === key) {
                n += value
                continue
            }
            if (!isNaN(parseInt(s[i]))) {
                n += s[i]
                break
            }
        }
    }
    return n
}

const calibrationValues: string[] = []
for (const line of parse(__dirname + '/input')) {
    const values = replaceWords(line)
    if (values.length === 1) {
        calibrationValues.push(values[0] + values[0])
        continue
    }
    calibrationValues.push(values[0] + values[values.length-1])
}
log(calibrationValues)
log('result:', calibrationValues.map(a => parseInt(a)).reduce((a, b) => a+b))
