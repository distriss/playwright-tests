import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.TEST_USERNAME// test username
const password = process.env.TEST_PASSWORD // test password


// Verify Input Fields
test('Login Input Field Visibility', async ({ page }) => {
    await page.goto("https://news.ycombinator.com/login");

    // visibility asserstions
    await expect(page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]')).toBeVisible();
    await expect(page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]')).toBeVisible();

    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    await page.goto("https://news.ycombinator.com");
});

// Login and Logout Test
test('Login and Logout', async ({ page }) => {
    const usernameTest = username // test username
    const passwordTest = password // test password

    await page.goto("https://news.ycombinator.com");

    // Login Form
    await page.getByRole('link', { name: 'login' }).click();
 
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').fill(`${usernameTest}`);

    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
    await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').fill(`${passwordTest}`);
   
    await page.waitForTimeout(2000); // force wait to prevent request error
    await page.getByRole('button', { name: 'login' }).click();       

    await page.getByRole('link', { name: 'logout' }).click();
});

// Login Error Messages Test
    // Wrong username
    test('Invalid username Error Message', async ({ page }) => {
        const usernameWrong = 'wrong_username_test' // test username
        const passwordTest = password // test password
        
        await page.goto("https://news.ycombinator.com/login");
        

        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').click();
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').fill(`${usernameWrong}`);
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').fill(`${passwordTest}`);
        await page.waitForTimeout(2000); // force wait to prevent request error
        await page.getByRole('button', { name: 'login' }).click(); 
        
        await page.getByText('Bad login. Login username:').waitFor();
    });

   // Wrong password input
   test('Invalid password Error Message', async ({ page }) => {
    const usernameTest = username // test username
    const passwordWrong = 'wrongpassword' // test password
        await page.goto("https://news.ycombinator.com/login");

       
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').click();
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').fill(`${usernameTest}`);
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').fill(`${passwordWrong}`);
        await page.waitForTimeout(2000); // force wait to prevent request error
        await page.getByRole('button', { name: 'login' }).click(); 

        await page.getByText('Bad login. Login password:').waitFor();
    });

    // Empty login inputs
    test('Empty Login Form Error Message', async ({ page }) => {
        const usernameEmpty = '' // test username
        const passwordEmpty = '' // test password
        await page.goto("https://news.ycombinator.com/login");

 
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').click();
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]').fill(`${usernameEmpty}`);
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').click();
        await page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]').fill(`${passwordEmpty}`);
        await page.waitForTimeout(2000); // force wait to prevent request error
        await page.getByRole('button', { name: 'login' }).click(); 

        await page.getByText('Bad login. Fields empty: ').waitFor();
    });

