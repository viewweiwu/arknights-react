export const copy = (obj: object) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getRandom = (min: number, max: number) => {
  return min + Math.random() * (max - min)
}

export const getRandomFloor = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1))
}