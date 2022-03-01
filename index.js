const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS

    const context = await browser.newContext()
    //Netflix page
    const page = await context.newPage()

    //checking for user
    await page.goto("https://www.netflix.com")
    await page.click("text=Sign In")
    await page.fill("input[name='userLoginId']", "username111")
    await page.fill("input[name='password']", "password111")
    const buttonSignIn = await page.locator("button[type='submit']").first()
    await buttonSignIn.click()
    const errorSignIn = await page.waitForSelector("div[class='ui-message-contents']")

    //check if the username phone number has an invalid number
    await page.fill("input[name='userLoginId']", "9")
    await page.click("input[name='password']")
    const errPhoneMessage = await page.waitForSelector("text=Enter a valid phone number.")

    //checks for invalid email address
    await page.fill('input[name="userLoginId"]', 'a');
    await page.click('input[name="password"]');
    const errEmailMessage = await page.waitForSelector('text=Please enter a valid email.');

    //checks for invalid password
    await page.fill('input[name="password"]', '1');
    await page.click('input[name="userLoginId"]');
    const errPasswordMessage = await page.waitForSelector('text=Your password must contain between 4 and 60 characters.');

    //captures screenshot and exits the browser
    await page.screenshot({path: 'screenshot.png'})
    await browser.close()

    //YOUR CODE ENDS
})();
