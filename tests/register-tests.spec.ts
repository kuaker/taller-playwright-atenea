import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
});

test('TC1 - registro existoso', async ({ page }) => {

  const randomEmail = `farroupe${Math.floor(Math.random() * 10000)}@example.com`;

  await registerPage.navigate();
  await registerPage.fillTheForm('Fernando', 'Arroupé', randomEmail, '12345678');
  await registerPage.clickOnRegisterButton();

  await expect(page.getByText('Registro exitoso!')).toBeVisible();

});

test('TC2 - registro inválido', async ({ page }) => {

  await registerPage.navigate();
  await registerPage.fillTheForm('Fernando', 'Arroupé', 'arroupe09@gmail.com', '12345678');
  await registerPage.clickOnRegisterButton();
  await expect(page.getByText('Email already in use')).toBeVisible();
});
