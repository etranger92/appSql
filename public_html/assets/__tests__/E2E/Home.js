const puppeteer = require("puppeteer");
jest.setTimeout(80000);
let browser;
let page;
beforeAll(async (done) => {
    browser = await puppeteer.launch({
        headless: false, // Will not open page
        slowMo: 300,
        devtools: true
    });
    page = await browser.newPage();
    await page.goto("http://amjdrive.site/", {
        waitUntil: "domcontentloaded",
    });
    await page.setOfflineMode(false);
    await page.waitForSelector("#btn-create-account");
    done();
});

describe("Are forms Appeared accordinatly with the button pressed ? ", () => {
    test("Buttons that will trigger forms are truely: create with id #btn-create-log and log in with id #btn-log-in", async () => {
        const buttons = await page.$$eval("button", buttons => buttons.map(button => button.id));
        const expected = ['btn-create-account', 'btn-log-in'];
        expect(buttons).toEqual(expect.arrayContaining(expected))
    })
    test("form with id #create-account is triggered with a classs 'active' when button Create with id #btn-create-account is clicked ", async () => {
        try {
            await page.click("#btn-create-account");
            await page.waitForSelector('#create-account');
            let isFormTriggered = await page.$eval("#create-account", form => form.className);
            expect(isFormTriggered).toBe("active1");
        } catch (err) {
            console.log(err)
        }
    });
    test("form with id #log_in does not appear when form #create-account is active", async () => {
        try {
            const formLog = await page.$eval("#log_in", form => form.className);
            expect(formLog).not.toBe("active2");
        } catch (err) {
            console.log(err)
        }
    })
    test("When button 'log in' width id = #btn-log-in is clicked the form log appeared. When button 'create form' the form disapeared ", async () => {
        try {
            await page.click("#btn-log-in");
            await page.waitForSelector('#log_in');
            let isFormTriggered = await page.$eval("#log_in", form => form.className);
            expect(isFormTriggered).toBe("active2");
        } catch (err) {
            console.log(err)
        }
    })
    test("form #create-account does not appear when form #log_in is active", async () => {
        try {
            const formLog = await page.$eval("#create-account", form => form.className);
            expect(formLog).not.toBe("active1");
        } catch (err) {
            console.log(err)
        }
    })
})
// This has been already checked within unitTesting
describe("is data-state is set to invalid in case of wrong input ? ", () => {
    test("should set data-set of name and password inputs to invalid as they do not match their regex", async () => {
        try {
            await page.click("#btn-create-account");
            await page.waitForSelector("form");
            //Any of these values that do not respect the regex will have an invalid value as data-set.
            await page.type("#name", "**");
            await page.type("#password", "amj");
            await page.type("#confirm-password", "jeoeoj");

            await page.click("#sub-create-account");
            let dataStateValues = await page.$$eval(
                "#create-account > div > input",
                elements => elements.map(element => element.dataset.state));
            expect(dataStateValues).toContain('invalid');
            //const expected = ["invalid"];
            //expect(dataStateValues).toEqual(expect.arrayContaining(expected))
        } catch (err) {
            console.log(err);
        }
    });
});

//This will create a new Account and create a line in the database wich is not something that we should use often.
/*
describe("Is new account created ?", () => {
    test("after filling the form and press send success page must be displayed", async () => {
        try {
            await page.click("#btn-create-account");
            await page.waitForSelector("form");
            //Any of these values that do not respect the regex will have an invalid value as data-set.
            await page.type("#name", "newTest");
            await page.type("#password", "Password95");
            await page.type("#confirm-password", "Password95");
            await page.click("#sub-create-account");
            await page.waitForSelector(".success_content");
            await expect(page.title()).resolves.toMatch('Success')
            //const expected = ["invalid"];
            //expect(dataStateValues).toEqual(expect.arrayContaining(expected))
        } catch (err) {
            console.log(err);
        }
    });
});
*/

afterAll((done) => {
    browser.close();
    done();
});