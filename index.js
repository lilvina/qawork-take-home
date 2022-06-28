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
    const buttonSignIn = await page.locator("button[type='submit']").first()
    await buttonSignIn.click()

    await page.waitForSelector("text=Unlimited movies, TV shows, and more.", [
      { visible: true },
    ]);

    await page.locator('a:has-text("Sign In")').click();
    await page.locator('input[name="userLoginId"]').fill("username111")
    await page.locator('input[name="password"]').fill("password111")

    await page.waitForSelector("text=Sign In", [{ visible: true }]);

    await Promise.all([
      page.waitForNavigation({ url: "https://www.netflix.com/login" }),
      page.locator('button:has-text("Sign In")').click(),
      page.waitForSelector(".ui-message-contents", ['visible']),    
    ]);

    await Promise.all([
      await page.locator("#appMountPoint svg").click(),
      page.waitForSelector("text=Unlimited movies, TV shows, and more.", [
        "visible",
      ]),
    ]);

    //captures screenshot and exits the browser
    await page.screenshot({path: 'screenshot.png'})
    await browser.close()

    //YOUR CODE ENDS
})();