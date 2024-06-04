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

    await page.goto(`https://news.ycombinator.com/user?id=${username}`)
    expect(page).toHaveURL(`https://news.ycombinator.com/user?id=${username}`)

});

// Update User
test('Verify user page and form', async ({ page }) => {
    await page.waitForTimeout(2000); // force wait to prevent request error
    // Field visibility
    await page.getByRole('cell', { name: 'user:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'created:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'karma:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'email:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'showdead:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'noprocrast:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'maxvisit:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'minaway:', exact: true }).isVisible();
    await page.getByRole('cell', { name: 'delay:', exact: true }).isVisible();
  
    await page.getByRole('button', { name: 'update' }).isVisible();
});

 
// Links
    // Verify link visibility
    test('Verify user page links', async ({ page }) => {        
        await page.getByRole('link', { name: 'change password' }).isVisible();
        await page.getByRole('link', { name: 'submissions', exact: true }).isVisible();
        await page.getByRole('cell', { name: 'comments', exact: true }).getByRole('link').isVisible();
        await page.getByRole('link', { name: 'upvoted submissions' }).isVisible();
        await page.getByRole('link', { name: 'comments' }).nth(2).isVisible();
        ;
        await page.getByRole('link', { name: 'favorite submissions' }).isVisible();
    });


    // Check Links
    test('Change Password link', async ({ page }) => {
        await page.getByRole('link', { name: 'change password' }).click();
        await expect(page).toHaveURL('https://news.ycombinator.com/changepw');
    });

    test('Submissions link', async ({ page }) => {
        await page.getByRole('link', { name: 'submissions', exact: true }).click();
        await expect(page).toHaveURL(`https://news.ycombinator.com/submitted?id=${username}`);
    });

    test('Comments link', async ({ page }) => {
        await page.getByRole('cell', { name: 'comments', exact: true }).getByRole('link').click();
        await expect(page).toHaveURL(`https://news.ycombinator.com/threads?id=${username}`);
    });

    test('Upvoted Submissions link', async ({ page }) => {
        await page.getByRole('link', { name: 'upvoted submissions' }).click();
        await expect(page).toHaveURL(`https://news.ycombinator.com/upvoted?id=${username}`);
    });

    test('Upvoted Comments link', async ({ page }) => {
        await page.getByRole('link', { name: 'comments' }).nth(2).click();
        await expect(page).toHaveURL(`https://news.ycombinator.com/upvoted?id=${username}&comments=t`);
    });

    test('Favorite submissions and comments link', async ({ page }) => {
        await page.getByRole('link', { name: 'favorite submissions' }).click();
        await expect(page).toHaveURL(`https://news.ycombinator.com/favorites?id=${username}`);
    });


// Update Form
test('Update user Form', async ({ page }) => {
    await page.locator('textarea[name="about"]').click();
    await page.locator('textarea[name="about"]').fill('about me paragraph');
    await page.locator('input[name="email"]').click();
    await page.locator('select[name="showd"]').selectOption('yes');
    await page.locator('input[name="maxv"]').click();
    
    await page.locator('input[name="maxv"]').click();
    await page.locator('input[name="maxv"]').fill('30');
    await page.locator('input[name="mina"]').click();
    await page.locator('input[name="mina"]').fill('200');

    await page.getByRole('button', { name: 'update' }).click();
    
    await page.locator('#me').click();
    await page.waitForTimeout(2000); // force wait to prevent request error
});
    
    // Form Error Handling



test.afterEach(async ({ page }) => {
    await page.goto("https://news.ycombinator.com");
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'logout' }).click();
})