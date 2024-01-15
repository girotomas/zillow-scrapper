import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());


enum Target {
  contactInfo = "operationName=ListingContactDetailsQuery",
  neighborhoodInfo = "async-create-search-page-state"
}

class Scraper {
  private page!: Page;

  async start() {
    const browser = await puppeteer.launch({ headless: false });
    this.page = await browser.newPage();
    await this.page.setViewport({ width: 1366, height: 768});
    await this.page.setRequestInterception(true);
    this.page.on('request', async (request) => {
      request.continue();
    });
  }

  async query(url: string, target: string) {
    return new Promise((resolve, reject) => {
      this.page.on('response', async (response) => {
        const url = response.url();
        if (url.includes(target)) {
          console.log(response.url());
          const json = await response.json();
          console.log(json);
          resolve(json);
        }
      });
      this.page.goto(url);
    })
  }
}



const NEIGHBORHOOD_URL = "https://www.zillow.com/jackson-ms/rentals/"

;(async () => {
  const scrappy = new Scraper()
  await scrappy.start()

  const json = await scrappy.query(NEIGHBORHOOD_URL, Target.neighborhoodInfo)
  //console.log(JSON.stringify(json))
})();

