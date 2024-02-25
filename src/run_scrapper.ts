import { Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import * as fs from 'fs'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

enum Target {
  contactInfo = 'operationName=ListingContactDetailsQuery',
  neighborhoodInfo = 'async-create-search-page-state',
}

class Scraper {
  private page!: Page

  async start() {
    console.log('starting scrapper')
    const browser = await puppeteer.launch({ headless: false })
    this.page = await browser.newPage()
    await this.page.setViewport({ width: 1366, height: 768 })
    await this.page.setRequestInterception(true)
    this.page.on('request', async (request) => {
      request.continue()
    })
  }

  async query(url: string, target: string) {
    return new Promise((resolve, reject) => {
      this.page.on('response', async (response) => {
        const url = response.url()
        if (url.includes(target)) {
          const json = await response.json()
          resolve(json)
        }
      })
      this.page.goto(url)
    })
  }
}

class ResultSaver {
  zipCode: string

  constructor(zipCode: string) {
    this.zipCode = zipCode
  }

  private get filePath(): string {
    return `./assets/zipData/${this.zipCode}.json`
  }

  isPresent(): boolean {
    return fs.existsSync(this.filePath)
  }

  saveData(data: any) {
    try {
      const outputString = JSON.stringify(data, null, 2)
      fs.writeFileSync(this.filePath, outputString)
      console.log(`File ${this.filePath} written successfully!`)
    } catch (err) {
      console.error(err)
    }
  }
}

class ZipCodeProvider {
  private zipCodes: string[] = [];
  private filePath = './assets/zips.txt';

  constructor() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.zipCodes = data.split('\n').filter((zip) => zip.trim());
    } catch (err) {
      console.error('Error reading zip code file:', err);
      this.zipCodes = [];
    }
  }

  getRandomZipCode(): string | undefined {
    if (this.zipCodes.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.zipCodes.length); // Get a random index within the array
      return this.zipCodes[randomIndex]; // Return the zip code at the random index
    } else {
      return undefined;
    }
  }
}

const getNeighborhoodUrl = (zipcode: string) => {
  return `https://www.zillow.com/homes/${zipcode}`
}

/**
 * 
 * @param n milliseconds to sleep
 */
function sleep(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n))
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

;(async () => {
  const scrappy = new Scraper()
  await scrappy.start()

  const zipProvider = new ZipCodeProvider()
  let zip = zipProvider.getRandomZipCode()
  while (zip) {
    const resultSaver = new ResultSaver(zip)
    if (!resultSaver.isPresent()) {
      const json = await scrappy.query(
        getNeighborhoodUrl(zip),
        Target.neighborhoodInfo
      )
      resultSaver.saveData(json)
      await sleep(randomInt(1000, 5000))
    } else {
      console.log(`Skipping zip code ${zip}`)
    }
    zip = zipProvider.getRandomZipCode()
  }
})()
