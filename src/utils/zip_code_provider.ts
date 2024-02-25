import * as fs from 'fs'

export class ZipCodeProvider {
  private zipCodes: string[] = []
  private filePath = './assets/zips.txt'

  constructor() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8')
      this.zipCodes = data.split('\n').filter((zip) => zip.trim())
    } catch (err) {
      console.error('Error reading zip code file:', err)
      this.zipCodes = []
    }
  }

  getRandomZipCode(): string | undefined {
    if (this.zipCodes.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.zipCodes.length) // Get a random index within the array
      return this.zipCodes[randomIndex] // Return the zip code at the random index
    } else {
      return undefined
    }
  }

  getAllZipCodes(): string[] {
    return this.zipCodes
  }
}
