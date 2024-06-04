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

    // go to the first article's comments
    await page.locator('.subline a').filter({ hasText: 'comment'}).first().click();

    

});


// Comments
test('Comment page assertions', async ({ page }) => {
    
    // verify comment page title is article title
    const articleTitle = await page.locator('.athing .titleline a').first().innerText();
    const pagetitle = await page.title();

    expect(pagetitle).toContain(articleTitle);
        
    // verify .subline links visibility
    
    // verify button
    // verify list for comments
        
    await page.waitForTimeout(2000); // force wait to prevent request error
});
    // Field visibility
    



    // Form function
    test('Comment Form', async ({ page }) => {
        
        await page.waitForTimeout(2000); // force wait to prevent request error
    });

    // Error Handling
        // Empty input field
        test('Empty Comment Input Error', async ({ page }) => {
        
            await page.waitForTimeout(2000); // force wait to prevent request error
        });


test.afterEach(async ({ page }) => { 
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'logout' }).click();
});