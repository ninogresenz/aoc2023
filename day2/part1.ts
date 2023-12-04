import fs from "fs";

function getGames(file: string): string[] {
  const inputRaw = fs.readFileSync(file, {encoding: 'utf-8'})
  return inputRaw.split('\n').filter(l => l.length > 0)
}

type CubeSet = {
  red: number
  green: number
  blue: number
}

function getCubes(s: string): CubeSet {
  const cubeSet: CubeSet = {red: 0, green: 0, blue: 0}
  const rounds = s.split('; ')
  for (const round of rounds) {
    for (const cubes of round.split(', ')) {
      const [num, color] = cubes.split(' ')
      if (color === "red") {
        cubeSet.red = Math.max(cubeSet.red, parseInt(num))
      }
      if (color === "green") {
        cubeSet.green = Math.max(cubeSet.green, parseInt(num))
      }
      if (color === "blue") {
        cubeSet.blue = Math.max(cubeSet.blue, parseInt(num))
      }
    }
  }
  return cubeSet
}

const allGames: [number, CubeSet][] = []
let i = 1
for (const game of getGames(__dirname + '/input')) {
  const cubeSet = getCubes(game.replace(/Game \d+: /, ''))
  allGames.push([i, cubeSet])
  i++
}

const config: CubeSet = {red: 12, green: 13, blue: 14}
let sum = 0
for (const [gameNumber, game] of allGames) {
  if (game.red <= config.red && game.green <= config.green && game.blue <= config.blue) {
    sum += gameNumber
  }
}

console.log(allGames)
console.log('result:', sum)

