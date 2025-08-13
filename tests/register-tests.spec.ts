import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import testData from '../data/testData.json';

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

test('TC3 - registro vía api', async ({ page, request }) => {

  const randomEmail = `farroupe${Math.floor(Math.random() * 10000)}@example.com`;

  const response = await request.post('http://localhost:6007/api/auth/signup', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      firstName: testData.usuarioValido.firstName,
      lastName: testData.usuarioValido.lastName,
      email: randomEmail,
      password: testData.usuarioValido.password
    }
  });

  const responseBody = await response.json();
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty('user');
  expect(responseBody).toHaveProperty('token');

  console.log('TOKEN: ', responseBody.token);

});

test('TC4 - Registro exitoso con datos válidos, verificando respuesta de API', async ({ page }) => {
  await test.step('Completar el formulario de registro', async () => {
    const randomEmail = `farroupe${Math.floor(Math.random() * 10000)}@example.com`;
    await registerPage.navigate();
    await registerPage.fillTheForm(
      testData.usuarioValido.firstName,
      testData.usuarioValido.lastName,
      randomEmail,
      testData.usuarioValido.password
    );
    const mensajeDeCreacionDeCuenta = page.waitForResponse('**/api/auth/signup');
    await registerPage.clickOnRegisterButton();
    const response = await mensajeDeCreacionDeCuenta;

    expect(response.status()).toBe(201);
    // expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });
});
