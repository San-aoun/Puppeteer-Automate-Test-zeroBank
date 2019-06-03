module.exports = {
    click: async function(page, selector){
        try{
          await page.waitForSelector(selector)
          await page.click(selector)

        } catch(error){
            throw new Error('Could not click on selector : ' + selector)
        }
    },
    typeText: async function(page, text, selector){
        try {
            await page.waitForSelector(selector)
            await page.type(selector,text)
            //await page.keyboard.press('Enter')
        } catch (error) {
            throw new Error('Could not type text on selector : ' + selector)
        }
    },
    loadUrl: async function(page, url){
        await page.goto(url, {waitUntil: 'networkidle0'})
    },
    getText: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            return page.$eval(selector, e => e.innerHtml)
        } catch (error) {
            throw new Error('cannot get text from selector : ' + selector)
        }
    },
    getCount: async function(page,selector){
        try {
            await page.waitForSelector(selector)
            return page.$$eval( selector, items => items.length)
        } catch (error) {
            throw new Error('cannot get count of selector :' + selector )
        }
    },
    waitForText: async function(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) =>
                document.querySelector(selector).innerText.includes(text),
                {},
                selector,
                text
            )
        } catch (error) {
            throw new Error('text: ' + text + ' not found for selector '+ selector)
        }
    },
    pressKey: async function(page,key){
        try {
            await page.keyboard.press(key)
        } catch (error) {
            throw new Error('Could not press key: ' + key + 'on the keybroad')
        }
    },
    shouldExist: async function(page,selector){
        try {
            await page.waitForSelector(selector)
        } catch (error) {
            throw new Error('connot should exitst : ' + selector)
        }
    }
}