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

function replaceWords(a: string): string {
    let s = a
    for (const [key, value] of Object.entries(digitWords)) {
        s = s.replaceAll(key, value)
    }
    log(s)
    return s
}

const calibrationValues: string[] = []
for (const line of parse(__dirname + '/input')) {
    const v = replaceWords(line)
    let values = v.split('').filter(a => !isNaN(parseInt(a))).join('')
    if (values.length === 1) {
        calibrationValues.push(values[0] + values[0])
        continue
    }
    calibrationValues.push(values[0] + values[values.length-1])
}
log(calibrationValues)
log('result:', calibrationValues.map(a => parseInt(a)).reduce((a, b) => a+b))