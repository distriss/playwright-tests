import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.TEST_USERNAME// test username
const password = process.env.TEST_PASSWORD // test password


// Login
test.beforeEach(async ({ page }) => { 
    await page.goto("https://news.ycombinator.com");

    // Login Form
    await page.getByRole('link', { name: 'login' }).click();
 
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').fill(`${username}`);

    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').fill(`${password}`);
   
    await page.waitForTimeout(2000); // force wait to prevent request error

    await page.getByRole('button', { name: 'login' }).click();
});

// Conditional Nav links
  test('welcome conditional link test', async ({ page }) => {
      await page.locator('a:has-text("new")').nth(1).click();
      await expect(page).toHaveURL('https://news.ycombinator.com/newest')
    });

  test('threads conditional link test', async ({ page }) => {
      await page.getByRole('link', { name: 'threads' }).click();
      await expect(page).toHaveURL(`https://news.ycombinator.com/threads?id=${username}`)    
    });
  
  test('username conditional link test', async ({ page }) => {
    await page.getByRole('link', { name: `${username}` }).click();
    await expect(page).toHaveURL(`https://news.ycombinator.com/user?id=${username}`)   
    await page.waitForTimeout(8000);
  });


test.afterEach(async ({ page }) => {
    await page.goto("https://news.ycombinator.com");
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'logout' }).click();
})

