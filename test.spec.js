const { test, expect } = require("@playwright/test")

const username = "username111"
const password = "password111"

test('writing tests', async ({ page }) => {
  await page.goto('https://netflix.com/login')
  const title = page.locator('.login-header')
  await expect(title).toHaveText('Netflix')
})

test("checks if the page has the text with Unlimited movies, TV shows, and more", async({
  page,
}) => {
  await page.goto("https://www.netflix.com/")
  await page.waitForSelector("text=Unlimited movies, TV shows, and more", [
   { visible: true }, 
  ])
})

test("To fill out Email and Password fields", async ({ page }) => {
  await page.goto("https://www.netflix.com/")
  await page.locator('a:has-text("Sign In")').click()
  await page.locator('input[name="userLoginId"]').fill(username)
  await page.locator('input[name="password"]').fill(password)

  await page.locator('button:has-text("Sign In")').click()
  const errMessage = page.locator(".ui-message-contents")
  await expect(errMessage).toBeVisible()
})

test("Goes to the Sign In page", async ({
  page,
}) => {
  await page.goto("https://www.netflix.com/")
  await page.locator('a:has-text("Sign In")').click()
  await page.waitForSelector("text=Sign In", [{ visible: true }])
})

test("Clicks on the Netflix logo to go back to the home page from the login page", async ({
  page,
}) => {
  await page.goto("https://www.netflix.com/login")
  await page.locator("#appMountPoint svg").click()
  const pageURL = await page.url()
  await page.waitForSelector("text=Unlimited movies, TV shows, and more.", [
    { visible: true },
  ])
  expect(pageURL).toBe("https://www.netflix.com/")
})

test("Click on the FAQ and checks if the answer is visible", async ({
  page,
}) => {
  await page.goto("https://www.netflix.com/")
  await page.locator("text=What is Netflix?").click()
  const element = page.locator(
    "text=Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
  )
  await expect(element).toBeVisible()
})