import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.loginButton = page.getByTestId('boton-login');
    }

    async navigateTo() {
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async fillTheLoginForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {
        this.fillTheLoginForm(email, password);
        await this.clickOnLoginButton();
    }
}