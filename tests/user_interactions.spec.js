import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.TEST_USERNAME// test username
const password = process.env.TEST_PASSWORD // test password

// Get Auth
test.beforeEach(async ({ page }) => { 
    await page.goto("https://news.ycombinator.com");

    // Login Form
    await page.getByRole('link', { name: 'login' }).click();   
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').fill(`${username}`);
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').fill(`${password}`);
   
    await page.waitForTimeout(2000); // force wait to prevent request error

    await page.getByRole('button', { name: 'login' }).click();
    
    await page.waitForTimeout(2000); // force wait to prevent request error

});



// Buttons
    // Upvote
    // Unvote
    // Pagination

// Behaviour scenarios

// Search


test.afterEach(async ({ page }) => {
    await page.goto("https://news.ycombinator.com");
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'logout' }).click();
});