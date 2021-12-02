const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  // YOUR CODE STARTS
  try {
    const email = "email@email.com"
    const password = "password"
    const page = await browser.newPage()
    await page.goto("https://www.netflix.com/login")
    await page.fill("input[name='userLoginId']", email)
    await page.fill("input[name='password']", password)
    await page.click("button[type='submit']", {force: true})

    try {
      const errorSignIn = await page.waitForSelector(
        ".ui-message-error, .inputError",
        {
          timeout: 10000,
        }
      )
      const errMessage = await errorSignIn.innerText()
    } catch(err) {
      if(err instanceof errors.TimeoutError) {
        console.log("There is no error signing in.")
      } else {
        console.log(err)
      }
    }
  } catch(err) {
    console.log(err)
  } finally {
    browser.close()
  }
  // YOUR CODE ENDS
})();
