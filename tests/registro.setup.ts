import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPage';
import test from 'node:test';

let loginPage: LoginPage;

const USER_SEND_AUTH_FILE = 'playwright/.auth/userSend.json';

setup.beforeAll(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
});

test('TC1 - login exitoso', async () => {
    await loginPage.login('arroupe09@gmail.com', '123456');
    await loginPage.clickOnLoginButton();
    await expect(loginPage.page.getByText('Inicio de sesión exitoso')).toBeVisible();
});