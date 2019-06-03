const puppeteer = require('Puppeteer')
const expect = require('chai').expect

const config = require('../lib/config')
const helpers = require('../lib/helpers')
const utility = require('../lib/utils')
const locators = require('../lib/locator')
//const generateID = require('../lib/utils').generateID

let browser
let page

describe('My first puppeteer test', () => {
    before(async function(){
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeOut,
        })
        
        page = await browser.newPage()
        await page.setDefaultTimeout(config.waitingTimeOut)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
    })
    after(async function() {
        //await browser.close()
    })

    describe('Try to do',() => {
        it('My first test step', async () => {
            await helpers.loadUrl(page,config.baseUrl)
            await page.waitForSelector('#nav-search')
    
            const url = await page.url()
            const title = await page.title()
    
            expect(url).to.contains('dev')
            expect(title).to.contains('Community')
        })
        it('browser reload', async() => {
            await page.reload()
            await page.waitForSelector('#page-content')
    
            await helpers.waitForText(page,'body','WRITE A POST')
    
            const url = await page.url()
            const title = await page.title()
    
            expect(url).to.contains('dev')
            expect(title).to.contains('Community')
            await page.screenshot({path: 'example00.png'})
        })
        it('click method', async() => {
            await helpers.loadUrl(page,config.baseUrl)
            await helpers.click(page,'#write-link')
            await page.waitForSelector('.registration-rainbow')
            await page.screenshot({path: 'example01.png'})
        })
        it('submit searchbox', async() =>{
            await helpers.loadUrl(page,config.baseUrl)
            await helpers.typeText(page,utility.generateNumbers(),"#nav-search")
            await page.waitForSelector('#articles-list')
            await page.screenshot({path: 'example02.png'})
        })
    })

    describe('login test',() => {
        it('should navigate to homepage', async() =>{
            await helpers.loadUrl(page,config.baseUrl_zeroBank)
            await helpers.shouldExist(page,'#online_banking_features')
            await page.screenshot({path: 'logintest00.png'})
        })
        it('should click on sigin button',async () => {
            await helpers.click(page,locators.signIn)
            await helpers.shouldExist(page,locators.userID)
        })
        it('should submit login from', async() => {
            await helpers.typeText(page,'Test',locators.userID)
            await helpers.typeText(page,utility.generateID(10),locators.userPW)
            await helpers.click(page,locators.submitUser)
            await page.screenshot({path: 'logintest02.png'})
        })
        it('should get error message', async () => {
            await helpers.waitForText(page,'body','Login and/or password are wrong.')
            await helpers.shouldExist(page,locators.userID)
            await page.screenshot({path: 'logintest03.png'})
        })
    })

    describe('Search test',() => {
        it('should navigate to homepage', async() =>{
            await helpers.loadUrl(page,config.baseUrl_zeroBank)
            await helpers.shouldExist(page,'#online_banking_features')
        })
        it('should submit search phrase',async() => {
            await helpers.typeText(page,'Hello world',locators.inputSearch)
            await helpers.pressKey(page,'Enter')
            await page.screenshot({path: 'Searchtest00.png'})
        })
        it('should show display result', async() => {
            await helpers.waitForText(page,'h2','Search Results')
            await helpers.waitForText(page,'body','No results were found for the query')
            await page.screenshot({path: 'Searchtest01.png'})
        })
    })

    describe('Link Test', () => {
        it('should navigate to homepage', async() => {
            await helpers.loadUrl(page,config.baseUrl_zeroBank)
            await helpers.shouldExist(page,'#online_banking_features')
        })
        it('should have current number of links', async() =>{
            //get count of link
            const numberoflink = await helpers.getCount(page,'#pages-nav > li')
            //console.log(numberoflink)
            //assert th count
            expect(numberoflink).to.equal(4)
        })

    })

})
