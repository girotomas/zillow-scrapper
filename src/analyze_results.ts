import fs from 'fs';
import { ZipCodeProvider } from './utils/zip_code_provider';
import { ZillowHouseResult, ZillowSearchResults } from './interfaces/zillow';

class ZipFileReader {
  private zipCode: string;

  constructor(zipCode: string) {
    this.zipCode = zipCode;
  }

  get filePath(): string {
    return `./assets/zipData/${this.zipCode}.json`;
  }

  get hasData(): boolean {
    return fs.existsSync(this.filePath)
  }

  getZillowSearchResults(): ZillowSearchResults | undefined {
    if (!this.hasData) {
      return undefined
    }
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  getHouseResults(): ZillowHouseResult[] | undefined {
    return this.getZillowSearchResults()?.cat1.searchResults.mapResults
  }
}


function getRandomElement<T>(array: T[]): T | undefined {
  return array.length ? array[Math.floor(Math.random() * array.length)] : undefined;
}

class DataHelper {
  allZipCodes: string[]
  public allHouses: ZillowHouseResult[]

  constructor() {
    this.allZipCodes = new ZipCodeProvider().getAllZipCodes()
    this.allHouses = []
    this.allZipCodes.forEach(zipCode => {
      const zipFileReader = new ZipFileReader(zipCode)
      const results = zipFileReader.getHouseResults()
      results && this.allHouses.push(...results)
    })
  }

  get randomHouse(): ZillowHouseResult | undefined {
    return getRandomElement(this.allHouses)
  }

  get percentageDataScrapped(): number {
    const total = this.allZipCodes.length
    let seen = 0
    this.allZipCodes.forEach(zipCode => {
      const zipFileReader = new ZipFileReader(zipCode)
      if (zipFileReader.hasData) seen += 1
    })
    return seen/total
  }
}


const dataHelper = new DataHelper()

console.log(`Number of houses: ${dataHelper.allHouses.length}`)
console.log(`Percentage data scrapped: ${(dataHelper.percentageDataScrapped*100).toFixed(2)}%`)



