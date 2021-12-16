const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS
    const email = "email@email.com"
    const password = "password"
    const page = await browser.newPage()
    await page.goto("https://www.netflix.com/login")
    await page.fill("input[name='userLoginId']", email)
    await page.fill("input[name='password']", password)
    //await page.click(".btn login-button btn-submit btn-small")
    //await page.press("Sign In")
    const buttonSignIn = await page.locator("button[type='submit']").first()
    await buttonSignIn.click()

    const errorSignIn = await page.waitForSelector(
      ".ui-message-error, .inputError",
        {
          timeout: 10000,
        }
    )
    await errorSignIn.innerText()

    await browser.close()

  // YOUR CODE ENDS
})();
