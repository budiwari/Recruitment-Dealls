import { test, expect } from '@playwright/test';

test.describe('Test Fitur Pencarian', () => {
  let page;
  
  test.beforeAll(async ({ browser }) => {

    page = await browser.newPage();
    await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
  });

  test.beforeEach(async () => {
    
    test.setTimeout(60000);
  });

  test('Pencarian dengan keyword valid', async () => {
    
    const searchBox = page.locator('input[type="search"]');
    await searchBox.waitFor({ state: 'visible' });
    await searchBox.fill('Software Engineer');        
    await page.keyboard.press('Enter');    
    await page.waitForSelector('.search-results', { state: 'visible' });        
    const results = page.locator('.mentor-card');
    await expect(results).not.toHaveCount(0);        
    await page.screenshot({
      path: 'screenshots/search-results.png',
      fullPage: true
    });
  });

  test('Pencarian dengan keyword tidak valid', async () => {
    
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('Testing 001');
    await page.keyboard.press('Enter');
    await expect(page.locator('text=No results found')).toBeVisible();
  });

  test('Pencarian dengan filter tambahan', async () => {
    
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('Developer');    
    await page.locator('button:has-text("Filter")').click();
    await page.locator('label:has-text("Lead")').click();
    await page.locator('button:has-text("Apply Filters")').click();
    
    
    const results = page.locator('.mentor-card');
    await expect(results).not.toHaveCount(0);
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ 
        path: `screenshots/failure-${testInfo.title}.png`,
        fullPage: true 
      });
    }
  });

  test.afterAll(async () => {
    await page.close();
  });
});
