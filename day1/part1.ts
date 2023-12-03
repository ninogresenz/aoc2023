import { log } from 'console'
import fs from 'fs'

function parse(file: string): string[] {
    const inputRaw = fs.readFileSync(file, {encoding: 'utf-8'})
    return inputRaw.split('\n')
}

const calibrationValues: string[] = []
for (const line of parse(__dirname + '/input')) {
    let values = line.split('').filter(a => !isNaN(parseInt(a))).join('')
    if (values.length === 1) {
        calibrationValues.push(values[0] + values[0])
        continue
    }
    calibrationValues.push(values[0] + values[values.length-1])
}
log(calibrationValues)
log('result:', calibrationValues.map(a => parseInt(a)).reduce((a, b) => a+b))