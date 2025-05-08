import { test, expect } from '@playwright/test';

test.describe('Test Fitur Pencarian', () => {
  let page;
  
  test.beforeAll(async ({ browser }) => {
    // Buka browser dan halaman
    page = await browser.newPage();
    await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
  });

  test.beforeEach(async () => {
    // Set timeout untuk semua test
    test.setTimeout(60000);
  });

  test('Pencarian dengan keyword valid', async () => {
    // 1. Temukan search box dan isi keyword
    const searchBox = page.locator('input[type="search"]');
    await searchBox.waitFor({ state: 'visible' });
    await searchBox.fill('Software Engineer');
    
    // 2. Tekan Enter atau klik tombol search
    await page.keyboard.press('Enter');
    // Atau jika ada tombol search:
    // await page.locator('button[type="submit"]').click();

    // 3. Tunggu hasil pencarian muncul
    await page.waitForSelector('.search-results', { state: 'visible' });
    
    // 4. Verifikasi hasil pencarian
    const results = page.locator('.mentor-card'); // Ganti dengan selector yang sesuai
    await expect(results).not.toHaveCount(0);
    
    // 5. Ambil screenshot
    await page.screenshot({
      path: 'screenshots/search-results.png',
      fullPage: true
    });
  });

  test('Pencarian dengan keyword tidak valid', async () => {
    // 1. Isi keyword yang tidak valid
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('keywordtidakvalid123');
    await page.keyboard.press('Enter');
    
    // 2. Verifikasi pesan "tidak ditemukan"
    await expect(page.locator('text=No results found')).toBeVisible();
  });

  test('Pencarian dengan filter tambahan', async () => {
    // 1. Isi keyword
    const searchBox = page.locator('input[type="search"]');
    await searchBox.fill('Developer');
    
    // 2. Apply filter tambahan
    await page.locator('button:has-text("Filter")').click();
    await page.locator('label:has-text("Full-time")').click();
    await page.locator('button:has-text("Apply Filters")').click();
    
    // 3. Verifikasi hasil
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