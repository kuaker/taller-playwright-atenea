import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

test('TC1 - login válido', async ({ page }) => {

    loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login('arroupe09@gmail.com', '123456');
    await loginPage.clickOnLoginButton();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
});
