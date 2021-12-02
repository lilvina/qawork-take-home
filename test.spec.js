const { test, expect } = require("@playwright/test")

test('writing tests', async ({ page }) => {
  await page.goto('https://netflix.com/login')
  const title = page.locator('.login-header')
  await expect(title).toHaveText('Netflix')
})

test('my test', async ({ page }) => {
  await page.goto('https://netflix.com/login')

  await expect(page).toHaveTitle(/Netflix/)

  await expect(page.locator('text=Sign up now').first()).toBeVisible()

  await page.click('text=Sign In')
})
