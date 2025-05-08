import { test, expect } from '@playwright/test';

test('login berhasil', async ({ page }) => {
  // Pergi ke halaman login
  await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/sign-in?returnUrl=%2Fmentoring');

  // Isi form login
  await page.fill('input[name="email"]', 'testerqa@gmail.com');
  await page.fill('input[name="password"]', 'test1234');

  // Klik tombol Sign In
  await page.click('button:has-text("Sign In")');

  // Tunggu navigasi selesai
  // await page.waitForNavigation();

  // Verifikasi login berhasil
  const isLoggedIn = await page.isVisible('text=Welcome back to Indonesia #1 Job & Mentoring Platform');
  expect(isLoggedIn).toBeTruthy();

  if (isLoggedIn) {
    console.log('Login berhasil!');
  } else {
    console.error('Login gagal.');
  }
});