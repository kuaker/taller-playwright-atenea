import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombreInput = page.locator('input[name="firstName"]');
        this.apellidoInput = page.locator('input[name="lastName"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.registerButton = page.getByTestId('boton-registrarse');
    }

    async navigate() {
        await this.page.goto('http://localhost:3000/signup');
    }

    async register(nombre: string, apellido: string, email: string, password: string) {
        await this.nombreInput.fill(nombre);
        await this.apellidoInput.fill(apellido);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click();
    }
}