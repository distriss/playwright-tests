import  { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("https://news.ycombinator.com");
});

// Nav Menus
  // Top Nav
    // Test each link and destination      
    test('news link test', async ({ page }) => {
      await page.getByRole('link', { name: 'new', exact: true }).click();
      await expect(page).toHaveURL('https://news.ycombinator.com/newest');
    });

    test('past link test', async ({ page }) => {
       await page.getByRole('link', { name: 'past', exact: true }).click();
       await expect(page).toHaveURL('https://news.ycombinator.com/front')
    });

    test('comments link test', async ({ page }) => {
       await page.getByRole('link', { name: 'comments', exact: true }).click();
       await expect(page).toHaveURL('https://news.ycombinator.com/newcomments')
    });

    test('ask link test', async ({ page }) => {
       await page.getByRole('link', { name: 'ask', exact: true }).click();
       await expect(page).toHaveURL('https://news.ycombinator.com/ask')
    });

    test('show link test', async ({ page }) => {
       await page.getByRole('link', { name: 'show', exact: true }).click();
       await expect(page).toHaveURL('https://news.ycombinator.com/show')
    });

    test('jobs link test', async ({ page }) => {
       await page.getByRole('link', { name: 'jobs', exact: true }).click();
       await expect(page).toHaveURL('https://news.ycombinator.com/jobs')
    });

    test('submit link test', async ({ page }) => {
       await page.getByRole('link', { name: 'submit', exact: true }).click();
       await expect(page).toHaveURL("https://news.ycombinator.com/submit")
    });

     
  // Footer Nav
    // Test Each Link and destination
    test('guidelines link test', async ({ page }) => {
      await page.getByRole('link', { name: 'Guidelines' }).click();
      await expect(page).toHaveURL('https://news.ycombinator.com/newsguidelines.html');
    });
    
    test('FAQ link test', async ({ page }) => {
      await page.getByRole('link', { name: 'FAQ' }).click();
      await expect(page).toHaveURL('https://news.ycombinator.com/newsfaq.html');
    });

    test('lists link test', async ({ page }) => {
      await page.getByRole('link', { name: 'Lists' }).click();
      await expect(page).toHaveURL('https://news.ycombinator.com/lists');
    });

    test('API link test', async ({ page }) => {
      await page.getByRole('link', { name: 'API' }).click();
      await expect(page).toHaveURL('https://github.com/HackerNews/API');
    });

    test('security link test', async ({ page }) => {
      await page.getByRole('link', { name: 'Security' }).click();
      await expect(page).toHaveURL('https://news.ycombinator.com/security.html');
    });

    test('legal link test', async ({ page }) => {
      await page.getByRole('link', { name: 'Legal' }).click();
      await expect(page).toHaveURL('https://www.ycombinator.com/legal/');
    });

    test('apply link test', async ({ page }) => {
      await page.getByRole('link', { name: 'Apply to YC' }).click();
      await expect(page).toHaveURL('https://www.ycombinator.com/apply/');
    });

    // mailto
    test('contact link test', async ({ page }) => {
      const link = page.getByRole('link', { name: 'Contact' });
      await expect(link).toHaveAttribute("href", /^mailto:/);
    });
  
  
  // test accessibility of nav menu for keyboard-users
  
       
test.afterEach( async ({ page }) => {
    await page.goto("https://news.ycombinator.com");
    await page.waitForTimeout(1000); // to prevent 'too many request error'
})