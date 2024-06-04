import  { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("https://news.ycombinator.com");
});

// Test to confirm page title
test('has title', async ({ page }) => {
    await page.goto("https://news.ycombinator.com");
    await expect(page).toHaveTitle(/Hacker News/);    
});


// // Force Failed Test
// test('Force Failed Test', async ({ page }) => {
//   await page.goto("https://news.ycombinator.com");
//   await expect(page).toHaveTitle(/Failed Test/);
// });

test('Logo links Home', async ({ page }) => {
  await page.locator('a').first().click();
  await expect(page).toHaveURL("https://news.ycombinator.com")
});

// Semantic tests
test('Semantic existence of a nav element', async ({ page }) => {
  await page.getByRole('nav').waitFor();
});

test('Semantic existence of a header element', async ({ page }) => {
  await page.getByRole('header').waitFor();
});

test('Semantic existence of a footer element', async ({ page }) => {
  await page.getByRole('footer').waitFor();
});
