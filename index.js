// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require('fs');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
 
  // Go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Locate and Save Top10 Articles
  const articleLocator = page.locator('.titleline > a:first-child')

  const articles = await articleLocator.evaluateAll(elements => {
    const arrayOfArticles = Array.from(elements.map(article => ({
        title: article.textContent,
        url: article.href
      })
    ));
    return arrayOfArticles.slice(0, 10);
  });
  console.log(articles)

  const saveContent = articles.map(article => `${article.title},${article.url}`).join("\n")

  fs.writeFile('articles.csv', saveContent, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Articles saved successfully!')
    }
  }); 
}

(async () => {
  await saveHackerNewsArticles();
})();
